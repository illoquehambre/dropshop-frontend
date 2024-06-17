import { Schema, model, models } from "mongoose";

const SyncProductSchema = new Schema({
    id: Number,
    external_id: String,
    name: String,
    variants: Number,
    synced: Number,
    thumbnail_url: String,
    is_ignored: Boolean,
    category: { type: String, enum: ["Camisetas", "Sudaderas", "Lienzos"] }
});



export default models.Producto || model('Producto', SyncProductSchema)