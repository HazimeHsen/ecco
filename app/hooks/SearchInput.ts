import { create } from "zustand";

interface SearchInputModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchInputModal = create<SearchInputModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchInputModal;
