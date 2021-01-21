/*  
         text box tests
                                */


/**  Also calling it, so you can just run this file:    */
var KTTY = require ( __dirname + "/../../ktty.js" );
var ktty = new KTTY();


/**  used in the run_tests() func way below */
var current_section = 0;

//   0. About text box.

function intro() {
    var about = "\n\n  --==  ";
    about    += ktty.get_ansi("font-weight", "bold");
    about    += "kTTY Text Box Formatting Tests ";
    about    += ktty.get_ansi("font-weight", "normal") + "  ==--";
    about    += "\n";

    about    += ktty.get_ansi("brightness", "dim");
    about    += "  This is part 1 of 2 test files for box styling.\n";
    about    += "  Part 2 is ktty/tests/box/frame.js"
    about    += ktty.get_ansi("brightness", "normal");
    about    += "\n\n";

    about    += "  The text box formatting section applies ";
    about    += ktty.get_ansi("color", "magenta");
    about    += " box styling \n";
    about    += ktty.get_ansi("reset");
    about    += "  to a string of text, using ";
    about    += ktty.get_ansi("color", "cyan");
    about    += "ktty.box_style( config )";
    about    += ktty.get_ansi("reset");
    about    += ";\n\n";


    about    += ktty.get_ansi("brightness", "normal");

    console.log( about );

    current_section++;
}



//  Test 1:  let's box it up (word wrap)

var sample = "I'll follow you, and make a heaven of hell,\nTo die by the hand that I love so well.";

function wrap_1() {
    var text1  = "  ==  test 1:  ";
    text1     += ktty.get_ansi("font-weight", "bold");
    text1     += ktty.get_ansi("color", "magenta");
    text1     += "Word wrap";
    text1     += ktty.get_ansi("reset");
    text1     += ktty.get_ansi("font-weight", "normal");
    text1     += "  -  using " + ktty.get_ansi("color", "cyan");
    text1     += "ktty.word_wrap( config )";
    text1     += ktty.get_ansi("reset");
    text1     += ";\n";
    
    text1     += ktty.get_ansi("brightness", "dim");
    text1     += "  Word wrap deals with text that overflows passed\n";
    text1     += "  a box's width & height.\n\n";
    text1     += ktty.get_ansi("brightness", "normal");

    console.log( text1 );

    console.log( "Sample 1 with width: 100\n" );
    console.log( ktty.word_wrap({ text: sample, width: 100 }) );
    console.log( "\n" );

}

function wrap_2() {
    console.log( "Sample 1 with width: 20\n" );
    console.log( ktty.word_wrap({ text: sample, width: 20 }) );
    console.log( "\n" );
}

function wrap_3() {
    console.log( "Sample 1 with width: 20 and break-word\n" );
    console.log( ktty.word_wrap({ text: sample, width: 20, word_wrap: "break-word" }) );
    console.log( "\n" );

}

function wrap_4() {

    console.log( "Sample 1 with width: 10\n" );
    console.log( ktty.word_wrap({ text: sample, width: 10 }) );
    console.log( "\n" );
}

function wrap_5() {
    console.log( "Sample 1 with width: 20 and break-word\n" );
    console.log( ktty.word_wrap({ text: sample, width: 10, word_wrap: "break-word" }) );
    current_section++;
}



//  Test 2:  Text Align

var sample2 = "I thought that I had wavy hair,\n";
sample2    += "Until I shaved. Instead,\n";
sample2    += "I find that I have *straight* hair,\n";
sample2    += "And a very wavy head.";

function align_1() {

    var test2  = "\n\n  ==  test 2:  ";
    test2     += ktty.get_ansi("font-weight", "bold");
    test2     += ktty.get_ansi("color", "magenta");
    test2     += "Text align";
    test2     += ktty.get_ansi("reset");
    test2     += ktty.get_ansi("font-weight", "normal");
    test2     += "  -  using " + ktty.get_ansi("color", "cyan");
    test2     += "ktty.text_align( config )";
    test2     += ktty.get_ansi("reset");
    test2     += ";\n";

    test2     += ktty.get_ansi("brightness", "dim");
    test2     += "  Text align formats lines that are less than\n";
    test2     += "  a box's width.\n\n";
    test2     += ktty.get_ansi("brightness", "normal");

    console.log( test2 );

    console.log( "Sample 2 with width: 100 and text-align: left\n" );
    console.log( ktty.text_align({ text: sample2, width: 100, align_type: "left" }) );
    console.log( "\n" );
}

function align_2() {
    console.log( "Sample 2 with width: 100 and text-align: center\n" );
    console.log( ktty.text_align({ text: sample2, width: 100, align_type: "center" }) );
    console.log( "\n" );
}

function align_3() {
    console.log( "Sample 2 with width: 100 and text-align: right\n" );
    console.log( ktty.text_align({ text: sample2, width: 100, align_type: "right" }) );
    console.log( "\n" );
    
    current_section++;
}



//  Test 3:  Box stylee

var sample3 = "When I was born, the word for what I was did not exist.";
sample3    += "\n\n";
sample3    += "- from Circe, by Madeline Miller.";

