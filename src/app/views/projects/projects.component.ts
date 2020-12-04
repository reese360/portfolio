import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewController } from 'src/app/interfaces/view.interface';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements AfterViewInit, ViewController {
	@ViewChild('projects') container!: ElementRef;
	constructor() {}
	top: number = 0;

	ngAfterViewInit(): void {
		this.top = this.container.nativeElement.getBoundingClientRect().top;
	}

	enterView(): void {}
	exitView(): void {}
	resetView(): void {
		this.top = this.container.nativeElement.getBoundingClientRect().top;
	}
}
