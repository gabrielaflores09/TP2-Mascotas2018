"use strict";
/**
 * Permite almacenar imágenes
 */
import * as mongoose from "mongoose";

export interface IGallery extends mongoose.Document {
  name: string;
  description: string;
  user: mongoose.Schema.Types.ObjectId;
  picture: string;
  updated: Number;
  created: Number;
  enabled: Boolean;
}

/**
 * Esquema de Galeria de Fotos
 */
export let GallerySchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: "Nombre es requerido"
  },
  description: {
    type: String,
    default: "",
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Usuario es requerido"
  },
  picture: {
    type: String,
    ref: "Image"
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  created: {
    type: Date,
    default: Date.now()
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { collection: "galleries"});
/**
 * Antes de guardar
 */
GallerySchema.pre("save", function (this: IGallery, next) {
  this.updated = Date.now();

  next();
});

export let Gallery = mongoose.model<IGallery>("Gallery", GallerySchema);