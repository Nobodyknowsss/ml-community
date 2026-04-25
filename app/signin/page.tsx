import { SigninForm } from "@/components/signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Gamer Auth",
  description: "Sign in to your account",
};

export default function SigninPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <SigninForm />
      </div>
    </main>
  );
}
