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
    {
      icon: '💝',
      title: 'Gây quỹ',
      description: 'Tham gia các hoạt động gây quỹ từ thiện thông qua chạy bộ',
      link: '/fundraising',
      color: 'from-warning/20 to-warning/10',
      delay: 'delay-500'
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
        <section className="relative py-4 sm:py-6 md:py-8 lg:py-12 px-3 sm:px-4 md:px-6 min-h-[85vh] sm:min-h-screen flex items-center justify-center">
          {/* Background Elements - Cải thiện responsive */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 -right-16 sm:-top-24 sm:-right-24 md:-top-32 md:-right-32 lg:-top-40 lg:-right-40 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-16 -left-16 sm:-bottom-24 sm:-left-24 md:-bottom-32 md:-left-32 lg:-bottom-40 lg:-left-40 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-4000"></div>
          </div>

          <div className="container mx-auto text-center relative z-10 px-3 sm:px-4 md:px-6 lg:px-8">
            {/* Main Title với Animation - Cải thiện responsive */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient_3s_ease_infinite] leading-tight">
                X-Club
              </h1>
            </div>

            {/* Slogan với Animation - Cải thiện responsive */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-base-content mb-5 sm:mb-6 md:mb-8 lg:mb-10 animate-bounce">
                🏃‍♂️ Chạy và kết nối 🏃‍♀️
              </p>
            </div>

            {/* Description với Animation - Cải thiện responsive */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-base-content/70 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed">
                Cộng đồng chạy bộ hàng đầu Việt Nam - Nơi kết nối những người yêu thích chạy bộ, 
                chia sẻ kinh nghiệm và cùng nhau phát triển đam mê
              </p>
            </div>

            {/* CTA Buttons với Animation - Cải thiện responsive */}
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {session ? (
                <Link href="/dashboard" className="btn btn-primary btn-lg sm:btn-xl text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 hover:scale-105 transition-all duration-300 animate-pulse hover:animate-bounce group relative overflow-hidden shadow-lg hover:shadow-xl">
                  <span className="relative z-10">🚀 Vào Dashboard</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="btn btn-primary btn-lg sm:btn-xl text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 hover:scale-105 transition-all duration-300 animate-pulse hover:animate-bounce group relative overflow-hidden shadow-lg hover:shadow-xl">
                    <span className="relative z-10">🏃‍♂️ Bắt đầu chạy</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <Link href="/register" className="btn btn-outline btn-lg sm:btn-xl text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 hover:scale-105 transition-all duration-300 group relative overflow-hidden hover:shadow-lg hover:shadow-primary/25">
                    <span className="relative z-10">✨ Tham gia ngay</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Scroll Indicator - Cải thiện responsive */}
          <div className={`absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="animate-bounce">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </section>

        {/* Stats Section - Cải thiện responsive */}
        <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 md:px-6 bg-base-100/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {dlv({ stats }, 'stats', []).map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transition-all duration-700 hover:scale-110 cursor-pointer group relative overflow-hidden rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 bg-gradient-to-br from-base-100 to-base-200 hover:from-primary/5 hover:to-secondary/5 border border-base-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative z-10">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 sm:mb-3 group-hover:animate-bounce group-hover:scale-110 transition-all duration-300">{stat.icon}</div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">{stat.number}</div>
                    <div className="text-sm sm:text-base md:text-lg text-base-content/70 group-hover:text-base-content transition-colors duration-300">{stat.label}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Cải thiện responsive */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-base-content mb-4 sm:mb-5 md:mb-6 animate-fade-in">
                Khám phá X-Club
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-base-content/70 max-w-3xl mx-auto animate-fade-in-up">
                Trải nghiệm đầy đủ các tính năng dành cho cộng đồng chạy bộ
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
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
                  <div className={`card bg-gradient-to-br ${feature.color} border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full group-hover:shadow-primary/20 relative overflow-hidden hover:scale-[1.02]`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="card-body text-center relative z-10 p-4 sm:p-5 md:p-6 lg:p-8">
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 sm:mb-4 md:mb-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-bounce" style={{ animationDelay: `${index * 0.2}s`, animationDuration: '2s' }}>
                        {feature.icon}
                      </div>
                      <h3 className="card-title text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl justify-center mb-2 sm:mb-3 md:mb-4 text-base-content group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-base-content/80 text-sm sm:text-base md:text-lg leading-relaxed group-hover:text-base-content transition-colors duration-300 mb-3 sm:mb-4">
                        {feature.description}
                      </p>
                      <div className="card-actions justify-center mt-3 sm:mt-4 md:mt-5">
                        <div className="btn btn-sm sm:btn-md md:btn-lg btn-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:scale-105 hover:animate-pulse">
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

        {/* Community Section - Cải thiện responsive */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6 bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden">
          {/* Background Animation Elements - Cải thiện responsive */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-8 left-8 sm:top-12 sm:left-12 md:top-16 md:left-16 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-primary/10 rounded-full animate-float"></div>
            <div className="absolute top-16 right-16 sm:top-20 sm:right-20 md:top-24 md:right-24 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-secondary/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-16 left-1/4 sm:bottom-20 sm:left-1/4 md:bottom-24 md:left-1/4 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-accent/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-8 right-1/4 sm:bottom-12 sm:right-1/4 md:bottom-16 md:right-1/4 w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 bg-primary/10 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-base-content mb-5 sm:mb-6 md:mb-8 animate-fade-in-up">
                🌟 Cộng đồng chạy bộ lớn nhất Việt Nam
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-base-content/70 mb-6 sm:mb-8 md:mb-10 leading-relaxed animate-fade-in-up animate-delay-200">
                Tham gia cùng hàng nghìn người yêu thích chạy bộ trên khắp cả nước. 
                Chia sẻ kinh nghiệm, tham gia thử thách và cùng nhau chinh phục những mục tiêu mới.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center animate-fade-in-up animate-delay-400">
                <Link href="/clubs" className="btn btn-primary btn-lg sm:btn-xl text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 hover:scale-105 transition-all duration-300 group relative overflow-hidden hover-float shadow-lg hover:shadow-xl">
                  <span className="relative z-10">🏃‍♂️ Tìm CLB gần bạn</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link href="/events" className="btn btn-secondary btn-lg sm:btn-xl text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 hover:scale-105 transition-all duration-300 group relative overflow-hidden hover-float shadow-lg hover:shadow-xl">
                  <span className="relative z-10">🎯 Xem sự kiện</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA - Cải thiện responsive */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6 bg-base-200 relative overflow-hidden">
          {/* Background Pattern - Cải thiện responsive */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, var(--primary) 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, var(--secondary) 2px, transparent 2px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-5 sm:mb-6 md:mb-8 animate-fade-in-up">
              Sẵn sàng bắt đầu hành trình chạy bộ?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-base-content/70 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto animate-fade-in-up animate-delay-200">
              Tham gia X-Club ngay hôm nay và trở thành một phần của cộng đồng chạy bộ sôi động nhất Việt Nam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center animate-fade-in-up animate-delay-400">
              {!session && (
                <>
                  <Link href="/register" className="btn btn-primary btn-lg sm:btn-xl text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 hover:scale-105 transition-all duration-300 animate-pulse hover-float group relative overflow-hidden shadow-lg hover:shadow-xl">
                    <span className="relative z-10">🚀 Đăng ký miễn phí</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <Link href="/login" className="btn btn-outline btn-lg sm:btn-xl text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 hover:scale-105 transition-all duration-300 group relative overflow-hidden hover-float shadow-lg hover:shadow-xl">
                    <span className="relative z-10">🔑 Đăng nhập</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </>
              )}
              {session && (
                <Link href="/dashboard" className="btn btn-primary btn-lg sm:btn-xl text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 md:px-10 lg:px-12 hover:scale-105 transition-all duration-300 group relative overflow-hidden hover-float shadow-lg hover:shadow-xl">
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
