import GSAPAnimation from './animation'
import TA0 from './text'

export default class extends GSAPAnimation {
  constructor(elements) {
    super({ pointers: elements })
  }

  _create() {
    const { title, summary, icon } = this._dom

    const titleReveal = new TA0(title, false)
    const summaryReveal = new TA0(summary, false)

    this.tl
      .from(icon, {
        duration: 0.6,
        ease: 'pop',
        scale: 0,
      })
      .add(summaryReveal.tl, '>-0.1')
      .add(titleReveal.tl, '<')
  }
}
