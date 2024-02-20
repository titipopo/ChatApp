import { cloud_db } from '../../firebase/index';

const fetchUsersByGroup = (group) => {
  group.users = [];
  const promises = [];
  group.members.forEach((member) => {
    const promise = new Promise((resolve, reject) => {
      cloud_db.collection('user')
        .doc(member)
        .get()
        .then(function (doc) {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(doc.data()));
          resolve(doc.data());
        })
        .catch(function (error) {
          reject(error);
        });
    });
    promises.push(promise);
  });
  return Promise.all(promises);
};

const saveUser = (user) => {
  // eslint-disable-next-line no-console
  const userRef = cloud_db.collection('user');
  userRef.doc(user.uid).set({
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
  });
};

const checkUserExisted = (user) => {
  const docRef = cloud_db.collection('user').doc(user.uid);
  return new Promise((resolve, reject) => {
    docRef
      .get()
      .then(function (doc) {
        resolve(doc.exists);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    cloud_db.collection('user')
      .get()
      .then(function (querySnapshot) {
        const allUsers = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          allUsers.push(user);
        });
        console.log(allUsers);
        return allUsers;
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};

const getUserFromFireStore = (user) => {
  if (!user) return;
  const docRef = cloud_db.collection('user').doc(user.uid);
  return new Promise((resolve, reject) => {
    docRef.onSnapshot(function (doc) {
      resolve(doc.data());
    });
  });
};

export {
  fetchUsersByGroup,
  saveUser,
  checkUserExisted,
  fetchUsers,
  getUserFromFireStore,
};
