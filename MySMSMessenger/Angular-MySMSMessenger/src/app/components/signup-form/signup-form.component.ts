import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import form-building utilities
import { User } from '../../models/User'; // Import the User interface
import { RubyApiService } from '../../services/ruby-api.service'; // Service for API calls
import { Router } from '@angular/router'; // Router for navigation
import { SessionService } from '../../services/session.service'; // Service to manage session data

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html', // Path to the template
  styleUrls: ['./signup-form.component.css'] // Path to the stylesheet
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup; // Define the form group
  showPassword = false; // Flag to toggle password visibility

  constructor(
    private fb: FormBuilder, // Inject FormBuilder for building the form
    private rubyApiService: RubyApiService, // Inject RubyApiService for API requests
    private router: Router, // Inject Router for navigation
    private sessionService: SessionService // Inject SessionService for session management
  ) { }

  ngOnInit(): void {
    // Redirect the user to the message page if they are already logged in
    if (this.sessionService.hasSessionData()) {
      this.router.navigate(['/message']);
      return;
    }

    // Initialize the signup form with validation rules
    this.signupForm = this.fb.group({
      username: ['', Validators.required], // Username field with a required validator
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field with required and min length validation
      confirmPassword: ['', Validators.required] // Confirm password field with a required validator
    }, { validator: this.passwordsMatchValidator }); // Use a custom validator to check if passwords match
  }

  // Handle the form submission
  async onSubmit() {
    if (this.signupForm.valid) {
      const username = this.signupForm.value.username.toLowerCase(); // Convert username to lowercase for case insensitivity
      const password = this.signupForm.value.password;

      // Combine username and password and hash the result
      const hashed = await this.hashData(username + password);

      // Create a User object with the hashed username and password
      const user: User = { usernameHash: hashed };

      // Call the API to create the user
      this.rubyApiService.createUser(user).subscribe(
        (response: any) => {
          if (response.usernameHash) {
            // Store the usernameHash in the session service
            this.sessionService.setSessionData({ usernameHash: response.usernameHash });

            console.log('User created:', response);
            this.router.navigate(['/message']); // Redirect to the message page on success
          } else {
            console.error('Error creating user:', response);
          }
        },
        (error: any) => {
          console.error('Error creating user:', error);
        }
      );
    } else {
      alert('Please fill out all required fields correctly.'); // Show alert if the form is invalid
    }
  }

  // Custom validator to check if the password and confirmPassword fields match
  private passwordsMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { passwordsMismatch: true }; // If passwords don't match, return an error object
  }

  // Hashing function using SHA-256 to securely hash the data (username + password)
  async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data); // Convert string to a buffer
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer); // Create a SHA-256 hash
    return Array.from(new Uint8Array(hashBuffer)) // Convert the hash buffer into a hexadecimal string
      .map(byte => byte.toString(16).padStart(2, '0')) // Convert each byte to a 2-digit hex string
      .join(''); // Join all the hex bytes into one string
  }

  // Reset the form fields when the clear button is clicked
  clearForm(event: Event) {
    event.preventDefault(); // Prevent the default action of the event (form reset)
    this.signupForm.reset(); // Reset the form fields
  }

  // Toggle password visibility when the "Show Password" checkbox is checked
  toggleShowPassword(event: any) {
    this.showPassword = event.target.checked; // Set showPassword based on checkbox state
  }
}
