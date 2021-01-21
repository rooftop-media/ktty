/*  ansi_code ( category, value )

    Various functions to get various ANSI codes. 
                                                   */

var process = require("process");


//  ANSI codes for basic colors. 
//  From https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
var basic_colors = {

    "black":   "0",
    "red":     "1",
    "green":   "2",
    "yellow":  "3",
    "blue":    "4",
    "magenta": "5",
    "cyan":    "6",
    "white":   "7",

}


//  A map to get the style changes we need. 
var ansi_getters = {

    //  reset  (Resets all styles.)
    "reset": function() {
	return "\u001b[0m";
    },

    //  font-weight    "normal" | "bold"
    "font-weight": function( option ) {
	if        ( option == "bold" ) {
	    return "\u001b[1m";
	} else if ( option == "normal" ) {
	    return "\u001b[22m";
	}
	return "";
    },

    //  brightness     "normal" | "dim"
    "brightness": function ( option ) {
	if ( option == "dim" ) {
	    return "\u001b[2m";
	} else if ( option == "normal" ) {
	    return "\u001b[22m";
	}
	return "";
    },

    //  decoration    "normal" | "underline"
    "decoration": function( option ) {
	
	if      ( option == "underline" ) {
	    return "\u001b[4m";
	} 
 
	else if ( option == "normal" ) {
	    return "\u001b[24m";  
	}
	return "";
    },

    //  color         rgb(<r>,<g>,<b>) | color_name
    "color":  function( color_string ) {
	
	/**  If the color is reset, reset.                      */
	if ( color_string == "reset" ) {
	    return "\u001b[0m";
	}

	/**  Otherwise, find it in the bas_colors dictionary.   */
	var color_num = basic_colors[ color_string ];
	if ( typeof color_num == 'string' ) {
	    return "\u001b[3" + color_num + "m";
	}
	return "";
    },

    //  background    rgb(<r>,<g>,<b>) | color_name
    "background":  function( color_string ) {

	/**  If the color is reset, reset.                      */
	if ( color_string == "reset" ) {
	    return "\u001b[0m";
	}

	var color_num = basic_colors[ color_string ];
	if ( typeof color_num == 'string' ) {
	    return "\u001b[4" + color_num + "m";
	}
	return "";
    },

    //  reverse-video        "yes please" | "no thanks"
    "reverse-video": function(option) {
	if      ( option == "yes-please" ) { 
	    return "\u001b[7m";
	}
	else if ( option == "no-thanks" ) {
	    return "\u001b[27m";
	}
	return "";
    },

    //  move             Moves the cursor relative to its current position. 
    "move": function( lines, spaces ) {
	
    },
    //  move             Moves the cursor relative to an absolute position. 
    "move-to": function( coodinates ) {
	var coords = coordinates.split(",");
	return "\u001b[" + coords[0] + ";" + coords[1] + "H";
    },

    //  scroll           Scroll the screen buffer up / down. 
    "scroll": function ( amt ) {
	if ( amt > 0 ) {
	    return "\u001b[" + amt + "S";
	}
	else {
	    return "\u001b[" + amt + "T";
	}
    }

}

//  The exported function. 
module.exports = function ANSI( category, value ) {
    var ansi_code = ansi_getters[ category ]( value );

    return ansi_code;
}