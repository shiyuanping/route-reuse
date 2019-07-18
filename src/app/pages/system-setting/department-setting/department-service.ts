import { Injectable } from '@angular/core';
import { HttpService } from '../../../@core/utils/http.service';

@Injectable()

export class DepartmentService {

  constructor(private http: HttpService) { }

  // 获取部门树
  getDeptList() {
    return new Promise((resolve, reject) => {
      this.http.get(`api/v1/organization-units`)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  //新增分部
  addBranch(item) {
    return new Promise((resolve, reject) => {
      this.http.post('api/v1/organization-units/branches', item)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  //更新分部
  updateBranch(id, item) {
    return new Promise((resolve, reject) => {
      this.http.put(`api/v1/organization-units/branches/${id}`, item)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  //新增部门
  addDept(item) {
    return new Promise((resolve, reject) => {
      this.http.post('api/v1/organization-units/departments', item)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  //更新部门
  updateDept(id, item) {
    return new Promise((resolve, reject) => {
      this.http.put(`api/v1/organization-units/departments/${id}`, item)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  //删除部门
  deleteDept(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(`api/v1/organization-units/${id}`)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
}
