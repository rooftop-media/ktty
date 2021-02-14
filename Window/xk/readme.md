<!-- Title -->
<h1 align="center">
  🍱  🍴  xKitchen  🍴  🍱
</h1>

<!--  Subtitle -->
<h2 align="center">
  <i>JS tools to work with XML & XSS.</i>
</h2>

<br /><br /><br /><br /><br />
<br /><br /><br /><br /><br />









<h3 align="center" id="about-xk">
  🍴 - About xKitchen - 🍴
</h3>

#### 🤔 Understanding xKitchen

XKitchen is a NodeJS library that lets you manipulate 
xml & xss!  

For a refresher on XML & an intro to XSS, jump to our 
<a href="#about-xml-xss">About XML & XSS</a> section. 

That section will tell you what XML & XSS are, and
why they're important for us to use. 

<br /><br /><br />



#### 💡 How to Use xKitchen

xKitchen is made to be used internally, by the Backend Browser.  

But it can be used for any XML-parsing job!  
Here's how you can use the xKitchen JS module:

```
var XKitchen = require( "XKitchen" );
var my_xk    = new XKitchen();

var xml      = "<span> Hi! </span>";
var xss      = "span { font-weight: bold; }";

my_xk.load_xml( xml );
my_xk.load_xss( xss );

// Now you can call various methods on yr XML/XSS!!

```

<br /><br /><br />



#### 🗺 How xKitchen is Made

xKitchen is JS tools for interpreting XML & XSS.

xKitchen's code is described below in 4 section:

 1. <a href="#xk-datatype">the xKitchen datatype </a>
 2. <a href="#xml-functions">XML functions</a>
 3. <a href="#xss-functions">XSS functions</a>
 4. <a href="#render-functions">Render functions</a>

<br /><br /><br /><br /><br />
<br /><br /><br /><br /><br />











<h3 align="center" id="xk-datatype"> 📝  1. The xKitchen datatype...</h3>

#### ☞  xKitchen Load Methods

Most of xKitchen's methods are written in separate files in the 
`xk/methods/` folder.  The file `xk/xkitchen.js` imports & 
packages methods from that folder --

-- but the two methods below are the exceptions, as they're 
written right inside `xk/xkitchen.js`.  

These two are also <b>two of the most important functions</b>, as they can
save an XML string or an XSS string to an xKitchen's local memory. 

All other xk methods will operate on these two loaded strings. 

|   | File path:             | Methods for loading text:                                 | Used by:    |
|---|------------------------|-----------------------------------------------------------|-------------|
| ⇢ | 📄 xk/xkitchen.js      | <a href="#load-xml">load_xml( xml_string )</a>            | done!       |
| ⇢ | 📄 xk/xkitchen.js.     | <a href="#load-xss">load_xss( xss_string )</a>            | mvp         |

<br /><br /><br />



<!--  load xml  -->
<h4 id="load-xml"> ⇢ load_xml( xml_string ) </h4>
Pass in a string of XML,  like the contents of a .html file.  
We'll store it in `this.xml`.  

An example: 
```
var my_xk    = new XKitchen();
var some_xml = "<html><h1>Hello world!</h1></html>";
my_xk.load_xml( some_xml );
```

<br /><br /><br />



<!--  load xss  -->
<h4 id="load-xss"> ⇢ load_xml( xss_string ) </h4>
Pass in a string of XSS,  like the content of a .css file.  
The text will be saved in `this.xss`.  

An example: 
```
var some_xss = " a { color: cyan; font-decoration: underline; } ";
my_xk.load_xss( some_xss );
```

<br /><br /><br /><br /><br />
<br /><br /><br /><br /><br />










<h3 align="center" id="xml-functions"> <> 2. XML functions... </h3>

Files in `/xk/methods/xml/`:

|   | File path:            | xk xml methods:                                              | Used by:                               |
|---|-----------------------|--------------------------------------------------------------|----------------------------------------|
| ⇢ | 📄 to/tokens.js       | <a href="#xml-to-tokens">xml_to_tokens()</a>                 | to/nodes.js                            |
| ⇢ | 📄 to/nodes.js        | <a href="#xml-to-nodes">xml_to_nodes()</a>                   | get/TagsgByName.js, get/Attribute.js   |
| ⇢ | 📄 check/tokens.js    | <a href="#check-xml-tokens">check_xml_tokens()</a>           |                                        |
| ⇢ | 📄 check/nodes.js     | <a href="#check-xml-nodes">check_xml_nodes()</a>             |                                        |
| ⇢ | 📄 check/pairs.js     | <a href="#check-xml-pairs">check_xml_pairs()</a>             |                                        |
| ⇢ | 📄 get/TagsByName.js  | <a href="#getTagsByName">getTagsByName( tag_name )</a>       | bb/...                                 |
| ⇢ | 📄 get/Attribute.js   | <a href="#getAttribute">getAttribute( attr_name )</a>        | bb/...                                 |
| ⇢ | 📄 get/Text.js        | <a href="#getText">getText( attr_name )</a>                  |                                        |
| ⇢ | 📄 get/XML.js         | <a href="#getXML">getXML( attr_name )</a>                    |                                        |
| ⇢ | 📄 from/XML.js        | <a href="#xml-from-nodes">xml_from_nodes( attr_name )</a>    |                                        |

