import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../login";
import Inscription from "../inscription";
import Dashboard from "../dashboard";
import ForgetPassword from '../forgetPassword'
import ProfileScreen from "../ProfileScreen";
import restaurant from "../restaurantsScreen";
import home from "../homeScreen";
import profile from "../ProfileScreen";
const screens = {
    
    Login : {
    
        screen : Login,
        
    },
    Inscription : {
        screen : Inscription,
    },
    ForgetPassword : {
        screen : ForgetPassword
    },
    Dashboard : {
        screen : Dashboard
    },
    ProfileScreen : {
        screen : ProfileScreen
    },
    home : {
        screen : home
    },
    restaurant : {
        screen : restaurant
    },
    profile : {
        screen : profile
    }

   
   
 

}

const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);