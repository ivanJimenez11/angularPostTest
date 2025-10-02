import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Post, User, CreatePostRequest, UpdatePostRequest } from '../../interfaces/api.interface';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  users: User[] = [];
  isEditMode = false;
  postId: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {
    this.postForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.checkEditMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      userId: [1, [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    });
  }

  private loadUsers(): void {
    this.apiService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users: User[]) => {
          this.users = users;
        },
        error: (error: Error) => {
          this.notificationService.showError('Error loading users: ' + error.message);
        },
      });
  }

  private checkEditMode(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.postId = +params['id'];
        this.loadPostForEdit(this.postId);
      }
    });
  }

  private loadPostForEdit(id: number): void {
    this.apiService
      .getPost(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (post: Post) => {
          this.postForm.patchValue({
            userId: post.userId,
            title: post.title,
            body: post.body,
          });
        },
        error: (error: Error) => {
          this.notificationService.showError('Error loading post: ' + error.message);
          this.router.navigate(['/']);
        },
      });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const formValue = this.postForm.value;

      if (this.isEditMode && this.postId) {
        this.updatePost(formValue);
      } else {
        this.createPost(formValue);
      }
    } else {
      this.markFormGroupTouched();
      this.notificationService.showError('Please fix the form errors before submitting');
    }
  }

  private createPost(formValue: any): void {
    const createRequest: CreatePostRequest = {
      userId: formValue.userId,
      title: formValue.title,
      body: formValue.body,
    };

    this.apiService
      .createPost(createRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (post: Post) => {
          this.notificationService.showSuccess('Post created successfully');
          this.router.navigate(['/']);
        },
        error: (error: Error) => {
          this.notificationService.showError('Error creating post: ' + error.message);
        },
      });
  }

  private updatePost(formValue: any): void {
    if (!this.postId) return;

    const updateRequest: UpdatePostRequest = {
      id: this.postId,
      userId: formValue.userId,
      title: formValue.title,
      body: formValue.body,
    };

    this.apiService
      .updatePost(updateRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (post: Post) => {
          this.notificationService.showSuccess('Post updated successfully');
          this.router.navigate(['/post', this.postId]);
        },
        error: (error: Error) => {
          this.notificationService.showError('Error updating post: ' + error.message);
        },
      });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.postForm.controls).forEach((key) => {
      const control = this.postForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Getters for form validation
  get userId() {
    return this.postForm.get('userId');
  }
  get title() {
    return this.postForm.get('title');
  }
  get body() {
    return this.postForm.get('body');
  }

  getFieldError(fieldName: string): string {
    const field = this.postForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${
          field.errors['minlength'].requiredLength
        } characters`;
      }
      if (field.errors['maxlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must not exceed ${
          field.errors['maxlength'].requiredLength
        } characters`;
      }
      if (field.errors['min']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${
          field.errors['min'].min
        }`;
      }
    }
    return '';
  }
}
