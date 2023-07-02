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



module.exports = {
  evaluate 
}