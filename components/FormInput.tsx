import { FC, ChangeEvent } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  isPassword?: boolean;
  isPasswordVisible?: boolean;
  togglePasswordVisibility?: () => void;
}

const FormInput: FC<FormInputProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
  isPassword,
  isPasswordVisible,
  togglePasswordVisibility,
}) => (
  <div className="relative">
    <label htmlFor={id} className="sr-only">{label}</label>
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
      {icon}
    </div>
    <input
      id={id}
      name={id}
      type={type}
      required
      minLength={isPassword ? 8 : undefined}
      className="block w-full rounded-lg border border-slate-300/30 bg-slate-900/50 py-3 pl-12 pr-4 text-slate-50 placeholder-slate-400 backdrop-blur-sm transition duration-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {isPassword && togglePasswordVisibility && (
      <button type="button" onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-200 transition">
        {isPasswordVisible ? <EyeOff size={20}/> : <Eye size={20}/>}
      </button>
    )}
  </div>
);

export default FormInput;
