import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { connect } from 'react-redux'
import { deleteUser } from '../../../actions';

const DeleteDialog: React.FC<{setDeleteOpen: (state: boolean) => void, deleteUser: (id: string) => void, editDataId: string, DeleteOpen: boolean}> = ({deleteUser, editDataId, DeleteOpen, setDeleteOpen}) => {    

  const handleClose = () => {
    setDeleteOpen(false);
  };
  const handleDelete = () => {
    deleteUser(editDataId)
    setDeleteOpen(false)
  }
 
  return (
    <div>
      <Dialog open={DeleteOpen} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state: {users_list: Array<any>}) => {
    return { users_list: state.users_list}
  }

export default connect(mapStateToProps, { deleteUser })(DeleteDialog)