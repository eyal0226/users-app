import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataFromServer } from '../UserCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { connect } from 'react-redux'
import { AddUser} from '../../../actions';

const AddDialog: React.FC<{open: boolean, setOpen: (state: boolean) => void, users_list: Array<DataFromServer>, AddUser: (state: any) => void}> = ({open, setOpen, users_list, AddUser}) => {    
  const [formData, setFormData] = useState<{name: {first: string, last: string}, email: string, loc: string, id: string, picture: {medium: any}}>({name: {first: "", last: ""}, email: "", picture:{medium: ""}, loc: "", id: (Math.floor(Math.random() * 1000)).toString()})
  const [error, setError] = useState<string>("")
  const handleClose = () => {
    setOpen(false);
  };
  const doesEmailExist = (users_list: Array<DataFromServer>, mail: string) => {
        let does_exist = false
        users_list.forEach(user => {if (user.email === mail) { does_exist = true}})
        return does_exist
  }
  const handleSubmit = () => {
    if (formData.name.first.length < 3){
        setError("First Name has to be at least 3 letters.")
    }
    else if (formData.name.last.length < 3){
        setError("Last Name has to be at least 3 letters.")
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email))){
        setError("Email Not in Format.")
    }
    else if (formData.loc.length < 2){
        setError("Please enter a location.")
    }
    else if (doesEmailExist(users_list, formData.email)) {
        setError("Email Already exists.")
    }
    else 
    {
        AddUser(formData)
        setFormData({name: {first: "", last: ""}, email: "", loc: "", id: "", picture: {medium: ""}})
        setOpen(false)
        setError("")
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Add user</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => setFormData({...formData, name: {...formData.name, first: e.target.value}})}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => setFormData({...formData, name: {...formData.name, last: e.target.value}})}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Location"
            label="Location"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => setFormData({...formData, loc: e.target.value})}
          />
          <DialogContentText style={{color: "red"}}>
            {error}
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state: {users_list: Array<any>}) => {
    return { users_list: state.users_list}
  }

export default connect(mapStateToProps, {AddUser})(AddDialog)