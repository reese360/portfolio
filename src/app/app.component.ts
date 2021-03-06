import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewController } from './interfaces/view.interface';
import { ContactComponent } from './views/contact/contact.component';
import { LandingComponent } from './views/landing/landing.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { TimelineComponent } from './views/timeline/timeline.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
	@ViewChild('navigation') navigationComponent!: NavbarComponent;
	@ViewChild('appWindow') appContainer!: ElementRef;
	@ViewChild('landing') landingComponent!: LandingComponent;
	@ViewChild('timeline') timelineComponent!: TimelineComponent;
	@ViewChild('projects') projectsComponent!: ProjectsComponent;
	@ViewChild('contact') contactComponent!: ContactComponent;

	viewIdx: number = 0;
	viewControllers: ViewController[] = [];
	viewPos: number[] = [];

	touchStart!: number; // store user starting touch point;

	isMobile: boolean = false; // flag for mobile or desktop
	isScrolling: boolean = false; // flag for scrolling animation

	viewHeight: number = 100;
	currentPos: number = 0;

	// recalculate element sizing on window
	@HostListener('window:resize', ['$event']) onResize(): void {
		this.resetView();
	}

	constructor(el: ElementRef) {
		// start at top of html body
		// window.onbeforeunload = () => {
		// 	window.scrollTo(0, 0);
		// };

		// determine if user is on mobile or desktop
		this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

		if (this.isMobile) {
			// mobile event handlers
			// event handler for touch start
			el.nativeElement.addEventListener(
				'touchstart',
				(e: any) => {
					// e.preventDefault();
					this.touchStart = e.changedTouches[0].clientY;
				},
				{ passive: false }
			);

			// event handler for touch stop
			el.nativeElement.addEventListener(
				'touchend',
				(e: any) => {
					// e.preventDefault();
					const touchEnd = e.changedTouches[0].clientY;
					if (Math.abs(this.touchStart - touchEnd) < 100) return;
					this.handleScroll(touchEnd > this.touchStart ? -1 : 1);
				},
				{ passive: false }
			);
		} else {
			// desktop event handlers
			// event handler for scroll wheel
			el.nativeElement.addEventListener(
				'wheel',
				(e: any) => {
					e.preventDefault();
					this.handleScroll(e.deltaY);
				},
				{ passive: false }
			);
		}
	}

	ngAfterViewInit(): void {
		this.appContainer.nativeElement.style.transform = 'translateY(0vh)';
		this.viewControllers = [this.landingComponent, this.timelineComponent, this.projectsComponent, this.contactComponent];
	}

	resetView(): void {
		this.viewControllers.forEach((view) => {
			view.resetView();
		});
		// window.scroll({ top: this.currentViewController.top, behavior: 'smooth' });
	}

	async handleScroll(delta: number): Promise<void> {
		if (this.isScrolling) return;
		let nextIdx = this.viewIdx; // store current value

		// determine next view index
		if (delta > 0) nextIdx = nextIdx + 1 > this.viewControllers.length - 1 ? this.viewControllers.length - 1 : (nextIdx += 1);
		else nextIdx = nextIdx - 1 < 0 ? 0 : (nextIdx -= 1);

		if (nextIdx === this.viewIdx) return; // if value hasn't changed user is at top or bottom and cannot scroll further

		this.isScrolling = true;
		this.viewControllers[this.viewIdx].exitView(); // exit animation
		this.viewIdx = nextIdx;

		// start view enter animation after scroll delay
		setTimeout(() => {
			this.viewControllers[this.viewIdx].enterView();
			this.isScrolling = false;
		}, 750);

		if (delta > 0) this.currentPos -= this.viewHeight;
		else this.currentPos += this.viewHeight;
		this.appContainer.nativeElement.style.transform = `translateY(${this.currentPos}vh)`;
	}

	handleNavClick(idx: number): void {
		if (this.isScrolling || idx === this.viewIdx) return;

		this.isScrolling = true;
		this.viewControllers[this.viewIdx].exitView(); // exit animation
		this.viewIdx = idx;

		// start view enter animation after scroll delay
		setTimeout(() => {
			this.viewControllers[this.viewIdx].enterView();
			this.isScrolling = false;
		}, 750);

		this.currentPos = this.viewIdx * -100;
		this.appContainer.nativeElement.style.transform = `translateY(${this.currentPos}vh)`;
	}

	get currentViewController(): ViewController {
		return this.viewControllers[this.viewIdx];
	}
}
