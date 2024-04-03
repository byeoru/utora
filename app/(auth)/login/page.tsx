import HomeButton from "@/components/home-button";
import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
};

export default function Login() {
  return (
    <>
      <HomeButton />
      <LoginForm />
    </>
  );
}
