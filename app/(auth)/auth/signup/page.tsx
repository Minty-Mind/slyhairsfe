"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { registerUser } from "@/lib/api/auth";
import { HAIR_IMAGES } from "@/lib/image";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordChecks = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Passwords match", met: password.length > 0 && password === confirmPassword },
  ];

  const canSubmit = passwordChecks.every((c) => c.met) && email.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await registerUser({ email, password, name: name || undefined });

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created! Please sign in.");
        router.push("/auth/signin");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <img
            src={HAIR_IMAGES.authSignUp}
            alt="Luxury Hair"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <div />
          <div className="space-y-6">
            <h2 className="text-5xl font-black text-white tracking-tight leading-tight">
              JOIN THE<br />
              <span className="text-gold-500">SLY FAMILY.</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
              Create your account and unlock access to premium Vietnamese
              human hair, exclusive deals, and order tracking.
            </p>
            <div className="space-y-3 pt-4">
              {["Exclusive member pricing", "Order tracking & history", "Early access to new arrivals", "Wholesale opportunities"].map((perk) => (
                <div key={perk} className="flex items-center gap-3">
                  <CheckCircle2 className="text-gold-500 shrink-0" size={16} />
                  <span className="text-gray-300 text-sm">{perk}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-600 text-xs">SlyHairs &copy; {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Right Side — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-black">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black tracking-tighter text-white">
                SLY<span className="text-gold-500">HAIRS</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm mt-2">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <Input
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12 h-14 bg-neutral-900 border-white/10 text-white placeholder:text-gray-600 rounded-2xl focus:border-gold-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 bg-neutral-900 border-white/10 text-white placeholder:text-gray-600 rounded-2xl focus:border-gold-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-14 bg-neutral-900 border-white/10 text-white placeholder:text-gray-600 rounded-2xl focus:border-gold-500 transition-all"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gold-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-12 h-14 bg-neutral-900 border-white/10 text-white placeholder:text-gray-600 rounded-2xl focus:border-gold-500 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Strength */}
            {password.length > 0 && (
              <div className="space-y-2 px-1">
                {passwordChecks.map((check) => (
                  <div key={check.label} className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                      check.met ? "bg-green-500 border-green-500" : "border-gray-600"
                    }`}>
                      {check.met && <CheckCircle2 size={10} className="text-black" />}
                    </div>
                    <span className={`text-xs ${check.met ? "text-green-400" : "text-gray-500"}`}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !canSubmit}
              className="w-full h-14 bg-gold-500 text-black font-black rounded-2xl hover:bg-gold-400 text-sm uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account
                  <ArrowRight size={18} />
                </span>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-black text-gray-600 text-xs uppercase tracking-widest">
                Already a member?
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link href="/auth/signin">
              <Button
                variant="outline"
                className="w-full h-14 border-white/10 text-white hover:bg-white/5 hover:border-gold-500/30 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all"
              >
                Sign In Instead
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
