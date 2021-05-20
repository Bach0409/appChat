import React, { useState, useCallback, useEffect } from 'react';
import FireStore from '../../constants/FireStore';
import { GiftedChat } from 'react-native-gifted-chat';
import { Image, ImageBackground, Text, View, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const ChatScreen = ({ route, navigation }) => {
  const userName = route.params.name;
  const uid = route.params.uid;
  const room = route.params.room;
  const idRoom = route.params.idRoom;
  const listEmail = route.params.listEmail;
  const roomId = route.params.roomId;
  console.log('roomId',roomId)
  const [push, setPush] = useState(0);
  const [messages, setMessages] = useState([]);
  const [userAddMem, setUserAddMem] = useState();
  const [showInputAddNewMem, setShowInputAddNewMem] = useState(false);
  // const [listEmail, setListEmail] = useState('undefined')
  useEffect(() => {
    const getMess = FireStore.collection(idRoom)
      .orderBy('createAt', 'desc')
      .onSnapshot(snap => {
        const message = snap.docs.map(item => {
          const dataFire = item.data();
          const check = () => {
            if (uid == dataFire.user._id) return 1;
            else return dataFire.user._id;
          };
          const data = {
            _id: dataFire._id,
            text: dataFire.text,
            createAt: dataFire.createAt,
            user: {
              _id: check(),
              name: dataFire.user.name,
              avatar: dataFire.user.avatar,
            },
          };
          return data;
        });
        setMessages(message);
      });
  }, []);

  const onSend = useCallback((messages = []) => {
    FireStore.collection(idRoom).add({
      _id: performance.now(),
      text: messages[0].text,
      createAt: new Date(),
      user: {
        _id: uid,
        name: userName,
      },
    });
  }, []);
  const addNewMember = () => {
    addIdRoom()
    setShowInputAddNewMem(false)
  }
  const inputAddNewMem = () => {
    if (showInputAddNewMem == true) return (
      <View style={styles.BoxInputAddNewMem} >
        <TextInput
          style={styles.textInputAddNewMem}
          placeholder={'Nhập Email'}
          value={userAddMem}
          onChangeText={setUserAddMem}
        />
        <View style={styles.boxButtonFunciontAddNewMem} >
          <TouchableOpacity
            style={styles.buttonCancelAddMem}
            onPress={() => setShowInputAddNewMem(false)}
          >
            <Text style={styles.txtCancelAddMem} >Huỷ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancelAddMem}
            onPress={() => addNewMember()}
          >
            <Text style={styles.txtCancelAddMem} >Thêm</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  const buttonAdd = () => {
    if (showInputAddNewMem == false) return (
      <View style={styles.buttonAddMem} >
        <TouchableOpacity onPress={() => setShowInputAddNewMem(true)} >
          <Image style={styles.iconAddMem}
            source={{ uri: 'https://bitly.com.vn/q3bx78' }} />
        </TouchableOpacity>
      </View>
    )
  }
  //////////////////////////////////////////////////////////////////////////////////
  const createIdRoom = () => {
    const demoId = listEmail.map(item => {
      if (item.email == userAddMem) {
        const idByUid = uid + item.uid
        return idByUid
      }
      return demoId
    })
    const filtered = demoId.filter(function (el) {
      return el != undefined;

    });
    return JSON.stringify(filtered)
  }
  const addIdRoom = () => {
    const demoId = listEmail.map(item => {
      if (item.email == userAddMem) {
        const realIdRoom = item.uid + 'listRoom'
        FireStore.collection(realIdRoom).add({
          nameRoom: 'Nhóm Được Thêm',
          avatarRoom: 'https://bitly.com.vn/viphkh',
          idRoom: roomId,
          createAt: new Date(),
        })
          .then(console.log('finish'))
      }
    })

  }
  /////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <ImageBackground
        source={{ uri: 'https://wallpapercave.com/wp/wp4788557.jpg' }}
        style={styles.styBackground}>
        {buttonAdd()}
        {inputAddNewMem()}
        <GiftedChat
          placeholder={'Nhập tin nhắn'}
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
            name: userName,
          }}
          alwaysShowSend={true}
          messagesContainerStyle={{ opacity: 1 }}
        />
      </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  buttonCancelAddMem: {
    width: 60,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
    justifyContent: 'center'
  },
  txtCancelAddMem: {
    fontSize: 16,
    alignSelf: 'center'
  },
  boxButtonFunciontAddNewMem: {
    flexDirection: 'row',
    width: 'auto',
    height: 'auto',
    justifyContent: 'space-around'
  },
  textInputAddNewMem: {
    width: '90%',
    height: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 10
  },
  BoxInputAddNewMem: {
    width: '100%',
    height: 80,
    marginTop: 50,
  },
  buttonAddMem: {
    marginTop: 25,
    width: 70,
    height: 70,
    alignSelf: 'flex-end'
  },
  styBackground: {
    width: '100%',
    height: '100%'
  },
  iconAddMem: {
    width: 70,
    height: 70,
  }
})
export default ChatScreen;
