import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`text-white font-regular py-2 px-4 bg-purple-700 hover:bg-purple-900 rounded-md ${props.className}`}
    >
      {children}
    </button>
  );
};
