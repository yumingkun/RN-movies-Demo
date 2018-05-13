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
    ImageBackground,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage,
    Linking,
} from 'react-native';



const api='http://api.douban.com/v2/movie/subject';

export default class Detail extends Component {
    static navigationOptions = {
        title: '详情页',
    };
    state={
        data:{},
        ready:false,
    };
    async componentDidMount(){
        const {state:{params:{id}}}=this.props.navigation;

        let textData,jsonData;

        textData=await AsyncStorage.getItem(id);
        if (textData){//判断本地是否有数据
            // alert('数据来自本地');
        } else{
            const rawData=await fetch(`${api}/${id}`);
            textData=await rawData.text();//获取的数据先装换成text
            // alert('数据来自服务器');
        }

        //反序列化
         jsonData=JSON.parse(textData);
        //"http://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p51597.webp"

        //序列化and存储
        AsyncStorage.setItem(id,textData);

        //把后缀换一下
        jsonData.image=jsonData.images.large.replace('webp','jpg');
        this.setState({
            data:jsonData,
            ready:true,
            videoUri:'',
        });
        this.fetchVideo(jsonData.mobile_url);
    }
    fetchVideo= async(mobile_url)=>{
        let pageHtml=await fetch(mobile_url);
        pageHtml=await pageHtml.text();
        const  regex=/href="([\w|\W]*\.mp4)"/;
        const result=pageHtml.match(regex);
        if (result && result[1]){
            const  videoUri=result[1];
            this.setState({
                videoUri:videoUri
            });
        }
    };
    playVideo=()=>{
        const {videoUri}=this.state;
        if (videoUri){
            Linking.openURL(videoUri);
        } else{
            alert("正在获取，请稍后");
        }

    };


    render() {
        // const {state,goBack}=this.props.navigation;
        const {data :{title,summary,image} ,ready}=this.state;
        return (
            <View  >
                {
                    ready?
                        <View style={styles.container}>

                            <TouchableOpacity onPress={this.playVideo}>
                                <ImageBackground source={{uri:image}} style={styles.image}>
                                    <Image source={require('../src/play.png')} style={styles.play}/>
                                </ImageBackground>
                            </TouchableOpacity>

                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.content}>简介：{summary}</Text>

                        </View>
                        :
                        <ActivityIndicator size="large" style={styles.loding}/>//加载动画

                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    image:{
        width:160,
        height:200,
        marginTop:10,
        borderRadius:10,
        overflow:'visible',
        zIndex:1,
    },
    title:{
        marginTop:5,
        fontSize:20,
        fontWeight:'900',
    },
    content:{
        padding:20,
    },
    loding:{
        marginTop:200,
    },
    play:{
        width:80,
        height:80,
        position:'absolute',
        right:40,
        bottom:50,
        opacity:0.6,
    }

});
