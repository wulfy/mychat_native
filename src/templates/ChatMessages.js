import React from 'react';
import { connect }            from 'react-redux';
import {sendMessage}  from '../actions/MessageActions';
import {
  Text,
  TextInput,
  Image,
  View,
  ScrollView,
  ListView
} from 'react-native';

export default connect(state => ({ message: state.message}))(
 class ChatMessages extends React.Component {
  constructor(props) {
    super(props);
    
  }
  render() 
  {
  	let messages = this.props.message ? this.props.message.messages : [];
  	messages = typeof messages != "undefined" ? messages  : [];
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var datasource = ds.cloneWithRows(messages);
    console.log("rendering message");
    console.log(messages);
    console.log("render");
    //utiliser un composant pour interprêter le contenu du serveur (et essayer de ne pas avoir à s'en soucier ici)
    return (
      <View>
          	<Text> Last messages : </Text>

            <ListView
              dataSource={datasource}
              renderRow={(data) => 
              <View>
                <View style={{float:'left',width:'20%',height:50, backgroundColor:'skyblue'}}>
                  <Text className="message" style={data.style}>{data.login}</Text> 
                </View>
                <View style={{float:'right',width:'70%',height:50,backgroundColor:'powderblue'}}>
                  {data.message}
                </View>
              </View>
            }
            />
      </View>

    );
  }
})