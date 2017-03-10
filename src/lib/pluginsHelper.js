import * as plugins  from '../plugins'; 

export default class PluginsHelper{

  /** call all actions as reducers to handle / override message computed by core reducers
  plugins can only change action result, not the state to prevent 
  **/
  apply = (action) =>
  {
  	  var tempAction = "";
  	  var currentAction = action;
	  console.log(plugins);
	  if(Object.keys(plugins).length >0)
	    Object.keys(plugins).forEach(function(key) {
	      var currentObject = new plugins[key];

	      console.log("calling " + key);
	      console.log(currentObject);

		      if(currentObject.checkActivate(action.type))
		      {
		      	tempAction = currentObject.changeAction(currentAction);
		        currentAction = {...currentAction,...tempAction};
		    }
	    });

		return currentAction;
	}

	test()
	{

	}
};

