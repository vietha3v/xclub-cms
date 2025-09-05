export default function CoreValues() {
  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Bộ giá trị cốt lõi</h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          X-Club không chỉ là ứng dụng chạy bộ, mà là nền tảng mang lại giá trị đích thực cho cộng đồng
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sức khỏe cá nhân */}
        <div className="xclub-value-card card text-center p-8 group hover:scale-105 transition-transform duration-300">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-primary">Sức khỏe cá nhân</h3>
          <p className="text-base text-base-content/70 leading-relaxed">
            Theo dõi tiến độ, lưu lại cảm xúc và xây dựng lối sống lành mạnh bền vững
          </p>
        </div>

        {/* Kết nối cộng đồng */}
        <div className="xclub-value-card card text-center p-8 group hover:scale-105 transition-transform duration-300">
          <div className="w-20 h-20 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-secondary">Kết nối cộng đồng</h3>
          <p className="text-base text-base-content/70 leading-relaxed">
            Cùng CLB, bạn bè chinh phục thử thách và tạo ra những kỷ niệm đáng nhớ
          </p>
        </div>

        {/* Lan tỏa ý nghĩa */}
        <div className="xclub-value-card card text-center p-8 group hover:scale-105 transition-transform duration-300">
          <div className="w-20 h-20 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-4 text-accent">Lan tỏa ý nghĩa</h3>
          <p className="text-base text-base-content/70 leading-relaxed">
            Mỗi bước chạy góp phần giúp đỡ trẻ em, giáo dục và người yếu thế trong xã hội
          </p>
        </div>
      </div>
    </section>
  );
}
