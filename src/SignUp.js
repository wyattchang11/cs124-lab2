import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
const SignUp = (props) => {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(props.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    if (userCredential) {
        return <div>Signed up, unexpectedly</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div className="margin">
        {error && <p>Error signing up: {error.message}</p>}
        <div className="row">
            <label htmlFor='email'>Email: </label>
            <input type="text" id='email' value={email}
                    onChange={e=>setEmail(e.target.value)}/>
        </div>
        
        <div className="row">
            <label htmlFor='passwordSignIn'>Password: </label>
            <input type="password" id='passwordSignIn' value={password}
                onChange={e=>setPassword(e.target.value)}/>
        </div>

        <div className="row">
            <label htmlFor='confirmPasswordSignIn'> Confirm password: </label>
            <input type="password" id="confirmPasswordSignIn" value={confirmPassword}
                onChange={e=>setConfirmPassword(e.target.value)}/>
        </div>
        <button 
            className="alert-button alert-ok"
            onClick={() =>{
            if(confirmPassword !== password){
                alert("Passwords do not match");
                return;
            }
            createUserWithEmailAndPassword(email, password)}}>
            Create User
        </button>

    </div>;
}
export default SignUp;