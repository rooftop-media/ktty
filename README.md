<!-- Title -->
<h1 align="center">
  🖨 🐯  ⇢ kTTY ⇠  🐯 🖨
</h1>

<!--  Subtitle -->
<h3 align="center">
  <i>JS tools to make displays in text terminal consoles.</i>
</h3>

---

<br /><br /><br /><br /><br />





<h2 align="center"> 🐯  - About kTTY... - 🐯</h2>

kTTY is JS tools for making nice UIs in <a href="#text-terminals">text terminals</a>.  

Here's an index of KTTY's source code:
| Folder                       | Section                                                                            | Description
|------------------------------|------------------------------------------------------------------------------------|-------------------------------------------------------|
| 📄 `/ktty/ktty.js`           | The ktty.js file.                                                                  | All of KTTY's functionality, bundled n exported! 🚢   |
| 🗂 `/ktty/Ribbon/*`          | <a href="https://github.com/rooftop-media/ktty/tree/main/Ribbon">🎀 Ribbon </a>    | Text styling & formatting.                            |
| 🗂 `/ktty/xk/*`              | <a href="https://github.com/rooftop-media/ktty/tree/main/xk">🔪 xKitchen </a>      | Tools to parse XML & XSS strings.                     |
| 🗂 `/ktty/Browser/*`         | <a href="https://github.com/rooftop-media/ktty/tree/main/Browser">🌐 Browser </a>  | Network tools to load TTML / TSS apps.                |
| 🗂 `/ktty/Lab/*`             | <a href="https://github.com/rooftop-media/ktty/tree/main/Labs">🧪 Lab</a>          | Test or demo KTTY.                                    |

Each folder has its own README, with more details on that section.

<br /><br />



<h4> 🐯  - How to use KTTY...</h4>



How to import KTTY:
```
//  Import KTTY like this. 
var KTTY    = require("ktty");
var ktty    = new KTTY();
```
<br /><br />



How to use Ribbon to style and format text...
```
/**  1.  Make a "CSS-like" config object.      */
var config  = {
  text:       "Hello world!",
  color:      "magenta",
  width:      "100vw",
  text_align: "center"
}

/**  2.  Create text with Ribbon.              */
var my_text = ktty.Ribbon( config );

//  Check the Ribbon docs for how to use yr Ribbon. 
```



How to use xKitchen to parse your xml and xss...
```
/**  1.  Create a new xKitchen.                */
var my_xk   = ktty.xk();

/**  2.  Load in XML and XSS.                  */
my_xk.load_xml( "<div> Hello! <b>Welcome.</b> </div>" );
my_xk.load_xss( 'b { color: "magenta"; font-weight: "bold"; }' );

//  Check the xKitchen docs for how to use yr xkitchen. 
```
<br /><br />



How to use the Browser to load TTML & TSS...
```
/**  1.  Create a new KTTY Browser.                */
var my_browser   = ktty.browser();


```
<br /><br />




<br /><br />

<h4> 🐯  - About the name...</h4>

TTY stands for TeleTYpe, referring to [teletype terminals](https://en.wikipedia.org/wiki/Teletype_Model_33).  

kTTY is best described as "KitchenWare's Terminal Tools", 
even though the acronym doesn't quite match. 

<br /><br /><br /><br /><br />





<h2 align="center">  🖨 - 💻  - Some info about text terminals!!! - 💻 - 🖨 </h2>

<p> Text terminals and text terminal emulators... </p>

<i>todo: terminal & terminal emulator softwares, ANSI codes, brief history... etc.</i>

<br /><br /><br /><br /><br />


