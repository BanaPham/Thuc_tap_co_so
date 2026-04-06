import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/public/Login.css';
import bg from './assets/background-login.png';
import logo from './assets/sp-logo.png';
import shipping from './assets/shipping.png';
import voucher from './assets/voucher.png';
import payment from './assets/payment.png';

export default function Login() {
    const navigate = useNavigate();
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleRegister = (status) => {
        setIsRegisterOpen(status);
    };

    // Xử lý đăng nhập
    const handleLogin = () => {
        const mockEmail = "anh@gmail.com";
        const mockPassword = "123456";

        if (email === mockEmail && password === mockPassword) {
            navigate('/home'); 
        } else {
            alert("Email hoặc mật khẩu không chính xác!");
        }
    };

    return (
        <div className="container">
            <img className="bg" src={bg} alt="background" />
            
            {/* Logo */}
            <img className="logo-img" src={logo} alt="logo" />
            <div className="logo-text">
                <span className="black">Shop</span><span className="orange">Zone</span>
            </div>

            {/* Text trái */}
            <h1 className="welcome">Chào mừng bạn trở lại!</h1>
            <p className="desc">
                Đăng nhập để khám phá hàng triệu sản phẩm với ưu đãi độc quyền dành riêng cho bạn
            </p>

            {/* Card info */}
            <div className="info-box">
                <div className="info-item">
                    <img className="shipping-img" src={shipping} alt="Free Shipping Icon" />
                    <p><strong>Miễn phí vận chuyển</strong><br /><span>Đơn từ 0đ</span></p>
                </div>
                <div className="info-item">
                    <img className="voucher-img" src={voucher} alt="Voucher Icon" />
                    <p><strong>Voucher hấp dẫn</strong><br /><span>Mỗi ngày</span></p>
                </div>
                <div className="info-item">
                    <img className="payment-img" src={payment} alt="Secure Payment Icon" />
                    <p><strong>Thanh toán an toàn</strong><br /><span>Bảo mật tuyệt đối</span></p>
                </div>
            </div>

            {/* Login form */}
            <div className="login-box">
                <h2>Đăng nhập</h2>
                <p>Chào mừng bạn đến với <span className="orange">ShopZone</span></p>
                <label>Email hoặc số điện thoại:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anh@gmail.com"
                />
                <label>Mật khẩu:</label>
                <input 
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="123456"
                />
                <a href="#" className="forgot">Quên mật khẩu?</a>
                <button className='login_btn' onClick={handleLogin}>Đăng nhập</button>
                <p className="register">
                    Chưa có tài khoản? <span onClick={() => toggleRegister(true)} style={{cursor: 'pointer'}}>Đăng ký</span>
                </p>
            </div>

            {/* Register form */}
            {isRegisterOpen && (
                <div id="register-overlay" className="overlay">
                    <div className="register-card">
                        <span className="close-btn" onClick={() => toggleRegister(false)}>&times;</span>
                        <h2>Đăng ký</h2>
                        <p className="sub-title">Tạo tài khoản mới</p>
                        
                        <div className="form-group">
                            <input type="text" placeholder="Họ và tên" />
                            <input type="email" placeholder="Email" />
                            <input type="text" placeholder="Số điện thoại" />
                            <input type="password" placeholder="Mật khẩu" />
                            <input type="password" placeholder="Xác nhận mật khẩu" />
                            <input type="date" placeholder="Ngày sinh" title="Birthday" />
                            <select name="gender" defaultValue="">
                                <option value="" disabled>Giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>

                        <button className="btn-register">Đăng ký</button>
                        <p className="footer-text">
                            Đã có tài khoản? <span className="orange-link" onClick={() => toggleRegister(false)}>Đăng nhập</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="footer">
                © 2026 ShopZone.vn - Sàn thương mại điện tử hàng đầu
            </div>
        </div>
    );
}