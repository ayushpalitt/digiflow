import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bouquets: defineTable({
    flowers: v.array(
      v.object({
        type: v.string(),
        x: v.number(),
        y: v.number(),
        rotation: v.number(),
        scale: v.number(),
      })
    ),
    letterStyle: v.string(),
    message: v.string(),
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
    editToken: v.string(),
  }),
});
