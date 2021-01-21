/*  ktty/methods/inline/style.js
    The function ktty.inline_style( config )

    All inline styling options can be applied here.

    The functions we'll apply will be:

      1.  ktty.space()      --  to remove excess whitespace.

      2.  ktty.get_width()  --  to resolve relative or auto width. 

      3.  ktty.wrap         --  to apply word-wrap and hyphen options. 

      4.  text-justify      --  to justify text
      
      5.  text-align

      6.  ansi styling, including:
        - font-weight
	- brightness
	- decoration
	- color
	- background
	- reverse-video
        
*/

module.exports = function inline_style( ktty, config ) {
    
    /**  First, get the text.  We'll transform it directly.     */
    var text = config.text;

    /**  Apply white-space.                                     */
    text     = ktty.space({
	    text:        text,
	    white_space: config.white_space,
	    position:    config.position
	});

    /**  Resolve width.                                         */

    return _text;
}