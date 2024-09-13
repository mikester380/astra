import splitting from 'splitting'
import gsap from 'gsap'
import GsapAnimation from './animation'

export default class extends GsapAnimation {
  constructor(target, nextValue, paused = true) {
    super({
      pointers: {
        text: target,
      },
      paused,
    })

    this._nextValue = nextValue
  }

  _setup() {
    const { text } = this._dom

    const currValue = document.createElement('span')
    currValue.textContent = text.textContent

    const nextValue = document.createElement('span')
    nextValue.textContent = this._nextValue

    text.innerHTML = ''
    text.append(nextValue, currValue)

    this._valueSplits = []

    //split each value
    ;[currValue, nextValue].forEach((value) => {
      this._valueSplits.push(
        splitting({
          target: value,
          by: 'chars',
        })[0]
      )
    })

    const chars = this._valueSplits.map((v) => v.chars).flat()

    chars.forEach((char) => {
      const w = document.createElement('span')
      w.classList.add('o-clip', 'i-block')

      char.parentElement.insertBefore(w, char)
      w.appendChild(char)
    })

    gsap.set(nextValue, {
      position: 'absolute',
    })

    const [, split2] = this._valueSplits

    gsap.set(split2.chars, {
      y: '100%',
    })
  }

  _create() {
    const { text } = this._dom
    const [split1, split2] = this._valueSplits

    this.tl
      .to(split1.chars, {
        y: '-100%',
      })
      .to(
        split2.chars,
        {
          y: 0,
        },
        '<'
      )
      .eventCallback('onComplete', () => {
        text.innerHTML = ''
        text.textContent = this._nextValue
      })
  }
}
