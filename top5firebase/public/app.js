import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";



document.addEventListener('DOMContentLoaded', function () {
  const loadEl = document.querySelector('#load');

  const firebaseConfig = {
    apiKey: "AIzaSyD0Msc2-X0EPGypf7Ab6_wxJfbvgTaMnIQ",
    authDomain: "top5firebasetest.firebaseapp.com",
    databaseURL: "https://top5firebasetest-default-rtdb.firebaseio.com",
    projectId: "top5firebasetest",
    storageBucket: "top5firebasetest.appspot.com",
    messagingSenderId: "199215822031",
    appId: "1:199215822031:web:d37067efc5001fbd8ff3ba",
    measurementId: "G-WVN3YXZGLQ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  // Get a reference to the database service
  const database = firebase.database();

  // Retrieve data from the database and create HTML table rows
  database.ref("top_songs").once("value", function (snapshot) {
    const data = snapshot.val();
    let html = "";
    Object.keys(data).forEach(function (key) {
      html += "<tr><td>" + data[key].ranking + "</td><td>" + data[key].title + "</td><td>" + data[key].artist + "</td></tr>";
    });
    document.getElementById("table-body").innerHTML = html;
  });

  // Add event listener to form submission
  document.getElementById("form-1").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the values from the form
    const ranking = document.getElementById("ranking").value;
    const title = document.getElementById("title").value;
    const artist = document.getElementById("artist").value;

    // Update the data in the database
    database.ref("top_songs/" + ranking).set({
      ranking: ranking,
      title: title,
      artist: artist
    }).then(() => {
      // Redirect to index.html
      window.location.href = "index.html";
    }).catch((error) => {
      console.error("Error updating data: ", error);
    });
  });

  try {
    let app = firebase.app();
    let features = [
      'auth',
      'database',
      'firestore',
      'functions',
      'messaging',
      'storage',
      'analytics',
      'remoteConfig',
      'performance',
    ].filter(feature => typeof app[feature] === 'function');
    loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
  } catch (e) {
    console.error(e);
    loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
  }
});