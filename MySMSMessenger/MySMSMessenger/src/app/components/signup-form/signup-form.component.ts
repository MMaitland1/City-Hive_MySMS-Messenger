import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      const user: User = {
        usernameHash: hashed,

      };

      console.log('User Registered:', user);
      alert('Sign-Up Successful!');
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




}
