"use client";
import { login } from "@/lib/action";
import LoadingSpinner from "@/ui/loading-spinner";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginForm() {
  const [validationError, setValidationError] = useState({});

  const initialState = { errors: {}, message: undefined };
  const [state, formAction] = useFormState(login, initialState);

  useEffect(() => {
    if (state.errors) {
      setValidationError(state);
    }
  }, [state]);

  const handleReset = () => {
    setValidationError({});
  };

  return (
    <div className="bg-gray-50  mt-10 rounded-lg sm:border-2 px-4 lg:px-6 py-10 lg:max-w-md sm:max-w-md w-full text-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl ">Sign In</h1>
      </div>
      <form action={formAction} className="text-center">
        <div className="py-2 text-left">
          <input
            type="text"
            className={`border-2 ${
              validationError?.errors?.username
                ? "border-red-300"
                : "border-gray-100"
            } focus:outline-none  block w-full py-2 px-4 rounded-lg focus:border-gray-700 `}
            placeholder="Username"
            id="username"
            name="username"
            onChange={handleReset}
            required
          />
          {validationError.errors?.username &&
            validationError.errors.username.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className="py-2 text-left">
          <input
            type="password"
            className={`border-2 ${
              validationError?.errors?.password
                ? "border-red-300"
                : "border-gray-100"
            } focus:outline-none  block w-full py-2 px-4 rounded-lg focus:border-gray-700 `}
            placeholder="Password"
            id="password"
            name="password"
            onChange={handleReset}
            required
          />
          {validationError.errors?.password &&
            validationError.errors.password.map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className="py-2">
          <Submit />
        </div>
      </form>
      <div>
        <p>
          Don't have an account?{" "}
          <span className="text-blue-600">
            <Link href="/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

function Submit() {
  const status = useFormStatus();

  return (
    <button
      className="focus:outline-none bg-slate-900 text-white font-bold tracking-wider block w-full p-2 rounded-lg disabled:bg-gray-600"
      disabled={status.pending}
    >
      {status.pending ? (
        <LoadingSpinner height={20} width={20} />
      ) : (
        <div>Submit</div>
      )}
    </button>
  );
}
