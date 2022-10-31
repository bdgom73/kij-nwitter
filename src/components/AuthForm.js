import React, {useState} from "react";
import {authService} from '../fbase';

const AuthForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);

    const onChange = (e) => {
        const {target: {name, value}} = e;

        if (name === "email") {
            setEmail(value);
        }

        if (name === "password") {
            setPassword(value);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }

            console.log(data);
            await authService.setPersistence('local');
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input type="text" placeholder="email" name="email" value={email} onChange={onChange} required
                       className="authInput"/>
                <input type="password" placeholder="Password" name="password" value={password} onChange={onChange}
                       required className="authInput"/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} className="authInput authSubmit"/>
            </form>

            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
    );
};

export default AuthForm;
