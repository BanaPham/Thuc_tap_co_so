import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/public/Account.css"
import avt from './assets/avt-shop.jpg';

export default function Account() {
    const { active_tab } = useParams();
    const navigate = useNavigate(); 
    const activeTab = active_tab || "profile";

    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [reviewTarget, setReviewTarget] = useState(null);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 
    const [isEditing, setIsEditing] = useState(false);

    const [userData, setUserData] = useState({
        username: "nguyenvana",
        fullName: "Nguyễn Văn A",
        email: "abc@gmail.com",
        phone: "0987654321",
        address: "Số 123 Đường A",
        password: "123456",
        birthday: "2004-05-15", 
        gender: "Nữ",
        avatar: avt
    });

    const [orderedHistory, setOrderedHistory] = useState([
        { key: 1, status: "Đã giao", name: "Sản phẩm 1", quantity: "1", price: "$30.00", date: "7/11/2025", review: "Sản phẩm tốt", rating: 5, reviewDate: "08/11/2025" },
        { key: 2, status: "Đang giao", name: "Sản phẩm 2", quantity: "2", price: "$30.00", date: "10/11/2025", review: "", rating: 0, reviewDate: ""},
        { key: 3, status: "Đã giao", name: "Sản phẩm 1", quantity: "1", price: "$30.00", date: "7/11/2025", review: "", rating: 0, reviewDate: "" },
        { key: 4, status: "Đang giao", name: "Sản phẩm 2", quantity: "3", price: "$30.00", date: "10/11/2025", review: "", rating: 0, reviewDate: ""},
        { key: 5, status: "Đang giao", name: "Sản phẩm 3", quantity: "2", price: "$30.00", date: "01/10/2025", review: "", rating: 0, reviewDate: ""},
    ]);

    const handleTabChange = (tabName) => {
        navigate(`/account/${tabName}`); 
        setIsEditing(false);
    };

    // Thay đổi thông tin
    const handleProfileButtonClick = () => {
        if (!isEditing) {
            setIsEditing(true);
        } else {
            const requiredFields = ["email", "phone", "address", "password"];
            const isAnyFieldEmpty = requiredFields.some(field => userData[field].trim() === "");

            if (isAnyFieldEmpty) {
                alert("Vui lòng điền đầy đủ thông tin!");
                return; 
            }

            const confirmChange = window.confirm("Bạn có chắc chắn với những thay đổi trên?");
            if (confirmChange) {
                alert("Thay đổi thành công!");
                setIsEditing(false);
            }
        }
    };

    // Cập nhật dữ liệu
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleConfirmReceived = (e, key) => {
        e.stopPropagation(); 
        const updatedHistory = orderedHistory.map(item => {
            if (item.key === key) {
                return { ...item, status: "Đã giao" };
            }
            return item;
        });
        setOrderedHistory(updatedHistory);
        alert("Cập nhật trạng thái thành công!");
    };

    const showDetail = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedItem(null);
    };

    const openReviewModal = (e, item) => {
        e.stopPropagation(); 
        setReviewTarget(item);
        setIsReviewModalVisible(true);
    };

    // Gửi đánh giá
    const submitReview = () => {
        if (!reviewForm.comment.trim()) {
            alert("Vui lòng nhập lời nhận xét!");
            return;
        }

        const today = new Date().toLocaleDateString("vi-VN");
        
        const updatedHistory = orderedHistory.map(item => {
            if (item.key === reviewTarget.key && item.name === reviewTarget.name) {
                return { 
                    ...item, 
                    review: reviewForm.comment, 
                    rating: reviewForm.rating, 
                    reviewDate: today 
                };
            }
            return item;
        });

        setOrderedHistory(updatedHistory);
        alert("Đánh giá thành công!");
        setIsReviewModalVisible(false);
        setReviewForm({ rating: 5, comment: "" });
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "Đã giao":
                return { dot: "#218838", text: "#218838" }; 
            case "Đang giao":
                return { dot: "#f1c40f", text: "#b8860b" }; 
            default:
                return { dot: "#aaa", text: "#333" };
        }
    };

    return (
        <>
        <div className="account-container">
            <div className="account-sidebar">
                <div className="user-profile-brief">
                    <img src={avt} alt="Avatar" />
                    <p>{userData.username}</p>
                </div>

                <button 
                    className={`nav-item ${activeTab === "profile" ? "active" : ""}`} 
                    onClick={() => handleTabChange("profile")}
                >
                    <i className="bx bx-user"></i>
                    <p>Thông tin cá nhân</p>
                </button>

                <button 
                    className={`nav-item ${activeTab === "history" ? "active" : ""}`} 
                    onClick={() => handleTabChange("history")}
                >
                    <i className="bx bx-history"></i>
                    <p>Lịch sử đặt hàng</p>
                </button>
            </div>

            <div className="account-main-content">
                <div className="tab-content-wrapper">
                    {/* PROFILE SECTION */}
                    <div className="profile-details" style={{ display: activeTab === "profile" ? "flex" : "none" }}>
                        <div className="info-row">
                            <p className="info-label">Tên đăng nhập</p>
                            <p className="info-value">{userData.username}</p>
                        </div>
                        <div className="info-row">
                            <p className="info-label">Họ và tên</p>
                            <p className="info-value">{userData.fullName}</p>
                        </div>
                        <div className="info-row">
                            <p className="info-label">Email</p>
                            <input 
                                name="email"
                                className={`info-value ${!isEditing ? "readonly-input" : "editing-input"}`}
                                value={userData.email}
                                readOnly={!isEditing}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="info-row">
                            <p className="info-label">Số điện thoại</p>
                            <input 
                                name="phone"
                                className={`info-value ${!isEditing ? "readonly-input" : "editing-input"}`}
                                value={userData.phone}
                                readOnly={!isEditing}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="info-row">
                            <p className="info-label">Địa chỉ hiện tại</p>
                            <input 
                                name="address"
                                className={`info-value ${!isEditing ? "readonly-input" : "editing-input"}`}
                                value={userData.address}
                                readOnly={!isEditing}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="info-row">
                            <p className="info-label">Ngày sinh</p>
                            <p className="info-value">{userData.birthday}</p>
                        </div>
                        <div className="info-row">
                            <p className="info-label">Giới tính</p>
                            <p className="info-value">
                                <label><input type="radio" name="gender" /> Nam</label>
                                <label style={{ marginLeft: "50px" }}><input type="radio" name="gender" defaultChecked /> Nữ</label>
                            </p>
                        </div>
                        <div className="info-row">
                            <p className="info-label">Mật khẩu</p>
                            <input 
                                name="password"
                                className={`info-value ${!isEditing ? "readonly-input" : "editing-input"}`}
                                type={isEditing ? "text" : "password"}
                                value={userData.password}
                                readOnly={!isEditing}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button className="changeProfile" onClick={handleProfileButtonClick}>
                            {isEditing ? "Lưu thay đổi" : "Thay đổi"}
                        </button>
                    </div>

                    {/* HISTORY SECTION */}
                    <div className="history-list" style={{ display: activeTab === "history" ? "flex" : "none" }}>
                        {orderedHistory.map((item) => {
                            const styles = getStatusStyles(item.status);
                            return (
                                <div className="history-card" key={item.key} onClick={() => showDetail(item)}>
                                    <div className="item-ordered-info">
                                        <img className="item-ordered-img" src="" alt="item" />
                                        <div className="text-details">
                                            <h4>{item.name}</h4>
                                            <p>SL x {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="status-info">
                                        <p className="item-price">{item.price}</p>
                                        <div className="badge">
                                            <span className="badge-text" style={{ color: styles.text }}>{item.status}</span>
                                        </div>
                                        {item.status === "Đang giao" ? (
                                            <button 
                                                className="confirm-btn" 
                                                onClick={(e) => handleConfirmReceived(e, item.key)}
                                            >
                                                Đã nhận được hàng
                                            </button>
                                        ) : (
                                            item.status === "Đã giao" && !item.review && (
                                                <button 
                                                    className="review-btn" 
                                                    onClick={(e) => openReviewModal(e, item)}
                                                >
                                                    Viết đánh giá
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>  

        {/* MODAL CHI TIẾT */}
        <div 
            className="modal-overlay" 
            style={{ display: isModalVisible ? "flex" : "none" }}
            onClick={(e) => e.target.className === 'modal-overlay' && closeModal()}
        >
            <div className="modal-box">
                <span className="modal-close-btn" onClick={closeModal}>&times;</span>
                <h2 className="modal-title">Chi tiết đơn hàng</h2>
                {selectedItem && (
                    <div className="modal-grid">
                        <div className="modal-col">
                            <div className="data-field field-centered">
                                <img className="item-ordered-img" src={selectedItem.image} alt="item" />
                                <p>Tên sản phẩm: <strong>{selectedItem.name}</strong></p>
                            </div>
                            <div className="data-field">Số lượng: {selectedItem.quantity}</div>
                            <div className="data-field">Ngày đặt: {selectedItem.date}</div>
                        </div>
                        <div className="modal-col">
                            <div className="data-field">Trạng thái: <strong>{selectedItem.status}</strong></div>
                            <div className="data-field">Giá tiền: {selectedItem.price}</div>
                            <div className="data-field review-field">
                                Đánh giá: {selectedItem.review || "Chưa có"} 
                                {selectedItem.rating > 0 && ` (${selectedItem.rating} ★)`}
                            </div>
                            {selectedItem.reviewDate && <div className="data-field">Ngày đánh giá: {selectedItem.reviewDate}</div>}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* MODAL VIẾT ĐÁNH GIÁ */}
        {isReviewModalVisible && (
            <div className="modal-overlay">
                <div className="modal-box review-modal">
                    <h2 className="modal-title">Viết đánh giá ngay</h2>
                    <div className="rating-input">
                        <p>Chọn mức độ hài lòng:</p>
                        <select 
                            value={reviewForm.rating} 
                            onChange={(e) => setReviewForm({...reviewForm, rating: e.target.value})}
                        >
                            <option value="5">5 ★ - Rất tốt</option>
                            <option value="4">4 ★ - Tốt</option>
                            <option value="3">3 ★ - Bình thường</option>
                            <option value="2">2 ★ - Tệ</option>
                            <option value="1">1 ★ - Rất tệ</option>
                        </select>
                    </div>
                    <textarea 
                        className="review-textarea"
                        placeholder="Nhập lời nhận xét của bạn về sản phẩm..."
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                    ></textarea>
                    <div className="modal-actions">
                        <button className="cancel-btn" onClick={() => setIsReviewModalVisible(false)}>Hủy</button>
                        <button className="submit-btn" onClick={submitReview}>Gửi đánh giá</button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}