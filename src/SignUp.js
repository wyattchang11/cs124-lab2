import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
const SignUp = (props) => {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(props.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (userCredential) {
        return <div>Signed up, unexpectedly</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div>
        {error && <p>Error signing up: {error.message}</p>}
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='password'>password: </label>
        <input type="text" id='password' value={password}
               onChange={e=>setPassword(e.target.value)}/>
        <br/>
        <button onClick={() =>
            createUserWithEmailAndPassword(email, password)}>
            Create test user
        </button>

    </div>;
}
export default SignUp;