function style_1() {


    var test3  = "\n\n  ==  test 3:  ";
    test3     += ktty.get_ansi("font-weight", "bold");
    test3     += ktty.get_ansi("color", "magenta");
    test3     += "Word wrap";
    test3     += ktty.get_ansi("reset");
    test3     += ktty.get_ansi("font-weight", "normal");
    test3     += "  -  using " + ktty.get_ansi("color", "cyan");
    test3     += "ktty.word_wrap( config )";
    test3     += ktty.get_ansi("reset");
    test3     += ";\n";

    test3     += ktty.get_ansi("brightness", "dim");
    test3     += "  The box styling function styles blocks of text.\n\n";
    test3     += "  First, word wrap & text align are used to make a box of\n";
    test3     += "  text.  Then, apply ANSI codes to each line of text in \n";
    test3     += "  the box.\n\n";
    test3     += ktty.get_ansi("brightness", "normal");

    console.log( test3 );

    console.log( " ☟  Sample 3 with..." );
    console.log( "      width:          20sp;  " );
    console.log( "      height:         10sp; " );
    console.log( "      text-align:     10sp; " );
    console.log( "      reverse-video:  yes-please; \n" );

    var box1 = {
	text:          sample3,
	width:         "25sp",
	height:        "10sp",
	text_align:    "right",
	reverse_video: "yes-please"
    };
    console.log( ktty.box_style( box1 ) );
}    

function style_2() {

    console.log( " ☟  Sample 3 with..." );
    console.log( "      width:          100sp;   " );
    console.log( "      height:         6sp;     " );
    console.log( "      text-align:     center;  " );
    console.log( "      color:          magenta; \n" );

    var box2 = {
	text:          sample3,
	width:         "100sp",
	height:        "6sp",
	align_type:    "center",
	color:         "magenta"
    }
    console.log( ktty.box_style( box2 ) );
    console.log( "\n" );
    
    current_section++;
}


//  Test 4: pad tests

var sample4 = ":^)";

function pad_1() {

    var test4  = "\n\n  ==  test 4:  ";
    test4     += ktty.get_ansi("font-weight", "bold");
    test4     += ktty.get_ansi("color", "magenta");
    test4     += "Pad";
    test4     += ktty.get_ansi("reset");
    test4     += ktty.get_ansi("font-weight", "normal");
    test4     += "  -  using " + ktty.get_ansi("color", "cyan");
    test4     += "ktty.pad( config )";
    test4     += ktty.get_ansi("reset");
    test4     += ";";

    test4     += ktty.get_ansi("brightness", "dim");
    test4     += "  Pad that sucker!!\n\n";
    test4     += "  The padding is all whitespace, but ANSI codes\n";
    test4     += "  like \"background\" *do* affect the padding.\n\n";
    test4     += "  Padding relies on the frame function to work,\n";
    test4     += "  so the frame test is worth checking if there's\n";
    test4     += "  any padding issues.\n\n";
    test4     += ktty.get_ansi("brightness", "normal");

    console.log( test4 );

    
    console.log( " ☟  Sample 4 padded with \"3sp\" padding using pad function." );
    console.log( ktty.pad({ text: sample4, padding: "3sp" }) );

    console.log( " ☟  Sample 4 padded with \"1sp 1sp 1sp 1sp\" and background:cyan" );
    var pad_config1 = {
	text:          sample4,
	padding:       "1sp 1sp 1sp 1sp",
	background:    "cyan",
	height:        "auto",
	width:         "auto",

    }
    console.log( ktty.box_style( pad_config1 ) );
    console.log( "\n" );

}

function pad_2() {

    console.log( " ☟  Sample 4 padded with \"1sp 3sp\", color: cyan and background:red" );
    var pad_config2 = {
	text:          sample4,
	padding:       "1sp 3sp",
	background:    "red",
	color:         "cyan",
	height:        "auto",
	width:         "auto",

    }
    console.log( ktty.box_style( pad_config2 ) );
    console.log( "\n" );
    current_section++;
}



//  Set up the test runner...                                                                                          

/**  All test functions:  */
var tests = [ intro, 
	      wrap_1, wrap_2, wrap_3, wrap_4, wrap_5,
	      align_1, align_2, align_3,
	      style_1, style_2,
	      pad_1, pad_2
	      ];

//  This is mapped to "enter" -- runs a test. 
function run_test() {

    /**  End when there's no more tests.             */
    if (tests.length == 0 ) {
        process.exit();
    }

    /**  Make the menu...                            */
    var menu  = ktty.get_ansi("brightness", "dim");
    menu     += "  Tests sections:\n";

    var sections = [ "intro", "word_wrap", "text_align", "box_style", "pad" ];

    /**  Building menu, brighten current section.    */
    for ( var i = 0; i < sections.length; i++ ) {

	if ( i == current_section ) {
	    menu   += ktty.get_ansi("brightness", "normal");
	    menu   += i + ".  " + sections[i] + "\n";
	    menu   += ktty.get_ansi("brightness", "dim");
	}

	else {
	    menu    += i + ".  " + sections[i] + "\n";
	}

    }

    menu    += ktty.get_ansi("brightness", "normal");
    menu    += "\n\n";

    console.clear();
    console.log( menu );

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
console.clear();
run_test();