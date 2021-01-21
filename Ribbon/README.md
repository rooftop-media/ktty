<!-- Title -->
<h1 align="center">
  🎀 ◉ 🖨 ◎ kTTY String Formatter ◎ 🖨 ◉ 🎀 
</h1>

<!--  Subtitle -->
<h3 align="center">
  <i>kTTY's tools to turn text into tools!</i>
</h3>

---

<br /><br /><br /><br /><br />




<h2 align="center"> 🎀  - About the graphics... - 🎀</h2>

kTTY styles <a href="https://en.wikipedia.org/wiki/Text-based_user_interface" target="_blank">text terminal interfaces</a>.
The functions in this folder ( `/ktty/graphics/*` ) stylize & format text
to make lil text box elements, and position them nicely. 

This functions are graphics processing logic -- like what 
your browser uses to interpret CSS into beautiful web pages.  
Except, of course, the browser can render images and other 
elements with <a href="https://en.wikipedia.org/wiki/Dot_matrix#All_points_addressable" target="_blank">point-addressable</a> accuracy.
Our terminal-based graphics are built with "character-addressable"
<a href="https://en.wikipedia.org/wiki/Text_mode" target="_blank">text-mode</a> logic, on the other hand. 

kTTY's graphics functions are organized into **four sections**, 
each of which vaguely build on each other. 

Click a section name to jump to its description. 

<br />

1. 🖍 <a href="#ansi">ANSI text styling</a> which includes:
   - Get color codes compatible with your terminal. 
   - Get codes to change text color & text background color. 
   - Get codes to style text -- bold, underline, dim, reverse-video, etc. 
   - Function to add style codes before/after a string. 

<br />

2. 📝 <a href="#inline">Inline text formatting</a>, which includes:
   - Get values for viewport-relative length units `vw` and `vh`.
   - Apply word-wrap to text, given some width.  Justify text as it's wrapped. 
   - Align text left, right, or center. 
   
<br />
  
3. 📦 <a href="#box">Box text formatting</a>, which includes:
   - Pad around a text box.  
   - Add a border.
   - Add a margin.
   - Resize for the "border-box" option.
   
<br />

4. 🍱 <a href="#display">Display text boxes</a> together in a container 
   - Block, flex, or grid layouts!  
   
<br />






<h2 align="center"> ☟ - kTTY Function Descriptions,  by section - ☟ </h2>

As a recap, kTTY function sections are:
 1. 🖍 <a href="#ansi">ANSI text styling</a>
 2. 📝 <a href="#inline">Inline text formatting</a>
 3. 📦 <a href="#box">Box text formatting</a>
 4. 🍱 <a href="#display">Display text boxes</a> 
 5. 📅 <a href="#events">Terminal Events</a>

<br /><br /><br /><br /><br />


<!----                                ---->
<!--   SECTION 1: ANSI Text Functions   -->
<!----                                ---->
<h4 id="ansi" align="center"> 1. 🖍  ANSI text styling functions: </h4>

The ANSI section applies <a href="https://en.wikipedia.org/wiki/ANSI_escape_code#Colors" target="_blank">ANSI escape codes</a> around text, 
to change the text's display settings -- text color, bold, dim, etc. 

Different terminal emulators support different ANSI codes, and different color codes.   
We'll resolve those here too. 

In the folder 🗂 ktty/methods/ansi/
| Method File        | Method Name                                                     | Description                                                              |
|--------------------|-----------------------------------------------------------------|--------------------------------------------------------------------------|
| 📄 /get.js         | <a href="#get-ansi">`ktty.get_ansi( category, value )`</a>      | Get ANSI codes, for style & tty event codes                              | 
| 📄 /color.js       | <a href="#get-color">`ktty.get_color( color_string )`</a>       | Get ANSI compatible color codes from `rgb(<0-255>, <0-255>, <0-255>)`    |
| 📄 /style.js       | <a href="#ansi-style">`ktty.ansi_style( config )`</a>           | Apply ANSI styling to a string.                                          |

<br /><br /><br /><br /><br />




<!--   1.1.  GET ANSI       -->
<h4 align="center" id="get-ansi"> `ktty.get_ansi( category, value )` --- 📄 ktty/methods/ansi/get.js </h4>

This one gives you the actual ANSI codes themselves, as escaped strings. 

ANSI codes are basically a standard way to encode terminal instructions as a text string. 

Technically, all "text strings" are instructions to the terminal, to type specific letters.
ANSI codes don't type letters on the screen, though.  ANSI codes tell the terminal to switch 
to **bold**, _italic_, different colors, etc.  ANSI is like the original markup language. 

<br /><br /><br />



<!--   1.2.  GET COLOR      -->
<h4 align="center" id="get-color"> `ktty.get_color( color_string )` --- 📄 ktty/methods/ansi/color.js </h4>

