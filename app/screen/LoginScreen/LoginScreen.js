import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import FireStore from '../../constants/FireStore';


GoogleSignin.configure({
  webClientId:
    '369317303909-t4st82pitjosqeaqemruidebejrdt81s.apps.googleusercontent.com',
});
const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    { navigation.navigate('Chat'); }
  } catch (error) {
    Alert.alert('Lỗi đăng nhập');
  }
};
const image = { uri: 'https://i.imgur.com/gizKWGp.jpg' };
const LoginScreen = ({ route, navigation }) => {
  const [user, setUser] = useState('Bach@gmail.com');
  const [pass, setPass] = useState('123456');
  const [loading, setLoading] = useState();



  const Login = async () => {
    const current = await auth().currentUser;
    const uid = current.uid
    navigation.navigate('ListChat', {
      name: user,
      uid: uid
    });
    setUser('');
    setPass('');
  };


  const check = async () => {
    setLoading(true);
    const subscriber = await auth()
      .signInWithEmailAndPassword(user, pass)
      .then(Login)
      .catch(error => {
        Alert.alert('Lỗi Đăng Nhập', 'Bạn đã nhập sai thông tin', [
          { text: 'OK', onPress: () => { } },
        ]);
      });
    setLoading(false);
  };
  const LoadingLogin = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#6cff00" />;
    } else return <></>;
  };

  return (
    <View>
      <ImageBackground style={styles.img_login} source={image}>
        <LoadingLogin />
        <View style={styles.background_login}>
          <Text style={styles.text_background}>Đăng Nhập</Text>
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={styles.text_input}
              placeholder="Tên đăng nhập"
              onChangeText={setUser}
              value={user}
            />
            <TextInput
              style={styles.text_input}
              placeholder="Mật khẩu"
              onChangeText={setPass}
              value={pass}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={check}>
            <Text>Đăng Nhập</Text>
          </TouchableOpacity>
          <View style={styles.text_1}>
            <Text style={styles.text_2}>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Logup')}>
              <Text style={styles.text_3}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.login_face}
            onPress={onGoogleButtonPress}>
            <Text style={styles.text_login_google}>Đăng nhập với google</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img_login: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background_login: {
    backgroundColor: '#69f7f1',
    width: '80%',
    height: '55%',
    opacity: 0.8,
    borderRadius: 30,
  },
  text_background: {
    fontWeight: '500',
    fontSize: 28,
    color: '#3e4750',
    textAlign: 'center',
    marginTop: '10%',
  },
  text_input: {
    height: 40,
    width: 250,
    backgroundColor: '#6172b178',
    borderWidth: 1,
    margin: 5,
    alignSelf: 'center',
    borderRadius: 14,
  },
  button: {
    backgroundColor: '#6172b178',
    width: 150,
    height: 40,
    marginTop: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  text_1: {
    marginTop: 15,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  text_2: {
    fontSize: 14,
    marginBottom: 10,
  },
  text_3: {
    fontSize: 14,
    color: 'red',
    marginLeft: 5,
  },
  login_face: {
    height: 40,
    width: 250,
    backgroundColor: '#f1f1f1',
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  text_login_face: {
    alignSelf: 'center',
    color: '#2f52db',
    fontWeight: 'bold',
  },
  text_login_google: {
    alignSelf: 'center',
    color: '#c00',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
