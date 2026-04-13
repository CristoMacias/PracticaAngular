import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from '../spinner/spinner.component';


@Component({
  selector: 'app-detail',
  imports: [NavBarComponent, TranslateModule, SpinnerComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit{

  user!: User;
  private route = inject(ActivatedRoute);
  private userService = inject(UserService)

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.userService.getUserId(id).subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Error al obtener usuarios', err)
    })
  }


}
