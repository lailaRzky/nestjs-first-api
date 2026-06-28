## Setup & Menjalankan

```bash
npm install
npm run start:dev
```

Server berjalan di: http://localhost:3000

## Endpoint API

| Method | URL | Deskripsi |
|--------|-----|-----------|
| GET | /products | Semua produk |
| GET | /products/:id | Produk berdasarkan ID |
| POST | /products | Tambah produk baru |
| PUT | /products/:id | Update produk |
| DELETE | /products/:id | Hapus produk |
| GET | /products/category/:category | Filter by kategori |
| GET | /products/available | Produk tersedia (stok > 0 & isAvailable = true) |



## Kategori Produk
- `Aksesoris`
- `Elektronik`
- `Audio`



## Contoh POST /products
```json
{
  "name": "Flashdisk",
  "price": 75000,
  "category": "Aksesoris",
  "stock": 100,
  "isAvailable": true
}
```

## Contoh PUT /products/:id
```json
{
  "name": "Laptop Gaming",
  "price": 15000000,
}
```

## Struktur Proyek
```
nestjs-first-api/
├── src/
│   ├── products/
│   │   ├── products.module.ts
│   │   ├── products.controller.ts
│   │   └── products.service.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   └── users.service.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts
└── package.json
```
