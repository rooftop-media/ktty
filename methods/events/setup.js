//  KTTY – Scripting tools to use the Terminal!





//  setup_input  -  Mapping important input listeners.
module.exports = function set_up_input( listener_obj ) {
    
    /**  Listening for all key inputs.          */
    process.stdin.setRawMode( true );
    
    /**  Keep listening until process.exit();   */
    process.stdin.resume();
    
    /**  This is what we'll do on each keypress */
    function input_reaction( key_code ) {
	var key = key_code.toString('utf8');

	/**  Close on ctrl-c:        */
	if ( key == '\u0003' ) {
	    process.exit();
	} 
	
	/**  Detect ENTER:           */
	else if ( key == '\u000d' ) {
	    listener_obj[ "enter" ]();
	}
	
	/**  Detect UP arrow key.    */
	else if ( key_code.toString('hex') == '1b5b41' ) {
	    listener_obj[ "up" ]();
	}
	
	/**  Detect DOWN arrow key.  */
	else if ( key_code.toString('hex') == '1b5b42' ) {
	    listener_obj[ "down" ]();
	}

	/**  Detect BACKSPACE arrow key.  */
	else if ( key_code.toString('hex') == '7f' ) {
	    listener_obj[ "backspace" ]();
	}
	
	/**  All other keys:         */
	else {
	    listener_obj[ "text" ]( key_code.toString() );
	}
	
    } /** End input_reaction */
    
    /**  Mapping our input_reaction to the process stdin     */
    process.stdin.on( 'data', input_reaction );		      
    
}
