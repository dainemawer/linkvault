"use client";

import React, { createContext, useReducer, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/app/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalState, ModalAction } from "@/app/types/modal";

// Define the initial modal state
const initialModalState: ModalState = {
  isOpen: false,
  content: null,
  title: "",
  description: "",
};

// Create the reducer to manage modal state changes
const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        isOpen: true,
        content: action.payload,
        title: "Add a Bookmark",
        description: "Add a bookmark to your collection by entering the URL",
      };
    case "CLOSE_MODAL":
      return {
        isOpen: false,
        content: null,
        title: "",
        description: "",
      };
    default:
      return state;
  }
};

// Create the Modal Context
export const ModalContext = createContext<{
  state: ModalState;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
} | null>(null);

// Modal Provider component that wraps the rest of the app
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(modalReducer, initialModalState);

  // Function to open the modal and set its content
  const openModal = (content: ReactNode) => {
    dispatch({ type: "OPEN_MODAL", payload: content });
  };

  // Function to close the modal
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <ModalContext.Provider value={{ state, openModal, closeModal }}>
      {children}
      <Dialog open={state.isOpen} onOpenChange={closeModal}>
        <DialogTitle>{state.title}</DialogTitle>
        <DialogDescription>{state.description}</DialogDescription>
        <DialogContent>{state.content}</DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};
