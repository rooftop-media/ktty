/*  KttyLab  --  testing tools   */


module.exports = class KttyLab {

    constructor() {
	this.tests = [];
    }

    add_script( test_script ) {
	this.tests.push( test_script );
    }

    
    
}