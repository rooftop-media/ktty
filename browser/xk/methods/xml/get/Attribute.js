//  xml/get/Attribute.js

//  Input:      xml string. ( Only the outer tag is read. )
//  Returnss:   the 


module.exports = function getAttribute( xml_nodes, attr_name ) {

    /**  Mark if we've found the attr name to look for. */
    var attr_found   = false;
    
    //  Iterate through node list.
    for ( var i = 0; i < xml_nodes.length; i++ ) {
	
	/**  Getting the node type...              */
        var n_type  = xml_nodes[i].split( ': ' )[0];

        /**  Getting the node value...             */
        var n_value = xml_nodes[i].split( ': ' )[1];

	if ( n_type == "ATTR-NAME" && n_value == attr_name )
	    attr_found = true;

	else if ( attr_found && n_type == "ATTR-VALUE" ) 
	    return n_value;

	else if ( n_type == "TEXT" || n_type == "CLOSE-TAG" ) 
	    return false;

    }

}