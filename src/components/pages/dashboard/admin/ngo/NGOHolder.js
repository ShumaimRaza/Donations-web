import React from 'react';
import { getImageUrl } from "../../../../../helper/Helper";

const NGOHolder = ({ user, onApprove, onReject }) => {
    return (
        <div className="card mb-3 m-1" style={{ width: "30%" }}>
            <img src={getImageUrl(user.ngo.icon)} alt={`${user.ngo.title} logo`} className="card-img-top img-fluid" style={{ maxHeight: '200px', objectFit: 'cover' }} />
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-center">{user.ngo.title}</h5>
                <div className="mt-3">
                    <h6>Other Information:</h6>
                    <ul className="list-unstyled">
                        <li><strong>Full Name:</strong> {user.fullname}</li>
                        <li><strong>Email:</strong> {user.email}</li>
                        <li><strong>Role:</strong> {user.role}</li>
                    </ul>
                </div>
                {onApprove && onReject && (
                    <div className="mt-3 d-flex justify-content-center">
                        <button className="btn btn-success m-2" onClick={() => {onApprove(user)}}>Approve</button>
                        <button className="btn btn-danger m-2" onClick={() => {onReject(user)}}>Reject</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NGOHolder;
