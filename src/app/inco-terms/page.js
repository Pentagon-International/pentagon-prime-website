import Header from "./header"
import StaticContents from "./staticContent"

const page = () => {
  return (
    <div>
      <Header title={"INCOTERMS"} content={'Entering the world of global trade means understanding your roles and responsibilities in importing'} />
      <StaticContents />
    </div>
  )
}

export default page