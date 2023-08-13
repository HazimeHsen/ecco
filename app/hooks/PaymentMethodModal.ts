import { create } from "zustand";

interface PaymentMethodState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePaymentMethodModal = create<PaymentMethodState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePaymentMethodModal;
