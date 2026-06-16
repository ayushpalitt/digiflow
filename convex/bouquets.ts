/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getBouquet = query({
  args: { id: v.id("bouquets") },
  handler: async (ctx: any, args: any) => {
    const bouquet = await ctx.db.get(args.id);
    if (!bouquet) {
      throw new Error("Bouquet not found");
    }
    // Omit the editToken when fetching to prevent unauthorized edits
    const { editToken, ...safeBouquet } = bouquet;
    return safeBouquet;
  },
});

export const getBouquetForEdit = query({
  args: { id: v.id("bouquets"), editToken: v.string() },
  handler: async (ctx: any, args: any) => {
    const bouquet = await ctx.db.get(args.id);
    if (!bouquet) {
      throw new Error("Bouquet not found");
    }
    if (bouquet.editToken !== args.editToken) {
      throw new Error("Unauthorized to edit this bouquet");
    }
    return bouquet;
  },
});

export const createBouquet = mutation({
  args: {
    flowers: v.array(
      v.object({
        type: v.string(),
        x: v.number(),
        y: v.number(),
        rotation: v.number(),
        scale: v.number(),
        flipped: v.optional(v.boolean()),
        isManual: v.optional(v.boolean()),
        uid: v.optional(v.string()),
      })
    ),
    letterStyle: v.string(),
    message: v.string(),
    senderName: v.optional(v.string()),
    recipientName: v.optional(v.string()),
    world: v.string(),
    music: v.optional(
      v.object({
        trackUrl: v.string(),
        title: v.string(),
        artist: v.string(),
        albumArt: v.string(),
        startTime: v.number(),
        endTime: v.number(),
      })
    ),
    fontStyle: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    // Generate a random token for editing
    const editToken = crypto.randomUUID();
    
    const id = await ctx.db.insert("bouquets", {
      ...args,
      editToken,
    });
    
    return { id, editToken };
  },
});

export const updateBouquet = mutation({
  args: {
    id: v.id("bouquets"),
    editToken: v.string(),
    flowers: v.array(
      v.object({
        type: v.string(),
        x: v.number(),
        y: v.number(),
        rotation: v.number(),
        scale: v.number(),
        flipped: v.optional(v.boolean()),
        isManual: v.optional(v.boolean()),
        uid: v.optional(v.string()),
      })
    ),
    letterStyle: v.string(),
    message: v.string(),
    senderName: v.optional(v.string()),
    recipientName: v.optional(v.string()),
    world: v.string(),
    music: v.optional(
      v.object({
        trackUrl: v.string(),
        title: v.string(),
        artist: v.string(),
        albumArt: v.string(),
        startTime: v.number(),
        endTime: v.number(),
      })
    ),
    fontStyle: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    const bouquet = await ctx.db.get(args.id);
    if (!bouquet) {
      throw new Error("Bouquet not found");
    }
    if (bouquet.editToken !== args.editToken) {
      throw new Error("Unauthorized to edit this bouquet");
    }
    
    const { id, editToken, ...updateData } = args;
    
    await ctx.db.patch(args.id, updateData);
    
    return { success: true };
  },
});
