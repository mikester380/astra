import GSAPAnimation from './animation'
import TR0 from './text'

import gsap from 'gsap'

export default class extends GSAPAnimation {
  constructor(target, paused = true) {
    super({
      paused,
      pointers: {
        pill: target,
      },
    })
  }

  _create() {
    const { pill } = this._dom
    const text = new TR0(pill, false)

    this.tl
      .to(pill, {
        clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)',
        ease: 'shoot',
        duration: 0.65,
      })
      .add(text.tl, '>-0.4')
  }

  _setup() {
    gsap.set(this._dom.pill, {
      clipPath: 'polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)',
    })
  }
}
