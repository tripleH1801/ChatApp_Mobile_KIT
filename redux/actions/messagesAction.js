import { getDataAPI, postDataAPI } from "../../api";
import { GLOBALTYPES } from "./../actionType";

//  GET MESSAGES BY ID
export const getMessagesByConversationId =
  (conversationId, token, page = 1, callback) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `messages/${conversationId}?limit=${page * 19}`,
        token
      );

      const newData = { ...res.data, data: res.data.data.reverse() };

      await dispatch({
        type: GLOBALTYPES.GET_MESSAGES_SUCCESS,
        payload: { ...newData, page },
      });
      callback.setIsloading ? callback.setIsloading : true;
      callback.setUpdateLength(res.data.data?.length);
    } catch (err) {}
  };

// ADD MESAGE
export const addMesage =
  ({ data, auth, socket, member }) =>
  async (dispatch) => {
    try {
      const res = await postDataAPI("messages", data, auth.token);

      const { _id, username } = auth.user;

      const msg = res.data;

      socket.emit("addMessage", { data, user: { _id, username }, member, msg });

      dispatch({
        type: GLOBALTYPES.ADD_MESSAGE,
        payload: data,
      });

      dispatch({
        type: GLOBALTYPES.UPDATE_CONVERSATION,
        payload: {
          _id: res.data._id,
          conversation: res.data.conversation,
          text: res.data.text,
          media: data.media,
          updatedAt: res.data.updatedAt,
          sender: data.sender._id,
        },
      });
    } catch (err) {}
  };
// ADD_MESSAGE_TO_CLIENT
