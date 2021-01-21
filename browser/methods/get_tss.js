/*   get_tss  -  Cascade tss from sources & return a single tss file.       */


/**  Importing XK, setting up a new instance.    */
var XKitchen = require( __dirname + "/../../xk/xkitchen.js");
var xk       = new XKitchen();


/**  Importing fs, the filesystem interface...   */
var fs       = require("fs");



module.exports = function get_tss( bb ) {
    
    /**  An array of objects that look like { src: "...", content: "..." }  */
    var tss_srcs      = bb.sources.tss;

    /**  A string where we'll build our cascaded tss.                       */
    var computed_tss  = "";



    

}