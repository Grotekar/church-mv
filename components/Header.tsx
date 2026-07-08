import Image from "next/image";
import { churchContent } from "@/content/church";
import { isPlaceholder } from "@/lib/placeholders";
import { withBasePath } from "@/lib/paths";

const baseNavigation = [
  { label: "О церкви", href: "#about" },
  { label: "Вера", href: "#faith" },
  { label: "Богослужения", href: "#services" },
];

export function Header() {
  const hasLogo = !isPlaceholder(churchContent.logoSrc);
  const navigation = [
    ...baseNavigation,
    ...(churchContent.ministries.length > 0
      ? [{ label: "Служения", href: "#ministries" }]
      : []),
    { label: "Адрес", href: "#address" },
    { label: "Контакты", href: "#contacts" },
  ];

  return (
    <header className="bg-church-background/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-8">
        <a className="flex min-w-0 flex-1 items-center gap-3 text-xs font-semibold leading-5 text-church-text sm:text-sm md:max-w-none" href="#">
          {hasLogo ? (
            <Image
              alt={churchContent.logoAlt}
              className="h-8 w-8 shrink-0 object-contain"
              height={32}
              src={withBasePath(churchContent.logoSrc)}
              width={32}
            />
          ) : null}
          <span className="min-w-0">{churchContent.name}</span>
        </a>
        <nav aria-label="Основная навигация" className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <a
              className="text-sm text-church-muted transition-colors hover:text-church-text focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-2 focus:ring-offset-church-background"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="inline-flex min-h-10 shrink-0 items-center rounded-md border border-church-accent px-3 text-sm font-medium text-church-accent transition-colors hover:bg-church-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-church-accent focus:ring-offset-2 focus:ring-offset-church-background sm:px-4 md:hidden"
          href="#contacts"
        >
          Контакты
        </a>
      </div>
    </header>
  );
}
