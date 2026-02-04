"use client";

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
// import { UploadButton } from "@uploadthing/react";
import { UploadButton } from "~/utils/uploadthing";
import type { OurFileRouter } from "~/app/api/uploadthing/core";
import {useRouter} from "next/navigation";

export default function TopNav() {
const router = useRouter();
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>
      {/* <div>Sign In</div> */}
      <div>
        <SignedIn>
            <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
                router.refresh();
            }}
            onUploadError={(error) => {
                if (error.message.includes("FileSizeMismatch")) {
                alert("Image must be under 4MB");
                } else {
                alert(error.message);
                }
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