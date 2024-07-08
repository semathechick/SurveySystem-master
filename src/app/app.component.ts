import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from './admin/layout/components/homepage/homepage.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { SurveyComponent } from './ui/components/survey/survey.component';
import { CommonModule } from '@angular/common';
import { AdminSurveyComponent } from './admin/components/admin-survey/admin-survey.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SurveyLayoutComponent } from './admin/components/survey-layout/survey-layout.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LayoutComponent, HomepageComponent,SurveyComponent,CommonModule,FormsModule,SurveyLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SurveySystem';
}
