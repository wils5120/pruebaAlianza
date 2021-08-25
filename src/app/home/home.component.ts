import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from '../service-general.service';
import { ExportCsvService } from '../export-csv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  headerTile: any[] = [
    {name:"SharedKey"},
    {name:"BusinessId"},
    {name:"E-mail"},
    {name:"Phone"},
    {name:"Date Added"},
  ]
    dataTable: any;
    backUpData: any;
    keyfind: any;


  constructor(private service: ServiceGeneralService, private exportCsv: ExportCsvService) { }

  ngOnInit() {
    this.getDate()
  }

  find(event: any){
    this.keyfind = event.target.value
    this.dataTable = this.backUpData
    if(this.keyfind.length > 3){
      /* aca tambien es un buscador pero hecho desde el front */
     /*  this.dataTable = this.dataTable.filter((i: any) => i.key == this.keyfind) */
    }else{
      this.dataTable = this.backUpData
    }
  }

  getDate(){
    console.log("vsc")
    this.service.getData().subscribe((data:any) => {
      this.dataTable = data
      this.backUpData = data
    },
    error => console.log('oops', error)
    )
  }

  getDataKeys(){
    this.service.getDataKey(this.keyfind).subscribe(data => {
      this.dataTable = []
      this.dataTable.push(data)
    },   error => console.log('oops', error))
  }

  download(){
    this.exportCsv.downloadFile(this.backUpData, 'jsontocsv');
  }

}
