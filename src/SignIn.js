import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useState } from "react";

const SignIn = (props) => {
    const [
        signInWithEmailAndPassword,
        userEP, loadingEP, errorEP
    ] = useSignInWithEmailAndPassword(props.auth);
    const [
        signInWithGoogle,
        userGoogle, loadingGoogle, errorGoogle
    ] = useSignInWithGoogle(props.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if(userEP || userGoogle){
        return <div>Already signed in, unexpectedly</div>
    }
    else if (loadingEP || loadingGoogle) {
        return <p>Logging in…</p>
    }
    return <div>
        {errorEP && <p>"Error logging in: " {errorEP.message}</p>}
        {errorGoogle && <p>"Error logging in: " {errorGoogle.message}</p>}
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>pw: </label>
        <input type="text" id='pw' value={password}
               onChange={e=>setPassword(e.target.value)}/>
        <br/>
        <button onClick={() =>signInWithEmailAndPassword(email, password)}>
            Sign in with email/password
        </button>

        <hr/>
        <button onClick={() => signInWithGoogle()}>
            Sign in with Google
        </button>
    </div>
}
export default SignIn;