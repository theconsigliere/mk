import Lenis from "lenis"
import noise from "./utils/noise"
import toggle from "./utils/toggle"
import { gsap, ScrollTrigger } from "gsap/all"
import "splitting/dist/splitting.css"
import "splitting/dist/splitting-cells.css"
import Splitting from "splitting"
import footerDate from "./utils/date"

gsap.registerPlugin(ScrollTrigger)

// GSAP + Lenis
// -----------------------------------------------------------------
const imagegroups = gsap.utils.toArray(
  document.querySelectorAll(".wi-item-main-image-group")
)
let mm = gsap.matchMedia()

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

// mm.add("(min-width: 769px)", () => {
lenis.on("scroll", (e) => {
  mm.add("(min-width: 769px)", () => {
    imagegroups.forEach((image) => {
      image.style.transform = "skewY(" + e.velocity * 0.075 + "deg)"
    })
  })
})

lenis.on("scroll", ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)
// })

const circleButton = document.querySelector(".js-circle-button")
const contactTarget = document.querySelector("#contact-section")

circleButton.addEventListener("click", (event) => {
  event.preventDefault()

  lenis.scrollTo(contactTarget, {
    duration: 1.2,
    offset: -window.innerHeight / 5,
    // ease: 'power3.inOut'
  })
})

function heroAnimation() {
  // Hero Section
  const hero = document.querySelector(".hero")
  const button = hero.querySelector(".js-circle-button")
  const heroNameChars = gsap.utils.toArray(
    hero.querySelectorAll(".hh_title .word > .char")
  )
  const subtitle = [...hero.querySelectorAll(".h-sub-title")]
  const desc = hero.querySelector(".p-desc")
  const imageBlock = hero.querySelector(".px__image")
  const image = hero.querySelector(".px__image img")
  const mask = hero.querySelector(".px__image--mask")
  const logo = document.querySelector(".home-link")
  const menuLinks = gsap.utils.toArray(
    document.querySelectorAll(".header-menu .menu-link")
  )

  const underline = hero.querySelector(".underline")
  // preloader

  const preloader = document.querySelector(".preloader")
  const preloaderLogo = preloader.querySelector(".preloader_logo svg")
  const preloaderPaths = gsap.utils.toArray(
    preloaderLogo.querySelectorAll(".preloader_logo-path")
  )

  gsap.set(heroNameChars, { yPercent: "110", autoAlpha: 0, rotation: -10 })
  gsap.set([subtitle, desc], { yPercent: "110" })
  gsap.set(imageBlock, { xPercent: -101 })
  gsap.set(mask, { xPercent: 110 })
  gsap.set([logo, menuLinks], { autoAlpha: 0, yPercent: 5 })
  gsap.set(button, { autoAlpha: 0, rotation: 25 })
  // image is set bigger so it scales down on hover
  gsap.set(image, { scale: 1.2 })
  gsap.set(underline, { width: 0, transformOrigin: "start start" })
  gsap.set(preloaderLogo, {
    // autoAlpha: 0,
    scale: 0,
  })

  let tl = gsap.timeline({ onComplete: runHero })

  tl.to(
    preloaderLogo,
    { autoAlpha: 1, scale: 1, duration: 0.6, ease: "expo.out" },
    0
  )
    .to(preloader, { backgroundColor: "var(--red)", duration: 0.35 })
    .to(preloaderPaths, { fill: "var(--black)", duration: 0.35 }, "-=.35")
    .to(preloader, { backgroundColor: "var(--yellow)", duration: 0.35 })
    .to(preloaderPaths, { fill: "var(--black)", duration: 0.35 }, "-=.35")
    .to(preloader, { backgroundColor: "var(--purple)", duration: 0.35 })
    .to(preloaderPaths, { fill: "var(--white)", duration: 0.35 }, "-=.35")
    .to(preloader, { backgroundColor: "var(--black)", duration: 0.35 })
    .to(
      preloader,
      {
        autoAlpha: 0,
        duration: 1,
        ease: "power4.in",
        onComplete: () => {
          // remove preloader from DOM
          setTimeout(() => {
            preloader.parentNode.removeChild(preloader)
          }, 1000)
        },
      },
      1.5
    )

  function runHero() {
    let timeline = gsap.timeline({
      defaults: {
        //  ease: "back.inOut(1.7)"
        ease: "power4.out",
      },
      // add scrolltrigger to timelinex
      scrollTrigger: {
        trigger: hero,
        start: "center bottom",
        //  scroller: scrollContainer,
        //  end:"bottom bottom",
        //   markers: true
      },
    })

    timeline
      .to(
        heroNameChars,
        {
          duration: 1.2,
          ease: "expo.out",
          yPercent: 0,
          autoAlpha: 1,
          stagger: 0.05,
          rotation: 0,
        },
        0
      )
      .to([subtitle, desc], { duration: 0.85, yPercent: 0, stagger: 0.1 }, 0)
      .to([mask, imageBlock], { xPercent: 0, duration: 0.9 }, 0.2)
      .to(image, { duration: 1.25, scale: 1 }, 0.2)
      .to(logo, { yPercent: 0, autoAlpha: 1, duration: 0.6 }, 0.2)
      .to(
        menuLinks,
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: "expo.out",
          duration: 0.5,
          stagger: 0.1,
        },
        0.2
      )
      .to(button, { duration: 0.4, autoAlpha: 1 }, 0.6)
      .to(underline, { width: "100%", duration: 1.2 }, 0.8)

    // button on scroll

    gsap.to(
      button,
      {
        rotation: 360 * 5,
        // duration: 1,
        ease: "none",
        scrollTrigger: {
          scrub: true,
        },
      },
      0
    )
  }
}

