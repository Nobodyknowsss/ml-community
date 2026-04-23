import { SignupForm } from "@/components/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Gamer Auth",
  description: "Create your account to get started",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <SignupForm />
    </main>
  );
}
