import { create } from "zustand";

interface IJobApplicationModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useJobApplicationModal = create<IJobApplicationModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useJobApplicationModal;
