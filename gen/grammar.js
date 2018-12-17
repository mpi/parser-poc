// Generated automatically by nearley, version 2.15.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const unwrap = ([arr]) => arr;
  const ignore = () => { return null };

  const number = ([sign, chars]) => ({ type: 'number', value: Number((sign ? sign[0] : '') + chars.join('')) });
  const unit = ([value, unit]) => ({ type: 'unit', value, unit });

  const binaryOperator = ([left,,operator,,right]) => ({ type: 'binary_operator', operator, left, right});
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "Expression", "symbols": ["LoExpression"], "postprocess": unwrap},
    {"name": "LoExpression", "symbols": ["LoExpression", "_", "LoOperator", "_", "HiExpression"], "postprocess": binaryOperator},
    {"name": "LoExpression", "symbols": ["HiExpression"], "postprocess": unwrap},
    {"name": "HiExpression", "symbols": ["HiExpression", "_", "HiOperator", "_", "PaExpression"], "postprocess": binaryOperator},
    {"name": "HiExpression", "symbols": ["PaExpression"], "postprocess": unwrap},
    {"name": "PaExpression", "symbols": [{"literal":"("}, "_", "LoExpression", "_", {"literal":")"}], "postprocess": ([,,expr,,]) => expr},
    {"name": "PaExpression", "symbols": ["UnExpression"], "postprocess": unwrap},
    {"name": "UnExpression", "symbols": ["Number", "Unit"], "postprocess": unit},
    {"name": "UnExpression", "symbols": ["Number"], "postprocess": unwrap},
    {"name": "Unit", "symbols": [{"literal":"%"}], "postprocess": unwrap},
    {"name": "HiOperator", "symbols": [{"literal":"*"}], "postprocess": unwrap},
    {"name": "HiOperator", "symbols": [{"literal":"/"}], "postprocess": unwrap},
    {"name": "LoOperator", "symbols": [{"literal":"+"}], "postprocess": unwrap},
    {"name": "LoOperator", "symbols": [{"literal":"-"}], "postprocess": unwrap},
    {"name": "Number$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "Number$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Number$ebnf$2", "symbols": [/[\d]/]},
    {"name": "Number$ebnf$2", "symbols": ["Number$ebnf$2", /[\d]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Number", "symbols": ["Number$ebnf$1", "Number$ebnf$2"], "postprocess": number},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": ignore}
]
  , ParserStart: "Expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
