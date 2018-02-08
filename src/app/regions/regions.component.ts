import { Component, OnInit } from "@angular/core";
import {RegionService} from "../shared/region.service";

@Component({
  selector: "app-regions",
  templateUrl: "./regions.component.html",
  styleUrls: ["./regions.component.css"]
})
export class RegionsComponent implements OnInit {

  constructor(private rg: RegionService) { }
  public test: any;
  public regionIds: string[];
  ngOnInit() {


      this.rg.getRegions().subscribe(x => {
        this.regionIds = x.splice(",");
        this.test = this.regionIds[0];
    });

  }

}
