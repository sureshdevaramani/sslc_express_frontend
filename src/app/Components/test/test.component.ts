import { Component, OnInit } from '@angular/core';
import { eventNames } from 'process';

import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  willDownload = false;
  dataString:any;
  constructor() { }
  ngOnInit(): void {
  }
   
  onFileChange(ev) {
    //console.log(ev)
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    let i = 0;
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      console.log(workBook)
      jsonData = workBook.SheetNames.reduce((initial,su) => {
        
        
        const sheet = workBook.Sheets[su];
       // console.log(workBook.Sheets[su])
        if(i==0){
        initial[su] = XLSX.utils.sheet_to_json(sheet);
        i++;
      }
        //console.log(initial)
        //i++;
        return initial;
        
        
      }, {});
      
      let ques=jsonData.Suresh
      console.log(ques)
      const dataString = JSON.stringify(jsonData);
      this.dataString = ques;
      //console.log(dataString)
     // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
     
    }
    reader.readAsBinaryString(file);
  }
  posObj:any[];
  imageList:any[];
  image:any;
  
  onFileUpdate(event, index) {
    const upload = new FormData();
    
    let img;
    let quesNo;
    let tempObj: any;
    quesNo = index;
    tempObj = {"questionNumber": quesNo,imageData:"suresh"}
    console.log(tempObj.imageData)
    
    
    const files = event.target.files[0];
    upload.append('first',files,files.name)
 
    console.log(upload)
    this.posObj.push(upload)
    if (files.length === 0) return;

    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    //console.log(reader.result)
   // reader.onload = e=>this.image = reader.result ;
    
    reader.onload = _event => {
     // this.products[index].imgBase64Data = reader.result as string;
      this.image = reader.result as string;
     // console.log(this.image)
      tempObj.imageData = reader.result as string;
      //img=reader.result as string;
      
    };
    
    
    
    
  }

  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }



}
