import { ScrollView, StatusBar, Alert, AsyncStorage, Platform, StyleSheet, Image, View, TextInput, TouchableOpacity, Text, Picker, KeyboardAvoidingView, Dimensions} from 'react-native';

const window = Dimensions.get('window');

export const colors = {
    black: 'transparent',
    gray: 'transparent',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1,
        paddingTop: 50
    },
    scrollviewContentContainer: {
        paddingBottom: 50
    },
    exampleContainer: {
        marginBottom: 30
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 25
    },
    sliderContentContainer: {
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
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
});