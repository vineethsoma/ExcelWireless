import { Component, OnInit, ElementRef } from '@angular/core';
import { AdminService } from "./admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService, private element: ElementRef) { }

  image: any;
  formData: FormData;

  ngOnInit() {
  }

  addImage(event) {

    console.log('image', document.querySelectorAll('#file-input').item(0));
    console.log('Event', event.target.files[0]);
    // this.image = document.querySelectorAll('#file-input')[value].fi;

    // const reader = new FileReader();
    // const image = this.element.nativeElement.querySelector('.image');

    // reader.onload = function(e) {
    //     const src = e.target.result;
    //     image.src = src;
    // };

    // reader.readAsDataURL(event.target.files[0]);
}

    // this.formData.append('file', this.image);
    // this.adminService.addImage(this.formData);



}
