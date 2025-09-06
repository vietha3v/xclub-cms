'use client'
import { mockFundraising, mockEvents, formatCurrency } from '../../../data/mockData';
import dlv from 'dlv';

export default function FundraisingPage() {
  // Phân loại chiến dịch gây quỹ
  const activeCampaigns = mockFundraising.filter(f => f.status === 'active');
  const completedCampaigns = mockFundraising.filter(f => f.status === 'completed');
  const upcomingCampaigns = mockFundraising.filter(f => f.status === 'upcoming');

  // Tính tổng thống kê
  const totalRaised = mockFundraising.reduce((sum, f) => sum + f.raised, 0);
  const totalTarget = mockFundraising.reduce((sum, f) => sum + f.target, 0);
  const totalParticipants = mockFundraising.reduce((sum, f) => sum + f.participants, 0);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent via-primary to-secondary text-white p-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">💝 Gây quỹ cộng đồng</h1>
          <p className="text-xl opacity-90">Biến mỗi bước chạy thành hành động ý nghĩa cho cộng đồng</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat bg-base-100 shadow-lg rounded-lg">
            <div className="stat-figure text-accent">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="stat-title">Tổng quỹ gây được</div>
            <div className="stat-value text-accent">{formatCurrency(totalRaised)}</div>
            <div className="stat-desc">Từ tất cả chiến dịch</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-lg">
            <div className="stat-figure text-primary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="stat-title">Mục tiêu tổng</div>
            <div className="stat-value text-primary">{formatCurrency(totalTarget)}</div>
            <div className="stat-desc">Cần đạt được</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-lg">
            <div className="stat-figure text-secondary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="stat-title">Người tham gia</div>
            <div className="stat-value text-secondary">{dlv({ totalParticipants }, 'totalParticipants', 0).toLocaleString()}</div>
            <div className="stat-desc">Tổng cộng</div>
          </div>

          <div className="stat bg-base-100 shadow-lg rounded-lg">
            <div className="stat-figure text-warning">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="stat-title">Tiến độ tổng</div>
            <div className="stat-value text-warning">{Math.round((totalRaised / totalTarget) * 100)}%</div>
            <div className="stat-desc">Đã hoàn thành</div>
          </div>
        </div>

        {/* Chiến dịch đang diễn ra */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-accent">🔥 Chiến dịch đang diễn ra</h2>
            <button className="btn btn-accent">Tạo chiến dịch mới</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dlv({ activeCampaigns }, 'activeCampaigns', []).map((campaign) => (
              <div key={campaign.id} className="card bg-base-100 shadow-lg border-l-4 border-accent">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <div className="badge badge-accent badge-lg animate-pulse">Đang diễn ra</div>
                    <div className="text-2xl">{campaign.icon}</div>
                  </div>
                  <h3 className="card-title text-xl">{campaign.title}</h3>
                  <p className="text-base-content/70 mb-4">{campaign.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span>Mục tiêu:</span>
                      <span className="font-bold text-accent">{formatCurrency(campaign.target)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Đã gây được:</span>
                      <span className="font-bold text-success">{formatCurrency(campaign.raised)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Người tham gia:</span>
                      <span className="font-medium">{dlv(campaign, 'participants', 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thời gian còn lại:</span>
                      <span className="font-medium">{campaign.daysLeft} ngày</span>
                    </div>
                  </div>
                  
                  <progress 
                    className="progress progress-accent w-full mb-4" 
                    value={(campaign.raised / campaign.target) * 100} 
                    max="100"
                  ></progress>
                  
                  <div className="card-actions justify-between">
                    <button className="btn btn-accent">Tham gia ngay</button>
                    <button className="btn btn-outline">Chia sẻ</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chiến dịch sắp diễn ra */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">📅 Chiến dịch sắp diễn ra</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dlv({ upcomingCampaigns }, 'upcomingCampaigns', []).map((campaign) => (
              <div key={campaign.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <figure className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-6xl">{campaign.icon}</div>
                </figure>
                <div className="card-body">
                  <div className="flex items-center justify-between mb-2">
                    <div className="badge badge-primary">Sắp diễn ra</div>
                    <div className="text-sm text-base-content/70">
                      Bắt đầu {new Date(campaign.startDate).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                  <h3 className="card-title text-lg">{campaign.title}</h3>
                  <p className="text-base-content/70 mb-4">{campaign.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Mục tiêu:</span>
                      <span className="font-medium text-accent">{formatCurrency(campaign.target)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Thời gian:</span>
                      <span className="font-medium">{campaign.duration} ngày</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Đối tượng:</span>
                      <span className="font-medium">{campaign.beneficiary}</span>
                    </div>
                  </div>
                  
                  <div className="card-actions justify-between">
                    <button className="btn btn-primary btn-sm">Đăng ký tham gia</button>
                    <button className="btn btn-outline btn-sm">Chi tiết</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chiến dịch đã hoàn thành */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-success mb-6">✅ Chiến dịch đã hoàn thành</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dlv({ completedCampaigns }, 'completedCampaigns', []).map((campaign) => (
              <div key={campaign.id} className="card bg-base-100 shadow-lg opacity-75">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <div className="badge badge-success badge-lg">Hoàn thành</div>
                    <div className="text-2xl">{campaign.icon}</div>
                  </div>
                  <h3 className="card-title text-lg">{campaign.title}</h3>
                  <p className="text-base-content/70 mb-4">{campaign.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span>Mục tiêu:</span>
                      <span className="font-bold text-accent">{formatCurrency(campaign.target)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kết quả:</span>
                      <span className="font-bold text-success">{formatCurrency(campaign.raised)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Người tham gia:</span>
                      <span className="font-medium">{dlv(campaign, 'participants', 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ngày kết thúc:</span>
                      <span className="font-medium">{new Date(campaign.endDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                  
                  <div className="card-actions justify-end">
                    <button className="btn btn-outline btn-sm">Xem báo cáo</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bảng xếp hạng người gây quỹ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-warning mb-6">🏆 Bảng xếp hạng người gây quỹ</h2>
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Hạng</th>
                      <th>Người dùng</th>
                      <th>Tổng quãng đường</th>
                      <th>Số tiền gây quỹ</th>
                      <th>Chiến dịch tham gia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFundraising
                      .flatMap(f => f.topContributors || [])
                      .sort((a, b) => b.amount - a.amount)
                      .slice(0, 10)
                      .map((contributor, index) => (
                        <tr key={contributor.userId}>
                          <td>
                            <div className="flex items-center">
                              {index < 3 ? (
                                <span className="text-2xl mr-2">
                                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                                </span>
                              ) : (
                                <span className="font-bold mr-2">#{index + 1}</span>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                  <img src={contributor.avatar} alt={contributor.name} />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{contributor.name}</div>
                                <div className="text-sm opacity-50">@{contributor.username}</div>
                              </div>
                            </div>
                          </td>
                          <td>{contributor.totalDistance} km</td>
                          <td className="text-success font-bold">{formatCurrency(contributor.amount)}</td>
                          <td>{contributor.campaignsCount} chiến dịch</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin về gây quỹ */}
        <div className="bg-base-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-info mb-4">ℹ️ Cách thức gây quỹ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-info rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Chạy và gây quỹ</h3>
              <p className="text-sm text-base-content/70">Mỗi km bạn chạy sẽ được quy đổi thành tiền gây quỹ từ các nhà tài trợ</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-info rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Kết nối cộng đồng</h3>
              <p className="text-sm text-base-content/70">Tham gia cùng bạn bè, CLB để tạo sức mạnh tập thể</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-info rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Minh bạch hoàn toàn</h3>
              <p className="text-sm text-base-content/70">Theo dõi tiến độ và kết quả gây quỹ một cách minh bạch</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





