"use strict";

import * as escape from "escape-html";
import * as express from "express";
import * as mongoose from "mongoose";
import { NextFunction } from "express-serve-static-core";
import { IUserSessionRequest } from "../security/security.service";
import * as errorHandler from "../utils/error.handler";
import { IGallery, Gallery } from "./gallery.schema";
import { IPet, Pet } from "../pet/pet.schema";

/**
 * Retorna las fotos de las mascotas
 */
export interface IReadRequest extends IUserSessionRequest {
  gallery: IGallery;
}
export function read(req: IReadRequest, res: express.Response) {
  res.json(req.gallery);
}
/**
 * @apiDefine IGaleriaResponse
 *
 * @apiSuccessExample {json} Galeria
 *    {
 *      "name": "nombre de la mascota",
 *      "description": "Descripcion de la foto de la mascota",
 *      "user": "Id de usuario",
 *      "picture": "Id de imagen",
 *      "updated": date (DD/MM/YYYY),
 *      "created": date (DD/MM/YYYY),
 *      "enabled": [true|false]
 *    }
 */

/**
 * @api {post} /gallery Crear Foto Mascota
 * @apiName Crear Galeria
 * @apiGroup Galeria
 *
 * @apiDescription Crea una galeria.
 *
 * @apiParamExample {json} Galeria
 *    {
 *      "name": "nombre de la mascota",
 *      "description": "Description de la foto de la mascota",
 *    }
 *
 * @apiUse IGaleriaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */

/**
 * @api {put} /gallery/:galleryId Actualizar Foto Mascota
 * @apiName Actualizar Foto Mascota
 * @apiGroup Galeria
 *
 * @apiDescription Actualiza los datos de la foto de una mascota.
 *
 * @apiParamExample {json} Galeria
 *    {
 *      "name": "Nombre de la mascota",
 *      "description": "Description de la foto de la mascota",
 *    }
 *
 * @apiUse IGaleriaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
export interface IUpdateRequest extends IUserSessionRequest {
  gallery: IGallery;
}
export function validateUpdate(req: IUpdateRequest, res: express.Response, next: NextFunction) {
  if (req.body.name) {
    req.check("name", "Hasta 1024 caracteres solamente.").isLength({ max: 1024 });
    req.sanitize("name").escape();
  }
  if (req.body.description) {
    req.check("description", "Hasta 1024 caracteres solamente.").isLength({ max: 1024 });
    req.sanitize("description").escape();
  }
  if (req.body.picture) {
    req.sanitize("picture").escape();
  }
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return errorHandler.handleExpressValidationError(res, result);
    }
    next();
  });
}
export function update(req: IUpdateRequest, res: express.Response) {
  let gallery = req.gallery;
  if (!gallery) {
    gallery = new Gallery();
    gallery.user = req.user._id;
  }
  if (req.body.name) {
    gallery.name = req.body.name;
  }
  if (req.body.description) {
    gallery.description = req.body.description;
  }
  if (req.body.picture) {
    gallery.picture = req.body.picture;
  }
  gallery.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.json(gallery);
  });
}
/**
 * @api {delete} /gallery/:galleryId Eliminar Foto Mascota
 * @apiName Eliminar Foto Mascota
 * @apiGroup Galeria
 *
 * @apiDescription Eliminar foto de una mascota.
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
export interface IRemoveRequest extends IUserSessionRequest {
  gallery: IGallery;
}
export function remove(req: IRemoveRequest, res: express.Response) {
  const gallery = <IGallery>req.gallery;

  gallery.enabled = false;
  gallery.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.send();
  });
}
/**
 * @api {get} /gallery Listar Foto Mascota
 * @apiName Listar Foto Mascota
 * @apiGroup Galeria
 *
 * @apiDescription Obtiene un listado de las fotos de las mascotas del usuario actual.
 *
 * @apiSuccessExample {json} Galeria
 *  [
 *    {
 *      "name": "nombre de la mascota",
 *      "description": "Descripción de la foto de la mascota",
 *      "user": "Id de usuario",
 *      "updated": date (DD/MM/YYYY),
 *      "created": date (DD/MM/YYYY),
 *      "enabled": [true|false]
 *    }, ...
 *  ]
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
export function findByCurrentUser(req: IUserSessionRequest, res: express.Response, next: NextFunction) {
  Gallery.find({
    user: req.user._id,
    enabled: true
  }).exec(function (err, galleries) {
    if (err) return next();
    res.json(galleries);
  });
}
/**
 * @api {put} /gallery/:galleryId Buscar Foto Mascota
 * @apiName Buscar Foto Mascota
 * @apiGroup Galeria
 *
 * @apiDescription Busca la foto de una mascota por id.
 * @apiUse IGaleriaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
export interface IFindByIdRequest extends express.Request {
  gallery: IGallery;
}
export function findByID(req: IFindByIdRequest, res: express.Response, next: NextFunction) {
  const id = req.params.galleryId;

  Gallery.findOne({
    _id: escape(id),
    enabled: true
  },
    function (err, gallery) {
      if (err) return errorHandler.handleError(res, err);

      if (!gallery) {
        return errorHandler.sendError(res, errorHandler.ERROR_NOT_FOUND, "No se pudo cargar la fot de la mascota " + id);
      }

      req.gallery = gallery;
      next();
    });
}
/**
 * Autorización, el único que puede modificar el mascota es el dueño
 */
export interface IValidateOwnerRequest extends IUserSessionRequest {
  gallery: IGallery;
}
export function validateOwner(req: IValidateOwnerRequest, res: express.Response, next: NextFunction) {
  if (!((req.gallery.user as any).equals(req.user._id))) {
    return errorHandler.sendError(res, errorHandler.ERROR_UNAUTHORIZED_METHOD, "User is not authorized");
  }
  next();
}