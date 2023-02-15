import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  title: string;
  description: string;
}

const ItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
},
{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" }  
});

export const Item = mongoose.model<IItem>('Item', ItemSchema);
