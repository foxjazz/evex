import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";


import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HelpComponent } from "./help/help.component";
import { RegionsComponent } from "./regions/regions.component";
import { TimersComponent } from "./timers/timers.component";
import { AlertsComponent } from "./alerts/alerts.component";
import { PriceBoardComponent } from "./price-board/price-board.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { TreeviewComponent } from "./treeview/treeview.component";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {RegionService} from "./shared/region.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

const appRoutes: Routes = [
  { path: "regions", component: RegionsComponent },
  { path: "home", component: HomeComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    RegionsComponent,
    TimersComponent,
    AlertsComponent,
    PriceBoardComponent,
    NavbarComponent,
    TreeviewComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [RegionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
