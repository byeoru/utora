import HomeButton from "@/components/home-button";
import SignupForm from "@/components/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입",
};

export default function SignUp() {
  return (
    <>
      <HomeButton />
      <SignupForm />
    </>
  );
}