function aboutAnimation() {
  // about section
  const about = document.querySelector(".about-section")
  const aboutNameChars = gsap.utils.toArray(
    about.querySelectorAll(".ah_title .word > .char")
  )
  const imageBlock = about.querySelector(".px__image")
  const image = about.querySelector(".px__image img")
  const mask = about.querySelector(".px__image--mask")
  const shape = about.querySelector(".ah_shape-box")
  const subtitle = about.querySelector(".a-subtitle")
  const desc = gsap.utils.toArray(about.querySelectorAll(".a-desc"))

  gsap.set(aboutNameChars, { yPercent: 110, autoAlpha: 0, rotation: -10 })
  gsap.set([imageBlock], { xPercent: 101 })
  gsap.set(mask, { xPercent: -110 })
  gsap.set(image, { scale: 1.2 })
  gsap.set(subtitle, { yPercent: 101 })
  gsap.set(desc, { yPercent: 5, autoAlpha: 0 })
  gsap.set(shape, { rotation: -15, autoAlpha: 0 })

  let timeline = gsap.timeline({
    defaults: {
      //  ease: "back.inOut(1.7)"
      ease: "power4.out",
    },
    // add scrolltrigger to timelinex
    scrollTrigger: {
      trigger: about,
      start: "top bottom-=20%",
      //  scroller: scrollContainer,
      //  toggleActions:"play pause restart reset",
      //  end:"bottom bottom",
      //  markers: true,
    },
  })

  timeline
    .to(
      aboutNameChars,
      {
        duration: 0.75,
        ease: "expo.out",
        yPercent: 0,
        autoAlpha: 1,
        stagger: 0.05,
        rotation: 0,
      },
      0
    )
    .to([mask, imageBlock], { xPercent: 0, duration: 1 }, 0.2)
    .to(
      shape,
      { rotation: 0, duration: 1, autoAlpha: 1, ease: "back(1.7).inout" },
      0.2
    )
    .to(image, { duration: 2.5, scale: 1 }, 0.4)
    .to(
      [subtitle, desc],
      {
        yPercent: 0,
        duration: 0.5,
        ease: "power4.in",
        stagger: 0.1,
        autoAlpha: 1,
      },
      0
    )
}

