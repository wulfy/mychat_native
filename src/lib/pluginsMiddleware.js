import * as reducers  from '../plugins';

export default function pluginsMiddleware() {
  return next => action => {

  	const { type, ...rest } = action;
  	console.log("middleware");

  	//if the action type is not handle by this middleware
  	if(action.type != "test")
  		return next(action);
  }

}