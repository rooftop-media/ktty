//  xk/methods/xml/get/XML.js  -  A function to get the xml text, with ANSI syntax highlighting!


/**  Import ktty, to get ANSI codes for highlighting.             */
var KTTY = require( __dirname + "/../../../../ktty/ktty.js");
var ktty = new KTTY();

module.exports = function getXML( xml_nodes ) {
    
    //  Make the highlighted string...

    /**  Where we'll store the string:   */
    var highlighted = "";

    /**  if theres an unclosed tag:      */
    var in_tag      = false;

    /**  get indent subfunc              */
    function get_indent( amt ) {
	var indent  = "";
	for ( var i = 0; i < amt; i++ ) {
	    indent += "  ";
	}
	return indent;
    }

    /**  Track indent amnt:              */
    var indent_amt  = 0;

    /**  Loop thru the nodes...          */
    for ( var i = 0; i < xml_nodes.length; i++ ) {
	
	/**  Getting the node type...              */
	var n_type  = xml_nodes[i].split( ': ' )[0];

        /**  Getting the node value...             */
        var n_value = xml_nodes[i].split( ': ' )[1];
	
	/**  Open tags are cyan.                   */
	if      ( n_type == "OPEN-TAG" ) {
	    if ( in_tag ) {
		highlighted += ">";
	    }
	    highlighted += "\n" + get_indent( indent_amt );
	    indent_amt++;
	    highlighted += "<" + ktty.inline_style({ text: n_value, color: "cyan" });
	    in_tag = true;
	}

	/**  Attribute names are green.            */
	else if ( n_type == "ATTR-NAME" ) {
	    highlighted += " " + ktty.inline_style({ text: n_value, color: "green" }) + "=";
	}

	/**  Attribute values are yellow.          */
	else if ( n_type == "ATTR-VALUE" ) {
	    highlighted += ktty.inline_style({ text: '"' + n_value + '"', color: "yellow" });
	}

	/**  Text is white.                        */
	else if ( n_type == "TEXT" ) {
	    if ( in_tag ) {
		highlighted += ">";
		in_tag = false;
	    }
	    highlighted += "\n" + get_indent( indent_amt );
	    highlighted += ktty.inline_style({ text: n_value, color: "white" });
	}

	/**  Close tags are cyan, just like open tags. */
	else if ( n_type == "CLOSE-TAG" ) {
	    if ( in_tag ) {
		highlighted += ">";
		in_tag = false;
	    }
	    indent_amt--;
	    highlighted += "\n" + get_indent( indent_amt );
	    highlighted += "</" + ktty.inline_style({ text: n_value, color: "cyan" }) + ">";
	}

    } /**  End of loop thru nodes. */
    return highlighted;


}