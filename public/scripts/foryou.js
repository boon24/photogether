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
    var dateTimeDescr = ["","","",""];
    var timeStamps = ["","","",""];

    query.onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === 'removed') {
          deleteMessage(change.doc.id);
        } else {
          
          var event = change.doc.data();
          picArray[index] = event.url;
          locations[index] = event.location;
          timeStamps[index] = event.timestamp;
          dateTimeDescr[index] = event.date + " " + event.time + " " + event.description;

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
      
      document.getElementById("timestamp1").innerHTML=`${timeStamps[0]}`;
      document.getElementById("timestamp2").innerHTML=`${timeStamps[1]}`;
      document.getElementById("timestamp3").innerHTML=`${timeStamps[2]}`;
      document.getElementById("timestamp4").innerHTML=`${timeStamps[3]}`;

      document.getElementById("dtd1").innerHTML=`${dateTimeDescr[0]}`;
      document.getElementById("dtd2").innerHTML=`${dateTimeDescr[1]}`;
      document.getElementById("dtd3").innerHTML=`${dateTimeDescr[2]}`;
      document.getElementById("dtd4").innerHTML=`${dateTimeDescr[3]}`;
    });
}
  
/*
function createAndInsertMessage(id, timestamp) {
    const container = document.createElement('div');
    container.innerHTML = MESSAGE_TEMPLATE;
    const div = container.firstChild;
    div.setAttribute('id', id);
  
    // If timestamp is null, assume we've gotten a brand new message.
    // https://stackoverflow.com/a/47781432/4816918
    timestamp = timestamp ? timestamp.toMillis() : Date.now();
    div.setAttribute('timestamp', timestamp);
  
    // figure out where to insert new message
    const existingMessages = messageListElement.children;
    if (existingMessages.length === 0) {
      messageListElement.appendChild(div);
    } else {
      let messageListNode = existingMessages[0];
  
      while (messageListNode) {
        const messageListNodeTime = messageListNode.getAttribute('timestamp');
  
        if (!messageListNodeTime) {
          throw new Error(
            `Child ${messageListNode.id} has no 'timestamp' attribute`
          );
        }
  
        if (messageListNodeTime > timestamp) {
          break;
        }
  
        messageListNode = messageListNode.nextSibling;
      }
  
      messageListElement.insertBefore(div, messageListNode);
    }
  
    return div;
  }*/

  // Displays a Message in the UI.
/*function displayMessage(id, location, date, time, description, url, timestamp) {
    var div = document.getElementById(id) || createAndInsertMessage(id, timestamp);
  
    // profile picture
    //if (picUrl) {
    //  div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
    //}
  
    div.querySelector('.name').textContent = name;
    var messageElement = div.querySelector('.message');
  
    var image = document.createElement('img');
    image.addEventListener('load', function() {
        messageListElement.scrollTop = messageListElement.scrollHeight;
        });
        image.src = imageUrl + '&' + new Date().getTime();
      messageElement.innerHTML = '';
      messageElement.appendChild(image);
    
    // Show the card fading-in and scroll to view the new message.
    setTimeout(function() {div.classList.add('visible')}, 1);
    messageListElement.scrollTop = messageListElement.scrollHeight;
    messageInputElement.focus();
  }
*/
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

loadMessages();


