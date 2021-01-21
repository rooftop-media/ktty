/*  get_border( config)
 
    input:  a text box config.
    output: an object like
    {
      bg:     none | <color> 
      color:  none | <color>
      width:  none | <width>
      weight: light | heavy
      style:  normal | dotted
    }

 */

module.exports = function get_border( ktty, config ) {
    
    /**  This is what we'll output by default.  */
    var border_obj = {
	bg:     "none",   //  none | <color>
	color:  "none",   //  none | <color>
	width:  0,        //  none | <width>
	weight: "light",  //  light | heavy
	style:  "normal"  //  normal | dotted
    }

    /**  box_config.border might look like "solid 1sp red".  any order works  */
    if ( typeof config.border == "string" ) {
	var parts = config.border.split(" ");
	
	/**  order doesn't matter  */
	for ( var i = 0; i < parts.length; i++ ) {
	    var val = parts[i];
	    if ( val == "solid" || val == "dotted" ) {
		border_obj.style = val;
	    }
	    else if ( ktty.get_length(val) != -1 ) { 
		border_obj.width = ktty.get_length(val);
	    }
	    
	    else {  /** Todo: make ktty.get_color() validtor */
		border_obj.color = val;
	    }
	}
    }

    /**  the shorthand "border" can be overwritten. */
    if ( config.border_bg ) {
	border_obj.bg      = config.border_bg;
    }
    if ( config.border_color) {
	border_obj.color   = config.border_color;
    }
    if ( config.border_width) {
	border_obj.width   = config.border_width;
    }
    if (config.border_weight) {
	border_obj.weight  = config.border_weight;
    }
    if (config.border_style) {
	border_obj.style   = config.border_style;
    }

    return border_obj;
}
    