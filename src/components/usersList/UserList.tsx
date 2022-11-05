import React from 'react'
import { connect } from 'react-redux'
import { DataFromServer } from './UserCard'
import { useState, useEffect } from 'react'
import { getUsers } from '../../actions'
import UserCard from './UserCard'
import FormDialog from './Dialogs/FormDialog'
import DeleteDialog from './Dialogs/DeleteDialog'
import './userlist.css'
import AddDialog from './Dialogs/AddDialog'

const mapStateToProps = (state: {users_list: Array<DataFromServer>}) => {
    return { userslist: state.users_list }
} 

const UserList: React.FC<{userslist: Array<DataFromServer>, getUsers: () => void}> = ({userslist, getUsers}) => {
    useEffect(() => {
        getUsers()
    },[])

    const [open, setOpen] = useState<boolean>(false);
    const [Deleteopen, setDeleteOpen] = useState<boolean>(false);
    const [Addopen, setAddOpen] = useState<boolean>(false);
    const [editData, setEditData] = useState<any>(null);
    return (
            <div>
                <div className='cards_container'>
                    {userslist.length > 0 && userslist.map((item: any) => {
                        return <UserCard data={item} setOpen={setOpen} setEditData={setEditData} setDeleteOpen={setDeleteOpen}/>
                    })}
                </div>
                <div>
                    {editData && <FormDialog open={open} setOpen={setOpen} editData={editData}/>}
                    {editData && <DeleteDialog editDataId={editData.login.uuid} DeleteOpen={Deleteopen} setDeleteOpen={setDeleteOpen}/>}
                    {Addopen && <AddDialog open={Addopen} setOpen={setAddOpen}/>}
                </div>
                <div>
                    <button className='add_button' onClick={() => setAddOpen(true)}>+</button>
                </div>
            </div>
        );
}

export default connect(mapStateToProps, {getUsers})(UserList)