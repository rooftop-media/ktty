/*    ribbon / methods / inline / style.js

      Returns text with ANSI styling applied to it, including:
        - font-weight
	- brightness
	- decoration
	- color
	- background
	- reverse-video        
                                                                */

/**  Import function get_ansi to get ansi codes.    */
var get_ansi   = require( __dirname + "/get/ansi_code.js" );


/**  Inline text style function:                    */
module.exports = function inline( ribbon ) {


    //  ~~ ☞  The text to style...

    /**  If the text is undefined, make it "".      */
    if ( ribbon.text == undefined )
	ribbon.text = "";
                   
    /**  The text.                                  */
    var _text          = ribbon.text;

    /**  Remove all duplicate whitespace.           */
    _text              = _text.replace(/\s+/g, ' ').trim();

    /**  Remove all line breaks.                    */
    _text              = _text.replace(/(?:\r\n|\r|\n)/g, '');



    //  ~~ ☞   Adding ansi codes...
    
    if ( ribbon.style.font_weight ) {
	_text    = get_ansi("font-weight", ribbon.style.font_weight) + _text;
        _text   += get_ansi("font-weight", "normal");
    }

    if ( ribbon.style.brightness ) {
	_text    = get_ansi("brightness", ribbon.style.brightness) + _text;
	_text   += get_ansi("brightness", "normal");
    }

    if ( ribbon.style.color ) {
	_text    = get_ansi("color", ribbon.style.color) + _text;
	_text   += get_ansi("reset");
    }

    if ( ribbon.style.background ) {
	_text    = get_ansi("background", ribbon.style.background) + _text;
	_text   += get_ansi("reset");
    }

    if ( ribbon.style.reverse_video ) {
	_text    = get_ansi("reverse-video", ribbon.style.reverse_video) + _text;
	_text   += get_ansi("reverse-video","no-thanks");
    }


    return _text;
}