# 🏃‍♂️ RunnerX – Hệ thống Chạy bộ & Kết nối Cộng đồng

## 📋 Tổng quan dự án

### **Tên dự án**: RunnerX
### **Mã dự án**: RX-2024-001
### **Loại dự án**: Mobile App + Web Platform
### **Độ ưu tiên**: Cao

---

## 🎯 Mục tiêu dự án

### **Mục tiêu chính**
RunnerX không chỉ là ứng dụng theo dõi chạy bộ, mà là **nền tảng kết nối con người qua từng bước chạy**, biến việc chạy bộ thành trải nghiệm có ý nghĩa xã hội.

### **Mục tiêu cụ thể**
1. **Cá nhân**: Giúp người dùng theo dõi hành trình tập luyện, giữ động lực, ghi lại cảm xúc
2. **Cộng đồng**: Tạo kết nối, thử thách chung và sân chơi CLB
3. **Xã hội**: Biến từng km chạy thành hành động ý nghĩa – gây quỹ cho giáo dục, hỗ trợ trẻ em và người yếu thế

### **Thông điệp cốt lõi**
> **"Chạy và gắn kết"** – để khỏe hơn, vui hơn, và mang lại điều tốt đẹp hơn cho cộng đồng.

---

## 👥 Đối tượng người dùng

### **1. Người dùng cá nhân (Runner)**
- **Đặc điểm**: 18-65 tuổi, quan tâm sức khỏe, thích hoạt động thể thao
- **Nhu cầu**: Theo dõi hoạt động, đặt mục tiêu, nhận huy chương, kết nối bạn bè
- **Số lượng dự kiến**: 70% tổng người dùng

### **2. Người chạy nhóm nhỏ / bạn bè**
- **Đặc điểm**: Thích hoạt động nhóm, có bạn bè cùng sở thích
- **Nhu cầu**: Tìm bạn chạy, hẹn cung đường, chia sẻ kết quả
- **Số lượng dự kiến**: 15% tổng người dùng

### **3. Câu lạc bộ (CLB) chạy bộ**
- **Đặc điểm**: Tổ chức có cơ cấu, muốn quản lý thành viên và hoạt động
- **Nhu cầu**: Quản lý thành viên, sự kiện CLB, thử thách liên-CLB, giải chạy CLB
- **Số lượng dự kiến**: 10% tổng người dùng

### **4. Ban tổ chức giải chạy / sự kiện**
- **Đặc điểm**: Doanh nghiệp, tổ chức thể thao, CLB muốn tổ chức giải chạy
- **Nhu cầu**: Nền tảng tổ chức giải nhanh gọn, tiện lợi, có bảng xếp hạng & kết quả minh bạch
- **Số lượng dự kiến**: 3% tổng người dùng

### **5. Cộng đồng RunnerX**
- **Đặc điểm**: Người dùng rộng rãi tham gia các thử thách cộng đồng
- **Nhu cầu**: Tham gia cộng đồng lớn, được ghi nhận, có trải nghiệm "chạy và gắn kết"
- **Số lượng dự kiến**: 2% tổng người dùng

---

## 🏗️ Kiến trúc hệ thống

### **Tổng quan kiến trúc**
```
RunnerX Platform
├── 📱 Mobile App (iOS/Android)
├── 🌐 Web Platform (Admin + User Portal)
├── 🔧 Backend API Services
├── 🗄️ Database & Storage
├── ☁️ Cloud Infrastructure
└── 🔌 Third-party Integrations
```

---

## ⚙️ Chức năng hệ thống

### **1. Người dùng & hồ sơ cá nhân**
- **Đăng ký / đăng nhập**: Email, SĐT, MXH, SSO
- **Quản lý hồ sơ**: Tên, avatar, tuổi, giới tính, chiều cao, cân nặng
- **Ghi nhận hoạt động chạy**: GPS, pace, tốc độ, quãng đường, thời gian
- **Đồng bộ thiết bị & API**: Strava, Garmin, Coros
- **Lịch sử & thống kê hoạt động**: Biểu đồ tuần/tháng/năm
- **Quản lý mục tiêu cá nhân**: Cự ly, số ngày chạy, streak
- **Bộ sưu tập huy chương & thành tựu cá nhân**

