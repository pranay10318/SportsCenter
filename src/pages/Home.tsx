import React from 'react'
import Articles from '../components/Articles'
import AccountLayout from '../layout/account'
import LiveMatches from '../components/LiveMatches'

export const Home = () => {
  return (
    <>
    <AccountLayout/>
    <LiveMatches/>
    <Articles/>
    </>
  )
}
