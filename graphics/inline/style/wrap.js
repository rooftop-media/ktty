/*  wrap( config )  -  Returns text, wrapped.      */



//  wrap
module.exports = function wrap( config ) {

    //  unpacking config...

    /**  Getting the text to wrap.                 */
    var text          = config.text;

    /**  The other variables we might need...      */
    var width         = config.width;
    
    /**  word_wrap can be "normal" | "break-word" */
    var word_wrap     = config.word_wrap;
    
    //  wrapping text...

    /**  return this at the end.                  */
    var _wrapped_text = "";

    /**  get a list of lines.                     */
    var lines = text.split("\n");

    /** Loop thru lines                           */
    for (var i = 0; i < lines.length; i++) {
	var line = lines[i];

	/**  If a line is too long, wrap it!!             */
	while (line.length > width) {
	    
	    /**  Start at width, go back until you find a " ".          */
	    var breakpoint = width;
	    while ( line[breakpoint] != ' ' && breakpoint >= 0 ) {
		breakpoint--;
	    }
	    
	    /**  If break-word or no whitespace, break at the width.    */
	    if ( word_wrap == "break-word" || breakpoint == 0 ) {
	
		/**  Fuck the whitespace, just break at width.         */
		breakpoint     = width;
		
		/**  Add text before the breakpoint...                 */
		_wrapped_text += line.slice(0, breakpoint) + "\n";

		/**  Re-check the text after the breakpoint...         */
		line           = line.slice(breakpoint, undefined);
	    }

	    /**  Otherwise,   */
	    else {
		/**  Add text before the breakpoint...                 */
		_wrapped_text += line.slice(0, breakpoint) + "\n";

		/**  Recheck text after breakpoint (skip the space tho) */
		line           = line.slice(breakpoint+1, undefined);
	    }

	    

	}

	/**  Add shorter lines as they are.                 */
	_wrapped_text += line;

	/**  Add line breaks after all but the final line.  */
	if ( i < (lines.length-1) ) 
	    _wrapped_text += "\n";

    }

    
    return _wrapped_text;
}