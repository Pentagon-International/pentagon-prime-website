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
    xs: "12px",
    smx: "14px",
    sm: "16px",
    base: "18px",
    md: "20px",
    lgx: "24px",
    lgx2: "28px",
    lg: "32px",
    xl: "40px",
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
