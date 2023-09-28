import { create } from "zustand";

interface LoadingStateState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoadingState = create<LoadingStateState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoadingState;
