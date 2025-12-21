import mongoose from "mongoose"
import toJSON from "./plugins/toJSON"

const shoppingItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      private: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

// Ensure items are unique per user
shoppingItemSchema.index({ user: 1, text: 1 }, { unique: true })

// add plugin that converts mongoose to json
shoppingItemSchema.plugin(toJSON)

export default mongoose.models.ShoppingItem ||
  mongoose.model("ShoppingItem", shoppingItemSchema)
