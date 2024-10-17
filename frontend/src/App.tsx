import { Route, Routes } from 'react-router-dom';
import { Navbar } from './Navbar';
import { lazy, Suspense } from 'react';
import { Spinner } from 'reactstrap';

const Root = lazy(() => import('./routes/Root'));
const Join = lazy(() => import('./routes/Join'));
const Play = lazy(() => import('./routes/Play'));
const Upload = lazy(() => import('./routes/Upload'));
const SignIn = lazy(() => import('./routes/SignIn'));
const NotFound = lazy(() => import('./routes/NotFound'));

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
