import { Component, OnInit } from "@angular/core";
import { GaleriaService, FotoMascota } from "./galeria.service";

@Component({
  selector: "app-galeria",
  templateUrl: "./galeria.component.html",
})
export class GaleriaComponent implements OnInit {
  errorMessage: string;
  fotosMascotas: FotoMascota[];

  constructor(private galeriaService: GaleriaService) { }

  ngOnInit() {
    this.galeriaService
      .buscarFotosMascota()
      .then(fotosMascotas => {
        this.fotosMascotas = fotosMascotas,
        this.fotosMascotas.forEach(element => {
          if (element.picture) {
            this.galeriaService
              .buscarImageMascota(element.picture)
              .then(imagen =>
                element.imagen = imagen.image)
              .catch(error => element.imagen = "/assets/pet.png");
          }
          else {
            element.imagen = "/assets/pet.png";
          }
       });
      })
      .catch(error => (this.errorMessage = <any>error));
  }
}
