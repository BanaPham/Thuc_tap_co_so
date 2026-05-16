import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/seller/ShopHome.css";
import logo from '../public/assets/sp-logo-2.png';
import ShopProfile from "./ShopProfile";
import ShopInvoice from "./ShopInvoice";

export default function ShopHome() {
    const { active_tab } = useParams();
    const navigate = useNavigate(); 
    const activeTab = active_tab || "profile";

    const handleTabChange = (tabName) => {
        navigate(`/seller/${tabName}`); 
    };

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className="main-content">
                        <ShopProfile />
                    </div>
                );
            case "invoice":
                return (
                    <div className="main-content">
                        <ShopInvoice />
                    </div>
                );
            default:
                return <div className="main-content" />;
        }
    };

    return (
        <>
        <div className="shopHome-navbar">
            <div className="shopHome-header">
                <h2 className="shopHome-logo-title">
                    <img src={logo} alt="logo" className="header__logo-img"/>
                    ShopZone
                </h2>
            </div>

            <div
                className={`profile ${activeTab === "profile" ? "active-link" : ""}`}
                onClick={() => handleTabChange("profile")}
            >
                Thông tin cửa hàng
            </div>

            <div
                className={`invoice ${activeTab === "invoice" ? "active-link" : ""}`}
                onClick={() => handleTabChange("invoice")}
            >
                Hóa đơn bán hàng
            </div>
        </div>

        {renderContent()}
        </>
    );
}