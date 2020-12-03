import { ElementRef } from '@angular/core';

export interface ViewController {
	container: ElementRef;
	top: number;

	enterView(): void;
	exitView(): void;
	resetView(): void;
}
