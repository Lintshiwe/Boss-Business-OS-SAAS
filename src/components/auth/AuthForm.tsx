"use client";

import { useState } from "react";
import { ArrowRight, Mail, Lock, User } from "lucide-react";

type Mode = "login" | "signup";

export default function AuthForm({ mode }: { mode: Mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Convex auth - placeholder until backend connected
      window.location.href = "/app";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="BOSS" className="h-12 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-gray-500 mt-2">
            {mode === "login" ? "Sign in to your workspace" : "Start your 14-day free trial"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Thabo Mokoena"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="thabo@example.co.za"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
          </div>

          {error && (
            <p className="text-gray-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "login" ? (
            <>Don&apos;t have an account? <a href="/signup" className="text-primary hover:underline font-medium">Sign up</a></>
          ) : (
            <>Already have an account? <a href="/login" className="text-primary hover:underline font-medium">Sign in</a></>
          )}
        </p>
      </div>
    </div>
  );
}
