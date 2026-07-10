export const churchDonations = {
  methodNote: "Пожертвование осуществляется через СберБанк Онлайн.",
  purposeNote: "Назначение платежа: «На уставную деятельность».",
  legalNotice: {
    prefix: "Переходя по ссылке/выполняя перевод, вы соглашаетесь с условиями",
    separator: "и",
    documents: [
      {
        label: "Публичной оферты о пожертвовании",
        // TODO: положить утверждённый документ в public/documents/ и заменить путь.
        href: "PLACEHOLDER: /documents/public-offer.pdf",
        downloadName: "public-offer.pdf",
      },
      {
        label: "Политикой конфиденциальности",
        // TODO: положить утверждённый документ в public/documents/ и заменить путь.
        href: "PLACEHOLDER: /documents/privacy-policy.pdf",
        downloadName: "privacy-policy.pdf",
      },
    ],
  },
  // TODO: заменить на реальную ссылку для пожертвований на мобильных устройствах.
  link: "https://www.sberbank.com/sms/mybill?cs=1847753366852",
  // TODO: положить QR-код в public/ и заменить путь, например /donation-qr.png.
  qrSrc: "/donation-qr.png",
  qrAlt: "QR-код для пожертвований",
} as const;
