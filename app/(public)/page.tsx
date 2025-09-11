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
        <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-4 min-h-screen flex items-center justify-center">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 sm:-top-32 sm:-right-32 md:-top-40 md:-right-40 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 sm:-bottom-32 sm:-left-32 md:-bottom-40 md:-left-40 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-4000"></div>
          </div>

          <div className="container mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8">
            {/* Main Title với Animation */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient_3s_ease_infinite] leading-tight">
                X-Club
              </h1>
            </div>

            {/* Slogan với Animation */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-base-content mb-6 sm:mb-8 animate-bounce">
                🏃‍♂️ Chạy và kết nối 🏃‍♀️
              </p>
            </div>

            {/* Description với Animation */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-base-content/70 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed">
                Cộng đồng chạy bộ hàng đầu Việt Nam - Nơi kết nối những người yêu thích chạy bộ, 
                chia sẻ kinh nghiệm và cùng nhau phát triển đam mê
              </p>
            </div>

            {/* CTA Buttons với Animation */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {session ? (
                <Link href="/dashboard" className="btn btn-primary btn-lg text-lg px-6 sm:px-8 hover:scale-105 transition-all duration-300 animate-pulse hover:animate-bounce group relative overflow-hidden">
                  <span className="relative z-10">🚀 Vào Dashboard</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="btn btn-primary btn-lg text-lg px-6 sm:px-8 hover:scale-105 transition-all duration-300 animate-pulse hover:animate-bounce group relative overflow-hidden">
                    <span className="relative z-10">🏃‍♂️ Bắt đầu chạy</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <Link href="/register" className="btn btn-outline btn-lg text-lg px-6 sm:px-8 hover:scale-105 transition-all duration-300 group relative overflow-hidden hover:shadow-lg hover:shadow-primary/25">
                    <span className="relative z-10">✨ Tham gia ngay</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
        <section className="py-12 sm:py-16 px-4 bg-base-100/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {dlv({ stats }, 'stats', []).map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transition-all duration-700 hover:scale-110 cursor-pointer group relative overflow-hidden rounded-xl p-4 sm:p-6 bg-gradient-to-br from-base-100 to-base-200 hover:from-primary/5 hover:to-secondary/5 border border-base-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl md:text-4xl mb-2 group-hover:animate-bounce group-hover:scale-110 transition-all duration-300">{stat.icon}</div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors duration-300">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-base-content/70 group-hover:text-base-content transition-colors duration-300">{stat.label}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4 animate-fade-in">
                Khám phá X-Club
              </h2>
              <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto animate-fade-in-up">
                Trải nghiệm đầy đủ các tính năng dành cho cộng đồng chạy bộ
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {dlv({ features }, 'features', []).map((feature, index) => (
                <Link 
                  key={index}
                  href={feature.link}
                  className={`group transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  <div className={`card bg-gradient-to-br ${feature.color} border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full group-hover:shadow-primary/20 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="card-body text-center relative z-10">
                      <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="card-title text-lg sm:text-xl justify-center mb-3 text-base-content group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-base-content/80 text-sm leading-relaxed group-hover:text-base-content transition-colors duration-300">
                        {feature.description}
                      </p>
                      <div className="card-actions justify-center mt-4">
                        <div className="btn btn-sm btn-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:scale-105 hover:animate-pulse">
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
        <section className="py-16 sm:py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden">
          {/* Background Animation Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
            <div className="absolute top-20 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-10 right-1/4 w-14 h-14 bg-primary/10 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-6 animate-fade-in-up">
                🌟 Cộng đồng chạy bộ lớn nhất Việt Nam
              </h2>
              <p className="text-base sm:text-lg text-base-content/70 mb-8 leading-relaxed animate-fade-in-up animate-delay-200">
                Tham gia cùng hàng nghìn người yêu thích chạy bộ trên khắp cả nước. 
                Chia sẻ kinh nghiệm, tham gia thử thách và cùng nhau chinh phục những mục tiêu mới.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
                <Link href="/clubs" className="btn btn-primary btn-lg hover:scale-105 transition-all duration-300 group relative overflow-hidden hover-float">
                  <span className="relative z-10">🏃‍♂️ Tìm CLB gần bạn</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link href="/events" className="btn btn-secondary btn-lg hover:scale-105 transition-all duration-300 group relative overflow-hidden hover-float">
                  <span className="relative z-10">🎯 Xem sự kiện</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-16 px-4 bg-base-200 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, var(--primary) 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, var(--secondary) 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-6 animate-fade-in-up">
              Sẵn sàng bắt đầu hành trình chạy bộ?
            </h2>
            <p className="text-base sm:text-lg text-base-content/70 mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
              Tham gia X-Club ngay hôm nay và trở thành một phần của cộng đồng chạy bộ sôi động nhất Việt Nam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
              {!session && (
                <>
                  <Link href="/register" className="btn btn-primary btn-lg text-lg px-6 sm:px-8 hover:scale-105 transition-all duration-300 animate-pulse hover-float group relative overflow-hidden">
                    <span className="relative z-10">🚀 Đăng ký miễn phí</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <Link href="/login" className="btn btn-outline btn-lg text-lg px-6 sm:px-8 hover:scale-105 transition-all duration-300 group relative overflow-hidden hover-float">
                    <span className="relative z-10">🔑 Đăng nhập</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </>
              )}
              {session && (
                <Link href="/dashboard" className="btn btn-primary btn-lg text-lg px-6 sm:px-8 hover:scale-105 transition-all duration-300 group relative overflow-hidden hover-float">
                  <span className="relative z-10">🎯 Vào Dashboard</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              )}
            </div>
          </div>
        </section>
    </div>
  );
}
