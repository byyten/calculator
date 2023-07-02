const calculator = require('./calculator');

describe('eval simple 1', () => {
    let expr = '2 * 8 + 3'
    console.log(expr)
	test('eval ' + expr.toString(), () => {
        console.log(typeof expr)
		expect(calculator.evaluate(expr)).toBe(eval(expr));
	});
});

describe('eval more complex badly structured', () => {
    let expr = '- 82 * 658 - 254 + - 23 - 68 + 379'
    console.log(expr)
	test('eval ' + expr.toString(), () => {
        console.log(typeof expr)
		expect(calculator.evaluate(expr)).toBe(eval(expr));
	});
});

describe('eval more complex less structured', () => {
    let expr = '-82 * -658 - -254 + -23 - 68 + 379'
    console.log(expr)
	test('eval ' + expr.toString(), () => {
        console.log(typeof expr)
		expect(calculator.evaluate(expr)).toBe(eval(expr));
	});
});


describe('eval highly complex well structured', () => {
    let expr = '-82 % -658 * -254 + -23 / 68 * 379 - 54'
    console.log(expr)
	test('eval ' + expr.toString(), () => {
        console.log(typeof expr)
		expect(calculator.evaluate(expr)).toBe(eval(expr));
	});
});

describe('eval highly complex badly structured', () => {
    let expr = '-82 % -658 * - 254 + - 23 / 68 * 379 - 54'
    console.log(expr)
	test('eval ' + expr.toString(), () => {
        console.log(typeof expr)
		expect(calculator.evaluate(expr)).toBe(eval(expr));
	});
});