function recentWorkAnimation() {
  const rw = document.querySelector(".rw")
  const rwChars = gsap.utils.toArray(
    rw.querySelectorAll(".rw-title .word > .char")
  )
  const underline = rw.querySelector(".underline")
  const desc = rw.querySelector("p")
  const shape = rw.querySelector(".rw_shape-box")

  gsap.set(rwChars, { yPercent: 110, autoAlpha: 0, rotation: -10 })
  gsap.set(desc, { yPercent: 5, autoAlpha: 0 })
  gsap.set(underline, { width: 0, transformOrigin: "start start" })
  gsap.set(shape, { rotation: -5, autoAlpha: 0 })

  let timeline = gsap.timeline({
    defaults: {
      //  ease: "back.inOut(1.7)"
      ease: "power4.out",
      duration: 0.6,
    },
    // add scrolltrigger to timeline
    scrollTrigger: {
      trigger: rw,
      start: "top bottom-=20%",
      //  scroller: scrollContainer,
      //  toggleActions:"play pause restart reset",
      //  end:"bottom bottom",
      //  markers: true
    },
  })

  timeline
    .to(
      rwChars,
      {
        duration: 1.25,
        ease: "expo.out",
        yPercent: 0,
        autoAlpha: 1,
        stagger: 0.05,
        rotation: 0,
      },
      0
    )
    .to(desc, { yPercent: 0, autoAlpha: 1 }, 0.2)
    .to(shape, { rotation: 0, autoAlpha: 1 }, 0.4)
    .to(underline, { width: "100%", duration: 1.2 }, 0.4)
}

function workItemAnimation() {
  const items = document.querySelectorAll(".work-item")

  items.forEach((item) => {
    // variables
    const wiChars = gsap.utils.toArray(
      item.querySelectorAll(".wi_title .word > .char")
    )
    const desc = gsap.utils.toArray(item.querySelectorAll("p"))
    const image = item.querySelector(".about__image")
    const circles = gsap.utils.toArray(item.querySelectorAll(".circle"))
    const button = item.querySelector(".block-button")
    const designBadges = [...item.querySelectorAll(".js-design-badge")]

    //  console.log(wiChars)

    // set default position
    gsap.set(wiChars, { yPercent: 110, autoAlpha: 0, rotation: -10 })
    gsap.set([desc, button, circles], { autoAlpha: 0 })
    gsap.set(image, { scale: 1.2, autoAlpha: 0 })

    if (designBadges) gsap.set(designBadges, { yPercent: 5, autoAlpha: 0 })

    let timeline = gsap.timeline({
      defaults: {
        //  ease: "back.inOut(1.7)"
        ease: "expo.out",
        duration: 0.6,
      },
      // add scrolltrigger to timelinex
      scrollTrigger: {
        trigger: item,
        start: "top bottom-=20%",
        //  scroller: scrollContainer,
        //  toggleActions:"play pause restart reset",
        //  end:"bottom bottom",
        //  markers: true,
      },
    })

    timeline
      .to(
        wiChars,
        {
          duration: 0.75,
          yPercent: 0,
          autoAlpha: 1,
          stagger: 0.025,
          rotation: 0,
        },
        0.1
      )
      .to(
        image,
        {
          duration: 0.6,
          autoAlpha: 1,
          ease: "expo.out",
        },
        0
      )
      .to(
        image,
        {
          duration: 0.6,
          scale: 1,
          onComplete: () => {
            if (designBadges) {
              designBadges.forEach((badge) => {
                gsap.to(
                  badge,
                  {
                    yPercent: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "expo.in",
                    autoAlpha: 1,
                  },
                  0.3
                )
              })
            }
          },
        },
        0.2
      )
      .to(
        [desc, circles, button],
        { autoAlpha: 1, duration: 0.5, stagger: 0.05 },
        0
      )
  })
}

