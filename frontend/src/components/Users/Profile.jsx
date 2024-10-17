import React from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
function Profile() {
  const auth = useSelector(state => state.auth)
  console.log('auth in profile: ',auth);
  return (
  <>
  <div>profile</div>
  </>
  )
}

export default Profile