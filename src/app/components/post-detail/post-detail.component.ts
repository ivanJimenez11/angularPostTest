import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Post, User } from '../../interfaces/api.interface';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: Post | null = null;
  user: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          const postId = +params['id'];
          return this.apiService.getPost(postId);
        })
      )
      .subscribe({
        next: (post: Post) => {
          this.post = post;
          this.loadUser(post.userId);
        },
        error: (error: Error) => {
          this.notificationService.showError('Error loading post: ' + error.message);
          this.router.navigate(['/']);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUser(userId: number): void {
    this.apiService
      .getUser(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user: User) => {
          this.user = user;
        },
        error: (error: Error) => {
          this.notificationService.showError('Error loading user: ' + error.message);
        },
      });
  }

  onDeletePost(): void {
    if (!this.post) return;

    if (confirm('Are you sure you want to delete this post?')) {
      this.apiService
        .deletePost(this.post.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccess('Post deleted successfully');
            this.router.navigate(['/']);
          },
          error: (error: Error) => {
            this.notificationService.showError('Error deleting post: ' + error.message);
          },
        });
    }
  }
}
