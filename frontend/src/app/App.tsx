import { lazy, ReactNode, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from '@shared/components/spinner/Spinner';
import { Navbar } from './Navbar';
import './App.scss';

const Root = lazy(() => import('@features/root-route/Root.route'));
const Join = lazy(() => import('@features/join-route/routes/Join.route'));
const Play = lazy(() => import('@features/play-route/Play.route'));
const Upload = lazy(() => import('@features/upload-route/Upload.route'));
const NotFound = lazy(() => import('./NotFound.route'));

export const App = () => {
  const suspense = (route: ReactNode) => {
    return <Suspense fallback={<Spinner center />}>{route}</Suspense>;
  };

  return (
    <>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/">
            <Route path="" element={suspense(<Root />)} />
            <Route path="join" element={suspense(<Join />)} />
            <Route path="play" element={suspense(<Play />)} />
            <Route path="upload" element={suspense(<Upload />)} />
            <Route path="*" element={suspense(<NotFound />)} />
          </Route>
        </Routes>
      </div>
    </>
  );
};