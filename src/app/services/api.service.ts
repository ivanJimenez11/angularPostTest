import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post, User, CreatePostRequest, UpdatePostRequest } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';
  private postsCache: Map<number, Post> = new Map();
  private createdPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  // Get all posts (limited to 10 as per requirements)
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(
      map((posts: Post[]) => {
        const limitedPosts = posts.slice(0, 10);
        // Apply cached changes to the posts
        return limitedPosts
          .map((post) => {
            const cachedPost = this.postsCache.get(post.id);
            return cachedPost || post;
          })
          .concat(this.createdPosts);
      }),
      catchError(this.handleError)
    );
  }

  // Get single post by ID
  getPost(id: number): Observable<Post> {
    // Check if we have a cached version first
    const cachedPost = this.postsCache.get(id);
    if (cachedPost) {
      return of(cachedPost);
    }

    // Check if it's a created post
    const createdPost = this.createdPosts.find((post) => post.id === id);
    if (createdPost) {
      return of(createdPost);
    }

    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`).pipe(catchError(this.handleError));
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(catchError(this.handleError));
  }

  // Get single user by ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`).pipe(catchError(this.handleError));
  }

  // Create new post
  createPost(post: CreatePostRequest): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post).pipe(
      tap((createdPost: Post) => {
        // Add to local created posts cache
        this.createdPosts.unshift(createdPost);
      }),
      catchError(this.handleError)
    );
  }

  // Update existing post
  updatePost(post: UpdatePostRequest): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${post.id}`, post).pipe(
      tap((updatedPost: Post) => {
        // Update local cache with the edited post
        this.postsCache.set(updatedPost.id, updatedPost);
      }),
      catchError(this.handleError)
    );
  }

  // Delete post
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`).pipe(
      tap(() => {
        // Remove from local caches
        this.postsCache.delete(id);
        this.createdPosts = this.createdPosts.filter((post) => post.id !== id);
      }),
      catchError(this.handleError)
    );
  }

  // Clear local cache (useful for testing or refresh scenarios)
  clearCache(): void {
    this.postsCache.clear();
    this.createdPosts = [];
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
