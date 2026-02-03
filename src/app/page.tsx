import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { db } from "~/server/db";
import { api, HydrateClient } from "~/trpc/server";

export const dynamic = "force-dynamic"

const mockUrls = [
  "https://media.istockphoto.com/id/2149530993/photo/digital-human-head-concept-for-ai-metaverse-and-facial-recognition-technology.jpg?s=1024x1024&w=is&k=20&c=Ob0ACggwWuFDFRgIc-SM5bLWjNbIyoREeulmLN8dhLs=",
  "https://media.istockphoto.com/id/2216822984/vector/closeup-side-view-profile-portrait-of-man-3d-voxelized-face-vector-illustration-design-for.jpg?s=1024x1024&w=is&k=20&c=jamzdCuL9GMq06E7LuFul_IPm6rsGLn6o31meEMFClo=",
  "https://media.istockphoto.com/id/2189167787/vector/abstract-digital-human-head-constructing-from-cubes-minimalistic-design-for-business.jpg?s=1024x1024&w=is&k=20&c=zdN5m_iWqvExj-tvBPC2GVqhyuVlfys56LlJWiqCTLs=",
  "https://media.istockphoto.com/id/2202041602/vector/abstract-digital-human-head-constructing-from-cubes-minimalistic-design-for-business.jpg?s=1024x1024&w=is&k=20&c=RYU2gp7jteivsFTf7TEdaipvkBe6q_PiR-rPHCxt7iY="
]

const allUrls = [...mockUrls, ...mockUrls, ...mockUrls];

const mockImages = allUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function Home() {

  // void api.post.getLatest.prefetch();/

  const posts = await db.query.posts.findMany();
  console.log(posts) // server side logging not client side


  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id} className="w-48 p-2 border rounded-xl">
            {post.name}
          </div>
        ))}
        {/* client-side */}
        
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <div className="aspect-square overflow-hidden rounded-xl bg-slate-900">
            <img 
              src={image.url} 
              alt="Gallery Image"
              className="h-full w-full object-cover transition-transform hover:scale-105" 
            />
          </div>
          </div>
        ))}
      </div>
    </main>
  );
}
