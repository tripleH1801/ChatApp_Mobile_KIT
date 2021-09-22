import { useRoute } from '@react-navigation/core'
import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Text as PaperText } from 'react-native-paper'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import ChatInput from '../components/ChatInput'
import Message from '../components/Message'
import { useSelector } from 'react-redux'

const ChatScreen = () => {

    const messages = useSelector(state => state.messages.data);
    const conversations = useSelector(state => state.conversations.data);
    console.log(conversations);

    // const chatMessages = databaseListMessage[0];
    // số âm vì load từ tin nhắn mới nhất (từ cuối danh sách messages).
    // const LOAD_MESSAGE_COUNT = -10;
    // let messages = [];
    // if (chatMessages != undefined) {
    //     messages = chatMessages.messages.slice(LOAD_MESSAGE_COUNT);
    // }

    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.messagesComponent}
            >
                {2 <= 0 ? //messages.member.length
                    <View
                        style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
                    >
                        <PaperText>Bạn chưa có tin nhắn với người này</PaperText>
                    </View> :
                    <FlatList
                        inverted //auto nằm cuối danh sách?
                        data={messages.reverse()}
                        renderItem={({ item }) => (
                            <Message
                                message={item}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }

                <View style={{ flex: 10000 }}></View>
            </View>
            <ChatInput />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    messagesComponent: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
    }
})
export default ChatScreen
