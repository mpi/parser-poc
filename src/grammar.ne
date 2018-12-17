@{%
  const unwrap = ([arr]) => arr;
  const ignore = () => { return null };

  const number = ([sign, chars]) => ({ type: 'number', value: Number((sign ? sign[0] : '') + chars.join('')) });
  const unit = ([value, unit]) => ({ type: 'unit', value, unit });

  const binaryOperator = ([left,,operator,,right]) => ({ type: 'binary_operator', operator, left, right});
%}


Expression   -> LoExpression {% unwrap %}

LoExpression -> LoExpression _ LoOperator _ HiExpression {% binaryOperator %}
              | HiExpression {% unwrap %}

HiExpression -> HiExpression _ HiOperator _ PaExpression {% binaryOperator %}
              | PaExpression {% unwrap %}

PaExpression -> "(" _ LoExpression _ ")" {% ([,,expr,,]) => expr %}
              | UnExpression {% unwrap %}

UnExpression -> Number Unit {% unit %}
              | Number {% unwrap %}

Unit 	       -> "%" {% unwrap %}
HiOperator   -> "*" {% unwrap %}
              | "/" {% unwrap %}
LoOperator   -> "+" {% unwrap %}
              | "-" {% unwrap %}

Number       -> "-":? [\d]:+ {% number %}
_            -> [\s]:*     {% ignore %}
