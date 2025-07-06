# Hướng dẫn khởi tạo và phát triển project Expo + Prisma

Đây là project mẫu kết hợp giữa [Expo](https://expo.dev) (React Native) và [Prisma](https://www.prisma.io/) để xây dựng ứng dụng di động với backend nhẹ nhàng, dễ mở rộng.

## 1. Yêu cầu hệ thống
- Node.js >= 18
- npm >= 9
- Đã cài đặt [Expo CLI](https://docs.expo.dev/get-started/installation/) (nếu muốn dùng lệnh `expo` toàn cục):  
  ```bash
  npm install -g expo-cli
  ```

## 2. Cài đặt các phụ thuộc

```bash
npm install
```

## 3. Thiết lập Prisma

### a. Cấu hình database
- Mặc định, cấu hình database nằm trong `prisma/schema.prisma`.
- Bạn có thể chỉnh sửa datasource (SQLite, PostgreSQL, v.v.) trong file này.

### b. Chạy migration để tạo database

```bash
npx prisma migrate dev
```

### c. Sinh Prisma Client

Sau khi migrate, Prisma Client sẽ tự động được sinh ra trong `prisma/generated/client/`. Nếu cần, bạn có thể chạy lại:

```bash
npx prisma generate
```

## 4. Khởi động ứng dụng Expo

```bash
npx expo start
```

- Quét QR code để mở trên thiết bị thật (Expo Go), hoặc chọn mở trên trình giả lập Android/iOS.

## 5. Sử dụng Prisma trong project
- Các API backend (ví dụ: `app/api/todo+api.ts`) sẽ import Prisma Client từ `prisma/generated/client`.
- Bạn có thể viết các endpoint API sử dụng Prisma để thao tác dữ liệu.

## 6. Reset project (tùy chọn)

Để làm mới project về trạng thái ban đầu:

```bash
npm run reset-project
```

## 7. Tài liệu tham khảo
- [Tài liệu Expo](https://docs.expo.dev/)
- [Tài liệu Prisma](https://www.prisma.io/docs/)
- [Hướng dẫn kết nối Prisma với SQLite/Postgres/MySQL](https://www.prisma.io/docs/orm/prisma-schema/data-model)
- [Cách sử dụng API routes trong Expo Router](https://docs.expo.dev/router/api-routes/)

## 8. Lưu ý quan trọng
- Prisma chỉ chạy ở môi trường Node.js (backend). Trong project này, Prisma được dùng ở các route API (server-side) chứ không chạy trực tiếp trên client di động.
- Nếu thay đổi schema, hãy luôn migrate và generate lại client.
- Đảm bảo bạn đã cài đặt đúng phiên bản Node.js.

---

Nếu bạn cần hướng dẫn chi tiết hơn về một bước cụ thể (ví dụ: viết API với Prisma, deploy, v.v.), hãy liên hệ để được hỗ trợ thêm!
