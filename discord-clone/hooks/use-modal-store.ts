import { Server } from "@prisma/client";
import { create } from "zustand"

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer";

interface ModelData {
    server?: Server
}

interface ModelStore {
    type: ModalType | null;
    data: ModelData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModelData) => void;
    onClose: ()=> void;
}

export const UseModel = create<ModelStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: ( type, data={} ) => set({ isOpen: true, type, data}),
    onClose: () => set({ type: null, isOpen: false, data: {} })
}))