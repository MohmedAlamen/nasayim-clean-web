import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { conversations, chatMessages } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const chatRouter = router({
  startConversation: protectedProcedure
    .input(z.object({ subject: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const result = await db.insert(conversations).values({
        userId: ctx.user.id,
        subject: input.subject,
        status: "open",
      });

      const conversationId = result[0].insertId;
      return {
        id: conversationId,
        userId: ctx.user.id,
        subject: input.subject,
        status: "open",
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),

  getConversations: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const userConversations = await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, ctx.user.id));

    const conversationsWithMessages = await Promise.all(
      userConversations.map(async (conv) => {
        const messages = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.conversationId, conv.id));
        return { ...conv, messages };
      })
    );

    return conversationsWithMessages;
  }),

  sendMessage: protectedProcedure
    .input(z.object({ conversationId: z.number(), message: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const result = await db.insert(chatMessages).values({
        conversationId: input.conversationId,
        senderId: ctx.user.id,
        senderRole: "customer",
        message: input.message,
        isRead: "false",
      });

      return {
        id: result[0].insertId,
        conversationId: input.conversationId,
        senderId: ctx.user.id,
        senderRole: "customer",
        message: input.message,
        isRead: false,
        createdAt: new Date(),
      };
    }),

  closeConversation: protectedProcedure
    .input(z.object({ conversationId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db
        .update(conversations)
        .set({ status: "closed" })
        .where(eq(conversations.id, input.conversationId));

      return { success: true };
    }),

  markAsRead: protectedProcedure
    .input(z.object({ conversationId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db
        .update(chatMessages)
        .set({ isRead: "true" })
        .where(eq(chatMessages.conversationId, input.conversationId));

      return { success: true };
    }),
});
