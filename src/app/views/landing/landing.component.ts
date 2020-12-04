import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ViewController } from 'src/app/interfaces/view.interface';

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements AfterViewInit, ViewController {
	@ViewChild('landing') container!: ElementRef;
	initialLanding: boolean = true;
	initialAnimDuration = '1250ms';
	top: number = 0;

	constructor() {}

	ngAfterViewInit(): void {
		this.top = this.container.nativeElement.getBoundingClientRect().top;
		this.enterView();
		this.initialLanding = false;
	}

	enterView(): void {
		Array.from(document.getElementsByClassName('headline-text') as HTMLCollectionOf<HTMLElement>).forEach((el, idx) => {
			el.classList.remove('landing-exitUp'); // remove class if user is re-scrolling to view
			el.classList.add('landing-enterUp');
			// if (this.initialLanding) {
			// 	el.style.animationDuration = this.initialAnimDuration;
			// 	switch (idx) {
			// 		case 0:
			// 			el.style.animationDelay = '250ms';
			// 			break;
			// 		case 1:
			// 			el.style.animationDelay = '1000ms';
			// 			break;
			// 		case 2:
			// 			el.style.animationDelay = '2000ms';
			// 			break;
			// 		case 3:
			// 			el.style.animationDelay = '2750ms';
			// 			break;
			// 		case 4:
			// 			el.style.animationDelay = '3250ms';
			// 			break;
			// 		case 5:
			// 			el.style.animationDelay = '3500ms';
			// 			break;
			// 	}
			// }
		});
	}

	exitView(): void {
		Array.from(document.getElementsByClassName('headline-text') as HTMLCollectionOf<HTMLElement>).forEach((el, idx) => {
			el.classList.remove('landing-enterUp');
			el.classList.add('landing-exitUp');
			el.style.animationDelay = `${100 * Math.floor(Math.random() * Math.floor(4))}ms`;
			el.style.animationDuration = '750ms';
		});
	}

	resetView(): void {
		this.top = this.container.nativeElement.getBoundingClientRect().top;
	}
}
