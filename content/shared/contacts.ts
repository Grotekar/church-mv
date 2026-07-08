export const churchContacts = {
  description:
    "По вопросам о богослужениях, служениях или встречах можно связаться с церковью указанным способом.",
  person: {
    // TODO: заменить на имя контактного лица, если церковь хочет публиковать его на сайте.
    name: "Людмила",
    // TODO: заменить на роль контактного лица, если она должна отображаться.
    role: "администратор",
  },
  phone: {
    // TODO: заменить на реальный публичный телефон церкви.
    label: "Телефон",
    // TODO: заменить на реальный публичный телефон церкви.
    value: "+7 (999) 999-99-99",
    // TODO: заменить на tel-ссылку с тем же номером в международном формате, например tel:+79000000000.
    href: "tel:+79000000000",
  },
  email: {
    label: "Email",
    // TODO: заменить на реальный публичный email церкви, если он используется.
    value: "email@examplet.com",
    // TODO: заменить на mailto-ссылку с тем же адресом, например mailto:info@example.com.
    href: "mailto:email@exadmple.com",
  },
  telegram: {
    label: "Telegram",
    // TODO: заменить на реальную ссылку Telegram, если канал связи используется.
    href: "https://t.me/...",
  },
  whatsapp: {
    label: "WhatsApp",
    // TODO: заменить на реальную ссылку WhatsApp, если канал связи используется.
    href: "https://wa.me/...",
  },
  vk: {
    label: "VK",
    // TODO: заменить на реальную ссылку VK, если страница используется.
    href: "https://vk.com/church_mv",
  },
  maps: {
    yandex: {
      label: "Открыть в Яндекс.Картах",
      href: "https://yandex.ru/maps/-/CTuUj0~7",
    },
    gis2: {
      label: "Открыть в 2ГИС",
      href: "https://go.2gis.com/0YWxt",
    },
  },
} as const;
