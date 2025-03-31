import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule], // 确保可以使用[(ngModel)]
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  pageTitle = '用户登录';
  user = {username:'', password:''};
  showPassword = false;
  loginAttempts = 0;
  loginMsg = '';
  loginCode = -1;

  onSubmit() {
    this.loginAttempts++;
    console.log(this.user);
    if (this.user.username === 'admin' && this.user.password === 'admin') {
      this.loginMsg = '登录成功';
      this.loginCode = 0;
    } else if (this.user.username !== 'admin') {
      this.loginMsg = '当前用户不存在';
      this.loginCode = 1;
    } else {
      this.loginMsg = '密码错误';
      this.loginCode = 2;
    }
  }
}
