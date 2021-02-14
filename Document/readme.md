<h2>ktty's Document object</h2>








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



<h4> 🌐  - How to use the ktty terminal browser...</h4>

```
/**  1.  Create a new KTTY Browser.                */
var browser   = ktty.browser();



```
<br /><br />
