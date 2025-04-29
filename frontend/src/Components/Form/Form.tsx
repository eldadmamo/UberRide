import React from "react";

interface IProps {
  submitFn: any;
  className?: string;
  children: any
}

const Form: React.FC<IProps> = ({ submitFn, className, children }) => (
  <form
    className={className}
    onSubmit={e => {
      e.preventDefault();
      submitFn();
    }}
  >
    {children}
  </form>
);

export default Form;