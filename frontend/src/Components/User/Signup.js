import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getSignUp } from '../../Store/User/user-action';
import { userActions } from '../../Store/User/user-slice';
import LoadingSpinner from '../LoadingSpinner';

const Signup = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, errors, loading } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: ""
    });

    const { name, email, password, passwordConfirm, phoneNumber } = user;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            toast.error("Passwords do not match");
            return;
        }
        dispatch(getSignUp(user));
    };

    useEffect(() => {
        if (errors && errors.length > 0) {
            toast.error(errors);
            dispatch(userActions.clearError());
        } else if (isAuthenticated) {
            toast.success("User logged in successfully");
        }
    }, [errors, isAuthenticated, dispatch]);

    return (
        <Fragment>
            <div className='row wrapper'>
                {loading && <LoadingSpinner />}
                {!loading && (
                    <div className='col-10 col-lg-5'>
                        <form onSubmit={submitHandler}>
                            <h1 className='mb-3'>Register</h1>
                            {['name', 'email', 'password', 'passwordConfirm', 'phoneNumber'].map(field => (
                                <div className='form-group' key={field}>
                                    <label htmlFor={`${field}_field`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        type={field.includes('password') ? "password" : "text"}
                                        id={`${field}_field`}
                                        className='form-control'
                                        name={field}
                                        value={user[field]}
                                        onChange={onChange}
                                    />
                                </div>
                            ))}
                            <button
                                id='register_button'
                                type='submit'
                                className='loginbutton btn-block py-3'
                            >
                                REGISTER
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Signup;
