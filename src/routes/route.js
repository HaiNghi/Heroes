import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Root, Icon } from 'native-base';
import SlideMenu from '../components/SlideMenu';
// import Login from '../containers/Login';
import Home from '../containers/Home';
import PackageRegister from '../containers/PackageRegister';
import UserNotification from '../containers/UserNotification';

const MainNavigator = DrawerNavigator({
    Home: { 
        screen: Home
    },
    UserNotification: {
        screen: UserNotification
    }   
}, 
{
    contentComponent: SlideMenu,
    headerMode: 'none'    
});

const AppNavigator = StackNavigator({
    MainNavigator: { 
        screen: MainNavigator 
    },
    PackageRegister: { screen: PackageRegister }
}, 
{
    initialRouterName: 'Home',
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
