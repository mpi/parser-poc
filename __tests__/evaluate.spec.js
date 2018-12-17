import { parse } from '../src/parser';
import { evaluate } from '../src/evaluator';

describe('evaluate', () => {
  it('evaluates number', () => {

    const ast = parse('42');

    expect(evaluate(ast)).toEqual({ value: 42, unit: 'nominal' });

  });
  it('evaluates percentage', () => {

    const ast = parse('3%');

    expect(evaluate(ast)).toEqual({ value: 3, unit: '%' });

  });

  it('evaluates multiplication', () => {

    const ast = parse('4 * 3');

    expect(evaluate(ast)).toEqual({ value: 12, unit: 'nominal' });

  });

  it('evaluates addition', () => {

    const ast = parse('4 + 3');

    expect(evaluate(ast)).toEqual({ value: 7, unit: 'nominal' });

  });

  it('evaluates nominal * %', () => {

    const ast = parse('100 * 3%');

    expect(evaluate(ast)).toEqual({ value: 3, unit: 'nominal' });

  });

  it('evaluates nominal + %', () => {

    const ast = parse('100 + 3%');

    expect(evaluate(ast)).toEqual({ value: 103, unit: 'nominal' });

  });

  it('evaluates % + %', () => {

    const ast = parse('5% + 3%');

    expect(evaluate(ast)).toEqual({ value: 8, unit: '%' });

  });

});
