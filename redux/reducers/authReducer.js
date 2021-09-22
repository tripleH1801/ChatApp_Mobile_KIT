import { GLOBALTYPES } from './../actionType'

const initialState = {}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.AUTH:
            return action.payload;
        case GLOBALTYPES.SAVETOKEN:
            return {
                ...state,
                token : action.payload
            };
        default:
            return state;
    }
}


export default authReducer