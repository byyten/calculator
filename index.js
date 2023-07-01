        let ui
        let operations = {
            // _ascii: {
            //     _modulo: { asc: 37, sym: '+' },
            //     _muliply: { asc: 42, sym: '*' },
            //     _plus: { asc: 43, sym: '+' },
            //     _minus: { asc: 45, sym: '-' },
            //     _divide: { asc: 47, sym: '/' },
            //     _equals: { asc: 61, sym: '=' },
            //     _point: { asc: 46, sym: '.' },
            //     _0: 48,
            //     _1: 49,
            //     _2: 50,
            //     _3: 51,
            //     _4: 52,
            //     _5: 53,
            //     _6: 54,
            //     _7: 55,
            //     _8: 56,
            //     _9: 57,
            //     // _open_bracket: 40,
            //     // _close_bracket: 41,
            // },
            _symbols: {
                _plus: ' + ',
                _minus: ' - ',
                _multiply: ' * ',
                _divide: ' / ',
                _equals: ' = ',
                _point: '.',
                _backkey: '<-',
                _plusminus: '-',
            },
            _add: (a, b) => { return a + b },
            _subtract: (a, b) => { return a - b },
            _multiply: (a, b) => { return a * b },
            _divide: (a, b) => {
                if (b == 0) {
                    alert('invalid input: division by 0 is an illegal operation')
                    return
                }
                return Number((a / b).toFixed(3))
            },
            _modulo: (a, b) => { return a % b }
        }
        let getNumber = (evt) => {
            if ('key' in evt) {
                ui._keypress = evt.key
            } else   { // ('target' in evt && 'classList' in evt.target)
                ui._keypress = evt.target.classList[1].split('_')[1];
                if (ui._keypress == 'point') {
                    ui._keypress = '.';
                } else if (ui._keypress == 'plusminus') {
                    ui._keypress = '-'
                }
            }  
            ui._expression += ui._keypress;
            ui._variable += ui._keypress;
            console.log('press: ' + ui._keypress + '   expression: ' + ui._expression);
            ui._display_expression.textContent = ui._expression
            return (ui._keypress)
        }
        let clear_result = () => { ui._result.textContent = '' }
        let getOper = (evt) => {
            if ('key' in evt) {
                if (evt.keyCode == 13) {
                    ui._keypress = ' = '
                } else {
                    ui._keypress = ' ' + evt.key + ' '
                }

            } else {
                ui._keypress = operations._symbols[evt.target.classList[1]]
            } 
            if (ui._keypress !== '<-' && ui._keypress !== ' = ') {
                ui._expression += ui._keypress
                console.log('press: ' + ui._keypress)
            }
            console.log('press: ' + ui._keypress + '   expression: ' + ui._expression);
            ui._display_expression.textContent = ui._expression
            if (ui._keypress === operations._symbols._equals) {
                let res = run_evaluation(ui._expression)
                let res_chk = eval(res)

                if (isNaN(res)) {
                    ui._result.textContent = 'invalid expression'
                    setTimeout(clear_result, 2000)
                } else {
                    ui._display_expression.textContent += (' = ')
                    ui._result.textContent = + res.toFixed(1)
                    if (res !== res_chk) {
                        console.log(['Err: ', res, res_chk, res - res_chk])
                        ui._result.style.backgroundColor = '#dd0000'
                        ui._result.style.color = '#ffffff'
                    } else {
                        ui._result.style.backgroundColor = 'rgb(212, 230, 224)'
                        ui._result.style.color = '#000000'
                    }
                }
            }
            ui._variable = ''
            return ui._keypress
        }
        const scrub = () => {
            ui._display_expression.textContent = '';
            ui._result.textContent = ''
            ui._expression = ''
        }
        const backkey = () => {
            let n = ui._expression.length
            if (ui._expression.at(-1) == ' ') {
                ui._expression = ui._expression.substring(0, n - 3)
            } else {
                ui._expression = ui._expression.substring(0, n - 1)
            }
            ui._display_expression.textContent = ui._expression 
        }



        const run_evaluation = (expr) => {

            let re = /\s\+\s|\s-\s/g;
            let groups = expr.split(re);
            let group_ops = expr.match(re);
            if (group_ops == null) { group_ops = [] }

            console.log([groups.length, group_ops.length])

            let total = group_evaluate(groups[0].split(' '))
            console.log(total)

            groups.slice(1).forEach((grp, idx) => {
                let val = group_evaluate(grp.split(' '))
                console.log([group_ops[idx], val])
                if (group_ops[idx] === ' + ') {
                    total += val
                } else if (group_ops[idx] === ' - ') {
                    total -= val
                }
            })
            return total;
        }

        const group_evaluate = (grp) => {
            // grp --> [ 65.4, '*', 34.5, '*', 23.1 ]
            let grp_total = grp[0]
            let _g = grp.slice(1)
            for (let n = 0; n < _g.length; n += 2) {
                if (_g[n] == '*') {
                    grp_total *= _g[n + 1]
                } else if (_g[0] == '/') {
                    grp_total /= _g[1]
                } else if (_g[0] == '%') {
                    grp_total = grp_total % _g[1]
                }
            }
            return Number(grp_total)
        }



        // let disable = (element) => {
        //     element.disabled = !element.disabled
        // }
        // let fake_evt_click = (_k) => {
        //     return { target: _k }
        // }

        let uiface = () => {
            let calc = document.querySelector('.calculator');
            ui = {
                calc: calc,
                _display: calc.querySelector('div._display'),
                _display_expression: calc.querySelector('div._display_expression'),
                _result: calc.querySelector('div._result'),
                _9: calc.querySelector('button._9'),
                _8: calc.querySelector('button._8'),
                _7: calc.querySelector('button._7'),
                _6: calc.querySelector('button._6'),
                _5: calc.querySelector('button._5'),
                _4: calc.querySelector('button._4'),
                _3: calc.querySelector('button._3'),
                _2: calc.querySelector('button._2'),
                _1: calc.querySelector('button._1'),
                _0: calc.querySelector('button._0'),
                _plus: calc.querySelector('button._plus'),
                _minus: calc.querySelector('button._minus'),
                _multiply: calc.querySelector('button._multiply'),
                _divide: calc.querySelector('button._divide'),
                _equals: calc.querySelector('button._equals'),
                _point: calc.querySelector('button._point'),
                _plusminus: calc.querySelector('button._plusminus'),

                _backkey: calc.querySelector('button._backkey'),
                _scrub: calc.querySelector('button._clear'),
                _keys: calc.querySelectorAll('.key'),
                _key_ops: calc.querySelectorAll('.key_op'),
                _keypress: '',
                _expression: '',
            }
            ui._keys.forEach(_k => {
                _k.addEventListener('click', evt => getNumber(evt))
            })
            ui._key_ops.forEach(_k => {
                _k.addEventListener('click', evt => getOper(evt))
            })
            ui._scrub.addEventListener('click', scrub)
            ui._backkey.addEventListener('click', backkey)
            document.onkeypress = function (evt) {
                evt = evt || window.event;
                if (evt.key) {
                    console.log(evt.key + " " + evt.keyCode)
                    if (evt.keyCode >= 48 && evt.keyCode <= 57) {
                        // numbers 0-9
                        console.log('numbers ' + evt.key)
                        getNumber(evt)
                    } else if ([94, 37, 42, 43, 45, 47].includes(evt.keyCode)) {
                        // includes [^, %, *, +, -, /] (expon, modulo, mult, add, sub, div)
                        console.log('an operation ' + evt.key)
                        getOper(evt)
                    } else if (evt.keyCode == 61 || evt.keyCode == 13) {  // equals, run eval
                        console.log('equals ' + evt.key)
                        getOper(evt)
                    } 
                }


            };
            document.onkeydown = function (evt) {
                evt = evt || window.event;
                if (evt.key) { 
                    console.log(evt.key + " " + evt.keyCode)
                    if (evt.keyCode == 8) { // 
                        console.log('backspace ')
                        ui._backkey.click()
                    } else if (evt.keyCode == 46 || evt.keyCode == 27) { // 
                        console.log('delete ')
                        ui._scrub.click()
                    }
                }

                // Delete 46 
                // Backspace 8 
                // Escape 27 
                // Enter 13 
            } 
            return ui
        }

 
        // keys_ops = ui.calc.querySelectorAll('.key_op')
        // keys = ui.calc.querySelectorAll('.key')

