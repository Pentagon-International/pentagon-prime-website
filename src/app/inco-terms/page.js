import Header from "./header"
import StaticContents from "./staticContent"

const page = () => {
  return (
    <div>
      <Header title={"INCOTERMS"} content={'Incoterms, created by the International Chamber of Commerce, are globally recognized rules that define the roles and responsibilities of buyers and sellers in international trade. They act as the universal language of commerce, helping businesses navigate shipping, risk, and costs with clarity and confidence.'} />
      <StaticContents />
    </div>
  )
}

export default page