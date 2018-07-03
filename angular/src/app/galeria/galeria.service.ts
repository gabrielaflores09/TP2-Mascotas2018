import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { RestBaseService } from "../tools/rest.tools";
import "rxjs/add/operator/toPromise";


@Injectable()
export class GaleriaService extends RestBaseService {
    private galleryUrl = "/gallery";
    private imagenUrl = "/image";

    constructor(private http: Http) {
        super();
      }
      // cuando inicia mostrando todas las fotos
      buscarFotosMascota(): Promise<FotoMascota[]> {
        return this.http
          .get(GaleriaService.serverUrl + this.galleryUrl, this.getRestHeader())
          .toPromise()
          .then(response => {return response.json() as FotoMascota[]; })
          .catch(this.handleError);
      }
      // acá busco los atributos de la foto de la mascota
      buscarFotoMascota(id: string): Promise<FotoMascota> {
        return this.http
          .get(GaleriaService.serverUrl + this.galleryUrl + "/" + id, this.getRestHeader())
          .toPromise()
          .then(response => {
            return response.json() as FotoMascota;
          })
          .catch(this.handleError);
      }
      // busco la imagen propia de la mascota
      buscarImageMascota(id: string): Promise<ImageMascota> {
        return this.http
          .get(GaleriaService.serverUrl + this.imagenUrl + "/" + id, this.getRestHeader())
          .toPromise()
          .then(response => {
            return response.json() as ImageMascota;
          })
          .catch(this.handleError);
      }

      // acá guardo la imagen propia de la mascota
      guardarImageMascota(value: ImageMascota): Promise<ImageMascota> {
        return this.http
          .post(
            GaleriaService.serverUrl + this.imagenUrl,
            JSON.stringify(value),
            this.getRestHeader()
          )
          .toPromise()
          .then(response => {
            return response.json() as ImageMascota;
          })
          .catch(this.handleError);
      }
      // cuando quiero guardar los cambios de una foto elegida o creada
      guardarFotoMascota(value: FotoMascota): Promise<FotoMascota> {
        if (value._id) {
          return this.http
            .put(
              GaleriaService.serverUrl + this.galleryUrl + "/" + value._id,
              JSON.stringify(value),
              this.getRestHeader()
            )
            .toPromise()
            .then(response => {
              return response.json() as FotoMascota;
            })
            .catch(this.handleError);
        } else {
          return this.http
            .post(
              GaleriaService.serverUrl + this.galleryUrl,
              JSON.stringify(value),
              this.getRestHeader())
            .toPromise()
            .then(response => { return response.json() as FotoMascota; })
            .catch(this.handleError);
        }
      }
      //  cuando quiero eliminar una foto elegida
      eliminarFotoMascota(id: string): Promise<any> {
        if (id) {
          return this.http
            .delete(
              GaleriaService.serverUrl + this.galleryUrl + "/" + id,
              this.getRestHeader())
            .toPromise()
            .then(response => { return ""; })
            .catch(this.handleError);
        }
      }
}

export interface FotoMascota {
    _id: string;
    name: string;
    description: string;
    picture: string;
    imagen: string;
}
export interface ImageMascota {
  id?: string;
  image: string;
}
