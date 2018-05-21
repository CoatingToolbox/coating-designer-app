
import PolymerRedux from '../node_modules/polymer-redux/polymer-redux.js';
import { tabletReducer } from './reducers/tablet.js';
import { panReducer } from './reducers/pan.js';
import { coatingReducer } from './reducers/coating.js';
import { appReducer } from './reducers/app.js';
import { Batch } from './classes/batch.js';
import { CoatingAmount } from './classes/coating-amount.js';
import { Parameters } from './classes/parameters.js';

// REDUCERS
function batchReducer(state = {}, action, pan , tablet) {
    
    let batch = new Batch(Object.assign({}, state, pan));
    batch.bulkDensity = tablet.bulkDensity;
    batch.tabletWeight = tablet.weight;
    
    switch(action.type) {
      case "SET_BATCH_WEIGHT": batch.batchWeight = action.value; break;
      case "SET_BATCH_VOLUME": batch.batchVolume = action.value; break;
      case "SET_BATCH_COUNT": batch.tabletCount = action.value; break;
      case "SET_BATCH_TO_MAX_WEIGHT": batch.batchWeight = batch.maxFillWeight; break;
      case "SET_BATCH_TO_MIN_WEIGHT": batch.batchWeight = batch.minFillWeight; break;
      case "SET_BATCH_PERCENT_VOLUME": batch.batchVolume = action.value * batch.brimVolume; break;
    }
    return Object.assign({}, state, batch.toJSON());
}
function coatingAmountReducer(state = {}, action, coating, tablet) {
    let amount = new CoatingAmount(state);
    amount.tabletArea = tablet.totalArea;
    amount.tabletWeight = tablet.weight;
    amount.filmDensity = coating.density;
    switch(action.type) {
        case "SET_TABLET_WEIGHT": amount.tabletWeight = action.value; break;
        case "SET_COATING_DENSITY": amount.filmDensity = action.value; break;
        case "SET_COATING_WEIGHT": amount.coatingWeight = action.value; break;
        case "SET_COATING_WEIGHT_GAIN": amount.weightGain = action.value; break;
        case "SET_COATING_COVERAGE": amount.coatingCoverage = action.value; break;
        case "SET_FILM_THICKNESS": amount.filmThickness = action.value;break;
    }
    return Object.assign({}, state, amount.toJSON());
}
function parametersReducer(state = {}, action, pan) {
    let params = new Parameters(state);
    params.panDiameter = pan.panDiameter;
    switch(action.type) {
        case "SET_PRODUCT_TEMP": params.productTemp = action.value; break;
        case "SET_EXHAUST_TEMP": params.exhuastTemp = action.value; break;
        case "SET_INLET_TEMP": params.inletTemp = action.value; break;
        case "SET_AIRFLOW": params.airflow = action.value; break;
        case "SET_SPRAY_RATE": params.sprayRate = action.value; break;
        case "SET_PAN_SPEED": params.panSpeedRPM = action.value; break;
        case "SET_LINEAR_VELOCITY": params.linearVelocity = action.value; break;
        case "SET_MAX_PAN_SPEED": params.linearVelocity = 80 / 3.28084; break;
        case "SET_MIN_PAN_SPEED": params.linearVelocity = 70 / 3.28084; break;
        case "SET_PATTERN_AIR": params.patternAir = action.value; break;
        case "SET_ATOMIZATION_AIR": params.atomizationAir = action.value; break;
        case "SET_GUN_TO_BED": params.gunToBed = action.value; break;
        case "SET_SPRAY_PATTERN_WIDTH": params.sprayPatternWidth = action.value; break;
    }
    return Object.assign({}, state, params.toJSON());
}
function rootReducer(state = {}, action) {
        const app = appReducer(state.app, action);
        const tablet = tabletReducer(state.tablet, action);
        const pan = panReducer(state.pan, action);
        const coating = coatingReducer(state.coating, action);
        const batch = batchReducer(state.batch, action, pan, tablet);
        const coatingAmount = coatingAmountReducer(state.coatingAmount, action, coating, tablet);
        const parameters = parametersReducer(state.parameters, action, pan);
        
        let newState = Object.assign({}, state, { 
            app, tablet, pan, coating, 
            batch, coatingAmount, parameters 
        });
        
        sessionStorage.setItem('coating-designer-state', JSON.stringify(newState));
        return newState;
}

// INITIAL STATE
const app = { isAdmin: false, page: 'home' };
const storedState = JSON.parse(sessionStorage.getItem('coating-designer-state')) || {};
const tablet = storedState.tablet || {
        shape: 'round',
        length: 0.01,
        width: 0.0075,
        totalThickness: 0.00475,
        bandThickness: 0.00275,
        weight: 0.4,
        bulkDensity: 760000,
        productType: 'Pharmaceutical',
        productName: 'Colorcon Round Placebo',
        formulationName: 'Placebo WP2',
        companyName: 'Colorcon',
        contactName: 'Jason Hansell'
    };
const pan = storedState.pan || {
        panDiameter: 1.2192,
        openingDiameter: 0.4826,
        wallWidth: 0.508,
        brimWidth: 0.93345,
        modelName: "Fastcoat",
        manufacturerName: "O'Hara",
        nickname: '48" Room',
        companyName: 'Colorcon',
        companyLocation: 'Harlyesville, PA',
        baffleType: 'Ploughshare',
        baffleCount: '4',
        baffleHeight: '',
        gunMake: 'Schlick',
        gunModel: '930',
        gunCount: '3',
        gunToGunDistance: '0.1524',
        maxAirflow: '2000',
        perforationType: 'Fully',
        inletType: 'Upper Right Plenum',
        firebaseKey: ''
    };
const coating = storedState.coating || {
    productName: 'Opadry II 85F Series',
    formulaName: '85F18422',
    type: 'Immediate',
    color: 'White',
    // VISCOSITY
    solids: 0.2,
    viscosityIntercept: 20,
    viscosityExponent: 10,
    // COATING AMOUNT
    density: 1100000,
    weightGain: 0.03,
    // TABLET PROPERTIES
    tabletWeight: 0.4,
    batchWeight: 120000,
    tabletArea: 0.01,
};
const batch = storedState.batch || new Batch(pan);
const coatingAmount = storedState.coatingAmount || new CoatingAmount();
const parameters = storedState.parameters || new Parameters();
const initialState = { app, tablet, pan, coating, batch, coatingAmount, parameters };

// CREATE STORE AND MIXIN
const store = Redux.createStore(rootReducer, initialState);
const ReduxMixin = PolymerRedux(store); 

export { ReduxMixin };
