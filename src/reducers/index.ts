import { combineReducers } from "redux";


export const usersList = (usersList: Array<any> = [], action: { payload: string | any, type: string}) => {
    if (action.type === 'DELETE_USER'){
        return usersList.filter(user => user.login.uuid !== action.payload)
    }
    else if (action.type ==='EDIT_USER')
    {
        usersList.forEach(user => {if (user.login.uuid === action.payload.id){
            user.name.first = action.payload.name.first
            user.name.last = action.payload.name.last
            user.email = action.payload.email
            user.location = action.payload.location
        }})
    }
    else if (action.type ==="FILTER_USERS")
    {
        return usersList.filter(user => {
            console.log((user.name.first + " " + user.name.last === action.payload.name) + " " + (user.email === action.payload.email) + " "+ (user.login.uuid === action.payload.id) + " " + (user.location.state + " " + user.location.city + " " + user.location.street.name + " " + user.location.street.number === action.payload.loc))
            return user.name.first + " " + user.name.last === action.payload.name || 
            user.email === action.payload.email ||
            user.location.state + " " + user.location.city + " " + user.location.street.name + " " + user.location.street.number === action.payload.loc ||
            user.login.uuid === action.payload.id
        })
    }
    else if (action.type ==='GET_USERS')
    {
        return action.payload.results
    }
    else if (action.type ==='ADD_USER')
    {
        usersList.push({name:{ first: action.payload.name.first, last: action.payload.name.last}, email: action.payload.email, location: action.payload.loc, picture: {medium: action.payload.picture.medium}, login: {uuid: action.payload.id}})
        return usersList
    }

    return usersList 
}; 

export default combineReducers({
    users_list: usersList
}); 