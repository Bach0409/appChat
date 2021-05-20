import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';

const getListEmail =()=>{
    const [value, setValue]= useState()
        const bach = firestore().collection('listUser')
          .orderBy('email', 'desc')
          .onSnapshot((snap) => {
            const dataFire = snap.docs.map((item) => {
              const data = item.data();
              return data
            })
            setValue(dataFire)
          })
          return(value)
}

export default  getListEmail;