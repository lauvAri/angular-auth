import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../config.service'; // 导入ConfigService

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  pageTitle = '用户注册';
  user = {username:'', password:'', confirmPassword:''};
  showPassword = false;
  registerAttempts = 0;
  registerMsg = '';
  registerCode = -1;

  constructor(private configService: ConfigService) { } // 注入ConfigService

  onSubmit() {
    this.registerAttempts++;
    console.log(this.user);
    console.log('Backend Base URL:', this.configService.backendBaseUrl); // 使用ConfigService中的base URL
    if (this.user.username.length < 5) {
      this.registerMsg = '注册失败 用户名长度应大于5';
      this.registerCode = 1;
    } else if (this.user.password.length < 5) {
      this.registerMsg = '注册失败 密码长度应大于5';
      this.registerCode = 2;
    } else if(this.user.password !== this.user.confirmPassword){
      this.registerMsg = '注册失败 两次输入的密码不一致';
      this.registerCode = 3;
    } else if(this.containsSpecialChars(this.user.username)){
      this.registerMsg = '注册失败 用户名中不得包括特殊字符';
      this.registerCode = 4;
    } else if(this.containsSpecialChars(this.user.password)){
      this.registerMsg = '注册失败 密码中不得包括特殊字符';
      this.registerCode = 5;
    } else{
      fetch(`${this.configService.backendBaseUrl}/users`, {
        method: 'POST',
        body: JSON.stringify(this.user),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(data => {
         this.registerMsg = data.message;
         this.registerCode = data.code;
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  containsSpecialChars(str: string): boolean {
    const specialChars = /[!@#$%^&*(),.?"':;{}|<>/-_=+<>]/;
    return specialChars.test(str);
  }
}