<br /><br /><br />



#### Descriptions for the files in the folder `/xk/methods/xml/to` -- 

These methods return the xml translated "to" some other format, like tokens or nodes. 

<!--  XML to TOKENS            -->
<h4 id="xml-to-tokens"> ⇢ ⇢ ⇢ xml_to_tokens() </h4>
This function acts on the string in `this.xml`, 
returning an array of "XML tokens". 

Tokens are formatted as strings, like `"TAG-OPEN: <"` or 
`"TAG-NAME: div"`. Possible token name/value pairs:

| Token name    | Token value |
|---------------|-------------|
| TEXT          | `<string>`  | 
| TAG-OPEN      | <           | 
| TAG-NAME      | `<string>`  | 
| TAG-SLASH     | /           | 
| TAG-CLOSE     | >           | 
| ATTR-EQUAL    | ="          |
| ATTR-END      | "           |

<br /><br /><br />



<!--  XML to NODES               -->
<h4 id="xml-to-nodes">  ⇢ ⇢ ⇢ xml_to_nodes() </h4>
This function uses tokens produced by `xml_to_tokens()`, 
and returns an array of "XML nodes". 

Just like tokens, nodes are formatted as strings, 
like `"OPEN-TAG: div"` or `"TEXT: hello!"`. 

| Node  name    | Node value  |
|---------------|-------------|
| OPEN-TAG      | `<string>`  | 
| ATTR-NAME     | `<string>`  | 
| ATTR-VALUE    | `<string>`  | 
| TEXT          | `<string>`  | 
| CLOSE-TAG     | `<string>`  | 

<br /><br /><br />



#### Descriptions for files in `/xk/methods/xml/check`:

Methods to check the validity of an XML file's token order, 
the node order, or the matching node pairs. 

<!--  Check XML tokens            -->
<h4 id="check-xml-tokens"> ⇢ ⇢ ⇢ check_xml_tokens() </h4>
This method checks if the XML string's tokens are in a valid order.  
Checking the token order makes it easier to turn tokens into nodes.  

<br /><br /><br />



<!--  Check XML nodes             -->
<h4 id="check-xml-nodes"> ⇢ ⇢ ⇢ check_xml_nodes() </h4>
This method checks if the XML string's nodes are in a valid order.  

<br /><br /><br />



<!--  Check XML pairs             -->
<h4 id="check-xml-pairs"> ⇢ ⇢ ⇢ check_xml_pairs() </h4>
This method checks if each of the XML string's open-tags have a matching close-tag.  

<br /><br /><br />



#### Descriptions for files in `/xk/methods/xml/get`:

Methods to get data from the XML.  "Query" functions, like you
have with a <a href="https://www.w3schools.com/js/js_htmldom_methods.asp" target="_blank">browser DOM interface</a>. 

<!--  Get XML tags by name       -->
<h4 id="getTagsByName"> ⇢ ⇢ ⇢ getTagsByName( tag_name ) </h4>
Returns a list of XML snippets.

( Useful when you want to find all the `<link>` tags in an XML file. )

<br /><br /><br />



<!--  Get XML tag attribute      -->
<h4 id="getAttribute"> ⇢ ⇢ ⇢ getAttribute( attr_name ) </h4>
Finds an attribute of the outermost tag of an xml string, return that attribute's value.

( Useful when you have an xml link tag, and want to find the url string in the `src="url"` attribute. )

<br /><br /><br />



<!--  Get text from outer tag.   -->
<h4 id="getText"> ⇢ ⇢ ⇢ getText(  ) </h4>
Finds an attribute of the outermost tag of an xml string, return that attribute's value.

( Useful when you have an xml link tag, and want to find the url string in the `src="url"` attribute. )

<br /><br /><br />







<br /><br /><br /><br /><br />
<br /><br /><br /><br /><br />









<h3 align="center" id="xss-functions"> {} 3. XSS functions... </h3>

Files in `/xk/methods/xss/`:

|   | File path:            | xk xss methods:                                        |           |
|---|-----------------------|--------------------------------------------------------|-----------|
| ⇢ | 📄 to/tokens.js       | <a href="#xss-to-tokens">xss_to_tokens()</a>           | in prog   |
| ⇢ | 📄 to/nodes.js        | <a href="#xss-to-nodes">xss_to_nodes()</a>             |           |
|   |                                                                                |           |
| ⇢ | 📄 check/tokens.js    | <a href="#check-xss-tokens">check_xss_tokens()</a>     |           |
| ⇢ | 📄 check/nodes.js     | <a href="#check-xss-nodes">check_xss_nodes()</a>       |           |

