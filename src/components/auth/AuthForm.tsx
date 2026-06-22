"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Mail, Lock, User, Shield, Key, Smartphone, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

type Mode = "login" | "signup";
type LoginStep = "credentials" | "2fa" | "passkey";

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) setStoredValue(JSON.parse(item));
    } catch {}
  }, [key]);
  const setValue = (value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const newValue = value instanceof Function ? value(prev) : value;
      try { window.localStorage.setItem(key, JSON.stringify(newValue)); } catch {}
      return newValue;
    });
  };
  return [storedValue, setValue];
}

export default function AuthForm({ mode }: { mode: Mode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Security settings from localStorage
  const [twoFAEnabled] = useLocalStorage("boss_2fa", false);
  const [passkeyRegistered] = useLocalStorage("boss_passkey", false);
  const [totpSecret] = useLocalStorage("boss_totp_secret", "");
  const [storedEmail] = useLocalStorage("boss_ws_email", "");

  // Login security step
  const [loginStep, setLoginStep] = useState<LoginStep>("credentials");
  const [totpCode, setTotpCode] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        // Signup — go straight to app
        window.location.href = "/app";
        return;
      }

      // Login — check if 2FA or passkey is enabled
      // For demo: accept any password >= 8 chars
      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        setLoading(false);
        return;
      }

      // Check security settings
      if (twoFAEnabled && passkeyRegistered) {
        // Both enabled — offer passkey first (better UX), fallback to TOTP
        setLoginStep("passkey");
      } else if (twoFAEnabled) {
        setLoginStep("2fa");
      } else if (passkeyRegistered) {
        setLoginStep("passkey");
      } else {
        // No security enabled — go straight in
        window.location.href = "/app";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const verifyTOTP = async () => {
    if (totpCode.length !== 6) {
      setVerifyError("Enter a 6-digit code");
      return;
    }
    setVerifying(true);
    setVerifyError("");

    try {
      const { TOTP, Secret } = await import("otpauth");
      const secret = Secret.fromBase32(totpSecret);
      const totp = new TOTP({ issuer: "BOSS SaaS", label: storedEmail || email, algorithm: "SHA1", digits: 6, period: 30, secret });
      const delta = totp.validate({ token: totpCode, window: 1 });
      if (delta !== null) {
        window.location.href = "/app";
      } else {
        setVerifyError("Invalid code. Check your authenticator app.");
      }
    } catch {
      setVerifyError("Verification failed. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const verifyPasskey = async () => {
    setVerifying(true);
    setVerifyError("");
    try {
      if (!window.PublicKeyCredential) {
        setVerifyError("Passkeys not supported in this browser.");
        setVerifying(false);
        return;
      }
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          rpId: window.location.hostname,
          userVerification: "required",
          timeout: 60000,
        },
      });

      if (assertion) {
        window.location.href = "/app";
      }
    } catch (err: any) {
      if (err?.name === "NotAllowedError") {
        setVerifyError("Passkey verification was cancelled.");
      } else {
        setVerifyError("Passkey verification failed.");
      }
    } finally {
      setVerifying(false);
    }
  };

  const goBack = () => {
    setLoginStep("credentials");
    setTotpCode("");
    setVerifyError("");
  };

  // === SIGNUP or CREDENTIALS STEP ===
  if (mode === "signup" || loginStep === "credentials") {
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {mode === "login" && (twoFAEnabled || passkeyRegistered) && (
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-sky-50 p-3 rounded-xl">
                <Shield size={14} className="text-sky-500 flex-shrink-0" />
                {twoFAEnabled && passkeyRegistered
                  ? "Your account has two-factor authentication and passkey enabled."
                  : twoFAEnabled
                    ? "Your account has two-factor authentication enabled."
                    : "Your account has passkey authentication enabled."}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Verifying..." : mode === "login" ? "Continue" : "Create Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {mode === "login" ? (
              <>Don&apos;t have an account? <a href="/signup" className="text-sky-500 hover:underline font-medium">Sign up</a></>
            ) : (
              <>Already have an account? <a href="/login" className="text-sky-500 hover:underline font-medium">Sign in</a></>
            )}
          </p>
        </div>
      </div>
    );
  }

  // === 2FA TOTP VERIFICATION STEP ===
  if (loginStep === "2fa") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/images/logo.png" alt="BOSS" className="h-12 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Two-Factor Authentication</h1>
            <p className="text-gray-500 mt-2">Enter the 6-digit code from your authenticator app</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center">
                <Smartphone size={28} className="text-sky-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Verification Code</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={totpCode}
                onChange={(e) => { setTotpCode(e.target.value.replace(/\D/g, "")); setVerifyError(""); }}
                placeholder="000000"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-mono text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                autoFocus
                onKeyDown={(e) => { if (e.key === "Enter" && totpCode.length === 6) verifyTOTP(); }}
              />
            </div>

            {verifyError && (
              <div className="flex items-center gap-2 text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">
                <AlertCircle size={16} />
                {verifyError}
              </div>
            )}

            <button
              onClick={verifyTOTP}
              disabled={verifying || totpCode.length !== 6}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {verifying ? "Verifying..." : "Verify & Sign In"}
              {!verifying && <CheckCircle size={18} />}
            </button>

            <div className="flex items-center justify-between text-sm">
              <button onClick={goBack} className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                <ArrowLeft size={14} /> Back
              </button>
              {passkeyRegistered && (
                <button onClick={() => { setLoginStep("passkey"); setVerifyError(""); }} className="flex items-center gap-1 text-sky-500 hover:text-sky-600">
                  Use passkey instead
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === PASSKEY VERIFICATION STEP ===
  if (loginStep === "passkey") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/images/logo.png" alt="BOSS" className="h-12 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-gray-900">Passkey Verification</h1>
            <p className="text-gray-500 mt-2">Use your fingerprint, face, or security key</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                <Key size={28} className="text-gray-600" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-700">Your browser will prompt you to verify your identity.</p>
              <p className="text-xs text-gray-400">Use your fingerprint, face recognition, or security key to continue.</p>
            </div>

            {verifyError && (
              <div className="flex items-center gap-2 text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">
                <AlertCircle size={16} />
                {verifyError}
              </div>
            )}

            <button
              onClick={verifyPasskey}
              disabled={verifying}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {verifying ? "Verifying..." : "Verify with Passkey"}
              {!verifying && <Key size={18} />}
            </button>

            <div className="flex items-center justify-between text-sm">
              <button onClick={goBack} className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                <ArrowLeft size={14} /> Back
              </button>
              {twoFAEnabled && (
                <button onClick={() => { setLoginStep("2fa"); setVerifyError(""); }} className="flex items-center gap-1 text-sky-500 hover:text-sky-600">
                  Use authenticator instead
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
