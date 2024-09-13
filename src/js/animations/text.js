import splitting from 'splitting'
import gsap from 'gsap'
import GSAPAnimation from './animation'

export default class extends GSAPAnimation {
  _setup() {
    const [splitResult] = splitting({
      by: 'lines',
      target: this._dom.text,
    })

    this._lines = splitResult.lines

    this._lines.forEach((line) => {
      line.forEach((word) => {
        const w = document.createElement('span')
        w.classList.add('o-clip', 'i-block')

        this._dom.text.insertBefore(w, word)
        w.appendChild(word)
      })
    })

    const words = this._lines.flat()

    gsap.set(words, {
      willChange: 'transform',
      transformOrigin: '0% 50%',
      rotation: 5,
      y: '100%',
    })
  }

  _create() {
    this._lines.forEach((line, index) => {
      const vars = {
        duration: 0.55,
        rotation: 0,
        y: 0,
      }

      if (!index) {
        this.tl.to(line, vars)
        return
      }

      this.tl.to(line, vars, '>-0.45')
    })
  }

  constructor(text, paused = true) {
    super({
      paused,
      pointers: {
        text: text,
      },
    })
  }
}
