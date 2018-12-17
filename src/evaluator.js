
const visitors = {
  number: ({ value }) => ({ value, unit: 'nominal' }),
  unit: ({ unit, value }) => ({ value: evaluate(value).value, unit }),
  binary_operator: (ast) => visitors[ast.operator](ast),
  '+': ({ left, right }) => additive(left, right, (a, b) => a + b),
  '-': ({ left, right }) => additive(left, right, (a, b) => a - b),
  '*': ({ left, right }) => multiplicative(left, right, (a, b) => a * b),
  '/': ({ left, right }) => multiplicative(left, right, (a, b) => a / b)
};

const additive = (left, right, op) => {

  const l = evaluate(left), r = evaluate(right);

  if(l.unit === r.unit) {
    return { value: op(l.value, r.value), unit: l.unit };
  }
  if(l.unit === 'nominal' && r.unit === '%') {
    return { value: op(l.value, l.value * r.value / 100), unit: 'nominal' };
  }

  throw 'What should happen for 3% + 100 ???';
};

const multiplicative = (left, right, op) => {

  const l = evaluate(left), r = evaluate(right);

  if(l.unit === 'nominal' && r.unit === 'nominal') {
    return { value: op(l.value, r.value), unit: 'nominal' };
  }

  if(l.unit === 'nominal' && r.unit === '%') {
    return { value: op(l.value, r.value) / 100, unit: 'nominal' };
  }

  if(l.unit === '%' && r.unit === 'nominal') {
    return { value: op(l.value, r.value) / 100, unit: 'nominal' };
  }

  throw 'What should happen for 3% * 5% ???';
};


export function evaluate(ast) {

  const visitor = visitors[ast.type];
  return visitor(ast);

}