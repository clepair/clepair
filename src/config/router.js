/* Página de Configuração de Links e Menus */
import React from 'react';
import { StatusBar, Platform, StyleSheet, View,Dimensions} from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

//PÁGINAS
import Login from '../components/login/login';
import Register from '../components/login/register';
import Home from '../components/inicial/home'

export const FeedStack = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        },
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        },
    },
},
{
    initialRouteName: 'Login',
});


/*export const TabsNrSun = TabNavigator({
    NRSunSobre: {
        screen: NRSunSobre,
    },
    NRSunIncluso: {
        screen: NRSunIncluso,
    },
    NRSunFestas: {
        screen: NRSunFestas,
    },
    NRSunFotos: {
        screen: NRSunFotos,
    },
    NRSunMapa: {
        screen: NRSunMapa,
    },
},
{
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: '#13a5f6',
        inactiveTintColor: '#444444',
        labelStyle: {
            fontWeight: 'bold',
        },
        style: {
            backgroundColor: '#FFF',
            height: 35,
        },
        indicatorStyle: {
            backgroundColor: '#13a5f6',
            height: 3,
        },
        showIcon: false,
        scrollEnabled: true,
    },
});

export const TabsNrFun = TabNavigator({
    NRFunSobre: {
        screen: NRFunSobre,
    },
    NRFunIncluso: {
        screen: NRFunIncluso,
    },
    NRFunFestas: {
        screen: NRFunFestas,
    },
    NRFunFotos: {
        screen: NRFunFotos,
    },
    NRFunMapa: {
        screen: NRFunMapa,
    },
},
{
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: '#9350d5',
        inactiveTintColor: '#444444',
        labelStyle: {
            fontWeight: 'bold',
        },
        style: {
            backgroundColor: '#FFF',
            height: 35,
        },
        indicatorStyle: {
            backgroundColor: '#9350d5',
            height: 3,
        },
        showIcon: false,
        scrollEnabled: true,
    },
});

export const Drawer = DrawerNavigator({
    EventosInicial: {
        screen: EventosInicial,
        navigationOptions:{
            drawerLockMode: 'unlocked',
            drawer: {
                label: 'HOME',
            }
        }
    },
    MeusDados: {
        screen: MeusDados,
        navigationOptions:{
            drawerLockMode: 'unlocked',
            drawer: {
                label: 'Meus Dados',
            }
        }
    },
    NRSun: {
        screen: NRSun,
        navigationOptions:{
            drawerLockMode: 'unlocked',
            drawer: {
                label: 'NR SUN',
            }
        }
    },
    NRFun: {
        screen: NRFun,
        navigationOptions:{
            drawerLockMode: 'unlocked',
            drawer: {
                label: 'NR FUN',
            }
        }
    },
    SoliciteProposta: {
        screen: SoliciteProposta,
        navigationOptions:{
            drawerLockMode: 'unlocked',
            drawer: {
                label: 'Proposta',
            }
        }
    },
    NrChannel: {
        screen: NrChannel,
        navigationOptions:{
            drawerLockMode: 'unlocked',
            drawer: {
                label: 'NR CHANNEL',
            }
        }
    },
    MeusDadosForm: {
        screen: MeusDadosForm,
        navigationOptions:{
            drawerLockMode: 'unlocked',
            drawer: {
                label: 'Meus Dados Form',
            }
        }
    },
    SolicitePropostaEvento: {
        screen: SolicitePropostaEvento,
        navigationOptions:{
            drawerLockMode: 'unlocked',
            drawer: {
                label: 'Proposta Evento',
            }
        }
    },
    PropostaOk: {
        screen: PropostaOk,
        navigationOptions:{
            drawerLockMode: 'unlocked',
            drawer: {
                label: 'Proposta Ok',
            }
        }
    },
    Login: {
        screen: FeedStack,
        navigationOptions:{
            drawerLockMode: 'locked-closed',
            drawer: {
                label: 'Sair',
            }
        }
    },
},
{
    initialRouteName: 'EventosInicial', 
    contentOptions: {
        activeTintColor: '#e91e63',
        activeBackgroundColor: '#FFF',
        style: {
            marginVertical: 0,
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        }
    }
}
);*/