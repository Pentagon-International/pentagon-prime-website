import BottomCard from "../component/common/BottomCard";
import FAQ from "../component/common/FAQ";
import { fetchEntries } from "../utils/fetchEntries";
import QuoteCard from "./QuoteCard";
import Retail from "./Retail";
import Ship from "./Ship";

export default async function ServiceLayout({ children }) {
    const [retailData, itData, shipAnywhereData, shipEverywhereData] = await Promise.all([
        fetchEntries("retail_store"),
        fetchEntries("how-it-works"),
        fetchEntries("ship-anywhere"),
        fetchEntries("ship-everywhere"),
    ]);

    const title = 'Want to GET PRIME experience?';
    const text =
        'Talk to a supply chain solutions expert and see the Prime Platform in action.';
    const button = 'Reach us here';
    return (
        <>
            {children}
            <Retail first_title={retailData.title} first_content={retailData.content} second_title={itData.title} second_content={itData.content} />
            <Ship first_title={shipAnywhereData.title} first_content={shipAnywhereData.content} second_title={shipEverywhereData.title} second_content={shipEverywhereData.content} />
            <QuoteCard />
            {/* <FAQ /> */}
            <BottomCard title={title} text={text} button={button} />
        </>
    );
}