<br /><br /><br />

#### Descriptions for files in `/xk/methods/xss/to`:

Turn XSS into tokens or nodes. 

<!--  XSS to TOKENS  -->
<h4 id="xss-to-tokens"> ⇢ ⇢ ⇢ xss_to_tokens() </h4>
This function acts on the string in `this.xss`, returning an array of "XSS tokens". 

| Token name    | Token value |
|---------------|-------------|
| SELECTOR      | `<string>`  | 
| OPEN-BRACE    | {           | 
| RULE-NAME     | `<string>`  |
| RULE-COLON    | :           |
| RULE-VALUE    | `<string>`  |
| RULE-END      | ;           |
| CLOSE-BRACE   | }           | 

<br /><br /><br />



<!--  XSS to NODES  -->
<h4 id="xss-to-nodes"> ⇢ ⇢ ⇢ xss_to_nodes() </h4>
This function acts on the string in `this.xss`, returning an array of "XSS node". 

| Token name    | Token value |
|---------------|-------------|
| SELECTOR      | `<string>`  | 
| RULE-NAME     | `<string>`  |
| RULE-VALUE    | `<string>`  |

<br /><br /><br />



#### Descriptions for files in `/xk/methods/xss/check`:

Check the validity of XSS tokens or nodes. 

<!--  Check XSS tokens  -->
<h4 id="check-xss-tokens"> ⇢ ⇢ ⇢ check_xss_tokens() </h4>
This method checks if the XSS string's tokens are in a valid order.  Checking the token order makes it easier to turn tokens into nodes.  

<br /><br /><br />



<!--  Check XSS nodes  -->
<h4 id="check-xss-nodes"> ⇢ ⇢ ⇢ check_xss_nodes() </h4>
This method checks if the XSS string's nodes are in a valid order.  


<br /><br /><br /><br /><br />
<br /><br /><br /><br /><br />







<h3 align="center" id="render-functions"> Tt 4. Render functions... </h3>

Files in `/xk/methods/render/`:

|   | File path:            | xk xss methods:                                        |           |
|---|-----------------------|--------------------------------------------------------|-----------|
| ⇢ | 📄 get/nodes.js       | <a href="#get-render-nodes">get_render_nodes()</a>     | in prog   |
| ⇢ | 📄 get/json.js        | <a href="#get-render-json">get_render_json()</a>       |           |
|   |                                                                                |           |



<br /><br /><br /><br /><br />
<br /><br /><br /><br /><br />





<h2 align="center">☟ xKitchen Appendix Section ☟</h2>
<h5 align="center">Below is some misc info about various xKitchen concepts. </h5>

<br /><br /><br />



<h3 align="center" id="about-xml-xss>
  🌎 ⇠ ℹ️ - Intro to XML & XSS - ℹ️ ⇢ 🌍
</h3>

Here's a quick introduction to the ideas behind XML & XSS -- 
and an explanation of why xKitchen is important. 

<br /><br />

#### About XML:

Let's start with a brief intro to  <a href="https://en.wikipedia.org/wiki/XML" target="_blank">XML</a> -- a relatively simple
markup language. XML has been around since 1996, and plays a critical
role in your browser's website rendering process. 

XML stands for eXtensible Markup Language.  And we can very
much think of it as a language -- defined by a rule set & grammar. 

XML is called "extensible" because the language's grammar rules
are meant to be "extended", for specific purposes.  The language
<a href="https://www.w3schools.com/html/" target="_blank">HTML</a> --  Hyper Text Markup Language -- is used to load all website
content in browsers like Chrome or Safari. 

Like any computer language, an XML is only useful if we have software
to interpret it.  Chrome or Safari interpret HTML, and use it to 
render web pages.  xKitchen provides tools to more easily interpret 
XML for a variety of tasks.  

<br /><br />

#### About XSS:

Unlike XML, XSS isn't a time-tested standard.  XSS is an adaptaion 
of <a href="https://www.w3schools.com/html/" target="_blank">CSS</a> -- Cascading Style Sheets, which is a language used to style 
HTML in web browsers. 

The "eXtensibility" thing is important, because xKitchen will use the
CSS format to sprinkle data into XML in other instances, too. 

<br /><br />

For more resources on XML, you can read wikipedia or w3schools.

To jump back up to the XK software description, click <a href="#about-xk">here</a>.

The appendix continues below, with other misc xKitchen information. 

<br /><br /><br /><br /><br />
<br /><br /><br /><br /><br />

