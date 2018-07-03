import { Component, OnInit } from "@angular/core";
import { GaleriaService, FotoMascota } from "./galeria.service";
import { Mascota, MascotaService } from "../mascota/mascota.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import * as errorHandler from "../tools/error-handler";
import { IErrorController } from "../tools/error-handler";
import { ImageMascota } from "./galeria.service";

@Component({
  selector: "app-nueva-galleria",
  templateUrl: "./nueva-galeria.component.html"
})
export class NuevaGaleriaComponent implements OnInit, IErrorController {
  formSubmitted: boolean;

  mascotas: Mascota[];

  errorMessage: string;
  errors: string[] = [];
  // estructura de la foto de la mascota
  private fotomascota: FotoMascota;
  // image de mascota
  imagenMascota: ImageMascota;
  imagen: ImageMascota;

  constructor(
    private galeriaService: GaleriaService,
    private route: ActivatedRoute,
    private router: Router,
    private mascotaService: MascotaService,
  ) {
    this.fotomascota = {
      _id: undefined,
      name: "",
      description: "",
      picture: "",
      imagen: ""
    };
    this.imagen = {
      image: ""
    };
    this.imagenMascota = {
      image: "/assets/pet.png"
    };
  }
  // cómo agrego la foto??
  actualizarImagen(imagen: any) {
    this.fotomascota.picture = undefined;
    this.imagenMascota.image = imagen;
    this.imagen.image = imagen;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params["id"];
      if (id) {
        this.galeriaService
          .buscarFotoMascota(id)
          .then(fotomascota => {
            this.fotomascota = fotomascota;
            if (this.fotomascota.picture) {
              this.galeriaService
                .buscarImageMascota(this.fotomascota.picture)
                .then(imagen =>
                  this.imagenMascota = imagen)
                .catch(error => this.imagenMascota.image = "/assets/pet.png");
            }
            else {
              this.imagenMascota.image = "/assets/pet.png";
            }
          })
          .catch(error => {
            errorHandler.procesarValidacionesRest(this, error);
          });
      }
    });


    // busco porque quiero mostrar la mascota para setear a la foto
    this.mascotaService
      .buscarMascotas()
      .then(mascotas => (this.mascotas = mascotas))
      .catch(error => (this.errorMessage = <any>error));
    console.log(this.mascotas);


  }

  // para guardar la fotomascota con sus atributos
  submitForm() {
    errorHandler.cleanRestValidations(this);

    if (this.imagen.image && !this.fotomascota.picture) {
      this.galeriaService
        .guardarImageMascota(this.imagen)
        .then(image => {
          this.fotomascota.picture = image.id;

          this.galeriaService
            .guardarFotoMascota(this.fotomascota)
            .then(fotomascota => this.router.navigate(["/galeria"]))
            .catch(error => errorHandler.procesarValidacionesRest(this, error));
        })
        .catch(error => errorHandler.procesarValidacionesRest(this, error));

    }
    else {
      this.galeriaService
        .guardarFotoMascota(this.fotomascota)
        .then(fotomascota => this.router.navigate(["/galeria"]))
        .catch(error => errorHandler.procesarValidacionesRest(this, error));
    }
  }
  // para eliminar fotomascota
  onDelete() {
    errorHandler.cleanRestValidations(this);
    this.galeriaService
      .eliminarFotoMascota(this.fotomascota._id)
      .then(any => this.router.navigate(["/galeria"]))
      .catch(error => errorHandler.procesarValidacionesRest(this, error));
  }

}