import { Component, OnInit } from '@angular/core';
import {ItemsService} from "../shared/items.service";
import {ICategory, IGroup, IType} from "../interfaces/iitems";
import {logging} from "selenium-webdriver";



@Component({
  selector: 'app-items-by-group',
  templateUrl: './items-by-group.component.html',
  styleUrls: ['./items-by-group.component.css']
})
export class ItemsByGroupComponent implements OnInit {

  public groups: Array<IGroup>;
  public categories: Array<ICategory>;
  public selectedCategory: ICategory;
  public selectedGroup: IGroup;
  public selectedType: IType;
  public types: Array<IType>;
  public test: string;
  constructor(private is: ItemsService) {
    this.categories = new Array<ICategory>();
    this.groups = new Array<IGroup>();
    this.types = new Array<IType>();
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