### **2. Gamification & động lực tập luyện**
- **Hệ thống level & XP**: Tăng cấp khi hoàn thành hoạt động
- **Badge đặc biệt**: "Chạy sáng sớm 7 ngày", "Fullmoon run", …
- **Cột mốc thành tựu**: 100km, 500km, 1000km…
- **Hệ thống thử thách cá nhân**: Pace, quãng đường, số ngày chạy
- **Gợi ý thử thách mới**: Khi người dùng có dấu hiệu giảm động lực

### **3. Huấn luyện & chăm sóc sức khỏe**
- **Kế hoạch tập luyện cá nhân hóa**: Theo mục tiêu (5K, 10K, HM, FM)
- **AI Coach**: Phân tích dữ liệu & gợi ý lịch tập, tốc độ, ngày nghỉ
- **Theo dõi sức khỏe**: Nhịp tim, VO2max, calories (từ thiết bị)
- **Nhắc nhở thông minh**: Uống nước, nghỉ ngơi, cảnh báo tập quá sức

### **4. Kết nối & tương tác xã hội**
- **Tìm kiếm runner**: Gần vị trí, theo sở thích, pace
- **Gửi lời mời kết bạn, theo dõi runner khác**
- **Hẹn lịch chạy chung**: Thời gian, địa điểm, cung đường
- **Tương tác**: Like, comment, cheer, share kết quả
- **Chia sẻ ảnh & bản đồ hoạt động chạy**
- **Livestream buổi chạy**: Cho bạn bè hoặc CLB

### **5. Khám phá & trải nghiệm**
- **Gợi ý cung đường chạy đẹp gần đây**
- **Chạy vẽ hình (GPS Art)**: Tạo & chia sẻ bản đồ hình vẽ
- **Chế độ chạy chill**: Tích hợp nghe nhạc/podcast khi chạy

### **6. Câu lạc bộ (CLB)**
- **Tạo CLB**: Tên, mô tả, logo, chế độ public/private
- **Quản lý thành viên**: Thêm, mời, phân quyền admin/mod
- **Tổ chức sự kiện chạy chung CLB**
- **Tạo thử thách nội bộ**: Tổng km, pace, streak
- **Bảng xếp hạng CLB**: Theo tuần/tháng
- **Giải chạy CLB**: Tổ chức, bán bib, ghi nhận kết quả
- **Thử thách liên-CLB**:
  - Đua tổng km, số runner hoàn thành, tốc độ TB
  - Bảng xếp hạng liên-CLB real-time
  - Huy chương CLB & vinh danh cộng đồng

### **7. Giải chạy & sự kiện cộng đồng**
- **Tạo giải chạy ảo (virtual race) & offline**
- **Quản lý đăng ký bib & thanh toán**
- **Xác thực kết quả**: GPS, file GPX/FIT
- **Bảng xếp hạng đa tiêu chí**: Cự ly, nhóm tuổi, giới tính
- **Trao huy chương ảo/kỷ niệm chương**
- **Tổ chức sự kiện định kỳ**: Chạy Tết, Earth Day…

### **8. Giải chạy & sự kiện gây quỹ**
- **Tạo giải chạy gây quỹ**: Mục tiêu tiền, đơn vị nhận quỹ
- **Cơ chế tham gia**: Phí đăng ký + quy đổi km thành tiền (sponsor)
- **Hiển thị số tiền gây quỹ real-time**
- **Bảng vinh danh runner & CLB đóng góp nhiều nhất**
- **Huy chương riêng cho giải gây quỹ**
- **Báo cáo minh bạch**: Tổng tiền, đơn vị thụ hưởng, giải ngân

### **9. Thành tích & vinh danh**
- **Quản lý huy chương cá nhân & CLB**
- **Hồ sơ runner**: Tổng kết thành tích, giải đã tham gia, kỷ lục cá nhân
- **Bảng vinh danh**: Runner nổi bật, CLB tiêu biểu
- **Badge danh dự**: Cho thành viên tích cực, runner truyền cảm hứng

