import {$applyNodeReplacement, createEditor, DecoratorNode} from 'lexical';
import { $generateHtmlFromNodes }       from "@lexical/html"
import * as React from 'react';
import {Suspense} from 'react';

const ImageComponent = React.lazy(
  // @ts-ignore
  () => import('./ImageComponent'),
);


function convertImageElement(domNode) {
  if (domNode instanceof HTMLImageElement) {
    const {alt: altText, src, width, height} = domNode;
    const node = $createImageNode({altText, height, src, width});
    return {node};
  }
  return null;
}


export class ImageNode extends DecoratorNode{
  __src;
  __altText;
  __imageLink;
  __width;
  __heightr;
  __maxWidth;
  __showCaption;
  __caption;
  // Captions cannot yet be used within editor cells
  __captionsEnabled;
  
  static getType() {
    return 'image';
  }

  static clone(node) {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__showCaption,
      node.__caption,
      node.__captionsEnabled,
      node.__imageLink,
      node.__key,
    );
  }

  static importJSON(serializedNode) {
    const {altText, height, width, maxWidth, caption, src, showCaption, alignment, imageLink} =
      serializedNode;
    const node = $createImageNode({
      altText,
      height,
      maxWidth,
      showCaption,
      src,
      width,
      alignment,
      imageLink,
    });
    const nestedEditor = node.__caption;

    const editorState = nestedEditor.parseEditorState(caption.editorState);

    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }

  exportDOM() {
    let aElement           = null
    const isCaptionEnabled = this.__showCaption
    if (this.__imageLink && this.__imageLink !== "") {
      aElement = document.createElement("a")
      aElement.href = this.__imageLink
      aElement.target = "_blank"
    }
    if (isCaptionEnabled) {
      const img          = document.createElement('img')
      img.onerror        = () => {
        const newElem    = document.querySelector(`img[src="${img.src}"]`)
        if (newElem) {
          newElem?.parentElement?.removeChild(newElem)
        }
      }
      img.setAttribute('src', this.__src);
      img.setAttribute('alt', this.__altText);
      img.setAttribute('width', this.__width.toString());
      img.setAttribute('height', this.__height.toString());

      let imgStyle   = ""
      if (this.__width < 500) {
        imgStyle += `width: ${this.__width}px !important;`
      }

      if (this.__height < 500) {
        imgStyle += `height: ${this.__height}px !important;`
      }

      if (imgStyle !== "") {
        img.setAttribute("style", imgStyle)
      }
  
      const caption      = document.createElement('figcaption')
      const captionState = this.__caption.getEditorState()
      captionState.read(() => {
        const parser = new DOMParser()
        const dom    = parser.parseFromString($generateHtmlFromNodes(this.__caption), 'text/html')
        caption.append(...(dom.body.firstChild?.childNodes ?? []))
      })
  
      const element = document.createElement('figure')
      element.style.display = "flex"
      element.style.justifyContent = this.__alignment || "center"
      element.style.alignItems = "center"
      element.style.flexDirection = "column"
      if (aElement) {
        aElement.appendChild(img)
      }
      element.append(aElement ? aElement : img, caption)
      return { element }
    }
    const element = document.createElement('img');
    element.onerror = () => {
      const newElem = document.querySelector(`img[src="${element.src}"]`)
      if (newElem) {
        newElem?.parentElement?.removeChild(newElem)
      }
    }
    element.setAttribute('src', this.__src);
    element.setAttribute('alt', this.__altText);
    element.setAttribute('width', this.__width.toString());
    element.setAttribute('height', this.__height.toString());
    let imgStyle   = ""
    if (this.__width < 500) {
      imgStyle += `width: ${this.__width}px !important;`
    }

    if (this.__height < 500) {
      imgStyle += `height: ${this.__height}px !important;`
    }

    if (imgStyle !== "") {
      element.setAttribute("style", imgStyle)
      const div = document.createElement("div")
      div.style.display = "flex"
      div.style.justifyContent = "center"
      div.style.alignItems = "center"
      div.style.flexDirection = "column"
      div.appendChild(element)

      if (aElement) {
        aElement.appendChild(div)
      }
      return { element: aElement ? aElement : div  }
    }

    if (aElement) {
      aElement.appendChild(element)
    }

    return { element: aElement ? aElement : element };
  }
     

  static importDOM() {
    return {
      img: (node) => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  constructor(
    src,
    altText,
    maxWidth,
    width,
    height,
    showCaption,
    caption,
    captionsEnabled,
    imageLink,
    key,
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width || 'inherit';
    this.__height = height || 'inherit';
    this.__showCaption = showCaption || false;
    this.__caption = caption || createEditor();
    this.__captionsEnabled = captionsEnabled || captionsEnabled === undefined;
    this.__imageLink = imageLink
  }

  exportJSON() {
    return {
      altText: this.getAltText(),
      caption: this.__caption.toJSON(),
      height: this.__height === 'inherit' ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      showCaption: this.__showCaption,
      alignment: this.__alignment,
      imageLink: this.getImageLink(),
      src: this.getSrc(),
      type: 'image',
      version: 1,
      width: this.__width === 'inherit' ? 0 : this.__width,
    };
  }

  setImageAlignment(alignment) {
    const writable = this.getWritable ? this.getWritable() : {};
    writable.__alignment = alignment;
  }

  setWidthAndHeight(
    width,
    height,
  ){
    const writable = this.getWritable ? this.getWritable() : {};
    writable.__width = width;
    writable.__height = height;
  }

  setShowCaption(showCaption) {
    const writable = this.getWritable ? this.getWritable() : {};
    writable.__showCaption = showCaption;
  }

  onAltUpdate (newAltText) {
    const writable      = this.getWritable ? this.getWritable() : {};
    writable.__altText  = newAltText;
  }

  onLinkUpdate (newURL) {
    const writable        = this.getWritable ? this.getWritable() : {};
    writable.__imageLink  = newURL;
  }

  setCaption(caption) {
    const writable = this.getWritable ? this.getWritable() : {};
    writable.__caption = caption;
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

  getAltText() {
    return this.__altText;
  }

  getImageLink() {
    return this.__imageLink;
  }

  decorate() {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
          maxWidth={this.__maxWidth}
          imageLink={this.__imageLink}
          nodeKey={this.getKey()}
          showCaption={this.__showCaption}
          caption={this.__caption}
          captionsEnabled={this.__captionsEnabled}
          resizable={true}
        />
      </Suspense>
    );
  }
}

export function $createImageNode({
  imageLink,
  altText,
  height,
  maxWidth = 500,
  captionsEnabled,
  src,
  width,
  showCaption,
  caption,
  key,
}){
  return $applyNodeReplacement(
    new ImageNode(
      src,
      altText,
      maxWidth,
      width,
      height,
      showCaption,
      caption,
      captionsEnabled,
      imageLink,
      key,
    ),
  );
}

export function $isImageNode(
  node,
) {
  return node instanceof ImageNode;
}
