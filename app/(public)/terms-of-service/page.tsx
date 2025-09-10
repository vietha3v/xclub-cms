import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng - X-Club',
  description: 'Điều khoản và điều kiện sử dụng dịch vụ X-Club',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-base-100 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Điều khoản sử dụng</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-base-content/70 mb-6">
              <strong>Cập nhật lần cuối:</strong> {new Date().toLocaleDateString('vi-VN')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Chấp nhận điều khoản</h2>
              <p className="mb-4">
                Bằng cách truy cập và sử dụng ứng dụng X-Club, bạn đồng ý tuân thủ và bị ràng buộc bởi 
                các điều khoản và điều kiện sử dụng này. Nếu bạn không đồng ý với bất kỳ phần nào của 
                các điều khoản này, bạn không được phép sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Mô tả dịch vụ</h2>
              <p className="mb-4">
                X-Club là một nền tảng thể thao xã hội cho phép người dùng:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Tham gia và quản lý câu lạc bộ thể thao</li>
                <li>Tạo và tham gia các thử thách thể thao</li>
                <li>Theo dõi hoạt động thể thao cá nhân</li>
                <li>Tham gia các sự kiện và cuộc thi</li>
                <li>Tương tác với cộng đồng thể thao</li>
                <li>Kết nối với các ứng dụng thể thao khác (như Strava)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Đăng ký tài khoản</h2>
              <p className="mb-4">
                Để sử dụng một số tính năng của dịch vụ, bạn cần tạo tài khoản. Bạn đồng ý:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Cung cấp thông tin chính xác, cập nhật và đầy đủ</li>
                <li>Duy trì và cập nhật thông tin tài khoản</li>
                <li>Bảo mật mật khẩu và tài khoản của bạn</li>
                <li>Chịu trách nhiệm cho tất cả hoạt động dưới tài khoản của bạn</li>
                <li>Thông báo ngay lập tức về việc sử dụng trái phép tài khoản</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Quy tắc sử dụng</h2>
              <p className="mb-4">Bạn đồng ý không:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Sử dụng dịch vụ cho mục đích bất hợp pháp hoặc trái phép</li>
                <li>Đăng tải nội dung xúc phạm, đe dọa, hoặc không phù hợp</li>
                <li>Vi phạm quyền sở hữu trí tuệ của người khác</li>
                <li>Spam hoặc gửi thông tin không mong muốn</li>
                <li>Cố gắng hack hoặc phá hoại hệ thống</li>
                <li>Tạo nhiều tài khoản để gian lận</li>
                <li>Chia sẻ thông tin sai lệch về hoạt động thể thao</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Nội dung người dùng</h2>
              <p className="mb-4">
                Bạn giữ quyền sở hữu nội dung bạn đăng tải lên X-Club. Tuy nhiên, bằng cách đăng tải 
                nội dung, bạn cấp cho chúng tôi giấy phép không độc quyền, có thể chuyển nhượng để sử dụng, 
                sao chép, phân phối và hiển thị nội dung đó trong khuôn khổ dịch vụ.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Quyền sở hữu trí tuệ</h2>
              <p className="mb-4">
                Dịch vụ và nội dung gốc của nó, tính năng và chức năng là và sẽ là tài sản độc quyền của 
                X-Club và được bảo vệ bởi luật bản quyền, nhãn hiệu và các luật khác về sở hữu trí tuệ.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Từ chối trách nhiệm</h2>
              <p className="mb-4">
                Dịch vụ được cung cấp "như hiện tại" và "như có sẵn". Chúng tôi không đảm bảo rằng dịch vụ 
                sẽ không bị gián đoạn, không có lỗi hoặc hoàn toàn an toàn. Bạn sử dụng dịch vụ với rủi ro 
                của chính mình.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Giới hạn trách nhiệm</h2>
              <p className="mb-4">
                Trong phạm vi tối đa được pháp luật cho phép, X-Club sẽ không chịu trách nhiệm cho bất kỳ 
                thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả nào phát sinh từ việc sử dụng 
                hoặc không thể sử dụng dịch vụ.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Chấm dứt</h2>
              <p className="mb-4">
                Chúng tôi có thể chấm dứt hoặc tạm ngưng tài khoản của bạn ngay lập tức, mà không cần thông báo 
                trước, vì bất kỳ lý do gì, bao gồm vi phạm các điều khoản này.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Luật áp dụng</h2>
              <p className="mb-4">
                Các điều khoản này sẽ được điều chỉnh và giải thích theo luật pháp Việt Nam, mà không cần 
                xem xét các nguyên tắc xung đột pháp luật.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Thay đổi điều khoản</h2>
              <p className="mb-4">
                Chúng tôi có quyền sửa đổi hoặc thay thế các điều khoản này bất cứ lúc nào. Nếu sửa đổi là 
                quan trọng, chúng tôi sẽ cố gắng cung cấp thông báo trước ít nhất 30 ngày trước khi điều khoản 
                mới có hiệu lực.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Liên hệ</h2>
              <p className="mb-4">
                Nếu bạn có bất kỳ câu hỏi nào về các điều khoản sử dụng này, vui lòng liên hệ với chúng tôi:
              </p>
              <div className="bg-base-200 p-4 rounded-lg">
                <p><strong>Email:</strong> legal@x-club.com</p>
                <p><strong>Địa chỉ:</strong> X-Club Legal Team</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
