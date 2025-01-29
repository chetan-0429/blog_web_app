// import React from 'react'
// import { useSelector,useDispatch } from 'react-redux'
// import { logout } from '../../slices/authSlice';


// function Logout() {
//     const dispatch = useDispatch();
//     function handleClick(){
//         console.log('dispathced Logout')
//         dispatch(logout());
//         console.log('Logout done')
//     }
//   return (
//     <div> Are you want to logout? 
//         <button className='w-10 ml-6 mr-4 bg-orange-400' onClick={handleClick}>Yes</button>
//         <button className='w-10 bg-red-600'>No</button>
//     </div>
//   )
// }

// export default Logout
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(state => state.auth);


  const handleClick = () => {
    console.log('dispatched Logout');
    dispatch(logout());
    console.log('Logout done');
  };


  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login'); 
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <div>
      Are you sure you want to log out? 
      <button className='w-10 ml-6 mr-4 bg-orange-400' onClick={handleClick}>
        Yes
      </button>
      <button className='w-10 bg-red-600'>
        No
      </button>
    </div>
  );
}

export default Logout;
