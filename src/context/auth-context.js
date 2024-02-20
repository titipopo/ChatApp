import { useState, useEffect, useContext, createContext } from 'react';

import { auth, cloud_db } from '../firebase/index';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,updateProfile  } from "firebase/auth";

import { Splash } from '../screens/index';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      const unsubcribed = onAuthStateChanged(auth, (userInfor) => {
        if (userInfor) {
          const { displayName, email, uid, photoURL, metadata } = userInfor;
          setUser({ displayName, email, uid, photoURL, metadata });
          //SaveUserToFirestore(userInfor);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });

      return () => {
        unsubcribed();
      };
    }, 3000);
  }, []);

  return isLoading ? (
    <Splash />
  ) : (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook
const UseAuth = () => {
  return useContext(AuthContext);
};

// signIn function
const SignIn = async (navigation, userEmail, userPassword, setErrortext) => {
  await signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredentials) => {
      navigation.navigate(Strings.navigation_names.main);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      setErrortext(errorCode + '\n' + errorMessage);
    });
};

// register function
const CreateAccount = async (
  navigation,
  userEmail,
  userPassword,
  setErrortext
) => {
  await createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then((userCredentials) => {
      navigation.navigate(Strings.navigation_names.login);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      setErrortext(errorCode + '\n' + errorMessage);
    });
};

// signOut function
const SignOut = async () => {
  await signOut(auth);
  //RemoveItem(Strings.storage_key.dark_mode);
  //RemoveItem(Strings.storage_key.language);
};

// update function
const UpdateUser = async (update) => {
  await updateProfile(auth.currentUser, {
    update
  }).then(() => {
  }).catch((error) => {
  });
};

// save userInfor
const SaveUserToFirestore = (user) => {
  const userRef = cloud_db.collection('user');
  userRef.doc(user.uid).set({
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
    groups: [],
  });
};

export {
  SignOut,
  UseAuth,
  UpdateUser,
  SignIn,
  CreateAccount,
  SaveUserToFirestore,
};
export default AuthProvider;
