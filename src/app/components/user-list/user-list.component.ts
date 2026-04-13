import { CommonModule } from '@angular/common';
import { afterNextRender, Component, computed, inject, OnInit, signal } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule],
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{

  users = signal<User[]>([]);
  cities = signal<string[]>([]);

  private userService = inject(UserService);
  private router = inject(Router);

  nameFilter = signal('');
  cityFilter = signal('');

  filteredUsers = computed(() => {
    return this.users().filter(users =>{
      const matchesName = users.username
      .toLowerCase()
      .includes(this.nameFilter().toLowerCase().trim());

      const matchesCity = this.cityFilter() === '' || users.address.city === this.cityFilter();

      return matchesName && matchesCity;
    })
  })

  ngOnInit(){
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.cities.set([...new Set(data.map(user => user.address.city))].sort());
      },
      error: (err) => console.error('Efrror al obtener usuarios', err)
    });
  }

  resetFilters(){
    this.nameFilter.set('');
    this.cityFilter.set('');
  }

  goToUser(id: number){
    console.log('click en el usuario', id)
    this.router.navigate(['/detail', id]);
  }



}