ANSI colors are used when changing the background or text draw color. 

This function handles the logic to resolve colors, from CSS-friendly 
text strings to an ANSI format compatible with the runnimg machine. 

<i>todo: document the logic for this</i>

<br /><br /><br />



<!--   1.3.  ANSI STYLE     -->
<h4 align="center" id="ansi-style"> `ktty.ansi_style( config )` --- 📄 ktty/methods/ansi/style.js </h4>

Apply ANSI styling around a string of text, reset the style afterwards. 

The "config" passed in has these attributes:
 - 1 . text:              `<string>`
 - 2 . color:             `<color-name>` | "rgb(`<0-255>`, `<0-255>`, `<0-255>`)"
 - 3 . background:        `<color-name>` | "rgb(`<0-255>`, `<0-255>`, `<0-255>`)"
 - 4 . brightness:        "normal" | "dim"
 - 5 . font-weight:       "normal" | "bold"
 - 6 . text-decoration:   "normal" | "underline"
 - 7 . reverse-video:     "no-thanks" | "yes-please"
 
<br /><br /><br />



<!----                                ---->
<!--   SECTION 2: ANSI Text Functions   -->
<!----                                ---->
<h2 id="inline" align="center"> 2. 📝  Inline text formatting functions: </h2>

The tables below list methods in the folder `/ktty/methods/inline/`. 

The `/inline/` folder's functions all take a text string, and styling config options.

In the folder 🗂 ktty/methods/inline/
| Method File       | Method Name                                                | Description                                                              |
|-------------------|------------------------------------------------------------|--------------------------------------------------------------------------|
| 📄 style.js       | <a href="#inline-style">`inline_style( config ) `</a>      | Apply inline styles.                                                     |

In the folder 🗂 ktty/methods/inline/style/
| Method File       | Method Name                                                | Description                                                              |
|-------------------|------------------------------------------------------------|--------------------------------------------------------------------------|
| 📄 wrap.js        | <a href="#wrap">`wrap( config )`</a>                       | Wrap words to fit in a text box of a given width.                        | 
| 📄 align.js       | <a href="#align">`align( config )`</a>.                    | Align text left, right, center.                                          |

In the folder 🗂 ktty/methods/inline/get/
| Method File        | Method Name                                               | Description                                                              |
|--------------------|-----------------------------------------------------------|--------------------------------------------------------------------------|
| 📄 length.js.      | <a href="#get-length">`get_length( length_string )`</a>   | Resolve length units `vw` and `vh` into `sp`.                            |
| 📄 width.js        | <a href="#get-width">`get_width( string )`</a>            | Get string's max width, ignoring ANSI codes.                             |


<br /><br />

Okay let's look at all those functions. 🦆

<br /><br />



<h4 align="center" id="inline-style"> `ktty.inline_style( config )` --- 📄 ktty/methods/inline/style.js </h4>

 ⇢ All the styling from the functions in the folder `/inline/style/` 
 can be applied through the method `xk.inline_style( config )`.
 
 The script for `inline_style( config )` is written in the file `/inline/style.js`.

Here's a list of the config's fields and values:

 - 1 . text:            - `<string>` (The only required field),
 - 2 thru 7 . ANSI      - All the config options from <a href="#ansi-style">ktty.ansi_style( config )</a>, defined above. 
 - 8 . white-space:     - "normal" | "nowrap" | "pre" | "pre-wrap"
 - 9 . width:           - "`<int>`sp" | "`<int>`vw" | "auto"
 - 10 . box-sizing      - Doesn't do anything yet, but its space here is important. 
 - 11 . word-wrap:      - "break-word" | "break-character"
 - 12 . text-align:     - "left" | "center" | "right"
 - 13 . text-justify:   - "none" | "inter-word" | "inter-character"
 
Inside `ktty.inline_style( config )`, each of these attribute's style
is applied one after another, in an assembly line fashion. 🤖

The **order does matter** for this implementation.

<br /><br /><br />



<h4 align="center" id="wrap"> `ktty.wrap( config )` --- 📄 ktty/methods/inline/style/wrap.js </h4>

Pass in a config that looks like this:
```
var wrap_config = {
  text: "123456789012345\nHi!  This is some text -- text which may be longer than the width of your viewport!!!",
  width: "10sp"
  word_wrap: "break-word" 
}
var wrapped_string = ktty.wrap( wrap_config );
```
... and `console.log( wrapped_string )` will look like this:

```
1234567890
12345
Hi!  This 
is some 
text -- 
text which
may be 
longer 
than the 
width of 
your 
viewport!!
!
```


<br /><br /><br />



<h4 align="center" id="align"> `ktty.align( config )` --- 📄 ktty/methods/inline/style/align.js </h4>

Align text handles 

