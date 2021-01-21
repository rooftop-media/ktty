/*   border( text, config )  --  Logic for individual box elements.   */



//  Return text bordered.
module.exports = function border( _ktty, text, config ) {

    /**  Small variables for weight/style...     */
    var bg     = config.border_bg;
    var color  = config.border_color;
    var width  = config.border_width;

    var w      = config.border_weight;
    var s      = config.border_style;

    //  Must have a style to draw!
    if ( s == undefined || s == "" ) {
	return text;
    }
    
    /**  Getting border material variables...    */
    var color  = _ktty.ANSI( "color", config.border_color );
    var tl     = _ktty.BoxChar( s, w, { n:0, e:1, w:0, s:1, } );
    var top    = _ktty.BoxChar( s, w, { n:0, e:1, w:1, s:0, } );
    var tr     = _ktty.BoxChar( s, w, { n:0, e:0, w:1, s:1, } );
    var right  = _ktty.BoxChar( s, w, { n:1, e:0, w:0, s:1, } );
    var br     = _ktty.BoxChar( s, w, { n:1, e:0, w:1, s:0, } );
    var bottom = _ktty.BoxChar( s, w, { n:0, e:1, w:1, s:0, } );
    var bl     = _ktty.BoxChar( s, w, { n:1, e:1, w:0, s:0, } );
    var left   = _ktty.BoxChar( s, w, { n:1, e:0, w:0, s:1, } );
    var reset  = _ktty.ANSI( "reset" );

    /**  Setting up the border config...        */
    var border_frame_config = {
	padding:  [1,1,1,1],
	material: [
		   color + tl, 
		   top, 
		   tr,
		   color + right,
		   br + reset,
		   bottom,
		   bl,
		   left + reset
		  ]
    };

    /**  Getting the bordered text!            */
    var bordered_text = _ktty.frame( text, border_frame_config );

    /**  Return bordered text!                  */
    return bordered_text;
    
}