import Embed from '../blots/embed';
import { sanitize } from '../formats/link';

const ATTRIBUTES = [
  'alt',
  'height',
  'width'
];


class Image extends Embed {
  static create(value) {
    let node = super.create(value);
    if (typeof value === 'string') {
      node.setAttribute('src', this.sanitize(value));
    }

    var resizing = false, startX, startY, startWidth, startHeight, ratio;
    node.onmousedown = (e) => {
      e.preventDefault();
      resizing = true;
      startX = e.offsetX;
      startY = e.offsetY;
      startWidth = node.offsetWidth;
      startHeight = node.offsetHeight;
      ratio = startWidth / startHeight;
    };
    node.onmouseup = (e) => {
      resizing = false;
    };
    node.onmousemove  = (e) => {
      if (resizing) {
        var deltaX = e.offsetX - startX;
        var deltaY = e.offsetY - startY;
        var deltaWidth = deltaX + deltaY * ratio;
        node.setAttribute('width', Math.max(startWidth + deltaWidth, 100));
      }
    };
    node.onmouseleave = (e) => {
      resizing = false;
    };

    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce(function(formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static match(url) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }

  static sanitize(url) {
    return sanitize(url, ['http', 'https', 'data']) ? url : '//:0';
  }

  static value(domNode) {
    return domNode.getAttribute('src');
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
Image.blotName = 'image';
Image.tagName = 'IMG';


export default Image;
