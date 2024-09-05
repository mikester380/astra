import splitting from 'splitting'
import libGsap from 'gsap'

export default class {
  constructor(target, value) {
    this._target = target
    this._value = value

    this._timeline = libGsap.timeline({
      paused: true,
      defaults: {
        stagger: 0.1,
      },
    })

    const currValue = document.createElement('span')
    currValue.textContent = this._target.textContent

    const nextValue = document.createElement('span')
    nextValue.textContent = this._value

    this._target.innerHTML = ''
    this._target.append(nextValue, currValue)

    const valueSplits = []

    ;[currValue, nextValue].forEach((value) => {
      valueSplits.push(
        splitting({
          target: value,
          by: 'chars',
        })[0]
      )
    })

    const chars = valueSplits.map((v) => v.chars).flat()

    chars.forEach((char) => {
      const w = document.createElement('span')
      w.classList.add('o-clip', 'i-block')

      char.parentElement.insertBefore(w, char)
      w.appendChild(char)
    })

    libGsap.set(nextValue, {
      position: 'absolute',
    })

    libGsap.set(valueSplits[1].chars, {
      y: '100%',
    })

    this._timeline
      .to(valueSplits[0].chars, {
        y: '-100%',
      })
      .to(
        valueSplits[1].chars,
        {
          y: 0,
        },
        '<'
      )
      .eventCallback('onComplete', () => {
        this._target.innerHTML = ''
        this._target.textContent = value
      })
  }

  swap() {
    this._timeline.play()
  }
}
