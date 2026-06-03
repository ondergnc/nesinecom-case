# Nesine Case

## Öne Çıkanlar

- **Overview market görünümü** — Masaüstünde Maç Sonucu, Çifte Şans ve Alt/Üst 2,5 marketleri yan yana sabit kolonlar halinde; mobilde tek dropdown ile seçilebilen tek market. 
- **Lig kartları** — Her lig, kendi içinde maçları barındıran modern bir kutu olarak gruplanır.
- **Kalıcılık** — Aktif kupon ve onaylanmış kupon geçmişi `localStorage`'a yazılır, sayfa yenilendiğinde geri yüklenir.

## Teknolojiler

- **Next.js 16** (App Router) + **React 19**
- **Redux Toolkit** + **react-redux** (durum yönetimi)
- **react-window** (liste sanallaştırma)
- **Sass (SCSS)** (CSS custom property tabanlı tema)
- **TypeScript**, **ESLint**, **Prettier**

## Başlangıç

Gereksinim: Node.js 20+

```bash
yarn install
yarn dev
```

Uygulama `http://localhost:3000` adresinde açılır ve kök yol otomatik olarak `/sports`'a yönlendirir.

### Ortam Değişkenleri

`.env` dosyasında tanımlıdır:

| Değişken | Açıklama | Varsayılan |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Oran akışı API kök adresi | `https://nesine-case-study.onrender.com` |

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `yarn dev` | Geliştirme sunucusu |
| `yarn build` | Üretim derlemesi |
| `yarn start` | Üretim sunucusu |
| `yarn lint` | ESLint |
| `yarn format` | Prettier ile biçimlendirme |
| `yarn analyze` | Bundle analizi |

## Sayfalar

| Yol | İçerik |
| --- | --- |
| `/` | `/sports`'a yönlendirir |
| `/sports` | Maç bülteni + market başlığı + kupon |
| `/sports/bets` | Onaylanmış kupon geçmişi |
