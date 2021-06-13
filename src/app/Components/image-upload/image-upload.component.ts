import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFilesService } from 'src/app/services/upload-files.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  dummFiles:any[];

  fileInfos?: Observable<any>;
  
  constructor(private uploadService: UploadFilesService) { }

  ngOnInit(): void {
  }
  // selectFiles(event): void {
  //   this.message = [];
  //   this.progressInfos = [];
  //   this.selectedFiles = event.target.files;
    
  // }

  // uploadFiles(): void {
  //   this.message = [];
  
  //   if (this.selectedFiles) {
  //     for (let i = 0; i < this.selectedFiles.length; i++) {
  //       this.upload(i, this.selectedFiles[i]);
  //     }
  //   }
  // }
  // upload(idx: number, file: File): void {
  //   this.progressInfos[idx] = { value: 0, fileName: file.name };
  
  //   if (file) {
  //     this.uploadService.upload(file,).subscribe(
  //       (event: any) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
  //         } else if (event instanceof HttpResponse) {
  //           const msg = 'Uploaded the file successfully: ' + file.name;
  //           this.message.push(msg);
  //           //this.fileInfos = this.uploadService.getFiles();
  //         }
  //       },
  //       (err: any) => {
  //         this.progressInfos[idx].value = 0;
  //         const msg = 'Could not upload the file: ' + file.name;
  //         this.message.push(msg);
  //        // this.fileInfos = this.uploadService.getFiles();
  //       });
  //   }
  // }

}
