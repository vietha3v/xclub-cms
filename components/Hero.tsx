export default function Hero() {
  return (
    <section className="xclub-hero hero min-h-[500px] rounded-box mb-12 xclub-fade-in">
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl">
          <div className="mb-6">
            <span className="text-6xl mb-4 block">🏃‍♂️</span>
            <h1 className="mb-6 text-6xl font-bold">X-Club – Chạy và kết nối</h1>
          </div>
          <p className="mb-8 text-xl leading-relaxed">
            Cùng nhau theo dõi hành trình chạy bộ, gắn kết bạn bè, tham gia CLB, giải chạy ảo và sự kiện gây quỹ ý nghĩa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg">
              🚀 Tham gia ngay
            </button>
            <button className="btn btn-outline btn-lg">
              🎯 Khám phá thử thách
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
