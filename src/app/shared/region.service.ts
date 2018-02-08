import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { IRegions, Region, ISystems } from "../interfaces/IRegions";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RegionService {

  private uri = "https://crest-tq.eveonline.com/regions/";
  private uriSys: string = "";
  public Regions: Array<Region>;

  public loading: boolean;
  public d: [Region];
  public e: Array<Object>;
  result: Object;

  private baseUri: string;
  private uriEnd: string;
  private regions: string[];
  private regionsUri: string;
  constructor(private http: HttpClient) {
    this.baseUri = "https://esi.tech.ccp.is/latest/universe";
    this.uriEnd = "/?datasource=tranquility";
    this.regionsUri = "https://esi.tech.ccp.is/latest/universe/regions/?datasource=tranquility";
  }

  public getRegions(): Observable<any> {
    return this.http.get(this.regionsUri);
  }

  getRegionContent(id: string): Observable<IRegions> {
    this.uri  = "https://crest-tq.eveonline.com/market/" + id + "/orders/?type=https://crest-tq.eveonline.com/inventory/types/34/";
    return this.http.get<IRegions>(this.uri);


  }
  getSystems(id: string): Observable<ISystems> {
    //https://crest-tq.eveonline.com/market/10000002/orders/?type=https://crest-tq.eveonline.com/inventory/types/34/
    let uriSys = "https://crest-tq.eveonline.com/market/" + id + "/orders/?type=https://crest-tq.eveonline.com/inventory/types/34/";
    return this.http.get<ISystems>(uriSys);


  }

}
