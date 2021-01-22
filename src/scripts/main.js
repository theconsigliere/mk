import LocomotiveScroll from 'locomotive-scroll';
import noise from './utils/noise';
import toggle from './utils/toggle';
import { gsap, ScrollTrigger } from "gsap/all";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";


gsap.registerPlugin(ScrollTrigger)





// GSAP + Locomotive scroll

// Locomotive Scroll

// -----------------------------------------------------------------



    const scrollContainer = document.querySelector('.scroll-container')

    // get smoothscroll to start working

    const locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        getDirection: true,
        getSpeed: true
    })

    
    // when we scroll with locomotive scroll update scrolltrigger
    locoScroll.on("scroll", function (event) {
     
      ScrollTrigger.update


      const images = gsap.utils.toArray(document.querySelectorAll('.wi-item img'))
      let speed = event.speed * 0.1


      images.forEach(image => {
       
        image.style.transform = 'skewY(' + speed + 'deg)'
       // console.log(image.style.transform)
      })
    });

    ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },

    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: scrollContainer.style.transform ? "transform" : "fixed"


    });

    const circleButton = document.querySelector('.js-circle-button')

    circleButton.addEventListener('click', function(event) {
        event.preventDefault();

        const target = document.querySelector('#contact-section');

        locoScroll.scrollTo(target);

    })





function heroAnimation () {
            // Hero Section
            const hero = document.querySelector('.hero')
            const button = hero.querySelector('.js-circle-button')
            const heroNameChars = gsap.utils.toArray(hero.querySelectorAll('.hh_title .word > .char'))
            const subtitle = hero.querySelector('.h-sub-title')
            const desc = hero.querySelector('.p-desc')
            const imageBlock = hero.querySelector('.px__image')
            const image = hero.querySelector('.px__image img')
            const mask = hero.querySelector('.px__image--mask')
            const logo = document.querySelector('.home-link')
            const menuLinks = gsap.utils.toArray(document.querySelectorAll('.header-menu .menu-link'))
            const underline = hero.querySelector('.underline')
            // preloader
            const preloader = document.querySelector('.preloader')
            const preloaderLogo = preloader.querySelector('.preloader_logo svg')
    
            gsap.set(heroNameChars, {yPercent: '110', autoAlpha: 0, rotation: -10})
            gsap.set([subtitle, desc], {yPercent: '110' })
            gsap.set(imageBlock, {xPercent: -101})
            gsap.set(mask, {xPercent: 110})
            gsap.set([logo, menuLinks], {autoAlpha: 0, yPercent: 5})
            gsap.set( button, {autoAlpha: 0, rotation: 25 })
            // image is set bigger so it scales down on hover
            gsap.set(image, {scale: 1.2})
            gsap.set(underline, {width: 0, transformOrigin: 'start start'})
           // gsap.set(preloaderLogo, {autoAlpha:0 })


            let tl = gsap.timeline({ onComplete: runHero })


            tl
              .to(preloaderLogo, { autoAlpha:1, duration:0.6, ease: 'power4.in' }, 0)
              .to(preloader, { yPercent: -110, duration: 1, ease: 'power4.in'}, 1.5)

        
          function runHero () {
            let timeline = gsap.timeline({
              defaults: {
                //  ease: "back.inOut(1.7)"
                ease:'power4.out'
              }
              // // add scrolltrigger to timelinex
              // scrollTrigger:{
              //     trigger: hero,
              //     start:"center bottom",
              //     scroller: scrollContainer,
              // //  end:"bottom bottom",
              //  //   markers: true
              // }
          });
      
      
          timeline
               .to(heroNameChars, { duration: 1.4, ease: "power4.out" , yPercent: 0, autoAlpha: 1, stagger: 0.1, rotation:0 }, 0)
               .to(button, { rotation: 30*2.5, duration: 1, ease: 'none', scrollTrigger: { scrub:true } }, 0)
               .to([subtitle, desc], { duration: 1.2 , ease: "power4.in", yPercent: 0, stagger: 0.2 }, .2)
               .to([mask, imageBlock], {xPercent: 0, duration: 1.2}, 0.8)
               .to(image, {duration: 2.5, scale: 1 }, 1.1)
               .to(logo, { yPercent:0, autoAlpha:1, duration:0.8}, 0.6)
               .to(menuLinks, {yPercent:0, autoAlpha:1, duration:0.8, stagger:0.2}, 0.6)
               .to(button, {rotation: 0, duration:.6, autoAlpha:1},1.8)
               .to(underline, {width: '100%', duration:1.2 }, 1.1)
          }
}
        


