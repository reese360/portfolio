import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewController } from 'src/app/interfaces/view.interface';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements AfterViewInit, ViewController {
	@ViewChild('contact') container!: ElementRef;
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
