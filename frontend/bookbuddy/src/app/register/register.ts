import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { supabase } from '../supabase/supabase.client';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, username } = this.registerForm.value;

      // Trim and normalize email to avoid accidental spaces or casing issues
      const cleanEmail = (email || '').toString().trim().toLowerCase();

      // Basic client-side email validation to avoid making requests with malformed addresses
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        alert('Please enter a valid email address.');
        return;
      }

      try {
        // signUp accepts a single credentials object in the installed supabase-js version.
        console.log('Signing up with', { email: cleanEmail });
        const { data, error } = await supabase.auth.signUp({ email: cleanEmail, password });
        if (error) {
          console.error('Supabase signUp error', error);
          // Show server-side message if available
          alert(error?.message || 'Registration failed');
          return;
        }

        // If you want to store additional profile information (username), insert into a `profiles` table.
        // This requires a `profiles` table in your Supabase DB with at least `id` (uuid) and `username` fields.
        try {
          const userId = (data as any)?.user?.id || (data as any)?.id;
          if (userId) {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{ id: userId, username }]);
            if (insertError) {
              console.warn('Could not insert profile', insertError);
            }
          }
        } catch (e) {
          console.warn('Profile insert failed', e);
        }

        console.log('Registration success', data);
        // If your Supabase settings require email confirm, the user may need to verify first.
        this.router.navigate(['/eventList']);
      } catch (err) {
        console.error(err);
        alert('Registration failed');
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
