"use client";
import BottomCard from "@/components/common/BottomCard";
import FAQ from "@/components/common/FAQ";
import QuoteCard from "./QuoteCard";
import Retail from "./Retail";
import Ship from "./Ship";
import { usePathname } from "next/navigation";
import { memo, useMemo } from "react";

function ServiceLayout({ children }) {
    const pathname = usePathname();
    
    const title = useMemo(() => 
        pathname === "/service/warehousing-and-distribution/" 
            ? 'Want a demo of our warehouse dashboard or a lane-level cost estimate? ' 
            : pathname === "/service/cross-country-trade/" 
                ? 'Planning a cross-border move?' 
                : 'Want to GET PRIME experience?',
        [pathname]
    );
    
    const text = useMemo(() => 
        pathname === "/service/warehousing-and-distribution/" 
            ? 'Contact our team for an operational review and a free feasibility note.' 
            : pathname === "/service/cross-country-trade/" 
                ? "Request a quote or speak to our Cross-Country Trade team. we'll map the most cost-effective, compliant and low-friction route for your cargo!" 
                : 'Talk to a supply chain solutions expert and see the Prime Platform in action.',
        [pathname]
    );
    
    const button = 'Reach us here';
    return (
        <>
            {children}
            {/* <QuoteCard /> */}
            {/* <FAQ /> */}
            <BottomCard title={title} text={text} button={button} />
        </>
    );
}

export default memo(ServiceLayout);
