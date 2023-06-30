const calculator = require('./calculator');


describe('eval simple 1', () => {
    let expr = '2 * 8 + 3'
    console.log(expr)
	test('eval ' + expr.toString(), () => {
        console.log(typeof expr)
		expect(calculator.run_evaluation(expr)).toBe(eval(expr));
	});

});




describe('eval', () => {
    let expr = '-82 * 658 - 254 + -23 - 68 + 379'
    console.log(expr)
	test('eval ' + expr.toString(), () => {
        console.log(typeof expr)
		expect(calculator.run_evaluation(expr)).toBe(eval(expr));
	});

});
