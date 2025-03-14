import { Kumbh_Sans } from 'next/font/google';

const kumbhSans = Kumbh_Sans({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

const theme = {
    fontFamily: kumbhSans.style.fontFamily,
    fontSizes: {
        xs: "clamp(0.7rem, 0.8vw, 0.9rem)",    
        smx: "clamp(0.8rem, 1vw, 1rem)",      
        sm: "clamp(0.9rem, 1.2vw, 1.1rem)",   
        base: "clamp(1rem, 1.5vw, 1.1rem)",   
        md: "clamp(1.1rem, 1.8vw, 1.5rem)",   
        lgx: "clamp(1.3rem, 2.2vw, 1.75rem)", 
        lgx2: "clamp(1.5rem, 2.5vw, 2rem)",   
        lg: "clamp(1.75rem, 3vw, 2rem)",    
        xl: "clamp(2rem, 3.5vw, 3rem)",       
        xxl: "clamp(2.4rem, 4vw, 3.4rem)", 
    },
    lineHeights: {
        xs: '19.84px',
        sm: '27px',
        lgx: '33.6px',
        lgx2: '44px',
        lg: '51.7px',
        xlx: '61.6px',
        xxl: '70px',
        xl: '76.8px',
    },
    components: {
        TextInput: {
            styles: {
                input: {
                    fontSize: "14px",
                },
            },
        },
    },
};

export { theme, kumbhSans };