Pass in a config that looks like this:
```
var align_config = {
  text: "\",
  width: "10sp"
  word_wrap: "break-word" 
}
var wrapped_string = ktty.wrap( wrap_config );
```

<br /><br /><br />






<h4 align="center" id="get-length"> `ktty.get_length( length_string )` --- 📄 ktty/methods/inline/get/length.js </h4>

<i>todo: write description here...</i>

<br /><br /><br />



<h4 align="center" id="get-width"> `ktty.get_color( string )` --- 📄 ktty/methods/inline/get/width.js </h4>

<i>todo: write description here...</i>






<br /><br /><br /><br /><br />





<h2 id="box" align="center"> 2. 📦  Box text formatting...</h2>

The table below lists methods in the folder `/ktty/methods/box/`. 

The `/box/` folder's functions all take a text string, and styling config options.

In the folder 🗂 ktty/methods/box/
| Method File      | Method Name                                                     | Description                                                      |
|------------------|-----------------------------------------------------------------|------------------------------------------------------------------|
| 📄 style.js.     | <a href="#box-style">`box_style( config )`</a>                  | Apply all styling in order, to make a text box!                  | 


In the folder 🗂 ktty/methods/box/style/      
| Method File      | Method Name                                                     | Description                                                      |
|------------------|-----------------------------------------------------------------|------------------------------------------------------------------|
| 📄 style.js.     | <a href="#box-style">`box_style( config )`</a>                  | Apply all styling in order, to make a text box!                  | 
| 📄 frame.js      | <a href="#frame">`frame( config )`</a>                          | Utility used in pad, border & margin.                            |
| 📄 pad.js        | <a href="#pad">`pad( config )`</a>                              | Add padding around text of some height & width.                  | 
| 📄 border.js.    | <a href="#border">`border( config )`</a>                        | Add a border of box characters.                                  | 
| 📄 margin.js     | <a href="#margin">`margin( config )`</a>                        | Add margin around borders.                                       | 

In the folder 🗂 ktty/methods/box/get/     
| Method File      | Method Name                                                     | Description                                                      |
|------------------|---------------------------------------------------------|--------------------------------------------------------------------------|
| 📄 padding.js    | <a href="#inline-style">`get_padding( padding_string )`</a>     | Resolves units that look like `10sp 20sp 10sp 5sp`               | 
| 📄 box_char.js   | <a href="#get-box-char">`get_box_char( style, wgt, dir )`</a>   | Get box characters, like ├ ┬┌ ┐└ ┤                              |
| 📄 size.js       | <a href="#box-size">`box_size( config )`</a>                    | Resolve height & width, do box-sizing option.                    |


<br /><br />

<h4 align="center" id="box-style"> `ktty.box_style( config )` --- 📄 ktty/methods/box/style.js </h4>

The options for the `box_style()` config include:

 - 1 . thru 12.  Everything from the config file of `inline_box()`
 - 13 . box-sizing:   "content-box" | "border-box"
 - 14 . padding:      `<padding-units>`
 - 15 . border:       `<border-units>`
 - 16 . margin:       `<padding-units>`
 
<br />








<h2 id="display" align="center"> 3. 🍱 Display multiple elements together...</h2>

The table below lists methods in the folder `/ktty/methods/display/`. 

| Method name     |  Description                                        |
|-----------------|-----------------------------------------------------|
| 📄 doc_flow.js  |  Position the elements in document flow.            |
| 📄 flex.js      |  Position using flexbox rules.                      |
| 📄 grid.js      |  Position using grid rules.                         |

The methods in `/ktty/methods/display/` all take 2 arguments: 
A JS config for the parent element, and an array of configs for the children. 

Each element in the array of child JS config objects may have:  
 - 1 . thru 16 .       Any options that would work for box_style( config )     
 - 17 .  position:    "box" | "inline" | "absolute" | "relative"  
 - 18 .  top:         `<int>`sp | `int`vh  
 - 19 .  right:       `<int>`sp | `int`vw  
 - 20 .  bottom:      `<int>`sp | `int`vh  
 - 21 .  left:        `<int>`sp | `int`vw  

The single config object for the *parent* element may have:  
   1. thru 16.        Any options that would work for box_style( config ).   
   17.  thru 21.     Any option that would work for a child.   
   22.  display:     "flow" | "flex" | "grid"   

<br /><br /><br /><br /><br />


<h2 id="events" align="center"> 4. 📅 Manage terminal events...</h2>

Terminal events are separate from the text formatting functions. 
Use terminal event functions to map JS to user input, etc. 

The table below lists methods in the folder `/ktty/methods/events/`. 

| Method File   | Method Name                        |  Description                     |
|---------------|------------------------------------|----------------------------------|
| 📄 setup.js   | setup();                           | Start capturing events.          |
| 📄 on.js      | on( event_name, reaction );        | Re-map event reaction.           |




<br /><br /><br />

