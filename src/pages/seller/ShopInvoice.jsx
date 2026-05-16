import React, { useMemo, useState } from "react";
import "../../styles/seller/ShopInvoice.css";
import productImg from '../public/assets/muado.jpg';

export default function ShopInvoice() {
  // Data demo 
  const [invoices] = useState([
    {
      id: 1,
      invoiceCode: "HD001",
      customerName: "Nguyễn Đăng A",
      customerPhone: "0912345678",
      bookName: "Princess",
      price: "200,000",
      image: productImg,
      orderDate: "07/11/2025",
      receiveDate: "20/11/2025",
    },
    {
      id: 2,
      invoiceCode: "HD002",
      customerName: "Nguyễn Đăng B",
      customerPhone: "0912345678",
      bookName: "Lược sử loài người",
      price: "95,000",
      image: productImg,
      orderDate: "07/11/2025",
      receiveDate: "20/11/2025",
    },
    {
      id: 3,
      invoiceCode: "HD003",
      customerName: "Nguyễn Đăng C",
      customerPhone: "0912345678",
      bookName: "Chí Phèo",
      price: "50,000",
      image: productImg,
      orderDate: "07/11/2025",
      receiveDate: "20/11/2025",
    },
    {
      id: 4,
      invoiceCode: "HD004",
      customerName: "Nguyễn Đăng D",
      customerPhone: "0912345678",
      bookName: "Chí Phèo",
      price: "50,000",
      image: productImg,
      orderDate: "07/11/2025",
      receiveDate: "20/11/2025",
    },
    {
      id: 5,
      invoiceCode: "HD005",
      customerName: "Nguyễn Đăng E",
      customerPhone: "0912345678",
      bookName: "Chí Phèo",
      price: "50,000",
      image: productImg,
      orderDate: "07/11/2025",
      receiveDate: "20/11/2025",
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeModal = () => {
    setSelectedInvoice(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const renderStatusText = (status) => {
    if (status === "chua-tra") return "Chưa trả";
    if (status === "dung-han") return "Trả đúng hạn";
    if (status === "tra-muon") return "Trả muộn";
    return "";
  };

  // Logic tìm kiếm
  const filteredInvoices = useMemo(() => {
    if (!searchKeyword.trim()) return invoices;

    return invoices.filter((inv) => {
      const keyword = searchKeyword.toLowerCase();

      return (
        inv.invoiceCode.toLowerCase().includes(keyword) ||
        inv.customerName.toLowerCase().includes(keyword) ||
        inv.customerPhone.toLowerCase().includes(keyword) ||
        inv.bookName.toLowerCase().includes(keyword) ||
        inv.price.toLowerCase().includes(keyword) ||
        inv.orderDate.toLowerCase().includes(keyword) ||
        inv.receiveDate.toLowerCase().includes(keyword)
      );
    });
  }, [searchKeyword, invoices]);

  const handleSearch = () => {
    setSearchKeyword(searchText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="main-content-admin">
        <div className="invoice-container">
            <div className="invoice-header">
              <h2 className="invoice-title">Hóa Đơn</h2>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <i
                  className="bx bx-search"
                  onClick={handleSearch}
                ></i>
              </div>
            </div>

            <div className="invoice-table-wrapper">
              <table className="invoice-table">
                  <thead>
                      <tr>
                      <th>Mã hóa đơn</th>
                      <th>Tên khách hàng</th>
                      <th>Số điện thoại</th>
                      <th>Tên sản phẩm</th>
                      <th>Hình ảnh</th>
                      <th>Thành tiền</th>
                      <th>Ngày đặt</th>
                      <th>Ngày nhận</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredInvoices.map((inv, index) => (
                      <tr
                          key={inv.id}
                          data-status={inv.status}
                          onClick={() => openModal(inv)}
                          style={{ cursor: "pointer" }}
                      >
                          <td>{inv.invoiceCode}</td>
                          <td>{inv.customerName}</td>
                          <td>{inv.customerPhone}</td>
                          <td>{inv.bookName}</td>
                          <td>
                          <img src={inv.image} alt="logo" />
                          </td>
                          <td>{inv.price}</td>
                          <td>{inv.orderDate}</td>
                          <td>{inv.receiveDate}</td>
                      </tr>
                      ))}
                  </tbody>
              </table>
            </div>
      </div>
    </div>
  );
}
