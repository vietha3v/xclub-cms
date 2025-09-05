# Hướng dẫn cài đặt Module Auth - X-Club

## **1. Cài đặt dependencies**

Chạy lệnh sau để cài đặt các thư viện cần thiết:

```bash
npm install
```

## **2. Cấu hình môi trường**

Tạo file `.env.local` trong thư mục gốc với nội dung:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
```

### **2.1 Tạo NEXTAUTH_SECRET**

Chạy lệnh sau để tạo secret key:

```bash
openssl rand -base64 32
```

**⚠️ QUAN TRỌNG**: Nếu không có `NEXTAUTH_SECRET`, hệ thống sẽ sử dụng secret mặc định cho development. Tuy nhiên, trong production bạn PHẢI có secret riêng.

### **2.2 Cấu hình Google OAuth**

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Bật Google+ API
4. Tạo OAuth 2.0 credentials
5. Thêm redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID và Client Secret vào `.env.local`

### **2.3 Cấu hình Facebook OAuth**

1. Truy cập [Facebook Developers](https://developers.facebook.com/)
2. Tạo app mới
3. Thêm Facebook Login product
4. Cấu hình OAuth redirect URI: `http://localhost:3000/api/auth/callback/facebook`
5. Copy App ID và App Secret vào `.env.local`

## **3. Cấu hình Backend**

Đảm bảo backend đang chạy trên port 4000 và có các endpoint sau:

- `POST /auth/login` - Đăng nhập
- `POST /auth/register` - Đăng ký
- `POST /auth/refresh` - Refresh token
- `POST /auth/oauth/callback` - OAuth callback
- `GET /auth/profile` - Lấy thông tin user

## **4. Chạy ứng dụng**

```bash
npm run dev
```

Ứng dụng sẽ chạy trên `http://localhost:3000`

## **5. Các trang Auth**

- **Đăng nhập**: `/login` (không còn `/auth/login`)
- **Đăng ký**: `/register` (không còn `/auth/register`)
- **Quên mật khẩu**: `/forgot-password` (cần implement)
- **Đặt lại mật khẩu**: `/reset-password` (cần implement)

## **6. Tính năng đã implement**

### **6.1 Đăng nhập**
- ✅ Form đăng nhập với email/username và password
- ✅ Validation với Zod
- ✅ Đăng nhập với Google OAuth
- ✅ Đăng nhập với Facebook OAuth
- ✅ Xử lý lỗi và loading states
- ✅ Redirect sau khi đăng nhập thành công

### **6.2 Đăng ký**
- ✅ Form đăng ký đầy đủ thông tin
- ✅ Validation với Zod
- ✅ Tích hợp API backend
- ✅ Xử lý lỗi và success states
- ✅ Redirect sau khi đăng ký thành công

### **6.3 NextAuth Integration**
- ✅ Cấu hình NextAuth với multiple providers
- ✅ JWT strategy
- ✅ Session management
- ✅ OAuth callbacks
- ✅ Token management

### **6.4 Layout System**
- ✅ Phân biệt rõ ràng giữa trang công khai và trang thành viên
- ✅ Public layout với header + footer
- ✅ Dashboard layout với sidebar + header
- ✅ Auth layout tối giản

### **6.5 API Architecture**
- ✅ Sử dụng Next.js API routes để proxy request đến BE
- ✅ Không gọi trực tiếp BE từ FE
- ✅ Tất cả API calls đều đi qua `/api/...`
- ✅ Backend chạy trên port 4000

## **7. Cấu trúc thư mục**

```
xclub-cms/
├── app/
│   ├── (public)/                    # Trang công khai
│   │   ├── layout.tsx              # Public layout
│   │   └── page.tsx                # Trang chủ
│   ├── (dashboard)/                 # Trang thành viên
│   │   ├── layout.tsx              # Dashboard layout
│   │   └── dashboard/page.tsx      # Trang dashboard
│   ├── login/                       # Trang đăng nhập (không còn /auth/login)
│   │   └── page.tsx                # Trang đăng nhập
│   ├── register/                    # Trang đăng ký (không còn /auth/register)
│   │   └── page.tsx                # Trang đăng ký
│   └── api/
│       ├── auth/[...nextauth]/route.ts  # NextAuth route
│       ├── auth/login/route.ts          # Login API route
│       ├── auth/register/route.ts       # Register API route
│       ├── auth/refresh/route.ts        # Refresh token API route
│       └── auth/oauth/callback/route.ts # OAuth callback API route
├── components/
│   ├── auth/                        # Components auth
│   ├── public/                      # Components public
│   └── dashboard/                   # Components dashboard
├── lib/
│   ├── auth.ts                      # NextAuth config
│   ├── api.ts                       # API functions
│   └── axios.ts                     # Axios config
└── types/
    └── next-auth.d.ts              # Type definitions
```

