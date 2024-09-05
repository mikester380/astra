import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Lenis from 'lenis'
import libGsap from 'gsap'

libGsap.registerPlugin(ScrollTrigger)

export function checkIfWithTl(opts) {
  let tRect = opts.trigger.getBoundingClientRect()

  if (tRect.bottom <= window.innerHeight) {
    return [opts.animate, opts.pos || '>']
  }

  ScrollTrigger.create({
    trigger: opts.trigger,
    start: 'bottom bottom',
    animation: opts.animate,
    once: true,
  })

  return []
}

export function scroll(configs) {
  const lenis = new Lenis(configs)
  let running = true
  let rafId

  rafId = window.requestAnimationFrame(function callback(time) {
    lenis.raf(time)

    if (running) {
      rafId = requestAnimationFrame(callback)
    }
  })

  lenis.on('scroll', ScrollTrigger.update)

  lenis.$$kill = () => {
    running = false
    window.cancelAnimationFrame(rafId)
    lenis.destroy()
  }

  return lenis
}
