/*  ktty/graphics/index – An index of all graphic tools!

*/


//  ☞  ☞  ☞  Methods from /graphics/ansi/

/**  ansi   -  Apply ANSI codes around some string.   */
var _ansi                   = require( __dirname + "/graphics/ansi/index.js" );

/**  get ansi codes        */
var _get_ansi               = require( __dirname + "/graphics/ansi/get/code.js" );

/**  get ansi color code   */
var _get_color              = require( __dirname + "/graphics/ansi/get/color.js" );



//  ☞  ☞  ☞  Methods from /graphics/inline/

/**  inline  -  Apply any inline style to a string.    */
var _inline                 = require( __dirname + "/graphics/inline/index.js" );

/**  get space unit        */
var _get_length             = require( __dirname + "/graphics/inline/get/length.js" );

/**  get auto width        */
var _get_width              = require( __dirname + "/graphics/inline/get/width.js" );

//        ☞  Methods from /graphics/inline/style/

/**  word wrap             */
var _wrap                   = require( __dirname + "/graphics/inline/style/wrap.js" );

// /**  text justify          */
// var _text_justify           = require( __dirname + "/graphics/inline/style/justify.js" );

/**  text align            */
var _align                  = require( __dirname + "/graphics/inline/style/align.js" );




//  ☞  ☞  ☞  Methods from /graphics/box/

/**  box_style     -  Apply any box style!       */
var _box_style              = require( __dirname + "/graphics/box/style.js" );

//        ☞  Methods from /graphics/box/get/

/**  get padding units     */
var _get_padding            = require( __dirname + "/graphics/box/get/padding.js" );

/**  get border units      */
var _get_border             = require( __dirname + "/graphics/box/get/border.js");

/**  get_box_char          */
var _get_box_char           = require( __dirname + "/graphics/box/get/box_char.js" );

//        ☞  Methods from /graphics/box/style/

/**  frame                 */
var _frame                  = require( __dirname + "/graphics/box/style/frame.js" );

/**  pad                   */
var _pad                    = require( __dirname + "/graphics/box/style/pad.js" );

/**  border                */
var _border                 = require( __dirname + "/graphics/box/style/border.js" );

/**  margin                */
var _margin                 = require( __dirname + "/graphics/box/style/margin.js" );




//  ☞  ☞  ☞  Methods from /graphics/display/

//  /**  display_to_box        */
//  var _display_to_box         = require( __dirname + "/graphics/display/to/box.js" );




module.exports = class String {

    constructor() {
	this.text = "";	
    }

    load_text( _text ) {
	this.text = _text
    }





    /**  ansi          --  Applies ANSI around a string of text.   */
    ansi( config ) {
	return _ansi( this, config );
    }

    /**  get_ansi      --  Returns ANSI codes.                     */
    get_ansi( category, value ) {
	return _get_ansi( category, value );
    }

    /**  get_color     --  Returns ANSI format color code.         */
    get_color( category, value ) {
	return _get_color( category, value );
    }




    /*
         =  =    inline formatting    =  =
                                              */

    /**  inline        --  Returns text with inline styles applied.   */
    inline( config ) {
	return _inline( this, config );
    }


    /*
           =  =   box formatting   =  =
                                               */


    /**  get_length    --  Get int from sp, vw, vh             */
    get_length( length_string ) {
	return _get_length( length_string );
    }

    /**  get_width     --  Get int from config w/ auto width.  */
    get_width( config ) {
	return _get_width( this, config );
    }

    /**  get_padding   --  Get a standard padding obj.         */
    get_padding( padding ) {
	return _get_padding( this, padding );
    }

    /**  pad           --  Returns padded text.                    */
    pad( config ) {
	return _pad( this, config );
    }

    /**  align         --  Return text aligned to a width.     */
    align( config ) {
	return _align( config );
    }

    /**  word_wrap     --  Return text with \n.                   */
    wrap( config ) {
	return _wrap( config );
    }

    /*
               =  =   box framing   =  =
                                               */

    /**  get_box_char  --  Returns box characters.             */
    get_box_char( style, weight, directions ) {
	return _get_box_char( style, weight, directions );
    }

    /**  get_border    --  Get a standard border obj.          */
    get_border( config ) {
	return _get_border( this, config );
    }


    /**  frame         --  Returns framed text.                   */
    frame( config ) {
	return _frame( this, config );
    }

    /**  border        --  Returns bordered text.                 */
    border( config ) {
	return _border( this, config );
    }

    /**  box_style     --  Returns text with box styles applied.   */
    box_style( config ) {
	return _box_style( this, config );
    }
    

    /*
           =  =   Multi-box display   =  =
                                               */

    /**  display_to_box --  Turn a list of boxes to a single box.  */
    display_to_box( config ) {
	return _display_to_box( this, config );
    }
   


}


/*

    )   _. mmeeoowwrr!
   (___)''
   / ,_,/
  /'"\ )\

itz

 */