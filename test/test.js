var expect = require('chai').expect;

var constellation = require('../constellation');

// var categories = '{"promoter": ["BBa_R0040", "BBa_J23100"], "rbs": ["BBa_B0032", "BBa_B0034"], "gene": ["BBa_E0040", "BBa_E1010"], "terminator": ["BBa_B0010"]}';
var categories = '{"a":["a1","a2"],"b":["b1","b2","b3"],"c":["c1"],"d":["d1"]}';

categories = JSON.parse(categories);

const ATOM = "atom";


describe('#constellation', function() {
    // BASIC OPERATORS
    // it('atom', function() {
    //     // var result = constellation('c', categories, 10);
    //     // expect(JSON.stringify(result.designs[0])).to.equal(JSON.stringify(['c1']));
    // });
    categories = {"a": ["a"], "b": ["b"]};

    it('or', function() {
        var result = constellation('a or b', categories, 10);
        expect(result.designs.length).to.equal(2);
    });

    // it('then', function() {
    //     var result = constellation('a . b', categories, 10);
    //     expect(result.designs.length).to.equal(categories['a'].length * categories['b'].length);
    //     // for (var i = 0; i < result.designs.length; i++) {
    //     //     console.log(result.designs[i]);
    //     // }
    //     // expect(result.designs.includes('a2 b3')).to.equal(true);
    //     // expect(JSON.stringify(result.designs)).to.equal(JSON.stringify(['c1']));
    // });

    // it('zero-or-more', function() {
    //     var result = constellation('zero-or-more a', categories, 10);
    //     var paths = result.paths;
    //     expect(paths.length).to.equal(2);
    // });


    // it('one-or-more', function() {
    //     var result = constellation('one-or-more a', categories, 10);
    //     var paths = result.paths;
        
    //     expect(paths.length).to.equal(1);
    //     expect(paths[0].length).to.equal(1);
    //     expect(paths[0][0].dataType === ATOM)
    // });


    // // CHAINED EXPRESSIONS
    // it('multiple then', function() {
    //     var result = constellation('a . b . c', categories, 10);
    //     expect(result.designs.length).to.equal(categories['a'].length * categories['b'].length * categories['c'].length);
    //     expect(result.paths.length).to.equal(1);
    // });

    // // BASIC ERRORS
    // it ('basic errors', function() {
    //     var result = constellation('d', categories, 10);
    //     expect(JSON.stringify(result.designs)).to.equal(JSON.stringify([]));
    // });
});