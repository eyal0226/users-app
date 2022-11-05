import React from 'react'
import './usercard.css'
import { Phone, Mail, LocationIcon} from "../../assets/icons/icons"
import pencil from "../../assets/icons/pencil.png"
import bin from "../../assets/icons/bin.png"


export interface DataFromServer {
    gender: string,
    email: string,
    name: { title: string, first: string, last: string}
    picture: {large: string, medium: string, thumbnail: string},
    login: {uuid: string},
    phone: string,
    location: Location | any
    cell: any,
    dob: any,
    id: { name: string, value: string},
}

interface Location {
    city: string,
    coordinates: { latitude: string, longitude: string}
    country: string,
    postcode: number,
    state: string,
    street: {number: number, name: string}
    timezone: { offset: string, description: string}
}

interface UserCardProps {
    data: DataFromServer,
    setOpen: (state: boolean) => void
    setEditData: (user: DataFromServer) => void
    setDeleteOpen : (state: boolean) => void
}


const UserCard: React.FC<UserCardProps> = ({data, setOpen, setDeleteOpen,setEditData}) => {
    const didLocationChange = () => {
        if (!data.location.city)
        {
            return data.location
        }
        else
        {
            return `${data.location.state}, ${data.location.city}, ${data.location.street.name} ${data.location.street.number}`
        }
    } 
    let contactDetails = [
        {data: data.email, comp: <Mail/>}, 
        {data: data.phone, comp: <Phone/>}, 
        {data: didLocationChange(), comp: <LocationIcon/>}
    ];
        return (
            <div className='card_container'>
                {data.picture.medium && <img className='avatar' alt="avt" src={data.picture.medium}/>}
                <div className='user_info'>
                    {data.name.title ? <p className='title'>{data.name.title}.{data.name.first} {data.name.last}</p> : <p className='title'>{data.name.first} {data.name.last}</p>}
                    {
                        contactDetails.map((item) => {
                            return (
                                <div className='row_info'>
                                    {item.data && item.comp}
                                    <p className='data_font'>{item.data}</p>
                                </div>
                            )
                        })}
                    <div className='edit_delete'>
                        <div onClick={() => {setEditData(data); setOpen(true)}}><img className='change_icon' src={pencil} alt="del"/></div>
                        <div onClick={() => {setEditData(data); setDeleteOpen(true)}}><img className='change_icon' src={bin} alt="del"/></div>
                    </div>
                </div>
            </div>
        );
}

export default UserCard