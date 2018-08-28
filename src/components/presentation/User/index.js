import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import './index.css';

const user = (props) => {   
    // @props.profileAvatar: holds profile picture URL
    // @props.firstName: holds users first name
    // @props.lastName: holds users last name
    // @props.deleteUser: Its an event fired when clicking delete button
    return (
        <li className="user">
            <Avatar profilePic={props.profileAvatar} />
            <div className="user-name">
                {props.firstName + ' ' + props.lastName}
            </div>
            <div className="delete-user" onClick={(e) => props.deleteUser(e, props.userId)}>
                Delete
            </div>
        </li>
    )
};

user.propTypes = {
    userId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    profileAvatar: PropTypes.string.isRequired,
    deleteUser: PropTypes.func.isRequired
}
export default user;