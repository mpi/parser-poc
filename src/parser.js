import * as nearley from 'nearley';
import * as grammar from '../gen/grammar';

export function parse(input) {

  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(input);
  return parser.results[0];

}