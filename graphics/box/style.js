/*  ktty/methods/box/style.js   
    
    Makes a full text box, 
    provided a text box config file. 
    
    Here's a full list of the text box styles, 
    in the order of appearance in this file:

      # Sizing options
        - height
	- width
	- box-sizing

      # Word wrap options
        - word-wrap
	- justify-text

      # Text align options
        - text-align

      # Pad
        - top   - right   - bottom   - left

      # Ansi options
        - font-weight
	- brightness
	- decoration
	- color
	- background
	- reverse-video

      # Border
        - border-style
	- border-width
	- border-color
        - border-background

      # Margin
        - top   - right   - bottom   - left

    NOT INCLUDED are "position" options! 
    Those are in ktty/position.  :)
        
*/

module.exports = function box_style( ktty, config ) {
    


    //  ~~ ☞  Get the box's text...
                   
    /**  The text we're boxing!                     */
    var _text          = config.text;
    
    /**  Make sure something's there.               */
    if ( typeof _text != "string" ) {
	console.error("Error in box/style.js: config.text must be a string!");
	return;
    }



    //  ~~ ☞  get the box's size...
    
    /**  Find the height.                           */
    var _height        = config.height;

    if ( _height == "auto" || !_height ) {
	var _lines = _text.split('\n');
	_height = _lines.length + "sp";
    }

    /**  Height should now be a unit we can get!    */
    _height        = ktty.get_length( _height );



    /**  Now let's find the width.                  */
    var _width     = ktty.get_width( config );





    /**  Adjust size for "border-box" here.         */
    if ( config.box_sizing == "border-box" ) {
	// todo:
	//  width  = width  - ( padding_r + p_l + border_r + b_l )
	//  height = height - ( padding_t / p_b + border_t + b_b )
    }




    //  ~~ ☞   Word wrap...

    /**  "normal" | "break-word"                    */
    var _word_wrap     = config.word_wrap;

    

    /**  "none" | "inter-word" | "inter-character"  */
    var _text_justify  = config.text_justify;

    /**  Applying word wrap...                      */
    _text              = ktty.wrap({ text: _text, word_wrap: _word_wrap, width: _width });





    //  ~~ ☞   Text align...
    
    /**  "left" | "right" | "center"                */
    var _align_type    = config.align_type;

    if (!_align_type) {
	_align_type = "left";
    }

    /**  Applying text align...                     */
    _text             = ktty.text_align({ text: _text, align_type: _align_type,
					  width: _width, height: _height });



    //  ~~ ☞   Pad...

    var _padding      = config.padding;

    if (!_padding) {
	_padding = "0sp";
    }
    _text             = ktty.pad({ text: _text, padding: _padding });


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



    //  ~~ ☞   Border...

    /**  Refresh the text, so we're bordering styled text.          */
    config.text = _text;

    /**  ktty.get_border( config ) returns a standard border obj.   */
    var border_config = ktty.get_border( config );

    config.border = border_config;

    /**  Draw only if the width exists, and style != none.          */
    if ( config.border.width > 0 ) {

	/**  ktty.border() is what uses the standard border objs.   */
	_text = ktty.border( config );
    }



    //  ~~ ☞   Margin...


    return _text;
}