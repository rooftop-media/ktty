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
| Folder                       | Name                                                                                 | Description                                           |
|------------------------------|--------------------------------------------------------------------------------------|-------------------------------------------------------|
| 📄 `/ktty/ktty.js`           | The ktty.js file.                                                                    | All of KTTY's functions, bundled n exported! 🚢       |
| 🗂 `/ktty/Ribbon/*`          | <a href="https://github.com/rooftop-media/ribbon" target="_blank">🎀 Ribbon</a>.     | Style & format text.                                  |
| 🗂 `/ktty/xk/*`              | <a href="https://github.com/rooftop-media/ktty/tree/main/xk">🔪 xKitchen</a>.        | Parse XML & XSS strings.                              |
| 🗂 `/ktty/browser/*`         | <a href="https://github.com/rooftop-media/ktty/tree/main/browser">🌐 Browser</a>.    | T                                                     |
| 🗂 `/ktty/tests/*`           | <a href="https://github.com/rooftop-media/ktty/tree/main/Labs">🧪 TestLab</a>.       | Test and demo KTTY's features.                        |

Each folder has its own README, with more details on that section.  Click the links to check 'em out. 

<br /><br />



<h4> 🐯  - How to use KTTY...</h4>

```
//  Import KTTY like this. 
var KTTY    = require("ktty");
var ktty    = new KTTY();
```
<br /><br />


<h4> 🎀  - How to use Ribbon...</h4>

```
/**  1.  Import Ribbon.                        */ 
var Ribbon    = require("Ribbon");

/**  2.  Make an instance, add text.           */
var ribbon    = new Ribbon();
ribbon.add_text("Hello world!");

/**  3.  Make a css-like style config.         */
var config  = {
  color:      "magenta",
  width:      "100vw",
  text_align: "center"
}

/**  4.  Apply the styles.                     */
var my_text = ribbon.style( config );
```
<br /><br />



<h4> 🔪  - How to use XK...</h4>

```
/**  1.  Create a new xKitchen.                */
var my_xk   = ktty.xk();

/**  2.  Load in XML and XSS.                  */
my_xk.load_xml( "<div> Hello! <b>Welcome.</b> </div>" );
my_xk.load_xss( 'b { color: "magenta"; font-weight: "bold"; }' );

//  Check the xKitchen docs for how to use yr xkitchen. 

```
<br /><br />



<h4> 🔪  - How to use the ktty terminal browser...</h4>

```
/**  1.  Create a new KTTY Browser.                */
var browser   = ktty.browser();



```
<br /><br />





<h4> 🐯  - About the name...</h4>

TTY stands for TeleTYpe, referring to [teletype terminals](https://en.wikipedia.org/wiki/Teletype_Model_33).  

kTTY is best described as "KitchenWare's Terminal Tools", 
even though the acronym doesn't quite match. 

<br /><br /><br /><br /><br />
<br /><br /><br /><br /><br />





<h2 align="center">  🖨 - 💻  - Glossary of Useful Terms - 💻 - 🖨 </h2>

Defining some relevant technical terms.  

The table bel is a glossary index.  Click

| Term             | Definition                                     | Wikipedia     |
|------------------|------------------------------------------------|---------------|
| Text terminal    | A screen that displays text-graphics only.     | <a href="https://en.wikipedia.org/wiki/Computer_terminal#Text_terminals" target="_blank">Link</a> |

<br /><br /><br /><br /><br />


