import { getDataAPI, postDataAPI } from '../../api'
import { GLOBALTYPES } from './../actionType'

//  GET MESSAGES BY ID
export const getMessagesByConversationId = (conversationId, token) => async dispatch => {
    try {
        const res = await getDataAPI(`messages/${conversationId}`, token)
        dispatch({
            type: GLOBALTYPES.GET_MESSAGES_SUCCESS,
            payload: {
                data: res.data
            }
        })
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err
            }
        })
    }
}

// ADD MESAGE
export const addMesage = ({ data, auth, socket, member }) => async dispatch => {
    try {
        const res = await postDataAPI('messages', data, auth.token)

        const { _id, username } = auth.user
        socket.emit('addMessage', { data, user: { _id, username }, member })
        console.log({ data, user: { _id, username }, member });

        dispatch({
            type: GLOBALTYPES.ADD_MESSAGE,
            payload:
                res.data
        })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err
            }
        })
    }
}