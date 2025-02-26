import { Kumbh_Sans } from 'next/font/google';

const kumbhSans = Kumbh_Sans({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});

const theme = {
    fontFamily: kumbhSans.style.fontFamily,
    fontSizes: {
        xs: "clamp(0.7rem, 0.8vw, 0.9rem)",   // ~11.2px - 14.4px 
        smx: "clamp(0.8rem, 1vw, 1rem)",      // ~12.8px - 16px
        sm: "clamp(0.9rem, 1.2vw, 1.1rem)",   // ~14.4px - 17.6px
        base: "clamp(1rem, 1.5vw, 1.25rem)",  // ~16px - 20px 
        md: "clamp(1.1rem, 1.8vw, 1.5rem)",   // ~17.6px - 24px
        lgx: "clamp(1.3rem, 2.2vw, 1.75rem)", // ~20.8px - 28px
        lgx2: "clamp(1.5rem, 2.5vw, 2rem)",   // ~24px - 32px
        lg: "clamp(1.75rem, 3vw, 2rem)",    // ~28px - 32px
        xl: "clamp(2rem, 3.5vw, 3rem)",       // ~32px - 48px 
        xxl: "clamp(2.4rem, 4vw, 3.4rem)", // ~38.4px - 54.4px
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
