/*  xk/methods/render/render.js

    Input:   a list of render nodes.
    Output:  a string 
    
                                                             */
  


//  Set up KTTY...

/**  Importing KTTY...    */
var KTTY = require( __dirname + "/../../../../ktty/ktty.js" );

/**  Make a new ktty...   */
var ktty = new KTTY();


//  traverse_element  -  
function traverse_element( render_nodes, start_pos ) {

    /**  Store info about the parent tag.                     */ 
    var parent  = {
	type:     "tag",
	children: [],
    };

    /**  The last seen rule.                                  */
    var rule        = "";
    

    /**  Loop through render node list.                       */
    for ( var i = start_pos; i < render_nodes.length; i++ ) {

	/**  the node type, eg OPEN-TAG, RULE-NAME, etc             */
	var n_type       = render_nodes[i].split( ': ' )[0];

	/**  the node value.                                        */
	var n_value      = render_nodes[i].split( ': ' )[1];

  	//  For an open tag...
	if      ( n_type == 'OPEN-TAG' ) {

	    /**  For the first open tag, that's the parent's tag name.     */
	    if ( i == 0 ) {
		parent.name     = n_value;
	    }
	    
	    /**  Any other open tags indicate the start of a new element!  */
	    else {
		var result = traverse_element( render_nodes, i );   //  builds 1 element, recursively!

		var tag_element = result.element;    //  Add the element we built.
		parent.children.push( tag_element );

		i = result.end_position;             //  Updates our position to skip the built nodes. 
	    }

	}

	//  For a rule name...   ( We can assume it belongs to the parent tag. )
	else if ( n_type == 'RULE-NAME' ) {
	    rule = n_value;
	}

	//  For a rule value...  ( Again, part of the parent tag's rules.  Children's rules hanled recusively! )
	else if ( ntype == 'RULE-VALUE' ) {
	    parent[rule] = n_value;
	}

	//  For text...  
	else if ( ntype == 'TEXT'       ) {
	    var text_element = {
		type: "text",
		text: n_value
	    }
	    parent.children.push( text_element );
	}

	//  For a close tag...
	else if ( ntype == 'CLOSE-TAG'  ) {
	    var return_obj = {
		element:  0,
		end_position: ( i + 1 )
	    }
	}

	
	
    } /**  end that for loop */
}


// What we'll export

module.exports = function render( render_nodes ) {

    /**  Build the element list -- with recursion!!  0 indicates the start pos. */
    var element_list = build_element_list( render_nodes, 0 );

    return element_list;
    
}