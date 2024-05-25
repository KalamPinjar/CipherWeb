<<<<<<< HEAD

VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 1,
});

//It also supports NodeList
VanillaTilt.init(document.querySelectorAll(".card"));



const canvas1 = document.getElementById('canvas2')
const ctx1 = canvas1.getContext('2d')
canvas1.width = window.innerWidth
canvas1.height = window.innerHeight

let gradient = ctx1.createRadialGradient(
    canvas1.width / 2,
    canvas1.height / 2,
    100,
    canvas1.width / 2,
    canvas1.height / 2, canvas1.width / 2)

gradient.addColorStop(0, '#00da00')
gradient.addColorStop(0.5, '#008500')
gradient.addColorStop(1, '#006100')

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = `アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`
        this.x = x
        this.y = y
        this.text = ''
        this.fontSize = fontSize
        this.canvasHeight = canvasHeight
    }
    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length))

        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize)
        if (this.y * this.fontSize > this.canvasHeight &&
            Math.random() > 0.98) {
            this.y = 0
        }
        else {
            this.y += 1
        }
    }


}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.fontSize = 15
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = []
        this.#initialize()
        // console.log(this.symbols)
    }
    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight)

        }

    } reSize(width, height) {
        this.canvasWidth = width
        this.canvasHeight = height
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = []
        this.#initialize()
    }
}

const effect = new Effect(canvas1.width, canvas1.height)

let lastTime = 0
const fps = 30
const nextFrame = 1000 / fps
let timer = 0

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp

    if (timer > nextFrame) {
        ctx1.fillStyle = `rgb(1, 5, 0,0.09)`
        ctx1.textAlign = 'center'
        ctx1.fillRect(0, 0, canvas1.width, canvas1.height)
        // ctx1.fillStyle = '#0aff0a '
        ctx1.fillStyle = gradient
        ctx1.font = effect.fontSize + `px monospace`
        effect.symbols.forEach(symbol => symbol.draw(ctx1))
        timer = 0
    }
    else {
        timer += deltaTime
    }

    requestAnimationFrame(animate)
}
animate(0)

window.addEventListener('resize', function () {

    canvas1.width = window.innerWidth
    canvas1.height = window.innerHeight
    effect.reSize(canvas1.width, canvas1.height)

    gradient = ctx1.createRadialGradient(
        canvas1.width / 2,
        canvas1.height / 2,
        100,
        canvas1.width / 2,
        canvas1.height / 2, canvas1.width / 2)

    gradient.addColorStop(0, '#00da00')
    gradient.addColorStop(0.5, '#008500')
    gradient.addColorStop(1, '#006100')
})


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





    var circCanvas = document.getElementById("circularTextCanvas"),
        circCtx = circCanvas.getContext('2d'),
        circW = circCanvas.width,
        circH = circCanvas.height,
        circCx = circW * 0.5,
        circCy = circH * 0.5,
        text = new Text(circCtx, circCx, circCy, 'CONNECT WITH CIPHER', '32px sans-serif', 170);

    text.render();

    function Text(circCtx, circCx, circCy, txt, font, radius) {

        circCtx.textBaseline = 'bottom';
        circCtx.textAlign = 'center';
        circCtx.fillStyle = "white"
        circCtx.font = font;

        this.rotation = 0;

        var charsSplit = txt.split(''),
            chars = [],
            scale = 0.01,
            step = 0.01,
            i = 0, ch;

        for (; ch = charsSplit[i++];)
            chars.push(new Char(circCtx, ch));

        this.render = function () {

            var i = 0, ch, circW = this.rotation * Math.PI / -180;

            for (; ch = chars[i++];) {
                ch.x = circCx + radius * Math.cos(circW);
                ch.y = circCy + radius * Math.sin(circW);
                circCtx.save();
                circCtx.translate(ch.x, ch.y);
                circCtx.rotate(circW + 0.5 * Math.PI);
                circCtx.translate(-ch.x, -ch.y);
                circCtx.fillText(ch.char, ch.x, ch.y);
                circCtx.restore();

                circW += ch.width * scale;
            }
        };

    }

    function Char(circCtx, ch) {
        this.char = ch;
        this.width = circCtx.measureText('W').width;
        this.x = 0;
        this.y = 0;
    }


    gsap.to(text, {
        rotation: 360,
        ease: "none",
        opacity: 1,
        onUpdate: () => {
            circCtx.clearRect(0, 0, circW, circH);
            text.render();
        },
        scrollTrigger: {
            trigger: ".container-canvasCircular",
            scrub: 3,
            start: "top top",
            pin: true,
            end: "+=100%",
        }
    });

    //smooth scroll
    const lenis = new Lenis()


    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)


    const productList = document.querySelectorAll("#dropdown-products li")

    productList.forEach(list => {
        list.addEventListener("mouseover", e => {
            e.target.style.textDecoration = "underline"
            e.stopPropagation()
        })
        list.addEventListener("mouseout", e => {
            e.target.style.textDecoration = "none"
            e.stopPropagation()
        })
    })
})


const avatarButton = document.getElementById("avatarButton")
const userDropdown = document.getElementById("userDropdown")
avatarButton.addEventListener('click', function () {
    userDropdown.classList.toggle("userDropdownShow")
    // console.log("clicked")
})

