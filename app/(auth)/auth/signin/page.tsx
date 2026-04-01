"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { HAIR_IMAGES } from "@/lib/image";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      router.push("/shop");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <img
            src={HAIR_IMAGES.authSignIn}
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
              YOUR HAIR,<br />
              <span className="text-gold-500">YOUR CROWN.</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
              Premium Vietnamese human hair crafted for perfection.
              Double drawn, ethically sourced, luxury guaranteed.
            </p>
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-black text-gold-500">500+</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Happy Clients</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-black text-gold-500">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Human Hair</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-black text-gold-500">10+</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Years Expert</p>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-xs">SlyHairs &copy; {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Right Side — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-black">
        <div className="w-full max-w-md space-y-10">
          {/* Logo */}
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black tracking-tighter text-white">
                SLY<span className="text-gold-500">HAIRS</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 bg-neutral-900 border-white/10 text-white placeholder:text-gray-600 rounded-2xl focus:border-gold-500 focus:ring-gold-500/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-14 bg-neutral-900 border-white/10 text-white placeholder:text-gray-600 rounded-2xl focus:border-gold-500 focus:ring-gold-500/20 transition-all"
                    required
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
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-gold-500 text-black font-black rounded-2xl hover:bg-gold-400 text-sm uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight size={18} />
                </span>
              )}
            </Button>

            <div className="text-right">
              <Link href="/auth/forgot-password" className="text-gold-500 text-xs font-medium hover:underline">
                Forgot your password?
              </Link>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-black text-gray-600 text-xs uppercase tracking-widest">
                New here?
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link href="/auth/signup">
              <Button
                variant="outline"
                className="w-full h-14 border-white/10 text-white hover:bg-white/5 hover:border-gold-500/30 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all"
              >
                Create an Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
