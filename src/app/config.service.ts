import { Injectable } from '@angular/core';

// 全局注入，保证单例(避免程序员手动去new)
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // 配置后端base url
  public backendBaseUrl = 'http://localhost:3000/api/v1';
}