import { checkIfWithTl } from '../utils/animations'
import libGsap from 'gsap'

import GSAPAnimation from './animation'
import TextIntro from './text'

class IntroHero extends GSAPAnimation {
  constructor() {
    super({
      pointers: {
        paths: '.hero__svgPath',
        svgs: '.hero__ellipse',
        tag: '.hero__tag',
        title: '.hero__title',
        summary: '.hero__summary',
        cta: '.hero__cta',
        icons: '.hero__clientsIcon > svg',
        icons_wrap: '.hero__clientsIcons',
        clients_s: '.hero__clientsSummary',
      },
    })
  }

  _create() {
    const dom = this._dom

    this.tl
      .to(dom.paths, {
        duration: 3,
        strokeDashoffset: 0,
        ease: 'linear',
      })
      .from([dom.tag, dom.title, dom.summary, dom.cta], {
        opacity: 0,
        y: 70,
        ease: 'elastic.out',
        duration: 2.3,
        stagger: 0.08,
      })
      .add(
        ...checkIfWithTl({
          animate: new TextIntro(this._dom.clients_s, false).tl,
          trigger: dom.clients_s,
          pos: '>-2',
        })
      )
      .add(
        ...checkIfWithTl({
          animate: libGsap.from(dom.icons, {
            yPercent: 100,
            duration: 0.33,
            stagger: 0.12,
            ease: 'power2.out',
          }),
          trigger: dom.icons_wrap,
          pos: '<',
        })
      )
  }

  _setup() {
    this._dom.paths.forEach((path) => {
      const length = path.getTotalLength()

      path.style['stroke-dasharray'] = length
      path.style['stroke-dashoffset'] = length * 0.4 - length
    })
  }
}

export default new IntroHero()
