"use client";

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "~/app/api/uploadthing/core";

export default function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>
      {/* <div>Sign In</div> */}
      <div>
        <SignedIn>
          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files:", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
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