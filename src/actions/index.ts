export const deleteUser = (id : string) => {
    return {
        type: 'DELETE_USER',
        payload: id
    };
};

export const editUser = (data: {name: {first: string, last: string}, email: string, location: string, id: string}) => {
    return {
        type: 'EDIT_USER',
        payload: data
    };
};

export const FilterUser = (data: {name: string, email: string, loc: string, id: string}) => {
    return {
        type: 'FILTER_USERS',
        payload: data
    };
};

export const AddUser = (data: {name: string, email: string, location: string, id: string, picture: {medium: string}}) => {
    return {
        type: 'ADD_USER',
        payload: data
    };
};

export const getUsers = () => {
        return async (dispatch: any) => {
        const response = await fetch("https://randomuser.me/api/?results=10").then(res => res.json())
        dispatch({type: "GET_USERS", payload: response})
    };
};