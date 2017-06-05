const initialState = '';

export default function filter(state = initialState, action){
    if(action.type === 'FILTER_TRACK'){
        return action.name
    }
    return state
}