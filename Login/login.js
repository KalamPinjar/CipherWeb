// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { signInWithEmailAndPassword, signInWithRedirect, getRedirectResult, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, set, onValue, push, update, remove, get, child } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getStorage, ref as sref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
      //your config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const provider2 = new FacebookAuthProvider();
const provider3 = new GithubAuthProvider();
const database = getDatabase(app);
const storage = getStorage(app);
const user = auth.currentUser;
// const upload = document.getElementById("upload");
onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        // console.log(user.uid)
        const userloggedin = document.getElementById("userloggedin")
        userloggedin.style.display = "block"
        const signout = document.getElementById("signout")
        signout.style.display = "block"
        const storageRef = sref(storage, `profilePic/${user.uid}`);
        getDownloadURL(sref(storage, storageRef))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'

                // Or inserted into an <img> element

                const userProfile = document.getElementById("avatarButton")
                userProfile.setAttribute('src', url)
            })
            .catch((error) => {
                // Handle any errors
            });
    } else {
        const userloggedin = document.getElementById("userloggedin")
        userloggedin.style.display = "none"
        const signout = document.getElementById("signout")
        signout.style.display = "none"
    }
})
onAuthStateChanged(auth, (user) => {
    if (user !== null) {

        const navLogin = document.getElementById("nav-login")

        const userProfile = document.getElementById("avatarButton")
        const userEmail = document.getElementById("user-email")

        user.providerData.forEach((profile) => {
            // console.log("Sign-in provider: " + profile.providerId);
            // console.log("  Provider-specific UID: " + profile.uid);
            // console.log("  Name: " + profile.displayName);
            // console.log("  Email: " + profile.email);
            // console.log("  Photo URL: " + profile.photoURL);
            userEmail.textContent = profile.email
            if (profile.photoURL) {
                userProfile.src = profile.photoURL

            }


            set(ref(database, 'user/' + user.uid), {
                name: profile.displayName,
                email: profile.email,
                password: "Hidden"
            })
        });
        navLogin.style.visibility = "hidden"
    }
    else {

        if (document.referrer.includes("/dashboard.html") || document.referrer.includes("/history.html")) {
            const toastMsg = document.getElementById("toast-default")
            toastMsg.innerHTML = `<div
                class="inline-flex flex-shrink-0 justify-center items-center bg-blue-100 dark:bg-blue-800 rounded-lg w-8 h-8 text-blue-500 dark:text-blue-200">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z" />
                </svg>
                <span class="sr-only">Fire icon</span>
            </div>
            <div class="font-normal text-sm ms-3">Sign up First to access user dashboard!</div>
            <button type="button"
                class="inline-flex justify-center items-center bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 -mx-1.5 -my-1.5 p-1.5 rounded-lg w-8 h-8 text-gray-400 hover:text-gray-900 dark:hover:text-white ms-auto focus:ring-2 focus:ring-gray-300 dark:text-gray-500"
                data-dismiss-target="#toast-default" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>`
            toastMsg.classList.add("toastanime")

            setTimeout(() => {
                toastMsg.classList.remove("toastanime")
            }, 3000)
        }

    }
})
const signupBtn = document.getElementById("signup-btn")

signupBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const toastMsg = document.getElementById("toast-default")

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...

            toastMsg.innerHTML = `<div
            class="inline-flex flex-shrink-0 justify-center items-center bg-blue-100 dark:bg-blue-800 rounded-lg w-8 h-8 text-blue-500 dark:text-blue-200">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z" />
            </svg>
            <span class="sr-only">Fire icon</span>
        </div>
        <div class="font-normal text-sm ms-3">User Created !</div>
        <button type="button"
            class="inline-flex justify-center items-center bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 -mx-1.5 -my-1.5 p-1.5 rounded-lg w-8 h-8 text-gray-400 hover:text-gray-900 dark:hover:text-white ms-auto focus:ring-2 focus:ring-gray-300 dark:text-gray-500"
            data-dismiss-target="#toast-default" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>`
            toastMsg.classList.add("toastanime")

            setTimeout(() => {
                toastMsg.classList.remove("toastanime")
            }, 3000)

            set(ref(database, 'user/' + name), {
                name: name,
                email: email,
                password: "Hidden"
            })

            setTimeout(() => {
                window.location.href = "/LandingPage/landing-page.html"
            }, 4000)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            toastMsg.innerHTML = `<div
            class="inline-flex flex-shrink-0 justify-center items-center bg-blue-100 dark:bg-blue-800 rounded-lg w-8 h-8 text-blue-500 dark:text-blue-200">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z" />
            </svg>
            <span class="sr-only">Fire icon</span>
        </div>
        <div class="font-normal text-sm ms-3">${errorMessage}</div>
        <button type="button"
            class="inline-flex justify-center items-center bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 -mx-1.5 -my-1.5 p-1.5 rounded-lg w-8 h-8 text-gray-400 hover:text-gray-900 dark:hover:text-white ms-auto focus:ring-2 focus:ring-gray-300 dark:text-gray-500"
            data-dismiss-target="#toast-default" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>`
            toastMsg.classList.add("toastanime")

            setTimeout(() => {
                toastMsg.classList.remove("toastanime")
            }, 3000)
        });
})

const signinBtn = document.getElementById("signin")

signinBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const login_email = document.getElementById("login_email").value
    const login_password = document.getElementById("login_password").value

    const toastMsg = document.getElementById("toast-default")

    signInWithEmailAndPassword(auth, login_email, login_password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            toastMsg.innerHTML = `<div
            class="inline-flex flex-shrink-0 justify-center items-center bg-blue-100 dark:bg-blue-800 rounded-lg w-8 h-8 text-blue-500 dark:text-blue-200">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z" />
            </svg>
            <span class="sr-only">Fire icon</span>
        </div>
        <div class="font-normal text-sm ms-3">User Logged In !</div>
        <button type="button"
            class="inline-flex justify-center items-center bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 -mx-1.5 -my-1.5 p-1.5 rounded-lg w-8 h-8 text-gray-400 hover:text-gray-900 dark:hover:text-white ms-auto focus:ring-2 focus:ring-gray-300 dark:text-gray-500"
            data-dismiss-target="#toast-default" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>`
            toastMsg.classList.add("toastanime")

            setTimeout(() => {
                toastMsg.classList.remove("toastanime")
            }, 3000)
            setTimeout(() => {
                window.location.href = "/LandingPage/landing-page.html"
            }, 4000)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toastMsg.innerHTML = `<div
            class="inline-flex flex-shrink-0 justify-center items-center bg-blue-100 dark:bg-blue-800 rounded-lg w-8 h-8 text-blue-500 dark:text-blue-200">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z" />
            </svg>
            <span class="sr-only">Fire icon</span>
        </div>
        <div class="font-normal text-sm ms-3">${errorMessage}</div>
        <button type="button"
            class="inline-flex justify-center items-center bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 -mx-1.5 -my-1.5 p-1.5 rounded-lg w-8 h-8 text-gray-400 hover:text-gray-900 dark:hover:text-white ms-auto focus:ring-2 focus:ring-gray-300 dark:text-gray-500"
            data-dismiss-target="#toast-default" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>`
            toastMsg.classList.add("toastanime")

            setTimeout(() => {
                toastMsg.classList.remove("toastanime")
            }, 3000)
        });


})

const googleredirect = document.getElementById("googleredirect-signin")
const googleredirectSignup = document.getElementById("googleredirect-signup")
googleredirect.addEventListener('click', (e) => {
    signInWithRedirect(auth, provider);

    getRedirectResult(auth)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            // console.log(user)
            setTimeout(() => {

                window.location.href = "/LandingPage/landing-page.html"
            }, 3000)

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            // console.log(errorMessage, email, credential)
        });

})
googleredirectSignup.addEventListener('click', (e) => {
    signInWithRedirect(auth, provider);

    getRedirectResult(auth)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            // console.log(user)

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            // console.log(errorMessage, email, credential)
        });

})

const facebookredirectSignup = document.getElementById("facebookredirect-signup")
const facebookredirectSignin = document.getElementById("facebookredirect-signin")

facebookredirectSignup.addEventListener('click', (e) => {
    signInWithRedirect(auth, provider2);
    getRedirectResult(auth)
        .then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            // ...
        });
})
facebookredirectSignin.addEventListener('click', (e) => {
    signInWithRedirect(auth, provider2);
    getRedirectResult(auth)
        .then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            // ...
        });
})

const githubRedirectSignup = document.getElementById("githubredirect-signup")
const githubRedirectSignin = document.getElementById("githubredirect-signin")

githubRedirectSignup.addEventListener('click', (e) => {
    signInWithRedirect(auth, provider3);
    getRedirectResult(auth)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            if (credential) {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const token = credential.accessToken;
                // ...
            }

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
        });
})
githubRedirectSignin.addEventListener('click', (e) => {
    signInWithRedirect(auth, provider3);
    getRedirectResult(auth)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            if (credential) {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const token = credential.accessToken;
                // ...
            }

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
        });
})

const signOutbtn = document.getElementById("signout")

signOutbtn.addEventListener('click', function () {

    const toastMsg = document.getElementById("toast-default")
    signOut(auth).then(() => {
        // Sign-out successful.
        toastMsg.innerHTML = `<div
                class="inline-flex flex-shrink-0 justify-center items-center bg-blue-100 dark:bg-blue-800 rounded-lg w-8 h-8 text-blue-500 dark:text-blue-200">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z" />
                </svg>
                <span class="sr-only">Fire icon</span>
            </div>
            <div class="font-normal text-sm ms-3">User Signed Out !</div>
            <button type="button"
                class="inline-flex justify-center items-center bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 -mx-1.5 -my-1.5 p-1.5 rounded-lg w-8 h-8 text-gray-400 hover:text-gray-900 dark:hover:text-white ms-auto focus:ring-2 focus:ring-gray-300 dark:text-gray-500"
                data-dismiss-target="#toast-default" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>`
        toastMsg.classList.add("toastanime")

        setTimeout(() => {
            toastMsg.classList.remove("toastanime")
        }, 3000)
        setTimeout(() => {
            window.location.reload()
        }, 4000)
        // console.log("user signed out!")

        const navLogin = document.getElementById("nav-login")
        navLogin.style.visibility = "visible"

    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
})

window.addEventListener('load', () => {

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');



    signUpButton.addEventListener('click', () =>
        container.classList.add('right-panel-active'));

    signInButton.addEventListener('click', () =>
        container.classList.remove('right-panel-active'));


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
avatarButton.addEventListener('click', function () {
    userDropdown.classList.toggle("userDropdownShow")
    // console.log("clicked")
})
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
