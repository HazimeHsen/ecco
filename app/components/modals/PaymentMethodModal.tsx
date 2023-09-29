"use client";
import usePaymentMethodModal from "@/app/hooks/PaymentMethodModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Radio from "../RadioGroup/RadioGroup";

const PaymentMethodModal = () => {
  const PaymentMethodModal = usePaymentMethodModal();

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Payment Method" />
      <Radio labels={["On Delivered"]} />
    </div>
  );
  return (
    <Modal
      isOpen={PaymentMethodModal.isOpen}
      isText={true}
      title="Payment Method"
      actionLabel="Continue"
      onClose={PaymentMethodModal.onClose}
      onSubmit={PaymentMethodModal.onClose}
      body={bodyContent}
    />
  );
};

export default PaymentMethodModal;
