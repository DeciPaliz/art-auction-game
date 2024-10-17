import { Route, Routes } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Join, NotFound, Play, Root, SignIn, Upload } from './routes';

// TODO: add lazy loading for routes

export const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route path="" element={<Root />} />
          <Route path="join" element={<Join />} />
          <Route path="play" element={<Play />} />
          <Route path="upload" element={<Upload />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
