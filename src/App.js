import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Roots/Root';
import HomePage from './pages/HomePage';
import AuthPage, { action as authAction } from './pages/AuthPage';
import CardsPage from './pages/CardsPage';
import TimerPage from './pages/TimerPage';
import WeatherPage from './pages/WeatherPage';
import { action as logoutAction } from './components/Logout';

import { tokenLoader, dataLoader } from './utils/auth';
import ErrorPage from './pages/Error';

import { loader as cardsLoader } from './components/Cards';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    // loader: tokenLoader,
    loader: dataLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'cards', element: <CardsPage />, loader: cardsLoader },
      { path: 'timer', element: <TimerPage /> /* loader */ },
      { path: 'auth', element: <AuthPage />, action: authAction },
      {
        path: 'logout',
        action: logoutAction,
        // loader: logoutLoader,
      },
      { path: 'weather', element: <WeatherPage /> /* loader */ },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  // onAuthStateChanged(auth, currentUser => {
  //   if (currentUser.email !== null) {
  //     console.log(currentUser.email);
  //     console.log(currentUser);
  //     dispatch(authActions.setUser(currentUser.email));
  //   } else {
  //     dispatch(authActions.setUser(null));
  //   }

  // if (currentUser.email !== null) {
  //   const response = await fetch(
  //     `https://todos-app-72428-default-rtdb.europe-west1.firebasedatabase.app/data/${currentUser.email
  //       .split('.')
  //       .join('-')}.json`,
  //     {
  //       // mode: 'no-cors',
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(cards),
  //     }
  //   );

  //   // console.log(response);
  // }
  // });

  // useEffect(() => {
  //   if (user !== null && user !== undefined) {
  //     const getDataFromDB = async () => {
  //       const response = await fetch(
  //         `https://todos-app-72428-default-rtdb.europe-west1.firebasedatabase.app/data/${user
  //           .split('.')
  //           .join('-')}.json`
  //       );

  //       const data = await response.json();

  //       console.log(data);

  //       dispatch(dataActions.setCards(data));
  //       console.log(data);
  //     };
  //     getDataFromDB();
  //   }
  // }, []);

  // const user = localStorage.getItem('email');

  useEffect(() => {
    const cardsFromLocalStorage = JSON.parse(localStorage.getItem('cards'));

    if (cardsFromLocalStorage === null) return;

    const getDataFromDB = async () => {
      const response = await fetch(
        `https://todos-app-72428-default-rtdb.europe-west1.firebasedatabase.app/${localStorage
          .getItem('email')
          .split('.')
          .join('-')}.json`
      );

      const data = await response.json();

      console.log(data.cards);

      dispatch(dataActions.setCards(data.cards));
      console.log(data.cards);
    };
    getDataFromDB();

    // dispatch(dataActions.setCards(cardsFromLocalStorage));
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
