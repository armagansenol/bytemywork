import s from "./contact.module.css"

import { ContactForm } from "@/components/shared/form-contact"
import { Wrapper } from "@/components/wrapper"

export default async function Page() {
  return (
    <Wrapper className={s.contact} theme="dark" headerVariant="withLogo">
      <section className="container-section grid grid-cols-24 gap-0 md:gap-8 py-12 md:py-12 space-y-10 md:space-y-0">
        <div className="col-span-24 md:col-span-12 space-y-4">
          <h1 className="text-3xl font-bold">DROP A LINE</h1>
          <p className="text-xl font-light max-w-xl leading-snug">
            CURIOUS? EXCITED? <span className="font-semibold">SO WE ARE!</span>
            <br />
            SINCE YOU&apos;RE HERE, LET&apos;S TALK ABOUT THE PROJECT ON YOUR MIND.
          </p>
        </div>
        <div className="col-span-24 md:col-span-12">
          <ContactForm />
        </div>
      </section>
    </Wrapper>
  )
}
