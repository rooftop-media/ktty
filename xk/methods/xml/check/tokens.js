/* Validates token lists.
    Input  - a list of XML tokens. ( Generated from xkitchen.tokenize() ) 
    Output - an object with a "pass" bool and a "notes" array. */

module.exports = function check_tokens( tokens ) {
    
    /**  What we'll return.          */
    var result    = {
	pass:  true,
	notes: []
    }
    
    /**  The rule define function.   */
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
    
    // Loop thru tokens
    for ( var i = 0; i < tokens.length; i++ ) {
	
	// Getting the first token type.
	var t_type  = tokens[i].split( ': ' )[0];
	
	// Getting the next token type.
	var next_type   = 'END';
	if ( i < tokens.length - 1 ) 
	    next_type   = tokens[i+1].split( ': ' )[0];
	
	// Special rule for the start of the file
	if ( i == 0 )
	    check_rule( i, 'START', t_type, 'START', ['TAG-OPEN'] );
	
	// Grammar rules
	check_rule( i, t_type, next_type, 'TAG-OPEN',    ['TAG-SLASH', 'TAG-NAME'              ] );
	check_rule( i, t_type, next_type, 'TAG-NAME',    ['TAG-SLASH', 'TAG-CLOSE', 'ATTR-NAME'] );
	check_rule( i, t_type, next_type, 'TAG-SLASH',   ['TAG-CLOSE', 'TAG-NAME'              ] );
	check_rule( i, t_type, next_type, 'TAG-CLOSE',   ['TAG-OPEN',  'TEXT',      'END'      ] );
	check_rule( i, t_type, next_type, 'ATTR-NAME',   ['ATTR-EQUAL'                         ] );
	check_rule( i, t_type, next_type, 'ATTR-EQUAL',  ['ATTR-VALUE'                         ] );
	check_rule( i, t_type, next_type, 'ATTR-VALUE',  ['ATTR-END'                           ] );
	check_rule( i, t_type, next_type, 'ATTR-END',    ['TAG-SLASH', 'TAG-CLOSE', 'ATTR-NAME'] );
	check_rule( i, t_type, next_type, 'TEXT',        ['TAG-OPEN'                           ] );
	
	// Special rule for end of file
	if ( i == tokens.length - 1 && t_type != 'TAG-CLOSE' ) {
	    var report = i + ": The final token must be TAG-CLOSE.";
	    result.pass = false;
	    result.notes.push(report);
	}
	
    } /**  End for loop  */
    return result;
}