import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';
import { lazy, Suspense } from 'react';
import { Spinner } from 'reactstrap';

const Root = lazy(() => import('../../routes/root/Root'));
const Join = lazy(() => import('../../routes/join/Join'));
const Play = lazy(() => import('../../routes/play/Play'));
const Upload = lazy(() => import('../../routes/upload/Upload'));
const SignIn = lazy(() => import('../../routes/signin/SignIn'));
const NotFound = lazy(() => import('../../routes/notfound/NotFound'));

export const App = () => {
  const fallback = (
    <Spinner
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      color="light"
    />
  );

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route
            path=""
            element={
              <Suspense fallback={fallback}>
                <Root />
              </Suspense>
            }
          />
          <Route
            path="join"
            element={
              <Suspense fallback={fallback}>
                <Join />
              </Suspense>
            }
          />
          <Route
            path="play"
            element={
              <Suspense fallback={fallback}>
                <Play />
              </Suspense>
            }
          />
          <Route
            path="upload"
            element={
              <Suspense fallback={fallback}>
                <Upload />
              </Suspense>
            }
          />
          <Route
            path="signin"
            element={
              <Suspense fallback={fallback}>
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={fallback}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
};
