"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  budget: z
    .enum(["<100000", "100000-200000", ">200000"], {
      required_error: "Please select a budget range",
    })
    .nullable(),
  projectDetails: z.string().min(1, { message: "Please specify your project needs" }),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="ENTER YOUR NAME*"
                  {...field}
                  className="bg-transparent border-b border-dynamic-black rounded-none px-0 py-6 transition-colors duration-300 ease-in-out"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="ENTER YOUR EMAIL*"
                  type="email"
                  {...field}
                  className="bg-transparent border-b border-dynamic-black rounded-none px-0 py-6 transition-colors duration-300 ease-in-out"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="ENTER YOUR PHONE"
                  type="tel"
                  {...field}
                  className="bg-transparent border-b border-dynamic-black rounded-none px-0 py-6 transition-colors duration-300 ease-in-out"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-namara-grey text-sm font-medium">BUDGET*</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                  className="flex flex-wrap gap-3"
                >
                  <div className="flex items-center">
                    <RadioGroupItem value="<100000" id="low" className="peer hidden" />
                    <FormLabel
                      htmlFor="low"
                      className="px-6 py-2 border rounded-full text-namara-grey border-namara-grey cursor-pointer peer-data-[state=checked]:border-white peer-data-[state=checked]:text-white hover:border-white transition-colors"
                    >
                      {"< 100.000₺"}
                    </FormLabel>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="100000-200000" id="medium" className="peer hidden" />
                    <FormLabel
                      htmlFor="medium"
                      className="px-6 py-2 border rounded-full text-namara-grey border-namara-grey cursor-pointer peer-data-[state=checked]:border-white peer-data-[state=checked]:text-white hover:border-white transition-colors"
                    >
                      100.000₺ - 200.000₺
                    </FormLabel>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value=">200000" id="high" className="peer hidden" />
                    <FormLabel
                      htmlFor="high"
                      className="px-6 py-2 border rounded-full text-namara-grey border-namara-grey cursor-pointer peer-data-[state=checked]:border-white peer-data-[state=checked]:text-white hover:border-white hover:text-white transition-colors"
                    >
                      {"> 200.000₺"}
                    </FormLabel>
                  </div>
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
              <FormLabel className="text-namara-grey font-light">PLEASE SPECIFY YOUR NEEDS</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="bg-transparent border-b border-dynamic-black rounded-none px-0 py-2 transition-colors duration-300 ease-in-out min-h-[100px]"
                />
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
          {mutation.isPending ? "SENDING..." : "[ SEND ]"}
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
