import Embed from '../blots/embed';
import Quill from '../core/quill';


class FormulaLabmathBlot extends Embed {
  static create() {
    let node = super.create();
    node.textContent = "a^2+b^2";
    node.setAttribute('data-value', 'oi');
    var MQ = MathQuill.getInterface(2); // for backcompat
    var mathField = MQ.MathField( node, {
      spaceBehavesLikeTab: true // configurable
    });
    return node;
  }
}
FormulaLabmathBlot.blotName = 'formula-labmath';
FormulaLabmathBlot.className = 'ql-formula-labmath';
FormulaLabmathBlot.tagName = 'SPAN';


function FormulaLabmath() {
  Quill.register(FormulaLabmathBlot, true);
}


export { FormulaLabmathBlot, FormulaLabmath as default };
