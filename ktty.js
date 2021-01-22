/*  kTTY  -      */

  //      _                ___       _.--.
  //      \`.|\..----...-'`   `-._.-'_.-'`               This file bundles all of KTTY's features. 
  //      /  ' `         ,       __.--'	   
  //      )/' _/     \   `-_,   /
  //      `-'" `"\_  ,_.-;_.-\_ ',                       Art pasted from ascii-art.de/ascii/c/cat.txt 
  //          _.-'_./   {_.'   ; /   fsc/as
  //        {_.-``-'         {_/


/**  Import the Ribbon class.     .  */
var Ribbon                  = require( __dirname + "/Ribbon/index.js" );

/**  Import the xKitchen class.      */
// var XK                      = require( __dirname + "/xk/xkitchen.js" );

                                        //     |\      _,,,---,,_
                                        //     /,`.-'`'    -.  ;-;;,_
//  The KTTY class.                     //    |,4-  ) )-,_..;\ (  `'-'
module.exports = class KTTY {           //   L'---''(_/--'  `-'\_)  fL
    
    //  constructor      --  Starting a KTTY session...
    
    constructor() {
	
    }

    //  Getting a ribbon:

    ribbon( config ) {
	return new Ribbon( config );
    }

    //  Getting an XK:

    xk() {
	return new XK();
    }

}


/*

    )   _. mmeeoowwrr!
   (___)''
   / ,_,/
  /'"\ )\

itz                       */