import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import CreatePost from './views/CreatePost';
import UpdatePost from './views/UpdatePost';
import UpdateUser from './views/UpdateUser';


import Navbar from './components/Navbar';
import AlertMessage from './components/AlertMessage';

function App() {
  const [user, setUser] = useState();
  const [message, setMessage] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if(token){
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);

      fetch('http://localhost:5000/api/me', {
          method: 'GET',
          headers: myHeaders,
      }).then(res => res.json())
      .then(data => {
        setUser(data)
      })
    }
  }, []);

  function flashMessage(message, category){
      setMessage(message);
      setCategory(category);
  };


  function logUserOut(){
    localStorage.removeItem('token');
    setUser(null);
    flashMessage('You have logged out', 'primary')
  };

  return (
      <div className="App">
        <Navbar user={user} logUserOut={logUserOut} />
        {message ? <AlertMessage message={message} category={category} 
          flashMessage={flashMessage} /> : null}
        <div className='container'>
          <Routes>
              <Route path='/' element={<Home user={user} flashMessage={flashMessage} />} /> 

              <Route path='/register' element={<Register flashMessage={flashMessage} />} />
              <Route path='/login' element={<Login flashMessage={flashMessage} setUser={setUser} />} />
              <Route path='/update_user' element={<UpdateUser 
                flashMessage={flashMessage} user={user} setUser={setUser}/>} />
              
              <Route path='/create' element={
                <CreatePost flashMessage={flashMessage} user={user} />
              } />
              <Route path='/update_post/:postId' element={<UpdatePost flashMessage={flashMessage} user={user}/>} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
