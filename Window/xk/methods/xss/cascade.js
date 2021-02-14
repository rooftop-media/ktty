/*  kw/xk/methods/xss/cascade.js       
    
    Input:  a list of xss nodes with duplicates.

    Output: a list of xss nodes with the dupes cascaded away :)
*/

module.exports = function cascade_xss( xss_nodes ) {
    
    /**  What we'll return:                        */
    var cascaded  = [];

    //  Sub function to edit previously seen attr's.  (Returns false if selector/rule pair not found!)
    function add_or_update( selector, rule, value ) {
	
	/**  Store positions if we find selector/rule.  */
	var selector_pos    = -1;
	var rule_pos        = -1;

	/**  Loop through saved attr's:                 */
	for ( var i = 0; i < cascaded.length; i++ ) {

	    /**  Getting the node type...               */
	    var n_type  = cascaded[i].split( ': ' )[0];
	    /**  Getting the node value...              */
	    var n_value = cascaded[i].split( ': ' )[1];

	    if ( n_type == "SELECTOR" && n_value == selector ) {
		selector_pos = i;
	    }
		
	    if ( selector_pos != -1 && n_type == "RULE-NAME" && n_value == rule ) {
		rule_pos = true;
	    }
	    
	    if ( rule_pos != -1 && n_type == "RULE-VALUE" ) {
		cascaded[i] = "RULE-VALUE: " + n_value;
		return;
	    }

	} /** End of loop */

	/**  If the selector wasn't found, add it.  */
	if ( selector_pos == -1 ) {
	    cascaded.push( "SELECTOR: " + selector );
	    selector_pos = cascaded.length - 1;
	}

	/**  Since it didn't return, add rule name and value. */
	cascaded.splice( selector_pos + 1, 0, "RULE-NAME: " + rule );
	rule_pos = selector_pos + 1;
	cascaded.splice( rule_pos + 1, 0, "RULE-VALUE: " + value );
	
	return;

    }/** End of subfunction */



    //  Loop through uncascaded nodes  &  apply subfunction. 

    /**  Store the last seen selector:             */
    var _selector  = "";

    /**  Store the last seen rule name:             */
    var _rule_name = "";
    
    /**  Loop through xss nodes     */
    for ( var i = 0; i < xss_nodes.length; i++ ) {
	
	/**  The current node, ex: "SELECTOR: a"   */
	var node    = xss_nodes[i];

	/**  Getting the node type...              */
        var n_type  = node.split( ': ' )[0];

        /**  Getting the node value...             */
        var n_value = node.split( ': ' )[1];

	
	if ( n_type == "SELECTOR" ) {
	    _selector = n_value;
	}

	if ( n_type == "RULE-NAME" ) {
	    _rule_name = n_value;
	}

	if ( n_type == "RULE-VALUE" ) {
	    add_or_update( _selector, _rule_name, n_value );
	}

    } /** End of loop thru uncascaded. */


    //  "cascaded" is still xss nodes, let's make it a string real quick. 
    
    var cascaded_string = "";

    for ( var i = 0; i < cascaded.length; i++ ) {
	
	/**  Getting the node type...              */
        var n_type  = cascaded[i].split( ': ' )[0];

        /**  Getting the node value...             */
        var n_value = cascaded[i].split( ': ' )[1];

	/**  Stringify selectors!  */
	if ( n_type == "SELECTOR" ) {
	    if ( i != 0 ) {
		cascaded_string += "\n}\n";
	    }
	    cascaded_string += n_value + " {";
	}

	/**  Stringify rule names!  */
	else if ( n_type == "RULE-NAME" ) {
	    cascaded_string += "\n" + n_value + ": ";
	}

	/**  Stringify rule values!  */
	else if ( n_type == "RULE-VALUE" ) {
	    cascaded_string += n_value + ";"
	}

    }  /** end string-building for-loop */
    
    cascaded_string += "\n}\n";
    
    
    return cascaded_string;
}