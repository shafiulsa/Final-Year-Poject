


// import React, { useContext } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../Provider/AuthProvider';
// import { FcGoogle } from "react-icons/fc";


// const Login = () => {
//   const { signInUser, signInWithGooge } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const handelSubmit = event => {

//     event.preventDefault();
//     console.log("c");
//     const form = event.target;

//     const email = form.email.value;
//     const password = form.password.value;
//     console.log(email, password);
//     signInUser(email, password)
//       .then(result => {
//         console.log(result.user);
//         event.target.reset();
//         navigate('/');
//       })
//       .catch(error => console.error(error))
//   }

//   const handleGoogleSignIn = () => {
//     signInWithGooge()
//       .then(result => {
//         console.log(result.user);
//         navigate('/');
//       })
//       .then(error => console.error(error))
//   }
//   return (
//     <>
//       <div className="hero bg-base-200 min-h-screen">
//         <div className="hero-content flex-col ">
//           <div className="text-center lg:text-left">
//             <h1 className="text-5xl font-bold">Log in now!</h1>

//           </div>
//           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

//             <form action="" onSubmit={handelSubmit}>

//               <div className="card-body">
//                 <fieldset className="fieldset">
//                   <label className="fieldset-label">Email</label>
//                   <input type="email" name='email' className="input" placeholder="Email" />
//                   <label className="fieldset-label">Password</label>
//                   <input type="password" name='password' className="input" placeholder="Password" />
//                   <div><a className="link link-hover">Forgot password?</a></div>
//                   {/* <button className="btn btn-neutral mt-4">Register</button> */}
//                 </fieldset>

//                   <input type="submit" className="btn btn-neutral mt-4" value={"Log in"} />
//                   <p className='text-center'> or</p>
//                 <button type="button" onClick={handleGoogleSignIn} className="btn btn-neutral mt-2">
//                 <FcGoogle /> Sign in with Google
//                 </button>
//                 <p>Don't have an account? <NavLink to="/register" className="text-blue-400 font-bold">Register </NavLink> </p>
//                 {/* <a href="" onClick={handleGoogleSignIn} className="btn btn-neutral mt-4">Google</a> */}

//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;


import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signInUser, signInWithGooge } = useContext(AuthContext);
  const navigate = useNavigate();

  const handelSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(result => {
        const loggedUser = result.user;
        saveUserToDB(loggedUser);
        event.target.reset();
        navigate('/');
      })
      .catch(error => console.error(error));
  };

  const handleGoogleSignIn = () => {
    signInWithGooge()
      .then(result => {
        const loggedUser = result.user;
        saveUserToDB(loggedUser);
        navigate('/');
      })
      .catch(error => console.error(error));
  };

  const saveUserToDB = (user) => {
    const userData = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      role:"student"
    };

    fetch('http://localhost:5000/users', {
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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Log in now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelSubmit}>
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <input type="email" name='email' className="input" placeholder="Email" />
                <label className="fieldset-label">Password</label>
                <input type="password" name='password' className="input" placeholder="Password" />
                <div><a className="link link-hover">Forgot password?</a></div>
              </fieldset>

              <input type="submit" className="btn btn-neutral mt-4" value="Log in" />
              <p className='text-center'> or</p>
              <button type="button" onClick={handleGoogleSignIn} className="btn btn-neutral mt-2">
                <FcGoogle /> Sign in with Google
              </button>
              <p>Don't have an account? <NavLink to="/register" className="text-blue-400 font-bold">Register</NavLink></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
