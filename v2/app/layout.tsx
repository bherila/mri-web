// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";

import '@/lib/styles/webflow.css'
import '@/lib/styles/custom.css'
import '@/lib/styles/webflow.grid.css'
import '@/lib/styles/animate.css'
import '@/lib/styles/tables.css'
import Header from '@/lib/components/Header'
import Footer from '@/lib/components/Footer'
import FooterNav from '@/lib/components/FooterNav'
import LayoutMain from '@/lib/components/LayoutMain'
import Script from 'next/script'

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <Script src="https://code.jquery.com/jquery-3.3.1.min.js" type="text/javascript"
					integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossOrigin="anonymous" />
			<Script src="https://uploads-ssl.webflow.com/5b9e87c40899a487ba8091e4/js/ideal-mri.71c22ec14.js"
					type="text/javascript" />
      </head>
      <body>
				<Header/>
				<LayoutMain>{children}</LayoutMain>
				<FooterNav/>
				<Footer/>
      </body>
    </html>
  );
}
