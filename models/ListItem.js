import mongoose from "mongoose"
import toJSON from "./plugins/toJSON"

// USER SCHEMA
const listItemsSchema = mongoose.Schema(
  {
    item: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

// add plugin that converts mongoose to json
listItemsSchema.plugin(toJSON)

export default mongoose.models.List ||
  mongoose.model("ListItem", listItemsSchema)
