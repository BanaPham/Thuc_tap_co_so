import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/seller/ShopProfile.css";
import avt from '../public/assets/avt-shop.jpg';
import productImg from '../public/assets/muado.jpg';

export default function ShopProfile() {
    const shopData = {
        name: "Shop ABC",
        avatar: avt,
        rating: 4.2,
        reviews: "1.2k",
        description: "Unique, ethically sourced handmade goods from global artisans. Since 2018.",
        products: 158,
        followers: 8200,
        sales: "45k"
    };

    // Quản lý Mô tả 
    const [description, setDescription] = useState(shopData.description);
    const [isEditingDesc, setIsEditingDesc] = useState(false);

    // Quản lý Voucher 
    const [vouchers, setVouchers] = useState([
        { id: 1, discount: "100k", target: "500k", total: 100, remaining: 50, expiry: "30.04.2026" },
        { id: 2, discount: "50k", target: "200k", total: 50, remaining: 10, expiry: "15.05.2026" },
    ]);
    const [showAddVoucher, setShowAddVoucher] = useState(false);
    const [newVoucher, setNewVoucher] = useState({ discount: '', target: '', total: '', expiry: '' });
    const [error, setError] = useState("");

    // Quản lý Sản phẩm & Modal Chi tiết
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [isEditingProduct, setIsEditingProduct] = useState(false);

    const [editProduct, setEditProduct] = useState({
        description: "",
        size: "",
        color: ""
    });

    const products = [
        { 
            id: 1, name: "The Java Handbook", price: 29.99, rating: 4, sold: "1.2k", image: productImg,
            description: "Cuốn sách hướng dẫn lập trình Java căn bản đến nâng cao. Cuốn sách hướng dẫn lập trình Java căn bản đến nâng cao. Cuốn sách hướng dẫn lập trình Java căn bản đến nâng cao.",
            size: ["A5", "A4"], color: ["Trắng đen", "Xanh"], sku: "BK-JAVA-001",
            reviews: [
                { id: 101, user: "Nguyen Van A", time: "20.04.2026", text: "Sách rất hay và bổ ích!", replies: [] },
                { id: 102, user: "Nguyen Van A", time: "20.04.2026", text: "Sách rất hay và bổ ích!", replies: [] }
            ]
        },
        { 
            id: 2, name: "Clean Code", price: 35.50, rating: 5, sold: "800", image: productImg, 
            description: "Mã sạch trong lập trình agile.", size: ["A5"], color: ["Xanh"], sku: "BK-CC-002", reviews: [] 
        },
    ];

    // Thêm sản phẩm mới
    const [productList, setProductList] = useState(products);
    const [showAddProduct, setShowAddProduct] = useState(false);

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: "",
        size: "",
        color: "",
        sku: "",
        images: []
    });
    //
    const formatNumber = (num) => {
        return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
    };
    //
    const renderStars = (score) => {
        const positiveStars = Math.round(score); 
        return "⭐".repeat(positiveStars) + "☆".repeat(5 - positiveStars);
    };

    /* Thêm voucher */
    const formatMoney = (value) => {
        const num = Number(value);
        if (num >= 1000) {
            return (num / 1000) + "k";
        }
        return num;
    };
    //
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };
    //
    const handleAddVoucher = () => {
        if (!newVoucher.discount || !newVoucher.target || !newVoucher.total || !newVoucher.expiry) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (Number(newVoucher.discount) <= 0 || Number(newVoucher.target) <= 0 || Number(newVoucher.total) <= 0) {
            setError("Giá trị phải lớn hơn 0!");
            return;
        }

        setError("");
        const id = vouchers.length + 1;

        const formattedVoucher = {
            id,
            discount: formatMoney(newVoucher.discount),
            target: formatMoney(newVoucher.target),
            total: Number(newVoucher.total),
            remaining: Number(newVoucher.total),
            expiry: formatDate(newVoucher.expiry)
        };

        setVouchers([...vouchers, formattedVoucher]);

        setShowAddVoucher(false);
        setNewVoucher({ discount: '', target: '', total: '', expiry: '' });
    };
    //
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const imageUrls = files.map(file => URL.createObjectURL(file));

        setNewProduct({
            ...newProduct,
            images: [...newProduct.images, ...imageUrls]
        });
    };
    //
    const handleAddProduct = () => {
        if (
            !newProduct.name ||
            !newProduct.price ||
            !newProduct.description ||
            newProduct.images.length === 0
        ) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const addedProduct = {
            id: productList.length + 1,
            name: newProduct.name,
            price: Number(newProduct.price),
            description: newProduct.description,
            size: newProduct.size.split(",").map(s => s.trim()).filter(Boolean),
            color: newProduct.color.split(",").map(c => c.trim()).filter(Boolean),
            sku: newProduct.sku,
            image: newProduct.images[0],
            images: newProduct.images,
            rating: 0,
            sold: "0",
            reviews: []
        };

        setProductList([addedProduct, ...productList]);

        setShowAddProduct(false);

        setNewProduct({
            name: "",
            price: "",
            description: "",
            size: "",
            color: "",
            sku: "",
            images: []
        });
    };
    //
    const handleReply = (reviewId) => {
        if (!replyText.trim()) return;

        const updatedProducts = productList.map(p => {

            if (p.id === selectedProduct.id) {

                return {
                    ...p,

                    reviews: p.reviews.map(r => {

                        if (r.id === reviewId) {

                            return {
                                ...r,
                                reply: replyText
                            };
                        }

                        return r;
                    })
                };
            }

            return p;
        });

        setProductList(updatedProducts);

        const updatedSelected = updatedProducts.find(
            p => p.id === selectedProduct.id
        );

        setSelectedProduct(updatedSelected);

        setReplyText("");
        setReplyingTo(null);
    };

    return (
        <div className='shop-container profile-mode'>
            {/* Thông tin shop */ }
            <div className='shop-header profile-mode'>
                <div className='shop-info'>
                    <div className='info-left'>
                        <img src={shopData.avatar} alt="avatar" className='shop-avatar' />
                        <div className='shop-details'>
                            <h1>{shopData.name}</h1>
                            <div className='rating'>
                                {renderStars(shopData.rating)}
                                <span className='rating-score'>{shopData.rating} ({shopData.reviews} Đánh giá)</span>
                            </div>
                            {isEditingDesc ? (
                                <div className="edit-desc-area">
                                    <textarea 
                                        className="edit-textarea"
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)} 
                                        autoFocus
                                        rows={3}
                                    />
                                    <br />
                                    <button className="btn-save-desc" onClick={() => setIsEditingDesc(false)}>Lưu</button>
                                </div>
                            ) : (
                                <p className='description' title="Bấm để chỉnh sửa" onClick={() => setIsEditingDesc(true)}>
                                    {description} <span className="edit-icon">✎</span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className='info-right'>
                        <div className='stats'>
                            <div className='stat-item'>
                                <strong>{shopData.products}</strong>
                                <span>Sản phẩm</span>
                            </div>
                            <div className='stat-item'>
                                <strong>{formatNumber(shopData.followers)}</strong>
                                <span>Theo dõi</span>
                            </div>
                            <div className='stat-item'>
                                <strong>{shopData.sales}</strong>
                                <span>Lượt bán</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Voucher & Sản phẩm */}
            <div className='shop-main-content profile-mode'>
                {/* Voucher */}
                <div className='shop-voucher'>
                    <h3>Voucher của Shop</h3>
                    <div className='voucher-list'>
                        <div className='add-voucher-btn' title="Thêm Voucher" onClick={() => setShowAddVoucher(true)}>
                            <span>+</span>
                        </div>

                        {vouchers.map((v) => (
                            <div key={v.id} className="voucher-card profile-v">
                                <div className='voucher-left'>
                                    <div className='voucher-content'>
                                        <p className='v-discount'>Giảm {v.discount}</p>
                                        <p className='v-target'>Cho đơn từ {v.target}</p>
                                        <p className='v-stats'>Số lượng: {v.total} | Còn lại: {v.remaining}</p>
                                        <p className='v-expiry'>HSD: {v.expiry}</p>
                                    </div>
                                    <div className='sawtooth'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Thêm voucher */}
                {showAddVoucher && (
                    <div 
                        className="modal-overlay"
                        onClick={() => setShowAddVoucher(false)}
                    >
                        <div 
                            className="voucher-form"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h4>Thêm Voucher Mới</h4>
                            <input 
                                type="text" 
                                placeholder="Giá trị voucher" 
                                value={newVoucher.discount}
                                onChange={e => {
                                    setNewVoucher({...newVoucher, discount: e.target.value});
                                    setError("");
                                }} 
                            />
                            <input 
                                type="text" 
                                placeholder="Dành cho đơn từ ..." 
                                value={newVoucher.target}
                                onChange={e => {
                                    setNewVoucher({...newVoucher, target: e.target.value});
                                    setError("");
                                }} 
                            />
                            <input 
                                type="text" 
                                placeholder="Số lượng" 
                                value={newVoucher.total}
                                onChange={e => {
                                    setNewVoucher({...newVoucher, total: e.target.value});
                                    setError("");
                                }} 
                            />
                            <input 
                                type="date" 
                                placeholder="Hạn sử dụng" 
                                value={newVoucher.expiry}
                                onChange={e => {
                                    setNewVoucher({...newVoucher, expiry: e.target.value});
                                    setError("");
                                }} 
                            />
                            {error && <p className="error-text">{error}</p>}
                            <div className="form-btns">
                                <button onClick={() => setShowAddVoucher(false)}>Hủy</button>
                                <button className='add-voucher' onClick={handleAddVoucher}>Thêm</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Sản phẩm */}
                <div className='shop-products'>
                    <h3>Sản phẩm</h3>
                    <div className='shop-item'>
                        <div 
                            className='add-product-btn'
                            title="Thêm sản phẩm"
                            onClick={() => setShowAddProduct(true)}
                        >
                            <span>+</span>
                        </div>
                        {productList.map((item) => (
                            <div className='each-product no-hover' key={item.id}>
                                <img src={item.image} alt={item.name} className="shop-product-img" />
                                <div className="shop-product-name">{item.name}</div>
                                <div className="rating">
                                    {renderStars(item.rating)} 
                                    <span className="product_sold">Đã bán {item.sold}</span>
                                </div>
                                <div className="shop-product-bottom">
                                    <span className="shop-product-price">${item.price}</span>
                                    <button
                                        className="btn-view-detail"
                                        onClick={() => {
                                            setIsEditingProduct(false);
                                            setSelectedProduct(item);

                                            setEditProduct({
                                                description: item.description,
                                                size: item.size.join(", "),
                                                color: item.color.join(", ")
                                            });

                                            setIsEditingProduct(false);
                                        }}
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Thêm sản phẩm */}
            {showAddProduct && (
                <div 
                    className="modal-overlay"
                    onClick={() => setShowAddProduct(false)}
                >
                    <div 
                        className="product-form"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Thêm sản phẩm mới</h3>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                        />

                        <div className="preview-images">
                            {newProduct.images.map((img, index) => (
                                <img 
                                    key={index}
                                    src={img}
                                    alt=""
                                    className={index === 0 ? "main-preview" : ""}
                                />
                            ))}
                        </div>

                        <input
                            type="text"
                            placeholder="Tên sản phẩm"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    name: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Giá sản phẩm"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    price: e.target.value
                                })
                            }
                        />

                        <textarea
                            placeholder="Mô tả sản phẩm"
                            value={newProduct.description}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    description: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Kích thước"
                            value={newProduct.size}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    size: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Màu sắc"
                            value={newProduct.color}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    color: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="SKU"
                            value={newProduct.sku}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    sku: e.target.value
                                })
                            }
                        />

                        <div className="form-btns">
                            <button onClick={() => setShowAddProduct(false)}>
                                Hủy
                            </button>

                            <button
                                className="add-voucher"
                                onClick={handleAddProduct}
                            >
                                Thêm sản phẩm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Chi tiết Sản phẩm */}
            {selectedProduct && (
                <div 
                    className="modal-overlay"
                    onClick={() => {
                        setSelectedProduct(null);
                        setIsEditingProduct(false);
                    }}
                >
                    <div 
                        className="detail-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            className="close-x" 
                            onClick={() => {
                                setSelectedProduct(null);
                                setIsEditingProduct(false);
                            }}
                        >
                            &times;
                        </button>

                        <div className="detail-main">
                            <img src={selectedProduct.image} alt="" />

                            <div className="info">
                                <h2>{selectedProduct.name}</h2>
                                <span>{renderStars(selectedProduct.rating)} | Đã bán: {selectedProduct.sold}</span>
                                <span className="price-detail">${selectedProduct.price}</span>
                                {isEditingProduct ? (
                                    <>
                                        <textarea
                                            className="edit-product-textarea"
                                            value={editProduct.description}
                                            onChange={(e) => setEditProduct({...editProduct, description: e.target.value})
                                            }
                                        />

                                        <input
                                            type="text"
                                            placeholder="Size cách nhau dấu phẩy"
                                            value={editProduct.size}
                                            onChange={(e) => setEditProduct({...editProduct, size: e.target.value})
                                            }
                                        />

                                        <input
                                            type="text"
                                            placeholder="Màu cách nhau dấu phẩy"
                                            value={editProduct.color}
                                            onChange={(e) => setEditProduct({...editProduct, color: e.target.value})
                                            }
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className="product-desc">Mô tả sản phẩm: {selectedProduct.description}</p>

                                        <div className="meta">
                                            <p> <strong>Size:</strong>{" "} {selectedProduct.size.join(", ")}</p>
                                            <p><strong>Màu:</strong>{" "} {selectedProduct.color.join(", ")}</p>
                                            <p><strong>SKU:</strong> {selectedProduct.sku}</p>
                                        </div>
                                    </>
                                )}

                                <button
                                    className="btn-edit-product"
                                    onClick={() => {
                                        if (isEditingProduct) {

                                            const updatedProducts = productList.map(p => {
                                                if (p.id === selectedProduct.id) {
                                                    return {
                                                        ...p,
                                                        description: editProduct.description,
                                                        size: editProduct.size
                                                            .split(",")
                                                            .map(s => s.trim()),

                                                        color: editProduct.color
                                                            .split(",")
                                                            .map(c => c.trim())
                                                    };
                                                }

                                                return p;
                                            });

                                            setProductList(updatedProducts);

                                            const updatedSelected = updatedProducts.find(
                                                p => p.id === selectedProduct.id
                                            );

                                            setSelectedProduct(updatedSelected);
                                        }

                                        setIsEditingProduct(!isEditingProduct);
                                    }}
                                >
                                    {isEditingProduct ? "Lưu" : "Chỉnh sửa"}
                                </button>
                            </div>
                        </div>

                        {/* COMMENT */}
                        <div className="detail-rev">
                            <h4>Đánh giá sản phẩm</h4>

                            <div className='comment-list'>
                                {selectedProduct.reviews.map(comment => (
                                    <div key={comment.id} className='comment-item'>

                                        <div className='comment-user-info'>
                                            <strong>{comment.user}</strong>
                                            <span className='comment-stars'>⭐</span>
                                            <small className='comment-date'>{comment.time}</small>
                                        </div>

                                        <p className='comment-content'>{comment.text}</p>
                                        
                                        {!comment.reply && (
                                            <button 
                                                className="btn-reply"
                                                onClick={() => setReplyingTo(comment.id)}
                                            >
                                                Trả lời
                                            </button>
                                        )}

                                        {replyingTo === comment.id && (
                                            <div className="reply-box">
                                                <textarea 
                                                    placeholder="Nhập phản hồi..."
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                />

                                                <div className="reply-actions">
                                                    <button 
                                                        className="btn-send-reply"
                                                        onClick={() => handleReply(comment.id)}
                                                    >
                                                        Gửi
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {comment.reply && (
                                            <div className="shop-reply">
                                                <strong>{shopData.name}</strong>
                                                <p>{comment.reply}</p>
                                            </div>
                                        )}

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}