import { Component, OnInit } from "@angular/core";
import {ItemsService} from "../shared/items.service";
import {
  Alert, CTradeItemPrice, Hub, ICategory, IGroup, IHubItemPrice, IOrder, ItemType, ITradeItemPrice, IType,
  TradeHubs
} from "../interfaces/IItems";



@Component({
  selector: "app-items-by-group",
  templateUrl: "./items-by-group.component.html",
  styleUrls: ["./items-by-group.component.css"]
})
export class ItemsByGroupComponent implements OnInit {

  public groups: Array<IGroup>;
  public categories: Array<ICategory>;
  public selectedCategory: ICategory;
  public selectedGroup: IGroup;
  public selectedType: IType;
  public types: Array<IType>;
  public test: string;

  public tradeItemPriceList: ITradeItemPrice[];
  // Hubs
  public yourHub: Hub;
  public lastHub: Hub;
  public tradeHubs: TradeHubs;

  public orders: IOrder[];

  constructor(private is: ItemsService) {
    this.categories = new Array<ICategory>();
    this.groups = new Array<IGroup>();
    this.types = new Array<IType>();

    this.hubItemPriceList = new Array<IHubItemPrice>();

    this.orders = new Array<IOrder>();
    this.tradeHubs = new TradeHubs();
    this.tradeHubs.Hubs = new Array<Hub>();
    let hub = new Hub();
    hub.name = "Jita"; hub.regionId = 10000002; hub.stationId = 60003760;
    this.tradeHubs.Hubs.push(hub);
    this.yourHub = hub;

    this.lastHub = hub;
    hub = new Hub();
    hub.name = "Amarr"; hub.regionId = 10000043; hub.stationId = 60008494;
    this.tradeHubs.Hubs.push(hub);
    hub = new Hub();
    hub.name = "Dodixie"; hub.regionId = 10000032; hub.stationId = 60011866;
    this.tradeHubs.Hubs.push(hub);
    hub = new Hub();
    hub.name = "Rens"; hub.regionId = 10000030; hub.stationId = 60004588;
    this.tradeHubs.Hubs.push(hub);
    hub = new Hub();
    hub.name = "Hek"; hub.regionId = 10000042; hub.stationId = 60005686;
    this.tradeHubs.Hubs.push(hub);
    hub = new Hub();
    hub.name = "Tash-Murkon"; hub.regionId = 10000020; hub.stationId = 60008764;
    this.tradeHubs.Hubs.push(hub);
    hub = new Hub();
    hub.name = "Oursulaert"; hub.regionId = 10000064; hub.stationId = 60011740;
    this.tradeHubs.Hubs.push(hub);
    hub = new Hub();
    localStorage.setItem("tradeHubs", JSON.stringify(this.tradeHubs));
  }

  public setHubPrice(type: IType, hub: Hub)
  {
    this.is.getPriceDataUri(hub.regionId.toString()).subscribe(res => {
        let retval  = NaN;
        for (let ll of res) {
          if (ll.location_id === hub.stationId && ll.is_buy_order === false && ll.type_id === type.type_id) {
            if (isNaN(retval) || ll.price < retval)
              retval = ll.price;
          }
        }
        this.setItemPrice(type, hub.name, retval);
      }
    );
  }

  setItemPrice(type: IType, hub: string, price:number) {

    let f = false;
    for(let o of this.tradeItemPriceList){

      if(o.item.type_id === type.type_id){
        f = true;
        switch(hub){
          case "Jita": o.jitaPrice = price;
          case "Amarr": o.amarrPrice = price;
          case "Dodixie": o.dodixiePrice = price;
          case "Rens": o.rensPrice = price;
          case "Hek": o.hekPrice = price;
        }
      }
    }
    if(f === false){
      let o = new CTradeItemPrice();
      o.item = type;
      switch(hub){
        case "Jita": o.jitaPrice = price;
        case "Amarr": o.amarrPrice = price;
        case "Dodixie": o.dodixiePrice = price;
        case "Rens": o.rensPrice = price;
        case "Hek": o.hekPrice = price;
      this.tradeItemPriceList.push(o);
    }
  }


  public onRemoveItem ( item: ItemType)
  {
    if(event.target["alt"] === "bom")
    {
      //this.onGetBOM(item);
    }
   /* else if(event.target["alt"]==="save event"){
      this.saveEvent(item);
    }*/
    else if(event.target["alt"]==="fallsbelow")
    {
      return;
    }
    else if (event.target["id"]==="remove"){
      let tempItems = this.selItemTypes;
      this.selItemTypes = new Array<ItemType>();
      let i = 0;
      for (i = 0; i < tempItems.length; i++) {
        if (item === tempItems[i]) {
          continue;
        }
        this.selItemTypes.push(tempItems[i]);
      }
      localStorage.setItem('SelEveItems', JSON.stringify(this.selItemTypes));
    }
    else if(event.target["id"]==="addAlert"){
      let eid = localStorage.getItem("EveId");
      if(eid != null && eid.length > 0){
        let res = localStorage.getItem('EveAlerts');
        let alerts = JSON.parse(res);
        let alert: Alert = {
          type: item.type,
          side: "ask",
          hub: this.getHub("Jita"),
          price: item.Jitaprice,
          targetPrice: Number((item.Jitaprice * .9).toFixed(0)),
          percentage: 10,
          qty: 0
        };
        if(this.alerts == null) {
          this.alerts = new Array<Alert>();
        }
        if(this.alerts.length < 20)  //no more than 20
          this.alerts.push(alert);
        localStorage.setItem('EveAlerts', JSON.stringify(this.alerts));
      }
    }
  }
  public onSelectItem (it: ItemType) {
    let i = 0;
    for (i = 0; i < this.selItemTypes.length; i++) {
      if (it === this.selItemTypes[i]) {
        return;
      }
    }
    this.setHubPrice(it,this.getHub('Jita'));
    this.setHubPrice(it,this.getHub('Amarr'));
    this.setHubPrice(it,this.getHub('Dodixie'));
    this.setHubPrice(it,this.getHub('Hek'));
    this.setHubPrice(it,this.getHub('Rens'));
    /*
            this.setHubPrice(it,this.getHub('Tash-Murkon'));
            this.setHubPrice(it,this.getHub('Oursulaert'));
    */
    this.selItemTypes.push(it);
    localStorage.setItem('SelEveItems', JSON.stringify(this.selItemTypes));
  }

  private addCategory(c: ICategory){
    this.categories.push(c);
  }



  onSelectCategory(ic: ICategory){
    this.groups.length = 0;

    for(const gg of ic.groups){

        this.is.getGroup(gg.toLocaleString()).subscribe(x => {
          this.groups.push(x);
      });
    }
  }

  onSelectType(it: IType){

  }
  onSelectGroup(ig: IGroup){
    this.types.length = 0;
    for(const gt of ig.types){
      this.is.getType(gt).subscribe(xt => {
        this.types.push(xt);
      });


    }

  }
  ngOnInit() {
    this.is.getCategories().subscribe(x => {
      if (x != null)
        this.is.categoryNumbers = x.splice(",");
      this.test = this.is.categoryNumbers[0];
      for (const r of this.is.categoryNumbers) {
        this.is.getCategoryContent(r.toString()).subscribe(ret => {
          this.addCategory(ret);
        });
      }

    });
  }

}
