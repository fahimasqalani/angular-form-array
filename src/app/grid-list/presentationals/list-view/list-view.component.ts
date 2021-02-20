import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { FormGroup, FormArray, FormControl, Form, Validators, FormBuilder } from '@angular/forms';
import { noop } from 'rxjs';
import { buildFormGroup } from 'src/app/models/employee-list';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnChanges {
  @Input() gridDataSource: FormArray;





  displayedColumns: string[] = [
    'FirstName',
    'LastName',
    'Email',
    'Age',
    'PhoneNumber',
    'action'
  ];
  gridForm: FormGroup;

  get list() {
    return this.gridForm.get('list');
  }

  constructor(private fb: FormBuilder) {
    this.gridForm = this.fb.group({
      list: new FormArray([]),
      changesValue: ['I dont know My age', Validators.compose([Validators.required])],
      quantity: [0, Validators.compose([Validators.required, , Validators.min(2), Validators.max(10)])],

    })

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.gridForm) {
      this.gridForm.setControl('list', this.gridDataSource);
    }

    this.gridForm.controls['quantity'].valueChanges.subscribe(qua => {
      const control = <FormArray>this.gridForm.controls['list'];

      let a: Employee ={id: null, firstName: null, email: null, age: null, lastName: null, phoneNumber: null};
      control.push(buildFormGroup(a));
      this.gridForm.setControl('list', control);
      this.gridForm.controls['list']
    })
    this.gridForm.controls['list'].valueChanges.subscribe((e: any[]) => {
      console.log(e)

      const age = e.reduce((partial_sum, a) => partial_sum + Number(a.age), 0) + ' Years Old '

      this.gridForm.controls['changesValue'].patchValue(age)


    })



  }


  addnewName() {
    const a = {
      id: `jkasjkd`,
      firstName: `Fahim `,
      lastName: `Bergabung Meletop`,
      age: 27,
      phoneNumber: `0974362010`,
      email: `Louise.smith@xxx.com`,
    };

    const control = <FormArray>this.gridForm.controls['list'];
    control.push(buildFormGroup(a));
    this.gridForm.setControl('list', control);


    
  }

  
  barangRemove(barang: number) {
    const control = <FormArray>this.gridForm.controls['list'];
    control.removeAt(barang)
    this.gridForm.setControl('list', control);
    console.log('run')

  }


}
