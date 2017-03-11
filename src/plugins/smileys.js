import React  from 'react';
import {
  Text,
  TextInput,
  Image,
  View
} from 'react-native';
/*
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}

*/

function getAllIndexOf(text,searchedString)
{
	var matches = [];
	var match = [];
	var texts = [];
	var searchedLength = searchedString.length;
	var previousStartIndex =0
	var previousSmileyIndex = 0;
	var regexp = new RegExp(searchedString,"g");
	var watchdog = 0;



	while ((match = regexp.exec(text)) != null && watchdog <1000) {

		watchdog ++;

	  if(previousStartIndex<match.index)
	  {
	  	texts[previousSmileyIndex] = text.substring(previousStartIndex,match.index);
	  }

	  matches[previousSmileyIndex] = match.index;
	  previousSmileyIndex++;

	  previousStartIndex = regexp.lastIndex;
	  console.log("previousStartIndex"+ previousStartIndex);
	  console.log("match.index"+ match.index);

	}

	if(previousStartIndex < text.length)
	{

		texts[previousSmileyIndex] = text.substring(previousStartIndex);
	}


	console.log(" matches " + previousStartIndex);
	console.log(matches);

	return {matches:matches,texts:texts, size:previousSmileyIndex};
}


export default class Smiley{

  checkActivate = (type) =>
  {
  		return type == "SOCKET_MESSAGE_RECEIVED";
  }

 changeAction = (action) =>
 {
 	//console.log("change action :");
 	//console.log(action);
 	let newAction = action;
 	let searchedString = "smile";
 	var filterData = "";
 	var domValue = [];

 	if(action.message)
 	{
 		
 		filterData = getAllIndexOf(action.message.message,searchedString);
 		console.log("filter data");
 		console.log(filterData);
 		let images = null;
	 	let text = null;

	 	for(var i=0; i<=filterData.size;i++)
	 	{
	 		images = null;
	 		text = null;

	 		if(typeof filterData.matches[i] != 'undefined')
	 			images = <Image source={{uri:"http://www.infowebmaster.fr/img/sdz/rouge.png"}} />;

	 		if(typeof filterData.texts[i] != 'undefined')
	 			domValue.push(<View>
	 							<Text> {filterData.texts[i]}</Text> 
	 							{images}
	 						   </View>);
	 		else if(images != null )
	 			domValue.push(images);

		 	
	 	}

	 	domValue = domValue.length > 0 ?  domValue : action.message.message;

	 	
 		newAction = {...action,message:{...action.message,message:domValue}};
 		console.log("newAction");
 		console.log(newAction);
 	}

 	return newAction;

 }

 render()
 {

 	return(null);
 }

};
