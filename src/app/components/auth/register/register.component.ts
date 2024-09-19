import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      const { name, email, password } = this.registrationForm.value;
      try {
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(
          email,
          password
        );
        if (userCredential.user) {
          await userCredential.user.updateProfile({ displayName: name });
          // Handle successful registration (e.g., navigate to another page)
        } else {
          this.errorMessage = 'User registration failed.';
        }
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'An unknown error occurred.';
        }
      }
    }
  }
}
