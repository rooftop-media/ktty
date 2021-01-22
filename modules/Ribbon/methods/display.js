/*  ribbon/methods/display.js  -  Bundle & apply all text styles.  */

var _inline_style    = require ( __dirname + "/inline/style.js" );

module.exports = function display( ribbon ) {
    


    //  ~~ ☞  Get the display type. 

    /**  If undefined or blank, set to "inline".      */
    if ( !ribbon.style.display ) {
	ribbon.style.display = "inline";
    }

    /**  Put it in a shorter variable.                */
    var _display = ribbon.style.display;



    //  ~~ ☞  Route based on the display type. 

    if      ( _display == "inline" ) {

	var inline_text = _inline_style( ribbon );
	return inline_text;

    }

    else if ( _display == "block" ) {

    }

    else if ( _display == "flex" ) {

    }


}