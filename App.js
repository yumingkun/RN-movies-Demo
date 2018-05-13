import React from 'react';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import Detail from "./pages/Detail";
import List from "./pages/List";
import Cinemas from "./pages/Cinema";
import MyMovies from "./pages/MyMovies";

const MyTab=TabNavigator({
    List:{screen:List},
    Cinemas:{screen:Cinemas},
    MyMovies:{screen:MyMovies},
},{
    tabBarPosition:'bottom',
    tabBarOptions: {
      style:{
          backgroundColor:'#222111',
      }
    },
},);

const rn = StackNavigator({
    MyTab:{screen:MyTab},
    // List: {screen: List},
    Detail: {screen: Detail},
    // Cinemas:{screen:Cinemas},
    // MyMovies:{screen:MyMovies},
});

 export  default rn;