// 中缀转后缀
// a + b - a * ( ( c + d ) / e - f ) + g
let sign = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2
}
let exp = 'a + b - a * ( ( c + d ) / e - f ) + g'.replace(/ /g, '');

function transform(exp, hook) {
  let stack = [];
  let split = exp.split('');
  while (split.length) {
    let key = split.shift();
    if (sign[key]) {
      if (stack.length) {
        while (sign[key] <= sign[stack[0]]) {
          hook(stack.shift())
        }
        stack.unshift(key);
      } else {
        stack.unshift(key);
      }
    } else if (key === '(') {
      stack.unshift(key);
    } else if (key === ')') {
      let index = stack.findIndex(s=>s === '(');
      let i = 0;
      while (i <= index) {
        let s = stack.shift();
        if (i !== index) hook(s);
        i++
      }
    } else {
      hook(key);
    }
  }
  stack.forEach(hook);
}

let res = [];
transform(exp, (s) => {
  res.push(s);
});
console.log(res.join(' '));
