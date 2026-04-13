import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DetailComponent } from './components/detail/detail.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { WsPageComponent } from './pages/ws-page/ws-page.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'detail/:id', component: DetailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'admin', loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent), canActivate: [authGuard]},
    {path: 'sse', loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent)},
    {path: 'ws', component: WsPageComponent},

];
