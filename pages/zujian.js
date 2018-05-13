import React, { Component } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

export default class Zujian extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View  >
                <TextInput
                    style={styles.zuJian}
                    placeholder="请输入"
                    onChangeText={(text) => this.setState({text})}
                />
                <Text >
                    {this.state.text}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   zuJian:{
       width:160,
       height:40,
   }
});