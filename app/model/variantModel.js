import { Schema, model, models } from "mongoose";

const ValueClassSchema = new Schema({
    validationHash: String,
    isValid: Boolean,
    validatedImageUrl: String
});

const FileOptionSchema = new Schema({
    id: String,
    value: ValueClassSchema
});

const FileSchema = new Schema({
    id: Number,
    type: String,
    hash: { type: String, default: null },
    url: { type: String, default: null },
    filename: String,
    mime_type: String,
    size: Number,
    width: Number,
    height: Number,
    dpi: { type: Number, default: null },
    status: String,
    created: Number,
    thumbnail_url: String,
    preview_url: String,
    visible: Boolean,
    is_temporary: Boolean,
    message: String,
    options: [FileOptionSchema],
    stitch_count_tier: { type: Schema.Types.Mixed, default: null }
});

const ProductSchema = new Schema({
    variant_id: Number,
    product_id: Number,
    image: String,
    name: String
});

const SyncVariantOptionSchema = new Schema({
    id: String,
    value: { type: Schema.Types.Mixed }
});

const SyncVariantSchema = new Schema({
    id: Number,
    external_id: String,
    sync_product_id: { type: Schema.Types.ObjectId, ref: 'SyncProduct' },
    name: String,
    synced: Boolean,
    variant_id: Number,
    main_category_id: Number,
    warehouse_product_id: { type: Schema.Types.Mixed, default: null },
    warehouse_product_variant_id: { type: Schema.Types.Mixed, default: null },
    retail_price: String,
    sku: String,
    currency: String,
    product: ProductSchema,
    files: [FileSchema],
    options: [SyncVariantOptionSchema],
    is_ignored: Boolean,
    size: String,
    color: String,
    availability_status: String
});

export default models.Variante || model('Variante', SyncVariantSchema)
