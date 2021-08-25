import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ServiceGeneralService } from '../service-general.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  @Output() reLoad = new EventEmitter<any>()

  observerForm: FormGroup
  constructor(private http: ServiceGeneralService) {
    this.observerForm = this.createForm()

  }

  ngOnInit() {
  }

  createForm() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateStart: new FormControl('', Validators.required),
      bussines: new FormControl('', Validators.required),
    })
  }

  submit() {
    if (this.observerForm.valid) {
      let data = this.observerForm.value.dateStart.replace("-", "/")
      let todal = data.replace("-", "/")
      let body =
      {
        key: this.observerForm.value.name,
        bussines: this.observerForm.value.bussines,
        email: this.observerForm.value.email,
        phone: this.observerForm.value.phone,
        date: todal,
      }
      this.http.submitData(body).subscribe(data => {
        console.log(data)
      },
        error => console.log('oops', error)
      )
      this.reLoad.emit(true)
    }else{
      alert('favor llenar bien el formulario')
    }
  }

  resert() {
    this.observerForm.reset();
  }

}
