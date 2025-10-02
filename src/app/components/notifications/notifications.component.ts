import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-container">
      <div
        *ngFor="let notification of notifications"
        [class]="'notification notification-' + notification.type"
        [@slideIn]
      >
        <div class="notification-content">
          <span class="notification-icon">{{ getIcon(notification.type) }}</span>
          <span class="notification-message">{{ notification.message }}</span>
          <button
            class="notification-close"
            (click)="removeNotification(notification.id)"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .notifications-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
      }

      .notification {
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        animation: slideIn 0.3s ease-out;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      .notification-content {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        background: white;
        border-left: 4px solid;
      }

      .notification-success .notification-content {
        border-left-color: #27ae60;
        background-color: #d5f4e6;
      }

      .notification-error .notification-content {
        border-left-color: #e74c3c;
        background-color: #fdeaea;
      }

      .notification-warning .notification-content {
        border-left-color: #f39c12;
        background-color: #fef9e7;
      }

      .notification-info .notification-content {
        border-left-color: #3498db;
        background-color: #eaf4fd;
      }

      .notification-icon {
        font-size: 1.2rem;
        margin-right: 10px;
        font-weight: bold;
      }

      .notification-success .notification-icon {
        color: #27ae60;
      }

      .notification-error .notification-icon {
        color: #e74c3c;
      }

      .notification-warning .notification-icon {
        color: #f39c12;
      }

      .notification-info .notification-icon {
        color: #3498db;
      }

      .notification-message {
        flex: 1;
        color: #2c3e50;
        font-size: 0.9rem;
        line-height: 1.4;
      }

      .notification-close {
        background: none;
        border: none;
        font-size: 1.4rem;
        color: #7f8c8d;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
      }

      .notification-close:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: #2c3e50;
      }

      @media (max-width: 768px) {
        .notifications-container {
          top: 10px;
          right: 10px;
          left: 10px;
          max-width: none;
        }
      }
    `,
  ],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private destroy$ = new Subject<void>();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notifications) => {
        this.notifications = notifications;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  }
}
