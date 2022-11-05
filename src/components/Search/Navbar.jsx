import './navbar.css';
import log from '../../assets/icons/log.jpg'
import { connect } from 'react-redux'
import { useState } from 'react';
import Autocomplete  from './Autocomplete'
import {FilterUser} from '../../actions/index'


const Navbar = ({userslist, FilterUser}) => {
    const search_data = [[],[],[],[]]
    console.log(userslist)
    if (userslist.length > 0){
    userslist.forEach(user => {
        search_data[0].push(user.name.first + " " + user.name.last)
        search_data[1].push(user.email)
        search_data[2].push(user.location.state + " " + user.location.city + " " + user.location.street.name + " " + user.location.street.number)
        search_data[3].push(user.login.uuid)
    })}
    const [inputData, setInputData] = useState({name: "", email: "", loc: "", id: ""})
    console.log(inputData)
    const search = () => {
            FilterUser(inputData)
        }
    return (
        <div className='container'>
            <img className='logo' src={log} alt="logo"/>
            {/* <img className='logo' src={logo} alt="logo"/> */}
            <div className='input_section'>
                <Autocomplete placeholder={"Name"} setInputData={setInputData} inputData={inputData} param={"name"} options={search_data[0]}/>
                <Autocomplete placeholder={"Email"} setInputData={setInputData} inputData={inputData} param={"email"} options={search_data[1]}/>
                <Autocomplete placeholder={"Location"} setInputData={setInputData} inputData={inputData} param={"loc"} options={search_data[2]}/>
                <Autocomplete placeholder={"ID"} setInputData={setInputData} inputData={inputData} param={"id"} options={search_data[3]}/>
                <button className='search_btn' onClick={search}>Search</button>
            </div>
            <hr className='divider'></hr>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return { userslist: state.users_list }
} 

export default connect(mapStateToProps, {FilterUser})(Navbar);