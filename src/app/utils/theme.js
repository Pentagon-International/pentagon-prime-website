import { Kumbh_Sans, Roboto, Poppins } from 'next/font/google';
import { TYPOGRAPHY } from './TYPOGRAPHY';

const kumbhSans = Kumbh_Sans({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
});
// const roboto = Roboto({
//   weight: ["400", "500", "700"],
//   subsets: ["latin"],
// });

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const theme = {
    fontFamily: `${poppins.style.fontFamily}, sans-serif`,
    fontSizes: {
        xs: "clamp(0.7rem, 0.8vw, 0.9rem)",    // ~11.2px - 14.4px
        smx: "clamp(0.8rem, 1vw, 1rem)",      // ~12.8px - 16px
        sm: "clamp(0.9rem, 1.2vw, 1.1rem)",   // ~14.4px - 17.6px
        base: "clamp(1rem, 1.5vw, 1.1rem)",   // ~16px - 17.6px
        md: "clamp(1.1rem, 1.8vw, 1.5rem)",   // ~17.6px - 24px
        lgx: "clamp(1.3rem, 2.2vw, 1.75rem)", // ~20.8px - 28px
        lgx2: "clamp(1.5rem, 2.5vw, 2rem)",   // ~24px - 32px
        lg: "clamp(1.75rem, 3vw, 2rem)",      // ~28px - 32px
        xl: "clamp(2rem, 3.5vw, 3rem)",       // ~32px - 48px
        xxl: "clamp(2.4rem, 4vw, 3.4rem)",    // ~38.4px - 54.4px
    },
    lineHeights: {
        xs: '19.84px',  // ~1.24rem
        sm: '27px',     // ~1.69rem
        lgx: '33.6px',  // ~2.1rem
        lgx2: '44px',   // ~2.75rem
        lg: '51.7px',   // ~3.23rem
        xlx: '61.6px',  // ~3.85rem
        xxl: '70px',    // ~4.38rem
        xl: '76.8px',   // ~4.8rem
    },
    components: {
        TextInput: {
            styles: {
                input: {
                    fontSize: TYPOGRAPHY.input.small,
                },
            },
        },
    },
};

export { theme, kumbhSans };
