import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

export default class RootLayout extends Component {
  render() {
    return (
      <div className="overflow-x-hidden dark:bg-darkbg">
        <Helmet>
          <title>STEMMentor - Learn, Teach, Grow</title>
          <meta
            name="description"
            content="STEMMentor is a platform for students and teachers to learn and share knowledge in STEM fields."
          />

          <meta property="og:title" content="STEMMentor - Learn, Teach, Grow" />
          <meta
            property="og:description"
            content="STEMMentor is a platform for students and teachers to learn and share knowledge in STEM fields."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stem-mentor.vercel.app/" />
          <meta
            property="og:image"
            content="https://stem-mentor.vercel.app/assets/STEM168.png"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="STEMMentor - Learn, Teach, Grow"
          />
          <meta
            name="twitter:description"
            content="STEMMentor is a platform for students and teachers to learn and share knowledge in STEM fields."
          />
          <meta
            name="twitter:image"
            content="https://stem-mentor.vercel.app/assets/STEM168.png"
          />
        </Helmet>

        <Navbar />
        <div className="pt-20">
          <Outlet />
          <Footer />
        </div>
      </div>
    );
  }
}
