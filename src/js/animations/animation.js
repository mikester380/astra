import gsap from 'gsap'
import { isInstanceOf } from '../utils/global'
import { buildDom } from '../utils/elements'

export default class {
  append(animation, position) {
    this.tl.add(animation, position)

    return this
  }

  onComplete(callback) {
    this.tl.vars.onComplete = callback

    return this
  }

  start() {
    this.tl.play()

    return this
  }

  _showInvisible() {
    Object.values(this._dom).forEach((v) => {
      if (isInstanceOf(v, Array)) {
        const arr = v.filter((e) => e.hasAttribute('data-hfa'))
        return arr.forEach((el) => {
          el.removeAttribute('data-hfa')
        })
      }
      if (v.hasAttribute('data-hfa')) {
        v.removeAttribute('data-hfa')
      }
    })
  }

  constructor(options) {
    this._dom = buildDom(options.pointers)

    const { paused } = {
      paused: true,
      ...options,
    }

    this.tl = gsap.timeline({
      paused: paused,
    })

    this._setup?.()
    this._create()
    this._showInvisible()
  }
}
