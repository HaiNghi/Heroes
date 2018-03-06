import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Root, Icon } from 'native-base';
import SlideMenu from '../components/SlideMenu';
// import Login from '../containers/Login';
import Home from '../containers/Home';
import Histories from '../containers/Histories';
import Notifications from '../containers/Notifications';
import HelpCentre from '../containers/HelpCentre';
import PackageRegister from '../containers/PackageRegister';
import DetailItem from '../components/HistoryItem/DetailItem';
import HelpCentreItem from '../components/HelpCentreItem';
import Login from '../containers/Login';
import Register from '../containers/Register';

const MainNavigator = DrawerNavigator({
    Home: { 
        screen: Home
    },
    Histories: { 
        screen: Histories
    },  
    DetailItem: { 
        screen: DetailItem
    }, 
    Notifications: { 
        screen: Notifications
    },  
    HelpCentre: { 
        screen: HelpCentre
    },
    HelpCentreItem: { 
        screen: HelpCentreItem
    },
        
}, 
{
    contentComponent: props => <SlideMenu {...props} />,
    headerMode: 'none'    
});

const AppNavigator = StackNavigator({
    Login: {
        screen: Login
    },
    MainNavigator: { 
        screen: MainNavigator 
    },
    PackageRegister: { 
        screen: PackageRegister 
    },
    Register: { 
        screen: Register 
    }
}, 
{
    initialRouterName: 'Login',
    headerMode: 'none', 
    drawerPosition: 'Left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'  
});

export default () => 
    <Root>
        <AppNavigator />
    </Root>;
