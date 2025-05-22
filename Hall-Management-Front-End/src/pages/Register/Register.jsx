import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Register = () => {
  const {createUser}=useContext(AuthContext);
  const navigate=useNavigate();
 
  const handelSubmit = event => {
    
    event.preventDefault();
    console.log("c");
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);
    createUser(email,password)
     .then(result =>{
      const loggedUser = result.user;
      saveUserToDB(loggedUser);
      event.target.reset();
      navigate('/');
     })
     .then(error =>console.log(error))
  }


  const saveUserToDB = (user) => {
    const userData = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      role:"student"
    };

    fetch('https://final-year-poject.onrender.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
      console.log('User saved to database:', data);
    })
    .catch(error => console.error('Error saving user:', error));
  };

  
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>

          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

            <form action="" onSubmit={handelSubmit}>

              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="fieldset-label">Name</label>
                  <input type="text" name='name' className="input" placeholder="Your name" />
                  <label className="fieldset-label">Email</label>
                  <input type="email" name='email' className="input" placeholder="Email" />
                  <label className="fieldset-label">Password</label>
                  <input type="password" name='password' className="input" placeholder="Password" />
                  <div><a className="link link-hover">Forgot password?</a></div>
                  {/* <button className="btn btn-neutral mt-4">Register</button> */}
                  <input type="submit" className="btn btn-neutral mt-4" value={"Register"} />
                </fieldset>
               
                
                <p>Already have an account? Sign In <NavLink to="/login" className="text-blue-400 font-bold">Log in </NavLink> </p>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
