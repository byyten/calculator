    // const run_evaluation = (expr) => {
    //   console.log(typeof expr)
    //     let re = /\s\+\s|\s\-\s/g
    //     let groups = expr.split(/\s\+\s|\s\-\s/g)
    //     let group_ops = expr.match(re)
        
    //     console.log([groups.length, group_ops.length])
        
    //     let total = group_evaluate(groups[0].split(' '))
    //     console.log(total)
        
    //     groups.slice(1).forEach((grp, idx) => {
    //       // if (idx) {
    //         val = group_evaluate(grp.split(' '))
    //         console.log(val)
    //         if (group_ops[idx] == '+') {
    //           total += val
    //         } else {
    //           total -= val
    //         }
    //       // }
    //     })
    //     return total
    // }


    const run_evaluation = (expr) => {

      re = /\s\+\s|\s\-\s/g
      groups = expr.split(re)
      group_ops = expr.match(re) 
      
      console.log([groups.length, group_ops.length])

      total = group_evaluate(groups[0].split(' '))
      console.log(total)

      groups.slice(1).forEach((grp, idx) => {
          val = group_evaluate(grp.split(' '))
          console.log([group_ops[idx], val])
          if (group_ops[idx] === ' + ') {
          total += val
          } else if (group_ops[idx] === ' - ' ) {
          total -= val
          }
      })
      return total;
    }

    const group_evaluate = (grp) => {
        // grp --> [ 65.4, '*', 34.5, '*', 23.1 ]
        grp_total = grp[0]
        _g = grp.slice(1)
        for (n = 0; n < _g.length; n+=2) {
            if (_g[n] == '*') {
                grp_total *= _g[n +1]
            } else if (_g[0] == '/') {
                grp_total /= _g[1]
            } else if (_g[0] == '%') {
                grp_total = grp_total % _g[1]
            } 
        }
        return Number(grp_total)
    }


module.exports = {
  run_evaluation 
}