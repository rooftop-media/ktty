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

//  The function to start ktty!
function main() {

    //  Getting the file contents.
    var file_name = process.argv[2];
    var contents  = get_file(file_name);
    console.log("File: " + file_name);
    console.log("Contents:" + contents);

}

main();

//  Sub function, to get file contents.
function get_file( file_name ) {

    if ( file_name == undefined) {
	return "No file name found";
    } else {
	return fs.readFileSync( file_name );
    }

}






/*

    )   _. mmeeoowwrr!
   (___)''
   / ,_,/
  /'"\ )\

itz                       */