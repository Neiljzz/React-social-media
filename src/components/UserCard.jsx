import React from 'react';
import { Link } from 'react-router-dom';


export default function UserCard({ user }) {
  return (
    <div>
      <div class="position-sticky top-0">
        <div class="card mt-3">
            <div class="card-header">User ID: { user.id }</div>
            <div class="card-body">
                <h5 class="card-title">{ user.username }</h5>
                <h6 class="card-text">Email: { user.email }</h6>
                <p class="card-subtitle text-muted">{ user.date_created }</p>
                <Link className='btn btn-primary' to={`/update_user`}>Update Info</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

