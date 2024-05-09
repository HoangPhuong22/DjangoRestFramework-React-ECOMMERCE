import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="bg-dark text-white py-4">
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <h5>Về chúng tôi</h5>
                        <p>Chúng tôi rất cảm ơn khi quý khách dành thời gian tham khảo sản phẩm bên, chúng tôi luôn mong muốn cung cấp cho quý khách sản phẩm cũng như dịch vụ tốt nhất có thể </p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h5>Dịch vụ</h5>
                        <ul className="list-unstyled">
                            <li><a href="#">Phát triển Web</a></li>
                            <li><a href="#">Phát triển Ứng dụng Di động</a></li>
                            <li><a href="#">Thiết kế UI/UX</a></li>
                            <li><a href="#">Dịch vụ SEO</a></li>
                        </ul>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h5>Liên hệ</h5>
                        <ul className="list-unstyled">
                            <li>Email: phoneshop@gmail.com</li>
                            <li>Điện thoại: +123456789</li>
                            <li>Chi nhánh 1: 100 Cầu Giấy, Hà Nội</li>
                            <li>Chi nhánh 2: 200 Đống Đa, Hà Nội</li>
                            <li>Chi nhánh 3: 120 Quận Tân Bình, Thành Phố Hồ Chí Minh</li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center py-3">
                        <span className="text-white">Bản quyền &copy; 2024 ZeroCoder</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
