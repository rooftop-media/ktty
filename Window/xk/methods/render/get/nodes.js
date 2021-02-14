/*  xk/methods/render/get/nodes.js
    
    Combine XML & XSS  into a list of "render nodes". 

    Node types:

    OPEN-TAG
    RULE-NAME       // ☜  this and
    RULE-VALUE      //  ☜  this are added thru XSS.
    ATTR-NAME
    ATTR-VALUE
    TEXT
    CLOSE-TAG

*/

//  get_rules  -  a subfunction we'll use in get_render_nodes. 
//  Returns an array of RULE-NAME and RULE-VALUE nodes.
function get_rules( xss_nodes, selector ) {
    
    /**  Track whether we've found the right selector  */
    var found_selector  = false;

    /**  We'll store relevant rules in here.           */
    var rules           = [];

    /**  And now we can loop through the nodes!        */
    for ( var i = 0; i < xss_nodes.length; i++ ) {

	var node_parts  = xss_nodes[i].split( ': ' );
	var ntype       = node_parts[0];
	var nvalue      = node_parts[1];

	//  React to the specified selector: start capturing! 
	if ( found_selector == false ) {
	    if ( ntype == 'SELECTOR' && nvalue == selector ) {
		found_selector = true;
	    }
	}

	//  React to rules – once we found the selector, capture names/values.
	else if ( found_selector == true ) {
	    
	    if ( ntype == 'RULE-NAME' || ntype == 'RULE-VALUE' ) {
		rules.push( ntype + ": " + nvalue );

	    } else if ( ntype == 'SELECTOR' ) {
		return rules;
	    }

	}
	
    } /** End of for loop.  */
    
    return rules;
    
}


//  get_render_nodes  –  takes XML nodes & XSS nodes, returns a render tree.
module.exports = function get_render_nodes( xml_nodes, xss_nodes ) {

    /**  Store render node list here:                   */
    var render_nodes    = [];

    /**  Store attribute type.                          */
    var style_attribute = "none"  // class | id
    
    /**  Loop through token list.                       */
    for ( var i = 0; i < xml_nodes.length; i++ ) {
	
	/**  Get the type / value of the current node.  */
	var node_parts  = xml_nodes[i].split( ': ' );
	var ntype       = node_parts[0];
	var nvalue      = node_parts[1];
  	
	//  React to an open tag.
	if ( ntype == 'OPEN-TAG' ) {
	    render_nodes.push( 'OPEN-TAG: ' + nvalue );
	    var xss_rules = get_rules( xss_nodes, nvalue );
	    while ( xss_rules.length > 0 ) {
		render_nodes.push( xss_rules.shift() );
	    }
	}
	
	//  React to an attribute name. 
	else if ( ntype == 'ATTR-NAME' ) {
	    render_nodes.push( 'ATTR-NAME: ' + nvalue );
	    if ( nvalue == 'class' || nvalue == 'id' ) {
		style_attribute = nvalue;
	    } else {
		style_attribute = 'none';
	    }
	}

	//  React to an attribute value.
	else if ( ntype == 'ATTR-VALUE' ) {
	    render_nodes.push( 'ATTR-VALUE: ' + nvalue );
	    
	    /**  If the attribute selects some style rules, put em here.  */
	    var xss_rules     = [];
	    
	    /**  Get id styles.                               */
	    if ( style_attribute == 'id' ) {
		var id_rules  = get_rules ( xss_nodes, "#" + nvalue );
		xss_rules     = id_rules;
	    }

            /**  Get class styles (there may be multiple!)    */
	    else if ( style_attribute == 'class' ) {
		var classes   = nvalue.split(' ');
		while ( classes.length > 0 ) {
		    var class_rules = get_rules( xss_nodes, "." + classes.shift() );
		    while ( class_rules.length ) {
			xss_rules.push( class_rules.shift() );
		    }
		}
		console.log("XSS rules from class=\"" + nvalue + "\"");
		console.log(xss_rules);
	    }

	    /**  And we'll add the style rules.               */
	    while ( xss_rules.length > 0 ) {
		render_nodes.push( xss_rules.shift() );
	    }

	}

	//  React to text
	else if ( ntype == 'TEXT' ) {
	    render_nodes.push( 'TEXT: ' + nvalue );
	}

	//  React to a close tag
	else if ( ntype == 'CLOSE-TAG' ) {
	    render_nodes.push( 'CLOSE-TAG: ' + nvalue );
	}

    } /**  end that for loop */
    
    
    return render_nodes;
    
}