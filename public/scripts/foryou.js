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

console.log("At the top.");

// Loads chat messages history and listens for upcoming ones.
function loadMessages() {
    // Create the query to load the last 4 messages and listen for new ones.
    console.log("hello world");
    var query = firestore
                    .collection('eventData')
                    .orderBy('timestamp', 'desc')
                    .limit(4);
    
    // Start listening to the query.
    var index = 0;
    var picArray = ["","","",""];
    var locations = ["","","",""];
    var timeDate = ["","","",""];
    var timeStamps = ["","","",""];
    var descriptions = ["","","",""];
    var usernames = ["","","",""];

    query.onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === 'removed') {
          deleteMessage(change.doc.id);
        } else {
          
          var event = change.doc.data();
          picArray[index] = event.url;
          locations[index] = event.location;
          timeStamps[index] = event.timestamp;
          timeDate[index] = event.date + " " + event.time;
          descriptions[index] = event.description;
          usernames[index] = event.username;

          index += 1;
          //displayMessage(change.doc.id, event.location, event.date,
                         //event.time, event.description, event.url, event.timestamp);
        }
      });

      document.getElementById("pic1").src=`${picArray[0]}`;
      document.getElementById("pic2").src=`${picArray[1]}`;
      document.getElementById("pic3").src=`${picArray[2]}`;
      document.getElementById("pic4").src=`${picArray[3]}`;

      document.getElementById("location1").innerHTML=`${locations[0]}`;
      document.getElementById("location2").innerHTML=`${locations[1]}`;
      document.getElementById("location3").innerHTML=`${locations[2]}`;
      document.getElementById("location4").innerHTML=`${locations[3]}`;
      
      var utcSec1 = timeStamps[0].seconds;
      var d1 = new Date(0);
      d1.setUTCSeconds(utcSec1);
      var utcSec2 = timeStamps[1].seconds;
      var d2 = new Date(0);
      d2.setUTCSeconds(utcSec1);
      var utcSec1 = timeStamps[2].seconds;
      var d3 = new Date(0);
      d3.setUTCSeconds(utcSec1);
      var utcSec1 = timeStamps[3].seconds;
      var d4 = new Date(0);
      d4.setUTCSeconds(utcSec1);

      document.getElementById("timestamp1").innerHTML=`${d1}`;
      document.getElementById("timestamp2").innerHTML=`${d2}`;
      document.getElementById("timestamp3").innerHTML=`${d3}`;
      document.getElementById("timestamp4").innerHTML=`${d4}`;

      document.getElementById("td1").innerHTML=`${timeDate[0]}`;
      document.getElementById("td2").innerHTML=`${timeDate[1]}`;
      document.getElementById("td3").innerHTML=`${timeDate[2]}`;
      document.getElementById("td4").innerHTML=`${timeDate[3]}`;

      document.getElementById("desc1").innerHTML=`${descriptions[0]}`;
      document.getElementById("desc2").innerHTML=`${descriptions[1]}`;
      document.getElementById("desc3").innerHTML=`${descriptions[2]}`;
      document.getElementById("desc4").innerHTML=`${descriptions[3]}`;

      document.getElementById("user1").innerHTML=`${usernames[0]}`;
      document.getElementById("user2").innerHTML=`${usernames[1]}`;
      document.getElementById("user3").innerHTML=`${usernames[2]}`;
      document.getElementById("user4").innerHTML=`${usernames[3]}`;
      
    });
}
  
// Delete a Message from the UI.
function deleteMessage(id) {
    var div = document.getElementById(id);
    // If an element for that message exists we delete it.
    if (div) {
      div.parentNode.removeChild(div);
    }
  }

var eventListElement = document.getElementById('eventData');
var messageFormElement = document.getElementById('event-form');
var messageInputElement = document.getElementById('event');

var attendButtonElement1 = document.getElementById('attend1');
var attendButtonElement2 = document.getElementById('attend2');
var attendButtonElement3 = document.getElementById('attend3');
var attendButtonElement4 = document.getElementById('attend4');

attendButtonElement1.addEventListener('click', function(){
    if (attendButtonElement1.innerHTML != "Unattend") {
        attendButtonElement1.innerHTML="Unattend";
        attendButtonElement1.style.backgroundColor  = "#ff0000";
    }
    else {
        attendButtonElement1.innerHTML="Attend";
        attendButtonElement1.style.backgroundColor  = "green";
    }
    });

    attendButtonElement2.addEventListener('click', function(){
    if (attendButtonElement2.innerHTML != "Unattend") {
        attendButtonElement2.innerHTML="Unattend";
        attendButtonElement2.style.backgroundColor  = "#ff0000";
    }
    else {
        attendButtonElement2.innerHTML="Attend";
        attendButtonElement2.style.backgroundColor  = "green";
    }
    });

    attendButtonElement3.addEventListener('click', function(){
    if (attendButtonElement3.innerHTML != "Unattend") {
        attendButtonElement3.innerHTML="Unattend";
        attendButtonElement3.style.backgroundColor  = "#ff0000";
    }
    else {
        attendButtonElement3.innerHTML="Attend";
        attendButtonElement3.style.backgroundColor  = "green";
    }
    });

    attendButtonElement4.addEventListener('click', function(){
    if (attendButtonElement4.innerHTML != "Unattend") {
        attendButtonElement4.innerHTML="Unattend";
        attendButtonElement4.style.backgroundColor  = "#ff0000";
    } 
    else {
        attendButtonElement4.innerHTML="Attend";
        attendButtonElement4.style.backgroundColor = "green";
    }
    });

loadMessages();


