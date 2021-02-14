//  xk/tests/xss.js


//  Import xk

/**  Import xkitchen...                   */
var XK     = require( __dirname + "/../xkitchen.js" );

/**  Make a new xk...                     */
var xk  = new XK();


//  set up ktty

/**  import KTTY... */
var KTTY   = require( __dirname + "/../../ktty/ktty.js");

/**   Make a new ktty...                 */
var ktty = new KTTY();




//  Get sample xss

/**  File system tools...                 */
var fs       = require("fs");

/**  Get sample xml...                    */
var test_xml = fs.readFileSync( __dirname + "/samples/sample.xml", {encoding: "utf8"} );

/**  Get sample xss...                    */
var test_xss = fs.readFileSync( __dirname + "/samples/sample.css", {encoding: "utf8"} );


/**  Printing XSS...                      */
function part_1() {
    console.log( "\n  x  -  xKitchen Render Tests  -  x  \n");
    console.log( "\n  In this file's tests, we'll use xKitchen to do the full browser thing...");
    console.log( "  combine XML & CSS to a render tree, then render it!\n");
    
    console.log( "  First, let's... ");
    console.log( "   - load a string of XML from \u001b[4msample.xml\u001b[24m into XK using xk.load_xml(str)" );
    console.log( "   - load a string of XSS from \u001b[4msample.css\u001b[24m into XK using xk.load_xss(str)" );

    xk.load_xss( test_xss );
    xk.load_xml( test_xml );

}

function part_2() {
    console.log( "  Here's \u001b[4msample.xml\u001b[24m, displayed with xk.getXML() ");
    console.log( xk.getXML() );

}

function part_3() {
    console.log( "  Here's \u001b[4msample.xss\u001b[24m, displayed with xk.getXSS() ");
    console.log( xk.getXSS() );
}



function part_4() {
    console.log( "  Using both XML & XSS nodes, we can create a list of render nodes...\n");
    console.log( "  ... done via xk.get_render_nodes() ");
    console.log( xk.get_render_nodes() );
}

function part_5() {
    console.log( "  We'll turn our render nodes into nested JSON. " );
    console.log( "  Here's xk.get_json() " );
    console.log( xk.get_json() );
}

function part_6() {

}



//  Set up the test runner...                                                                                          
var tests = [ part_1, part_2, part_3, part_4, part_5, part_6 ];

//  Function to run parts
function run_test() {

    /**  If we're out of test parts, end */
    if (tests.length == 0 ) {
        process.exit();
    }

    var test = tests.shift();
    test();

    var prompt_text = {
        text:       "[ Press enter to run the next test... ]",
        brightness: "dim",
        padding: "1sp 1sp 1sp 1sp"
    }
    if (tests.length > 0 )
	console.log( ktty.box_style( prompt_text ) );
}

ktty.on('enter', run_test);

// run the first one                                                                                                   
run_test();