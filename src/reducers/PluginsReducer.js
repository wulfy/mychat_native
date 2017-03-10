import * as plugins  from '../plugins'; 
const defaultState = {messages:[]};

export default function PluginsReducer(state=defaultState, action) {

	console.log( Object.keys(plugins).length + " plugins found");
	console.log(action);
	console.log(state);
	console.log("-------------------------");
	var newState = state;

	if(Object.keys(plugins).length >0)
		Object.keys(plugins).forEach(function(key) {
			var currentObject = new plugins[key];

			console.log("calling " + key);
			console.log(currentObject);

			var tempState = currentObject.changeState(action);
			
		    newState = {...newState,tempState};
		});

	return newState;

}