### **10. Thương mại & hệ sinh thái**
- **Marketplace**: Mua bib, giày, đồng hồ, phụ kiện
- **Đối tác ưu đãi**: Giảm giá khi hoàn thành thử thách
- **API mở**: Kết nối app fitness khác (Apple Health, Google Fit, MyFitnessPal…)

### **11. Hệ thống quản trị (Admin Panel)**
- **Quản lý người dùng, CLB, giải chạy, sự kiện**
- **Quản lý sponsor, đối tác, tổ chức từ thiện**
- **Thống kê người dùng, hoạt động, doanh thu, số tiền gây quỹ**
- **Kiểm duyệt nội dung & xử lý báo cáo vi phạm**

---

## 🎨 Nhận diện thương hiệu

### **Bộ màu chủ đạo**
- **Đỏ (#D62828/#FF0000)**: Năng lượng, đam mê, quyết tâm
- **Vàng (#FFD700)**: Niềm tin, hy vọng, ánh sáng tương lai
- **Xanh lá nhạt (#5CB85C)**: Sức khỏe, thiện nguyện, môi trường

### **Biểu tượng & Logo**
- **Chữ "X"** cách điệu thành dấu vết đường chạy GPS
- **Ngôi sao vàng** cách điệu hiện đại (starburst, motion star)
- **Ý nghĩa**: Mỗi runner là một ngôi sao, kết nối tạo nên bầu trời cộng đồng

### **Phong cách thiết kế**
- **Đường nét**: Bo tròn, mềm mại, gần gũi
- **Minh họa**: Người chạy nhóm, trẻ em học tập, hoạt động thiện nguyện
- **Motif**: Vệt chạy GPS, ngôi sao, vòng kết nối động lực

---

## 📱 Yêu cầu kỹ thuật

### **Frontend**
- **Mobile App**: React Native (iOS/Android)
- **Web Platform**: Next.js (Admin + User Portal)
- **PWA**: Progressive Web App cho web

### **Backend**
- **API Architecture**: RESTful + GraphQL
- **Real-time Features**: WebSocket cho live tracking
- **Database**: PostgreSQL + Redis
- **File Storage**: AWS S3 hoặc tương tự

### **Infrastructure**
- **Cloud Platform**: AWS/Azure/GCP
- **CDN**: Content Delivery Network
- **Monitoring**: Application Performance Monitoring
- **Security**: OAuth 2.0, JWT, HTTPS

### **Third-party Integrations**
- **Fitness Devices**: Strava, Garmin, Coros, Apple Health, Google Fit
- **Payment**: VNPay, Momo, ZaloPay, Stripe
- **Maps**: Google Maps, OpenStreetMap
- **Analytics**: Google Analytics, Mixpanel

---

## 💰 Mô hình kinh doanh

### **Revenue Streams**

#### **1. Premium Subscriptions**
- **Basic**: Miễn phí với tính năng cơ bản
- **Premium**: $5-10/tháng với tính năng nâng cao
- **Club Pro**: $20-50/tháng cho CLB

#### **2. Transaction Fees**
- **Event Registration**: 5-10% phí đăng ký giải chạy
- **Fundraising**: 3-5% phí gây quỹ
- **Marketplace**: 10-15% commission

#### **3. Advertising & Sponsorship**
- **Banner Ads**: Quảng cáo trong app
- **Sponsored Challenges**: Thử thách được tài trợ
- **Event Sponsorship**: Tài trợ giải chạy

#### **4. API & Enterprise**
- **API Access**: Phí sử dụng API cho đối tác
- **Enterprise Solutions**: Giải pháp cho doanh nghiệp
- **White-label**: Cung cấp nền tảng cho thương hiệu khác

---

## 📈 KPIs & Success Metrics

### **User Metrics**
- **Monthly Active Users (MAU)**
- **Daily Active Users (DAU)**
- **User Retention Rate**
- **User Acquisition Cost (CAC)**
- **Lifetime Value (LTV)**

### **Engagement Metrics**
- **Average Session Duration**
- **Activities per User**
- **Social Interactions per User**
- **Club Participation Rate**
- **Event Participation Rate**

### **Business Metrics**
- **Monthly Recurring Revenue (MRR)**
- **Customer Acquisition Cost (CAC)**
- **Customer Lifetime Value (LTV)**
- **Churn Rate**
- **Net Promoter Score (NPS)**

---

## 🎨 UI/UX Mockup Specifications

### **Mobile App Navigation Structure**

#### **Bottom Tab Navigation (5 tabs)**
```
🏠 Home      🏃‍♂️ Run      👥 Social      🏆 Achievements      👤 Profile
```

#### **Top Navigation Elements**
- **Left**: Menu hamburger (Profile, Settings, Help)
- **Center**: App logo "RunnerX"
- **Right**: Notifications bell, Search icon

### **Core Screens & User Flows**

#### **1. Onboarding Flow**
```
Splash Screen → Welcome → Permission Request → Profile Setup → Home
```

**Screens:**
- **Splash**: Logo + tagline "Chạy và gắn kết"
- **Welcome**: 3 slides giới thiệu tính năng chính
- **Permissions**: GPS, Camera, Notifications, Health data
- **Profile Setup**: Tên, tuổi, giới tính, mục tiêu chạy

#### **2. Home Screen (Main Dashboard)**
**Layout Structure:**
```
┌─────────────────────────────────────┐
│ 🔔 [Notifications] 🔍 [Search]      │
├─────────────────────────────────────┤
│ 🏃‍♂️ [Start Running] Button        │
├─────────────────────────────────────┤
│ 📊 Today's Stats                    │
│ • Steps: 8,432 | Distance: 6.2km   │
│ • Active Time: 45min               │
├─────────────────────────────────────┤
│ 🎯 Current Challenges              │
│ • 7-day streak: 5/7 ✅            │
│ • Monthly goal: 80/100km 📈       │
├─────────────────────────────────────┤
│ 👥 Recent Activities               │
│ • Friend A completed 10K run       │
│ • Club B organized weekend event   │
├─────────────────────────────────────┤
│ 🏆 Quick Actions                   │
│ [Join Challenge] [Find Route]      │
└─────────────────────────────────────┘
```

#### **3. Run Tracking Screen**
**Layout Structure:**
```
┌─────────────────────────────────────┐
│ ← [Back]     🏃‍♂️ Running     ⏸️ [Pause] │
├─────────────────────────────────────┤
│ 🗺️ Live Map View (Full width)      │
├─────────────────────────────────────┤
│ 📊 Live Stats                      │
│ • Distance: 2.4km                 │
│ • Time: 12:34                     │
│ • Pace: 5:15/km                   │
│ • Calories: 145                   │
├─────────────────────────────────────┤
│ 🎵 [Music] [Route] [Share] [Stop] │
└─────────────────────────────────────┘
```

#### **4. Profile Screen**
**Layout Structure:**
```
┌─────────────────────────────────────┐
│ 👤 Profile Header                   │
│ • Avatar (120x120px)               │
│ • Name: "Nguyễn Văn A"             │
│ • Level: 25 | XP: 12,450          │
│ • Join date: January 2024          │
├─────────────────────────────────────┤
│ 📊 Statistics Tabs                 │
│ [This Week] [This Month] [All Time]│
├─────────────────────────────────────┤
│ 📈 Activity Chart                  │
│ • Weekly distance chart            │
│ • Monthly progress                 │
├─────────────────────────────────────┤
│ 🏆 Achievements                    │
│ • Badges grid (3x3)                │
│ • Recent unlocks                   │
├─────────────────────────────────────┤
│ ⚙️ Settings & Actions              │
│ [Edit Profile] [Privacy] [Logout]  │
└─────────────────────────────────────┘
```

#### **5. Social Feed Screen**
**Layout Structure:**
```
┌─────────────────────────────────────┐
│ 🔍 [Search] [Filter] [Sort]        │
├─────────────────────────────────────┤
│ 📱 Activity Posts                  │
│ ┌─────────────────────────────────┐ │
│ │ 👤 User Avatar + Name           │ │
│ │ 🏃‍♂️ "Just completed 10K run!"  │ │
│ │ 📍 Location: Hồ Tây, Hà Nội     │ │
│ │ 🗺️ Route map thumbnail          │ │
│ │ 📊 Stats: 10.2km, 52:30        │ │
│ │ ❤️ 24 💬 8 🔄 3                │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 👥 Suggested Runners               │
│ • Runner profiles (horizontal scroll)│
└─────────────────────────────────────┘
```

#### **6. Club Management Screen**
**Layout Structure:**
```
┌─────────────────────────────────────┐
│ 🏘️ [My Clubs] [Discover] [Create]  │
├─────────────────────────────────────┤
│ 🏘️ Club Card                       │
│ • Logo + Name: "Hà Nội Runners"    │
│ • Members: 156 | Events: 12        │
│ • Next event: "Weekend Trail Run"  │
│ • [View Club] [Manage]             │
├─────────────────────────────────────┤
│ 📅 Upcoming Events                 │
│ • Event list with dates            │
│ • [Join Event] buttons             │
├─────────────────────────────────────┤
│ 🏆 Club Challenges                 │
│ • Monthly distance challenge       │
│ • Member rankings                  │
└─────────────────────────────────────┘
```

### **Design System Specifications**

#### **Typography Scale**
```
Heading 1: 24px, Bold, #171717
Heading 2: 20px, SemiBold, #171717
Heading 3: 18px, Medium, #171717
Body Text: 16px, Regular, #4A4A4A
Caption: 14px, Regular, #6B6B6B
Button Text: 16px, Medium, #FFFFFF
```

#### **Spacing System**
```
XS: 4px    (0.25rem)
S: 8px     (0.5rem)
M: 16px    (1rem)
L: 24px    (1.5rem)
XL: 32px   (2rem)
XXL: 48px  (3rem)
```

#### **Component Specifications**

**Primary Button:**
```
Background: #D62828 (Red)
Text: White, 16px, Medium
Padding: 16px 24px
Border Radius: 8px
Shadow: 0 2px 8px rgba(214, 40, 40, 0.3)
```

**Secondary Button:**
```
Background: Transparent
Border: 2px solid #D62828
Text: #D62828, 16px, Medium
Padding: 16px 24px
Border Radius: 8px
```

**Card Component:**
```
Background: #FFFFFF
Border: 1px solid #E5E5E5
Border Radius: 12px
Shadow: 0 2px 12px rgba(0, 0, 0, 0.08)
Padding: 16px
```

#### **Icon System**
```
Size: 24x24px (standard), 16x16px (small), 32x32px (large)
Style: Outlined, filled variants
Color: Primary (#D62828), Secondary (#FFD700), Neutral (#6B6B6B)
```

### **Responsive Design Breakpoints**

#### **Mobile (iOS/Android)**
```
Small: 320px - 375px (iPhone SE, small Android)
Medium: 375px - 414px (iPhone 12/13/14)
Large: 414px - 428px (iPhone 12/13/14 Pro Max)
```

#### **Tablet (iPad)**
```
Small: 768px - 834px (iPad Mini, iPad Air)
Large: 834px - 1024px (iPad Pro)
```

#### **Web Platform**
```
Mobile: 320px - 768px
Tablet: 768px - 1024px
Desktop: 1024px+
```

### **Animation & Micro-interactions**

#### **Transitions**
```
Duration: 200ms (fast), 300ms (standard), 500ms (slow)
Easing: ease-out (buttons), ease-in-out (cards), ease-in (loading)
```

#### **Micro-interactions**
- **Button Press**: Scale down 0.95, shadow increase
- **Card Hover**: Lift up 2px, shadow increase
- **Loading States**: Skeleton screens, progress bars
- **Success States**: Green checkmark, celebration animation

### **Accessibility Requirements**

#### **Color Contrast**
```
Text on White: Minimum 4.5:1 ratio
Text on Red: Minimum 3:1 ratio
Interactive elements: Clear focus indicators
```

#### **Touch Targets**
```
Minimum size: 44x44px
Spacing between: 8px minimum
Button height: 48px minimum
```

#### **Screen Reader Support**
```
Semantic HTML structure
ARIA labels for interactive elements
Alternative text for images
```

---


**Tài liệu này được cập nhật lần cuối**: [Ngày cập nhật]
**Phiên bản**: v1.0
**Trạng thái**: Draft - Cần review và approval
