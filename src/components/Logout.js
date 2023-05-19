import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { redirect } from 'react-router-dom';

export function loader() {
  console.log('removed!!!');
  signOut(auth);
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');

  return redirect('/');
}

export async function action() {
  console.log('removed!!!');
  await signOut(auth);
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('expiration');
  // localStorage.setItem('cards', []);
  localStorage.removeItem('cards');

  return redirect('/');
}
