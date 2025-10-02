import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'create',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'edit/**',
    renderMode: RenderMode.Server,
  },
  {
    path: 'post/**',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
