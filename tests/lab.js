/*  
      element builder
                                */



/**  Import the KTTY library...  */
var KTTY = require ( __dirname + "/../ktty.js" );

/**  Set up a KTTY instance....  */
var ktty = new KTTY();





//  Describe this test.
function start() {
    console.clear();
    console.log( "\n  =  Element Display Builder  =  \n" );
    console.log( "Press ENTER to start the display builder.");
    console.log( "Once it's open, use the ARROW KEYS to navigate" );
    console.log( "the menu options, to build elements. ");
}




//  Draft box config

/**  The current box config settings.  */
var box_config = {
    text: "hello world :)",
}

//  Menu UI variables:

/**  The selection tracker...    */
var selection = 0;

/**  Menu choices.               */
var choices = [
	       "text",
	       "===  Inline styling  ===",
	       "color",
	       "background",
	       "brightness",
	       "font_weight",
	       "text_decoration",
	       "reverse_video",
	       "===  Box Styling  ===",
	       "height",
	       "width",
	       "border_box",
	       "word_wrap",
	       "justify_text",
	       "text_align",
	       "padding",
	       "border",
	       "margin",
	       "> Enter to add element!"
	       ];

/** Call this to clear the screen and draw. */
function draw() {
    
    console.clear();

    //  Draw menu options. 

    /**  Loop thru and display choices.   */
    for (var i = 0; i < choices.length; i++) {

	var choice = choices[i];
	
	/**  If it's selected, display the choice cyan / bold. */
	if (selection == i ) {
	    process.stdout.write( ktty.get_ansi("color", "cyan") );
	    process.stdout.write( ktty.get_ansi("font-weight", "bold") );

	    /**  Choice NAME and the choice VALUE.     */
	    process.stdout.write( choice );
	    process.stdout.write( ktty.get_ansi("reset") );
	}

	/**  If it's not selected, display choice white.          */
	else {
	    process.stdout.write( choice );
	    process.stdout.write( ktty.get_ansi("brightness", "dim") );
	}

	process.stdout.write("\u001b[20G"); // move cursor

	/**  Logging choice value, unless it's a === thing:       */
	if      ( choice[0] == "=" ) {
	    process.stdout.write( "\n" );
	}
	else if ( box_config[ choice ] != undefined ) {
	    process.stdout.write( box_config[ choice ] + "\n" );
	}
	else {
	    process.stdout.write( "[undefined]\n" );
	}


	process.stdout.write( ktty.get_ansi("reset") );

    }

    // draw the draft
    console.log (ktty.box_style(box_config));

}

//  call this on enter
function add_element() {
    
}

//  call this on text
function edit_text( key ) {
    var _field = choices[ selection ];
    if ( typeof box_config[_field] != "string" ) {
	box_config[_field] = "";
    }
    //    box_config[ _field ] += key;
    draw();
}

//  call this on backspace
function backspace_text() {
    var _field = choices[ selection ];
    if ( !box_config[_field] ) {
	return;
    }
    box_config[ _field ] = box_config[ _field ].slice(0, -1);
    draw();
}

//  Call this w the arrow listeners
function move_selection( amt ) {
    selection += amt;
    if ( selection < 0 ) {
	selection = choices.length - 1;
    }
    else if ( selection >= choices.length ) {
	selection = 0;
    }

    if ( choices[ selection ][0] == "=" ) {
	selection += amt;
    } 


}

//  Set up the listeners

ktty.on('enter', draw);
ktty.on('up', function() {
	move_selection(-1);
	draw();
    });

ktty.on('down', function() {
	move_selection(1);
	draw();
    });
ktty.on('text', function(key) {
	edit_text(key);
    });
ktty.on('backspace', backspace_text );

// run the first one                                                                                                   
start()