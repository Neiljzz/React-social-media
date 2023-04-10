import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function PostCard({ post, user, deletePost }) {


    return (
        <div className="card mt-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img className="card-img-top" src="https://picsum.photos/300/150" alt="random" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h6 className="card-subtitle text-muted">{ post.date_created }</h6>
                        <h5 className="card-title">{ post.title }</h5>
                        <h6 className="card-subtitle">By: { post.author && post.author.username }</h6>
                        <p className="card-text">{ post.content }</p>
                        {user && user.id == post.author.id ? (
                            <>
                            <Link className='btn btn-primary' to={`/update_post/${post.id}`}>Update</Link>
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" 
                              data-bs-target={`#deletePostModal-${ post.id }`} >
                                Delete
                            </button>
                            </>
                            ): (<></>)}
                    </div>
                </div>
            </div>

            <div className="modal fade" id={`deletePostModal-${ post.id }`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Delete { post.id } { post.title } ?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        Are you sure you want to delete { post.title }? This action cannot be undone.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={e=>{deletePost(post.id)}}>Confirm Delete</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
