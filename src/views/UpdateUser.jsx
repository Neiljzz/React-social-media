import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateUser({ user, setUser, flashMessage }) {
    const navigate = useNavigate();
    const [updateUser, setUpdateUser] = useState(user);

    useEffect(() => {
        if (!user){
            flashMessage('You must be logged in to update user info', 'danger');
            navigate('/login');
        }
    })

    const handleUpdate = event => {
        event.preventDefault();
        // console.log(event);

        let password = event.target.newPassword.value;
        if (!password){
            flashMessage('Password can not be empty', 'warning');
        } else{
            let token = localStorage.getItem('token');
            // Set up the request headers
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', `Bearer ${token}`);

            let requestBody = JSON.stringify({
                username: updateUser.username,
                email: updateUser.email,
                password
            })

            fetch(`http://localhost:5000/api/users/${user.id}`, {
                method: 'PUT',
                headers: myHeaders,
                body: requestBody
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                      flashMessage(data.error, 'danger');
                    } else {
                      setUser({...user, ...updateUser})
                      flashMessage(`${data.username} has been updated`, 'success');
                      navigate('/');
                    }
                })
        }
    }

  return (
    <>
      <h3 className="text-center">Update User Info</h3>
      <form action="" onSubmit={handleUpdate}>
        <div className="form-group">
          <input type="text" name="username" className="form-control my-3" 
          placeholder='Enter Username' value={updateUser.username} onChange={
            (e) => setUpdateUser({ ...updateUser, username: e.target.value})
            }/>
          <input type="text" name="email" className="form-control my-3" 
            placeholder='Enter Email' value={updateUser.email} onChange={
              (e) => setUpdateUser({ ...updateUser, email: e.target.value})
              }/>
          <input type="password" name="newPassword" className="form-control my-3" 
            placeholder='New Password'/>
          <input type="submit" value="Update" className='btn btn-success w-100' />
        </div>
      </form>
    </>
  )
}
