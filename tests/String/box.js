/*  
         text box tests
                                */


/**  Also calling it, so you can just run this file:    */
var KTTY = require ( __dirname + "/../ktty.js" );
var ktty = new KTTY();

/**  used in the run_tests() func way below */
var current_section = 0;

//
//   -  about text box
//

function part_1() {
    var about = "\n\n  --==  ";
    about    += ktty.get_ansi("font-weight", "bold");
    about    += "Testing text box formatting... ";
    about    += ktty.get_ansi("font-weight", "normal") + "  ==--";
    about    += "\n\n";

    about    += "  The text box formatting section applies ";
    about    += ktty.get_ansi("color", "magenta");
    about    += " box styling ";
    about    += ktty.get_ansi("reset");
    about    += "to a string of text, using ";
    about    += ktty.get_ansi("color", "cyan");
    about    += "ktty.box_style( config )";
    about    += ktty.get_ansi("reset");
    about    += ";\n\n";

    about    += "  Tests will be:\n";
    about    += "   4. frame\n";
    about    += "   5. pad\n";
    about    += "   6. border\n";
    about    += "   7. margin\n";
    about    += "\n\n";

    about    += ktty.get_ansi("brightness", "normal");

    console.log( about );
}



function part_5() {
    //  Test 4:  Box frame!

    var test4  = "\n\n  ==  test 4:  ";
    test4     += ktty.get_ansi("font-weight", "bold");
    test4     += "Box Frame";
    test4     += ktty.get_ansi("font-weight", "normal");
    test4     += ktty.get_ansi("brightness", "dim");
    test4     += "  The Frame function adds text around all sides of the \n";
    test4     += "  text.  It can be used to add whitespace or characters. \n";  
    test4     += "  Pad, border, & margin all are done with the frame func. \n";
    test4     += ktty.get_ansi("brightness", "normal");

    console.log( test4 );

    var sample4 = "Bad poetry??\nOh noetry!";

    console.log( " ☟  Sample 4 framed with..." );
    console.log( "      material: ['1','2','3','4','5','6','7','8'];");
    console.log( "      padding:  [1,1,1,1];\n");

    var num_material = ['1','2','3','4','5','6','7','8'];
    console.log( ktty.frame({ text: sample4, material: num_material, padding: [1,1,1,1] }) + "\n" );

    console.log( " ☟  Sample 4 framed with..." );
    console.log( "      material: ['1','2','3','4','5','6','7','8'];");
    console.log( "      padding:  [1,2,3,4];\n");

    console.log( ktty.frame({ text: sample4, material: num_material, padding: [1,2,3,4] }) );

    console.log( " ☟  Sample 4 framed with..." );
    console.log( "      material: [' ','*',' ',' ',' ','*',' ',' '];");
    console.log( "      padding:  [1,0,1,0];\n");

    var star_material = ['x','*','x','x','x','*','x','x'];
    console.log( ktty.frame({ text: sample4, material: star_material, padding: [1,0,1,0] }) );
    
}

function part_6() {
    //  Test 5: 

    var test5  = "\n\n  ==  test 5:  ";
    test5     += ktty.get_ansi("font-weight", "bold");
    test5     += "Pad";
    test5     += ktty.get_ansi("font-weight", "normal");
    test5     += ktty.get_ansi("brightness", "dim");
    test5     += "  Pad that sucker!!\n\n";
    test5     += "  The padding is all whitespace, but ANSI codes\n";
    test5     += "  like \"background\" *do* affect the padding.\n\n";
    test5     += ktty.get_ansi("brightness", "normal");

    console.log( test5 );

    var sample5 = ":^)";
    
    console.log( " ☟  Sample 5 padded with \"3sp\" padding using pad function." );
    console.log( ktty.pad({ text: sample5, padding: "3sp" }) );

    console.log( " ☟  Sample 5 padded with \"1sp 1sp 1sp 1sp\" and background:cyan" );
    var pad_config1 = {
	text:          sample5,
	padding:       "1sp 1sp 1sp 1sp",
	background:    "cyan",
	height:        "auto",
	width:         "auto",

    }
    console.log( ktty.box_style( pad_config1 ) );
    console.log( "\n" );

    console.log( " ☟  Sample 5 padded with \"1sp 3sp\", color: cyan and background:red" );
    var pad_config2 = {
	text:          sample5,
	padding:       "1sp 3sp",
	background:    "red",
	color:         "cyan",
	height:        "auto",
	width:         "auto",

    }
    console.log( ktty.box_style( pad_config2 ) );
    console.log( "\n" );

}

function part_7() {
    //  Test 6: 

    var test6  = "\n\n  ==  test 6:  ";
    test6     += ktty.get_ansi("font-weight", "bold");
    test6     += "border!";
    test6     += ktty.get_ansi("font-weight", "normal");
    test6     += ktty.get_ansi("brightness", "dim");

    test6     += "  Add a border to the text box. ";
    test6     += "  Borders can be of style... ";
    test6     += ktty.get_ansi("brightness", "normal");

    var box6       = {
	text: "This is bordered!",
	border:  "solid 1sp cyan",
	width: "auto",
	background: "blue"
    }

    console.log( ktty.box_style(box6) );

    var box7       = {
	text: "This is bordered with padding!",
	padding: "2sp 2sp 2sp 2sp",
	border:  "solid 1sp yellow",
	border_weight: "light",
	width: "auto",
	color:      "black",
	background: "white"
    }
    console.log("\n")
    console.log( ktty.box_style(box7) );
}


//  Set up the test runner...                                                                                          
var tests = [ part_1, part_2, part_3, part_4, part_5, part_6, part_7 ];

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