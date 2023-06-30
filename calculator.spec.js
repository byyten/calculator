const calculator = require('./calculator');

describe('eval', () => {
    exp = '-82 * 658 - -254 + 23 - 68 + 379'
	test('eval ' + exp.toString(), (exp) => {
		expect(calculator.run_evaluation(exp)).toBe(eval(exp));
	});

});
