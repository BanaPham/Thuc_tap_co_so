import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom' 
import '../../styles/public/Product.css';
import itemImage from './assets/quanao.jpg';
import itemImage2 from './assets/quanao2.jpg';
import itemImage3 from './assets/quanao3.jpg';
import itemImage4 from './assets/quanao4.jpg';
import avt from './assets/avt-shop.jpg';

export default function Product() {
    const { id } = useParams();
    
    const productData = {
        name: "Áo Hoodie Thời Trang Unisex",
        rating: 4.8,
        sales: "1.2k",
        price: "121.000",
        description: "Sản phẩm chất liệu nỉ bông cao cấp, giữ ấm tốt và cực kỳ thoáng khí. Thiết kế trẻ trung phù hợp cho cả nam và nữ.",
        mainImage: itemImage,
        subImages: [itemImage, itemImage2, itemImage3, itemImage4, itemImage2, itemImage3, itemImage4], 
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
            { name: 'Trắng'},
            { name: 'Đỏ'},
            { name: 'Xanh'}
        ]
    };

    const shopData = {
            name: "The Artisan Collective",
            avatar: avt,
            rating: 4.2,
            reviews: "1.2k",
            description: "Unique, ethically sourced handmade goods from global artisans. Since 2018.",
            products: 158,
            followers: 8200,
            sales: "45k"
        };

    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Trắng');

    const renderStars = (score) => {
        const positiveStars = Math.round(score); 
        return "⭐".repeat(positiveStars) + "☆".repeat(5 - positiveStars);
    };

    const [currentImage, setCurrentImage] = useState(productData.mainImage);

    return (
        <div className='product-container'>
            <div className='item-details'>
                <div className='item-img-group'>
                    <img className='item-main-img' src={currentImage} alt={productData.name} />
                    <div className='item-sub-images'>
                        {productData.subImages.map((img, index) => (
                            <img 
                                key={index} 
                                src={img} 
                                alt={`sub-${index}`} 
                                className={`sub-img ${currentImage === img ? 'active-thumb' : ''}`}
                                onClick={() => setCurrentImage(img)} 
                            />
                        ))}
                    </div>
                </div>
                <div className='item-details-group'>
                    <h1 className='product-name'>{productData.name}</h1>
                    
                    <div className='product-meta'>
                        {renderStars(productData.rating)}
                        <span className='sales'> | Đã bán {productData.sales}</span>
                    </div>

                    <div className='product-price'>{productData.price}đ</div>

                    <div className='product-description'>
                        <p>{productData.description}</p>
                    </div>
                    <br />

                    <div className='selection-group'>
                        <p>Vận chuyển:</p>
                        <p className='shipping-date-text'>* Đảm bảo nhận hàng vào ngày 5/3 - 14/3</p>
                    </div>
                    <br />

                    <div className='selection-group'>
                        <p>An tâm mua sắm cùng ShopZone:</p>
                        <p className='safe-text'>✅ Đảm bảo chính hãng 100%</p>
                    </div>
                    <br />

                    {/* Chọn Size */}
                    <div className='selection-group'>
                        <p>Kích thước:</p>
                        <div className='options'>
                            {productData.sizes.map(size => (
                                <button 
                                    key={size}
                                    className={`opt-btn ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <br />

                    {/* Chọn Màu sắc */}
                    <div className='selection-group'>
                        <p>Màu sắc: <strong>{selectedColor}</strong></p>
                        <div className='options'>
                            {productData.colors.map(color => (
                                <button 
                                    key={color.name}
                                    className={`opt-btn ${selectedColor === color.name ? 'active' : ''}`}
                                    onClick={() => setSelectedColor(color.name)}
                                >
                                    {color.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='add-to-cart'>
                        <button className='add-to-cart-btn'>Thêm vào giỏ hàng</button>
                        <button className='buy-now'>Mua ngay</button>
                    </div>
                </div>
            </div>

            <div className='shop-section-container'>
                <div className='shop-section-profile'>
                    <img src={shopData.avatar} alt="shop-avatar" className='shop-section-avatar' />
                    <div className='shop-section-info'>
                        <h1 className='shop-section-name'>{shopData.name}</h1>
                        <div className='shop-section-rating-box'>
                            {renderStars(shopData.rating)}
                            <span className='shop-section-rating-text'>
                                {shopData.rating} ({shopData.reviews} Đánh giá)
                            </span>
                        </div>
                        <p className='shop-section-bio'>{shopData.description}</p>
                    </div>
                </div>

                <div className='shop-section-metrics'>
                    <div className='shop-section-stats-grid'>
                        <div className='shop-section-stat-card'>
                            <strong className='shop-section-stat-value'>{shopData.products}</strong>
                            <span className='shop-section-stat-label'>Sản phẩm</span>
                        </div>
                        <div className='shop-section-stat-card'>
                            <strong className='shop-section-stat-value'>{shopData.followers}</strong>
                            <span className='shop-section-stat-label'>Theo dõi</span>
                        </div>
                        <div className='shop-section-stat-card'>
                            <strong className='shop-section-stat-value'>{shopData.sales}</strong>
                            <span className='shop-section-stat-label'>Lượt bán</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='item-similar'>
                <h3>Sản phẩm tương tự</h3>
            </div>
        </div>
    );
}