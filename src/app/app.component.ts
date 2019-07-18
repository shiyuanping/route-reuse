import { Component } from '@angular/core';
import { SimpleReuseStrategy } from './simple-reuse-strategy';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SimpleReuseStrategy]
})
export class AppComponent {
  //路由列表
  menuList: Array<{ title: string, module: string, power: string,isSelect:boolean }>=[];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {

    //路由事件
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route !== null && route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((event) => {
        //路由data的标题
        let title = event['title'];
        this.menuList.forEach(p => p.isSelect=false);
        var menu = { title: title, module: event["module"], power: event["power"], isSelect:true};
        this.titleService.setTitle(title);
        let exitMenu=this.menuList.find(info=>info.title==title);
        if(exitMenu){//如果存在不添加，当前表示选中
          this.menuList.forEach(p => p.isSelect=p.title==title);
          return ;
        }
        this.menuList.push(menu);
      });
  }

  //关闭选项标签
  closeUrl(module:string,isSelect:boolean){
    //当前关闭的是第几个路由
    let index=this.menuList.findIndex(p=>p.module==module);
    //如果只有一个不可以关闭
    if(this.menuList.length==1) return ;

    this.menuList=this.menuList.filter(p=>p.module!=module);
    //删除复用
    delete SimpleReuseStrategy.handlers[module];
    if(!isSelect) return;
    //显示上一个选中
    let menu=this.menuList[index-1];
    if(!menu) {//如果上一个没有下一个选中
       menu=this.menuList[index+1];
    }
    // console.log(menu);
    // console.log(this.menuList);
    this.menuList.forEach(p => p.isSelect=p.module==menu.module );
    //显示当前路由信息
    this.router.navigate(['/'+menu.module]);
  }
}
