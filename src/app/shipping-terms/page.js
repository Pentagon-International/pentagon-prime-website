import React from 'react'
import Header from './header'
import ShipTerms from './ShipTerms'

const page = () => {
  return (
    <div>
      <Header top={"Shipping Terms / Partners"} title={"Pentagon - Shipping Terms"} content={'Shipping terms are standardized phrases used in international trade to outline the responsibilities, costs, and risks involved in moving goods. They help ensure smooth coordination between buyers, sellers, and logistics providers throughout the shipping process.'} />
      <ShipTerms />
    </div>
  )
}

export default page