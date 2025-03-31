import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
/**
 * 组件是 Angular 应用程序的构建块。
 组件包括一个 TypeScript 类，
 该类具有 @Component() 修饰器、HTML 模板和样式。

 类是放置组件所需的任何逻辑的位置。
 这种代码可以包括函数、事件监听器、属性和对服务的引用等。
 类位于名称为 feature.component.ts 的文件中，
 其中 feature 为组件的名称
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  // 元数据：指明该组件的其他资源
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-login';
}
