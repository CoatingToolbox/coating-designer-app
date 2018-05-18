import { Tablet } from './tablet-class.js';

export default function tabletReducer(state = {}, action) {
    
    let tablet = {};
    
    switch(action.type) {
        case "SET_TABLET":
            tablet = action.tablet;
            break;
        case "RESET_TABLET":
            tablet = Object.assign({}, state);
            break;
        case "SAVE_TABLET_TO_FIREBASE":
            /*global firebase */
            action.tablet.firebaseKey = firebase.database().ref('tablets/').push().key;
            firebase.database().ref(`tablets/${action.tablet.firebaseKey}`).set(action.tablet);
            tablet = action.tablet;
            break;
        case "REPLACE_TABLET_ON_FIREBASE":
            if(action.tablet.firebaseKey) {
              /*global firebase */
              firebase.database().ref(`tablets/${action.tablet.firebaseKey}`).set(action.tablet);
            } else {
              console.log('could not replace firebase so loaded as new');
                action.tablet.firebaseKey = firebase.database().ref('tablets/').push().key;
                firebase.database().ref(`tablets/${action.tablet.firebaseKey}`).set(action.tablet);
            }
            tablet = action.tablet;
            break;
        default:
            tablet = Object.assign({}, state);
            break;
    }
    tablet = new Tablet(tablet);
    return tablet.toJSON();
}

export { tabletReducer };