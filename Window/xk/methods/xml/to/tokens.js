/*    tokenize_xml   --- Pass in an XML string,
                         returns a list of labelled tokens.  
    
			 Token labels:

	  TAG-OPEN:  <           TEXT:       [string]   
	  TAG-CLOSE: >                                  
          TAG-SLASH: /           ATTR-NAME:  [string]   ATTR-EQUAL: ="
          TAG-NAME:  [string]    ATTR-VALUE: [string]   ATTR-END:   "

                                                                          */
module.exports = function tokenize_xml( xml_string ) {

    /**  We'll return this at the end:        */
    var tokens          = [];     
    
    /**  Mark when we're looking in a tag:    */
    var in_tag          = false;
    
    /**  Mark when we're capturing a string:  */
    var capture_type    = 'NONE';  // TAG-NAME | ATTR-NAME | ATTR-VALUE | TEXT
    
    /**  Store strings as we capture them:    */
    var capture_text    = '';
    
    /**  Call this to capture a token string: */
    function capture() {
	if ( capture_type != 'NONE' && capture_text.length > 0 ) {
	    tokens.push( capture_type + ": " + capture_text );
	}
	capture_text = '';
	capture_type = 'NONE';
    }
    
    /**  loop thru xml! */
    for ( var i = 0; i < xml_string.length; i++ ) {

	var character = xml_string[i];
	/*  React to  <                       */
	if ( character == '<' ) {
	    capture();
	    in_tag       = true;
	    capture_type = 'TAG-NAME';
	    tokens.push( 'TAG-OPEN: <' );
	} 
	
	/*  React to  >                       */
	else if ( character == '>' ) {
	    capture();
	    in_tag       = false;
	    capture_type = 'TEXT';
	    tokens.push( 'TAG-CLOSE: >' );
	} 
	
	/*  React to  /                       */
	else if ( character == '/' && in_tag && capture_type != "ATTR-VALUE" ) {
	    capture();
	    tokens.push( 'TAG-SLASH: /' );
	    capture_type = 'TAG-NAME';
	} 
	
	/*  React to  =                       */
	else if ( character == '=' && in_tag ) {
	    i++;
	    if ( xml_string[i] == '"' ) {
		capture();
		tokens.push( 'ATTR-EQUAL: ="' );
		capture_type = 'ATTR-VALUE';
	    } else {
		console.error("!! Error tokenizing XML: = must be followed by \"");
		return 0;
	    }
	} 

	/*  React to  "                       */
	else if ( character == '"' && in_tag ) {
	    capture();
	    tokens.push( 'ATTR-END: "' );
	    capture_type = 'ATTR-NAME';
	} 
	
	/*  React to  SPACE                   */
	else if ( character == " " && in_tag && capture_type != 'ATTR-VALUE' ) {
	    capture();
	    capture_type = 'ATTR-NAME';
	}
	
	/*  React to  \n and \t               */
	else if ( character == "\n" || character == "\t" ) {
	    // nuthin
	}

	/*  React to  other text              */
	else {
	    if ( character != ' ' || capture_text.length > 1 )
		capture_text += character;
	}
	
    } /**  End of for loop.  */
    return tokens;
}