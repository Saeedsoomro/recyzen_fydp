import { View, Text, Image, ScrollView, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { useUser } from '@clerk/clerk-expo';
import Colors from './../../Utils/Colors'
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditUserProfile({businessId,hideModal}) {
 
  const {user}=useUser();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState("")



 const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      // Here, you can set the selected image to a state variable or perform any other actions
      console.log(result.uri);
      setImageUrl(result.uri)
    }
  };
  useEffect(()=>{
    if(user){
        setImageUrl(user.imageUrl)
    }
  },[user])
  return (
    <ScrollView>
         <KeyboardAvoidingView >
       

        <View style={{padding:20,paddingTop:30, backgroundColor:Colors.PRIMARY}}>
        <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,
        alignItems:'center',marginBottom:20}}
        onPress={()=>hideModal()}
        >
            <Ionicons name="arrow-back-outline" size={30} color="white" />
             <Text style={{fontSize:30,fontFamily:'outfit-bold',color:Colors.WHITE}}>Edit Profile</Text>
        </TouchableOpacity>
        <View style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:20,
        
        }}>
            <TouchableOpacity onPress={pickImage}>
            <Image source={{uri:imageUrl}}
            style={{width:90,height:90, borderRadius:99}}
            />
            </TouchableOpacity>
            
            </View>
        </View>

        <View style={{paddingTop:40}}>
            <View style={styles.calenderContainer}>
                <TextInput
                    placeholder="First name"
                    value={firstName}
                    onChangeText={setFirstName}
                    style={styles.noteTextArea}
                />
                <TextInput
                    placeholder="Last name"
                    value={lastName}
                    onChangeText={setLastName}
                    style={styles.noteTextArea}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.noteTextArea}
                />
                <TextInput
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.noteTextArea}
                />
                   <TouchableOpacity style={{marginTop:15}}
                      onPress={()=>{}}>
                    <Text style={styles.confirmBtn}
                    
                    >
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    calenderContainer:{
        // backgroundColor:Colors.PRIMARY_LIGHT,
        padding:20,
        borderRadius:15
    },
   

    noteTextArea:{
        borderWidth:1,
        borderRadius:15,
        textAlignVertical:'top',
        padding:10,
        fontSize:16,
        marginVertical:10,
        fontFamily:'outfit',
        borderColor:Colors.PRIMARY
    },
 
    confirmBtn:{
        textAlign:'center',
        fontFamily:'outfit-medium',
        fontSize:17,
        backgroundColor:Colors.PRIMARY,
        color:Colors.WHITE,
        padding:13,
        borderRadius:99,
        elevation:2,
        
    }
})