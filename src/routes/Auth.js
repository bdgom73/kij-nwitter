import { authService, fireBaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = ({login}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);

    const onChange = (e) => {
        const {target : {name, value}} = e;

        if (name === "email") {
            setEmail(value);
        }

        if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }

            console.log(data);
            await authService.setPersistence('local');
            login();  
        } catch (error) {
            console.log(error);
        }
       
    }

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
        login();  
    } 

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="email" name="email" value={email} onChange={onChange} required/>
            <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
        </form>
        <div>
            <button name="github" onClick={onSocialClick}>Continue with Github</button>
        </div>
    </div>
    );
}

export default Auth;