import {$applyNodeReplacement, DecoratorNode} from 'lexical';
import * as React from 'react';
import {Suspense} from 'react';
// import IframeComponent from './IframeComponent';

const IframeComponent = React.lazy(
  // @ts-ignore
  () => import('./IframeComponent'),
);


function convertIframeElement(domNode) {
  if (domNode instanceof HTMLIFrameElement) {
    const {src, width, height} = domNode;
    const node = $createIframeNode({src, width, height});
    return {node};
  }
  return null;
}


export class IframeNode extends DecoratorNode{
  __src;
  __width;
  __heightr;
  __maxWidth;
  __maxHeight;

  static getType() {
    return 'iframe';
  }

  static clone(node) {
    return new IframeNode(
      node.__src,
      node.__maxWidth,
      node.__maxHeight,
      node.__width,
      node.__height,
      node.__key,
    );
  }

  static importJSON(serializedNode) {
    const {height, width, maxWidth, maxHeight, src} = serializedNode;
    const node = $createIframeNode({
      height,
      maxWidth,
      maxHeight,
      src,
      width,
    });
    return node;
  }

  exportDOM() {
    const element = document.createElement('iframe');
    element.setAttribute('src', this.__src);
    element.setAttribute('width', this.__width.toString());
    element.setAttribute('height', this.__height.toString());
    if (this.__alignment) {
      const div           = document.createElement("div")
      div.style.textAlign = this.__alignment
      div.appendChild(element)
      return { element: div }
    }
    return { element };
  }
     

  static importDOM() {
    return {
      iframe: (node) => ({
        conversion: convertIframeElement,
        priority: 0,
      }),
    };
  }

  constructor(
    src,
    maxWidth,
    maxHeight,
    width,
    height,
    key,
  ) {
    super(key);
    this.__src = src;
    this.__maxWidth = maxWidth;
    this.__maxHeight = maxHeight;
    this.__width = width || maxWidth;
    this.__height = height || maxHeight;
  }

  exportJSON() {
    return {
      height: this.__height === 'inherit' ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      maxHeight: this.__maxHeight,
      src: this.getSrc(),
      type: 'iframe',
      version: 1,
      width: this.__width === 'inherit' ? 0 : this.__width,
    };
  }

  setWidthAndHeight(
    width,
    height,
  ){
    const writable = this.getWritable ? this.getWritable() : {};
    writable.__width = width;
    writable.__height = height;
  }

  // View

  createDOM(config) {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM() {
    return false;
  }

  getSrc() {
    return this.__src;
  }

  setFormat(align) {
    const writable = this.getWritable ? this.getWritable() : {};
    writable.__alignment = align;
  }

  decorate() {
    return (
      <Suspense fallback={null}>
        <IframeComponent
          src={this.__src}
          width={this.__width}
          height={this.__height}
          maxWidth={this.__maxWidth}
          maxHeight={this.__maxHeight}
          nodeKey={this.getKey()}
          resizable={true}
        />
      </Suspense>
    );
  }
}

export function $createIframeNode({
  src,
  width,
  height,
  maxHeight=500,
  maxWidth=500,
  key,
}){
  return $applyNodeReplacement(
    new IframeNode(
      src,
      width,
      height,
      maxWidth,
      maxHeight,
      key,
    ),
  );
}

export function $isIframeNode(
  node,
) {
  return node instanceof IframeNode;
}
