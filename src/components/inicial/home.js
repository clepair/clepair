import React, { Component } from 'react';
import { ScrollView, StatusBar, Alert, AsyncStorage, Platform, StyleSheet, Image, View, TextInput, TouchableOpacity, Text, Picker, KeyboardAvoidingView, Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import util from 'util';
var moment = require('moment');
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ENTRIES1, ENTRIES2 } from '../static/home';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from '../static/SliderEntry';
import styles, { colors } from '../styles/index.style';

const window = Dimensions.get('window');
const slider1Ref = null;
const SLIDER_1_FIRST_ITEM = 1;

export default class Home extends Component 
{
    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            slider1Ref: null
        };
    }

    _renderItem ({item, index}) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
            />
        );
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

    carregaVoltar = () => {
        this.props.navigation.navigate('Login');
    }

    render(){
        const { slider1ActiveSlide, slider1Ref } = this.state;

        return(
            <View style={styles.container}> 
                <Image
                    style={styles.imgBackground}
                    source={require('../../../assets/bg_pages2.png')}
                />

                <View style={styles.formHeader}>
                    <TouchableOpacity onPress={this.carregaVoltar}>
                        <Image
                            style={styles.icoVoltar}
                            source={require('../../../assets/ico_menu.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                
                    <Carousel
                        ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }); } }}
                        data={ENTRIES1}
                        renderItem={this._renderItemWithParallax}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        hasParallaxImages={true}
                        firstItem={SLIDER_1_FIRST_ITEM}
                        inactiveSlideScale={0.95}
                        inactiveSlideOpacity={0.6}
                        enableMomentum={false}
                        containerCustomStyle={styles.slider}
                        contentContainerCustomStyle={styles.sliderContentContainer}
                        loop={true}
                        loopClonesPerSide={2}
                        autoplay={true}
                        autoplayDelay={500}
                        autoplayInterval={3000}
                        onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                    />
                    
                    <Pagination
                        dotsLength={ENTRIES1.length}
                        activeDotIndex={slider1ActiveSlide}
                        containerStyle={{ backgroundColor: 'transparent' }}
                        dotStyle={{
                            width: 40,
                            height: 15,
                            borderRadius: 8,
                            marginHorizontal: 8,
                            backgroundColor: '#A7EF00'
                        }}
                        inactiveDotStyle={{
                            width: 15,
                            height: 15,
                            borderRadius: 8,
                            marginHorizontal: 8,
                            backgroundColor: '#00BFE5'
                            // Define styles for inactive dots here
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        carouselRef={slider1Ref}
                        tappableDots={!!slider1Ref}
                    />

                    <Pagination
                        dotsLength={ENTRIES1.length}
                        activeDotIndex={slider1ActiveSlide}
                        containerStyle={{ backgroundColor: 'transparent' }}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 8,
                            backgroundColor: 'rgba(255, 255, 255, 0.92)'
                        }}
                        inactiveDotStyle={{
                            // Define styles for inactive dots here
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                </View>
            </View>
        )
    }
}

// Formatação de estilos
/*const styles = StyleSheet.create
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
            marginTop: 15,
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
        entrarContainer:
        {
            opacity: 1
        },
        icoVoltar:
        {
            width: 20,
            height: 20,
            marginTop: 35,
            //marginLeft: window.width * -0.3,
            //marginBottom: 17
        },
        paginationContainer: {
            paddingVertical: 8
        },
        paginationDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 8
        }
    }
);*/