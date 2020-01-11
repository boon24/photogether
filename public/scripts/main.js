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
    firebase.auth().onAuthStateChanged(authStateObserver);
  }

// Returns true if a user is signed-in.
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
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

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
      window.alert('You have not configured and imported the Firebase SDK. ' +
          'Make sure you go through the codelab setup instructions and make ' +
          'sure you are running the codelab using `firebase serve`');
    }
  }

// Checks that Firebase has been imported.
//checkSetup();

var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');

signOutButtonElement.addEventListener('click', signOut);
signInButtonElement.addEventListener('click', signIn);


// initialize Firebase
initFirebaseAuth();