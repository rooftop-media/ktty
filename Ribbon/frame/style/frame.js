/*  frame( config )

    Returns text, padded n bordered.

                                                   */


//  frame
module.exports = function frame( ktty, config ) {

    var text       = config.text;

    /**  Copy box material object:                      */
    var material   = config.material;

    /**  If the material is an array, make it an obj:   */
    if ( Array.isArray ( material ) ) {
	material   = {
	    tl:     config.material[0],
	    top:    config.material[1],
	    tr:     config.material[2],
	    right:  config.material[3],
	    br:     config.material[4],
	    bottom: config.material[5],
	    bl:     config.material[6],
	    left:   config.material[7],
	}
    }


    /**  Copy the padding object:                       */
    var padding    = config.padding;

    /**  If it was an array, make it a padding obj.     */
    if ( Array.isArray( padding ) ) {
	padding = {
	    top:     padding[0],
	    right:   padding[1],
	    bottom:  padding[2],
	    left:    padding[3],
	}
    }



    //  Getting lines from the text...
    
    var lines      = text.split("\n");


    //  Getting box dimensions:

    /**  Get width number.    */
    var width      = padding.left + ktty.get_width( {text: text} ) + padding.right;

    /**  Get height: border + padding + line total.          */
    var height     = padding.top + lines.length + padding.bottom;



    //  Making the box: 

    /**  Where we'll store lines:              */
    var boxed_lines  = [];

    /**  Making the top:                       */
    var top_line     = "";

    /**  The top line will be the full width.  */
    for (var i = 0; i < width; i++ ) {

	/**  top left:     */
	if ( i < padding.left ) {
	    top_line += material.tl;
	} 

	/**  top middle:   */
	else if ( i < padding.left + lines[0].length ) {
	    top_line += material.top;
	} 
	
	/**  top right:    */
	else {
	    top_line += material.tr;
	}
    }

    /**  Adding the top line:          */
    for ( var i = 0; i < padding.top; i++ ) {
	boxed_lines.push( top_line );
    }

    /**  Making the text:              */
    for ( var i = 0; i < lines.length; i++ ) {

	var text_line = "";

	for ( var l = 0; l < padding.left; l++ ) 
	    text_line += material.left;
	
	text_line += lines[i];

	for ( var r = 0; r < padding.right; r++ ) 
	    text_line += material.right;

	/**  Adding text lines  */
	boxed_lines.push( text_line );

    }

    /**  And finally, making the bottom border: */
    var bottom_line  = "";

    for (var i = 0; i < width; i++ ) {

	/**  bottom left:     */
	if ( i < padding.left ) {
	    bottom_line += material.bl;
	} 

	/**  bottom middle:   */
	else if ( i < padding.left + lines[0].length ) {
	    bottom_line += material.bottom;
	} 
	
	/**  bottom right:    */
	else {
	    bottom_line += material.br;
	}
	
    }

    /**  Adding the bottom lines to the array! */    
    for (var i = 0; i < padding.bottom; i++ ) {
	boxed_lines.push( bottom_line );	
    }


    
    /**  Last, let's convert it to a string.  */
    var boxed_text = "";
    for ( var i = 0; i < boxed_lines.length; i++ ) {
	boxed_text += boxed_lines[i] + "\n";
    }
    

    return boxed_text;

}