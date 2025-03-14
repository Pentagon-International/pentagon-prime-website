import { MantineProvider } from '@mantine/core';
import Footer from './component/footer/Footer';
import Header from './component/header/Header';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { kumbhSans, theme } from './utils/theme';

export const metadata = {
  title: "Pentagon Prime",
  description: "Pentagon Prime is a unit of Pentagon Group",
  icons: {
    icon: "/logo-pp.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kumbhSans.className}>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
