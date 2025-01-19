import { ContactForm } from "@/components/shared/form-contact"
import { Wrapper } from "@/components/wrapper"

export default async function Page() {
  return (
    <Wrapper theme="dark" headerVariant="withLogo">
      <section className="container-section grid grid-cols-24 gap-4 md:gap-8 py-12 md:py-12">
        <div className="col-span-24 md:col-span-12 space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">DROP A LINE</h1>
          <p className="text-lg md:text-xl font-light max-w-xl">
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
