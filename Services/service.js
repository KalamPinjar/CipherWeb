<<<<<<< HEAD

window.addEventListener('load', () => {
    const canvas = document.getElementById("canvas1")
    const ctx = canvas.getContext('2d')
    canvas.width = 150
    canvas.height = 150

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect
            this.x = Math.random() * this.effect.width
            this.y = 0
            this.originX = Math.floor(x)
            this.originY = Math.floor(y)
            this.color = color
            this.size = this.effect.gap
            this.vx = 0
            this.vy = 0
            this.ease = 0.05
            this.friction = 0.8
            this.dx = 0
            this.dy = 0
            this.distance = 0
            this.force = 0
            this.angle = 0
        }
        draw(context) {
            context.fillStyle = this.color
            context.fillRect(this.x, this.y, this.size, this.size)
        }
        update() {
            this.dx = this.effect.mouse.x - this.x
            this.dy = this.effect.mouse.y - this.y

            this.distance = this.dx * this.dx + this.dy * this.dy
            this.force = -this.effect.mouse.radius / this.distance

            if (this.distance < this.effect.mouse.radius) {
                this.angle = Math.atan2(this.dy, this.dx)
                this.vx += this.force * Math.cos(this.angle)
                this.vy += this.force * Math.sin(this.angle)
            }

            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease
        }
        wrap() {

            this.x = Math.random() * this.effect.width
            this.y = Math.random() * this.effect.height
            this.ease = 0.05
        }
    }

    class Effect {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.particlesArray = []
            this.image1 = document.getElementById('image1')
            this.centerX = this.width * 0.5
            this.centerY = this.height * 0.5
            this.imgsize = 200
            this.x = this.centerX - this.imgsize * 0.5
            this.y = this.centerY - this.imgsize * 0.5
            // console.log(image1.width)
            // console.log(image1.height)
            this.gap = 2
            this.mouse = {
                radius: 3000,
                x: undefined,
                y: undefined
            }
            window.addEventListener('mousemove', e => {
                this.mouse.x = e.x
                this.mouse.y = e.y
            })
            window.addEventListener('mouseout', e => {
                this.mouse.x = undefined
                this.mouse.y = undefined
            })
        }
        init(context) {
            context.drawImage(this.image1, this.x, this.y, this.imgsize, this.imgsize)
            const pixels = context.getImageData(0, 0, this.width, this.height).data
            // console.log(pixels)
            for (let y = 0; y < this.height; y += this.gap) {
                for (let x = 0; x < this.width; x += this.gap) {
                    const index = (y * this.width + x) * 4
                    const red = pixels[index]
                    const green = pixels[index + 1]
                    const blue = pixels[index + 2]
                    const alpha = pixels[index + 3]
                    const color = `rgb(${red},${green},${blue})`

                    if (alpha > 0) {
                        this.particlesArray.push(new Particle(this, x, y, color))
                    }
                }
            }
        }
        draw(context) {
            this.particlesArray.forEach(particle => {
                particle.draw(context)

            })

        }
        update() {
            this.particlesArray.forEach(particle => {
                particle.update()
            })
        }
        // wrap() {
        //     this.particlesArray.forEach(particle => {
        //         particle.wrap()
        //     })
        // }
    }


    const effect = new Effect(canvas.width, canvas.height)
    effect.init(ctx)
    // console.log(effect.particlesArray)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        effect.draw(ctx)
        effect.update()
        requestAnimationFrame(animate)
    }
    animate()



    const tl = gsap.timeline({ default: { duration: 1, ease: Expo.easeInOut, } })
    tl.to(".header", {
        opacity: 1
    }, 'a')
        .from(".navbar", {
            top: -100,
            opacity: 0
        }, 'a').to('.navbar', {
            opacity: 1,
            top: 0,
            duration: 1,
            ease: Expo.easeInOut,
            opacity: 1,
        }, 'a')

    //smooth scroll
    const lenis = new Lenis()


    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    let canvas4 = document.querySelector("#canvas2")

    let ctx4 = canvas4.getContext("2d")

    canvas4.width = window.innerWidth + 1000
    canvas4.height = window.innerHeight + 1000

    window.addEventListener("resize", function () {

        canvas4.width = window.innerWidth + 1000
        canvas4.height = window.innerHeight + 1000
        init()
    })

    // let colors = ['#5d03b1', '#004900', '#002e74',
    //     '#eb7d00', '#c400eb', '#2b00eb', '#00eb9d', '#eb0000',
    //     '#ffaa33', "white", "lime", "purple", "pink"]

    let colors = [
        "#00bdff",
        "#4d39ce",
        "#088eff",
        "red",
        "pink",
        "voilet",
        "white"
    ]

    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function randomColor(color) {
        return colorsCircle[Math.floor(Math.random() * colorsCircle.length)]
    }

    // const mouse = {
    //     x: null, y: null
    // }

    let mouseDown = false;

    window.addEventListener('mousedown', (event) => {
        mouseDown = true

    })
    window.addEventListener('mouseup', (event) => {
        mouseDown = false
    })
    // canvas4.addEventListener('mousemove', function (event) {
    //     mouse.x = event.x
    //     mouse.y = event.y

    // })

    let particle4ShadowBlur = 15
    class Particle4 {
        constructor(x, y, radius, color) {
            this.x = x
            this.y = y
            this.color = color
            this.radius = radius

         
        } update() {

            this.draw()
        }
        draw() {
            ctx4.beginPath()
            ctx4.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            ctx4.shadowColor = this.color
            ctx4.shadowBlur = particle4ShadowBlur
            ctx4.fillStyle = this.color
            ctx4.fill()
            ctx4.closePath()

       
        }


    }


    let particle4Array;
    function init() {
        particle4Array = []


        for (let i = 0; i < 800; i++) {

            const canvasWidth = canvas4.width 
            const canvasHeight = canvas4.height 
            const x = (Math.random() * canvasWidth) - canvasWidth / 2
            const y = (Math.random() * canvasHeight) - canvasHeight / 2
            const radius = 1.5 * Math.random()

            const color = colors[Math.floor(Math.random() * colors.length)]
            particle4Array.push(new Particle4(x, y, radius, color))

        }
        // console.log(particle4Array)
    }
    init()

    let radians = 0
    let alpha = 1
    let speed = 0.002

    function animate4() {
        // ctx4.clearRect(0, 0, canvas4.width, canvas4.height)
        ctx4.fillStyle = `rgba(0,0,0,${alpha})`
        ctx4.fillRect(0, 0, canvas4.width, canvas4.height)

        requestAnimationFrame(animate4)


        ctx4.save()
        ctx4.translate(canvas4.width / 2, canvas4.height / 2)
        ctx4.rotate(radians)

        particle4Array.forEach(particle4 => {
            particle4.update()
        })

        ctx4.restore()

        // Math.floor(Math.random() * 9)
        radians += speed
        if (mouseDown && alpha >= 0.1) {

            alpha -= 0.01

            speed += 0.0001
            // particle4ShadowBlur = 10

        } else if (!mouseDown && alpha < 1) {

            alpha += 0.01

            speed = 0.002
        }
    }
    animate4();
})
const avatarButton = document.getElementById("avatarButton")
const userDropdown = document.getElementById("userDropdown")
avatarButton.addEventListener('click', function(){
    userDropdown.classList.toggle("userDropdownShow")
    console.log("clicked")
=======

window.addEventListener('load', () => {
    const canvas = document.getElementById("canvas1")
    const ctx = canvas.getContext('2d')
    canvas.width = 150
    canvas.height = 150

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect
            this.x = Math.random() * this.effect.width
            this.y = 0
            this.originX = Math.floor(x)
            this.originY = Math.floor(y)
            this.color = color
            this.size = this.effect.gap
            this.vx = 0
            this.vy = 0
            this.ease = 0.05
            this.friction = 0.8
            this.dx = 0
            this.dy = 0
            this.distance = 0
            this.force = 0
            this.angle = 0
        }
        draw(context) {
            context.fillStyle = this.color
            context.fillRect(this.x, this.y, this.size, this.size)
        }
        update() {
            this.dx = this.effect.mouse.x - this.x
            this.dy = this.effect.mouse.y - this.y

            this.distance = this.dx * this.dx + this.dy * this.dy
            this.force = -this.effect.mouse.radius / this.distance

            if (this.distance < this.effect.mouse.radius) {
                this.angle = Math.atan2(this.dy, this.dx)
                this.vx += this.force * Math.cos(this.angle)
                this.vy += this.force * Math.sin(this.angle)
            }

            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease
        }
        wrap() {

            this.x = Math.random() * this.effect.width
            this.y = Math.random() * this.effect.height
            this.ease = 0.05
        }
    }

    class Effect {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.particlesArray = []
            this.image1 = document.getElementById('image1')
            this.centerX = this.width * 0.5
            this.centerY = this.height * 0.5
            this.imgsize = 200
            this.x = this.centerX - this.imgsize * 0.5
            this.y = this.centerY - this.imgsize * 0.5
            // console.log(image1.width)
            // console.log(image1.height)
            this.gap = 2
            this.mouse = {
                radius: 3000,
                x: undefined,
                y: undefined
            }
            window.addEventListener('mousemove', e => {
                this.mouse.x = e.x
                this.mouse.y = e.y
            })
            window.addEventListener('mouseout', e => {
                this.mouse.x = undefined
                this.mouse.y = undefined
            })
        }
        init(context) {
            context.drawImage(this.image1, this.x, this.y, this.imgsize, this.imgsize)
            const pixels = context.getImageData(0, 0, this.width, this.height).data
            // console.log(pixels)
            for (let y = 0; y < this.height; y += this.gap) {
                for (let x = 0; x < this.width; x += this.gap) {
                    const index = (y * this.width + x) * 4
                    const red = pixels[index]
                    const green = pixels[index + 1]
                    const blue = pixels[index + 2]
                    const alpha = pixels[index + 3]
                    const color = `rgb(${red},${green},${blue})`

                    if (alpha > 0) {
                        this.particlesArray.push(new Particle(this, x, y, color))
                    }
                }
            }
        }
        draw(context) {
            this.particlesArray.forEach(particle => {
                particle.draw(context)

            })

        }
        update() {
            this.particlesArray.forEach(particle => {
                particle.update()
            })
        }
        // wrap() {
        //     this.particlesArray.forEach(particle => {
        //         particle.wrap()
        //     })
        // }
    }


    const effect = new Effect(canvas.width, canvas.height)
    effect.init(ctx)
    // console.log(effect.particlesArray)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        effect.draw(ctx)
        effect.update()
        requestAnimationFrame(animate)
    }
    animate()



    const tl = gsap.timeline({ default: { duration: 1, ease: Expo.easeInOut, } })
    tl.to(".header", {
        opacity: 1
    }, 'a')
        .from(".navbar", {
            top: -100,
            opacity: 0
        }, 'a').to('.navbar', {
            opacity: 1,
            top: 0,
            duration: 1,
            ease: Expo.easeInOut,
            opacity: 1,
        }, 'a')

    //smooth scroll
    const lenis = new Lenis()


    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    let canvas4 = document.querySelector("#canvas2")

    let ctx4 = canvas4.getContext("2d")

    canvas4.width = window.innerWidth + 1000
    canvas4.height = window.innerHeight + 1000

    window.addEventListener("resize", function () {

        canvas4.width = window.innerWidth + 1000
        canvas4.height = window.innerHeight + 1000
        init()
    })

    // let colors = ['#5d03b1', '#004900', '#002e74',
    //     '#eb7d00', '#c400eb', '#2b00eb', '#00eb9d', '#eb0000',
    //     '#ffaa33', "white", "lime", "purple", "pink"]

    let colors = [
        "#00bdff",
        "#4d39ce",
        "#088eff",
        "red",
        "pink",
        "voilet",
        "white"
    ]

    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function randomColor(color) {
        return colorsCircle[Math.floor(Math.random() * colorsCircle.length)]
    }

    // const mouse = {
    //     x: null, y: null
    // }

    let mouseDown = false;

    window.addEventListener('mousedown', (event) => {
        mouseDown = true

    })
    window.addEventListener('mouseup', (event) => {
        mouseDown = false
    })
    // canvas4.addEventListener('mousemove', function (event) {
    //     mouse.x = event.x
    //     mouse.y = event.y

    // })

    let particle4ShadowBlur = 15
    class Particle4 {
        constructor(x, y, radius, color) {
            this.x = x
            this.y = y
            this.color = color
            this.radius = radius

         
        } update() {

            this.draw()
        }
        draw() {
            ctx4.beginPath()
            ctx4.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            ctx4.shadowColor = this.color
            ctx4.shadowBlur = particle4ShadowBlur
            ctx4.fillStyle = this.color
            ctx4.fill()
            ctx4.closePath()

       
        }


    }


    let particle4Array;
    function init() {
        particle4Array = []


        for (let i = 0; i < 800; i++) {

            const canvasWidth = canvas4.width 
            const canvasHeight = canvas4.height 
            const x = (Math.random() * canvasWidth) - canvasWidth / 2
            const y = (Math.random() * canvasHeight) - canvasHeight / 2
            const radius = 1.5 * Math.random()

            const color = colors[Math.floor(Math.random() * colors.length)]
            particle4Array.push(new Particle4(x, y, radius, color))

        }
        // console.log(particle4Array)
    }
    init()

    let radians = 0
    let alpha = 1
    let speed = 0.002

    function animate4() {
        // ctx4.clearRect(0, 0, canvas4.width, canvas4.height)
        ctx4.fillStyle = `rgba(0,0,0,${alpha})`
        ctx4.fillRect(0, 0, canvas4.width, canvas4.height)

        requestAnimationFrame(animate4)


        ctx4.save()
        ctx4.translate(canvas4.width / 2, canvas4.height / 2)
        ctx4.rotate(radians)

        particle4Array.forEach(particle4 => {
            particle4.update()
        })

        ctx4.restore()

        // Math.floor(Math.random() * 9)
        radians += speed
        if (mouseDown && alpha >= 0.1) {

            alpha -= 0.01

            speed += 0.0001
            // particle4ShadowBlur = 10

        } else if (!mouseDown && alpha < 1) {

            alpha += 0.01

            speed = 0.002
        }
    }
    animate4();
})
const avatarButton = document.getElementById("avatarButton")
const userDropdown = document.getElementById("userDropdown")
avatarButton.addEventListener('click', function(){
    userDropdown.classList.toggle("userDropdownShow")
    console.log("clicked")
>>>>>>> c5efcf90365f4729bb9a298f5099f5eabf99d58e
})