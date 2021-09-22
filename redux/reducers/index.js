import { combineReducers } from 'redux'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import showMenuReducer from './showmenuReducer'
import themeReducer from './themeReducer'
import conversationsReducer from './conversationsReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    showMenu: showMenuReducer,
    theme: themeReducer,
    conversations: conversationsReducer,
    // theme: themeRe
    // conversations:conversationsReducer,
    // user:userReducer,
    // currentConversation:currentConversationReducer,
    // messages:messagesReducer,
    // modal:modalReducer,
    // socket:socketReducer,
})
export default rootReducer