## **8. Sử dụng trong components**

### **8.1 Kiểm tra session**

```tsx
import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in</div>;
  }

  return <div>Welcome {session?.user?.name}</div>;
}
```

### **8.2 Đăng nhập/đăng xuất**

```tsx
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button onClick={() => signOut()}>
        Đăng xuất
      </button>
    );
  }

  return (
    <button onClick={() => signIn()}>
      Đăng nhập
    </button>
  );
}
```

## **9. Troubleshooting**

### **9.1 Lỗi MissingSecret**

**Lỗi**: `MissingSecret: Please define a 'secret'`

**Nguyên nhân**: Thiếu `NEXTAUTH_SECRET` trong file `.env.local`

**Giải pháp**:
1. Tạo file `.env.local` trong thư mục gốc
2. Thêm `NEXTAUTH_SECRET=your-secret-key-here`
3. Restart ứng dụng

**Tạm thời**: Hệ thống sẽ sử dụng secret mặc định cho development

### **9.2 Lỗi OAuth**

- Kiểm tra Client ID và Client Secret
- Đảm bảo redirect URI đúng
- Kiểm tra domain được phép trong Google/Facebook console

### **9.3 Lỗi API**

- Kiểm tra backend có đang chạy trên port 4000 không
- Kiểm tra NEXT_PUBLIC_API_URL
- Kiểm tra CORS configuration

### **9.4 Lỗi NextAuth**

- Kiểm tra NEXTAUTH_SECRET
- Kiểm tra NEXTAUTH_URL
- Xem console logs để debug

## **10. Bảo mật**

- Sử dụng HTTPS trong production
- Không commit file .env.local
- Sử dụng strong NEXTAUTH_SECRET
- Validate input data
- Rate limiting cho API endpoints

## **11. Production Deployment**

1. Cập nhật NEXTAUTH_URL thành domain production
2. Cập nhật OAuth redirect URIs
3. Sử dụng strong NEXTAUTH_SECRET
4. Cấu hình database cho sessions (nếu cần)
5. Enable HTTPS
6. Cấu hình CORS cho backend

## **12. Layout System**

### **12.1 Public Layout** `(public)`
- Trang chủ, clubs, events, races
- Khách có thể xem mà không cần đăng nhập
- Có header với navigation đầy đủ
- Có footer với thông tin liên hệ

### **12.2 Dashboard Layout** `(dashboard)`
- Trang thành viên cần đăng nhập
- Có header với search và user menu
- Có sidebar với navigation
- Hiển thị thông tin user và stats

### **12.3 Auth Pages** `login/register`
- Trang đăng nhập/đăng ký
- Layout tối giản, tập trung vào form
- Không có header/footer
- Background gradient đẹp mắt

## **13. API Flow**

### **13.1 Frontend → Next.js API Route → Backend**

```
FE Component → /api/auth/login → Backend /auth/login
```

### **13.2 Lợi ích của Next.js API Routes**

- ✅ **Bảo mật**: Không expose backend URL trực tiếp
- ✅ **Caching**: Có thể cache response
- ✅ **Rate Limiting**: Dễ dàng implement rate limiting
- ✅ **Validation**: Validate request trước khi gửi đến BE
- ✅ **Error Handling**: Xử lý lỗi tập trung
- ✅ **Logging**: Log tất cả API calls

### **13.3 Cấu hình Backend**

Backend cần chạy trên port 4000 và có CORS cho `http://localhost:3000`:

```typescript
// Backend CORS config
app.enableCors({
  origin: ['http://localhost:3000'],
  credentials: true,
});
```
