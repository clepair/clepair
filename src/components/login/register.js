import React, { Component } from 'react';
import { ScrollView, StatusBar, Alert, AsyncStorage, Platform, StyleSheet, Image, View, TextInput, TouchableOpacity, Text, Picker, KeyboardAvoidingView, Dimensions, Button} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import util from 'util';
var moment = require('moment');
import * as firebase from "firebase";

const window = Dimensions.get('window');

data = new Date();

export default class Register extends Component 
{
    constructor(props){
        super(props)
        this.state = {  
            txt_nom_usuario: "",
            txt_des_email: "",
            txt_des_telefone: "",
            txt_dat_nascto:"",
            txt_des_localizacao:"",
            max_date: data.getDate() + "-" + (data.getMonth() + 1) + "-" + data.getFullYear(),
            image: null,
            passport: null,
        }
    }

    carregaCadastroOk = () => {

        //Captura campos
        var txt_nom_usuario = this.state.txt_nom_usuario;
        var txt_des_email = this.state.txt_des_email;
        var txt_des_telefone = this.state.txt_des_telefone;
        var txt_dat_nascto = this.state.txt_dat_nascto;
        var txt_des_localizacao = this.state.txt_des_localizacao;
        var storageRef = firebase.storage().ref();

        // File or Blob named mountains.jpg
        var file = this.state.image;

        console.log('FILE');
        console.log(file);

        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
        };

        //Gera um valor aleatório para senha
        min = Math.ceil(10000);
        max = Math.floor(1000000);
        txt_des_senha = Math.floor(Math.random() * (max - min)) + min + '@';

        console.log(txt_des_senha);

        //Verifica se todos os campos estão preenchidos
        if(txt_nom_usuario!='' && txt_des_email!='' && txt_des_telefone!='' && txt_dat_nascto!='' && txt_des_localizacao!='')
        {
            firebase.auth().createUserWithEmailAndPassword(txt_des_email, txt_des_senha).then(function(user){
                console.log(`UID Async: ` + user.uid);

                /*storageRef.put(file).then(function(snapshot) {
                    console.log(snapshot);
                });*/

                // Upload file and metadata to the object 'images/mountain.jpg'
                var uploadTask = storageRef.child('images/' + user.uid).putString(file, metadata);

                console.log(uploadTask);

                //firebase.database().ref('users').push().set({
                firebase.database().ref('users/'+user.uid).set({
                    name: txt_nom_usuario,
                    email: txt_des_email,
                    phone: txt_des_telefone,
                    birth: txt_dat_nascto,
                    location: txt_des_localizacao
                });

                Alert.alert(
                    'Success',
                    'Your account has been created.',
                    [
                        {text: 'OK', onPress: () => console.log("Ok pressionado")},
                    ],
                )

            }).catch(function(error) {
                console.log(error);

                Alert.alert(
                    'Attention',
                    'There is an error, please check and try again.',
                    [
                        {text: 'OK', onPress: () => console.log("Ok pressionado")},
                    ],
                )
            });
        }
        else
        {
            Alert.alert(
                'Attention',
                'All fields are required.',
                [
                    {text: 'OK', onPress: () => console.log("Ok pressionado")},
                ],
            )
        }
    }

    carregaVoltar = () => {
        this.props.navigation.navigate('Login');
    }

    render(){
        let { image, passport } = this.state;

        return(
            <View style={styles.container}> 
                <Image
                    style={styles.imgBackground}
                    source={require('../../../assets/bg_pages.png')}
                />

                <View style={styles.formHeader}>
                    <TouchableOpacity onPress={this.carregaVoltar}>
                        <Image
                            style={styles.icoVoltar}
                            source={require('../../../assets/ico_voltar.png')}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textoHeader}> Register </Text>
                </View>

                <ScrollView>
                    <View>
                        <Image
                            style={styles.imgFadeBlue}
                            source={require('../../../assets/img_fadeblue.png')}
                        />
                    </View>

                    <View style={styles.formContainer}>
                        <TouchableOpacity onPress={this._pickImage}>
                            {!image &&
                                <Image
                                    style={styles.imgUploadInicial}
                                    source={require('../../../assets/ico_add_photo.png')}
                                />
                            }

                            {image &&
                                <Image
                                    style={styles.imgUpload}
                                    source={{ uri: image }}
                                />
                            }
                        </TouchableOpacity>

                        <Text style={styles.textName}> Full Name </Text>

                        <TextInput
                            placeholder="Your Full Name"
                            placeholderTextColor="#4A6591"
                            //returnKeyType="next"
                            //onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputCampos}
                            underlineColorAndroid="transparent"
                            onChangeText={(txt_nom_usuario) => this.setState({txt_nom_usuario})}
                        /> 

                        <Text style={styles.textBirthday}> Birthday </Text>

                        <TextInput
                            placeholder="Your Birthday"
                            placeholderTextColor="#4A6591"
                            //returnKeyType="next"
                            //onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputCampos}
                            underlineColorAndroid="transparent"
                            onChangeText={(txt_dat_nascto) => this.setState({txt_dat_nascto})}
                        /> 

                        <Text style={styles.textEmail}> E-mail </Text>

                        <TextInput
                            placeholder="Your E-mail"
                            placeholderTextColor="#4A6591"
                            //returnKeyType="next"
                            //onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputCampos}
                            underlineColorAndroid="transparent"
                            onChangeText={(txt_des_email) => this.setState({txt_des_email})}
                        />

                        <Text style={styles.textPhone}> Phone Number </Text>

                        <TextInput
                            placeholder="Your Phone Number"
                            placeholderTextColor="#4A6591"
                            //returnKeyType="next"
                            //onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputCampos}
                            underlineColorAndroid="transparent"
                            onChangeText={(txt_des_telefone) => this.setState({txt_des_telefone})}
                        />

                        <Text style={styles.textLocation}> Location/Address </Text>

                        <TextInput
                            placeholder="Your Location/Address"
                            placeholderTextColor="#4A6591"
                            //returnKeyType="next"
                            //onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputCampos}
                            underlineColorAndroid="transparent"
                            onChangeText={(txt_des_localizacao) => this.setState({txt_des_localizacao})}
                        /> 

                        <TouchableOpacity onPress={this._pickPassport}>
                            {!passport &&
                                <Image
                                    style={styles.imgUpload}
                                    source={require('../../../assets/ico_add_passport.png')}
                                />
                            }

                            {passport &&
                                <Image
                                    style={styles.imgUpload}
                                    source={{ uri: passport }}
                                />
                            }
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.entrarContainer} onPress={this.carregaCadastroOk}>
                            <Image
                                style={styles.botaoNext}
                                source={require('../../../assets/btn_next.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView> 
            </View>
        )
    }
}

