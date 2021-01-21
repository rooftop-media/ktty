/*  
      box display tests
                                */

/**  Import the KTTY library...  */
var KTTY = require ( __dirname + "/../ktty.js" );

/**  Set up a KTTY instance....  */
var ktty = new KTTY();

//
//   -  about display
//

function part_1() {
    var about = "\n\n  --==  ";
    about    += ktty.get_ansi("font-weight", "bold");
    about    += "Testing multiple-element displays... ";
    about    += ktty.get_ansi("font-weight", "normal") + "  ==--";
    about    += ktty.get_ansi("brightness", "dim");
    about    += "\n\n";

    about    += "  Multiple text boxes & inline boxes can be displayed together. ";

    about    += "\n\n";

    about    += "  Tests in this section include:\n";
    about    += "   1. Doc flow box & inline elements.\n";
    about    += "   2. Resolving %s. \n";
    about    += "   3. Flex box positioning.\n";
    about    += "   4. Scroll.\n";
    about    += "   5. Absolute positioning.\n";
    about    += "\n\n";

    about    += ktty.get_ansi("brightness", "normal");

    console.log( about );
}


//  Test 1:  doc flow with boxes + inline elements!
function part_2() {
    var text1  = "  ==  test 1:  ";
    text1     += ktty.get_ansi("font-weight", "bold");
    text1     += "Displaying Inline Elements\n";
    text1     += ktty.get_ansi("font-weight", "normal");
    text1     += ktty.get_ansi("brightness", "dim");
    text1     += "  First, let's draw a box of 40sp, and add a few inline elements.";
    text1     += ktty.get_ansi("brightness", "normal");

    console.log( text1 );

    var parent_config = {
	display: "block",
	elements: [],
	width: "40sp"
    }
    
    var inline_1 = {
	position: "inline",
	text: "I wanna know where she goes in the night.",
	color: "red"
    }
    parent_config.elements.push( inline_1 );
    
    var inline_2 = {
	position: "inline",
	text: "I wanna know if the body takes flight.",
	color: "white",
	background: "red",
    }
    parent_config.elements.push( inline_2 );

    var inline_3 = {
	position: "inline",
	text: "I wanna know if she'll read my lies.",
	color: "black",
	background: "white",
    }
    parent_config.elements.push( inline_3 );

    var box_config = ktty.display_to_box( parent_config );
    console.log( ktty.box_style( box_config ) );

}

function part_3() {

}




//  Set up the test runner...                                                                                          
var tests = [ part_1, part_2, part_3 ];

function run_test() {
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
    console.log( ktty.box_style( prompt_text ) );
}

ktty.on('enter', run_test);

// run the first one                                                                                                   
run_test();