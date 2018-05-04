import React, { Component } from 'react';
import { Dimensions, AsyncStorage, StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Login from './src/components/login/login';
import { FeedStack } from './src/config/router';

const window = Dimensions.get('window');

export default class App extends Component 
{
  /*constructor(props){
    super(props);

    this.state = {
        idUser: "",
    };

    try{
        AsyncStorage.getItem('IdUser').then((value) => {
            this.setState({
                idUser: value
            })
        })
    }
    catch(err){
        console.log(err)
    }
  }*/

  render() {
    //Não deixa a tela rotacionar
    /*Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

    AsyncStorage.setItem('KeyHash', "51f122be15ba05d259ed762846e8fcfd");

    //Verifica se o usuário tem o código ID do usuário logado, se tiver, pula a tela de login
    if(this.state.idUser!=null)
    {
      return (
        <Drawer />
      );
    }
    else
    {
      return (
        <FeedStack />
      );
    }*/

    return (
      <FeedStack />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  videoFormata: {
    width: window.width,
    height: window.height,
  }
});