import React from 'react'
import { Carousel } from '../components/Carousel'
import { Main } from '../components/Main'
import { WhatsAppButton } from '../components/WhatsAppButton'


export const HomePage = ({search}) => {
  return (
    <>
    <Carousel/>
    <Main search={search}/>
    <WhatsAppButton/>
      
    </>
  )
}
