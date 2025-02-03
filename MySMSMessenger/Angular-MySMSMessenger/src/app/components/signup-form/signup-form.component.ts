import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { RubyApiService } from '../../services/ruby-api.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private rubyApiService: RubyApiService,
    private router: Router,
    private sessionService: SessionService // ✅ Inject SessionService
  ) { }

  ngOnInit(): void {
    // Redirect if session already exists
    if (this.sessionService.hasSessionData()) {
      this.router.navigate(['/message']);
      return;
    }

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatchValidator });
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      const username = this.signupForm.value.username.toLowerCase(); // Case-insensitive
      const password = this.signupForm.value.password;

      // Combine username + password, then hash
      const hashed = await this.hashData(username + password);

      // Create User object
      const user: User = { usernameHash: hashed };

      this.rubyApiService.createUser(user).subscribe(
        (response: any) => {
          if (response.usernameHash) {
            // ✅ Use SessionService with User interface
            this.sessionService.setSessionData({ usernameHash: response.usernameHash });

            console.log('User created:', response);
            this.router.navigate(['/message']); // Redirect on success
          } else {
            console.error('Error creating user:', response);
          }
        },
        (error: any) => {
          console.error('Error creating user:', error);
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  // Custom validator to check if passwords match
  private passwordsMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { passwordsMismatch: true };
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
    this.signupForm.reset();
  }

  toggleShowPassword(event: any) {
    this.showPassword = event.target.checked;
  }
}
