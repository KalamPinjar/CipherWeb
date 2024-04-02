
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, set, onValue, push, update, remove, get, child } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getStorage, ref as sref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
import { getFirestore, collection, addDoc, doc, setDoc, Timestamp, getDocs, query, orderBy, deleteDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
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
    measurementId: "G-KL8BY17RQH"
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
    if (user) {
        // User is signed in, fetch their history
        const userHistoryRef = collection(dbstore, 'users', user.uid, 'history');
        const orderedHistoryRef = query(userHistoryRef, orderBy('Date', 'desc'));
        getDocs(orderedHistoryRef).then((querySnapshot) => {

            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // Here, you can append the data to your HTML to display it
            const historyData = querySnapshot.docs.map(doc => doc.data());
            displayHistory(historyData);


        }).catch((error) => {
            console.error("Error getting documents: ", error);
        });
    }
});
const historyHolder = document.querySelector(".history-holder");


function displayHistory(historyData) {
    const historyHolder = document.querySelector(".history-holder");
    historyHolder.innerHTML = '';

    if (historyData.length === 0) {
        // If there's no history, display a message
        historyHolder.innerHTML = `
            <center><p class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400 underline">No Activity Found</p></center>
        `;
    }
    else {


        historyData.forEach(item => {
            let historyItemHtml = `
                    <li class="mb-10 ms-4">
                    <div
                        class="absolute border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700 mt-1.5 border rounded-full w-3 h-3 -start-1.5">
                    </div>
                    <time id="timestamp"
                        class="mb-1 font-normal text-gray-400 text-sm dark:text-gray-500 leading-none">${item.Date.toDate()}</time>
                    <h3 id="Algorithm-title" class="font-semibold text-gray-900 text-lg dark:text-white">${item.AlgorithmTitle}
                    </h3>
                    `;

            if (item.plainText) {
                historyItemHtml += `<p id="plaintext" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">plainText: ${item.plainText}</p>`;
            }
            if (item.mode) {
                historyItemHtml += `<p id="mode" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">mode: ${item.mode}</p>`;
            }
            if (item.key) {
                historyItemHtml += `<p id="key" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">key: ${item.key}</p>`;
            }
            if (item.cipherText) {
                historyItemHtml += `<p id="ecoded-text" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">cipherText: ${item.cipherText}</p>`;
            }
            if (item.encryptedText) {
                historyItemHtml += `<p id="encryptedText" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">encryptedText: ${item.encryptedText}</p>
                `
            }
            if (item.decryptedText) {
                historyItemHtml += `<p id="decryptedText" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">decryptedText: ${item.decryptedText}</p>
                `
            }
            if (item.Decryptoutput) {
                historyItemHtml += `<p id="Decryptoutput" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">Decryptoutput: ${item.Decryptoutput}</p>
                `
            }
            if (item.encodedText) {
                historyItemHtml += `<p id="encodedText" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">encodedText: ${item.encodedText}</p>
                `
            }
            if (item.decodedText) {
                historyItemHtml += `<p id="decodedText" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">decodedText: ${item.decodedText}</p>
                `
            }
            if (item.privateKey) {
                historyItemHtml += `<p id="private-key" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">privateKey: ${item.privateKey}</p>
                `
            }
            if (item.publicKey) {
                historyItemHtml += `<p id="public-key" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">publicKey: ${item.publicKey}</p>
                `
            }
            if (item.SHA256Hash) {
                historyItemHtml += `<p id="SHA256Hash" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">SHA256Hash: ${item.SHA256Hash}</p>
                `
            }
            if (item.Output) {
                historyItemHtml += `<p id="Output" class="mb-4 font-normal text-base text-gray-500 dark:text-gray-400">Output: ${item.Output}</p>
                `

            }
            historyItemHtml += `</li>`;

            historyHolder.innerHTML += historyItemHtml;



        })
    }
}

onAuthStateChanged(auth, (user) => {
    const deleteData = document.querySelector("#deleteData")
    deleteData.addEventListener('click', e => {
        console.log("clicked")
        if (user) {
            deleteDoc(doc(dbstore, 'users', user.uid, 'history'));

            const toastMsgSignOut = document.getElementById("toast-signout")

            toastMsgSignOut.innerHTML = `<div
            class="inline-flex flex-shrink-0 justify-center items-center bg-blue-100 dark:bg-blue-800 rounded-lg w-8 h-8 text-blue-500 dark:text-blue-200">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z" />
            </svg>
            <span class="sr-only">Fire icon</span>
        </div>
        <div class="font-normal text-sm ms-3">Data Deleted!</div>
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

            // setTimeout(() => {

            //     window.location.reload()
            // }, 1500)
        }
        else {

            const toastMsgSignOut = document.getElementById("toast-signout")

            toastMsgSignOut.innerHTML = `<div
            class="inline-flex flex-shrink-0 justify-center items-center bg-blue-100 dark:bg-blue-800 rounded-lg w-8 h-8 text-blue-500 dark:text-blue-200">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z" />
            </svg>
            <span class="sr-only">Fire icon</span>
        </div>
        <div class="font-normal text-sm ms-3">Error Deleting Data!</div>
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

        }
    })
})