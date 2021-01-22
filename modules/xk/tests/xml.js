//  xk/tests/xml.js


//  Set up  xKitchen

/**  Import xkitchen...      */
var XK       = require( __dirname + "/../xkitchen.js" );

/**  Make a new xk...        */
var xk       = new XK();



//  Get KTTY, for events & styling.

/**  Import KTTY...          */
var KTTY     = require( __dirname + "/../../ktty/ktty.js" );

/**  Make a new ktty...      */
var ktty     = new KTTY();


//  Get nodejs stuff

/**  process                 */
var process  = require("process");

/**  File system tools...    */
var fs       = require("fs");


//  Get sample xml

/**  Get sample xml...       */
var test_xml = fs.readFileSync( __dirname + "/../samples/xml/sample.xml", {encoding: "utf8"} );

/**  Printing XML...         */
function part_1() {	
    console.clear();
    console.log( "\n\n  Testing XK's xml tools with this sample data: \n");
    console.log( test_xml );    
}


//  Print w/ syntax highlight

/**  Printing XML with syntax highlights: */
xk.load_xml( test_xml );

function part_2() {
    console.log( "  Here's the xml with syntax highlighting: \n" );
    console.log( xk.getXML() );
}


//  Tokens:
function part_3() {
    console.log( "Ok let's test tokens n whatever, here. XML Tokens:");	
    console.log( xk.xml_to_tokens() );
}

//  Nodes:
function part_4() {   
    console.log( "\n ...  and here's XML nodes: " );
    console.log( xk.xml_to_nodes() );
}

//  Set up the test runner...
var tests = [ part_1, part_2, part_3, part_4 ];

function run_test() {

    if (tests.length > 0 ) {
	var test = tests.shift();
	test();
    } else {
	process.exit();
    }

    var prompt = { 
	text:       "[ Press enter to run the next test... ]",
	brightness: "dim",
	padding: "1sp 1sp 1sp 1sp"
    }

    if (tests.length == 0 ) {
	prompt.text = "[ Tests complete!  Press enter to quit this program. ]";
    }

    console.log( ktty.box_style( prompt ) );
}

ktty.on('enter', run_test);

// run the first one
run_test();