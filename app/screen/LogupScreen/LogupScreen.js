import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert, ImageBackground
} from 'react-native';
import auth from '@react-native-firebase/auth';
const SignupScreen = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [check_pass, setcheck_Pass] = useState('');
  const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const check = async () => {
    if (!filter.test(user)) {
      alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
    } else {
      if (pass == check_pass && pass != '') {
        const createUser = await auth()
          .createUserWithEmailAndPassword(user, check_pass)
          .then(
            navigation.navigate('Login', {
              user: user,
              pass: pass
            },
              Alert.alert(
                "Tạo tài khoản thành công")
            ))
          .catch(error => {
            Alert.alert("Tạo tài khoản Thất bại",)
          });
      }
      else {
        if (pass == check_pass) Alert.alert("Nhập mật khẩu",);
        else Alert.alert("Mật khẩu không khớp",);
      }
    }
  }

  return (
    <ImageBackground style={styles.container} source={{ uri: 'https://i.imgur.com/gizKWGp.jpg' }}>
      <TextInput
        style={styles.text_input}
        placeholder="Tên đăng nhập Example@gmail.com"
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
      <TextInput
        style={styles.text_input}
        placeholder="Nhập lại mật khẩu"
        onChangeText={setcheck_Pass}
        value={check_pass}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={() => check()}><Text>Đăng ký</Text></TouchableOpacity>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#69f7f1',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_input: {
    height: 40,
    width: 250,
    backgroundColor: 'white',
    borderWidth: 1,
    margin: 10,
    alignSelf: 'center',
    opacity: .8,
    borderRadius: 14,
  },
  button: {
    backgroundColor: '#6172b178',
    width: 150,
    height: 40,
    marginTop: 15,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default SignupScreen;
