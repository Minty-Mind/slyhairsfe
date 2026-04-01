"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { apiClient } from "@/lib/api/client";
import { HAIR_IMAGES } from "@/lib/image";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const passwordChecks = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Passwords match", met: password.length > 0 && password === confirmPassword },
  ];

  const canSubmit = passwordChecks.every((c) => c.met) && token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token. Please request a new link.");
      return;
    }

    setLoading(true);

    try {
      await apiClient("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      setSuccess(true);
      setTimeout(() => router.push("/auth/signin"), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 space-y-3">
            <h3 className="text-white font-bold text-lg">Invalid Reset Link</h3>
            <p className="text-gray-400 text-sm">
              This password reset link is invalid or has expired.
            </p>
          </div>
          <Link href="/auth/forgot-password">
            <Button className="w-full h-14 bg-gold-500 text-black font-black rounded-2xl hover:bg-gold-400 text-sm uppercase tracking-widest">
              Request New Link
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
              FRESH START,<br />
              <span className="text-gold-500">NEW PASSWORD.</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-md leading-relaxed">
              Choose a strong password to secure your SlyHairs account.
            </p>
          </div>
          <p className="text-gray-600 text-xs">SlyHairs &copy; {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Right Side — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-black">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black tracking-tighter text-white">
                SLY<span className="text-gold-500">HAIRS</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm mt-2">Create your new password</p>
          </div>

          {success ? (
            <div className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="mx-auto text-green-400" size={40} />
                <h3 className="text-white font-bold text-lg">Password Reset!</h3>
                <p className="text-gray-400 text-sm">
                  Your password has been updated. Redirecting to sign in...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-14 bg-neutral-900 border-white/10 text-white placeholder:text-gray-600 rounded-2xl focus:border-gold-500 focus:ring-gold-500/20 transition-all"
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
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-12 h-14 bg-neutral-900 border-white/10 text-white placeholder:text-gray-600 rounded-2xl focus:border-gold-500 focus:ring-gold-500/20 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

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
                    Resetting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Reset Password
                    <ArrowRight size={18} />
                  </span>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-6 h-6 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
