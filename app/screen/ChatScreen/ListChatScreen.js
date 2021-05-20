import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Alert, ImageBackground, Image, SafeAreaView, FlatList, BackHandler
} from 'react-native';
import FireStore from '../../constants/FireStore'
const demoData = FireStore.collection('List')
const LisChatScreen = ({ route, navigation }) => {
    const user = route.params.name
    const uid = route.params.uid
    const myListRoom = uid + 'listRoom'
    const [listRoom, setListRoom] = useState()
    const [newRoom, setNewRoom] = useState()
    console.log(uid)
    const [showAddNewRoom, setShowAddNewRoom] = useState(false)
    const date = new Date();
    const fakeId = JSON.stringify(date)
    
    /////////////////////////////////////////////////////////////////////
    /////// Lấy danh sách user trên firebase và đẩy Uid lên fire nếu lần đầu đăng nhập
    const [listEmail, setListEmail] = useState('undefined')
    const [stt, setStt] = useState(1)
    const [push, setPush] = useState(0)
    useEffect(() => {
        if (listEmail != 'undefined') {
            listEmail.map(item => {
                if (user == item.email) {
                    setStt(3)
                }
            })
            if (stt == 2 && user != '') {
                FireStore.collection('listUser')
                    .add({
                        email: user,
                        uid: uid
                    })
                    setStt(3)
                console.log('đẩy đẩy đẩy')
            }
           
        }
    }, [listEmail])

    if (stt == 1) {
        const AddUidUser = FireStore.collection('listUser')
            .orderBy('email', 'desc')
            .onSnapshot((snap) => {
                const listEmailFire = snap.docs.map((item) => {
                    const dataFire = item.data();
                    const data = {
                        email: dataFire.email,
                        uid: dataFire.uid
                    }
                    return data;
                })
                setListEmail(listEmailFire)
                setStt(2)
            })
    } if (stt == 0) console.log('lỗi')
    
    /////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const showListRoom = FireStore.collection(myListRoom).onSnapshot(snap => {
            const showRoom = snap.docs.map(item => {
                const dataFire = item.data()
                const DATA = {
                    nameRoom: dataFire.nameRoom,
                    avatarRoom: dataFire.avatarRoom,
                    idRoom: dataFire.idRoom
                }
                return DATA
            })

            setListRoom(showRoom)
        })
        
    }, [])

    const renderItem = ({ item }) => {
        return (
            <>
                <TouchableOpacity style={styles.boxButtonAdd}
                    onPress={() => navigation.navigate('Chat', {
                        name: user,
                        uid: uid,
                        room: item.nameRoom,
                        idRoom: item.idRoom,
                        listEmail:listEmail,
                        roomId :item.idRoom
                    })}
                    onLongPress={() => {
                        Alert.alert(
                            "Bạn có muốn xoá",
                            "Nhấn Xóa",
                            [{
                                text: "Cancel",
                                onPress: () => { },
                                style: "cancel"
                            },
                            { text: "Xoá", onPress: () => deleteRoom(item.nameRoom) }
                            ]
                        );

                    }}>
                    <View style={styles.buttonAdd} >
                        <Image style={styles.avatarRoom} source={{ uri: item.avatarRoom }} />
                        <Text style={styles.nameRoom}>{item.nameRoom}</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }
    const createIdRoom=()=>{
        console.log(listEmail)
       const demoId = listEmail.map(item=>{
            if(item.email == newRoom){
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
    const addIdRoom=()=>{
        const demoId = listEmail.map(item=>{
            if(item.email == newRoom){
                const realIdRoom = item.uid + 'listRoom'
                FireStore.collection(realIdRoom).add({
                    nameRoom: user,
                    avatarRoom: 'https://bitly.com.vn/viphkh',
                    idRoom: createIdRoom(),
                    createAt: new Date(),
                })
                .then(console.log('finish'))
            }
        })
        
    }
    const addRoomFirebase = async () => {
        setShowAddNewRoom(false)
         addIdRoom()
        await FireStore.collection(myListRoom).add({
            nameRoom: newRoom,
            avatarRoom: 'https://bitly.com.vn/viphkh',
            idRoom: createIdRoom(),
            createAt: new Date(),
        }).then(
            Alert.alert('Thêm thành công')
        )
    }
    const deleteRoom = (index) => {
        FireStore.collection(myListRoom).doc(index).delete()
            .then(
                Alert.alert('Đã Xoá')
            )
    }
    const viewAddnewRoom = () => {
        if (showAddNewRoom == true)
            return (
                <View style={styles.contenerShowAdd} >
                    <TextInput style={styles.textInputAddRoom}
                        value={newRoom}
                        onChangeText={setNewRoom}
                        placeholder={'Nhập tên phòng'}
                    />
                    <View style={styles.boxFuntionAddRoom} >
                        <TouchableOpacity style={styles.buttonCancelAdd}
                            onPress={() => setShowAddNewRoom(false)}
                        >
                            <Text style={styles.textCancelAdd} >Thoát</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonConfirmAdd}
                            onPress={addRoomFirebase}
                        >
                            <Text style={styles.textConfirmAdd} >Thêm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        else return (<></>)
    }

    const body = () => {
        // if(listRoom?.nameRoom)
        return (
            <View style={styles.body} >
                <View style={styles.boxTextChats} >
                    <Text style={styles.textChats} >Chats</Text>
                </View>
                <FlatList
                    data={listRoom}
                    renderItem={renderItem}
                />
            </View>
        )
        // else return(<Text>không có gì</Text>)
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.banner}>
                <Text style={{ height: 30, width: 30 }} ></Text>
                <Image style={styles.avata}
                    source={{ uri: 'https://bitly.com.vn/2e7lps' }}
                ></Image>
                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }}
                    onPress={() => setShowAddNewRoom(true)}
                >
                    <Text style={styles.textAddRoom}>ADD</Text>
                </TouchableOpacity>
            </View>
            {viewAddnewRoom()}
            {body()}
        </View>
    );
};
const styles = StyleSheet.create({
    textChats: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'white'
    },
    boxTextChats: {
        marginTop: 10,
        width: 80,
        height: 30,
        backgroundColor: 'pink',
        borderRadius: 20,
        justifyContent: 'center'
    },
    textConfirmAdd: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'center'
    },
    buttonConfirmAdd: {
        borderRadius: 15,
        width: 60,
        height: 30,
        backgroundColor: 'pink',
        justifyContent: 'center'
    },
    textCancelAdd: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'center'
    },
    buttonCancelAdd: {
        borderRadius: 15,
        width: 60,
        height: 30,
        backgroundColor: 'pink',
        justifyContent: 'center'
    },
    boxFuntionAddRoom: {
        marginTop: 10,
        width: 'auto',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    avatarRoom: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 50,
        alignSelf: 'center',
        marginLeft: 10
    },
    nameRoom: {
        fontSize: 18,
        alignSelf: 'center',
        marginLeft: 20
    },
    textInputAddRoom: {
        borderRadius: 5,
        width: '90%',
        height: 30,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 10
    },
    contenerShowAdd: {
        borderRadius: 15,
        marginTop: 10,
        width: '90%',
        height: 90,
        backgroundColor: '#dadada',
        alignSelf: 'center'
    },
    buttonAdd: {
        width: '100%',
        height: 70,
        backgroundColor: '#dadada',
        borderRadius: 15,
        flexDirection: 'row'
    },
    boxButtonAdd: {
        marginTop: 10,
        marginBottom: 10,
    },
    textAddRoom: {
        height: 30,
        width: 30,
    },
    body: {
        width: '90%',
        height: '85%',
        alignSelf: 'center'
    },
    avata: {
        width: 70,
        height: 70,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 30,
    },
    banner: {
        width: '100%',
        height: '15%',
        backgroundColor: '#e02665',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
})
export default LisChatScreen;
