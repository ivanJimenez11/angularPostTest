import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/post-list/post-list.component').then((c) => c.PostListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/post-form/post-form.component').then((c) => c.PostFormComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/post-form/post-form.component').then((c) => c.PostFormComponent),
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./components/post-detail/post-detail.component').then((c) => c.PostDetailComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
