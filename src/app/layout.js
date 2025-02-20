import { MantineProvider, TextInput } from '@mantine/core';
import { Kumbh_Sans } from 'next/font/google';
import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

const KumbhSans = Kumbh_Sans({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

const theme = {
  fontFamily: KumbhSans.style.fontFamily,
  fontSizes: {
    xs: "clamp(0.7rem, 0.8vw, 0.9rem)",
    smx: "clamp(0.8rem, 1vw, 1rem)",
    sm: "clamp(0.9rem, 1.2vw, 1.1rem)",
    base: "clamp(1rem, 1.5vw, 1.25rem)",
    md: "clamp(1.1rem, 1.8vw, 1.5rem)",
    lgx: "clamp(1.3rem, 2.2vw, 1.75rem)",
    lgx2: "clamp(1.5rem, 2.5vw, 2rem)",
    lg: "clamp(1.75rem, 3vw, 2.5rem)",
    xl: "clamp(2rem, 3.5vw, 3rem)",
  },
  components: {
    TextInput: {
      styles: {
        input: {
          fontSize: "14px"
        },
      },
    },

  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Pentagon Prime is a unit of Pentagon Group"
        />
        <link rel="icon" href={'./logo-pp.png'} />
        <title>Pentagon Prime</title>
      </head>
      <body className={KumbhSans.className}>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
