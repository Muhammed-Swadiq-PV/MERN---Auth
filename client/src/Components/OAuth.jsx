import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSucces } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

const handleGoogleClick = async () =>{
    try {
        const provider = new GoogleAuthProvider();
      
        const auth= getAuth(app)
        const result = await signInWithPopup(auth, provider)
        console.log('jdkjfkdshfk',result);
        const response = await fetch('/api/auth/google' , {
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: result.user.displayName,
                email : result.user.email,
                photo: result.user.photoURL
            })
        })
        const data = await response.json()
        console.log('data after fetch',data)
        dispatch(signInSucces(data));
        if(data.role  === 'Admin'){
            navigate('/admin')
        }else{

            navigate('/');
        }

    } catch (error) {
        console.log('Could not authenticate with google', error)
    }
}
  return (
    
    <button type='button' onClick={handleGoogleClick} className='bg-red-600 text-white rounded-md p-2 uppercase hover:bg-red-700'>Continue with Google</button>
  )
}

export default OAuth