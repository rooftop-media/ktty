/*   check_box( config )  --  Logic for individual box elements.   

     Input:   Box config object.
     Output:  Results object.
 */




//  Validate a box config object.
module.exports = function check_box( config ) {

    /**  We'll return this.                 */
    var results = {
	pass:   true,
	notes:  []
    }


    /**  sub function to validate each fields!   */
    function check_field( field_name, options ) {

	/**  Guilty until proven innocent   */
	var _is_option = false;

	/**  Loop through options.          */
	for ( var i = 0; i < options.length; i++ ) {

	    /**  If "*" is an option, any string will do.   */
	    if ( options[i] == "*" && typeof config[field_name] == "string"  ) {
		_is_option = true;
	    }

	    /**  For all other options, the config value has to match. */
	    else if ( config[field_name] == options[i] ) {
		_is_option = true;
	    }

	} /**  End looping thru options. */

	/**  If no option was found, write it up!!!    */
	if ( !_is_option ) {

	    results.pass = false;
	    var report   = config.id + ": \x1b[1m" + field_name + "\x1b[22m must be ";
            while (options.length > 1)
                report  += "\x1b[1m" + options.shift() + "\x1b[22m or ";
            report      += "\x1b[1m" + options.shift() + "\x1b[22m.";

            result.notes.push( report )
	}

    } /**  End subfunction check_field   */
    


    //  Now let's use our check_field function to check each field!

    check_field( "id",   ["*"] );
    check_field( "text", ["*", ""] );

    //  1.	Block or inline?  Inline tags skip a lot of steps, good for <b>, etc. 
    check_field( "display", [
			     "block",         //  adds an "\n" at the end of the text, after 5. 
			     "inline-block",  //  ...
			     "inline"         //  ignores all but step 5
			     ] );

    //  2.  Height / width stats are both ultimately <int>'s.
    check_field( "height",  [
			     "auto",           //  height calculated by text's \n count. ( Watch text + wrap )
	                     "<vh>",           //  height a % of viewport height.  ( Listen on resize! )     
                             "<int>"           //  absolute height. 
			    ] );
			     
    check_field( "width",   [   
                             "auto",           //  width calculated by max line length. ( watch text )
	                     "<vw>",           //  width a % of viewport width.
                             "<int>"           //  absolute width. 
			    ] );

    //  3.  How to draw the box.
    check_field( "box-sizing", [
				"content-box", //  Text content is the size of height / width. 
                                "border-box",  //  Text content shares height / width with padding + border.
			       ] );

    //  4.  How to handle overflow.
    check_field( "overflow-x", [
				"wrap",          //  Apply a word-wrap 
				"scroll",        //  Let the user scroll horizontally. ( Listen on scroll )
                                "hidden"         //  Hide overflow.
			       ] );

    check_field( "overflow_y", [
				"scroll",        //  Let the user scroll vertically. ( Listen on scroll )
                                "hidden"         //  Don't show anything past the height. 
			       ] ); 



    //  5.  How to make the text's line lengths match the height / width. 
    check_field( "word_wrap", [
			       "",
			       "normal",         //  if a line.length > width, replace the last " " with "\n".
			       "break-word"      //  if a line.length > width, add a "\n" at the width position.
			      ] ); 

    check_field( "text_align", [
                                "left",          //  if a line.length < width, add whitespace to the right.
	                        "right",         //  if a line.length < width, add whitespace to the left.
                                "center",        //  if a line.length < width, add whitespace around text.
                                "justify"        //  if a line.length < width, add whitespace between words. 
			       ] );
    
    //  6.  We're done messing with the content, now style it with ANSI stuff. 
    check_field( "color",         [ "<color>" ] );       
    check_field( "background",    [ "<color>" ] );             
    check_field( "brightness",    [ "normal", "bright", "dim" ] );
    check_field( "decoration",    [ "none", "underline", "line-through" ] );
    check_field( "reverse_video", [ "yes-please", "no-thanks" ] );



    //  7.  We can now add our padding.
    check_field( "padding", [ "<padding>" ] ); 


    //  8.  Border rendering - between padding & margin...
    check_field( "border_style",  [ "solid", "double", "dash-3", "dash-4", "char(<char>)" ] );
    check_field( "border_weight", [ "light", "heavy" ] );
    check_field( "border_color",  [ "<color>" ] );
    check_field( "border_bg",     [ "<color>" ] );
    check_field( "border_width",  [ "<num>" ] );
    
    
    //  9.  Space around the box's border. 
    check_field( "margin", [ "<margin>" ] );

    


    // 10.  This affects the DOCUMENT FLOW & cursor ansi movement later.
    check_field( "position", [
                              "static",             //  draw unmoved, at the position in the document flow.
			      "absolute",           //  draw moved relative to the top left of the buffer. 
			      "relative",           //  draw moved relative to position in document flow.
			      "fixed",              //  draw moved relative to the top left of the screen.
			      "sticky"              //  draw fixed, until scrolled to edge of screen. 
			      ] );
    
    // 11.  Units indicating the top left corner of a "moved" box.
    check_field( "top",    ["<num>", "<vh>"] ); 
    check_field( "left",   ["<num>", "<vw>"] ); 
    check_field( "bottom", ["<num>", "<vh>"] );
    check_field( "right",  ["<num>", "<vw>"] );


    //  12.  Draw preferences.
    check_field( "whitespace", ["print", "transparent" ] );
    
    
    //  13.  bonus? 
    check_field( "box_shadow", ["<box-shading>"] );  //     <box-shading>   // bonus?
    

    /**  Finally, return results!!          */
    return results;


};