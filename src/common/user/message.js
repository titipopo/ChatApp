import { cloud_db } from '../../firebase/index';

const db = cloud_db;

const saveMessage = (messageText, sentAt, currentGroupId, user) => {
  if (messageText.trim()) {
    const message = {
      messageText,
      sentAt: new Date(),
      sentBy: user.uid,
    };
    return new Promise((resolve, reject) => {
      db.collection('message')
        .doc(currentGroupId)
        .collection('messages')
        .add(message)
        .then(function (docRef) {
          resolve(message);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
};

const fetchMessagesByGroupId = (groupId) => {
  let messages = [];
  db.collection('message')
    .doc(groupId.trim())
    .collection('messages')
    .orderBy('sentAt')
    .onSnapshot((querySnapshot) => {
      const allMessages = [];
      querySnapshot.forEach((doc) => {
        if (doc) allMessages.push(doc.data());
      });
      messages = allMessages;
    });
};

export { fetchMessagesByGroupId, saveMessage };
