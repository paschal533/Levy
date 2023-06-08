const primaryBtn =
  "bg-[#0D98BA] text-sm minlg:text-lg py-2 px-6 minlg:py-4 minlg:px-8 font-poppins font-semibold text-white";
const outlineBtn =
  "border border-[#2d89e6] bg-transparent font-poppins font-semibold text-sm minlg:text-lg py-2 px-6 minlg:py-4 minlg:px-8";

const Button = ({ btnName, classStyles, btnType, handleClick }: any) => (
  <button
    type="button"
    className={
      btnType === "primary"
        ? `${primaryBtn} ${classStyles}`
        : `${outlineBtn} ${classStyles}`
    }
    onClick={handleClick}
  >
    {btnName}
  </button>
);

export default Button;
