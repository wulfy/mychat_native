import React  from 'react';
import {
  Text,
  TextInput,
  Image,
  View
} from 'react-native';

const smileysCharMapping = {
"<:)" : "::ange::" ,
">:(" : "::angry::",
"oO" : "::blink::",
";)" : "::clin::",
":p" : "::langue::"
};
const smileysMapping = {
"ange" : "http://www.infowebmaster.fr/img/sdz/ange.png",
"angry" : "http://www.infowebmaster.fr/img/sdz/angry.gif",
"blink" : "http://www.infowebmaster.fr/img/sdz/blink.gif",
"clin" : "http://www.infowebmaster.fr/img/sdz/clin.png",
"langue" : "http://www.infowebmaster.fr/img/sdz/langue.png"
};


function isOdd(num) { return num % 2;}

function replaceCharBySmileysCode(text)
{
	var str = text;
	var last = {};
	str = str.replace(/\<:\)|\>:\(|oO|;\)/gi, function(matched){
	  return smileysCharMapping[matched];
	});

	return str;
}

export default class Smiley{

  checkActivate = (type) =>
  {
  		return type == "SOCKET_MESSAGE_RECEIVED";
  }

 changeAction = (action) =>
 {
 	let newAction = action;
 	let searchedString = ":\\)";
 	var filterData = "";
 	var domValue = [];
 	console.log(action);
 	let {message} = action;
 	let {data,login} = message;
    let {text,date} = data;

 	if(text)
 	{
 		
 		var transformedText = replaceCharBySmileysCode(text);
	 	var tabTransform = transformedText.split("::");
	 	var newText = "";
	 	let currentText = "";
	 	for(let i=0; i<tabTransform.length;i++)
	 	{
	 		currentText = tabTransform[i];
	 		if(isOdd && smileysMapping[currentText])
	 			domValue.push(<Image key={'msg-img'+i} source={{uri:smileysMapping[currentText]}} />);
	 		else if(currentText.length > 0)
				domValue.push(<Text> {currentText}</Text>);		 	
	 	}

	 	newAction = {...action,message:{...message,data:{...data,text:domValue}}};
 		console.log("newAction smileys");
 		console.log(newAction);
 	}

 	return newAction;

 }

 render()
 {

 	return(null);
 }

};
