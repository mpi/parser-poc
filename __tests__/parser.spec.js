import { parse } from '../src/parser';
import * as _ from 'lodash';

describe('parser', () => {
  it('parses number', () => {

    const ast = parse('42');

    expect(ast).toEqual(number(42));

  });
  it('parses negative number', () => {

    const ast = parse('-42');

    expect(ast).toEqual(number(-42));

  });

  it('parses percentage', () => {

    const ast = parse('3%');

    expect(ast).toEqual(percent(number(3)));

  });

  it('parses multiplicative operator', () => {

    const ast = parse('4 * 3');

    expect(ast).toEqual(mul(4, 3));

  });

  it('parses additive operator', () => {

    const ast = parse('4 + 3');

    expect(ast).toEqual(add(4, 3));

  });

  it('parses parentheses', () => {

    const ast = parse('(4)');

    expect(ast).toEqual(number(4));

  });

  it('treats multiplicative operator as an left-side operator', () => {

    const implicit = parse('4 * 3 * 2');
    const explicit = parse('(4 * 3) * 2');

    expect(implicit).toEqual(explicit);

  });

  it('treats additive operator as an left-side operator', () => {

    const implicit = parse('4 + 3 + 2');
    const explicit = parse('(4 + 3) + 2');

    expect(implicit).toEqual(explicit);

  });

  it('maintains operator precedence rules', () => {

    const implicit = parse('4 + 3 * 2 + 1');
    const explicit = parse('4 + (3 * 2) + 1');

    expect(implicit).toEqual(explicit);

  });

  it('maintains operator precedence rules', () => {

    const implicit = parse('4 + 3 * 2 + 1');
    const explicit = parse('4 + (3 * 2) + 1');

    expect(implicit).toEqual(explicit);

  });


  it('parses complex case', () => {

    const ast = parse('4 + -3 * (2 + 8 / 2 - 6%)');

    expect(ast).toEqual(
      add(4, mul(-3, sub(add(2, div(8, 2)), percent(6))))
    );

  });

});

function number(value) {
  return {
    type: 'number',
    value
  };
}

function percent(value) {
  return {
    type: 'unit',
    unit: '%',
    value: _.isNumber(value) ? number(value) : value,
  };
}

function binaryOp(operator) {
  return (left, right) => ({
    type: 'binary_operator',
    operator,
    left: _.isNumber(left) ? number(left) : left,
    right: _.isNumber(right) ? number(right) : right,
  });
}

const mul = binaryOp('*');
const div = binaryOp('/');
const add = binaryOp('+');
const sub = binaryOp('-');
