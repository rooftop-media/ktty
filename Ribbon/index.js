/*  ktty/Ribbon/index  -  A class to manage a stylizable string.   */

//  Import methods...

//  ☞  ...from /Ribbon/inline/

/**  inline  -  Apply ANSI codes around some string.   */
var _inline                 = require( __dirname + "/Ribbon/inline/index.js" );


//  ☞  ...from /Ribbon/box/

/**  box     -  Apply any box style!       */
var _box                    = require( __dirname + "/Ribbon/box/index.js" );


//  ☞  ...from /Ribbon/frame/

/**  frame  -  Apply any frame style to a string.    */
var _frame                 = require( __dirname + "/Ribbon/frame/index.js" );


//  ☞  ...from /Ribbon/display/




module.exports = class Ribbon {

    /**  Making a new string....         */
    constructor() {
	this.text   = "";	
    }

    /**  Load in new text.  Exciting!    */
    load_text( _text ) {
	this.text = _text
    }

    //  Apply certain sections of formatting:

    /**  inline        --  Returns text styled with ANSI codes.    */
    inline() {
	return _inline( this );
    }

    /**  box           --  Format text to some height / width.     */
    box() {
	return _box( this );
    }

    /**  frame         --  Format text to some height / width.     */
    frame() {
	return _frame( this );
    }

    
}
