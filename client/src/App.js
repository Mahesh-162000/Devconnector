import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import './App.css';

let isAuthenticated = '';

if (localStorage.token) {
  setAuthToken(localStorage.token);

  isAuthenticated = true;
} else {
  isAuthenticated = false;
}

console.log(isAuthenticated);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<Fragment>{isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />}</Fragment>}
          />
          <Route
            path="/register"
            element={
              <Fragment>
                <NavBar />
                <section className="container">
                  <Alert />
                  <Register />
                </section>
              </Fragment>
            }
          />
          <Route
            path="/login"
            element={
              <Fragment>
                <NavBar />
                <section className="container">
                  <Alert />
                  <Login />
                </section>
              </Fragment>
            }
          />
          <Route
            path="/profiles"
            element={
              <Fragment>
                <NavBar />
                <section className="container">
                  <Alert />
                  <Profiles />
                </section>
              </Fragment>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <Fragment>
                <NavBar />
                <section className="container">
                  <Alert />
                  <Profile />
                </section>
              </Fragment>
            }
          />
          {isAuthenticated ? (
            <Route
              path="/dashboard"
              element={
                <Fragment>
                  <NavBar />
                  <section className="container">
                    <Alert />
                    <Dashboard />
                  </section>
                </Fragment>
              }
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/create-profile"
              element={
                <Fragment>
                  <NavBar />
                  <section className="container">
                    <Alert />
                    <CreateProfile />
                  </section>
                </Fragment>
              }
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/edit-profile"
              element={
                <Fragment>
                  <NavBar />
                  <section className="container">
                    <Alert />
                    <EditProfile />
                  </section>
                </Fragment>
              }
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/add-experience"
              element={
                <Fragment>
                  <NavBar />
                  <section className="container">
                    <Alert />
                    <AddExperience />
                  </section>
                </Fragment>
              }
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/add-education"
              element={
                <Fragment>
                  <NavBar />
                  <section className="container">
                    <Alert />
                    <AddEducation />
                  </section>
                </Fragment>
              }
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/posts"
              element={
                <Fragment>
                  <NavBar />
                  <section className="container">
                    <Alert />
                    <Posts />
                  </section>
                </Fragment>
              }
            />
          ) : null}
          {isAuthenticated ? (
            <Route
              path="/posts/:id"
              element={
                <Fragment>
                  <NavBar />
                  <section className="container">
                    <Alert />
                    <Post />
                  </section>
                </Fragment>
              }
            />
          ) : null}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
