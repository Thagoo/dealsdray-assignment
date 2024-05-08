"use client";
import React, { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const overlayClasses = isOpen
    ? "fixed inset-0 bg-black opacity-80"
    : "hidden";
  const modalClasses = isOpen
    ? "fixed inset-1/2 transform -translate-y-1/2 -translate-x-1/2  p-8 rounded-md h-[80vh] w-[80vh]"
    : "hidden";

  return (
    <>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={modalClasses}>
        <div className="flex justify-end">
          <button className=" text-white text-2xl" onClick={onClose}>
            &times;
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default Modal;
