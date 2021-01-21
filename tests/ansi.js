/*  
          Inline Tests
                                */

//  Set up ktty

/**  Import KTTY                  */
var KTTY = require ( __dirname + "/../ktty.js" );

/**  make a new ktty.             */
var ktty = new KTTY();

/**  Track test section.          */
var current_section = 0;



//
//   -  about ANSI
//

function part_1() {

    /**  "  --==  Styling text with ANSI  ==--  "  */

    var about  = "\n\n  --==  ";
    about     += ktty.ansi({
        text: "Styling text with ANSI",
	font_weight: "bold"
    });
    about     += "  ==--\n\n";



    /**  "  This section of tests will apply * inline styling * to the
	    text, using the method *ktty.inline( config )*;              **/

    about     += "  This section of tests will apply";
    about     += ktty.ansi({
	text:        " ANSI codes",
	color:       "magenta",
	font_weight: "bold"
    });
    about     += " to the \ntext, using the method ";
    about     += ktty.ansi({
	text:        " ktty.inline_style( config )",
	color:       "cyan",
	font_weight: "bold"
    });
    about     += ";\n\n";



    /**  List ANSI tests...    */
    
    about     += "  ANSI style options include:\n\n"
    about     += " 1. text:    <string>\n";
    about     += " 2. color:           `<color-name>` | \"rgb(`<0-255>`,`<0-255>`, `<0-255>`)\"\n";
    about     += " 3. background:      `<color-name>` | \"rgb(`<0-255>`,`<0-255>`, `<0-255>`)\"\n";
    about     += " 4. brightness:      \"normal\" | \"dim\"\n";
    about     += " 5. font-weight:     \"normal\" | \"bold\"\n";
    about     += " 6. text-decoration: \"normal\" | \"underlined\"\n";
    about     += " 7. reverse-video:   \"yes-please\" | \"no-thanks\"\n\n";
    
    about     += ktty.ansi("brightness", "normal");

    console.log( about );

}





//  Testing ktty.ANSI( "colors", <color> );
var basic_colors = [ "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white" ];

function part_2() {
    console.log("  ==  Testing 1. Text colors, and 2. Background colors...\n");

    //  Reset code
    var reset_code     = ktty.get_ansi( "reset" );    

    /**  Log bg / fg colors.    */
    for ( var i = 0; i < basic_colors.length; i++ ) {
	var color_name = basic_colors[i];
	var fg_code    = ktty.get_ansi( "color", color_name );
	var bg_code    = ktty.get_ansi( "background", color_name );
	process.stdout.write( color_name + " - " + fg_code + " color " );
	process.stdout.write( reset_code + " vs " + bg_code + " background" );
	process.stdout.write( reset_code + ".\n" );
    }
}    

function part_3() {
    //  Testing text styles.
    console.log("\n\n  ==  Test 2: Text styles... \n");
    
    /**  Bold...         */
    process.stdout.write( "Here's what " );
    process.stdout.write( ktty.get_ansi( "font-weight", "bold" ) );
    process.stdout.write( "bold text" );
    process.stdout.write( ktty.get_ansi( "font-weight", "normal" ) );
    process.stdout.write( " looks like! \n\n");

    /**  Dim...          */
    process.stdout.write( "Here's what " );
    process.stdout.write( ktty.get_ansi( "brightness", "dim" ) );
    process.stdout.write( "dim text" );
    process.stdout.write( ktty.get_ansi( "brightness", "normal" ) );
    process.stdout.write( " looks like! \n\n");

    /**  Underline...    */
    process.stdout.write( "Here's what " );
    process.stdout.write( ktty.get_ansi( "decoration", "underline" ) );
    process.stdout.write( "underlined text" );
    process.stdout.write( ktty.get_ansi( "decoration", "normal" ) );
    process.stdout.write( " looks like! \n\n");

    /**  Reverse video... */
    process.stdout.write( "Here's what " );
    process.stdout.write( ktty.get_ansi( "reverse-video", "yes-please" ) );
    process.stdout.write( "reverse-video text" );
    process.stdout.write( ktty.get_ansi( "reverse-video", "no-thanks" ) );
    process.stdout.write( " looks like! \n\n");
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
    if (tests.length == 0)
	prompt_text.text = "[ Press enter to exit this test file! ]"
    console.log( ktty.box_style( prompt_text ) );
}

ktty.on('enter', run_test);

// run the first one                                                                                                   
run_test();