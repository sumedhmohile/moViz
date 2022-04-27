import React from 'react';
import './ProfileCard.css'

function ProfileCard(props){
    return(
        <div className='prof-container'>
        <div className='box'>
            <img className='img-box' src={ props.imgUrl } alt="profile-img"/>
            <h2 className='name'>{ props.name }</h2>
            <h3 className='des'>{ props.designation }</h3>
            <h5 className='details'>Birthday: { props.birthday }</h5>
            <h5 className='details'>Place of Birth: { props.place }</h5>
        </div>
        </div>
    );

}

export default ProfileCard;