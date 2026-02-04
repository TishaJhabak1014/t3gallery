// "use client";

// import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
// // import { UploadButton } from "@uploadthing/react";
// // import {useRouter} from "next/navigation";
// import { SimpleUploadButton } from "./simple-upload-button";

// export default function TopNav() {
// // const router = useRouter();
//   return (
//     <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
//       <div>Gallery</div>
//       {/* <div>Sign In</div> */}
//       <div className="flex flex-row items-center gap-4">
//         <SignedIn>
//           {/* Use a flex container here to align children horizontally */}
//           <div className="flex items-center gap-4">
//             {/* <UploadButton
//               endpoint="imageUploader"
//               onClientUploadComplete={() => {
//                 router.refresh();
//               }}
//               onUploadError={(error) => {
//                 alert(error.message);
//               }}
//             /> */}
//             <SimpleUploadButton/>
//             <UserButton />
//           </div>
//         </SignedIn>

//         <SignedOut>
//           <SignInButton>
//             <button className="cursor-pointer">Sign in</button>
//           </SignInButton>
//         </SignedOut>
//       </div>
//     </nav>
//   );
// }

"use client";

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";

export default function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>

      <div className="flex flex-row items-center gap-4">
        {/* SignedIn only renders on the client */}
        <SignedIn>
          <div className="flex items-center gap-4">
            <SimpleUploadButton />
            <UserButton />
          </div>
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
