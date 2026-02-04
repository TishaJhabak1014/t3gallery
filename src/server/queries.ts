import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "~/server/db";
import { images } from "./db/schema";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getImages = async () => {
  const { userId } = await auth();
  // can also pass useid as arg

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
};


export async function getImage(id: number) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  if(userId!=image.userId) {
    throw new Error("Unauthorized");
  }

  return image;
}

export async function deleteImage(id: number) {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));
  
  revalidatePath("/")

  redirect("/");
}