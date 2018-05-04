import React, { Component } from 'react';
import { ScrollView, StatusBar, AsyncStorage, Alert, AlertIOS, TextInput, Platform, StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, Button, Dimensions } from 'react-native';
import { FeedStack, Drawer } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import util from 'util';
import Modal from 'react-native-modal'
import * as firebase from "firebase";

firebase.initializeApp({
    apiKey: "AIzaSyCS46EbYtvSfwKLL6RxQYJkm8izsSvaG3M",
    authDomain: "clepair-co.firebaseapp.com",
    databaseURL: "https://clepair-co.firebaseio.com",
    storageBucket: "clepair-co.appspot.com"
});

const window = Dimensions.get('window'); 

export default class Login extends Component 
{
    /*state = {
        isModalVisible: false
    }*/

    _showModal = () => this.setState({ isModalVisible: true })

    _hideModal = () => this.setState({ isModalVisible: false })

    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <TouchableOpacity style={styles.entrarContainer} onPress={this._hideModal}>
                <Image
                    style={styles.botaoFechaModal}
                    source={require('../../../assets/btn_sair_modal.png')}
                />
            </TouchableOpacity>

            <Image
                style={styles.cadeado}
                source={require('../../../assets/ico_cadeado.png')}
            />

            <Text style={styles.textPassword}>Reset Password</Text>

