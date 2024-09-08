import gsap from 'gsap'
import ST from 'gsap/dist/ScrollTrigger'
import Ease from 'gsap/dist/CustomEase'

gsap.registerPlugin(ST)
gsap.registerPlugin(Ease)
Ease.create('pop', '.58,1.77,.65,1')
Ease.create('shoot', '.54,.28,.24,1')

import { scroll } from './utils/animations'

import TR0 from './animations/text'
import RevealValue from './animations/value'
import RevealPill from './animations/pill'

import revealHero from './animations/hero'

const texts = document.querySelectorAll('[data-a="text"]')
const pills = document.querySelectorAll('[data-a="pill"]')
const values = document.querySelectorAll('.valueProposition__value')

scroll({
  wheelMultiplier: 1.3,
  duration: 0.8,
})

revealHero.start()

texts.forEach((text) => {
  const animation = new TR0(text)

  ST.create({
    start: 'bottom bottom',
    trigger: text,
    once: true,

    onEnter: () => {
      animation.start()
    },
  })
})

values.forEach((value) => {
  const title = value.querySelector('.valueProposition__valueTitle')
  const summary = value.querySelector('.valueProposition__valueSummary')
  const icon = value.querySelector('.valueProposition__valueIcon')

  const animation = new RevealValue({
    summary: summary,
    title: title,
    icon: icon,
  })

  ST.create({
    start: 'bottom bottom',
    trigger: value,
    once: true,

    onEnter: () => {
      animation.start()
    },
  })
})

pills.forEach((pill) => {
  const animation = new RevealPill(pill)

  ST.create({
    start: 'bottom bottom',
    trigger: pill,
    once: true,

    onEnter: () => {
      animation.start()
    },
  })
})

const pricing = { monthly: [10, 45], anually: [100, 350] }

const priceIndivid = document.querySelector(
  '#individual .c_plan__amount > span'
)
const priceCompany = document.querySelector('#company .c_plan__amount > span')
const pricing_options = document.querySelectorAll('.pricing__tabRadio')
const pricing_slider = document.querySelector('.pricing__slider')

pricing_options.forEach((option, index) => {
  option.addEventListener('change', () => {
    if (option.checked) {
      pricing_slider.style.setProperty('--current', index)

      const current = option.value
      const prices = pricing[current]

      priceIndivid.textContent = prices[0]
      priceCompany.textContent = prices[1]
    }
  })
})

const note = document.querySelector('.note')

if (window.innerWidth < 1000) {
  note.classList.add('active')
}
