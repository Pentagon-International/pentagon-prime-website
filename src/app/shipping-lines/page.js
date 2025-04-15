import React from 'react'
import Header from './header'
import ShipLines from './Shiplines'

const page = () => {
  return (
    <div>
      <Header top={"Shipping Lines / Partners"} title={"Pentagon - Shipping Lines"} content={'Shipping lines are companies that manage fleets of cargo ships to transport goods across international waters. They play a vital role in global trade by moving containerized cargo between ports, offering scheduled routes, reliable logistics solutions, and efficient maritime operations.'} />
      <ShipLines />
    </div>
  )
}

export default page