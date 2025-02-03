import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',  // Defines the custom element name for this component
  templateUrl: './display.component.html',  // The HTML template for this component
  styleUrls: ['./display.component.css']  // The CSS file for styling this component
})
export class DisplayComponent {
  @Input() title: string = ''; // Input property for the title, allowing data to be passed from a parent component
}
