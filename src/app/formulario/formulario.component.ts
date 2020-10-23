import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  formBuilder: FormGroup;
  radioBtn: boolean;

  constructor(private builder: FormBuilder) {
    this.builderForm();
  }

  ngOnInit(): void {
    this.radioBtn = false;
  }

  onCheck() {
    this.radioBtn = true;
    console.log('hola')
  }

  builderForm() {
    this.formBuilder = this.builder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required, this.validateAge]],
      civil: this.builder.array([
        this.builder.control('Soltero'),
        this.builder.control('Casado'),
        this.builder.control('Viudo'),
      ]),
      gender: this.builder.array([
        this.builder.control('Hombre'),
        this.builder.control('Mujer'),
      ]),
      comments: this.builder.array([this.builder.control('')]),
    });
    console.log(this.formBuilder);
  }

  validateAge(control: AbstractControl) {
    const value = control.value;
    let error = null;
    if (value < 18) {
      error = { ...error, younger: 'debe ser mayor a 18' };
    }
    return error;
  }

  

  getGender() {
    return (this.formBuilder.get('gender') as FormArray).controls;
  }
  getCivil() {
    return (this.formBuilder.get('civil') as FormArray).controls;
  }

  getC(event) {
    console.log(event);
  }

  getComments() {
    return (this.formBuilder.get('comments') as FormArray).controls;
  }

  onAddComment() {
    (this.formBuilder.get('comments') as FormArray).push(new FormControl(''));
  }

  onRemoveComment(index: number) {
    (this.formBuilder.get('comments') as FormArray).removeAt(index);
  }

  onClickGroup() {
    console.log(this.formBuilder);
    const validForm = this.formBuilder.valid;
    if (validForm && this.radioBtn==true) {
      console.log(this.radioBtn)
      alert('FORMULARIO CORRECTO');
    } else {
      alert('FORMULARIO EERRONEO');
    }
  }
}
