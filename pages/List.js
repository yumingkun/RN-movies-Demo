import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    RefreshControl,
    TouchableOpacity
} from 'react-native';

import movies from  '../src/douban';
import Item from '../src/Item';



export  default class List  extends  Component{
    constructor(props){
        super(props);
        this.state={
            movies:movies.subjects,
            refreshing:false,
        };
    }

    static navigationOptions={
        title:'列表页',
    };
    getMoviesFromApiAsync=()=>{
        this.setState({
            refreshing:true,
            childState:'',
        });
        setTimeout(()=>{
            this.setState({refreshing:false,});
        },2000);
        return fetch('http://api.douban.com/v2/movie/in_theaters')
            .then((response) => response.text())
            .then((responseText) => {
                const json=JSON.parse(responseText);
                this.setState({
                    movies:json.subjects,
                });
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    };
    componentDidMount(){
        // setTimeout(()=>{ this.getMoviesFromApiAsync()},1000)
    }
    render(){
        const {movies,refreshing,childState}=this.state;
        const { navigate } = this.props.navigation;
        return (
            <TouchableOpacity  style={styles.container}>
                {/*<Text>子组件传回来的值{childState}</Text>*/}
                <FlatList
                    data={movies}
                    keyExtractor={item=>item.id}
                    renderItem={({item}) => <Item title={item.title} fen={item.rating.average} image={item.images.medium} year={item.year} cate={item.genres} name={item.directors[0].name}    onPress={()=>navigate('Detail',{name:item.title ,id:item.id,callback:(data)=>{this.setState({childState:data})}})}/>}
                    onRefresh={this.getMoviesFromApiAsync}
                    refreshing={refreshing}
                />


            </TouchableOpacity>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#eae7ff',
        flex:1,
    }
});


