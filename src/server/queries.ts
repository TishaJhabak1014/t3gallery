import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "~/server/db";

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
