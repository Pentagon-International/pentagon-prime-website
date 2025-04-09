import React from 'react'
import Header from './header'
import ShipLines from './Shiplines'

const page = () => {
  return (
    <div>
      <Header top={"Shipping Lines / Partners"} title={"Pentagon - Top Shipping Lines"} content={'Air lines, Track shipment, view rates, get schedules'} />
      <ShipLines />
    </div>
  )
}

export default page