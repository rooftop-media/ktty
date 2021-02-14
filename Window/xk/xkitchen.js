/*

                 -     +     -
            - -    X Kitchen    - -
                 -     =     - 
  
         A suite of tools to manage XML.

     

*/



//  Importing XML methods:

/**  XML String to XML Tokens:  */
var _xml_to_tokens     = require( __dirname + "/methods/xml/to/tokens.js" );

/**  XML Tokens to XML Nodes:   */
var _xml_to_nodes      = require( __dirname + "/methods/xml/to/nodes.js" );


/**  Validate XML Tokens:       */
var _check_xml_tokens  = require( __dirname + "/methods/xml/check/tokens.js" );

/**  Validate XML Node order:   */
var _check_xml_nodes   = require( __dirname + "/methods/xml/check/nodes.js" );

/**  Validate XML Node pairing: */
var _check_xml_pairs   = require( __dirname + "/methods/xml/check/pairs.js" );


/**  Get XML with syntax highlights. */
var _getXML            = require( __dirname + "/methods/xml/get/XML.js");

/**  Gets an array of xml.      */
var _getTagsByName     = require( __dirname + "/methods/xml/get/TagsByName.js" );

/**  Gets an attribute .        */
var _getAttribute      = require( __dirname + "/methods/xml/get/Attribute.js" );




//  Importing XSS methods:

/**  XSS String to XSS Tokens:                        */
var _xss_to_tokens    = require( __dirname + "/methods/xss/to/tokens.js" );
 
/**  Cascade XSS:                                     */
var _cascade_xss      = require( __dirname + "/methods/xss/cascade.js" );

/**  Get XSS with syntax highlights. */
var _getXSS           = require( __dirname + "/methods/xss/get/XSS.js");



//  Importing render methods:

/**  XML and XSS Nodes to Render Tree Node List.      */
var _get_render_nodes = require( __dirname + "/methods/render/get/nodes.js" );

/**  Renderable Node List to Rendered String! Nice!   */
var _get_json         = require( __dirname + "/methods/render/get/json.js" );



//   Defining the XKitchen class: 
module.exports = class XKitchen {



    /*  constructor   - called when new instances are made     */
    constructor() {
	this.xml          = "";
	this.xss          = "";
	this.rules        = {};
    }



    /* * *                           * *
     *       =  XML methods:  =        *
     * *                           * * */



    /**  load_xml         - load an xml string after construction. */
    load_xml( xml_string ) {
	this.xml          = xml_string;
    }

    /**  xml_to_tokens    - returns a list of labelled tokens.     */
    xml_to_tokens() {
	var tokens        = _xml_to_tokens( this.xml );
	return tokens;
    }
    
    /**  check_xml_tokens - Checks that tokens form valid XML.     */
    check_xml_tokens() {
	var tokens        = this.xml_to_tokens();
	var results       = _check_xml_tokens(tokens);
	return results;
    }
    
    /**  xml_to_nodes     - Returns a list of parsed nodes.       */
    xml_to_nodes() {
	var tokens        = this.xml_to_tokens();
	var nodes         = _xml_to_nodes(tokens);
	return nodes;
    }

    /**  check_xml_nodes   - Checks that node order is valid.     */
    check_xml_nodes() {
	var nodes         = this.xml_to_nodes();
	var results       = _check_xml_nodes(nodes);
	return results;
    }

    /**  check_pairs     - Checks open/close node pairs.         */
    check_pairs() {
	var nodes         = this.xml_to_nodes();
	var results       = _check_pairs(nodes);
	return results;
    }

    /**  getXML          - Get XML with syntax highlighting.     */
    getXML() {
	var nodes         = this.xml_to_nodes();
	var results       = _getXML( nodes );
	return results;
    }

    /**  getTagsByName   - Get a list of XML elements.           */
    getTagsByName( tag_name ) {
	var xml_nodes     = this.xml_to_nodes();
	return _getTagsByName( xml_nodes, tag_name );
    }

    /**  getAttribute    - Get an attr value by attr name.       */
    getAttribute( attr_name ) {
	var xml_nodes     = this.xml_to_nodes();
	return _getAttribute( xml_nodes, attr_name );
    }


    /* *                           * * *
     *       =  XSS methods:  =        *
     * * *                           * */


    /**  XSS is like XML, except for CSS instead of HTML. 
	 XSS stands for eXtensible StyleSheets.
	 XSS is not XSL, or the other thing XSS stands for.
	 xss is my fav.   */

    /**  load_xss        - Load an xss string.                 */
    load_xss( xss_string ) {
	this.xss          = xss_string;
    }

    /**  add_xss          - Adds an additional xss source.     */
    add_xss( xss_string ) {
	this.xss         = xss_string + "\n" + this.xss;
    }

    
    /**  xss_to_tokens    - Creates an xss node list.          */
    xss_to_tokens() {
	var nodes = _xss_to_tokens( this.xss );
	return nodes;
    }


    /**  cascade_xss     - Cascade stylesheet, reducing it.    */
    cascade_xss() {
	var nodes = this.xss_to_tokens();
	var results = _cascade_xss( nodes );
	return results;
    }
    
    /**  getXSS          - get XSS                             */
    getXSS() {
	var nodes         = this.xss_to_tokens();
	var results       = _getXSS( nodes );
	return results;
    }





    /*  *  *                      *  *  *
     *      =  Render methods:  =       *
     *  *  *                      *  *  */
    
    /*  get_render_nodes    - Creates a render node list.        */
    get_render_nodes() {
	var xss_nodes     = this.xss_to_tokens();
	var xml_nodes     = this.xml_to_nodes();
	var render_nodes  = _get_render_nodes( xml_nodes, xss_nodes );
	return render_nodes;
    }



    /*  load_rule      - Load a render rule.                   */
    load_rule( rule ) {
	var rule_name     = rule.name;
	this.rules[ rule_name ] = {
	    check_input:  rule.check_input,
	    affect_start: rule.affect_start,
	    affect_text:  rule.affect_text,
	    affect_end:   rule.affect_end
	}
	return this.rules[ rule_name ];
    }



    /*  get_json       - Applies loaded rules to render tree.   */
    get_json() {
	var render_nodes = this.get_render_nodes();
	var render_json   = _get_json( render_nodes );
	return render_json;
    }



}
