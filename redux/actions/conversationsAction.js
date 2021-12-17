import { getDataAPI, postDataAPI } from '../../api'
import { GLOBALTYPES } from './../actionType'
import { postCurrentConversation } from './currentConversation'

export const getConversationsByUserId = (userId, token) => async dispatch => {
    try {
        const res = await getDataAPI(`conversations/${userId}`, token)
        dispatch({
            type: GLOBALTYPES.GET_CONVERSATIONS_SUCCESS,
            payload: {
                data: res.data
            }
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const getConversationsByFriendId = (friendId, userId, token) => async dispatch => {
    try {
        const { data } = await postDataAPI(`conversations/friend/${friendId}`, { userId }, token)

        dispatch(postCurrentConversation(data));

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err
            }
        })
    }
}

export const addConversation = (data, token, socket,user) => async dispatch => {
    try {
        const res = await postDataAPI(`conversations`, data, token)
        dispatch({
            type: GLOBALTYPES.ADD_CONVERSATION,
            payload: res.data
        })

        
        const dataSocket ={
            conversation: res.data,
            user: user
        }
        
        socket.emit("addConversation", dataSocket)


    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}