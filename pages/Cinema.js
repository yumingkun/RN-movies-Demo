/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';



export default class Cinemas extends Component {
    static navigationOptions = {
        title: '影院',
    };
    render() {
        const {state,goBack}=this.props.navigation;
        return (
            <View  >
                <Text>影院页</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({


});
