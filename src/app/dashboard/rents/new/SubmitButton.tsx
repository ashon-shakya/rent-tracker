"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-8 shadow-sm"
    >
      {pending ? "Saving..." : "Create Agreement"}
    </Button>
  );
}
