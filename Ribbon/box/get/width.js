/*  width( config )  -  For handling "auto" width specifically. 

    Config should have  width: auto | <length-unit>
                   and  text:  <string>
                                                      */

module.exports = function get_width( ktty, config ) {
    
    /**  If width is auto, get text width.            */
    if ( config.width == "auto" || !config.width) {

	/**  Getting the text, split it into line.           */
	var text  = config.text;
	var lines = text.split('\n');
      	
	/**  Start with a width of 0, look for longer lines. */
	var width = 0;

	/**  Loop thru lines.                                */
	for (var i = 0; i < lines.length; i++ ) {

	    /**  The line, and its starting width.           */
	    var line       = lines[i];
	    var line_width = line.length;

	    //  Removing escape characters from width calculation.

	    /**  Mark if we've seen \u001b without the end.  */
	    var found_esc = false;

	    /**  How many characters are escape              */
	    var esc_length = 0;
	    
	    /**  A sub-loop thru line looking for esc.       */
	    for ( var j = 0; j < line.length; j++ ) {

		/**  Recognizing esc codes.                  */
		if ( line[j] == "\\" && line.substring(j, 6) == "\u001b" ) { 
		    found_esc   = true;
		    esc_length += 6;
		    j          += 6;
		}

		/**  If we've found the esc, find the CSI end.  */
		if  ( found_esc ) {
		    if ( line[j] == "m" || line[j] == "g" ) {
			found_esc = false;
		    }
		    esc_length++;
		}

	    } /**  End of sub loop thru line characters. */
	    
	    line_width -= esc_length;
	    
	    if ( width < line_width )
		width = line_width;
	    
	}  /**  End of loop thru lines. */

	return width;

    }  /**  End of (if config.width == auto) {}

    /**  For other width values, resolve as length.   */
    else {
	return ktty.get_length( config.width );
    }
}
    