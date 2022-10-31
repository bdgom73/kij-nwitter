import { authService, fireBaseInstance } from "fbase";
import React  from "react";
import AuthForm from '../components/AuthForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub, faTwitter} from '@fortawesome/free-brands-svg-icons';
const Auth = () => {
    const onSocialClick = async (e) => {
        const {
            target : { name }
        } = e;

        let provider;
        if (name === "github") {
            provider = new fireBaseInstance.auth.GithubAuthProvider();
        } 

        const data = await authService.signInWithPopup(provider);

        console.log(data);
    } 

    return (
    <div className='authContainer'>
        <FontAwesomeIcon
            icon={faTwitter}
            color={"#04AAFF"}
            size="3x"
            style={{ marginBottom: 30 }}
        />
        <AuthForm/>
        <div className="authBtns">
            <button name="github" onClick={onSocialClick} className="authBtn">
                Continue with Github <FontAwesomeIcon icon={faGithub} />
            </button>
        </div>
    </div>
    );
}

export default Auth;
