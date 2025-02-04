import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import form-building utilities
import { User } from '../../models/User'; // Import the User interface for user data structure
import { RubyApiService } from '../../services/ruby-api.service'; // Service for API calls to create user
import { Router } from '@angular/router'; // Router to navigate between pages
import { SessionService } from '../../services/session.service'; // Service to manage session data

@Component({
  selector: 'app-signup-form', // Component selector for this form
  templateUrl: './signup-form.component.html', // Path to the HTML template for this component
  styleUrls: ['./signup-form.component.css'] // Path to the CSS stylesheet for this component
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup; // Define the form group for the signup form
  showPassword = false; // Flag to toggle the visibility of the password fields

  constructor(
    private fb: FormBuilder, // Inject FormBuilder to dynamically build the form with validation
    private rubyApiService: RubyApiService, // Inject RubyApiService to handle user-related API calls
    private router: Router, // Inject Router to handle navigation
    private sessionService: SessionService // Inject SessionService to handle session data management
  ) { }

  ngOnInit(): void {
    // Check if user is already logged in by checking session data
    if (this.sessionService.hasSessionData()) {
      // If session data exists, redirect to the 'message' page (user is already logged in)
      this.router.navigate(['/message']);
      return;
    }

    // Initialize the signup form with form controls and validation rules
    this.signupForm = this.fb.group({
      username: ['', Validators.required], // Username field (required validation)
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field (required, min length 6 characters)
      confirmPassword: ['', Validators.required] // Confirm password field (required validation)
    }, { validator: this.passwordsMatchValidator }); // Apply custom validator for matching passwords
  }

  // Handle form submission when the user clicks the submit button
  async onSubmit() {
    console.log('Form Validity:', this.signupForm.valid); // Log form validity for debugging

    if (this.signupForm.valid) {
      const username = this.signupForm.value.username.toLowerCase(); // Get and convert username to lowercase for consistency
      const password = this.signupForm.value.password; // Get the password value from the form

      // Combine username and password, then hash them using the hashData method
      const hashed = await this.hashData(username + password);
      console.log('Hashed:', hashed); // Log the hashed username and password for debugging

      // Create a User object with the hashed data to be sent to the backend
      const user: User = { usernameHash: hashed };

      // Call the RubyApiService to create the user
      this.rubyApiService.createUser(user).subscribe(
        (response: any) => {
          if (response.usernameHash) {
            // On successful user creation, store the usernameHash in session data
            this.sessionService.setSessionData({ usernameHash: response.usernameHash });

            console.log('User created:', response); // Log the successful response
            this.router.navigate(['/message']); // Redirect to the message page upon success
          } else {
            console.error('Error creating user:', response); // Log error if no usernameHash is returned
          }
        },
        (error: any) => {
          console.error('Error creating user:', error); // Log any API errors
        }
      );
    } else {
      alert('Please fill out all required fields correctly.'); // Alert the user if the form is invalid
    }
  }

  // Custom validator to ensure that password and confirmPassword fields match
  private passwordsMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { passwordsMismatch: true }; // Return an error if passwords do not match
  }

  // Hashing function using the SHA-256 algorithm to securely hash the combined data (username + password)
  async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder(); // Create a new TextEncoder instance to convert the string into a buffer
    const dataBuffer = encoder.encode(data); // Convert the input string into an ArrayBuffer
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer); // Use the Web Crypto API to hash the data

    // Convert the hash buffer into a hexadecimal string
    return Array.from(new Uint8Array(hashBuffer)) // Convert the ArrayBuffer to an array of bytes
      .map(byte => byte.toString(16).padStart(2, '0')) // Convert each byte to a 2-digit hex string
      .join(''); // Join all the hex digits into one string
  }

  // Clear the form fields when the "Clear" button is clicked
  clearForm(event: Event) {
    event.preventDefault(); // Prevent the default form reset behavior
    this.signupForm.reset(); // Reset all form fields to their initial state
  }

  // Toggle password visibility when the "Show Password" checkbox is checked or unchecked
  toggleShowPassword(event: any) {
    this.showPassword = event.target.checked; // Set 'showPassword' based on the checkbox's checked state
  }
}
