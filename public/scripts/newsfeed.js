var firebaseConfig = {
  apiKey: "AIzaSyCZPXuNfGsGrzKsY8500EWDp0r4vzd4DZs",
  authDomain: "photogether-182.firebaseapp.com",
  databaseURL: "https://photogether-182.firebaseio.com",
  projectId: "photogether-182",
  storageBucket: "photogether-182.appspot.com",
  messagingSenderId: "683626202101",
  appId: "1:683626202101:web:e5993e914431b2ee4896bc",
  measurementId: "G-6GP7JCJWT4"
};

// init firebase

firebase.initializeApp(firebaseConfig);
let firestore = firebase.firestore();
//let loginStuff = firebase.auth();

const sumbitBtn = document.querySelector('#submit');

let userLocation = document.querySelector('#userLocation');
let userDate = document.querySelector('#userDate');
let userTime = document.querySelector('#userTime');
let userDescription = document.querySelector('#userDescription');
let userURL = document.querySelector('#userURL');

const db = firestore.collection("eventData");

sumbitBtn.addEventListener('click', function(){
  let userLocationInput = userLocation.value;
  let userDateInput = userDate;
  let userTimeInput = userTime.value;
  let userDescriptionInput = userDescription.value;
  let userURLInput = userURL.value;
  console.log(userDate);
  db.doc().set({
    location: userLocationInput,
    date: userDateInput.value,
    time: userTimeInput,
    description : userDescriptionInput,
    url : userURLInput,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(function(){ 
    console.log("data saved");
    alert("Event created!");
    window.location.href = "foryou.html";
  }).catch(function(error){
    console.log(error);
  })
  
});