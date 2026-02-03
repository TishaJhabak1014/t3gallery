"use client";

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>
      {/* <div>Sign In</div> */}
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="cursor-pointer">Sign in</button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}