"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProfile, updateProfile, changePassword } from "@/lib/api/user";
import { User, Lock, Mail, Package, ArrowLeft, Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import type { User as UserType } from "@/types";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile form
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  // Password form
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      getProfile()
        .then((res) => {
          setUser(res.user);
          setName(res.user.name || "");
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [status]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateProfile({ name });
      setUser(res.user);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setChangingPassword(true);
    try {
      await changePassword({ currentPassword, newPassword });
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 className="text-gold-500 animate-spin" size={32} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-black">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gold-500 text-sm font-medium hover:underline flex items-center gap-1 mb-6">
          <ArrowLeft size={14} /> Back to Store
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">My Account</h1>
          <div className="h-1 w-12 bg-gold-500 mt-2" />
        </div>

        <div className="space-y-6">
          {/* Profile Info */}
          <div className="bg-neutral-900 rounded-2xl p-6 border border-white/5">
            <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <User size={18} className="text-gold-500" />
              Profile Information
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                  <Input
                    type="email"
                    value={user.email}
                    disabled
                    className="pl-12 h-12 bg-black/50 border-white/5 text-gray-500 rounded-xl cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12 h-12 bg-black border-white/10 text-white rounded-xl focus:border-gold-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>Role: <span className="text-gold-500 font-bold uppercase">{user.role}</span></span>
                <span className="text-white/10">|</span>
                <span>Joined: {new Date(user.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</span>
              </div>

              <Button
                type="submit"
                disabled={saving}
                className="bg-gold-500 text-black font-bold rounded-xl hover:bg-gold-400 h-11 px-6 uppercase tracking-wider text-xs"
              >
                {saving ? (
                  <><Loader2 size={14} className="mr-2 animate-spin" /> Saving...</>
                ) : (
                  <><CheckCircle2 size={14} className="mr-2" /> Save Changes</>
                )}
              </Button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-neutral-900 rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <Lock size={18} className="text-gold-500" />
                Password
              </h2>
              {!showPasswordForm && (
                <Button
                  onClick={() => setShowPasswordForm(true)}
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/5 rounded-xl text-xs uppercase tracking-wider h-9"
                >
                  Change Password
                </Button>
              )}
            </div>

            {showPasswordForm ? (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="pl-12 pr-12 h-12 bg-black border-white/10 text-white rounded-xl focus:border-gold-500 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gold-500 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-12 h-12 bg-black border-white/10 text-white rounded-xl focus:border-gold-500 transition-all"
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 ml-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-12 h-12 bg-black border-white/10 text-white rounded-xl focus:border-gold-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={changingPassword}
                    className="bg-gold-500 text-black font-bold rounded-xl hover:bg-gold-400 h-11 px-6 uppercase tracking-wider text-xs"
                  >
                    {changingPassword ? (
                      <><Loader2 size={14} className="mr-2 animate-spin" /> Updating...</>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => { setShowPasswordForm(false); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); }}
                    variant="outline"
                    className="border-white/10 text-gray-400 hover:bg-white/5 rounded-xl h-11 px-6 text-xs uppercase tracking-wider"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <p className="text-gray-500 text-sm">Your password was last set when you created your account.</p>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/orders">
              <div className="bg-neutral-900 rounded-2xl p-6 border border-white/5 hover:border-gold-500/20 transition-colors cursor-pointer group">
                <Package size={24} className="text-gold-500 mb-3" />
                <h3 className="text-white font-bold group-hover:text-gold-500 transition-colors">My Orders</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {user._count?.orders || 0} order{(user._count?.orders || 0) !== 1 ? "s" : ""}
                </p>
              </div>
            </Link>
            <Link href="/shop">
              <div className="bg-neutral-900 rounded-2xl p-6 border border-white/5 hover:border-gold-500/20 transition-colors cursor-pointer group">
                <Package size={24} className="text-gold-500 mb-3" />
                <h3 className="text-white font-bold group-hover:text-gold-500 transition-colors">Continue Shopping</h3>
                <p className="text-gray-500 text-sm mt-1">Browse our latest products</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
