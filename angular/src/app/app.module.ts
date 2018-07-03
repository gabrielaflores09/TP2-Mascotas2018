import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgDatepickerModule } from "ng2-datepicker";
import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { LoggedIn, routing } from "./app.routes";
import { MascotaComponent } from "./mascota/mascota.component";
import { MascotaService } from "./mascota/mascota.service";
import { NuevaMascotaComponent } from "./mascota/nueva-mascota.component";
import { MenuComponent } from "./menu/menu.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { PerfilService } from "./perfil/perfil.service";
import { ProvinciaService } from "./provincia/provincia.service";
import { FileUploadComponent } from "./tools/image.base64";
import { RegistrarUsuarioComponent } from "./usuario/registrar-usuario.component";
import { UsuarioService } from "./usuario/usuario.service";
import { WelcomeComponent } from "./welcome/welcome.component";
import { GaleriaComponent } from "./galeria/galeria.component";
import { NuevaGaleriaComponent } from "./galeria/nueva-galeria.component";
import { GaleriaService } from "./galeria/galeria.service";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PerfilComponent,
    MascotaComponent,
    MenuComponent,
    NuevaMascotaComponent,
    RegistrarUsuarioComponent,
    FileUploadComponent,
    GaleriaComponent,
    NuevaGaleriaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgDatepickerModule,
    routing
  ],
  providers: [
    MascotaService,
    UsuarioService,
    ProvinciaService,
    PerfilService,
    LoggedIn,
    GaleriaService,
    /* Los providers son @Inyectable, la siguiente es una forma de definir un
     provider con un valor constante para poder inyectarlo*/
    { provide: APP_BASE_HREF, useValue: environment.baseHref }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
