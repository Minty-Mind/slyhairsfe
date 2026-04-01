"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { apiClient } from "@/lib/api/client";
import { HAIR_IMAGES } from "@/lib/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiClient("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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
              DON&apos;T WORRY,<br />
              <span className="text-gold-500">WE GOT YOU.</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
              Reset your password and get back to shopping premium Vietnamese human hair.
            </p>
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
            <p className="text-gray-500 text-sm mt-2">Reset your password</p>
          </div>

          {sent ? (
            <div className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="mx-auto text-green-400" size={40} />
                <h3 className="text-white font-bold text-lg">Check Your Email</h3>
                <p className="text-gray-400 text-sm">
                  If an account exists for <span className="text-white font-medium">{email}</span>,
                  you&apos;ll receive a password reset link shortly.
                </p>
              </div>

              <div className="text-center">
                <Link href="/auth/signin">
                  <Button
                    variant="outline"
                    className="w-full h-14 border-white/10 text-white hover:bg-white/5 hover:border-gold-500/30 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all"
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}

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
                  <p className="text-gray-600 text-xs ml-1">
                    We&apos;ll send you a link to reset your password.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-gold-500 text-black font-black rounded-2xl hover:bg-gold-400 text-sm uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Reset Link
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
                    Remember it?
                  </span>
                </div>
              </div>

              <div className="text-center">
                <Link href="/auth/signin">
                  <Button
                    variant="outline"
                    className="w-full h-14 border-white/10 text-white hover:bg-white/5 hover:border-gold-500/30 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all"
                  >
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
