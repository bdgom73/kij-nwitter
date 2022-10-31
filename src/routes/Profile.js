import React, {useEffect, useState} from "react";
import {authService, db, dbService} from '../fbase';
import {useNavigate} from 'react-router-dom';

const Profile = ({refreshUser, user}) => {

    const history = useNavigate();

    const [newDisplayName, setNewDisplayName] = useState(user.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history("/");
    };


    const onSubmit = async e => {
        e.preventDefault();
        console.log(user.displayName !== newDisplayName);
        if (user.displayName !== newDisplayName) {
            await user.updateProfile({
                displayName : newDisplayName
            });

            refreshUser();
        }
    }

    const onChange = e => {
        const {
            target : { value }
        } = e;

        setNewDisplayName(value);
    }

    return (
        <div className="container" >
            <form onSubmit={onSubmit} className="profileForm" >
                <input type='text' placeholder='Display name' value={newDisplayName} onChange={onChange}  className="formInput"/>
                <input type='submit' value='Update Profile'  className="formBtn"
                       style={{
                           marginTop: 10,
                       }}/>
            </form>
            <button onClick={onLogOutClick} className="formBtn cancelBtn logOut">Log Out</button>
        </div>
    )
}

export default Profile;