//Sign Up com Firebase
async function signupFirebase(email, pass, txt_nom_usuario, txt_des_telefone, txt_dat_nascto, txt_des_localizacao) {
    try {
        await firebase.auth()
            .createUserWithEmailAndPassword(email, pass).then(function(user){
                console.log(`UID Async: ` + user.uid);

                //firebase.database().ref('users').push().set({
                firebase.database().ref('users/'+user.uid).set({
                    name: txt_nom_usuario,
                    email: email,
                    phone: txt_des_telefone,
                    birth: txt_dat_nascto,
                    location: txt_des_localizacao
                });

                "S";

            }).catch(function(error) {
                "N";
            });
    } catch (error) {
        console.log(error.toString())

        return "N";
    }

}

// Formatação de estilos
const styles = StyleSheet.create
(
    {
        container:
        {
            flex: 1,
            backgroundColor: '#FFF',
            alignItems: 'center',
            width: window.width,
            height: window.height,
            ...Platform.select({
                ios: {
                    paddingTop: 0,
                },
                android: {
                    paddingTop: StatusBar.currentHeight,
                },
            }),
        },
        formHeader:
        {
            width: window.width * 0.9,
            ...Platform.select({
                ios: {
                    marginTop: window.height * -1,
                },
                android: {
                    marginTop: window.height * -1,
                },
            }),
        },
        textoHeader:
        {
            color:'#FFFFFF',
            fontSize: 20,
            marginTop: -20,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            marginLeft: window.width * 0.35,
        },
        formContainer:
        {
            alignItems: 'center',
            marginTop: window.height * -0.25,
        },
        redeSocial:
        {
            alignItems: 'center',
            flexGrow: 3,
            marginTop: '2%'
        },
        imgBackground:
        {
            ...Platform.select({
                ios: {
                    width: window.width,
                    height: window.height,
                },
                android: {
                    width: window.width,
                    height: window.height,
                },
            }),
        },
        imgFadeBlue:
        {
            ...Platform.select({
                ios: {
                    width: window.width,
                    height: window.height * 0.3,
                },
                android: {
                    width: window.width,
                    height: window.height * 0.3,
                },
            }),
        },
        logo:
        {
            ...Platform.select({
                ios: {
                    //width: window.width * 0.43,
                    width: window.width,
                    height: window.height * 0.24,
                    marginTop: -90,
                },
                android: {
                    //width: window.width * 0.43,
                    width: window.width,
                    height: window.height * 0.26,
                    marginTop: -110,
                },
            }),
        },
        imgUpload:
        {
            width: 130,
            height: 130,
            marginTop: 15,
            borderRadius: 65,
            //marginBottom: 17
            borderColor: '#56CBFB',
            borderWidth: 2,
        },
        imgUploadInicial:
        {
            width: 130,
            height: 130,
            marginTop: 15,
            //marginBottom: 17
        },
        botaoNext:
        {
            width: window.width * 0.9,
            height: window.height * 0.08,
            marginTop: 15,
            marginBottom: 50,
        },
        entrarContainer:
        {
            opacity: 1
        },
        inputCampos:
        {
            width: window.width * 0.9,
            height: window.height * 0.08,
            backgroundColor: '#FFFFFF',
            borderColor: '#052968',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 15,
            fontSize: 17
        },
        icoVoltar:
        {
            width: 20,
            height: 20,
            marginTop: 35,
            //marginLeft: window.width * -0.3,
            //marginBottom: 17
        },
        textName:
        {
            color:'#052968',
            fontSize: 18,
            marginTop: 15,
            marginBottom: 5,
            marginLeft: window.width * -0.68,
        },
        textBirthday:
        {
            color:'#052968',
            fontSize: 18,
            marginTop: 15,
            marginBottom: 5,
            marginLeft: window.width * -0.71,
        },
        textEmail:
        {
            color:'#052968',
            fontSize: 18,
            marginTop: 15,
            marginBottom: 5,
            marginLeft: window.width * -0.75,
        },
        textPhone:
        {
            color:'#052968',
            fontSize: 18,
            marginTop: 15,
            marginBottom: 5,
            marginLeft: window.width * -0.57,
        },
        textLocation:
        {
            color:'#052968',
            fontSize: 18,
            marginTop: 15,
            marginBottom: 5,
            marginLeft: window.width * -0.51,
        },
    }
);