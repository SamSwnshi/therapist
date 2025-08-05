"use client";

import { Button } from "../ui/button";
import Link from "next/link";

const SignInButton = ({ className }) => {
  return (
    <Button asChild className={className}>
      <Link href="/login">Sign In</Link>
    </Button>
  );
};

export default SignInButton;
