export interface ItemTypesA {items: Array<ItemType>;}
export interface ItemTypes { totalCount_str: string; pageCount: number; items: Array<ItemType>; }
export interface ItemType { marketGroup: MarketGroup; type: Type; id: number; id_str: string; Jitaprice: number; Amarrprice: number;
  Hekprice:number; Dodixieprice: number; Rensprice: number; Tashprice: number; Ourprice: number; Alertprice: number; AlertCondition: string; }
export interface MarketGroup {href: string; id: number; id_str: string; }
export interface Type { id_str: string; href: string; id: number; name: string; icon: Icon;}
export interface Icon {href: string; }
/**
 * Created by fox21 on 11/16/2016.
 */
export interface ItemGroup {name: string; href: string; id_str: string; id: number; types: {href: string; };
  parentGroup: {href: string; };
  description: string;
  isExpanded: boolean;
  children: Array<ItemGroup>;

}

export class Hub { name: string; regionId: Number; stationId: Number; }
export interface Alert{type: Type; side: string; hub: Hub; price: number; targetPrice: number; percentage: number; qty: number;}
export interface BItem {typeid: number; description: string; price: number;}
export interface ItemBuild {items: Array<BItem>; }
export interface ItemGroups {items: Array<ItemGroup>; }
export class ItemGroupsCls {items: Array<ItemGroup>; }
export interface bom {quantity: number; typeid: number; }
export interface Blueprint {
  productTypeId: number;
  bom: [{typeid: number; quantity: number; }];
}
export class ItemBuildCls { items: Array<BItem>; }


export class TradeHubs { Hubs: Array<Hub>; }

export interface ICategory {
  category_id: number;
  name: string;
  published: boolean;
  groups: number[];
}
export interface IGroup {
  group_id: number;
  name: string;
  published: boolean;
  category_id: number;
  types: number[];
}
export interface DogmaAttribute {
  attribute_id: number;
  value: number;
}

export interface DogmaEffect {
  effect_id: number;
  is_default: boolean;
}

export interface IType {
  type_id: number;
  name: string;
  description: string;
  published: boolean;
  group_id: number;
  market_group_id: number;
  radius: number;
  volume: number;
  packaged_volume: number;
  capacity: number;
  portion_size: number;
  mass: number;
  graphic_id: number;
  dogma_attributes: DogmaAttribute[];
  dogma_effects: DogmaEffect[];
}
