import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ flashMessage, setUser }) {

    const navigate = useNavigate();

    async function handleLogin(event){
        event.preventDefault();

        let username = event.target.username.value;
        let password = event.target.password.value;

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'text/plain');
        let stringToEncode = `${username}:${password}`
        myHeaders.append('Authorization', `Basic ${btoa(stringToEncode)}`);

        let formData = JSON.stringify({username, password })
        console.log(formData)

        fetch('http://localhost:5000/api/token', {
            method: 'POST',
            headers: myHeaders,
            body: formData,
        }).then(res => res.json())
        .then(data => {
            if (data.error){
                flashMessage(data.error, 'danger');
            } else {
                // Get the token and token expiration from the response data
                console.log(data);
                let token = data.token;

                // Store the value in local storage on the browser
                localStorage.setItem('token', token);

                // Change the state of loggedIn to true
                getMe(token);

                // flash a success message and redirect
                flashMessage('You have successully logged in', 'success');
                navigate('/');
            }
        })
    };

    async function getMe(token){
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);

      fetch('http://localhost:5000/api/me', {
          method: 'GET',
          headers: myHeaders,
      }).then(res => res.json())
      .then(data => {
        setUser(data);
      })
    }

    return (
        <>
            <h3 className="text-center">Log In Here!</h3>
            <form action="" onSubmit={handleLogin}>
                <div className="form-group">
                    <input type="text" name="username" className="form-control my-3" placeholder='Enter Username' />
                    <input type="password" name="password" className="form-control my-3" placeholder='Enter Password' />
                    <input type="submit" value="Log In" className='btn btn-success w-100' />
                </div>
            </form>
        </>
    )
}
