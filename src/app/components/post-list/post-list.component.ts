import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Post, User } from '../../interfaces/api.interface';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  users: User[] = [];
  private destroy$ = new Subject<void>();

  constructor(private apiService: ApiService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPosts(): void {
    this.apiService
      .getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (posts: Post[]) => {
          this.posts = posts;
        },
        error: (error: Error) => {
          this.notificationService.showError('Error loading posts: ' + error.message);
        },
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

  getUserName(userId: number): string {
    const user = this.users.find((u) => u.id === userId);
    return user ? user.name : `User ${userId}`;
  }

  onDeletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.apiService
        .deletePost(postId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.posts = this.posts.filter((p) => p.id !== postId);
            this.notificationService.showSuccess('Post deleted successfully');
          },
          error: (error: Error) => {
            this.notificationService.showError('Error deleting post: ' + error.message);
          },
        });
    }
  }
}
