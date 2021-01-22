//  ktty/Ribbon/test.js

/**  1.  Import Ribbon.                        */ 
var Ribbon    = require("./ribbon.js");

/**  2.  Make a Ribbon instance.               */
var my_ribbon    = new Ribbon();

/**  3.  Add text.                             */
my_ribbon.text          = "hello world!";

my_ribbon.style.color       = "magenta";
my_ribbon.style.width       = "100vw";
my_ribbon.style.text_align  = "center";

/**  4.  Render the string.                    */
console.log( my_ribbon.display() );