// Signs-in photogether.
function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}
// Signs-out of photogether.
function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut();
  }

// Initiate firebase auth.
function initFirebaseAuth() {
    // Listen to auth state changes.
    console.log("AHHHHHHH");
    firebase.auth().onAuthStateChanged(authStateObserver);
  }

// Returns true if a user is signed-in.
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
    console.log(user);
    if (user) { // User is signed in!
      // Get the signed-in user's profile pic and name.
      //var profilePicUrl = getProfilePicUrl();
      //var userName = getUserName();
  
      // Set the user's profile pic and name.
      //userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
      //userNameElement.textContent = userName;
  
      // Show user's profile and sign-out button.
      //userNameElement.removeAttribute('hidden');
      //userPicElement.removeAttribute('hidden');
      //signOutButtonElement.removeAttribute('hidden');
  
      // Hide sign-in button.
      //signInButtonElement.setAttribute('hidden', 'true');
  
      // We save the Firebase Messaging Device token and enable notifications.
      //saveMessagingDeviceToken();
      console.log("Signed in");
      window.location.href = "newsfeed.html";
    } else { // User is signed out!
      // Hide user's profile and sign-out button.
      //userNameElement.setAttribute('hidden', 'true');
      //userPicElement.setAttribute('hidden', 'true');
      //signOutButtonElement.setAttribute('hidden', 'true');
  
      // Show sign-in button.
      //signInButtonElement.removeAttribute('hidden');
      console.log("Signed out");

  }
}

var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');

signInButtonElement.addEventListener('click', signIn);
signOutButtonElement.addEventListener('click', signOut);


// initialize Firebase
initFirebaseAuth();