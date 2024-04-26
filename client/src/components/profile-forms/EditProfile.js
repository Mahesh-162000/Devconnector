import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await getCurrentProfile();

                if (profileData) {
                    const profile = profileData.data; // Assuming profileData is an object containing the profile data

                    setFormData({
                        company: profile.company || '',
                        website: profile.website || '',
                        location: profile.location || '',
                        status: profile.status || '',
                        skills: profile.skills ? profile.skills.join(',') : '',
                        githubusername: profile.githubusername || '',
                        bio: profile.bio || '',
                        twitter: profile.social?.twitter || '',
                        facebook: profile.social?.facebook || '',
                        linkedin: profile.social?.linkedin || '',
                        youtube: profile.social?.youtube || '',
                        instagram: profile.social?.instagram || ''
                    });
                } else {
                    console.log("Profile data is undefined");
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                // Handle error or set appropriate state indicating error
            }
        };

        fetchData();
    }, [getCurrentProfile]);


    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await createProfile(formData, true);
            if (success) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    };


    return (
        <Fragment>
            <h1 className="large text-primary">Create Your Profile</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faUser} /> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text"
                    >Give us an idea of where you are at in your career</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Could be your own company or one you work for</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Could be your own or a company website</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername} onChange={e => onChange(e)}
                    />
                    <small className="form-text"
                    >If you want your latest repos and a Github link, include your
                        username</small
                    >
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs &&
                    <Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
                        </div>
                    </Fragment>
                }

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
            </form>
        </Fragment>
    );
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    profile: state.profile
});


export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile);