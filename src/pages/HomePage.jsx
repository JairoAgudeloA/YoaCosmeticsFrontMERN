import React from 'react'
import { Main } from '../components/Main'
import { WhatsAppButton } from '../components/WhatsAppButton'
import "../assets/styles/pages/HomePage.css"


export const HomePage = ({search}) => {
  return (
    <>    
    <Main search={search}/>
    <WhatsAppButton/>
      
    </>
  )
}
