/*   load_file  -  Load a TTML file, load TSS & JS srcs.

     
 */


/**  Importing XK, setting up a new instance.    */
var XKitchen = require( __dirname + "/../../xk/xkitchen.js");
var xk       = new XKitchen();


/**  Importing fs, the filesystem interface...   */
var fs       = require("fs");



//  The load function!
module.exports = function load( bb, ttml_path ) {
    


    //  1.  Get the root TTML file!

    /**  Load text from the ttml file...         */
    var ttml_text      = bb.read_file( ttml_path );

    /**  Load the ttml into xkitchen...          */
    xk.load_xml( ttml_text );



    //  2.  Get TSS sources & combine them. 
    
    //  2.1.  Start with the default style.                 */
    var default_src = {
	src:     "@/files/sample/tss/_default.css",
	content: bb.read_file( "@/files/sample/tss/_default.css" )
    }
    bb.sources.tss.push( default_src  );



    //  2.2.  Get style tags from links.                    */
    var link_xml_tags    = xk.getTagsByName( "link" ); 

    /**  Loop thru link tags, get inner text...             */
    for ( var i = 0; i < link_xml_tags.length; i++ ) {

	/**  Get link xml.                                  */
	var link_xml    = link_xml_tags[i];

	/**  We'll use a new xkitchen to get the linko      */
	var temp_xk     = new XKitchen();

	/**  Add the xml to xk...                           */
	temp_xk.load_xml( link_xml );

	/**  Use xk to get the "href" attribute...          */
	var url         = temp_xk.getAttribute("href");

	/** ...and that url can be used to finish the src.  */
	var linked_src  = {
	    src:      url,
	    content:  bb.read_file( url )
	};

	/**  Add the linked src to our source list!         */
	bb.sources.tss.push( linked_src );

    }
    
    //  2.3.  Get styles from style tags.                    
    var style_xml_tags = xk.getTagsByName("style"); 
    
    /**  Loop thru style tags, get inner text...             */
    for ( var i = 0; i < style_xml_tags.length; i++ ) {
	var style_xml  = style_xml_tags[i];
	var temp_xk    = new XKitchen();
	temp_xk.load_xml( style_xml );
	var style_src  = {
	    src:     ttml_path,
	    content: temp_xk.getInnerText(),
	}
	bb.sources.tss.push( style_src );
    }

    //  2.4.  Cascade sources together!
    var cascaded = 

    //  Step 3: Combine TSS & TTML to make a render tree!

}