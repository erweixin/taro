import { TaroComment } from './comment'
import { createCSSStyleDeclaration } from './cssStyleDeclaration'
import { TaroElement, TaroImage, TaroText, TaroView } from './element'
import { NodeType, TaroNode } from './node'
import { TaroTextElement } from './text'

import type { Window } from '../bom/window'

class TaroDocument extends TaroNode {
  public documentElement: TaroElement
  public head: TaroElement
  public body: TaroElement
  private _win: Window

  constructor(window: Window) {
    super('#document', NodeType.DOCUMENT_NODE)
    this._win = window
    window._doc = this
  }

  get defaultView (): Window {
    return this._win
  }

  public createElement (tagName: string): TaroElement {
    let node: TaroElement

    switch (tagName) {
      case 'view':
        node = new TaroView()
        break
      case 'text':
        node = new TaroText()
        break
      case 'image':
        node = new TaroImage()
        break
      default:
        node = new TaroElement(tagName)
    }
    node._doc = this
    // Hack: 此 Proxy 不能放在 Element 类内定义，否则响应式更新会失效
    node._style = createCSSStyleDeclaration(node)
    return node
  }

  public createTextNode (value: string): TaroTextElement {
    const node = new TaroTextElement(value)
    node._doc = this
    return node
  }

  public createComment (data: string): TaroComment {
    return new TaroComment(data)
  }

  // @Todo
  // public getElementById (id: string): TaroElement | null
  // public getElementsByClassName (names: string): TaroElement[]
  // public querySelector (selectors: string): TaroElement | null
  // public querySelectorAll (selectors: string): TaroElement[]
  // public createElementNS
}

export { TaroDocument }