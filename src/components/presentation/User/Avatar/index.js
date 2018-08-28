import React from 'react';
import PropTypes from 'prop-types';

const avatar = (props) => {
    // @props.profilePic: holds profile picture URL passed from parent
    let avatarStyle = {
        backgroundImage: 'url(' + props.profilePic + ')'
    }
    return (
        <div 
            className="user-avatar" 
            style={avatarStyle}>
        </div>
    )
}
avatar.propTypes = {
    profilePic: PropTypes.string.isRequired,
}
export default avatar;