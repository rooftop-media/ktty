/* Validates NODE PAIRS in a node list. 
    Input  - a list of XML nodes. 
    Output - an object with a "pass" bool and a "notes" array. */

module.exports = function check_pair( nodes ) {
	
    /**  We'll return results in this:          */
    var result    = {
	pass:  true,
	notes: []
    }
    
    /**  Track open nodes:                      */
    var open_nodes = [];
    
    //  Loop thru nodes
    for ( var i = 0; i < nodes.length; i++ ) {
	
	//  Getting the node's type & value.
	var n_type  = nodes[i].split( ': ' )[0];
	var n_value = nodes[i].split( ': ' )[1];

	//  Record all open tags.
	if ( n_type == 'OPEN-TAG' ) {
	    open_nodes.push( n_value );

	//  Record matching close tags. 
	} else if ( n_type == 'CLOSE-TAG' ) {
	    var last_unclosed = open_nodes.pop();
	    if ( last_unclosed != n_value ) {
		result.pass = false;
		result.notes.push( 'Expected </' + last_unclosed + "> but saw " + n_value );
	    }
	}

	
    } /**  End for loop  */

    //  There shouldn't be any open nodes left.
    while ( open_nodes.length > 0 ) {
	result.pass = false;
	result.notes.push( 'No close tag found for <' + open_nodes.pop() + ">" );
    }

    return result;
}