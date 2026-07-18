"use client";
import { SendIcon } from "@/components/icons/buttons";
import MotionFade from "@/components/motion/MotionFade";
import MotionStagger from "@/components/motion/MotionStagger";
import showToast from "@/components/toast/Toast";
import Button from "@/components/ui/buttons/Button";
import Form from "@/components/ui/form/Form";
import { BaseOption } from "@/components/ui/inputs/InputCombobox";
import { routes } from "@/constants/routes";
import {
  ContactSchema,
  ContactSchemaFieldNames,
  type ContactSchemaType,
} from "@/features/contact/schemas/ContactSchema";
import useFormError from "@/hooks/useFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";

const ContactForm = () => {
  const t = useTranslations();
  const methods = useForm<ContactSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      option: undefined,
      message: "",
    },
    resolver: zodResolver(ContactSchema),
    mode: "onSubmit",
  });

  const { apiErrorMessage } = useFormError(methods.formState);

  const inputCommonProps = {
    error: apiErrorMessage !== undefined,
    errorMessage: apiErrorMessage,
  };

  const consultationOptions = [
    {
      id: 1,
      text: t("contactSection.form.optionsInput.options.jobOpportunity"),
    },
    {
      id: 2,
      text: t("contactSection.form.optionsInput.options.freelanceProject"),
    },
    {
      id: 3,
      text: t("contactSection.form.optionsInput.options.collaboration"),
    },
    {
      id: 4,
      text: t("contactSection.form.optionsInput.options.generalInquiry"),
    },
  ];

  interface ConsultationOptionType extends BaseOption {
    text: string;
  }

  const renderConsultationOption = (option: BaseOption) => {
    const consultation = option as ConsultationOptionType;
    return <p>{consultation.text}</p>;
  };

  const onSubmit = async (data: ContactSchemaType) => {
    try {
      const response = await fetch(routes.api.contact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      showToast(
        "success",
        t("contactSection.toast.messages.contactFormSuccess"),
      );
      methods.reset();
    } catch {
      showToast("error", t("contactSection.toast.messages.contactFormError"));
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
            {...inputCommonProps}
            label={t("contactSection.form.nameInput.label")}
            placeholder={t("contactSection.form.nameInput.placeholder")}
            name={ContactSchemaFieldNames.name}
          />
          <Form.InputText
            {...inputCommonProps}
            label={t("contactSection.form.emailInput.label")}
            placeholder={t("contactSection.form.emailInput.placeholder")}
            name={ContactSchemaFieldNames.email}
          />
          <Form.InputCombobox
            {...inputCommonProps}
            label={t("contactSection.form.optionsInput.label")}
            placeholder={t("contactSection.form.optionsInput.placeholder")}
            name={ContactSchemaFieldNames.option}
            options={consultationOptions}
            renderOption={renderConsultationOption}
          />
          <Form.InputTextArea
            {...inputCommonProps}
            label={t("contactSection.form.textAreaInput.label")}
            placeholder={t("contactSection.form.textAreaInput.placeholder")}
            name={ContactSchemaFieldNames.message}
            isLastErrorMessageField
            className="min-h-[11rem]"
          />
          <div
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0 }}
          >
            <label htmlFor="website">Sitio web personal</label>
            <input
              type="text"
              id="website"
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
            className="shadow-s3 dark:shadow-s1"
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
