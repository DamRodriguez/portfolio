"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import MotionFade from "@/components/motion/MotionFade";
import MotionStagger from "@/components/motion/MotionStagger";
import Button from "@/components/ui/buttons/Button";
import { ContactSchema, ContactSchemaFieldNames, type ContactSchemaType } from "@/features/contact/schemas/ContactSchema";
import Form from "@/components/ui/form/Form";
import useFormError from "@/hooks/useFormError";
import { useTranslations } from "next-intl";
import { SendIcon } from "@/components/icons/buttons";
import showToast from "@/components/toast/Toast";

const ContactForm = () => {
  const t = useTranslations();
  const methods = useForm<ContactSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    resolver: zodResolver(ContactSchema),
    mode: "onSubmit",
    criteriaMode: "all",
    shouldFocusError: false,
    reValidateMode: "onSubmit",
  });
  const { apiErrorMessage, setApiErrorMessage } = useFormError(
    methods.formState,
  );

  const onSubmit = async (data: ContactSchemaType) => {
    setApiErrorMessage(undefined);

    if (data.honeypot) {
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `Nuevo mensaje de ${data.name}`,
        }),
      });

      const json = await res.json();

      if (json.success) {
        methods.reset();
        showToast(
          "success",
          t("contactSection.toast.messages.contactFormSuccess")
        );
        return;
      }

      showToast(
        "error",
        t("contactSection.toast.messages.contactFormError")
      );

    } catch (error) {
      console.error("Web3Forms error:", error);

      showToast(
        "error",
        t("contactSection.toast.messages.contactFormError")
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={onSubmit}
        methods={methods}
        className="flex flex-col gap-[1.5rem]"
      >
        <MotionStagger className="flex flex-col gap-[1.5rem]">
          <Form.InputText
            label={t("contactSection.form.nameInput.label")}
            placeholder={t("contactSection.form.nameInput.placeholder")}
            name={ContactSchemaFieldNames.name}
            error={apiErrorMessage !== undefined}
            errorMessage={apiErrorMessage}
            isLastErrorMessageField={false}
          />
          <Form.InputText
            label={t("contactSection.form.emailInput.label")}
            placeholder={t("contactSection.form.emailInput.placeholder")}
            name={ContactSchemaFieldNames.email}
            error={apiErrorMessage !== undefined}
            errorMessage={apiErrorMessage}
            isLastErrorMessageField={false}
          />
          <Form.InputTextArea
            label={t("contactSection.form.textAreaInput.label")}
            placeholder={t("contactSection.form.textAreaInput.placeholder")}
            name={ContactSchemaFieldNames.message}
            error={apiErrorMessage !== undefined}
            errorMessage={apiErrorMessage}
            isLastErrorMessageField
            className="min-h-[11rem]"
          />
          <div style={{ position: "absolute", left: "-9999px" }}>
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              {...methods.register("honeypot")}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
        </MotionStagger>
        <MotionFade className="w-full">
          <Button
            variant="primary"
            type="submit"
            full
            isLoading={methods.formState.isSubmitting}
          >
            {t("contactSection.buttons.sendMessage")}
            <SendIcon />
          </Button>
        </MotionFade>
      </Form>
    </FormProvider>
  );
};

export default ContactForm;
