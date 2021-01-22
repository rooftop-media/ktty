/*  xss_to_tokens  --- Pass in an XSS string,
                       returns a list of labelled tokens.  
			 
	  Token categories:

	  SELECTOR:     [string]
	  COMMA:        ,
	  OPEN-BRACE:   {        
	  RULE-NAME:    [string]
	  RULE-COLON:   :        
	  RULE-VALUE:   [string]
	  RULE-END:     ;        
	  CLOSE-BRACE:  }        


                                                                          */
module.exports = function tokenize_xss( xss_string ) {

    /**  We'll return this at the end:        */
    var tokens          = [];     
    
    /**  Mark when we're capturing a string:  */
    var capture_type    = 'SELECTOR';  //  SELECTOR | RULE-NAME | RULE-VALUE
    
    /**  Store strings as we capture them:    */
    var capture_text    = '';
    
    /**  Call this to capture a token string: */
    function capture() {
	if ( capture_text.length > 0 ) {
	    tokens.push( capture_type + ": " + capture_text );
	    capture_text = '';
	}
    }
    
    /**  loop thru xss! */
    for ( var i = 0; i < xss_string.length; i++ ) {
	
	var character = xss_string[i];
	
	/*  React to  {                           */
	if        ( character == '{' ) {
	    capture();
	    capture_type = 'RULE-NAME';
	    
	/*  React to  :                           */
	} else if ( character == ':' ) {
	    capture();
	    capture_type = 'RULE-VALUE';
	    
        /*  React to  ;                           */
	} else if ( character == ';' ) {
	    capture();
	    capture_type = 'RULE-NAME';
	    
	/*  React to  }                           */
	} else if ( character == '}' ) {
	    capture();
	    capture_type = 'SELECTOR';

	/*  React to  whitespace ( " ", "\n", "\t" )         */
	} else if ( character == "\n" || character == "\t" || character == " " ) {
	    // nuthin
	    if ( capture_type == "RULE-VALUE" ) {
		capture_text += character;
	    }
    
	/*  React to other text              */
	} else {
	    capture_text += character;
	}
	
    } /**  End of for loop.  */
    
    return tokens;
}