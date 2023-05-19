import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../../utils/auth';

function RootLayout() {
  // const token = useLoaderData();
  const { token } = useLoaderData();

  // console.log('****AAA*****' + token);

  const submit = useSubmit();
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
