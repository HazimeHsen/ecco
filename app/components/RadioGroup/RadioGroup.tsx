"use client";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Button } from "../ui/button";
import usePaymentMethodModal from "@/app/hooks/PaymentMethodModal";
import { useRouter } from "next/navigation";

interface RadioProps {
  labels: string[];
}

const Radio: React.FC<RadioProps> = ({ labels }) => {
  const router = useRouter();
  const PaymentMethodModal = usePaymentMethodModal();
  const FormSchema = z.object({
    type: z.enum(labels as [string, ...string[]], {
      required_error: "You need to select a notification type.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const paymentMethodFromCookies = Cookies.get("PaymentMethod");
  const defaultPaymentMethod = paymentMethodFromCookies
    ? JSON.parse(paymentMethodFromCookies)
    : labels[0]; // Fallback to the first label if no value in cookies

  useEffect(() => {
    // Set the default value to the retrieved PaymentMethod
    form.setValue("type", defaultPaymentMethod);
  }, [form, defaultPaymentMethod]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    Cookies.set("PaymentMethod", JSON.stringify(data.type));
    PaymentMethodModal.onClose();

    const queryParams = new URLSearchParams(window.location.search);
    const redirectParam = queryParams?.get("redirect") || "";
    router.push(redirectParam);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1">
                  {labels.map((label) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value={label}
                          checked={field.value === label}
                        />
                      </FormControl>
                      <FormLabel className="font-semibold text-lg">
                        {label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full py-3" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default Radio;
