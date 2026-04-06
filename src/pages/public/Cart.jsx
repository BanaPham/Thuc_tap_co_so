import React, { useState, useMemo } from "react";
import '../../styles/public/Cart.css';
import qc1 from './assets/cart-qc-1.png';
import qc2 from './assets/cart-qc-2.png';
import trash from './assets/trash.png';
import bia from './assets/muado.jpg';
import Order from './Order';

export default function Cart() {
    const [shops, setShops] = useState([
        {
            shopName: "Shop ABC",
            items: [
                { id: 1, title: "Sách Mùa Đỏ - Tập 1", price: 30000, quantity: 1, selected: false, image: bia },
                { id: 2, title: "Sách Mùa Đỏ - Tập 2", price: 35000, quantity: 1, selected: false, image: bia },
            ]
        },
        {
            shopName: "Nhà sách Fahasa",
            items: [
                { id: 3, title: "Kỹ năng tư duy phản biện", price: 50000, quantity: 1, selected: false, image: bia },
            ]
        },
        {
            shopName: "Nhà Sách ABC",
            items: [
                { id: 1, title: "Sách Mùa Đỏ - Tập 1", price: 30000, quantity: 1, selected: false, image: bia },
                { id: 2, title: "Sách Mùa Đỏ - Tập 2", price: 35000, quantity: 1, selected: false, image: bia },
            ]
        }
    ]);

    const [isOrderOpen, setIsOrderOpen] = useState(false);

    const minValue = 1;
    const maxValue = 50;

    const formatCurrency = (value) => value.toLocaleString('en-US');
    const truncateTitle = (str, n) => str?.length > n ? str.substr(0, n - 1) + "..." : str;

    // Tick vào Shop -> Chọn tất cả sản phẩm của Shop đó
    const handleToggleShop = (shopIndex, checked) => {
        setShops(prev => prev.map((shop, index) => {
            if (index === shopIndex) {
                return {
                    ...shop,
                    items: shop.items.map(item => ({ ...item, selected: checked }))
                };
            }
            return shop;
        }));
    };

    // Tick vào từng sản phẩm
    const handleToggleItem = (shopIndex, itemId) => {
        setShops(prev => prev.map((shop, index) => {
            if (index === shopIndex) {
                return {
                    ...shop,
                    items: shop.items.map(item => 
                        item.id === itemId ? { ...item, selected: !item.selected } : item
                    )
                };
            }
            return shop;
        }));
    };

    // Chọn tất cả 
    const allSelected = useMemo(() => 
        shops.every(shop => shop.items.every(item => item.selected)), 
    [shops]);

    const handleSelectAll = (checked) => {
        setShops(prev => prev.map(shop => ({
            ...shop,
            items: shop.items.map(item => ({ ...item, selected: checked }))
        })));
    };

    // Thay đổi số lượng
    const handleUpdateQuantity = (shopIndex, itemId, delta) => {
        setShops(prev => prev.map((shop, index) => {
            if (index === shopIndex) {
                return {
                    ...shop,
                    items: shop.items.map(item => {
                        if (item.id === itemId) {
                            const newQty = Math.max(minValue, Math.min(maxValue, item.quantity + delta));
                            return { ...item, quantity: newQty };
                        }
                        return item;
                    })
                };
            }
            return shop;
        }));
    };

    // Nhập số lượng
    const handleInputChange = (shopIndex, itemId, value) => {
        const newQty = parseInt(value);
        if (!isNaN(newQty)) {
            setShops(prev => prev.map((shop, index) => {
                if (index === shopIndex) {
                    return {
                        ...shop,
                        items: shop.items.map(item => 
                            item.id === itemId 
                            ? { ...item, quantity: Math.max(minValue, Math.min(maxValue, newQty)) } 
                            : item
                        )
                    };
                }
                return shop;
            }));
        }
    };

    // Xóa sản phẩm
    const handleDelete = (shopIndex, itemId) => {
        if (window.confirm("Xóa sản phẩm này?")) {
            setShops(prev => prev.map((shop, index) => {
                if (index === shopIndex) {
                    return { ...shop, items: shop.items.filter(item => item.id !== itemId) };
                }
                return shop;
            }).filter(shop => shop.items.length > 0)); 
        }
    };

    // Lọc danh sách sản phẩm đã chọn
    const selectedItems = useMemo(() => {
        const items = [];
        shops.forEach(shop => {
            shop.items.forEach(item => {
                if (item.selected) {
                    items.push({ ...item, shop: shop.shopName });
                }
            });
        });
        return items;
    }, [shops]);

    // Tính tổng tiền
    const subtotal = useMemo(() => {
        return shops.reduce((acc, shop) => {
            return acc + shop.items
                .filter(item => item.selected)
                .reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }, 0);
    }, [shops]);

    const shippingFee = subtotal > 0 ? 15000 : 0;
    const totalAmount = subtotal + shippingFee;

    // Logic khi bấm Đặt hàng
    const handleOpenOrder = () => {
        if (selectedItems.length === 0) {
            alert("⚠️ Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
            return;
        }
        setIsOrderOpen(true);
    };

    return (
        <div className='cart'>
            <aside><img className='cart_img' src={qc1} alt=""/></aside>

            <section className="cart-content">
                <div className="cart-header">
                    <input 
                        type="checkbox" 
                        className="checkbox" 
                        checked={allSelected} 
                        onChange={(e) => handleSelectAll(e.target.checked)} 
                    />
                    <label>Chọn tất cả</label>
                </div>

                <div className="cart-items">
                    {shops.map((shop, shopIndex) => {
                        const isShopSelected = shop.items.every(i => i.selected);
                        return (
                            <div className="shop-group" key={shopIndex} >
                                {/* Header của Shop */}
                                <div className="shopName" >
                                    <input 
                                        type="checkbox" 
                                        className="checkbox" 
                                        checked={isShopSelected} 
                                        onChange={(e) => handleToggleShop(shopIndex, e.target.checked)}
                                    />
                                    <h4>{shop.shopName}</h4>
                                </div>

                                {/* Danh sách sản phẩm của Shop */}
                                {shop.items.map((item) => (
                                    <div className="shopItems" key={item.id} >
                                        <div className="shop-items-left">
                                            <input 
                                                className="checkbox" 
                                                type="checkbox" 
                                                checked={item.selected} 
                                                onChange={() => handleToggleItem(shopIndex, item.id)} 
                                            />
                                            <img className="shop-items-img" src={item.image} alt="book"/>
                                            <div className="items-details">
                                                <h4 className="item-name">{truncateTitle(item.title, 40)}</h4>
                                                <div className="quantity-selector">
                                                    <button className="sub" onClick={() => handleUpdateQuantity(shopIndex, item.id, -1)}>-</button>
                                                    <input 
                                                        className="value-quantity" 
                                                        type="text" 
                                                        value={item.quantity} 
                                                        onChange={(e) => handleInputChange(shopIndex, item.id, e.target.value)}
                                                    />
                                                    <button className="add" onClick={() => handleUpdateQuantity(shopIndex, item.id, 1)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shop-items-right">
                                            <p className="price">{formatCurrency(item.price)}đ</p>
                                            <img className="trash" src={trash} alt="delete" onClick={() => handleDelete(shopIndex, item.id)}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>

                <div className="cart-footer">
                    <div className="shipping">Phí vận chuyển: 15,000đ</div>
                    <div className="total">
                        <span>Tổng thanh toán: {formatCurrency(totalAmount)}đ</span>
                    </div>
                    <button 
                        className="order-btn" 
                        onClick={handleOpenOrder}
                    >
                        Đặt hàng
                    </button>
                </div>

                <p className="note">* Bấm "Đặt hàng" ngay để có cơ hội nhận Voucher Vận chuyển 0đ cùng nhiều Voucher hấp dẫn khác!</p>
            </section>

            <aside><img className='cart_img' src={qc2} alt=""/></aside>

            {isOrderOpen && (
                <Order 
                    selectedItems={selectedItems}
                    subtotal={subtotal}  
                    shippingFee={shippingFee}
                    onClose={() => setIsOrderOpen(false)} 
                />
            )}
        </div>
    );
}