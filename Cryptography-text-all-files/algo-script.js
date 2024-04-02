let canvas5, ctx1, w, h, dots;
let mouse = {
	x: undefined,
	y: undefined
}

function init() {
	canvas5 = document.querySelector("#canvas5");
	ctx1 = canvas5.getContext("2d");

	resizeReset();
	animationLoop();
}

function resizeReset() {
	w = canvas5.width = window.innerWidth;
	h = canvas5.height = window.innerHeight;

	dots = [];
	for (let i = 0; i < 500; i++) {
		dots.push(new Dot());
	}
}

function mousemove(e) {
	mouse.x = e.x;
	mouse.y = e.y;
}

function mouseout() {
	mouse.x = undefined;
	mouse.y = undefined;
}

function animationLoop() {
	ctx1.clearRect(0, 0, w, h);
	ctx1.globalCompositeOperation = 'lighter';
	drawScene();
	requestAnimationFrame(animationLoop);
}

function drawScene() {
	for (let i = 0; i < dots.length; i++) {
		dots[i].update();
		dots[i].draw();
	}
}

function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

function easeOutQuad(x) {
	return 1 - (1 - x) * (1 - x);
}
function easeOutElastic(x) {
	const c4 = (2 * Math.PI) / 3;

	return x === 0
		? 0
		: x === 1
			? 1
			: Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

class Dot {
	constructor() {
		this.reset();
		this.constructed = true;
	}
	reset() {
		this.x = getRandomInt(0, w);
		this.y = getRandomInt(h * 1, h * 1.3);
		this.baseX = this.x;
		this.baseY = this.y;

		if (mouse.x) {
			this.centerX = mouse.x;
		} else {
			this.centerX = getRandomInt(0, w);
		}

		this.size = getRandomInt(1, 4);

		if (this.constructed) {
			this.rgba = [0, 199, 16, 0.5];
		} else {
			this.rgba = [0, 0, 0, 0];
		}

		this.time = 0;
		this.ttl = getRandomInt(100, 500);
	}
	draw() {
		ctx1.beginPath();
		ctx1.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx1.fillStyle = `rgba(${this.rgba[0]} ,${this.rgba[1]} ,${this.rgba[2]} ,${this.rgba[3]})`;
		ctx1.fill();
		ctx1.closePath();
	}
	update() {
		if (this.time <= this.ttl) {
			let progress = 1 - (this.ttl - this.time) / this.ttl;

			this.x = this.baseX + ((this.centerX - this.baseX) * easeOutElastic(progress));
			this.y = this.baseY - (this.baseY * easeOutQuad(progress));

			this.time++;
		} else {
			this.reset();
		}
	}
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("click", mousemove);
window.addEventListener("mouseout", mouseout);


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


gsap.set(".container", { opacity: 0, y: 500 })
gsap.to(".container", {
	opacity: 1,
	delay: 2,
	y: 0,
	duration: 2,
	ease: Power2
})

const avatarButton = document.getElementById("avatarButton")
const userDropdown = document.getElementById("userDropdown")
avatarButton.addEventListener('click', function () {
	userDropdown.classList.toggle("userDropdownShow")
})
