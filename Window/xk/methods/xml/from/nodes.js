/*  xml/from/nodes.js   - 

    Input:    A list of xml nodes. 
    Returns:  An XML string. 

 */

module.exports = function xml_from_nodes( xml_nodes ) {

    /**  Return this:                              */
    var xml_text = "";

    /**  Flag if we need to close the open tag.    */
    var in_tag   = false;

    /**  Loop thru nodes:                          */
    for ( var i = 0; i < xml_nodes.length; i++ ) {

	/**  Getting the node type...              */
	var n_type  = xml_nodes[i].split( ': ' )[0];

	/**  Getting the node value...             */
	var n_value = xml_nodes[i].split( ': ' )[1];


	if      ( n_type == "OPEN-TAG" ) {
	    capture_text += "<" + n_value;
	    in_tag = true;
	}

	else if ( n_type == "ATTR-NAME" ) {
	    capture_text += " " + n_value + "=";
	}

	else if ( n_type == "ATTR-VALUE" ) {
	    capture_text += '"' + n_value + '"';
	}

	else if ( n_type == "TEXT" ) {
	    if ( in_tag ) 
		capture_text += ">";
	    capture_text += n_value;
	}

	else if ( n_type == "CLOSE-TAG" ) {
	    if ( in_tag ) 
		capture_text += ">";
	    capture_text += "</" + n_value + ">";
	}
	
    }
    
    return xml_text;
}