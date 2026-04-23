import { SigninForm } from "@/components/signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Gamer Auth",
  description: "Sign in to your account",
};

export default function SigninPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <SigninForm />
    </main>
  );
}
