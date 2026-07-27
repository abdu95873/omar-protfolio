import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    setSuccess("");

    signIn(email, password)
      .then(() => {
        navigate(from, { replace: true });
        setSuccess("Successfully logged in");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.18),transparent_32%),linear-gradient(180deg,#0f0f0f_0%,#171717_100%)] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto flex min-h-dvh max-w-5xl items-center justify-center">
        <div className="grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden lg:flex flex-col justify-between bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-10 xl:p-12 text-white">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300">
                Omar Studio
              </p>
              <h1 className="font-serif text-5xl leading-[0.95] text-white">
                Welcome
                <span className="block text-orange-400">back.</span>
              </h1>
              <p className="text-base leading-relaxed text-white/70">
                Sign in to manage your dashboard, update content, and keep your
                portfolio fresh.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm leading-7 text-white/65">
                Clean access, simple workflow, and full control over your
                studio content.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="mx-auto w-full max-w-md">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-orange-400">
                Dashboard Login
              </p>
              <h2 className="mt-3 font-serif text-center text-3xl sm:text-4xl text-white">
                Sign in
              </h2>
              <p className="mt-3 text-center text-sm sm:text-base text-neutral-400">
                Enter your account credentials to continue.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="formBasicEmail"
                    className="mb-2 block text-sm font-medium text-neutral-200"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="formBasicEmail"
                    placeholder="Enter email"
                    required
                    className="input input-bordered input-smooth h-12 w-full bg-white/5 text-white placeholder:text-neutral-500 focus:border-orange-400"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="formBasicPassword"
                      className="block text-sm font-medium text-neutral-200"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-xs font-medium text-orange-400 transition-colors hover:text-orange-300"
                    >
                      {show ? "Hide" : "Show"}
                    </button>
                  </div>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    id="formBasicPassword"
                    placeholder="Password"
                    required
                    className="input input-bordered input-smooth h-12 w-full bg-white/5 text-white placeholder:text-neutral-500 focus:border-orange-400"
                  />
                </div>
                <button type="submit" className="btn-brand !w-full !py-3.5 !text-base">
                  Login
                </button>
                {(error || success) && (
                  <div className="space-y-2 pt-1 text-center text-sm">
                    {error && <p className="text-red-400">{error}</p>}
                    {success && <p className="text-green-400">{success}</p>}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
