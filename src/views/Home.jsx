import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import UserCard from '../components/UserCard';


export default function Home({user, flashMessage}) {
    
    const [posts, setPosts] = useState([])

    const deletePost = (postId) => {
        // Get the token from localStorage
        let token = localStorage.getItem('token');

        // Set up the request headers
        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);

        // Make the fetch request
        fetch(`http://localhost:5000/api/posts/${postId}`, {
            method: 'Delete',
            headers: myHeaders,
        }).then(res => res.json())
        .then(data => {
            if (data.error){
                flashMessage(data.error, 'danger');
            } else {
                flashMessage(`Post ${postId} has been deleted`, 'primary');
                setPosts(posts.filter(post => post.id !== postId))
                console.log(posts);
            }
        })
    }

    useEffect(() => {
        // Define async function
        async function fetchPostData(){
            let response = await fetch('http://localhost:5000/api/posts')
            let posts = await response.json()
            setPosts(posts);
        };
        // Execute async function
        fetchPostData();
    }, []);

    return (
        <div>
            <h1 className="text-center">Welcome to Neil's Social Media</h1>
            <div class="row">
                <div class="col-12 col-lg-8 order-1 order-lg-0">
                    {posts.map( post => <PostCard key={post.id} 
                        post={post} user={user} deletePost={deletePost}/>)}
                </div>
                <div class="col-12 col-lg-4 order-0 order-lg-1">
                    {user ?(
                        <>
                        <UserCard user={user} />
                        </>
                        ) : (<></>)}
                </div>
            </div>
        </div>
    )
}
