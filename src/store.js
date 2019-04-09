import {createRedux, createStore} from 'redux';

const initialState = {
    currentValue: 0,
    futureValues: [],
    previousValues: []
};

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const UNDO = "UNDO";
export const REDO = "REDO";

function counter(state = initialState, action){
    switch(action.type){
        case INCREMENT:
        return {currentValue: state.currentValue + action.payload, 
            futureValues: [], 
            previousValues: [state.currentValue, ...state.previousValues] 
        };
        case DECREMENT:
        return {currentValue: state.currentValue - action.payload,
        futureValues: [],
        previousValues: [state.currentValue, ...state.previousValues]
        };
        case UNDO:
            return {
                currentValue: state.previousValues[0],
                futureValues: [state.currentValue, ...state.futureValues],
                previousValues: state.previousValues.slice(1)
            };
        case REDO:
            return {
                currentValue: state.futureValues[0],
                previousValues: [state.currentValue, ...state.previousValues],
                futureValues: state.futureValues.slice(1)
            }
        default: 
            return state;
    }
}
// console.log(createStore(counter).getState());
// same as store.getState() in src/counter.js
export default createStore(counter);