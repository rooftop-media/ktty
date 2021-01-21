//  unit( unit_string ) - resolve a unit. 


/**  get_vh        --  Get a fraction of the viewport h.   */
function get_vh( vh_num ) {
    var vh_percent   = vh_num / 100;
    var total_vh     = process.stdout.rows;
    return( Math.floor( total_vh * vh_percent ) );
}

/**  get_vw        --  Get a fraction of the viewport w.   */
function get_vw( vw_num ) {
    var vw_percent   = vw_num / 100;
    var total_vw     = process.stdout.columns;
    return Math.floor( total_vw * vw_percent );
}





module.exports = function get_unit( unit_string ) {
    
    /**  Getting individual value / unit.        */
    var value = unit_string.slice( 0, unit_string.length - 2 );
    var unit  = unit_string.slice( unit_string.length - 2, unit_string.length );
    
    /**  Make the string value into a num.       */
    value = Number( value );

    /**  Value must be a proper number.          */
    if ( isNaN( value ) ) {
	console.error("Invalid unit value in get_unit.js: " + unit_string );
	return;
    }
    
    /**  vw - percentage of viewport width.      */
    if ( unit == "vw" ) {
	return get_vw( value );
    }

    /**  vh - percentage of viewport height.     */
    else if ( unit == "vh" ) {
	return get_vh( value );
    }

    /**  sp - character spaces.                  */
    else if ( unit == "sp" ) {
	return value;
    } else {
	console.error("Invalid unit in get_unit.js: " + unit_string );
    }

}
    