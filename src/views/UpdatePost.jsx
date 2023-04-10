import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function UpdatePost({ user, flashMessage}) {
    const params = useParams();

    const [post, setPost] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/${params.postId}`)
            .then(res => res.json())
            .then(data => {
                setPost(data);
            })
    }, [params.postId])

    const navigate = useNavigate();

    useEffect(() => {
        if (!user){
            flashMessage('You must be logged in to update a new post', 'danger');
            navigate('/login');
        } else if(post.author && user.id !== post.author.id ){
            flashMessage('Only the author can edit the post', 'danger');
            navigate('/');
        }
    }, [user, post])

    async function handleSubmit(e){
        e.preventDefault();

        // Get the data from the form
        let title = post.title;
        let content = post.content;

        // Get the token from localStorage
        let token = localStorage.getItem('token');

        // Set up the request headers
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        // Set up the request body
        let requestBody = JSON.stringify({ title, content })

        // Make the fetch request
        fetch(`http://localhost:5000/api/posts/${params.postId}`, {
            method: 'PUT',
            headers: myHeaders,
            body: requestBody
        }).then(res => res.json())
        .then(data => {
            if (data.error){
                flashMessage(data.error, 'danger');
            } else {
                flashMessage(`${data.title} has been updated`, 'primary');
                navigate('/');
            }
        })

    };

    return (
        <>
            <h3 className="text-center">Update A Post!</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="title" className="form-control my-3" 
                      placeholder='Enter Title' value={post.title} onChange={
                        (e) => setPost({ ...post, title: e.target.value})
                        }/>
                    <textarea name="content" className="form-control my-3" 
                      placeholder='Enter Content'  value={post.content} onChange={
                        (e) => setPost({ ...post, content: e.target.value})
                        }/>
                    <input type="submit" value="Update Post" className='btn btn-success w-100' />
                </div>
            </form>
        </>
    )
}
