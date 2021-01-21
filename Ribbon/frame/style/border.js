/*   border( config )  --  Logic for individual box elements.   */



//  Return text bordered.
module.exports = function border( ktty, config ) {

    var text   = config.text;

    /**  Small variables for weight/style...     */
    var bg     = config.border.bg;
    var color  = config.border.color;
    var width  = config.border.width;

    var w      = config.border.weight;
    var s      = config.border.style;

    //  Must have a style to draw!
    if ( s == undefined || s == "" ) {
	return text;
    }
    
    /**  Getting border material variables...    */
    var color  = ktty.get_ansi( "color", config.color );
    var tl     = ktty.get_box_char( s, w, { n:0, e:1, w:0, s:1, } );
    var top    = ktty.get_box_char( s, w, { n:0, e:1, w:1, s:0, } );
    var tr     = ktty.get_box_char( s, w, { n:0, e:0, w:1, s:1, } );
    var right  = ktty.get_box_char( s, w, { n:1, e:0, w:0, s:1, } );
    var br     = ktty.get_box_char( s, w, { n:1, e:0, w:1, s:0, } );
    var bottom = ktty.get_box_char( s, w, { n:0, e:1, w:1, s:0, } );
    var bl     = ktty.get_box_char( s, w, { n:1, e:1, w:0, s:0, } );
    var left   = ktty.get_box_char( s, w, { n:1, e:0, w:0, s:1, } );
    var reset  = ktty.get_ansi( "reset" );

    /**  Setting up the border config...        */
    var border_frame_config = {
	text:     text,
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
    var bordered_text = ktty.frame( border_frame_config );

    /**  Return bordered text!                  */
    return bordered_text;
    
}