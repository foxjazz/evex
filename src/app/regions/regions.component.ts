import { Component, OnInit } from "@angular/core";
import {RegionService} from "../shared/region.service";
import {forEach} from "@angular/router/src/utils/collection";
import {IRegion} from "../interfaces/IRegions";

@Component({
  selector: "app-regions",
  templateUrl: "./regions.component.html",
  styleUrls: ["./regions.component.css"]
})
export class RegionsComponent implements OnInit {

  constructor(private rg: RegionService) {
    this.theCount = 0;
    this.Regions = new Array<IRegion>();
    this.sRegions = new Array<IRegion>();
    this.viewRegions = false;
    this.rl = 0;
  }
  public test: any;
  public regionIds: string[];
  private Regions: IRegion[];
  public sRegions: IRegion[];
  public selectedRegion: IRegion;
  public rl: number;
  public theCount: number;
  public viewRegions: boolean;
  addRegion(r: IRegion) {

    this.theCount++;
    this.Regions.push(r);
    this.rl  = this.rg.regions.length;
    if(this.theCount === this.rg.regions.length){
      this.sortRegions();
      this.viewRegions = true;
    }
  }
  onSelectRegion(rr: IRegion){
    this.selectedRegion = rr;
  }
  sortRegions() {
    this.sRegions = this.Regions.sort((left, right): number => {
      if (left.name < right.name) return -1;
      if (left.name > right.name) return 1; else return 0; });
  }
  ngOnInit() {
      this.rg.getRegions().subscribe(x => {
        if (x != null)
          this.rg.regions = x.splice(",");

        this.test = this.rg.regions[0];
        for (const r of this.rg.regions) {
          this.rg.getRegionContent(r.toString()).subscribe(ret => {
            this.addRegion(ret);
          });
        }

    });

  }

}
