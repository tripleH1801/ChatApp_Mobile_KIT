import { GLOBALTYPES } from './../actionType'

const initialState = {}

const messageReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.GET_MESSAGES_SUCCESS:
            return action.payload
            
        case GLOBALTYPES.ADD_MESSAGE:
            return {
                data: [...state.data, action.payload]
            }
            
        default:
            return state;
    }
}


export default messageReducer