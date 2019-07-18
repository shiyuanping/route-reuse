import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './department-service';
import { NzMessageService } from 'ng-zorro-antd';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

export interface TreeNodeInterface {
  key: number;
  name: string;
  age: number;
  level: number;
  expand: boolean;
  address: string;
  children?: TreeNodeInterface[];
}

@Component({
  selector: 'app-department-setting',
  templateUrl: './department-setting.component.html',
  styleUrls: ['./department-setting.component.css'],
  providers: [ DepartmentService ]
})

export class DepartmentSettingComponent implements OnInit {
  isVisible = false;
  isDept: boolean;
  modalTitle: string;
  validateForm: FormGroup;
  tempKey: any;
  tempData: any;
  formData: any;
  data = [];
  expandDataCache = {};

  dataSet = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park'
    }
  ];
  constructor(
    private fb: FormBuilder,
    private httpService: DepartmentService,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getAllDeptList();
    this.validateForm = this.fb.group({
      name: [ null, [ Validators.required ] ],
      tel: [ null ],
      fax: [ null ],
      address: [ null ]
    });
  }

  //修改部门树的id值
  findTree(data) {
      data.forEach(item => {
        item['key'] = item.id;
        if (item.children.length > 0) {
          this.findTree(item.children);
        }
      })
  }
  //获取部门树的方法
  getAllDeptList() {
    this.httpService.getDeptList().then(
      (res:any) => {
        this.findTree(res);
        this.data = res;
        this.data.forEach(item => {  //转换完数据库的数据后，需要再次调用这个方法
          this.expandDataCache[ item.key ] = this.convertTreeToList(item);
        });
      }
    );
  }
  //表格树的基础引入
  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }
  convertTreeToList(root: object): TreeNodeInterface[] {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });
    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
        }
      }
    }
    return array;
  }
  visitNode(node: TreeNodeInterface, hashMap: object, array: TreeNodeInterface[]): void {
    if (!hashMap[ node.key ]) {
      hashMap[ node.key ] = true;
      array.push(node);
    }
  }

  //显示模态框
  show(item, key): void {
    this.validateForm.setValue = null;
    this.tempData = item;
    if(key === 1) {
      this.modalTitle = '添加分公司';
      this.tempKey = 1;

    }else if(key === 2){
      this.modalTitle = '添加部门';
      this.isDept = true;
      this.tempKey = 2;
    }else {
      this.modalTitle = '添加顶级部门';
      this.tempKey = 3;
    }
    this.isVisible = true;
  }
  save(): void {
    const key = this.tempKey;
    if(key === 1) {
      this.formData = {
        ...this.validateForm.value,
        pid: this.tempData.id
      };
      this.httpService.addBranch(this.formData).then(
        res => {
          this.getAllDeptList();
          this.formData = {};
          this.isVisible = false;
          this.nzMessageService.success('添加分公司成功！');
        }
      )
    }else if(key ===2) {
      this.formData = {
        name: this.validateForm.value.name,
        pid: this.tempData.id
      };
      this.httpService.addDept(this.formData).then(
        res => {
          this.getAllDeptList();
          this.formData = {};
          this.isVisible = false;
          this.nzMessageService.success('添加部门成功！');
        }
      )
    }else if(key ===3) {
      this.formData = {
        ...this.validateForm.value,
        pid: null
      };
      this.httpService.addBranch(this.formData).then(
        res => {
          this.getAllDeptList();
          this.formData = null;
          this.isVisible = false;
          this.nzMessageService.success('添加顶级部门成功！');
        }
      )
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isDept = false;
  }

  //删除单位部门
  delete(id) {
    this.httpService.deleteDept(id).then(
      res => {
        this.getAllDeptList();
        this.nzMessageService.success('删除部门成功！');
      }
    );
  }
  cancel(): void {
    this.nzMessageService.success('取消成功');
  }







  

  submitForm(): void {
    Object.keys(this.validateForm.controls).forEach(i => {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    });
  }

  // genderChange(value: string): void {
  //   this.validateForm.get('name').setValue(value === 'male' ? 'Hi, man!' : 'Hi, lady!');
  // }



  //编辑
  edit(item) {

  }
}
