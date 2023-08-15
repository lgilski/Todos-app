import { redirect } from 'react-router-dom';
import AuthForm from '../components/UI/AuthForm/AuthForm';
import {
  createUserWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { toast } from 'react-toastify';
import { child, get, getDatabase, ref, set } from 'firebase/database';

function SignupPage() {
  return <AuthForm mode='signup' />;
}

export default SignupPage;

export async function action({ request }: { request: Request }) {
  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
    passwordRepeat: data.get('passwordRepeat'),
    displayName: data.get('displayName'),
    userName: data.get('userName'),
  };

  if (authData.password!.length < 6) {
    return { message: 'Password must be at least 6 characters long' };
  } else if (authData.passwordRepeat !== authData.password) {
    return { message: 'Passwords are incorrect' };
  }

  const db = getDatabase();

  const snapshot = await get(child(ref(db), 'usersPublicData/'));

  const checkUserNames = snapshot.forEach((publicUserData) => {
    if (publicUserData.val().userName === authData.userName) {
      return true;
    }
  });

  if (checkUserNames) {
    return { message: 'Someone already has this user name.' };
  }

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      authData.email!.toString().trim(),
      authData.password!.toString()
    );

    await updateProfile(auth.currentUser!, {
      displayName: authData.displayName?.toString(),
    });

    const db = getDatabase();
    set(ref(db, 'usersPublicData/' + auth!.currentUser!.uid), {
      displayName: authData.displayName?.toString(),
      userName: authData.userName?.toString(),
      photoURL: null,
      uid: response.user.uid,
    });

    // if (response.status === 422 || response.status === 401) {
    //   return response;
    // }

    await sendEmailVerification(auth.currentUser!);

    toast.success('Verification email has been sent.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    return redirect('/');
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }
  }
}
