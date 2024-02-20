import {
    initializeApp,
    getApp,
    getApps
} from 'firebase/app';
import { getFirestore, collection, query, where, doc, getDoc, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, listAll } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDZENSQj6ucpzna9LouizC-n9VBbAkz9eI",
    authDomain: "navigation-18feb.firebaseapp.com",
    databaseURL: "https://navigation-18feb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "navigation-18feb",
    storageBucket: "navigation-18feb.appspot.com",
    messagingSenderId: "389703859620",
    appId: "1:389703859620:web:27c0d7bf7d964c005c1531",
    measurementId: "G-2LFZ0T19VC"
};

// Initialize Firebase
let app, cloud_db, db;

if (!getApps().length) {
    try {
        app = initializeApp(firebaseConfig);
        cloud_db = getFirestore(app);
        db = getStorage(app);
    } catch (error) {
        console.log('Error initializing app: ' + error);
    }
} else {
    app = getApp();
    cloud_db = getFirestore(app);
    db = getStorage(app);
}

const getCloudDatas = async (docName) => {
    return await getDocs(collection(cloud_db, docName));
};

const getCloudDatasWithCondition = async (docName, index, searchCondition, searchTerms) => {
    const q = query(collection(cloud_db, docName), where(index, searchCondition, searchTerms));
    return await getDocs(q);
};

const getByDoc = async (docName, d) => {
    const docRef = doc(cloud_db, docName, d);
    return await getDoc(docRef);
}

const getByRef = async (refName) => {
    var jsonArray = [];
    const listRef = ref(db, refName);

    await listAll(listRef)
        .then((res) => {
            jsonArray = res.items;
        }).catch((error) => {
            console.log(error)
        });
    return jsonArray;
}

const addByDoc = async (docName, data) => {
    try {
        return await addDoc(collection(cloud_db, docName), data);
    } catch (e) {
    }
}

export { app, cloud_db, addByDoc, getByRef, getByDoc, getCloudDatas, getCloudDatasWithCondition };