
const tl = gsap.timeline({ default: { duration: 1, ease: Expo.easeInOut, } })
tl.to(".header", {
    opacity: 1
}, 'a')

    .from(".navbar", {
        yPercent: -100,
        opacity: 0
    }, 'a').to('.navbar', {
        opacity: 1,
        yPercent: 0,
        stagger: 1,
        duration: 1,
        ease: Expo.easeInOut,
        opacity: 1,
    }, 'a')

tl.from('#hero-sect', {
    opacity: 0,
    xPercent: 100

}, 'b').to('#hero-sect', {
    xPercent: 0,
    opacity: 1,
    stagger: .1,
    duration: 1,
    ease: Power4,
}, 'b')

tl.from("#canvas2", {
    scale: 0,
}, 'c').to("#canvas2", {
    scale: 1,
    duration: 1,
    ease: Power2,
}, 'c')

const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero-sect",
        start: "top top",
        end: "bottom top",
        scrub: 2,
    },
})
tl2.to("#canvas2", {
    scale: 5,
    opacity: 0,
    stagger: .03,
    ease: Power4,
})

const tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".main",
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: 2,
    },
})

tl3.to(".main", {
    '--circle': "0%",
    ease: Power2,
}, 'tl3a').to(".video", {
    opacity: 0.3
}, 'tl3a').from("#circularTextCanvas", {
    scale: 0.5
}, "tl3a").to("#circularTextCanvas", {
    scale: 10,
    delay: 3,
    display:"none"
})

const tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: ".container3",
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: 2,
    },
})
tl4.to(".col3", {
    yPercent: -100,
    opacity: 0
})
const tl5 = gsap.timeline({
    scrollTrigger: {
        trigger: ".container2-bg",
        start: "top 100px",
        end: "-100px top",
        pin: true,
        scrub: 2,
    },
})

tl5.from(".odd", {
    xPercent: -110,
}).to(".odd", {
    xPercent: 0,
    stagger: true
})
tl5.from(".even", {
    xPercent: 110,
}).to(".even", {
    xPercent: 0,
    stagger: true
})
