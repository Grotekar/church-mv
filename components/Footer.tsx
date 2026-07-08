import { churchContent } from "@/content/church";
import { churchContacts } from "@/content/shared/contacts";
import { churchIdentity } from "@/content/shared/churchIdentity";
import { isPlaceholder } from "@/lib/placeholders";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const hasAddress = !isPlaceholder(churchContent.address.text);
  const hasPhone =
    !isPlaceholder(churchContacts.phone.value) &&
    !isPlaceholder(churchContacts.phone.href);
  const legal = churchIdentity.legal;
  const legalItems = [
    { label: "ИНН/КПП", value: legal.taxRegistration },
    { label: "ОГРН", value: legal.ogrn },
    { label: "Регистрация", value: legal.registrationCertificate },
  ].filter((item) => !isPlaceholder(item.value));
  const hasLegal = !isPlaceholder(legal.fullName) || legalItems.length > 0;

  return (
    <footer className="bg-church-text text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(220px,320px)]">
        <div>
          <p className="text-lg font-semibold">{churchIdentity.name}</p>
          <p className="mt-2 text-sm text-white/75">{churchIdentity.identity}</p>
        </div>
        <div className="space-y-2 text-sm leading-6 text-white/75">
          {hasAddress ? <p>{churchContent.address.text}</p> : null}
          {hasPhone ? (
            <a className="block" href={churchContacts.phone.href}>
              {churchContacts.phone.value}
            </a>
          ) : null}
          <p>© {currentYear} {churchIdentity.name}</p>
        </div>
        {hasLegal ? (
          <div className="border-t border-white/10 pt-5 text-xs leading-6 text-white/60 md:col-span-2">
            {!isPlaceholder(legal.fullName) ? <p>{legal.fullName}</p> : null}
            {legalItems.length > 0 ? (
              <dl className="mt-2 flex flex-col gap-x-5 gap-y-1 sm:flex-row sm:flex-wrap">
                {legalItems.map((item) => (
                  <div key={item.label}>
                    <dt className="inline">{item.label}: </dt>
                    <dd className="inline">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
