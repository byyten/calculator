/**
 * Project: Calculator / Foundations course / The Odin Project
 * byyten / 2023 
 */
    let ui
    // let operations = {
    const op_symbols = {
        _plus: '+',
        _minus: '-',
        _multiply: '*',
        _divide: '/',
        _modulo: '%',
        _equals: '=',
        _point: '.',
        _plusminus: '-',
    }
    const input_number = (evt) => {
        ui._keypress = evt.target.classList[1].split('_')[1];
        if (ui._keypress == 'plusminus') {
            ui._keypress = '-'
        } else if (ui._keypress == 'point') {
            ui._keypress = '.'
        } 
        ui._expression += ui._keypress
        ui._display_expression.textContent = ui._expression
        console.log('press: ' + ui._keypress + '   expression: ' + ui._expression);
        disable_key_fns()
        disable_key_plusminus()
    }
    const input_operation = (evt) => {
        ui._keypress = op_symbols[evt.target.classList[1]] || ''  
        switch (ui._keypress) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                
                ui._expression += ' ' + ui._keypress + ' '
                ui._display_expression.textContent = ui._expression
                console.log('press: ' + ui._keypress + '   expression: ' + ui._expression);
                break;
        }
        if (ui._keypress == '=') {
            let res = evaluate(ui._expression)
            let res_chk = eval(res) // and get a reference checksum

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
                    console.log(['checksums OK: ', res, res_chk, res - res_chk])
                    ui._result.style.backgroundColor = 'rgb(212, 230, 224)'
                    ui._result.style.color = '#000000'
                }
                ui._key_fns.forEach(fn => disable_key(fn, true) )
                ui._keys.forEach(ky => disable_key(ky, true) )
                ui._keypress = ''
                return   
            }
        }
        disable_key_fns()
        disable_key_plusminus()
    }
    const clear_expression = () => {
        ui._display_expression.textContent = '';
        ui._result.textContent = ''
        ui._expression = ''
        ui._keypress = ''
        console.log('clear_expression()')
        disable_key_plusminus()
        disable_key_fns()
    }
    const backspace = () => {
        let n = ui._expression.length
        if (ui._expression.at(-1) == ' ') {
            ui._expression = ui._expression.substring(0, n - 3)
        } else {
            ui._expression = ui._expression.substring(0, n - 1)
        }
        ui._display_expression.textContent = ui._expression 
    }
    const clear_result = () => { // only used when invalid input detected 
        ui._result.textContent = '' 
    }
    // evaluate expressions
    const evaluate = (expr) => {
        // expr = expr.replaceAll(' + - ',' + -').replaceAll(' - - ',' - -')
        let re = /\s\+\s|\s-\s/g;
        let groups = expr.trim().split(re);
        let group_ops = expr.match(re);
        if (group_ops == null) { group_ops = [] }

        console.log([groups.length, group_ops.length])

        let total = evaluate_group(groups[0].split(' '))
        console.log(total)

        groups.slice(1).forEach((grp, idx) => {
            let val = evaluate_group(grp.split(' '))
            console.log([group_ops[idx], val])
            if (group_ops[idx] === ' + ') {
                total += val
            } else if (group_ops[idx] === ' - ') {
                total -= val
            }
        })
        return total;
    }
    // supports/ called by evaluate 
    const evaluate_group = (grp) => {
        // grp --> [ 65.4, '*', 34.5, '*', 23.1 ]  // grp[0] == 65.4
        let grp_total = Number(grp[0])
        let _g = grp.slice(1)
        for (let n = 0; n < _g.length; n += 2) {
            if (_g[n] == '*') {
                grp_total *= Number(_g[n + 1])
            } else if (_g[0] == '/') {
                grp_total /= Number(_g[1])
            } else if (_g[0] == '%') {
                grp_total = grp_total % Number(_g[1])
            }
        }
        return grp_total
    }
    // key enable/disable 
    const disable_key_fns = () => {
        if (ui._expression == '') { // blank expression
            ui._key_fns.forEach(fn => disable_key(fn, true))
            ui._keys.forEach(fn => disable_key(fn, false))
        } else if (ui._math_fns.includes(ui._keypress.trim()) ) {
            // last input is an operator so disable_key key_fns
            ui._key_fns.forEach(fn => disable_key(fn, true))
            disable_key(ui._plusminus, true) // disable_key_plusminus()
        } else  {
            // last input is *NOT* an operator --> a input_number so enable key fns 
            ui._key_fns.forEach(fn => disable_key(fn, false))
        }
    }
    // supports/called by key enable/disable 
    const disable_key = (elem, true_false) => {
        elem.disabled = true_false
    }
    // key enable/disable 
    const disable_key_plusminus = () => {
        if (  ui._expression.at(-1) !== ' ' ) { // a input_number preceeds so +/- should be disabled
            disable_key(ui._plusminus, true)
            } else if (ui._expression == '') {
            disable_key(ui._plusminus, false)
            } else {
            disable_key(ui._plusminus, false)
            }  
            
    }
    // gather user interface elements to facilitate interface management/manipulation
    const user_interface = () => {
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
            _modulo: calc.querySelector('button._modulo'),
            _equals: calc.querySelector('button._equals'),
            _point: calc.querySelector('button._point'),
            _plusminus: calc.querySelector('button._plusminus'),

            _backspace: calc.querySelector('button._backspace'),
            _clear: calc.querySelector('button._clear'),

            _keys: calc.querySelectorAll('.key'),
            _key_fns: calc.querySelectorAll('.key_fn'),
            _key_ops: calc.querySelectorAll('.key_op'),
            _keypress: '',
            _expression: '',
            _math_fns: ['+', '-', '*', '/', '%'],
        }
        ui._keys.forEach(_k => {
            _k.addEventListener('click', evt => input_number(evt))
        })
        ui._key_ops.forEach(_k => {
            _k.addEventListener('click', evt => input_operation(evt))
        })
        ui._key_fns.forEach(_k => {
            _k.addEventListener('click', evt => input_operation(evt))
        })
        ui._clear.addEventListener('click', clear_expression)
        ui._backspace.addEventListener('click', backspace)

        document.onkeydown = function (evt) {
            evt = evt || window.event;
            if (evt.key == '/') evt.preventDefault()
            if (evt.key) { 
                console.log('keydown ' + evt.key )

                switch (evt.key) {
                    case 'Delete':
                    case 'Escape':
                        ui._clear.click()
                        // clear_result()                            
                        break;
                    case 'Backspace':
                        ui._backspace.click()
                        // backspace()
                        break;
                    case 'Enter':
                        ui._equals.click()
                        break;
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        ui['_'+ evt.key].click()
                        break;
                    case '.':
                        ui._point.click()
                        break;
                    case '+':
                        ui._plus.click()
                        break;
                    case '-':
                        // distinguish negate from subtract 
                        if ( ui._math_fns.includes(ui._expression.at(-2)) || ui._expression == '') { // if last was input_operation or no expression yet
                            // permit negation
                            ui._keypress = '-';
                            ui._expression += ui._keypress
                            ui._display_expression.textContent = ui._expression
                            disable_key_fns()
                            disable_key_plusminus()
                        } else {
                            ui._minus.click()                            
                        }
                        break;
                    case '*':
                        ui._multiply.click()
                        break;
                    case '/':
                        ui._divide.click()
                        break;
                    case '%':
                        ui._modulo.click()
                        break;
                    case '=':
                        ui._equals.click()
                        break;
                    }
            }
        } 
        disable_key_fns()
        return ui
    }

