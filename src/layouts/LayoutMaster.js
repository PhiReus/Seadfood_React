import React from "react";
import Header from "../includes/Header";
import Sidebar from "../includes/Sidebar";
import Footer from "../includes/Footer";

function LayoutMaster({children}) {
    return (
        <>
            <Header />
            <Sidebar />
            {children}
            <Footer />
        </>
    )
}
export default LayoutMaster;
