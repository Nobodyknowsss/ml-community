"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  onConfirm: () => void;
}

export function SuccessModal({
  open,
  onOpenChange,
  username,
  onConfirm,
}: SuccessModalProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onConfirm();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onConfirm]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle>✓ Account Created!</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-2">
          <p className="text-gray-300">
            Welcome to the app,{" "}
            <span className="text-green-400 font-semibold">{username}</span>!
          </p>
          <p className="text-gray-400">Redirecting to your profile...</p>
        </DialogDescription>
        <div className="mt-4 flex gap-2 justify-center">
          <Button
            onClick={onConfirm}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Continue to Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
