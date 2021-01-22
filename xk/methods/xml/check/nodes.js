/* Validates NODE lists.  (not to be confused with TOKEN lists).
    Input  - a list of XML nodes. 
    Output - an object with a "pass" bool and a "notes" array. */

module.exports = function check_nodes( nodes ) {
	
    /**  We'll return results in this:          */
    var result    = {
	pass:  true,
	notes: []
    }
    
    /**  The rule define function:   */
    function check_rule( tag_num, tag_a, tag_b, rule_tag, b_options ) {
	
	/**  If the rule doesn't apply, auto-pass. */
	if ( tag_a != rule_tag ) {
	    return true;
	}
	
	/**  If tag_b isn't in b_options, we fail. */
	if ( b_options.indexOf( tag_b ) == -1 ) {
	    result.pass  = false;
	    
	    var report   = tag_num + ": \x1b[1m" + rule_tag + "\x1b[22m must be followed by ";
	    while (b_options.length > 1)
		report  += "\x1b[1m" + b_options.shift() + "\x1b[22m or ";
	    report      += "\x1b[1m" + b_options.shift() + "\x1b[22m.";
	    
	    result.notes.push( report );
	    
	} 
	
    } /**  End check_rule subfunction  */
    
    //  Loop thru nodes
    for ( var i = 0; i < nodes.length; i++ ) {
	
	//  Getting the first node type.
	var n_type  = nodes[i].split( ': ' )[0];
	
	//  Getting the next node type.
	var next_type   = 'END';
	if ( i < nodes.length - 1 ) 
	    next_type   = nodes[i+1].split( ': ' )[0];
	
	//  Special rule for the start of the file
	if ( i == 0 )
	    check_rule( i, 'START', n_type, 'START', ['OPEN-TAG'] );
	
	//  Grammar rules!
	check_rule( i, n_type, next_type, 
		    'OPEN-TAG',   [ 'OPEN-TAG', 'ATTR-NAME', 'TEXT', 'CLOSE-TAG' ] );
	check_rule( i, n_type, next_type, 
		    'ATTR-NAME',  [             'ATTR-VALUE'                     ] );
	check_rule( i, n_type, next_type, 
		    'ATTR-VALUE', [             'ATTR-NAME', 'TEXT', 'CLOSE-TAG' ] );
	check_rule( i, n_type, next_type, 
		    'TEXT',       [                          'TEXT', 'CLOSE-TAG' ] );
	check_rule( i, n_type, next_type, 
		    'CLOSE-TAG',  [ 'OPEN-TAG', 'TEXT',      'END',  'CLOSE-TAG' ] );
	
	// Special rule for end of file
	if ( i == nodes.length - 1 && n_type != 'CLOSE-TAG' ) {
	    var report = i + ": The final node must be a CLOSE-TAG.";
	    result.pass = false;
	    result.notes.push(report);
	}
	
    } /**  End for loop  */
    return result;
}