/*  Parse  -  turn a list of xml TOKENS into a list of NODES.   
    
    Node types:

    OPEN-TAG
    ATTR-NAME
    ATTR-VALUE
    TEXT
    CLOSE-TAG

*/

module.exports = function parse( tokens ) {

    /**  We'll  store labelled nodes in here. */
    var nodes     = [];

    /**  Track what tag we're parsing.        */
    var tag_type   = 'OPEN';  // or "CLOSE" if we've seen a slash
    var tag_name   = 'NONE';
        
    /**  Loop through token list.             */
    for ( var i = 0; i < tokens.length; i++ ) {
	
	var token_parts = tokens[i].split( ': ' );
	var ttype       = token_parts[0];
	var tvalue      = token_parts[1];

  	
	//  React to a  tag open
	if ( ttype == 'TAG-OPEN' ) {
	    tag_type = 'OPEN';
	    tag_name = 'NONE';

	//  React to a  tag name.
	} else if ( ttype == 'TAG-NAME' ) {
	    tag_name = tvalue;
	    nodes.push( tag_type + '-TAG: ' + tvalue );

	//  React to a  tag slash BEFORE the tag name. 
	} else if ( ttype == 'TAG-SLASH' && tag_name == 'NONE' ) {
	    tag_type = 'CLOSE';
	    
	//  React to a  tag slash at the end of a tag.
	} else if ( ttype == 'TAG-SLASH' && tag_name != 'NONE' ) {
	    nodes.push( 'CLOSE-TAG: ' + tag_name );

	//  React to  an attribute name.
	} else if ( ttype == 'ATTR-NAME' ) {
	    nodes.push( 'ATTR-NAME: ' + tvalue );

	//  React to  an attribute value.
	} else if ( ttype == 'ATTR-VALUE' ) {
	    nodes.push( 'ATTR-VALUE: ' + tvalue );
	    
	//  React to  text.
	} else if ( ttype == 'TEXT' ) {
	    nodes.push( 'TEXT: ' + tvalue );
	    
	} 
	
	
    } /**  end that for loop */
    
    
    return nodes;
    
}