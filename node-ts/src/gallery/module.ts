"use strict";

import { Express } from "express";
import * as passport from "passport";
import * as gallery from "./gallery.service";

export function init(app: Express) {
    // Rutas de acceso a fotomascotas
    app
    .route("/gallery")
    .get(passport.authenticate("jwt", { session: false }), gallery.findByCurrentUser)
    .post(passport.authenticate("jwt", { session: false }), gallery.validateUpdate, gallery.update);

  app
    .route("/gallery/:galleryId")
    .get(gallery.findByID, gallery.read)
    .put(passport.authenticate("jwt", { session: false }), gallery.findByID, gallery.validateOwner, gallery.validateUpdate, gallery.update)
    .delete(passport.authenticate("jwt", { session: false }), gallery.findByID, gallery.validateOwner, gallery.remove);

}