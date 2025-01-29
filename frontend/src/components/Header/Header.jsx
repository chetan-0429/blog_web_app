import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'


function Header() {
  const auth = useSelector(state => state.auth);
 console.log(auth)
  return (
    <>
    <div className='flex justify-between'>
    <Link to={'/'}>
  <div className="bg-yellow-300 text-gray-800 text-lg font-semibold px-4 py-2 rounded-md shadow-md hover:bg-yellow-400 transition duration-300">
    Blogs
  </div>
</Link>

      <div>Welcome!</div>
      <div className='flex gap-4'>
      {
          auth.isAuthenticated ?   <Link to={'/logout'}>
                            <div>Logout</div>
                            </Link> : <Link to={'/login'}>
                            <div>Login</div>
                            </Link>
        }
        {
          auth.isAuthenticated ? <Link to= {'/postblog'}>Add Blog</Link> : <></>
        }  
        {
          auth.isAuthenticated ? <Link to= {'/my-blog'}>My Blog</Link> : <></>
        }  
    
         <div className='flex'>
          {
            auth.isAuthenticated ?   <div>
              <div> <Link to={'/profile'}><img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="" className='w-8'/> </Link> </div>   </div>
                            :    <Link to={'/login'}><img src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="" className='w-8'/> </Link> 
          }
                          </div>
      </div>
    </div>
    </>
  )
}

export default Header

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// function Header() {
//   const auth = useSelector(state => state.auth);
//   const [isLoggedIn, setIsLoggedIn] = useState(auth.isAuthenticated);

//   useEffect(() => {
//     setIsLoggedIn(auth.isAuthenticated); // Update local state based on Redux state
//   }, [auth.isAuthenticated]); // Only re-run when auth.isAuthenticated changes

//   return (
//     <div className='flex justify-between'>
//       <div>Blog's</div>
//       <div>Welcome!</div>
//       <div className='flex gap-4'>
//         {isLoggedIn ? (
//           <Link to='/logout'>
//             <div>Logout</div>
//           </Link>
//         ) : (
//           <Link to='/login'>
//             <div>Login</div>
//           </Link>
//         )}

//         <div className='flex'>
//           {isLoggedIn ? (
//             <Link to='/profile'>
//               <img
//                 src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
//                 alt="Profile"
//                 className='w-8'
//               />
//             </Link>
//           ) : (
//             <Link to='/login'>
//               <img
//                 src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
//                 alt="Login"
//                 className='w-8'
//               />
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;
