import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingComponent } from './views/landing/landing.component';
import { TimelineComponent } from './views/timeline/timeline.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { ContactComponent } from './views/contact/contact.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
	declarations: [AppComponent, LandingComponent, TimelineComponent, ProjectsComponent, ContactComponent, NavbarComponent],
	imports: [BrowserModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
