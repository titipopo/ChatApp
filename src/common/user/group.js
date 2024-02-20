import { cloud_db } from '../../firebase/index';

const createGroup = (userArray, createdBy, name) => {
  const group = {
    id: '',
    imageUrl: name
      ? 'https://ui-avatars.com/api/?background=transparent&background=random&rounded=true&bold=true&name=' +
        name
      : '',
    createdAt: new Date(),
    createdBy: createdBy,
    members: userArray,
    recentMessage: {
      recentMessageSentAt: new Date(),
      recentMessageSendBy: '',
      messageText: '',
    },
    readBy: { sendAt: new Date(), sendBy: '' },
    readed: 0,
    name: userArray.length > 1 ? name : userArray[0].displayName,
    type: userArray.length > 1 ? 2 : 1,
  };
  const ref = cloud_db.collection('group').doc();
  group.id = ref.id;
  cloud_db.collection('group')
    .add(group)
    .then(function (docRef) {
      console.log(docRef.id);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const fetchGroupByUserID = (uid) => {
  cloud_db.collection('group')
    .where('members', 'array-contains', uid)
    .onSnapshot((querySnapshot) => {
      const allGroups = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        if (data.recentMessage) allGroups.push(data);
      });
      console.log(allGroups);
    });
};

const filterGroup = (userArray) => {
  const group = [];
  return new Promise((resolve, reject) => {
    let groupRef = cloud_db.collection('group');
    userArray.forEach((userId) => {
      groupRef = groupRef.where('members', '==', userId);
    });
    groupRef
      .get()
      .then(function (querySnapshot) {
        const allGroups = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          allGroups.push(data);
        });
        if (allGroups.length > 0) {
          resolve(allGroups[0]);
        } else {
          resolve(null);
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const fetchGroupByIds = (groupIds) => {
  const groups = [];
  groupIds.forEach(async (groupId) => {
    await cloud_db.collection('group')
      .doc(groupId)
      .get()
      .then(function (doc) {
        groups.push(doc.data());
      })
      .catch(function (error) {
        // eslint-disable-next-line no-console
        console.error('Error get document: ', error);
      });
  });
  groups = groups;
};

const updateGroup = (group) => {
  cloud_db.collection('group')
    .doc(group.id)
    .set(group)
    .then(function (docRef) {})
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.error('Error writing document: ', error);
    });
};

const addNewGroupToUser = (user, groupId) => {
  const groups = user.groups ? user.groups : [];
  const existed = groups.filter((group) => group === groupId);
  if (existed.length === 0) {
    groups.push(groupId);
    user.groups = groups;
    const userRef = cloud_db.collection('user');
    userRef.doc(user.uid).set(user);
  }
};

export {
  addNewGroupToUser,
  fetchGroupByIds,
  fetchGroupByUserID,
  createGroup,
  filterGroup,
  updateGroup,
};
