<h2>ktty's Document object</h2>







<h3> Dependencies...</h3>

| Folder                       | Name                                                                                 | Description                                           |
|------------------------------|--------------------------------------------------------------------------------------|-------------------------------------------------------|
| ð `/ktty/ktty.js`           | The ktty.js file.                                                                    | All of KTTY's functions, bundled n exported! ð       |
| ð `/ktty/Ribbon/*`          | <a href="https://github.com/rooftop-media/ribbon" target="_blank">ð Ribbon</a>.     | Style & format text.                                  |
| ð `/ktty/xk/*`              | <a href="https://github.com/rooftop-media/ktty/tree/main/xk">ð xKitchen</a>.        | Parse XML & XSS strings.                              |
| ð `/ktty/browser/*`         | <a href="https://github.com/rooftop-media/ktty/tree/main/browser">ð Browser</a>.    | T                                                     |
| ð `/ktty/tests/*`           | <a href="https://github.com/rooftop-media/ktty/tree/main/Labs">ð TestLab</a>.       | Test and demo KTTY's features.                        |


<h4> ð  - How to use Ribbon...</h4>

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



<h4> ð  - How to use XK...</h4>

```
/**  1.  Create a new xKitchen.                */
var my_xk   = ktty.xk();

/**  2.  Load in XML and XSS.                  */
my_xk.load_xml( "<div> Hello! <b>Welcome.</b> </div>" );
my_xk.load_xss( 'b { color: "magenta"; font-weight: "bold"; }' );

//  Check the xKitchen docs for how to use yr xkitchen. 

```
<br /><br />



<h4> ð  - How to use the ktty terminal browser...</h4>

```
/**  1.  Create a new KTTY Browser.                */
var browser   = ktty.browser();



```
<br /><br />
