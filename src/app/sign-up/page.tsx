"use client";
import Link from "next/link";
import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useForm, SubmitHandler } from "react-hook-form";
import { ISignUpFormInput } from "@/types";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUpFormInput>();

  const password = watch("password");

  const onSubmit: SubmitHandler<ISignUpFormInput> = (data) => {
    // Submit form
    console.log(data);
  };

  return (
    <div className="size-full bg-cover bg-center bg-[url(/login-background.svg)] grid place-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-50 rounded min-w-[500px] shadow">
        <div className="p-6 flex flex-col gap-3 items-center">
          <div className="font-bold text-2xl">Sign up for Social Dan</div>
          <div>A demo social media website by Dan</div>
        </div>

        <div className="p-6 flex flex-col gap-3 space-y-4">
          <div className="space-y-1">
            <label>Email</label>
            <div className="p-2 border rounded border-neutral-300 focus-within:border-black">
              <input
                {...register("email", {
                  required: { value: true, message: "Field is required" },
                  validate: (value) => (value.includes("@") && value.includes(".com")) || "Invalid email",
                })}
                placeholder="Your email"
                className="w-full outline-none placeholder:text-neutral-300"
              />
            </div>
            {errors.email && <div className="text-sm italic text-red-500">{errors.email.message}</div>}
          </div>

          <div className="space-y-1">
            <label>Username</label>
            <div className="p-2 border rounded border-neutral-300 focus-within:border-black">
              <input
                {...register("username", {
                  required: { value: true, message: "Field is required" },
                })}
                placeholder="Username"
                className="w-full outline-none placeholder:text-neutral-300"
              />
            </div>
            {errors.username && <div className="text-sm italic text-red-500">{errors.username.message}</div>}
          </div>

          <div className="space-y-1">
            <label>Password</label>
            <div className="p-2 border rounded border-neutral-300 focus-within:border-black flex items-center gap-3">
              <input
                {...register("password", {
                  required: { value: true, message: "Field is required" },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                className="w-full outline-none placeholder:text-neutral-300"
              />
              {showPassword ? (
                <div onClick={() => setShowPassword(false)} className="cursor-pointer">
                  <GoEyeClosed />
                </div>
              ) : (
                <div onClick={() => setShowPassword(true)} className="cursor-pointer">
                  <GoEye />
                </div>
              )}
            </div>
            {errors.password && <div className="text-sm italic text-red-500">{errors.password.message}</div>}
          </div>

          <div className="space-y-1">
            <label>Repeat Password</label>
            <div className="p-2 border rounded border-neutral-300 focus-within:border-black flex items-center gap-3">
              <input
                {...register("repeatPassword", {
                  required: { value: true, message: "Field is required" },
                  validate: (repeatPassword) => repeatPassword === password || "Repeat password must be the same as password",
                })}
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className="w-full outline-none placeholder:text-neutral-300"
              />
              {showRepeatPassword ? (
                <div onClick={() => setShowRepeatPassword(false)} className="cursor-pointer">
                  <GoEyeClosed />
                </div>
              ) : (
                <div onClick={() => setShowRepeatPassword(true)} className="cursor-pointer">
                  <GoEye />
                </div>
              )}
            </div>
            {errors.repeatPassword && <div className="text-sm italic text-red-500">{errors.repeatPassword.message}</div>}
          </div>

          <button type="submit" className={`px-3 py-2 rounded bg-black cursor-pointer text-white`}>
            Sign Up
          </button>
        </div>

        <div className="p-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-sky-500 underline">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
