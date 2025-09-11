'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import dlv from 'dlv';

export default function HomePage() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: '🏃‍♂️',
      title: 'Câu lạc bộ chạy bộ',
      description: 'Khám phá và tham gia các câu lạc bộ chạy bộ hàng đầu Việt Nam',
      link: '/clubs',
      color: 'from-primary/20 to-primary/10',
      delay: 'delay-100'
    },
    {
      icon: '🎯',
      title: 'Sự kiện & Giải chạy',
      description: 'Tham gia các sự kiện chạy bộ và giải đấu hấp dẫn',
      link: '/events',
      color: 'from-secondary/20 to-secondary/10',
      delay: 'delay-200'
    },
    {
      icon: '⚡',
      title: 'Hoạt động chạy bộ',
      description: 'Theo dõi và ghi nhận các hoạt động chạy bộ hàng ngày',
      link: '/activities',
      color: 'from-accent/20 to-accent/10',
      delay: 'delay-300'
    },
    {
      icon: '🏆',
      title: 'Thử thách & Thành tích',
      description: 'Tham gia các thử thách và xem thành tích của bạn',
      link: '/challenges',
      color: 'from-success/20 to-success/10',
      delay: 'delay-400'
    },
  ];

  const stats = [
    { number: '50+', label: 'Câu lạc bộ', icon: '👥' },
    { number: '1000+', label: 'Thành viên', icon: '🏃‍♀️' },
    { number: '200+', label: 'Sự kiện', icon: '🎯' },
    { number: '5000+', label: 'Km đã chạy', icon: '📏' },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-base-200 via-base-100 to-base-200">
        {/* Hero Section với Animation */}
        <section className="relative py-20 px-4 min-h-screen flex items-center justify-center">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-4000"></div>
          </div>

          <div className="container mx-auto text-center relative z-10">
            {/* Main Title với Animation */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient_3s_ease_infinite]">
                X-Club
              </h1>
            </div>

            {/* Slogan với Animation */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-2xl md:text-3xl font-semibold text-base-content mb-8 animate-bounce">
                🏃‍♂️ Chạy và kết nối 🏃‍♀️
              </p>
            </div>

            {/* Description với Animation */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                Cộng đồng chạy bộ hàng đầu Việt Nam - Nơi kết nối những người yêu thích chạy bộ, 
                chia sẻ kinh nghiệm và cùng nhau phát triển đam mê
              </p>
            </div>

            {/* CTA Buttons với Animation */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {session ? (
                <Link href="/dashboard" className="btn btn-primary btn-lg text-lg px-8 hover:scale-105 transition-transform duration-300 animate-pulse">
                  🚀 Vào Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="btn btn-primary btn-lg text-lg px-8 hover:scale-105 transition-transform duration-300 animate-pulse">
                    🏃‍♂️ Bắt đầu chạy
                  </Link>
                  <Link href="/register" className="btn btn-outline btn-lg text-lg px-8 hover:scale-105 transition-transform duration-300">
                    ✨ Tham gia ngay
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-base-100/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {dlv({ stats }, 'stats', []).map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transition-all duration-700 hover:scale-110 cursor-pointer`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-2 animate-bounce delay-1000">{stat.icon}</div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-base-content/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-base-content mb-4">
                Khám phá X-Club
              </h2>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Trải nghiệm đầy đủ các tính năng dành cho cộng đồng chạy bộ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dlv({ features }, 'features', []).map((feature, index) => (
                <Link 
                  key={index}
                  href={feature.link}
                  className={`group transition-all duration-500 hover:scale-105 hover:-translate-y-2`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`card bg-gradient-to-br ${feature.color} border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full`}>
                    <div className="card-body text-center">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="card-title text-xl justify-center mb-3 text-base-content">
                        {feature.title}
                      </h3>
                      <p className="text-base-content/80 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="card-actions justify-center mt-4">
                        <div className="btn btn-sm btn-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          Khám phá →
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-base-content mb-6">
                🌟 Cộng đồng chạy bộ lớn nhất Việt Nam
              </h2>
              <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
                Tham gia cùng hàng nghìn người yêu thích chạy bộ trên khắp cả nước. 
                Chia sẻ kinh nghiệm, tham gia thử thách và cùng nhau chinh phục những mục tiêu mới.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/clubs" className="btn btn-primary btn-lg hover:scale-105 transition-transform duration-300">
                  🏃‍♂️ Tìm CLB gần bạn
                </Link>
                <Link href="/events" className="btn btn-secondary btn-lg hover:scale-105 transition-transform duration-300">
                  🎯 Xem sự kiện
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-16 px-4 bg-base-200">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-base-content mb-6">
              Sẵn sàng bắt đầu hành trình chạy bộ?
            </h2>
            <p className="text-lg text-base-content/70 mb-8">
              Tham gia X-Club ngay hôm nay và trở thành một phần của cộng đồng chạy bộ sôi động nhất Việt Nam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!session && (
                <>
                  <Link href="/register" className="btn btn-primary btn-lg text-lg px-8 hover:scale-105 transition-transform duration-300 animate-pulse">
                    🚀 Đăng ký miễn phí
                  </Link>
                  <Link href="/login" className="btn btn-outline btn-lg text-lg px-8 hover:scale-105 transition-transform duration-300">
                    🔑 Đăng nhập
                  </Link>
                </>
              )}
              {session && (
                <Link href="/dashboard" className="btn btn-primary btn-lg text-lg px-8 hover:scale-105 transition-transform duration-300">
                  🎯 Vào Dashboard
                </Link>
              )}
            </div>
          </div>
        </section>
    </div>
  );
}
