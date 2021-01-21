/*   read_file  -  Get text from a file.      */




/**  Importing fs, the filesystem interface...   */
var fs       = require("fs");

/**  Importing path, tools to edit filepaths...  */

module.exports = function read_file( file_path ) {
    
    /**  If a file path starts with "@"...     */
    if ( file_path[0] == "@" ) {

	/**  Getting rid of the @.   */
	file_path        = file_path.slice(1);

	/**  Get the root folder, /kw/  (Todo: make more elegant)   */
	var root_folder  = "/Users/benholland/github.com/rooftop-media/kw";

	/**  Look for the file path in the root folder.             */
	file_path        = root_folder + file_path;
    }
    return fs.readFileSync( file_path, { encoding: 'utf8' } );


}