            <TextInput
                placeholder="E-mail address"
                placeholderTextColor="#9C9C9C"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputResetaSenha}
                underlineColorAndroid="transparent"
                onChangeText={(txt_des_email) => this.setState({txt_des_email})}
            /> 

            <TouchableOpacity style={styles.entrarContainer} onPress={this._hideModal}>
                <Image
                    style={styles.botaoResetaSenha}
                    source={require('../../../assets/btn_reset_password.png')}
                />
            </TouchableOpacity>
        </View>
    );

    /*componentDidMount() {
        this.animation.play();
    }*/

    constructor(props){
        super(props);

        this.state = { 
            listaUsuarios: [],
            txt_des_email: "", 
            txt_des_senha:"",
            visible: false,
        };
    }

    carregaCadastro = () => {
        this.props.navigation.navigate('Register');
    }

    carregaHome = () => {
        var txt_des_email = this.state.txt_des_email;
        var txt_des_senha = this.state.txt_des_senha;

        //Chama a função do login via Firebase retorna sucesso ou erro
        logInFirebase(txt_des_email, txt_des_senha).then(retorno => {
            //Se o retorno der sucesso, redireciona para a tela de Home
            if(retorno=='S')
            {
                this.props.navigation.navigate('Home');
            }
            else
            {
                Alert.alert(
                    'Attention',
                    "Your e-mail or password is wrong. Please, try again.",
                    [
                        {text: 'OK', onPress: () => console.log('Dados Incorretos - OK Selecionado')},
                    ],
                )
            }
        });
    }

    chamaLoginFacebook = () => {
        //Chama a função do login do facebook e retorna sucesso ou erro
        /*logInFacebook().then(retorno => {
            //Se o retorno der sucesso, redireciona para a tela de Apresentação
            if(retorno=='success')
            {
                this.props.navigation.navigate('Apresentacao');
            }
        });*/
    }

    chamaLoginGoogle = () => {
        //Chama a função do login do google e retorna sucesso ou erro
        /*signInWithGoogleAsync().then(retorno => {
            //Se o retorno der sucesso, redireciona para a tela de Apresentação
            if(retorno=='success')
            {
                this.props.navigation.navigate('Apresentacao');
            }
        });*/
    }

    static navigationOptions = {
        drawerLabel: ' ',
    };

    render(){
        if (Platform.OS === 'ios') 
        {
            return(
                //O KeyboardAvoid é utilizado para o campos de texto não ficarem escondidos atrás do teclado
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <Image
                            style={styles.imgBackground}
                            source={require('../../../assets/bg_login.png')}
                        />

                        <View style={styles.formContainer}>
                            <TextInput
                                placeholder="E-mail address"
                                placeholderTextColor="#9C9C9C"
                                //returnKeyType="next"
                                //onSubmitEditing={() => this.passwordInput.focus()}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.inputEmail}
                                underlineColorAndroid="transparent"
                                onChangeText={(txt_des_email) => this.setState({txt_des_email})}
                            /> 
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#9C9C9C"
                                //returnKeyType="go"
                                secureTextEntry
                                style={styles.inputSenha}
                                ref={(input) => this.passwordInput = input}
                                underlineColorAndroid="transparent"
                                onChangeText={(txt_des_senha) => this.setState({txt_des_senha})}
                            />

                            <TouchableOpacity style={styles.entrarContainer} onPress={this.carregaHome}>
                                <Image
                                    style={styles.botaoEntrar}
                                    source={require('../../../assets/btn_login.png')}
                                />
                            </TouchableOpacity>

                            <Modal
                                isVisible={this.state.isModalVisible}
                                animationIn={'slideInLeft'}
                                animationOut={'slideOutRight'}
                                >
                                {this._renderModalContent()}
                            </Modal>

                            <Image
                                style={styles.separador}
                                source={require('../../images/separador.png')}
                            />

                            <TouchableOpacity style={styles.entrarContainer} onPress={this.telaEventos}>
                                <Image
                                    style={styles.botaoFacebook}
                                    source={require('../../../assets/btn_login_facebook.png')}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.entrarContainer} onPress={this.telaEventos}>
                                <Image
                                    style={styles.botaoGoogle}
                                    source={require('../../../assets/btn_login_google.png')}
                                />
                            </TouchableOpacity>

                            <Text style={styles.esqueciSenha} onPress={this._showModal}> Forgot password? </Text>

                            <Text style={styles.queroCadastrar} onPress={this.carregaCadastro}> New here? Sign Up! </Text>
                        </View>

                        <View /*style={styles.animationContainer}>
                            <Animation
                                loop
                                ref={animation => { this.animation = animation; }}
                                style={{
                                    width: 400,
                                    height: 400,
                                    backgroundColor: 'transparent',
                                }}
                                source={require('../../../animacao/wave.json')}
                            /*/>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            )
        }
        else
        {
            return(
                //O KeyboardAvoid é utilizado para o campos de texto não ficarem escondidos atrás do teclado
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
                    <ScrollView>
                        <View style={styles.container}>
                            <Image
                                style={styles.imgBackground}
                                source={require('../../../assets/bg_login.png')}
                            />

                            <View style={styles.formContainer}>
                                <TextInput
                                    placeholder="E-mail address"
                                    placeholderTextColor="#9C9C9C"
                                    //returnKeyType="next"
                                    //onSubmitEditing={() => this.passwordInput.focus()}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={styles.inputEmail}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(txt_des_email) => this.setState({txt_des_email})}
                                /> 
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor="#9C9C9C"
                                    //returnKeyType="go"
                                    secureTextEntry
                                    style={styles.inputSenha}
                                    ref={(input) => this.passwordInput = input}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(txt_des_senha) => this.setState({txt_des_senha})}
                                />

                                <TouchableOpacity style={styles.entrarContainer} onPress={this.telaEventos}>
                                    <Image
                                        style={styles.botaoEntrar}
                                        source={require('../../../assets/btn_login.png')}
                                    />
                                </TouchableOpacity>

                                <Modal
                                    isVisible={this.state.isModalVisible}
                                    animationIn={'slideInLeft'}
                                    animationOut={'slideOutRight'}
                                    >
                                    {this._renderModalContent()}
                                </Modal>

                                <Image
                                    style={styles.separador}
                                    source={require('../../images/separador.png')}
                                />

                                <TouchableOpacity style={styles.entrarContainer} onPress={this.telaEventos}>
                                    <Image
                                        style={styles.botaoFacebook}
                                        source={require('../../../assets/btn_login_facebook.png')}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.entrarContainer} onPress={this.telaEventos}>
                                    <Image
                                        style={styles.botaoGoogle}
                                        source={require('../../../assets/btn_login_google.png')}
                                    />
                                </TouchableOpacity>

                                <Text style={styles.esqueciSenha} onPress={this._showModal}> Forgot password? </Text>

                                <Text style={styles.queroCadastrar} onPress={this.carregaCadastro}> New here? Sign Up! </Text>
                            </View>

                            <View /*style={styles.animationContainer}>
                                <Animation
                                    loop
                                    ref={animation => { this.animation = animation; }}
                                    style={{
                                        width: 400,
                                        height: 400,
                                        backgroundColor: 'transparent',
                                    }}
                                    source={require('../../../animacao/wave.json')}
                                /*/>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            )
        }
    }
}

