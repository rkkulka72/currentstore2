import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import FormInput from "@/components/FormInput";
import { Mail, Lock } from "lucide-react";
import { Eye, EyeOff, ShieldCheck, AlertTriangle } from "lucide-react";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(v => !v);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const { email, password, confirmPassword } = formData;
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    setSuccess("Account created successfully! You can now sign in.");
    setFormData({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <>
      <Head>
        <title>Create Your Account – Agent Storage</title>
      </Head>
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-900 p-4 font-sans text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900 to-slate-900" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-50 animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000" />
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Join Agent Storage</h1>
            <p className="mt-4 text-lg text-slate-300">Your secure hub for managing agent data.</p>
          </div>
          <div className="rounded-2xl border border-slate-700/80 bg-slate-800/50 p-8 shadow-2xl shadow-black/40 backdrop-blur-lg">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <FormInput id="email" label="Email" type="email" placeholder="Email Address"
                value={formData.email} onChange={handleChange} icon={<Mail size={20}/>}/>
              <FormInput id="password" label="Password"
                type={isPasswordVisible ? "text" : "password"} placeholder="Password (8+ characters)"
                value={formData.password} onChange={handleChange} icon={<Lock size={20}/>}
                isPassword isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility}/>
              <FormInput id="confirmPassword" label="Confirm Password"
                type={isPasswordVisible ? "text" : "password"} placeholder="Confirm Password"
                value={formData.confirmPassword} onChange={handleChange} icon={<Lock size={20}/>}
                isPassword/>
              {error && <div className="flex items-center space-x-3 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
                <AlertTriangle className="h-5 w-5 flex-shrink-0"/><span>{error}</span></div>}
              {success && <div className="flex items-center space-x-3 rounded-lg bg-green-500/10 p-3 text-sm text-green-400 border border-green-500/20">
                <ShieldCheck className="h-5 w-5 flex-shrink-0"/><span>{success}</span></div>}
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 ease-in-out transform hover:scale-105">
                Create Account
              </button>
            </form>
          </div>
          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account? <a href="/login" className="font-medium text-blue-400 hover:text-blue-300">Sign In</a>
          </p>
        </div>
      </main>
    </>
  );
};

export default RegistrationPage;
