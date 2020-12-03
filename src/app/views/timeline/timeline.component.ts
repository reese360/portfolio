import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ViewController } from 'src/app/interfaces/view.interface';

@Component({
	selector: 'app-timeline',
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements AfterViewInit, ViewController {
	@ViewChild('timeline') container!: ElementRef;
	top: number = 0;

	ngAfterViewInit(): void {
		this.top = this.container.nativeElement.getBoundingClientRect().top;
	}

	enterView(): void {}
	exitView(): void {}
	resetView(): void {
		this.ngAfterViewInit();
	}
}
