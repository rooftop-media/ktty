/*  text_align( config )

    Returns text, aligned
                                                   */


//  text align
module.exports = function text_align( config ) {

    //  unpack config

    /**  The text to align...                         */
    var text           = config.text;

    /**  The align style (center|left|right|justify)  */
    var align_type     = config.align_type;

    /**  The width.                                   */
    var width          = config.width;

    //  Set up 

    /**  This is what we're returning.             */
    var aligned_text   = "";

    /**  Get the lines in our text:                */
    var lines = text.split('\n');

    /**  Whitespace factory                        */
    function get_space( num ) {
	var spaces = "";
	while ( spaces.length < num ) {
	    spaces = spaces + " ";
	}
	return spaces;
    }

    //  Align text!

    /**  Loop through lines.                       */
    for (var i = 0; i < lines.length; i++) {

	/**  Get the current line.                       */
	var line = lines[i];

	/**  Store the current line's aligned version.   */
	var aligned_line = "";

	/**  Line lengths should be under the width.     */
	if ( line.length > width ) {
	    console.error("Error - wrap text before it's aligned to a width!");
	    return;
	}

	/**  This is the number of spaces to add.      */
	var spaces_to_add  = width - line.length;

	/**  Center align:                             */
	if      ( align_type == "center" ) {
	    var half = Math.floor( ( spaces_to_add ) / 2 );
	    aligned_line = get_space( half ) + line + get_space( half );
	}

	/**  Left align:                               */
	else if ( align_type == "left" ) {
	    aligned_line = line + get_space( spaces_to_add );
	}

	/**  Right align:                              */
	else if ( align_type == "right" ) {
	    aligned_line =  get_space( spaces_to_add ) + line; 
	}
	
	/**  Justify:                               */
	else if ( align_type == "justify" ) {
	    var words           = line.split(' ');
	    var spaces_removed  = words.length - 1;
	    spaces_to_add  += spaces_removed;
	    
	    var space_size      = Math.floor( spaces_to_add / words.length - 2);
	    var remainder       = spaces_to_add % words.length - 2;
	    
	    for ( var i = 1; i < words.length - 1; i++ ) {
		aligned_line += words[i];
		aligned_line += get_space( space_size );
		if ( remainder > 0) {
		    remainder--;
		    aligned_line += " ";
		}
	    } 
	}

	else {
	    console.error("Problem in text_align: Invalid align_type! " + align_type );
	}

	/**  Add the line to our total text!                  */
	aligned_text += aligned_line;
	
	/**  Add a \n after every line except the last one.   */
	if ( i < (lines.length-1) ) {
	    aligned_text += "\n";
	}

    } /**  End loop thru lines.  */
	
    return aligned_text;
}