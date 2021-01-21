/*  BoxChar( style, weight, directions )

    Get a box character.

    style:      "solid" | "double" | "dash-3" | "dash-4"
    weight:     "heavy" | "light"
    directions: {  
        n: 1 | 0, e: 1 | 0, w: 1 | 0, s: 1 | 0    
    } 
                                                            */

var box_chars = {

    /**  "─"  light horizontal                 */
    0x2500: {
	n: 0, e: 1, w: 1, s: 0,
	weight: "light", style: "solid"
    },

    /**  "━"  heavy horizontal                 */
    0x2501: {
	n: 0, e: 1, w: 1, s: 0,
	weight: "heavy", style: "solid"
    },

    /**  "│"  light vertical                   */
    0x2502: {
	n: 1, e: 0, w: 0, s: 1,
	weight: "light", style: "solid"
    },

    /**  "┃"  heavy vertical                   */
    0x2503: {
	n: 1, e: 0, w: 0, s: 1,
	weight: "heavy", style: "solid"
    },

    /**  "┄"  light triple dash horizontal     */
    0x2504: {
	n: 0, e: 1, w: 1, s: 0,
	weight: "light", style: "triple-dash"
    },

    /**  "┅"  heavy triple dash horizontal     */
    0x2505: {
	n: 0, e: 1, w: 1, s:0,
	weight: "heavy", style: "triple-dash"
    },

    /**  "┆"  light triple dash vertical       */
    0x2506: {
	n: 1, e: 0, w: 0, s:1,
	weight: "light", style: "triple-dash"
    },

    /**  "┇"  heavy triple dash vertical       */
    0x2507: {
	n: 1, e: 0, w: 0, s:1,
	weight: "light", style: "triple-dash"
    },

    /**  "┈"  light quadrupal dash horizontal  */
    0x2508: {
	n: 0, e: 1, w: 1, s:0,
	weight: "light", style: "quadrupal-dash"
    },

    /**  "┉"  heavy quadrupal dash horizontal  */
    0x2509: {
	n: 0, e: 1, w: 1, s:0,
	weight: "heavy", style: "quadrupal-dash"
    },

    /**  "┊"  light quadrupal dash vertical  */
    0x250A: {
	n: 1, e: 0, w: 0, s:1,
	weight: "light", style: "quadrupal-dash"
    },

    /**  "┋"  heavy quadrupal dash vertical  */
    0x250B: {
	n: 1, e: 0, w: 0, s:1,
	weight: "heavy", style: "quadrupal-dash"
    },

    /**  "┌"  light down and right */
    0x250C: {
	n: 0, e: 1, w: 0, s:1,
	weight: "light", style: "solid"
    },

    //  Skip 250D "┍" and 250E "┎"

    /**  "┏"  heavy down and right */
    0x250F: {
	n: 0, e: 1, w: 0, s:1,
	weight: "heavy", style: "solid"
    },

    /**  "┐"  light down and left */
    0x2510: {
	n: 0, e: 0, w: 1, s:1,
	weight: "light", style: "solid"
    },

    //  Skip 2511 "┑" and 2512 "┒"

    /**  "┓"  heavy down and left */
    0x2513: {
	n: 0, e: 0, w: 1, s: 1,
	weight: "heavy", style: "solid"
    },
    
    /**  "└"  light up and right */
    0x2514: {
	n: 1, e: 1, w: 0, s: 0,
	weight: "light", style: "solid"
    },

    //  Skip 2515 "┕" and 2516 "┖"

    /**  "┗"  heavy up and right */
    0x2517: {
	n: 1, e: 1, w: 0, s: 0,
	weight: "heavy", style: "solid"
    },

    /**  "┘"  light up and left */
    0x2518: {
	n: 1, e: 0, w: 1, s: 0,
	weight: "light", style: "solid"
    },

    //  Skip 2519 "┙" and 251A "┚"

    /**  "┛"  heavy up and left */
    0x251B: {
	n: 1, e: 0, w: 1, s: 0,
	weight: "heavy", style: "solid"
    }

    //  Next up would be 251C: "├"
    //   But we'll save that for later!

}


//   
module.exports = function BoxChar( style, weight, directions ) {
    
    /**  Get an array of possible codepoints:     */
    var code_points    = Object.keys( box_chars );

    var the_character  = "";

    /**  Looping through the dictionary.  */
    for ( var i = 0; i < code_points.length; i++ ) {
	
	var code_point = code_points[i];

	var char_info  = box_chars[ code_point ];
	
	var is_match   = char_info.style == style;
	is_match       = is_match && char_info.weight == weight;
	is_match       = is_match && char_info.n == directions.n;
	is_match       = is_match && char_info.e == directions.e;
	is_match       = is_match && char_info.w == directions.w;
	is_match       = is_match && char_info.s == directions.s;

	if ( is_match ) {
	    return String.fromCodePoint( code_point );
	}
	     
    }

    return 0;
}

