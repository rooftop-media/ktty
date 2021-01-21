/*  get_padding( padding ) 
 
    input a string or an object. 
    output an object:
    {
      top:    <sp> | <vh> | <vw>
      right:  <sp> | <vh> | <vw>
      bottom: <sp> | <vh> | <vw>
      left:   <sp> | <vh> | <vw>
    }

    Used for margin, padding + border.
 */

module.exports = function get_padding( ktty, padding ) {
    
    /**  Padding object...                       */
    var pad_obj = {
	top:    "",
	right:  "",
	bottom: "",
	left:   ""
    }

    /**  Handling string padding...              */
    if ( typeof padding == "string" ) {

	/**  Getting the padding values.                 */
	var pad_values = padding.split(" ");

	/**  For a single value, apply to all sides.    
       	     Ex:  "padding: 10sp;"                       */
	if      ( pad_values.length == 1 ) {
	    pad_obj.top    = pad_values[0];
	    pad_obj.right  = pad_values[0];
	    pad_obj.bottom = pad_values[0];
	    pad_obj.left   = pad_values[0];
	}

	/**  For 2 values, apply to 
	     top/bottom and left/right.                */
	else if ( pad_values.length == 2 ) {
	    pad_obj.top    = pad_values[0];
	    pad_obj.right  = pad_values[1];
	    pad_obj.bottom = pad_values[0];
	    pad_obj.left   = pad_values[1];
	}

	/**  For 3 values, 1. top, 2. left/right,
	     3. bottom.                                */
	else if ( pad_values.length == 3 ) {
	    pad_obj.top    = pad_values[0];
	    pad_obj.right  = pad_values[1];
	    pad_obj.left   = pad_values[1];
	    pad_obj.bottom = pad_values[2];
	}

	/**  For 4 values...                           */
	else if ( pad_values.length == 4 ) {
	    pad_obj.top    = pad_values[0];
	    pad_obj.right  = pad_values[1];
	    pad_obj.left   = pad_values[2];
	    pad_obj.bottom = pad_values[3];
	}

	/**  Any other number of values is invalid.    */
	else {
	    console.error( "Error in ktty/unit/padding.js -- Invalid padding values: " + padding );
	}

    } /**  End of string handling.                */

    else { 
	console.error( "Unexpected padding value: " + (typeof padding) );
	return;
    }

    return pad_obj;
}
    