=======

VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 1,
});

//It also supports NodeList
VanillaTilt.init(document.querySelectorAll(".card"));



const canvas1 = document.getElementById('canvas2')
const ctx1 = canvas1.getContext('2d')
canvas1.width = window.innerWidth
canvas1.height = window.innerHeight

let gradient = ctx1.createRadialGradient(
    canvas1.width / 2,
    canvas1.height / 2,
    100,
    canvas1.width / 2,
    canvas1.height / 2, canvas1.width / 2)

gradient.addColorStop(0, '#00da00')
gradient.addColorStop(0.5, '#008500')
gradient.addColorStop(1, '#006100')

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = `アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`
        this.x = x
        this.y = y
        this.text = ''
        this.fontSize = fontSize
        this.canvasHeight = canvasHeight
    }
    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length))

        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize)
        if (this.y * this.fontSize > this.canvasHeight &&
            Math.random() > 0.98) {
            this.y = 0
        }
        else {
            this.y += 1
        }
    }


}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.fontSize = 15
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = []
        this.#initialize()
        // console.log(this.symbols)
    }
    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight)

        }

    } reSize(width, height) {
        this.canvasWidth = width
        this.canvasHeight = height
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = []
        this.#initialize()
    }
}

const effect = new Effect(canvas1.width, canvas1.height)

let lastTime = 0
const fps = 30
const nextFrame = 1000 / fps
let timer = 0

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp

    if (timer > nextFrame) {
        ctx1.fillStyle = `rgb(1, 5, 0,0.09)`
        ctx1.textAlign = 'center'
        ctx1.fillRect(0, 0, canvas1.width, canvas1.height)
        // ctx1.fillStyle = '#0aff0a '
        ctx1.fillStyle = gradient
        ctx1.font = effect.fontSize + `px monospace`
        effect.symbols.forEach(symbol => symbol.draw(ctx1))
        timer = 0
    }
    else {
        timer += deltaTime
    }

    requestAnimationFrame(animate)
}
animate(0)

window.addEventListener('resize', function () {

    canvas1.width = window.innerWidth
    canvas1.height = window.innerHeight
    effect.reSize(canvas1.width, canvas1.height)

    gradient = ctx1.createRadialGradient(
        canvas1.width / 2,
        canvas1.height / 2,
        100,
        canvas1.width / 2,
        canvas1.height / 2, canvas1.width / 2)

    gradient.addColorStop(0, '#00da00')
    gradient.addColorStop(0.5, '#008500')
    gradient.addColorStop(1, '#006100')
})


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





    var circCanvas = document.getElementById("circularTextCanvas"),
        circCtx = circCanvas.getContext('2d'),
        circW = circCanvas.width,
        circH = circCanvas.height,
        circCx = circW * 0.5,
        circCy = circH * 0.5,
        text = new Text(circCtx, circCx, circCy, 'CONNECT WITH CIPHER', '32px sans-serif', 170);

    text.render();

    function Text(circCtx, circCx, circCy, txt, font, radius) {

        circCtx.textBaseline = 'bottom';
        circCtx.textAlign = 'center';
        circCtx.fillStyle = "white"
        circCtx.font = font;

        this.rotation = 0;

        var charsSplit = txt.split(''),
            chars = [],
            scale = 0.01,
            step = 0.01,
            i = 0, ch;

        for (; ch = charsSplit[i++];)
            chars.push(new Char(circCtx, ch));

        this.render = function () {

            var i = 0, ch, circW = this.rotation * Math.PI / -180;

            for (; ch = chars[i++];) {
                ch.x = circCx + radius * Math.cos(circW);
                ch.y = circCy + radius * Math.sin(circW);
                circCtx.save();
                circCtx.translate(ch.x, ch.y);
                circCtx.rotate(circW + 0.5 * Math.PI);
                circCtx.translate(-ch.x, -ch.y);
                circCtx.fillText(ch.char, ch.x, ch.y);
                circCtx.restore();

                circW += ch.width * scale;
            }
        };

    }

    function Char(circCtx, ch) {
        this.char = ch;
        this.width = circCtx.measureText('W').width;
        this.x = 0;
        this.y = 0;
    }


    gsap.to(text, {
        rotation: 360,
        ease: "none",
        opacity: 1,
        onUpdate: () => {
            circCtx.clearRect(0, 0, circW, circH);
            text.render();
        },
        scrollTrigger: {
            trigger: ".container-canvasCircular",
            scrub: 3,
            start: "top top",
            pin: true,
            end: "+=100%",
        }
    });

    //smooth scroll
    const lenis = new Lenis()


    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)


    const productList = document.querySelectorAll("#dropdown-products li")

    productList.forEach(list => {
        list.addEventListener("mouseover", e => {
            e.target.style.textDecoration = "underline"
            e.stopPropagation()
        })
        list.addEventListener("mouseout", e => {
            e.target.style.textDecoration = "none"
            e.stopPropagation()
        })
    })
})


const avatarButton = document.getElementById("avatarButton")
const userDropdown = document.getElementById("userDropdown")
avatarButton.addEventListener('click', function () {
    userDropdown.classList.toggle("userDropdownShow")
    // console.log("clicked")
})

>>>>>>> c5efcf90365f4729bb9a298f5099f5eabf99d58e
