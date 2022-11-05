import React from 'react';
import UserList from './usersList/UserList';
import Navbar from './Search/Navbar';


const App: React.FC = () => {
  
  return (
    <div className="App">
      <Navbar/>
      <UserList/>
    </div>
  );
}

export default App;
