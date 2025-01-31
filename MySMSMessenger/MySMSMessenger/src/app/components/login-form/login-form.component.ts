import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username.toLowerCase(); // Case-insensitive
      const password = this.loginForm.value.password;

      // Combine username + password, then hash
      const hashed = await this.hashData(username + password);

      // Create User object
      const user: User = {
        usernameHash: hashed
      };

      console.log('User:', user);
      alert('Login Successful!');
    } else {
      alert('Please fill out all required fields.');
    }
  }

  // Hashing function using SHA-256
  async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }


  clearForm(event: Event) {
    event.preventDefault();
    this.loginForm.reset();
}


}
