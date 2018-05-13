import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';

export default class Item extends Component{
    render(){
        const {image,title,year,cate,name,fen,onPress}=this.props;
        return(
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Image
                   style={styles.item}
                   source={{uri:image}}
                />

                <Text style={styles.right}>
                    <Text  style={styles.title}>
                        {title}{'\n'}{'\n'}
                    </Text>

                    <Text >
                        <Text style={styles.fen}>{'\n'}评分：{fen}</Text>
                        <Text>{'\n'}时间：{year}</Text>
                        <Text>{'\n'}导演：{name}</Text>
                        <Text>{'\n'}分类：{cate}</Text>
                    </Text>
                </Text>

            </TouchableOpacity>
        );
    }
}
const styles=StyleSheet.create({
    container:{

        flexDirection:'row',
        marginBottom:10,
        padding:10,
        backgroundColor: 'rgba(0, 52, 52, 0.1)',
        borderRadius:10,

    },
    item:{
        width:100,
        height:140,
        borderRadius:5,
    },
    right:{
        marginTop:10,
        marginLeft:15,
    },
    title:{
        fontWeight:"900",
        fontSize:18,
        marginLeft:40,
    },
    fen:{
        color:"#F15A24"
    },

});

