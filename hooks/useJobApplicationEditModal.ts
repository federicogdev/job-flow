import { create } from "zustand";

interface IJobApplicationEditModalStore {
  isOpen: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

const useJobApplicationEditModal = create<IJobApplicationEditModalStore>(
  (set) => ({
    isOpen: false,
    id: "",
    onOpen: (id) => set(() => ({ isOpen: true, id })),
    onClose: () => set(() => ({ isOpen: false, id: "" })),
  })
);

export default useJobApplicationEditModal;
