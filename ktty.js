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



////  SECTION 1:  Imports.

//  Importing NodeJS libraries.
var process      = require("process");
var fs           = require("fs");
var path         = require("path");



////  SECTION 2:  APP MEMORY

//  Setting up app memory.
var _buffer      = "";        //  The text being edited.
var _filename    = "";        //  Filename - including extension.
var _modified    = false;     //  Has the buffer been modified?

var _cursor_buffer_pos  = 0;  //  The cursor's position in the buffer text.
var _cursor_distance    = 0;  //  The cursor's distance from the left of the window. 

var _window_h    = 0;         //  Window height (in text char's).
var _window_w    = 0;         //  Window width (in text char's).

var _edit_history = [];       //  A list of edit notation marks.
var _scroll      = 0;         //  Scroll distance.



////  SECTION 3:  EVENTS

//  These functions fire in response to "events" like keyboard input.
var _events      = {

    "LEFT":   function() {
   	b_move_cursor_left();
    },
    "RIGHT":  function() {
	c_move_cursor_right();
    },

    "UP":     function() {
	d_move_cursor_up();
    },
    "DOWN":   function() {
	e_move_cursor_down();
    },
    
    "TEXT":   function(key) {
	f_add_to_buffer(key);
    },
    "ENTER":  function() {
	f_add_to_buffer("\n");
    },
    "BACKSPACE": function() {
	g_delete_from_buffer();
    },

    
}



////  SECTION 4:  Boot stuff.

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
	else if ( key === '\u000D' ) {     //  enter
	    _events["ENTER"]();
	}
	else if ( key === '\u0008' || key === "\u007f" ) {     //  delete
	    _events["BACKSPACE"]();
	}

	else {
	    _events["TEXT"](key);
	}
	draw();

	//  For other keys,  output.
	// process.stdout.write( key );
    });
}


////  SECTION 5:  DRAW FUNCTIONS

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
    
    process.stdout.write("\x1b[7m");                           /**  Reverse video.                    **/
    
    var status_bar_text = "  " + _filename;                    /**  Add the filename                  **/
    if (_modified) {                                           /**  Add the [modified] indicator.     **/
	status_bar_text += "     [modified]";
    } else {
	status_bar_text += "               ";
    }
    
    var cursor_position = a_get_cursor_pos();                  /**  Use algorithm a_get_cursor_pos!   **/
    status_bar_text += "  cursor on line " + cursor_position[0];
    status_bar_text += ", row " + cursor_position[1];
    
    while (status_bar_text.length < _window_w) {               /**  Padding it with whitespace.       **/
	status_bar_text += " ";
    }

    process.stdout.write(status_bar_text);                     /**  Output the status bar string.     **/
    process.stdout.write("\x1b[0m");                           /**  No more reverse video.            **/
}

//  Move the cursor to its position in the buffer.
function position_cursor() {
    var cursor_position = a_get_cursor_pos(); //  a_get_cursor_pos is an algorithm, defined below
    process.stdout.write("\x1b[" + cursor_position[0] + ";" + cursor_position[1] + "f");  
}

    


////  SECTION 6:  ALGORITHMS

function a_get_cursor_pos() {            //  Returns a 2 index array, [int line, int char]
    var cursor_position = [1,1];
    for (var i = 0; i < _cursor_buffer_pos; i++) {  //  Loop through the buffer to count the \n's! :)
	var current = _buffer[i];
	if (current == "\n") {
	    cursor_position[0]++;        /**  Advance a line.        **/
	    cursor_position[1] = 1;      /**  Reset character pos.   **/
	} else {
	    cursor_position[1]++;        /**  Advance a character.   **/
	}
    }
    return cursor_position;
}

function b_move_cursor_left() {

    _cursor_buffer_pos -= 1;
    if ( _cursor_buffer_pos < 0 ) {      /**   Don't let the cursor position be negative.         **/
	_cursor_buffer_pos++;
    }

}

function c_move_cursor_right() {

    _cursor_buffer_pos += 1;

    var buff_limit = _buffer.length;     /**   Don't let the cursor position exceed the buffer.   **/
    if ( _cursor_buffer_pos > buff_limit ) {
	_cursor_buffer_pos--;
    }

}

function d_move_cursor_up() {
    
    var current_x_pos = 1;               /**   To find the xpos of the cursor on the current line.   **/
    var prev_line_length = 0;            /**   To find the length of the *prev* line, to jump back.  **/
    for (var i = 0; i < _cursor_buffer_pos; i++ ) {
	if (_buffer[i] == "\n") {
	    prev_line_length = current_x_pos;
	    current_x_pos = 1;
	} else {
	    current_x_pos++;
	}
    }

    if (prev_line_length > current_x_pos) {        /**   If we're going up **into** a line...        **/
	_cursor_buffer_pos -= prev_line_length;
    }
    else if (prev_line_length <= current_x_pos) {  /**   If we're going up **above** a line...       **/
	_cursor_buffer_pos -= current_x_pos;
    }
    
}

function e_move_cursor_down() {

    var current_x_pos = 1;               /**   To find the xpos of the cursor on the current line.     **/
    var current_line_length = 0;         /**   To find the length of *this* line.                      **/
    var next_line_length = 0;            /**   To find the length of the *next* line, to jump forward. **/
    for (var i = 0; i < _cursor_buffer_pos; i++ ) {
	if (_buffer[i] == "\n") {
	    current_x_pos = 1;
	} else {
	    current_x_pos++;
	}
    }

    var j = _cursor_buffer_pos;          /**  Using a while loop to iterate further, to find the *next* line length.  **/
    var found_line_start = false;
    current_line_length = current_x_pos;
    while (j < _buffer.length) {
	if (!found_line_start && _buffer[j] == "\n") {
	    found_line_start = true;
	}
	else if (!found_line_start && _buffer[j] != "\n") {
	    current_line_length++;
	}
	else if (found_line_start && _buffer[j] != "\n") {
	    next_line_length++;
	}
	else if (found_line_start && _buffer[j] == "\n") {
	    break;
	}
	j++;
    }

    if (next_line_length > current_x_pos) {          /**   If we're going down **into** a line...        **/
	_cursor_buffer_pos += current_line_length;
    }
    else if (next_line_length <= current_x_pos) {    /**   If we're going down **above** a line...       **/
	_cursor_buffer_pos += current_line_length; 
	_cursor_buffer_pos -= current_x_pos;         /**     This should get us to the start of the next line...  **/
	_cursor_buffer_pos += next_line_length + 1;  /**     ...and then we jump to the end.    **/
    }

    var buff_limit = _buffer.length;     /**   Don't let the cursor position exceed the buffer.   **/
    if ( _cursor_buffer_pos > buff_limit ) {
	_cursor_buffer_pos--;
    }

}

function f_add_to_buffer(new_text) {
    var new_buffer = _buffer.slice(0, _cursor_buffer_pos);
    new_buffer    += new_text;
    new_buffer    += _buffer.slice(_cursor_buffer_pos, _buffer.length);
    _buffer = new_buffer;
    _cursor_buffer_pos++;
}

function g_delete_from_buffer() {
    var new_buffer = _buffer.slice(0, _cursor_buffer_pos - 1);
    new_buffer    += _buffer.slice(_cursor_buffer_pos, _buffer.length);
    _buffer = new_buffer;
    _cursor_buffer_pos--;
}





/*

    )   _. mmeeoowwrr!
   (___)''
   / ,_,/
  /'"\ )\

itz                       */