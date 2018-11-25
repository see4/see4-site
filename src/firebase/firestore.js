import firebase from './init';

const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots:true});

export default firestore;