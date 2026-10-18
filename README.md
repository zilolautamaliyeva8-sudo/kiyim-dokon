# Кийим дўкони — сотув сайти (Next.js App Router)

- Тепада асосий таклиф (hero), пастда форма: исм, телефон, манзил
- «Юбориш» → маълумот Telegram ботга кетади → мижоз `/rahmat` саҳифасига ўтади
- Раҳмат саҳифасида 10 сониялик анимация, сўнг Telegram каналга ўтади
- Meta Pixel (PageView + Lead) ва Meta Conversions API (Lead, бир хил `event_id` билан дубликатсиз)

## Тузилма

```
app/
  layout.js          — умумий layout + Meta Pixel
  page.js            — бош саҳифа (таклиф + форма)
  OrderForm.js       — форма (client)
  MetaPixel.js       — Meta Pixel скрипти
  metaCapi.js        — Conversions API (сервер)
  rahmat/page.js     — раҳмат саҳифаси, 10 с таймер
  api/order/route.js — Telegram + CAPI'га юбориш
```

## Созлаш (Environment Variables)

`.env.example` ни `.env.local` га нусхаланг ва тўлдиринг (Vercel'да: Project → Settings → Environment Variables):

| Ўзгарувчи | Изоҳ |
|---|---|
| `TELEGRAM_BOT_TOKEN` | @BotFather берган токен |
| `TELEGRAM_CHAT_ID` | Буюртмалар келадиган чат ID (ботга /start ёзинг, кейин `https://api.telegram.org/bot<TOKEN>/getUpdates` дан ID ни олинг) |
| `NEXT_PUBLIC_TELEGRAM_CHANNEL_URL` | Каналингиз ҳаволаси, масалан `https://t.me/kanal` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID |
| `META_CAPI_ACCESS_TOKEN` | Events Manager → Settings → Conversions API → Generate access token |
| `META_TEST_EVENT_CODE` | (ихтиёрий) Test Events коди, текширувдан кейин бўш қолдиринг |

## Ишга тушириш

```bash
npm install
npm run dev
```

## Vercel'га жойлаш

1. vercel.com → Add New Project → шу GitHub репозиторийни танланг
2. Environment Variables'ни қўшинг
3. Deploy
