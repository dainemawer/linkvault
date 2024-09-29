import { ReactNode } from "react";

export interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  title?: string;
  description?: string;
}

// Define action types for opening and closing the modal
export type ModalAction =
  | { type: "OPEN_MODAL"; payload: ReactNode }
  | { type: "CLOSE_MODAL" };