export default function reducer(state = {
    city: '',
    country: ''
}, action) {
    if (action.type === 'SET_LOCATION') {
        state = Object.assign({}, state, action.payload);
    }
    return state;
}