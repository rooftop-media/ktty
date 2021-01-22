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

/**  Get sample xss...                    */
var test_xss = fs.readFileSync( __dirname + "/samples/sample.css", {encoding: "utf8"} );

/**  Printing XSS...                      */
function part_1() {
    console.log( "\n  x  -  xKitchen XSS Tests  -  x  \n");
    console.log( "\n  The first section will test parsing XSS into tokens & nodes.");
    console.log( "\n  We'll start by getting xss from a file, and loading it into xk.");
    console.log( "  Here's the file, \u001b[4msample.css\u001b[24m:\n" );

    console.log( test_xss );

    console.log( "\n  And here's the relevant code: ");
    console.log( "\n  var test_xss = fs.readFileSync( __dirname + \"/samples/sample.css );");
    console.log( "  xk.load_xss( test_xss ); ");

    xk.load_xss( test_xss );

}

function part_2() {

    console.log( "  Here's \u001b[4msample.css\u001b[24m with syntax highlighting, ");
    console.log( "  using xk.getXSS();\n" );

    /**  Printing XSS with syntax highlights: */
    console.log( xk.getXSS() );
}

function part_3() {
    console.log( "  And here's \u001b[4msample.css\u001b[24m as an array of nodes, ");
    console.log( "  using xk.xss_to_tokens()" );
    console.log( xk.xss_to_tokens() );
}

/**  Get sample xss...                    */
var default_xss = fs.readFileSync( __dirname + "/samples/default.css", {encoding: "utf8"} );

function part_4() {
    console.log( "\n  Next, we load in a second xss sample, \u001b[4mdefault.css\u001b[24m, which looks like this: ");
    console.log( default_xss );
}

function part_5() {
    console.log( "  Now let's add this second source to xk with xk.add_xss( default_xss ); ");
    xk.add_xss( default_xss );
    console.log( "  Displaying it with xk.getXSS() looks like this - \n" );
    console.log( xk.getXSS() );

    console.log( "  Note that  xk.add_xss( default_xss ); added the new file to the beginning of our xss.\n");
    console.log( "  Content at the beginning may be overruled when we cascade in the next step, so" );
    console.log( "  add files in reverse priority. " );
}

function part_6() {
    console.log( "  Let's log xk.cascade_xss(); to merge duplicate stuff.." );
    console.log( xk.cascade_xss() );
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

    var prompt = {
        text:       "[ Press enter to run the next test... ]",
        brightness: "dim",
        padding: "1sp 1sp 1sp 1sp"
    }
    if (tests.length == 0 ) {
	prompt.text = "[ Tests complete!  Press enter to exit tests. ]";
    }
    console.log( ktty.box_style( prompt ) );

}

ktty.on('enter', run_test);

// run the first one                                                                                                   
run_test();