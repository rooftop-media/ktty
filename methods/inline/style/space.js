/*  ktty/methods/inline/style/space.js
    The function ktty.space( config )

    Returns config.text with white-space altered 
    according to config.white_space and config.position. 

    There are 3 options:

     1. "Normal" or "nowrap" collapse repeated whitespace into 1 whitespace, removing all \n's. 
     2. "pre" and "pre-wrap" preserve repeated whitespace.
     3. "pre-line" collapses repeated whitespace but preserves \n's unless there's 2 in a row.

*/

module.exports = function space( ktty, config ) {
    
    /**  The text to remove whitespace from...                                              */
    var text = config.text;

    /**  The white_space option: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap"      */
    var white_space      = config.white_space;
    
    /**  Should we preserve *all* whitespace?   True for "pre" and "pre-wrap"       */
    var preserve_all     = ( white_space == "pre" || white_space == "pre-wrap" );

    /**  Should we preserve line breaks?  True for "pre-line"                        */
    var preserve_lines   = ( white_space == "pre-line" );

    //  If preserve_all, return the text with space at the beginning end end trimmed off
    if ( preserve_all ) {
	return text.trim();
    }

    //  If we're just preserving lines, delete duplicate spaces.
    else if ( preserve_lines ) {
	
	console.warn("Not yet implemented");

	return text.trim();
    }

    //  Otherwise, remove all duplicate spaces and ALL line breaks. 
    else {
	/**  Using regex for this. "\s" means "whitespace", "+" means look for multiple chars. */
	text = text.replace(/\s+/g, ' ');
	return text.trim();
    }
}