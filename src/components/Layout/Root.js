import React from 'react'
import Profile from '../WelcomePage/Profile'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <>
        <Profile/>
        <Outlet/>
    </>
  )
}

export default Root;
