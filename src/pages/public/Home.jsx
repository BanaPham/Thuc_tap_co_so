import React, { useState } from 'react';
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
import product from './assets/muado.jpg';

export default function Home() {
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
                    <div className='product'>
                        <img
                            src={product}
                            alt="product"
                            className="product_img"
                        />

                        <div className="product_name">
                            The Java Handbook siêu dài abc xyz 123456
                        </div>

                        <div className="product_rating">
                            ⭐⭐⭐⭐☆ <span className="product_sold">Đã bán 1.2k</span>
                        </div>

                        <div className="product_bottom">
                            <span className="product_price">$29.99</span>
                            <button className="product_btn">Add to Cart</button>
                        </div>
                    </div>
                    <div className='product'>
                        <img
                            src={product}
                            alt="product"
                            className="product_img"
                        />

                        <div className="product_name">
                            The Java Handbook siêu dài abc xyz 123456
                        </div>

                        <div className="product_rating">
                            ⭐⭐⭐⭐☆ <span className="product_sold">Đã bán 1.2k</span>
                        </div>

                        <div className="product_bottom">
                            <span className="product_price">$29.99</span>
                            <button className="product_btn">Add to Cart</button>
                        </div>
                    </div>
                    <div className='product'>
                        <img
                            src={product}
                            alt="product"
                            className="product_img"
                        />

                        <div className="product_name">
                            The Java Handbook siêu dài abc xyz 123456
                        </div>

                        <div className="product_rating">
                            ⭐⭐⭐⭐☆ <span className="product_sold">Đã bán 1.2k</span>
                        </div>

                        <div className="product_bottom">
                            <span className="product_price">$29.99</span>
                            <button className="product_btn">Add to Cart</button>
                        </div>
                    </div>
                    <div className='product'>
                        <img
                            src={product}
                            alt="product"
                            className="product_img"
                        />

                        <div className="product_name">
                            The Java Handbook siêu dài abc xyz 123456
                        </div>

                        <div className="product_rating">
                            ⭐⭐⭐⭐☆ <span className="product_sold">Đã bán 1.2k</span>
                        </div>

                        <div className="product_bottom">
                            <span className="product_price">$29.99</span>
                            <button className="product_btn">Add to Cart</button>
                        </div>
                    </div>
                    <div className='product'>
                        <img
                            src={product}
                            alt="product"
                            className="product_img"
                        />

                        <div className="product_name">
                            The Java Handbook siêu dài abc xyz 123456
                        </div>

                        <div className="product_rating">
                            ⭐⭐⭐⭐☆ <span className="product_sold">Đã bán 1.2k</span>
                        </div>

                        <div className="product_bottom">
                            <span className="product_price">$29.99</span>
                            <button className="product_btn">Add to Cart</button>
                        </div>
                    </div>
                    <div className='product'>
                        <img
                            src={product}
                            alt="product"
                            className="product_img"
                        />

                        <div className="product_name">
                            The Java Handbook siêu dài abc xyz 123456
                        </div>

                        <div className="product_rating">
                            ⭐⭐⭐⭐☆ <span className="product_sold">Đã bán 1.2k</span>
                        </div>

                        <div className="product_bottom">
                            <span className="product_price">$29.99</span>
                            <button className="product_btn">Add to Cart</button>
                        </div>
                    </div>
                    <div className='product'>
                        <img
                            src={product}
                            alt="product"
                            className="product_img"
                        />

                        <div className="product_name">
                            The Java Handbook siêu dài abc xyz 123456
                        </div>

                        <div className="product_rating">
                            ⭐⭐⭐⭐☆ <span className="product_sold">Đã bán 1.2k</span>
                        </div>

                        <div className="product_bottom">
                            <span className="product_price">$29.99</span>
                            <button className="product_btn">Add to Cart</button>
                        </div>
                    </div>
                    <div className='product'>
                        <img
                            src={product}
                            alt="product"
                            className="product_img"
                        />

                        <div className="product_name">
                            The Java Handbook siêu dài abc xyz 123456
                        </div>

                        <div className="product_rating">
                            ⭐⭐⭐⭐☆ <span className="product_sold">Đã bán 1.2k</span>
                        </div>

                        <div className="product_bottom">
                            <span className="product_price">$29.99</span>
                            <button className="product_btn">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}