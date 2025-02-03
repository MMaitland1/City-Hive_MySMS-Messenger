import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { RubyApiService } from '../../services/ruby-api.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private rubyApiService: RubyApiService,
    private router: Router,
    private sessionService: SessionService // ✅ Inject SessionService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Redirect if user is already logged in
    if (this.sessionService.hasSessionData()) {
      this.router.navigate(['/message']);
    }
  }

  toggleShowPassword(event: any) {
    this.showPassword = event.target.checked;
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username.toLowerCase();
      const password = this.loginForm.value.password;

      const hashed = await this.hashData(username + password);
      const user: User = { usernameHash: hashed };

      this.rubyApiService.readUser(hashed).subscribe(
        (response: User | null) => {
          if (response) {
            // ✅ Use SessionService to store session data
            this.sessionService.setSessionData(user);

            console.log('User logged in:', response);
            this.router.navigate(['/message']);
          } else {
            this.loginError = 'Username or password is incorrect.';
          }
        },
        (error) => {
          this.loginError = 'An error occurred. Please try again.';
        }
      );
    } else {
      this.clearForm();
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

  clearForm(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.loginError = ''; 
    this.loginForm.reset();
  }
}