//Login com Firebase
async function logInFirebase(email, pass) {
    try {
        await firebase.auth()
            .signInWithEmailAndPassword(email, pass);

        return "S";
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
        formContainer:
        {
            alignItems: 'center',
            ...Platform.select({
                ios: {
                    marginTop: window.height * -0.62,
                },
                android: {
                    marginTop: window.height * -0.62,
                },
            }),
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
        separador:
        {
            width: window.width * 0.9,
            height: window.height * 0.001,
            marginTop: 17,
            //marginBottom: 17
        },
        botaoFacebook:
        {
            width: window.width * 0.9,
            height: window.height * 0.08,
            marginTop: 15,
        },
        botaoGoogle:
        {
            width: window.width * 0.9,
            height: window.height * 0.08,
            marginTop: 8,
        },
        queroCadastrar:
        {
            color:'#042868',
            fontSize: 15,
            ...Platform.select({
                ios: {
                    marginLeft: window.width * 0.53,
                    width: 150,
                    marginTop: -17,
                },
                android: {
                    marginLeft: window.width * 0.53,
                    width: 150,
                    marginTop: -17,
                },
            }),
        },
        esqueciSenha:
        {
            color:'#042868',
            fontSize: 15,
            ...Platform.select({
                ios: {
                    marginLeft: window.width * -0.5,
                    marginTop: 25,
                    width: 150
                },
                android: {
                    marginLeft: window.width * -0.5,
                    marginTop: 25,
                    width: 150
                },
            }),
        },
        botaoEntrar:
        {
            width: window.width * 0.9,
            height: window.height * 0.08,
            marginTop: 15,
        },
        entrarContainer:
        {
            opacity: 1
        },
        inputEmail:
        {
            width: window.width * 0.9,
            height: window.height * 0.08,
            backgroundColor: '#FFFFFF',
            borderColor: '#C3C6CC',
            //borderWidth: 1,
            borderLeftWidth: 2,
            borderTopWidth: 2,
            borderRightWidth: 2,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            //borderRadius: 5,
            paddingHorizontal: 15,
            fontSize: 17
        },
        inputSenha:
        {
            width: window.width * 0.9,
            height: window.height * 0.08,
            backgroundColor: '#FFFFFF',
            borderColor: '#C3C6CC',
            //borderWidth: 1,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderTopWidth: 1,
            borderBottomWidth: 2,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            //borderTopLeftRadius: 5,
            //borderTopRightRadius: 5,
            //borderRadius: 5,
            paddingHorizontal: 15,
            fontSize: 17
        },
        inputResetaSenha:
        {
            width: window.width * 0.8,
            height: window.height * 0.075,
            backgroundColor: '#FFFFFF',
            borderColor: '#C3C6CC',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 15,
            fontSize: 17,
            marginTop: 15,
        },
        animationContainer: {
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            marginTop: 240,
        },
        modalContent: {
            backgroundColor: 'white',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        cadeado:
        {
            width: 82,
            height: 100,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        botaoResetaSenha:
        {
            width: window.width * 0.8,
            height: window.height * 0.075,
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textPassword:
        {
            color:'#8A8B8E',
            fontSize: 18,
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
        },
        botaoFechaModal:
        {
            width: 16,
            height: 16,
            marginTop: -10,
            marginLeft: window.width * 0.8,
        },
    }
);