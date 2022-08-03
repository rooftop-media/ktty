////  SECTION 1:  Imports.

#include <iostream>   //  For output to terminal
#include <cstring>    //  For using the "string" datatype
#include <fstream>    //  For reading from files
#include <ncurses.h>  //  For detecting keypress
using namespace std;



////  SECTION 2:  App memory & function declarations

//  Setting up app memory.
string _buffer            = "";      //  The text being edited. 
string _filename          = "";      //  Filename - including extension. 

//  Declaring functions. 
int map_events();
void draw();
void draw_buffer();
void a_load_file_to_buffer(string);



////  SECTION 3:  Boot stuff.

int main(int argc, char *argv[]) {
  
  /**  Load a file to the buffer.       **/
  a_load_file_to_buffer(argv[1]);

  /**  Load window height & width.      **/
  // c_get_window_size();

  /**  Update the screen.               **/
  draw();
    
  /**  Map the event listeners.         **/
  map_events();

  return 0;
} 


////  SECTION 4:  Events.

//  Map keyboard input.
int map_events() {

    //  Set up ncurses
    initscr();
    cbreak();

	//  Map keyboard input 
    char key_press;
    int ascii_value;
    while (1) {
        key_press = getch();
        ascii_value = key_press;
        if (ascii_value == 27) // For ESC
            break;
    }

    endwin();
    return 0;
	// stdin.on("data", function(key) {
	// 	//  Exit on ctrl-c
	// 	if (key === "\u0003") {
	// 		b_quit();
	// 	}
	// 	process.stdout.write(key);
	// });

}



////  SECTION 5:  Draw functions.

//  The draw function -- called after any data change.
void draw() {
    draw_buffer();
    // draw_status_bar();
    // draw_feedback_bar();
    // position_cursor();
}

//  Drawing the buffer.
void draw_buffer() {
    cout << "\x1B[2J\x1B[H";  //  Clear the screen
    cout << _buffer;
}



////  SECTION 6:  Algorithms.

//  Getting the file's contents, put it in the "buffer".
void a_load_file_to_buffer(string filename_to_load) {
    _filename = filename_to_load; 
    if ( _filename == "" ) {
        _buffer = "";
    } else {
        ifstream fileToRead;
        fileToRead.open (_filename);
        if (fileToRead.is_open()) {
            string line;
            while ( getline (fileToRead, line) ) {
                _buffer += line;
                _buffer += "\n";
            }
            fileToRead.close();
        } else {
            _buffer = "Unable to open a file at '" + _filename;
        }
    }
}

// function b_quit() {                      /**  Quit out of kTTY.   **/
//     console.clear();
//     process.exit();
// }