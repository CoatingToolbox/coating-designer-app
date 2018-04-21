
import PolymerRedux from '../../node_modules/polymer-redux/polymer-redux.js';
import { Tablet } from './tablet.js';
import { Pan } from './pan.js';
import { Batch } from './batch.js';
import { CoatingAmount } from './coating-amount.js';
import { Coating } from './coating.js';
import { Parameters } from './parameters.js';

// REDUCERS
function tabletReducer(state = {}, action) {
    
    let tablet = new Tablet(state);
    
    switch(action.type) {
        case "SET_TABLET_PRODUCT_NAME": tablet.productName = action.value; break;
        case "SET_TABLET_FORMULATION_NAME": tablet.formulationName = action.value; break;
        case "SET_TABLET_CONTACT_NAME": tablet.contactName = action.value; break;
        case "SET_TABLET_COMPANY_NAME": tablet.companyName = action.value; break;
        case "SET_TABLET_PRODUCT_TYPE": tablet.productType = action.value; break;
        case "SET_TABLET_SHAPE": tablet.shape = action.value; break;
        case "SET_TABLET_WIDTH": tablet.width = action.value; break;
        case "SET_TABLET_LENGTH": tablet.length = action.value; break;
        case "SET_TABLET_TOTAL_THICKNESS": tablet.totalThickness = action.value; break;
        case "SET_TABLET_BAND_THICKNESS": tablet.bandThickness = action.value; break;
        case "SET_TABLET_WEIGHT": tablet.weight = action.value; break;
        case "SET_TABLET_BULK_DENSITY": tablet.bulkDensity = action.value; break;
        case "LOAD_TABLET_FROM_LIBRARY": tablet = new Tablet(action.value); break;
    }
    return Object.assign({}, state, tablet.toJSON());
}
function panReducer(state = {}, action) {
    
    let pan = new Pan(state);
    switch(action.type) {
            case "SET_PAN_NICKNAME": pan.nickname = action.value; break;
            case "SET_PAN_MANUFACTURER": pan.manufacturer = action.value; break;
            case "SET_PAN_MODEL": pan.model = action.value; break;
            case "SET_PAN_COMPANY": pan.company = action.value; break;
            case "SET_PAN_LOCATION_NAME": pan.locationName = action.value; break;
            case "SET_PAN_DIAMETER": pan.panDiameter = action.value; break;
            case "SET_PAN_OPENING_DIAMETER": pan.openingDiameter = action.value; break;
            case "SET_PAN_BRIM_WIDTH": pan.brimWidth = action.value; break;
            case "SET_PAN_WALL_WIDTH": pan.wallWidth = action.value; break;
            case "SET_PAN_PERFORATIONS": pan.perforations = action.value; break;
            case "SET_PAN_MAX_AIRFLOW": pan.maxAirflow = action.value; break;
            case "SET_PAN_GUN_MAKE": pan.gunMake = action.value; break;
            case "SET_PAN_GUN_MODEL": pan.gunModel = action.value; break;
            case "SET_PAN_GUN_COUNT": pan.gunCount = action.value; break;
            case "SET_PAN_GUN_TO_GUN_DISTANCE": pan.gunToGunDistance = action.value; break;
            case "SET_PAN_BAFFLE_TYPE": pan.baffleType = action.value; break;
            case "SET_PAN_BAFFLE_COUNT": pan.baffleCount = action.value; break;
            case "SET_PAN_BAFFLE_HEIGHT": pan.baffleHeight = action.value; break;
            case "LOAD_PAN_FROM_LIBRARY": pan = new Pan(action.value); break;
    }
    return Object.assign({}, state, pan.toJSON());
}
function coatingReducer(state = {}, action) {
    
    let coat = new Coating(state);
    switch(action.type) {
        case "SET_COATING_PRODUCT_NAME": coat.productName = action.value; break;
        case "SET_COATING_FORMULA_NAME": coat.formulaName = action.value; break;
        case "SET_COATING_COLOR": coat.color = action.value; break;
        case "SET_COATING_TYPE": coat.type = action.value; break;
        case "SET_COATING_DENSITY": coat.density = action.value; break;
        case "SET_COATING_VISCOSITY_INTERCEPT": coat.viscosityIntercept = action.value; break;
        case "SET_COATING_VISCOSITY_EXPONENT": coat.viscosityExponent = action.value; break;
        case "SET_COATING_SOLIDS": coat.solids = action.value; break;
        case "LOAD_COATING_FROM_LIBRARY": coat = new Coating(action.value); break;
    }
    return Object.assign({}, state, coat.toJSON());
}
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
function appReducer(state = {}, action) {
    switch(action.type) {
        case "SET_ADMIN":
            return Object.assign({}, state, {isAdmin: action.value});
        default: 
            return state;
    }
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
const app = { isAdmin: false};
const storedState = JSON.parse(sessionStorage.getItem('coating-designer-state')) || {};
const tablet = storedState.tablet || new Tablet({
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
    });
const pan = storedState.pan || new Pan({
        panDiameter: 1.2192,
        openingDiameter: 0.4826,
        wallWidth: 0.508,
        brimWidth: 0.93345,
        model: "Fastcoat",
        manufacturer: "O'Hara",
        nickname: "O'Hara Fastcoat 48\" Room",
        company: 'Colorcon',
        locationName: 'Harlyesville, PA',
        baffleType: 'Ploughshare',
        baffleCount: '4',
        baffleHeight: '',
        gunMake: 'Schlick',
        gunModel: '930',
        gunCount: '3',
        gunToGunDistance: '0.1524',
        maxAirflow: '2000',
        perforations: 'Fully',
        firebaseKey: ''
    });
const coating = storedState.coating || new Coating({
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
});
const batch = storedState.batch || new Batch(pan);
const coatingAmount = storedState.coatingAmount || new CoatingAmount();
const parameters = storedState.parameters || new Parameters();
const initialState = { app, tablet, pan, coating, batch, coatingAmount, parameters };

// CREATE STORE AND MIXIN
const store = Redux.createStore(rootReducer, initialState);
const ReduxMixin = PolymerRedux(store); 

export { ReduxMixin };
