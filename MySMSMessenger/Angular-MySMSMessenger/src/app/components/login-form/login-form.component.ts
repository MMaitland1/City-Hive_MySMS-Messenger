import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Angular forms modules
import { User } from '../../models/User'; // Import the User model
import { RubyApiService } from '../../services/ruby-api.service'; // Service for API calls
import { Router } from '@angular/router'; // Router for navigation
import { SessionService } from '../../services/session.service'; // Service to manage user session data

@Component({
  selector: 'app-login-form', // Component selector used in HTML
  templateUrl: './login-form.component.html', // Template file for the component
  styleUrls: ['./login-form.component.css'] // CSS file for the component
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup; // FormGroup to manage the login form
  showPassword = false; // Toggle for showing/hiding the password
  loginError: string = ''; // Variable to store login error messages

  constructor(
    private fb: FormBuilder, // FormBuilder service to create reactive forms
    private rubyApiService: RubyApiService, // Service to interact with the Ruby API
    private router: Router, // Router for navigation
    private sessionService: SessionService // Service to manage user session data
  ) {
    // Initialize the login form with validation rules
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Username field with required validation
      password: ['', Validators.required] // Password field with required validation
    });
  }

  ngOnInit(): void {
    // Redirect to the message page if the user is already logged in
    if (this.sessionService.hasSessionData()) {
      this.router.navigate(['/message']);
    }
  }

  // Method to toggle password visibility
  toggleShowPassword(event: any) {
    this.showPassword = event.target.checked; // Update showPassword based on checkbox state
  }

  // Method to handle form submission
  async onSubmit() {
    if (this.loginForm.valid) { // Check if the form is valid
      const username = this.loginForm.value.username.toLowerCase(); // Get the username and convert to lowercase
      const password = this.loginForm.value.password; // Get the password

      // Hash the username and password combination using SHA-256
      const hashed = await this.hashData(username + password);
      const user: User = { usernameHash: hashed }; // Create a User object with the hashed value

      // Call the API to check if the user exists
      this.rubyApiService.readUser(hashed).subscribe(
        (response: User | null) => {
          if (response) { // If the user exists
            // Store the user session data using SessionService
            this.sessionService.setSessionData(user);

            console.log('User logged in:', response);
            this.router.navigate(['/message']); // Navigate to the message page
          } else { // If the user does not exist
            this.loginError = 'Username or password is incorrect.'; // Set error message
          }
        },
        (error) => { // Handle API errors
          this.loginError = 'An error occurred. Please try again.'; // Set error message
        }
      );
    } else { // If the form is invalid
      this.clearForm(); // Clear the form
      alert('Please fill out all required fields.'); // Show an alert
    }
  }

  // Hashing function using SHA-256
  async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder(); // Create a TextEncoder instance
    const dataBuffer = encoder.encode(data); // Encode the input string as a Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer); // Generate the hash
    return Array.from(new Uint8Array(hashBuffer)) // Convert the hash buffer to a byte array
      .map(byte => byte.toString(16).padStart(2, '0')) // Convert each byte to a hexadecimal string
      .join(''); // Join the hexadecimal strings into a single hash string
  }

  // Method to clear the form and reset error messages
  clearForm(event?: Event) {
    if (event) {
      event.preventDefault(); // Prevent default form submission behavior
    }
    this.loginError = ''; // Clear the login error message
    this.loginForm.reset(); // Reset the form fields to their initial state
  }
}