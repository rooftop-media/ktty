/*  Ribbon/ribbon.js  -  A class to manage a stylizable string.   */


//  ☞  Importing display methods, bundled in "display.js".
var _display                = require( __dirname + "/methods/display.js" );


module.exports = class Ribbon {

    /**  Making a new Ribbon!         */
    constructor( config={} ) {

	//  The text config:
	this.text   = config.text;
	
	//  The style config options:
	this.style  = {
	    display:           config.display,
	    
	    color:             config.color,
	    background:        config.background,
	    font_weight:       config.font_weight,
	    text_decoration:   config.text_decoration,
	    brightness:        config.brightness,
	    reverse_video:     config.reverse_video,
	    
	    white_space:       config.white_space,
	    width:             config.width,
	    height:            config.height,
	    box_sizing:        config.box_sizing,
	    word_wrap:         config.word_wrap,
	    text_align:        config.text_align,
	    text_justify:      config.text_justify,
	    overflow:          config.overflow,

	    padding:           config.padding,
	    border:            config.border,
	    margin:            config.margin,

	    position:          config.position,
	    top:               config.top,
	    right:             config.right,
	    bottom:            config.bottom,
	    left:              config.left
	}
    }

    //  Apply styling:
    display() {
	return _display(this);
    }

    
}
