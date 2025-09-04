"use client";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useForm, SubmitHandler } from "react-hook-form";
import { ILoginFormInput, ILoginRequest, ILoginResponse } from "@/types";
import { useAuthStore } from "@/lib/stores/authStore";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((store) => store.login);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: ILoginRequest) => axios.post<ILoginResponse>("/api/login", { username, password }).then((res) => res.data),
  });

  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    const { username, password } = data;
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: ({ status, data }) => {
          if (status === "ok") {
            Cookies.set("token", data.token);
            login(data.user, data.token);
            router.push("/");
          } else {
            alert("Incorrect email or password");
          }
        },
        onError: () => {
          alert("Something went wrong");
        },
      }
    );
  };

  return (
    <div className="size-full bg-cover bg-center bg-[url(/login-background.svg)] grid place-items-center p-2">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-50 rounded w-full max-w-[500px] md:shadow">
        <div className="p-6 flex flex-col gap-3 items-center">
          <div className="font-bold text-2xl">Login to Social Dan</div>
          <div>A demo social media website by Dan</div>
        </div>

        <div className="p-6 flex flex-col gap-3 space-y-4">
          <div className="space-y-1">
            <label>Username</label>
            <div className="p-2 border rounded border-neutral-300 focus-within:border-black">
              <input
                {...register("username", {
                  required: { value: true, message: "Field is required" },
                })}
                placeholder="Your username"
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

          <button type="submit" className={`px-3 py-2 rounded bg-black cursor-pointer text-white`}>
            Login
          </button>
        </div>

        <div className="p-6 text-center">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-sky-500 underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
