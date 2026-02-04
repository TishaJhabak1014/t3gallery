// src/app/page.tsx
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

import { getImages } from "~/server/queries";

export const dynamic = "force-dynamic";

// Server component to fetch images
export async function Images() {
  // const { userId } = await auth();
  // if (!userId) return null;

  // const images = await db.query.images.findMany({
  //   where: (model, { eq }) => eq(model.userId, userId),
  //   orderBy: (model, { desc }) => desc(model.id),
  // });

  const images = await getImages();

  if (images.length === 0)
    return (
      <div className="w-full text-center text-2xl">
        No images uploaded yet!
      </div>
    );

  return (
    /* Added justify-center to center the grid on the screen */
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex w-48 flex-col items-center">
          {/* Added 'group' for hover and 'cursor-pointer' for the hand icon */}
          <Link href={`/img/${image.id}`} className="w-full">
            <div className="group relative aspect-square w-full overflow-hidden rounded-xl bg-slate-900 cursor-pointer">
              <Image
                src={image.url}
                alt={image.name}
                fill
                sizes="192px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </Link>

          {/* Text is now outside the overflow-hidden container so it is visible */}
          <div className="mt-2 text-center text-sm font-medium">
            {image.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  // const posts = await db.query.posts.findMany();
  // console.log(posts) // server side logging not client side

  return (
    <main className="">
      <div className="flex flex-wrap justify-center gap-4">

        {/* {posts.map((post) => (
          <div key={post.id} className="w-48 p-2 border rounded-xl">
            {post.name}
          </div>
        ))} */}

        {/* client-side */}

        {/* {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <div className="aspect-square overflow-hidden rounded-xl bg-slate-900">
            <img 
              src={image.url} 
              alt="Gallery Image"
              className="h-full w-full object-cover transition-transform hover:scale-105" 
            />
          </div>
          </div>
        ))} */}

        <SignedOut>
          <div className="w-full text-center text-2xl">
            Please sign in above
          </div>
        </SignedOut>

        <SignedIn>
          <Images />
        </SignedIn>

      </div>
    </main>
  );
}
