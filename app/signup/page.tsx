import { SignupForm } from "@/components/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Gamer Auth",
  description: "Create your account to get started",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <SignupForm />
      </div>
    </main>
  );
}
