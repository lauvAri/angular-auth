import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../../config.service'; // 导入ConfigService

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

  // 类似Spring Boot中的Autowired
  constructor(private configService: ConfigService) { } // 注入ConfigService

  onSubmit() {
    this.loginAttempts++;
    console.log(this.user);
    console.log('Backend Base URL:', this.configService.backendBaseUrl); // 使用ConfigService中的base URL
    fetch(`${this.configService.backendBaseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(this.user)
    })
    .then(res => res.json())
    .then(data => {
      this.loginMsg = data.message;
      this.loginCode = data.code;
      if (this.loginCode === 0 && data.access_token) {
        // 在cookie中存入access_token
        document.cookie = `access_token=${data.access_token || ''};path=/`;
      }
    })
    .catch(error=> {
      console.error(error);
    }) 
  }
}