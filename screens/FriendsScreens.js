import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text as PaperText } from "react-native-paper";
import { useSelector } from "react-redux";
import ComponentWrapper from "../components/ComponentWrapper";
import FriendItem from "../components/FriendItem";
import SystemButton from "../components/SystemButton";

const FriendsScreen = () => {
  // const { user, token } = useSelector((state) => state.auth);

  const friends = useSelector((state) => state.userReducer.data);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ComponentWrapper titleWrapper="Thông báo" seperate={true}>
        <SystemButton
          avatarButton="https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png"
          titleButton="Lời mời kết bạn"
          callback={() => navigation.navigate("InviteAddFriend")}
        />
      </ComponentWrapper>
      <ComponentWrapper>
        {friends == undefined || friends.length == 0 ? (
          <View style={[styles.container, styles.noFriendContainer]}>
            <PaperText>Bạn chưa có bạn bè nào</PaperText>
          </View>
        ) : (
          <FlatList
            data={friends}
            renderItem={({ item }) => <FriendItem friend={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </ComponentWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  componentWrapper: {
    paddingBottom: 10,
    backgroundColor: "#e6e6e6",
  },
  noFriendContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});

export default FriendsScreen;
