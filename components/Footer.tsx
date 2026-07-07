import { churchContent } from "@/content/church";
import { isPlaceholder } from "@/lib/placeholders";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const hasAddress = !isPlaceholder(churchContent.address.text);
  const hasPhone = !isPlaceholder(churchContent.contacts.phone.label);

  return (
    <footer className="bg-church-text text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(220px,320px)]">
        <div>
          <p className="text-lg font-semibold">{churchContent.name}</p>
          <p className="mt-2 text-sm text-white/75">{churchContent.identity}</p>
        </div>
        <div className="space-y-2 text-sm leading-6 text-white/75">
          {hasAddress ? <p>{churchContent.address.text}</p> : null}
          {hasPhone ? <p>{churchContent.contacts.phone.label}</p> : null}
          <p>© {currentYear} {churchContent.name}</p>
        </div>
      </div>
    </footer>
  );
}
