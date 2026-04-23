import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-green-600/50 bg-gray-800 px-3 py-2 text-gray-100 placeholder:text-gray-400 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/50 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors outline-none",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
