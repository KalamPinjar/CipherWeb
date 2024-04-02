// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, set, onValue, push, update, remove, get, child } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getStorage, ref as sref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
import { getFirestore, collection, addDoc, doc, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxRzkNAyNIr6GnJE7GGic2kOJh_xQoQQ0",
    authDomain: "cipherweb-a2c6b.firebaseapp.com",
    projectId: "cipherweb-a2c6b",
    storageBucket: "cipherweb-a2c6b.appspot.com",
    messagingSenderId: "169319433436",
    appId: "1:169319433436:web:3f420e647573d50e6fe019",
    measurementId: "G-KL8BY17RQH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const user = auth.currentUser;

const database = getDatabase(app);
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);
// Create a storage reference from our storage service
const dbstore = getFirestore(app);


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
            userProfile.src = profile.photoURL
            set(ref(database, 'user/' + user.uid), {
                name: profile.displayName,
                email: profile.email,
                password: "Hidden"
            })
        });
        navLogin.style.visibility = "hidden"


    }
    else {

        // window.location.href = "/Login/Form.html"

    }
})



const signOutbtn = document.getElementById("signout")

signOutbtn.addEventListener('click', function () {

    const toastMsgSignOut = document.getElementById("toast-signout")

    signOut(auth).then(() => {
        toastMsgSignOut.innerHTML = `<div
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
        toastMsgSignOut.classList.add("toastanime")

        setTimeout(() => {
            toastMsgSignOut.classList.remove("toastanime")
        }, 3000)
        // console.log("user signed out!")

        setTimeout(() => {
            window.location.href = "/LandingPage/landing-page.html"

        }, 2000);
        const navLogin = document.getElementById("nav-login")
        navLogin.style.visibility = "visible"



    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
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