import { useRef } from "react";
import Image from "next/image";
//import { useTheme } from 'next-themes';

import images from "../../../assets";

const Modal = ({ header, body, footer, handleClose } : any) => {
  const modalRef = useRef(null);
  //const { theme } = useTheme();

  // check if it is cliked outside of modalRef
  const handleClickOutside = (e : any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  return (
    <div
      onClick={handleClickOutside}
      className="flexCenter fixed text-white inset-0 z-10 bg-overlay-black animated fadeIn"
    >
      <div
        ref={modalRef}
        className="w-2/5 minlg:w-2/4 bg-[#24252D] flex flex-col rounded-lg"
      >
        <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6">
          <div
            className="relative w-3 h-3 minlg:w-6 minlg:h-6 cursor-pointer"
            onClick={handleClose}
          >
            <Image alt="logo" src={images.cross} layout="fill" />
          </div>
        </div>

        <div className="flexCenter w-full text-center p-4">
          <h2 className="font-poppins text-white font-normal text-2xl">
            {header}
          </h2>
        </div>
        <div className="p-10 px-4 border-t border-b border-[#2A2D3A]">
          {body}
        </div>
        <div className="flexCenter p-4">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
