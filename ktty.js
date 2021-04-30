#!/usr/bin/env node
;

/*  kTTY  -      

  //      _                ___       _.--.
  //      \`.|\..----...-'`   `-._.-' .-'`             > Run this file with a filepath as an argument
  //      /  ' `         ,       __.--'	                 to open this file in ktty's editor!
  //      )/' _/     \   `-_,   /
  //      `-'" `"\_  ,_.-;_.-\_ ',                     > Art pasted from ascii-art.de/ascii/c/cat.txt 
  //          _.-'_./   {_.'   ; /   fsc/as
  //        {_.-``-'         {_/

*/


////  SECTION 1:  Imports & global variables.

//  Importing NodeJS libraries.
var process      = require("process");
var fs           = require("fs");
var path         = require("path");


//  Setting up app memory.
var _buffer      = "";     //  The text being edited.
var _filename    = "";     //  Filename - including extension.
var _modified    = false;  //  Has the buffer been modified?

var _window_h    = 0;      //  Window height in text chars.
var _window_w    = 0;      //  Window width in text chars.

var _cursor_line = 1;      //  # of spaces from the top of the doc.
var _cursor_char = 1;      //  # of spaces from the left of this line.

var _events      = {
    "UP":     function() {
	if ( _cursor_line > 1 ) { _cursor_line--; }
    },
    "DOWN":   function() {
	_cursor_line++;
    },
    "LEFT":   function() {
	if ( _cursor_char > 1 ) { _cursor_char--; }
    },
    "RIGHT":  function() {
	_cursor_char++;
    },
    "TEXT":   function(key) {},
}



////  SECTION 2:  Boot stuff.

//  The boot sequence.
function boot() {

    /**  Making the buffer.       **/
    load_file_to_buffer();

    /**  Making the status bar.   **/
    get_window_size();
    
    /**  Map the input listeners. **/
    map_input();

    /**  Update the screen.       **/
    draw();

}
boot();  //  Boot it!!

//  Getting the file's contents, put it in the "buffer".
function load_file_to_buffer() {
    _filename = process.argv[2];             /**  process.argv[2]  is argument given after the ktty command.   **/
    if ( _filename == undefined ) {
	_buffer = "";
    } else {
	try {
	    _buffer = fs.readFileSync( _filename, {encoding: 'utf8'} );
	} catch (err) {
	    _buffer = "Unable to find a file at '" + _filepath + "'";
	}
    }
}

//  Get the window size.
function get_window_size() {
    _window_h = process.stdout.rows;
    _window_w = process.stdout.columns;
}

//  Map keyboard input.
function map_input() {
    var stdin = process.stdin;
    stdin.setRawMode( true );
    stdin.resume();
    stdin.setEncoding( 'utf8' );
    stdin.on( 'data', function( key ){    

	if ( key === '\u0003' ) {	     //  For ctrl-c, end program.
	    process.exit();
	}

	else if ( key === '\u001b[A' ) {     //  up
	    _events["UP"]();
	}
	else if ( key === '\u001b[B' ) {     //  down
	    _events["DOWN"]();
	}
	else if ( key === '\u001b[C' ) {     //  right
	    _events["RIGHT"]();
	}
	else if ( key === '\u001b[D' ) {     //  left
	    _events["LEFT"]();
	}
	else {
	    _events["TEXT"](key);
	}
	draw();

	//  For other keys,  output.
	// process.stdout.write( key );
    });
}


////  SECTION 3:  Draw functions.

//  The draw function -- called after any data change.
function draw() {
    draw_buffer();
    draw_status_bar();
    position_cursor();
}


//  Drawing the buffer.
function draw_buffer() {
    console.clear();
    console.log(_buffer);
}


//  Drawing the file's status bar -- filename, modified status, and cursor position. 
function draw_status_bar() {
    process.stdout.write("\x1b[" + (_window_h - 2) + ";0H");   /**  Moving to the 2nd to bottom row.  **/
    process.stdout.write("\x1b[7m");                         /**  Reverse video.                    **/
    var status_bar_text = "  " + _filename;
    if (_modified) {
	status_bar_text += "     [modified]";
    } else {
	status_bar_text += "               ";
    }
    status_bar_text += "  cursor on line " + _cursor_line + ", row " + _cursor_char;
    while (status_bar_text.length < _window_w) {    /**  Padding it with whitespace.       **/
	status_bar_text += " ";
    }
    process.stdout.write(status_bar_text);
    process.stdout.write("\x1b[0m");                         /**  No more reverse video.            **/
}

//  Move the cursor to its position in the buffer.
function position_cursor() {
    process.stdout.write("\x1b[" + _cursor_line + ";" + _cursor_char + "f");  
}

    






/*

    )   _. mmeeoowwrr!
   (___)''
   / ,_,/
  /'"\ )\

itz                       */