function aboutAnimation () {

                  // about section
                  const about = document.querySelector('.about-section')
                  const aboutNameChars = gsap.utils.toArray(about.querySelectorAll('.ah_title .word > .char'))
                  const imageBlock = about.querySelector('.px__image')
                  const image = about.querySelector('.px__image img')
                  const mask = about.querySelector('.px__image--mask')
                  const shape = about.querySelector('.ah_shape-box')
                  const subtitle = about.querySelector('.a-subtitle')
                  const desc = gsap.utils.toArray(about.querySelectorAll('.a-desc'))


                  gsap.set(aboutNameChars, {yPercent: 110, autoAlpha: 0, rotation: -10})
                  gsap.set([imageBlock], {xPercent: 101})
                  gsap.set(mask, {xPercent: -110})
                  gsap.set(image, {scale: 1.2})
                  gsap.set(subtitle, {yPercent: 101})
                  gsap.set(desc, { yPercent: 5, autoAlpha: 0})
                  gsap.set(shape, {rotation:-15, autoAlpha: 0 } )
                 

                  let timeline = gsap.timeline({
                    defaults: {
                      //  ease: "back.inOut(1.7)"
                      ease:'power4.out'
                    },
                    // add scrolltrigger to timelinex
                    scrollTrigger:{
                        trigger: about,
                        start:"top bottom",
                        scroller: scrollContainer,
                      //  toggleActions:"play pause restart reset",
                    //  end:"bottom bottom",
                      //  markers: true
                    }
                });

                timeline
                     .to(aboutNameChars, { duration: 2.5, ease: "power4.out" , yPercent: 0, autoAlpha: 1, stagger: 0.1, rotation:0 }, 0)
                     .to([mask, imageBlock], {xPercent: 0, duration: 1.2}, 1.2)
                     .to(shape, {rotation: 0, duration: 1.2, autoAlpha: 1, ease:'back(1.7).inout' }, 1.2)
                     .to(image, {duration: 2.5, scale: 1 }, 1.5)
                     .to([subtitle, desc], { yPercent: 0, duration: 1.5, ease:'power4.in', stagger: 0.2, autoAlpha: 1}, 0)



}



function recentWorkAnimation () {

    const rw = document.querySelector('.rw')
    const rwChars = gsap.utils.toArray(rw.querySelectorAll('.rw-title .word > .char'))
    const underline = rw.querySelector('.underline')
    const desc = rw.querySelector('p')
    const shape = rw.querySelector('.rw_shape-box') 

    gsap.set(rwChars, {yPercent: 110, autoAlpha: 0, rotation: -10})
    gsap.set(desc, {yPercent:10, autoAlpha:0 })
    gsap.set(underline, {width: 0, transformOrigin: 'start start'})
    gsap.set(shape, {rotation:-5, autoAlpha:0 })

    let timeline = gsap.timeline({
        defaults: {
          //  ease: "back.inOut(1.7)"
          ease:'power4.out',
          duration: 0.8
        },
        // add scrolltrigger to timelinex
        scrollTrigger:{
            trigger: rw,
            start:"center bottom",
            scroller: scrollContainer,
          //  toggleActions:"play pause restart reset",
        //  end:"bottom bottom",
          //  markers: true
        }
    });

 
    timeline
          .to(rwChars, { duration: 2.5, ease: "power4.out" , yPercent: 0, autoAlpha: 1, stagger: 0.1, rotation:0 }, 0)
          .to(desc, {yPercent: 0, autoAlpha: 1 }, 0.2)
          .to(shape, {rotation: 0, autoAlpha: 1 }, 0.6)
          .to(underline, {width: '100%', duration:1.2 }, 0.8)

}


