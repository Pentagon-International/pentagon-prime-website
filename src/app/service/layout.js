import BottomCard from "../component/common/BottomCard";
import FAQ from "../component/common/FAQ";
import QuoteCard from "./QuoteCard";
import Retail from "./Retail";
import Ship from "./Ship";

export default async function ServiceLayout({ children }) {


    const title = 'Want to GET PRIME experience?';
    const text =
        'Talk to a supply chain solutions expert and see the Prime Platform in action.';
    const button = 'Reach us here';
    return (
        <>
            {children}
            <QuoteCard />
            {/* <FAQ /> */}
            <BottomCard title={title} text={text} button={button} />
        </>
    );
}
