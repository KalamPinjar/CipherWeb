

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
})

const avatarButton = document.getElementById("avatarButton")
const userDropdown = document.getElementById("userDropdown")
avatarButton.addEventListener('click', function(){
    userDropdown.classList.toggle("userDropdownShow")
    console.log("clicked")
})