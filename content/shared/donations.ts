export const churchDonations = {
  methodNote: "Пожертвование осуществляется через СберОнлайн.",
  purposeNote: "Назначение платежа: «На уставную деятельность».",
  // TODO: заменить на реальную ссылку для пожертвований на мобильных устройствах.
  link: "https://www.sberbank.com/sms/mybill?cs=1847753366852",
  // TODO: положить QR-код в public/ и заменить путь, например /donation-qr.png.
  qrSrc: "/donation-qr.png",
  qrAlt: "QR-код для пожертвований",
} as const;
