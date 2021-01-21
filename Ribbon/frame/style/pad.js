/*   pad( text, config )  
      --  Return an element with padding applied.   
*/



module.exports = function _pad( ktty, config ) {

    /**  Get the text...                         */
    var text    = config.text;

    /**  Reading the config, which might look like "2sp 3sp 2sp 10sp"   */
    var padding = ktty.get_padding( config.padding );


    /**   Setting up the padding config...       */
    var pad_frame_config = {
	text:      text,
	padding:   [ ktty.get_length(padding.top), 
		     ktty.get_length(padding.right), 
		     ktty.get_length(padding.bottom), 
		     ktty.get_length(padding.left) ],
	material:  [' ',' ',' ',' ',' ',' ',' ',' ']
    };
	
    /**   Getting the padded text...             */
    var padded_text = ktty.frame( pad_frame_config );
    
    return padded_text;
};