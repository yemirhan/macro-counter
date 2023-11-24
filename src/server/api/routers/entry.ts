import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createNewEntry } from "@/validation/entry";
import { revalidatePath } from "next/cache";

const entryRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.entry.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(createNewEntry)
    .mutation(async ({ ctx, input }) => {
      const f = await ctx.db.food.create({
        data: {
          name: input.food.name,
          carbs: input.food.carbs,
          fat: input.food.fat,
          protein: input.food.protein,
          calories: input.food.calories,
          userId: ctx.session.user.id,
        },
      });
      const entry = await ctx.db.entry.create({
        data: {
          entryDate: input.date,
          userId: ctx.session.user.id,
          name: input.name,

          foods: {
            create: {
              foodId: f.id,
            },
          },
        },
      });

      revalidatePath("/");
      return entry;
    }),
});

export default entryRouter;
