/*  ktty – Scripting tools to use the Terminal! 
           This file bundles all of KTTY's features. 
	   [ art from ascii-art.de/ascii/c/cat.txt ]
*/
                                       //      _                ___       _.--.
                                       //      \`.|\..----...-'`   `-._.-'_.-'`
                                       //      /  ' `         ,       __.--'
//  Importing file tools from node:    //      )/' _/     \   `-_,   /
var fs  = require('fs');               //      `-'" `"\_  ,_.-;_.-\_ ',  
                                       //          _.-'_./   {_.'   ; /   fsc/as
                                       //        {_.-``-'         {_/


/*  Import all KTTY files in these next ~100 line...                           */




//  ☞  ☞  ☞  Methods from /methods/ansi/

/**  ansi   -  Apply ANSI codes around some string.   */
var _ansi                   = require( __dirname + "/methods/ansi/index.js" );

/**  get ansi codes        */
var _get_ansi               = require( __dirname + "/methods/ansi/get/code.js" );

/**  get ansi color code   */
var _get_color              = require( __dirname + "/methods/ansi/get/color.js" );



//  ☞  ☞  ☞  Methods from /methods/inline/

/**  inline  -  Apply any inline style to a string.    */
var _inline                 = require( __dirname + "/methods/inline/index.js" );

/**  get space unit        */
var _get_length             = require( __dirname + "/methods/inline/get/length.js" );

/**  get auto width        */
var _get_width              = require( __dirname + "/methods/inline/get/width.js" );

//        ☞  Methods from /methods/inline/style/

/**  word wrap             */
var _wrap                   = require( __dirname + "/methods/inline/style/wrap.js" );

// /**  text justify          */
// var _text_justify           = require( __dirname + "/methods/inline/style/justify.js" );

/**  text align            */
var _align                  = require( __dirname + "/methods/inline/style/align.js" );




//  ☞  ☞  ☞  Methods from /methods/box/

/**  box_style     -  Apply any box style!       */
var _box_style              = require( __dirname + "/methods/box/style.js" );

//        ☞  Methods from /methods/box/get/

/**  get padding units     */
var _get_padding            = require( __dirname + "/methods/box/get/padding.js" );

/**  get border units      */
var _get_border             = require( __dirname + "/methods/box/get/border.js");

/**  get_box_char          */
var _get_box_char           = require( __dirname + "/methods/box/get/box_char.js" );

//        ☞  Methods from /methods/box/style/

/**  frame                 */
var _frame                  = require( __dirname + "/methods/box/style/frame.js" );

/**  pad                   */
var _pad                    = require( __dirname + "/methods/box/style/pad.js" );

/**  border                */
var _border                 = require( __dirname + "/methods/box/style/border.js" );

/**  margin                */
var _margin                 = require( __dirname + "/methods/box/style/margin.js" );




//  ☞  ☞  ☞  Methods from /methods/display/

//  /**  display_to_box        */
//  var _display_to_box         = require( __dirname + "/methods/display/to/box.js" );




//  ☞  ☞  ☞  Methods from /methods/events/

/**  Called in constructor, maps listeners to stdin.      */
var _setup                  = require( __dirname + "/methods/events/setup.js");



                                        //     |\      _,,,---,,_
                                        //     /,`.-'`'    -.  ;-;;,_
//  The KTTY class.                     //    |,4-  ) )-,_..;\ (  `'-'
module.exports = class KTTY {           //   L'---''(_/--'  `-'\_)  fL
    
    //  constructor      --  Starting a KTTY session:
    constructor() {
	
	/**  These functions can be remapped!  :)   */
	this.listeners       = {
	    'text':  function(key) {},
	    'any':   function(key) {},
	    'up':    function() {},
	    'down':  function() {},
	    'left':  function() {},
	    'right': function() {},
	    'enter': function() {},
	    'backspace': function() {},
	}

	/**  Map listeners to stdin.                */
	this.setup();
	
    }
    



    /*
          =  =     ANSI styling    =  =
                                              */

    /**  ANSI          --  Returns ANSI codes.                     */
    get_ansi( category, value ) {
	return _get_ansi( category, value );
    }

    /**  COLOR         --  Returns ANSI format color code.         */
    get_color( category, value ) {
	return _get_color( category, value );
    }

    /**  ansi          --  Applies ANSI around a string of text.   */
    ansi( config ) {
	return _ansi( this, config );
    }


    /*
         =  =    inline formatting    =  =
                                              */

    /**  inline_style  --  Returns text with box styles applied.   */
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
   



    /*
               =  =   Events   =  =
                                          */

    /**  set_up_input  --  Mapping important input listeners.  */
    setup() {
	return _setup( this.listeners );
    }

    /**  on            --  Map an event listener.              */
    on( event_name, callback ) {
	return this.listeners[ event_name ] = callback;
    }

}


/*

    )   _. mmeeoowwrr!
   (___)''
   / ,_,/
  /'"\ )\

itz

 */