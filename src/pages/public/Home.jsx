import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/public/Home.css';
import book from './assets/book.png';
import cosmetics from './assets/cosmetics.png';
import fashion from './assets/fashion.png';
import household from './assets/household.png';
import international from './assets/international.png';
import phone from './assets/phone.png';
import selling from './assets/selling.png';
import sport from './assets/sport.png';
import qc1 from './assets/quangcao1.png';
import qc2 from './assets/quangcao2.png';
import productImg from './assets/muado.jpg';

export default function Home() {
    const navigate = useNavigate();

    const products = [
        { id: 1, name: "The Java Handbook siêu dài abc xyz 1", price: 29.99, rating: 4, sold: "1.2k", image: productImg },
        { id: 2, name: "Clean Code: A Handbook of Agile Software Craftsmanship", price: 35.50, rating: 5, sold: "800", image: productImg },
        { id: 3, name: "JavaScript: The Good Parts", price: 25.00, rating: 4, sold: "2.5k", image: productImg },
        { id: 4, name: "Design Patterns: Elements of Reusable Object-Oriented Software", price: 45.99, rating: 5, sold: "500", image: productImg },
        { id: 5, name: "Pragmatic Programmer, The: From Journeyman to Master", price: 39.00, rating: 4, sold: "1.1k", image: productImg },
        { id: 6, name: "Introduction to Algorithms, 3rd Edition", price: 60.00, rating: 5, sold: "300", image: productImg },
        { id: 7, name: "Cracking the Coding Interview", price: 28.50, rating: 4, sold: "4.2k", image: productImg },
        { id: 8, name: "Refactoring: Improving the Design of Existing Code", price: 42.00, rating: 5, sold: "150", image: productImg },
    ];

    const renderRating = (score) => {
        return "⭐".repeat(score) + "☆".repeat(5 - score);
    };

    const handleProductClick = (id) => {
        navigate(`/product/${id}`); 
    };

    return (
        <div className='home'>
            {/* Thanh nav trái */}
            <div className='home_navbar_left'>
                <div className='home_options'>
                    <img className='home_options_img' src={selling} alt="" />
                    <b className='home_options_text'>Sản phẩm bán chạy</b>
                </div>
                <div className='home_options'>
                    <img className='home_options_img' src={international} alt="" />
                    <b className='home_options_text'>Săn hàng quốc tế</b>
                </div>
                <div className='home_options'>
                    <img className='home_options_img' src={fashion} alt="" />
                    <b className='home_options_text'>Thời trang nữ</b>
                </div>
                <div className='home_options'>
                    <img className='home_options_img' src={cosmetics} alt="" />
                    <b className='home_options_text'>Làm đẹp</b>
                </div>
                <div className='home_options'>
                    <img className='home_options_img' src={phone} alt="" />
                    <b className='home_options_text'>Đồ điện tử</b>
                </div>
                <div className='home_options'>
                    <img className='home_options_img' src={sport} alt="" />
                    <b className='home_options_text'>Thể thao</b>
                </div>
                <div className='home_options'>
                    <img className='home_options_img' src={book} alt="" />
                    <b className='home_options_text'>Tài liệu Giáo dục</b>
                </div>
                <div className='home_options'>
                    <img className='home_options_img' src={household} alt="" />
                    <b className='home_options_text'>Đồ gia dụng</b>
                </div>
            </div>

            {/* Nội dung chính */}
            <div className='home_main_content'>
                {/* Quảng cáo */}
                <div className='home_ad'>
                    <img className='home_qc' src={qc1} alt="" />
                    <img className='home_qc_2'src={qc2} alt="" />
                </div>

                {/* Sản phẩm */}
                <div className='home_products'>
                    {products.map((item) => (
                        <div 
                            className='product' 
                            key={item.id}
                            onClick={() => handleProductClick(item.id)}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="product_img"
                            />

                            <div className="product_name">
                                {item.name}
                            </div>

                            <div className="product_rating">
                                {renderRating(item.rating)} 
                                <span className="product_sold">Đã bán {item.sold}</span>
                            </div>

                            <div className="product_bottom">
                                <span className="product_price">${item.price}</span>
                                <button className="product_btn">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}