import axios from "axios";
import { setAlert } from "./alert";
import {
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS
} from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        return res;

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });

        return res.data;

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


//Get profile by ID
export const getProfileById = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


//Get GitHub repos
export const getGitHubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


//Create or update profile
export const createProfile = (formData, edit = false) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        return true;

    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

        return false;
    }
}


// Add Experience
export const addExperience = (formData, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        return true;

    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

        return false;
    }
}


// Add Education
export const addEducation = (formData, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        return true;

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

        return false;
    }
}

// Delete experience
export const deleteExperience = (id) => async dispatch => {

    try {

        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));

        return res;

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText || 'Unknown error occurred', status: err.response.status || 500 }
        });

        return false;
    }
}


// Delete education
export const deleteEducation = (id) => async dispatch => {

    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));

        return res;

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

        return false;

    }
}


//Delete account & profile
export const deleteAccount = () => async dispatch => {

    if (window.confirm('Are you sure? This can not be undone!')) {

        try {

            const axiosConfig = {
                timeout: 5000,
            };

            const res = await axios.delete(`/api/profile/`, axiosConfig);
            console.log("Delete Response: ", res);

            dispatch({
                type: CLEAR_PROFILE
            });

            dispatch({
                type: ACCOUNT_DELETED
            });

            dispatch(setAlert('Your account has been permanently deleted'));

            return true;

        } catch (err) {

            console.log(err);

            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });

            return false;
        }
    }

}

