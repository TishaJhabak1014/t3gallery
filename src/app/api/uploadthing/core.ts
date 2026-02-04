// import { auth } from "@clerk/nextjs/server";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";
// import { db } from "~/server/db";
// import { images } from "~/server/db/schema";

// const f = createUploadthing();


// // FileRouter for your app, can contain multiple FileRoutes
// export const ourFileRouter = {
//   // Define as many FileRoutes as you like, each with a unique routeSlug
//   imageUploader: f({
//     image: {
//       /**
//        * For full list of options and defaults, see the File Route API reference
//        * @see https://docs.uploadthing.com/file-routes#route-config
//        */
//       maxFileSize: "4MB",
//       maxFileCount: 1,
//     },
//   })
//     // Set permissions and file types for this FileRoute
//     .middleware(async ({ req }) => {
//       // This code runs on your server before upload
//       const user = await auth();

//       // Instead of throwing (which causes UploadThing to return an error),
//       // return a nullable `userId`. This lets uploads proceed for anonymous
//       // users while still exposing `metadata.userId` when available.
//       if (!user?.userId) return { userId: null };

//       // Whatever is returned here is accessible in onUploadComplete as `metadata`
//       return { userId: user.userId };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       // This code RUNS ON YOUR SERVER after upload
//       console.log("Upload complete for userId:", metadata?.userId ?? "anonymous");

//       console.log("file url", file.ufsUrl);
//       await db.insert(images).values({
//         name: file.name,
//         url: file.ufsUrl,
//         userId: metadata.userId, // assumes schema allows string
//       });

//       // ✅ Must return serializable data
//       // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
//       return {
//         uploadedBy: metadata.userId,
//         url: file.ufsUrl,
//       };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;


// OR

// export const ourFileRouter = {
//   imageUploader: f({ image: { maxFileSize: "4MB" } })
//     .middleware(async ({ req }) => {
//       return { userId: user.userId };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       console.log("Upload complete for userId:", metadata.userId);

//       await db.insert(images).values({
//         name: file.name,
//         url: file.url,
//       });

//       return { uploadedBy: metadata.userId };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;

// or
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 40,
    },
  })
    .middleware(async () => {
      const user = await auth();

      // ✅ Better: explicitly block if not signed in
      if (!user?.userId) {
        throw new Error("Unauthorized");
        }


      return { userId: user.userId };
    })

    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);

      // ✅ Ensure DB insert is awaited and valid
      await db.insert(images).values({
        name: file.name,
        url: file.ufsUrl,
        userId: metadata.userId, // assumes schema allows string
      });

      // ✅ Must return serializable data
      return {
        uploadedBy: metadata.userId,
        url: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
