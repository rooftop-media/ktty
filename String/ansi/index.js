/*  ktty/methods/inline/style.js
    The function ktty.inline_style( config )

    Returns text with ANSI styling applied to it, including:

        - font-weight
	- brightness
	- decoration
	- color
	- background
	- reverse-video
        
*/

module.exports = function inline_style( ktty, config ) {
    


    //  ~~ ☞  Get the box's text...
                   
    /**  The text we're boxing!                     */
    var _text          = config.text;
    
    /**  Make sure something's there.               */
    if ( typeof _text != "string" ) {
	console.error("Error in inline/style.js: config.text must be a string!");
	return;
    }




    //  ~~ ☞   Ansi options...
    
    /**  Subfunction to add codes around each line. */
    function add_codes( start_code, end_code ) {

	/**  Update lines, clear text.              */
	var lines = _text.split('\n');
	_text = "";

	/**  Loop thru lines, build new ones.       */
	for ( var i = 0; i < lines.length; i++ ) {
	    var line     = lines[i];
	    var new_line = start_code + line + end_code;
	    _text       += new_line;
	    if ( i < (lines.length-1) ) 
		_text   += "\n";
	}

    }

    /**  apply font-weight...   */
    var font_weight = config.font_weight;
    if ( font_weight ) 
	add_codes( ktty.get_ansi("font-weight", font_weight), ktty.get_ansi("font-weight","normal") );

    /**  apply brightness...   */
    var brightness  = config.brightness;
    if ( brightness )
	add_codes( ktty.get_ansi("brightness", brightness), ktty.get_ansi("brightness","normal") );

    /**  apply text color...   */
    var color  = config.color;
    if ( color )
	add_codes( ktty.get_ansi("color", color), ktty.get_ansi("reset") );

    /**  apply background...  */
    var background  = config.background;
    if ( background )
	add_codes( ktty.get_ansi("background", background), ktty.get_ansi("reset") );

    /**  appply reverse vid... */
    var reverse_video  = config.reverse_video;
    if ( reverse_video )
	add_codes( ktty.get_ansi("reverse-video", reverse_video), ktty.get_ansi("reverse-video","no-thanks") );



    return _text;
}