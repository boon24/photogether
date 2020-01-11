
// Loads chat messages history and listens for upcoming ones.
function loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase.firestore()
                    .collection('events')
                    .orderBy('timestamp', 'desc')
                    .limit(12);
    
    // Start listening to the query.
    query.onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type === 'removed') {
          deleteMessage(change.doc.id);
        } else {
          var message = change.doc.data();
          displayMessage(change.doc.id, message.timestamp, message.name,
                         message.text, message.profilePicUrl, message.imageUrl);
        }
      });
    });
  }

// Triggered when a file is selected via the media picker.
function onMediaFileSelected(event) {
    event.preventDefault();
    var file = event.target.files[0];
  
    // Clear the selection in the file picker input.
    imageFormElement.reset();
  
    // Check if the file is an image.
    if (!file.type.match('image.*')) {
      var data = {
        message: 'You can only share images',
        timeout: 2000
      };
      signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
      return;
    }

// Triggered when the send new message form is submitted.
function onMessageFormSubmit(e) {
    e.preventDefault();
    // Check that the user entered a message and is signed in.
    if (messageInputElement.value && checkSignedInWithMessage()) {
      saveMessage(messageInputElement.value).then(function() {
        // Clear message text field and re-enable the SEND button.
        resetMaterialTextfield(messageInputElement);
        toggleButton();
      });
    }
  }

  // Displays a Message in the UI.
function displayMessage(location, , name, text, picUrl, imageUrl) {
    var div = document.getElementById(id) || createAndInsertMessage(id, timestamp);
  
    // profile picture
    if (picUrl) {
      div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
    }
  
    div.querySelector('.name').textContent = name;
    var messageElement = div.querySelector('.message');
  
    if (text) { // If the message is text.
      messageElement.textContent = text;
      // Replace all line breaks by <br>.
      messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
    } else if (imageUrl) { // If the message is an image.
      var image = document.createElement('img');
      image.addEventListener('load', function() {
        messageListElement.scrollTop = messageListElement.scrollHeight;
      });
      image.src = imageUrl + '&' + new Date().getTime();
      messageElement.innerHTML = '';
      messageElement.appendChild(image);
    }
    // Show the card fading-in and scroll to view the new message.
    setTimeout(function() {div.classList.add('visible')}, 1);
    messageListElement.scrollTop = messageListElement.scrollHeight;
    messageInputElement.focus();
  }