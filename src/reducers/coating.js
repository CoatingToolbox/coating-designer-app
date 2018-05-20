import { Coating } from '../classes/coating.js';

export default function coatingReducer(state = {}, action) {

    let coating = {};

    switch(action.type) {
        case "SET_COATING":
            coating = action.coating;
            break;
        case "RESET_COATING":
            coating = Object.assign({}, state);
            break;
        case "SAVE_COATING_TO_FIREBASE":
            /*global firebase */
            action.coating.firebaseKey = firebase.database().ref('coatings/').push().key;
            firebase.database().ref(`coatings/${action.coating.firebaseKey}`).set(action.coating);
            coating = action.coating;
            break;
        case "REPLACE_COATING_ON_FIREBASE":
            if(action.coating.firebaseKey) {
              /*global firebase */
              firebase.database().ref(`coatings/${action.coating.firebaseKey}`).set(action.coating);
            } else {
              console.log('could not replace firebase so loaded as new');
                action.coating.firebaseKey = firebase.database().ref('coatings/').push().key;
                firebase.database().ref(`coatings/${action.coating.firebaseKey}`).set(action.coating);
            }
            coating = action.coating;
            break;
        default:
            coating = Object.assign({}, state);
            break;
    }
    coating = new Coating(coating);
    return coating.toJSON();
}

export { coatingReducer };