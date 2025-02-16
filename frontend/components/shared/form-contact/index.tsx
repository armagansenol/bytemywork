"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { useForm, Control } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { FormTranslations } from "@/types"

interface FormContactProps {
  translations: FormTranslations
}

const getFormSchema = (translations: FormTranslations) =>
  z.object({
    name: z.string().min(1, { message: translations.inputs.name.error }),
    email: z.string().email({ message: translations.inputs.email.error }),
    phone: z.string().min(1, { message: translations.inputs.phone.error }),
    budget: z
      .enum(["<100000", "100000-200000", ">200000"], {
        required_error: translations.inputs.budget.error,
      })
      .nullable(),
    projectDetails: z.string().min(1, { message: translations.inputs.projectDetails.error }),
  })

type FormValues = z.infer<ReturnType<typeof getFormSchema>>

const commonInputStyles =
  "bg-transparent border-b border-dynamic-black rounded-none px-0 transition-colors duration-300 ease-in-out"

interface FormInputProps {
  name: keyof FormValues
  control: Control<FormValues>
  placeholder: string
  type?: string
  className?: string
}

const FormInput = ({ name, control, placeholder, type = "text", className }: FormInputProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            value={field.value ?? ""}
            className={`${commonInputStyles} py-6 ${className}`}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

interface RadioOptionProps {
  id: string
  value: string
  label: string
}

const RadioOption = ({ id, value, label }: RadioOptionProps) => (
  <div className="flex items-center">
    <RadioGroupItem value={value} id={id} className="peer hidden" />
    <FormLabel
      htmlFor={id}
      className="px-6 py-2 border rounded-full text-namara-grey border-namara-grey cursor-pointer peer-data-[state=checked]:border-white peer-data-[state=checked]:text-white hover:border-white hover:text-white transition-colors"
    >
      {label}
    </FormLabel>
  </div>
)

export function ContactForm({ translations }: FormContactProps) {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(getFormSchema(translations)),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      budget: null,
      projectDetails: "",
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok) {
          setMessage({ type: "error", text: result.message || "Failed to submit form" })
          throw new Error(result.message || "Failed to submit form")
        }

        setMessage({ type: "success", text: result.message })
        return result
      } catch (error) {
        console.error("Form submission error:", error)
        throw error
      }
    },
    onSuccess: () => {
      form.reset({
        name: "",
        email: "",
        phone: "",
        budget: null,
        projectDetails: "",
      })

      form.clearErrors()
      form.setValue("budget", null, {
        shouldValidate: true,
        shouldDirty: false,
        shouldTouch: false,
      })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    },
    onError: () => {
      // Clear error message after 5 seconds
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    },
  })

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInput control={form.control} name="name" placeholder={translations.inputs.name.placeholder} />
        <FormInput
          control={form.control}
          name="email"
          type="email"
          placeholder={translations.inputs.email.placeholder}
        />
        <FormInput control={form.control} name="phone" type="tel" placeholder={translations.inputs.phone.placeholder} />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-namara-grey text-sm font-medium">{translations.inputs.budget.label}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                  className="flex flex-wrap gap-3"
                >
                  <RadioOption id="low" value="<100000" label={translations.inputs.budget.options.low} />
                  <RadioOption id="medium" value="100000-200000" label={translations.inputs.budget.options.medium} />
                  <RadioOption id="high" value=">200000" label={translations.inputs.budget.options.high} />
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-namara-grey font-light">{translations.inputs.projectDetails.label}</FormLabel>
              <FormControl>
                <Textarea {...field} className={`${commonInputStyles} py-2 min-h-[100px]`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-white text-black hover:bg-gray-200 rounded-none py-4 md:py-6 text-sm md:text-base"
        >
          {mutation.isPending ? translations.submit.sending : translations.submit.default}
        </Button>
      </form>
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-center py-6 my-4 ${message.type === "success" ? "text-green-400" : "text-red"}`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>
    </Form>
  )
}
