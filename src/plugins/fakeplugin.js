import React  from 'react';

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
	var matches,match,texts = [];
	var searchedLength = searchedString.length;
	var previousStartIndex,previousTextIndex = 0;
	var regexp = "/"+searchedString+"/g";


	if(regexp.text(text))
	{
		while ((match = regexp.exec(text)) != null) {
		  matches.push(previousTextIndex);

		  if(previousStartIndex<match.index)
		  {
		  	texts.push(text.substring(previousStartIndex,match.index));
		  	previousTextIndex++;
		  }

		  previousStartIndex = match.lastIndex;
		}
	}else
	{
		texts.push(text);
	}

	return {matches:matches,texts:texts};
}


export default class Smiley extends React.Component {

  checkActivate = (action) =>
  {
  		return true;
  }

 changeState = (state) =>
 {
 	let newstate = state;
 	let searchedString = ':)';
 	var filterData = getAllIndexOf(state.message.data,searchedString);
 	var domValue = [];

 	for(var i=0; i<filterData.texts.length;i++)
 	{
 		let images = [];
 		for(var j=0; j<filterData.matches.length;j++)
 		{
 			images.push(<Image source='http://www.infowebmaster.fr/img/sdz/rouge.png'/>);
 		}

 		domValue.push( <span>{filterData.texts[i]} images </span>)
 	}

 	return {...state,message:domValue};
 }

 render()
 {

 	return(null);
 }

};
