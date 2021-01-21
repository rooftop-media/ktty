//  The BB class. 




//  Imports from non-bb places.

/**  Get ktty.     */
var KTTY       = require( __dirname + "/../ktty/ktty.js" );


//  BB imports:

/**  load        */
var _load      = require( __dirname + "/methods/load.js" );

/**  get_tss     */
var _get_tss   = require( __dirname + "/methods/get_tss.js" );

/**  read_file   */
var _read_file = require( __dirname + "/methods/read_file.js" );


module.exports = class BB {

    //  constructor      --  Starting a KTTY session:
    constructor() {
	
	/**  */
	this.ktty = new KTTY();

        /**  Sources we can load!                   */
        this.sources = {
            tss:   [],
            ttml:  []
        }

    }


    //  methods

    /**  Load a ttml file.  This kicks everything off.   */
    load( ttml_path ) {
	return _load( this, ttml_path );
    }

    /**  Get a single TSS file from our sources.         */
    get_tss() {
	return _get_tss( this );
    }


    /**  Get text from a file.                           */
    read_file( file_path ) {
        return _read_file( file_path );
    }

}