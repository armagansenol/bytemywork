import s from "./contact.module.css"

import { ContactForm } from "@/components/shared/form-contact"
import { Wrapper } from "@/components/wrapper"
import { FormTranslations } from "@/types"
import { getTranslations } from "next-intl/server"

export default async function ContactPage() {
  const t = await getTranslations("contact")
  const formTranslations = t.raw("form") as FormTranslations

  return (
    <Wrapper className={s.contact} theme='dark' headerVariant='withLogo' withContactForm={false}>
      <section className='container-section grid grid-cols-24 gap-0 md:gap-8 space-y-10 md:space-y-0'>
        <div className='col-span-24 md:col-span-12 space-y-4'>
          <h1 className='text-3xl font-bold'>{t("title")}</h1>
          <p className='text-xl font-light max-w-xl leading-snug'>
            {t.rich("description", {
              span: (chunks) => <span className='font-semibold'>{chunks}</span>,
              br: () => <br />,
            })}
          </p>
        </div>
        <div className='col-span-24 md:col-span-12'>
          <ContactForm translations={formTranslations} />
        </div>
      </section>
    </Wrapper>
  )
}
