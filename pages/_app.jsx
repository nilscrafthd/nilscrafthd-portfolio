import "../public/css/global.css"
import "../public/css/tippy.css"
import "tailwindcss/tailwind.css"
import NProgress from "nprogress"
import Router from "next/router"
import Head from "next/head"

import Header from "../components/Static/Header.jsx"
import Footer from "../components/Static/Footer.jsx"

// Setup NProgress on route changes
Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default function NilsCraftHD({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Standard HTML Meta Tags */}
        <title>NilsCraftHD – Portfolio</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="I'm Nils, better known as NilsCraftHD. I love building things, working with JavaScript, TypeScript, NextJS, Tailwind, and MySQL and gaming with friends."
        />
      
        {/* Favicon */}
        <link rel="icon" href="/img/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="https://www.nilscrafthd.com/img/favicon.png" type="image/png" />
      
        {/* Open Graph (Discord, WhatsApp, Facebook) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NilsCraftHD – Portfolio" />
        <meta property="og:description" content="I'm Nils, better known as NilsCraftHD. I love building things, working with JavaScript, TypeScript, NextJS, Tailwind, and MySQL and gaming with friends." />
        <meta property="og:url" content="https://www.nilscrafthd.com" />
        <meta property="og:image" content="https://www.nilscrafthd.com/img/favicon.png" />
        <meta property="og:image:alt" content="NilsCraftHD Logo Preview" />
        <meta property="og:site_name" content="NilsCraftHD" />
        <meta name="theme-color" content="#3a3a3a" />
      
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="NilsCraftHD – Portfolio" />
        <meta name="twitter:description" content="I'm Nils, better known as NilsCraftHD. I love building things, working with JavaScript, TypeScript, NextJS, Tailwind, and MySQL and gaming with friends." />
        <meta name="twitter:image" content="https://www.nilscrafthd.com/img/favicon.png" />
        <meta name="twitter:image:alt" content="NilsCraftHD Logo" />
        <meta name="twitter:creator" content="@NilsCraftHD" />
        <meta name="twitter:site" content="@NilsCraftHD" />
        <meta property="twitter:url" content="https://www.nilscrafthd.com" />
        <meta property="twitter:domain" content="nilscrafthd.com" />
      
        {/* WhatsApp (OG) */}
        <meta property="og:image:secure_url" content="https://www.nilscrafthd.com/img/favicon.png" />
      </Head>


      {/* Page Layout */}
      <main className="overflow-hidden md:overflow-visible min-h-screen max-w-screen-lg w-full px-4 md:w-10/12 lg:w-8/12 mx-auto py-10 md:py-16 lg:py-20 transition-all duration-300">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>

      {/* JS Scripts */}
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" />
      <script src="/js/main.js" />

              {/* Fonts & Styles */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v6.0.0-beta1/css/all.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/nprogress.css" />
    </>
  )
}
