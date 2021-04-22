#!/usr/bin/env node
;

/*  kTTY  -      

  //      _                ___       _.--.
  //      \`.|\..----...-'`   `-._.-' .-'`               Run this file to open kTTY!
  //      /  ' `         ,       __.--'	                 (Takes a filepath as an argument.)
  //      )/' _/     \   `-_,   /
  //      `-'" `"\_  ,_.-;_.-\_ ',                       Art pasted from ascii-art.de/ascii/c/cat.txt 
  //          _.-'_./   {_.'   ; /   fsc/as
  //        {_.-``-'         {_/

*/



//  Importing NodeJS libraries.
var process  = require("process");
var fs       = require("fs");
var path     = require("path");


//  Setting up app memory.
var _buffer   = "";
var _filename = "";
var _filetype = "";


//  The boot sequence.
function main() {

    //  Getting the file contents.
    _filename = process.argv[2];
    
    if ( _filename == undefined ) {
	_buffer = "No file name found";
    } else {
	_buffer = fs.readFileSync( _filename, {encoding: 'utf8'} );
    }
    console.clear();
    console.log(_buffer);


    //  Getting the file's settings. 
    _filetype   = path.extname( _filename );
    console.log(_filetype);

    
    //  Map keyboard input.
    var stdin = process.stdin;
    stdin.setRawMode( true );
    stdin.resume();
    stdin.setEncoding( 'utf8' );
    stdin.on( 'data', function( key ){

	    //  For ctrl-c, end program.
	    if ( key === '\u0003' ) {
		process.exit();
	    }
	    //  For other text:
	    process.stdout.write( key );
	});

}
main();





/*

    )   _. mmeeoowwrr!
   (___)''
   / ,_,/
  /'"\ )\

itz                       */