function skillsAnimation() {
  const skill = document.querySelector(".skills")
  const header = skill.querySelector(".skills-header")
  const underline = skill.querySelector(".underline")
  const wordsDashs = gsap.utils.toArray(skill.querySelectorAll(".sl-item *"))

  // console.log(wordsDashs)

  gsap.set(header, { yPercent: 101, autoAlpha: 0 })
  gsap.set(underline, { width: 0, transformOrigin: "start start" })
  gsap.set(wordsDashs, { yPercent: 50, autoAlpha: 0 })

  let timeline = gsap.timeline({
    defaults: {
      //  ease: "back.inOut(1.7)"
      ease: "expo.out",
      duration: 0.6,
    },
    // add scrolltrigger to timelinex
    scrollTrigger: {
      trigger: skill,
      start: "top bottom-=20%",
      //  scroller: scrollContainer,
      //  toggleActions:"play pause restart reset",
      //  end:"bottom bottom",
      //  markers: true
    },
  })

  timeline
    .to(header, { yPercent: 0, duration: 1.2, autoAlpha: 1 }, 0)
    .to(underline, { width: "100%", duration: 1.2 }, 0)
    .to(
      wordsDashs,
      { yPercent: 0, autoAlpha: 1, stagger: 0.05, duration: 1 },
      0
    )
}

function contactAnimation() {
  const contact = document.querySelector(".contact")
  const chChars = gsap.utils.toArray(
    contact.querySelectorAll(".ch_title .word > .char")
  )
  const diamond = contact.querySelector(".c-diamond")
  const desc = gsap.utils.toArray(
    contact.querySelectorAll("p, .cc_email, .link-menu a")
  )

  gsap.set(chChars, { yPercent: 110, autoAlpha: 0, rotation: -10 })
  gsap.set(diamond, { scale: 0.1 })
  gsap.set(desc, { yPercent: 50, autoAlpha: 0 })

  let timeline = gsap.timeline({
    defaults: {
      //  ease: "back.inOut(1.7)"
      ease: "expo.out",
      duration: 0.6,
    },
    // add scrolltrigger to timelinex
    scrollTrigger: {
      trigger: contact,
      start: "top bottom-=20%",
      //  scroller: scrollContainer,
      //  toggleActions:"play pause restart reset",
      //  end:"bottom bottom",
      // markers: true
    },
  })

  timeline
    .to(
      chChars,
      {
        duration: 1.25,
        yPercent: 0,
        autoAlpha: 1,
        stagger: 0.05,
        rotation: 0,
      },
      0
    )
    .to(diamond, { scale: 1, duration: 2, ease: "back.inOut(1.7)" }, 0)
    .to(desc, { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1 }, 0.6)
}

mm.add("(min-width: 769px)", () => {
  // MOBILE
  // console.log("mobile")
})

mm.add("(min-width: 769px)", () => {
  // Desktop
  //console.log("desktop")
})

function browserTab() {
  const pageTitle = document.title
  const attentionMessage = "👋 Hey, come back!"
  let blinkEvent = null

  document.addEventListener("visibilitychange", function (e) {
    let isPageActive = !document.hidden

    if (!isPageActive) {
      blink()
    } else {
      document.title = pageTitle
      clearInterval(blinkEvent)
    }
  })

  function blink() {
    blinkEvent = setInterval(function () {
      document.title === attentionMessage
        ? (document.title = pageTitle)
        : (document.title = attentionMessage)
    }, 1000)
  }
}

function init() {
  Splitting()
  toggle()
  noise()
  heroAnimation()
  aboutAnimation()
  recentWorkAnimation()
  workItemAnimation()
  skillsAnimation()
  contactAnimation()
  footerDate()
  browserTab()
}

window.addEventListener("load", function () {
  init()
})
