import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách bảo mật - X-Club',
  description: 'Chính sách bảo mật và quyền riêng tư của X-Club',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-base-100 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Chính sách bảo mật</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-base-content/70 mb-6">
              <strong>Cập nhật lần cuối:</strong> {new Date().toLocaleDateString('vi-VN')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Giới thiệu</h2>
              <p className="mb-4">
                X-Club ("chúng tôi", "của chúng tôi", hoặc "chúng tôi") cam kết bảo vệ quyền riêng tư của bạn. 
                Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin 
                của bạn khi bạn sử dụng ứng dụng X-Club.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Thông tin chúng tôi thu thập</h2>
              
              <h3 className="text-xl font-medium mb-3">2.1 Thông tin cá nhân</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Tên và họ</li>
                <li>Địa chỉ email</li>
                <li>Ảnh đại diện (từ Google/Facebook OAuth)</li>
                <li>Thông tin hồ sơ thể thao (nếu được kết nối)</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">2.2 Thông tin sử dụng</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Dữ liệu hoạt động thể thao (thời gian, khoảng cách, tốc độ)</li>
                <li>Thông tin tham gia câu lạc bộ và sự kiện</li>
                <li>Dữ liệu thử thách và thành tích</li>
                <li>Thông tin tương tác với ứng dụng</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Cách chúng tôi sử dụng thông tin</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Cung cấp và cải thiện dịch vụ của chúng tôi</li>
                <li>Quản lý tài khoản và xác thực người dùng</li>
                <li>Hiển thị bảng xếp hạng và thống kê</li>
                <li>Gửi thông báo về sự kiện và thử thách</li>
                <li>Hỗ trợ khách hàng</li>
                <li>Tuân thủ các nghĩa vụ pháp lý</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Chia sẻ thông tin</h2>
              <p className="mb-4">
                Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba, 
                ngoại trừ trong các trường hợp sau:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Với sự đồng ý rõ ràng của bạn</li>
                <li>Để tuân thủ nghĩa vụ pháp lý</li>
                <li>Với các nhà cung cấp dịch vụ đáng tin cậy (như Google OAuth)</li>
                <li>Để bảo vệ quyền và tài sản của chúng tôi</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Bảo mật dữ liệu</h2>
              <p className="mb-4">
                Chúng tôi sử dụng các biện pháp bảo mật phù hợp để bảo vệ thông tin cá nhân của bạn 
                khỏi việc truy cập, sử dụng hoặc tiết lộ trái phép. Tuy nhiên, không có phương pháp 
                truyền tải qua internet hoặc lưu trữ điện tử nào là 100% an toàn.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Quyền của bạn</h2>
              <p className="mb-4">Bạn có quyền:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Truy cập và cập nhật thông tin cá nhân</li>
                <li>Xóa tài khoản và dữ liệu</li>
                <li>Rút lại sự đồng ý</li>
                <li>Xuất dữ liệu của bạn</li>
                <li>Khiếu nại với cơ quan có thẩm quyền</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Cookies và công nghệ theo dõi</h2>
              <p className="mb-4">
                Chúng tôi sử dụng cookies và công nghệ tương tự để cải thiện trải nghiệm người dùng, 
                phân tích cách sử dụng ứng dụng và cung cấp nội dung được cá nhân hóa.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Thay đổi chính sách</h2>
              <p className="mb-4">
                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Chúng tôi sẽ thông báo 
                về bất kỳ thay đổi nào bằng cách đăng chính sách mới trên trang này và cập nhật ngày 
                "Cập nhật lần cuối".
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Liên hệ</h2>
              <p className="mb-4">
                Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi:
              </p>
              <div className="bg-base-200 p-4 rounded-lg">
                <p><strong>Email:</strong> privacy@x-club.com</p>
                <p><strong>Địa chỉ:</strong> X-Club Privacy Team</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
