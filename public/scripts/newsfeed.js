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
  var firestore = firebase.firestore();
  
  const sumbitBtn = document.querySelector('#submit');
  
  let userLocation = document.querySelector('#userLocation');
  let userDate = document.querySelector('#userDate');
  let userTime = document.querySelector('#userTime');
  
  const db = firestore.collection("contactData");
  
  sumbitBtn.addEventListener('click', function(){
    let userLocationInput = userLocation.value;
    let userDateInput = userDate.value;
    let userTimeInput = userTime.value;
  
    db.doc().set({
      location: userLocationInput,
      date: userDateInput,
      time: userTimeInput
    }).then(function(){ 
      console.log("data saved")
    }).catch(function(error){
      console.log(error);
    })
  })