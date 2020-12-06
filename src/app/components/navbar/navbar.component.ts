import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
	// @ViewChildren('view') views!: QueryList<ElementRef>;
	// viewCircles: ElementRef[] = [];

	@Input() currentIdx!: number;
	@Output() navItemClicked: EventEmitter<number> = new EventEmitter<number>();

	ngAfterViewInit(): void {
		// this.viewCircles = this.views.toArray();
	}

	handleNavClick(idx: number): void {
		this.navItemClicked.emit(idx);
	}
}
