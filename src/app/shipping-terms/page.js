import React from 'react'
import Header from './header'
import ShipTerms from './ShipTerms'

const page = () => {
  return (
    <div>
      <Header top={"Shipping Terms / Partners"} title={"Pentagon - Shipping Terms"} content={'Shipping Terms, Track shipment, view rates, get schedules'} />
      <ShipTerms />
    </div>
  )
}

export default page