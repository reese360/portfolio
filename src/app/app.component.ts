import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ViewController } from './interfaces/view.interface';
import { LandingComponent } from './views/landing/landing.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { TimelineComponent } from './views/timeline/timeline.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
	@ViewChild('landing') landingComponent!: LandingComponent;
	@ViewChild('timeline') timelineComponent!: TimelineComponent;
	@ViewChild('projects') projectsComponent!: ProjectsComponent;

	viewIdx: number = 0;
	viewControllers: ViewController[] = [];
	viewPos: number[] = [];

	touchStart!: number; // store user starting touch point;

	isMobile: boolean = false; // flag for mobile or desktop
	isScrolling: boolean = false; // flag for scrolling animation44

	// recalculate element sizing on window
	@HostListener('window:resize', ['$event']) onResize(): void {
		console.log('resize event');
		this.ngAfterViewInit();
	}

	constructor(el: ElementRef) {
		// determine if user is on mobile or desktop
		this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

		if (!this.isMobile) {
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
		} else {
			// mobile event handlers
			// event handler for touch start
			el.nativeElement.addEventListener(
				'touchstart',
				(e: any) => {
					e.preventDefault();
					this.touchStart = e.changedTouches[0].clientY;
				},
				{ passive: false }
			);

			// event handler for touch stop
			el.nativeElement.addEventListener(
				'touchend',
				(e: any) => {
					e.preventDefault();
					const touchEnd = e.changedTouches[0].clientY;
					this.handleScroll(touchEnd > this.touchStart ? -1 : 1);
				},
				{ passive: false }
			);
		}
	}

	ngAfterViewInit(): void {
		// start at top of html body
		window.onbeforeunload = () => {
			window.scrollTo(0, 0);
		};

		this.viewControllers = [this.landingComponent, this.timelineComponent, this.projectsComponent];
		this.viewControllers.forEach((view) => {
			view.resetView();
		});
	}

	async handleScroll(delta: number): Promise<void> {
		if (!this.isScrolling) {
			let currentIdx = this.viewIdx; // store current value
			if (delta > 0) currentIdx = currentIdx + 1 > this.viewControllers.length - 1 ? this.viewControllers.length - 1 : (currentIdx += 1);
			else currentIdx = currentIdx - 1 < 0 ? 0 : (currentIdx -= 1);

			if (currentIdx === this.viewIdx) return; // if value hasn't changed user is at top or bottom and cannot scroll further

			this.isScrolling = true;
			this.viewControllers[this.viewIdx].exitView();
			this.viewIdx = currentIdx;

			// start view animation and scroll
			setTimeout(
				() => {
					window.scroll({ top: this.currentViewController.top, behavior: 'smooth' });
					this.currentViewController.enterView();
					this.isScrolling = false;
				},
				delta > 0 ? 750 : 500 // longer duration before scrolling for scrolling down
			);
		}
	}

	get currentViewController(): ViewController {
		return this.viewControllers[this.viewIdx];
	}

	compTops(): void {
		this.viewControllers.forEach((e, v) => {
			console.log(v, e.top);
		});
	}
}