function workItemAnimation () {
  
  const items = document.querySelectorAll('.work-item')

  items.forEach(item => {

    // variables
    const wiChars = gsap.utils.toArray(item.querySelectorAll('.wi_title .word > .char'))
    const desc = gsap.utils.toArray(item.querySelectorAll('p'))
    const image = item.querySelector('.about__image')
    const circles = gsap.utils.toArray(item.querySelectorAll('.circle'))
    const button = item.querySelector('.block-button')

  //  console.log(wiChars)

    // set default position
    gsap.set(wiChars, {yPercent: 110, autoAlpha: 0, rotation: -10})
    gsap.set([image, desc, button, circles], {yPercent: 10, autoAlpha: 0})

    let timeline = gsap.timeline({
      defaults: {
        //  ease: "back.inOut(1.7)"
        ease:'power4.out',
        duration: 0.6
      },
      // add scrolltrigger to timelinex
      scrollTrigger:{
          trigger: item,
          start:"center bottom",
          scroller: scrollContainer,
        //  toggleActions:"play pause restart reset",
      //  end:"bottom bottom",
        //  markers: true
      }
  });

  timeline
  .to(wiChars, { duration: 2.5, ease: "power4.out" , yPercent: 0, autoAlpha: 1, stagger: 0.1, rotation:0 }, 0)
  .to(image, {yPercent: 0, duration: 1, autoAlpha: 1}, 0.6)
  .to([desc, circles, button], {yPercent: 0, autoAlpha: 1, stagger: 0.1 }, 0)



  })
}


function skillsAnimation () {
    const skill = document.querySelector('.skills')
    const header = skill.querySelector('.skills-header')
    const underline = skill.querySelector('.underline')
    const wordsDashs = gsap.utils.toArray(skill.querySelectorAll('.sl-item *'))

   // console.log(wordsDashs)

    gsap.set(header, { yPercent: 101, autoAlpha: 0})
    gsap.set(underline, {width: 0, transformOrigin: 'start start'})
    gsap.set(wordsDashs, { yPercent: 50, autoAlpha: 0})

    let timeline = gsap.timeline({
      defaults: {
        //  ease: "back.inOut(1.7)"
        ease:'power4.out',
        duration: 0.6
      },
      // add scrolltrigger to timelinex
      scrollTrigger:{
          trigger: skill,
          start:"center bottom",
          scroller: scrollContainer,
        //  toggleActions:"play pause restart reset",
      //  end:"bottom bottom",
        //  markers: true
      }
  });

  timeline
        .to(header, {yPercent:0, duration: 1.2, autoAlpha:1 }, 0)
        .to(underline, {width: '100%', duration:1.2 }, 0)
        .to(wordsDashs , { yPercent:0, autoAlpha:1, stagger: 0.1}, 0)

}

function contactAnimation () {
  const contact = document.querySelector('.contact')
  const chChars = gsap.utils.toArray(contact.querySelectorAll('.ch_title .word > .char'))
  const diamond = contact.querySelector('.c-diamond')
  const desc = gsap.utils.toArray(contact.querySelectorAll('p, .cc_email, .link-menu a'))

  gsap.set(chChars, {yPercent: 110, autoAlpha: 0, rotation: -10})
  gsap.set(diamond, { scale: 0.1, autoAlpha: 0})
  gsap.set(desc, { yPercent: 50, autoAlpha: 0})

  let timeline = gsap.timeline({
    defaults: {
      //  ease: "back.inOut(1.7)"
      ease:'power4.in',
      duration: 0.6
    },
    // add scrolltrigger to timelinex
    scrollTrigger:{
        trigger: contact,
        start:"center bottom",
        scroller: scrollContainer,
     //  toggleActions:"play pause restart reset",
    //  end:"bottom bottom",
     // markers: true
    }
});

timeline
      .to(chChars, { duration: 2.5, ease: "power4.out" , yPercent: 0, autoAlpha: 1, stagger: 0.1, rotation:0 }, 0)
      .to(diamond, {scale:1, duration: 2, ease: "back.inOut(1.7)", autoAlpha:1 }, 0)
      .to(desc, {yPercent: 0, autoAlpha: 1,  duration:0.8, stagger:0.1 }, 0.6)

}

  



function init(){
    Splitting();
    toggle();
    noise();
    heroAnimation();
    aboutAnimation()
    recentWorkAnimation()
    workItemAnimation()
    skillsAnimation()
    contactAnimation()
   

}

window.addEventListener('load', function(){
    init();
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();