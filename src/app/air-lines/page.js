import React from 'react'
import Header from './header'
import Airlines from './Airlines'

const page = () => {
  return (
    <div>
      <Header top={"Airlines / Partners"} title={"Pentagon - Top Air Lines"} content={'Air lines, Track shipment, view rates, get schedules'} />
      <Airlines />
    </div>
  )
}

export default page