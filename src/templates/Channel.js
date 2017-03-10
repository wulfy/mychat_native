import React                  from 'react';

export default class Calendrier extends React.Component {
  render() 
  {
  	let {chanId} = this.props.params;
    return (
      <div id="content">
          <div id="channel"> Le nom de la room : {chanId} </div>
      </div>
    );
  }
}