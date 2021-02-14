/*  xml/get/TagsByName.js   - 

    Returns an array of xml strings.

    // Sample use:

    xk.load_xml(```
    <ttml>
      <h1>Hello world</h2>
      <p>Hi!</p>
      <p>Sup?</p>
    </ttml>```);
    
    var p_tags = xk.getTagsByName("p");

    p_tags.length == 2;
    p_tags[0]     == "<p>Hi!</p>";
    p_tags[1]     == "<p>Sup?</p>";

 */

/**  Note that the first argument, "xml_nodes", is used internally only. */
module.exports = function getTagsByName( xml_nodes, tag_name ) {

    /**  Use this to store matches.                */
    var matches       = [];

    /**  Mark whether we're capturing a tag.       */
    var capture       = false;

    /**  Build the found tag here.                 */
    var capture_text  = "";

    /**  We'll use this to close open tags right.  */
    var in_tag        = false;

    //  iterate thru the nodez, build tags!
    for ( var i = 0; i < xml_nodes.length; i++ ) {

	/**  Getting the node type...              */
	var n_type  = xml_nodes[i].split( ': ' )[0];

	/**  Getting the node value...             */
	var n_value = xml_nodes[i].split( ': ' )[1];

	/**  Condition to start capturing: */
	if ( !capture && n_type == "OPEN-TAG" && n_value == tag_name ) {
	    capture = true;
	}

	/**  Capturing tags...                     */
	if ( capture ) {

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
		capture_text += ">" + n_value;
	    }
	    else if ( n_type == "CLOSE-TAG" ) {
		if ( in_tag ) {
		    capture_text += ">";
		    in_tag = false;
		}
		capture_text += "</" + n_value + ">";
	    }

	}

	/**  Condition to STOP capturing:  */
	if ( capture && n_type == "CLOSE-TAG" && n_value == tag_name ) {
	    matches.push( capture_text );
	    capture_text = "";
	    capture = false;
	}

    } //  End loop thru nodez. 

    return matches;

}