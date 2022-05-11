import { Component, OnInit } from '@angular/core';
import { TableService } from '../service/table.service';

@Component({
  selector: 'app-tbl-bootstrap',
  templateUrl: './tbl-bootstrap.component.html',
  styleUrls: ['./tbl-bootstrap.component.scss']
})
export class TblBootstrapComponent implements OnInit {

  list : Array<any> = null;

  constructor(private service : TableService) { }

  ngOnInit() {
    this.getItem();
  }

  getItem(){
    this.service.findAll().subscribe(data => {
      this.list = data.body;
    })
  }

}
