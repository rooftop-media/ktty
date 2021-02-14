//  xk/methods/xss/get/XSS.js  -  A function to get the xss text, with ANSI syntax highlighting!


/**  Import ktty, to get ANSI codes for highlighting.             */
var KTTY = require( __dirname + "/../../../../ktty/ktty.js");
var ktty = new KTTY();

module.exports = function getXSS( xss_nodes ) {
    
    //  Make the highlighted string...

    /**  Where we'll store the string:   */
    var highlighted = "";

    /**  Track indent amnt:              */
    var indent_amt  = 0;

    /**  Loop thru the nodes...          */
    for ( var i = 0; i < xss_nodes.length; i++ ) {
	
	/**  Getting the node type...              */
	var n_type  = xss_nodes[i].split( ': ' )[0];

        /**  Getting the node value...             */
        var n_value = xss_nodes[i].split( ': ' )[1];
	
	/**  Selectors are cyan                    */
	if      ( n_type == "SELECTOR" ) {
	    if ( i != 0 ) {
		highlighted += "\n}\n";
	    }
	    highlighted += "\n" + ktty.inline_style({ text: n_value, color: "cyan" }) + " {";
	}

	/**  Rule names are green.            */
	else if ( n_type == "RULE-NAME" ) {
	    highlighted += "\n  " + ktty.inline_style({ text: n_value, color: "magenta" }) + ": ";
	}

	/**  Rule values are yellow.               */
	else if ( n_type == "RULE-VALUE" ) {
	    highlighted += ktty.inline_style({ text: n_value, color: "yellow" }) + ";";
	}

    } /**  End of loop thru nodes. */

    highlighted += "\n}";

    return highlighted;


}