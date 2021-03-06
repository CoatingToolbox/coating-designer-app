import { Pan } from '../classes/pan.js';

export default function panReducer(state = {}, action) {

    let pan = {};
    
    switch(action.type) {
        case "SET_PAN":
            pan = action.pan;
            break;
        case "RESET_PAN":
            pan = Object.assign({}, state);
            break;
        case "SAVE_PAN_TO_FIREBASE":
            /*global firebase */
            action.pan.firebaseKey = firebase.database().ref('pans/').push().key;
            firebase.database().ref(`pans/${action.pan.firebaseKey}`).set(action.pan);
            pan = action.pan;
            break;
        case "REPLACE_PAN_ON_FIREBASE":
            if(action.pan.firebaseKey) {
              /*global firebase */
              firebase.database().ref(`pans/${action.pan.firebaseKey}`).set(action.pan);
            } else {
              console.log('could not replace firebase so loaded as new');
                action.pan.firebaseKey = firebase.database().ref('pans/').push().key;
                firebase.database().ref(`pans/${action.pan.firebaseKey}`).set(action.pan);
            }
            pan = action.pan;
            break;
        default:
            pan = Object.assign({}, state);
            break;
    }
    pan = new Pan(pan);
    return pan.toJSON();
}

export { panReducer };