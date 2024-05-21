import LoginForm from "@/components/auth/login-form";
import Footer from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
};

export default function Login() {
  return (
    <>
      <LoginForm />
      <Footer />
    </>
  );
}
