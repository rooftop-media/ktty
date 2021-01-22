//  xml/get/innerText.js

//  Input:      xml string.
//  Returns:    everything inside the outermost tags. 


module.exports = function getInnerText( xml_nodes, attr_name ) {

    /**  Mark if we've passed the first open tag.  */
    var past_open = false;
    
    /**  This will be a string of inner content.   */
    var inner     = "";
    
    //  Iterate through node list.
    for ( var i = 0; i < xml_nodes.length; i++ ) {
	
	/**  Getting the node type...              */
        var n_type  = xml_nodes[i].split( ': ' )[0];

        /**  Getting the node value...             */
        var n_value = xml_nodes[i].split( ': ' )[1];

	if ( n_type == "TEXT" || n_type == "CLOSE-TAG" )
	    past_open = true;

	if ( past_open && i < xml_nodes.length - 1 ) {
	    if ( n_type == "TAG-OPEN" ) {
		inner += "<" + n_value;
	    } 
	    else if ( n_type == "TEXT" ) {
		inner += ">" + n_value;
	    }
	    else if ( n_type == "ATTR-NAME" ) {

	    } 
	    else if ( n_type == "ATTR-VALUE" ) {

	    }
	    else if ( n_type == "TAG-CLOSE" ) {

	    }
	}

    }  /**  End loop thru nodes */

    return inner;

}