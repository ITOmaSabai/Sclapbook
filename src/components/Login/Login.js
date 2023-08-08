import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebase"; //動画より

const Login = async ({ isAuth, setIsAuth }) => {
    // const provider = new GoogleAuthProvider();
    // const auth = getAuth();
    // const [isAuth, setIsAuth] = useState();
    
    await signInWithPopup(auth, provider)
    .then((result) => {
        console.log(result);
        setIsAuth(true);
        localStorage.setItem("isAuth", true);
    });

}

  export default Login;