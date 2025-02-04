import { Component, Input, OnDestroy, OnInit } from '@angular/core'; // Importing necessary Angular modules
import { SharedService } from '../../services/shared.service'; // Importing SharedService to receive title updates
import { Subscription } from 'rxjs'; // Importing Subscription to manage observable subscriptions

@Component({
  selector: 'app-display', // The component's selector used in HTML to reference this component
  templateUrl: './display.component.html', // Path to the HTML template for this component
  styleUrls: ['./display.component.css'] // Path to the component's CSS file
})
export class DisplayComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Default Title'; // Input property to receive the initial title, with a default value
  private titleSubscription!: Subscription; // Subscription variable to manage the observable subscription for title updates

  constructor(private sharedService: SharedService) {} // Injecting SharedService to get title updates from the service

  // ngOnInit is called when the component is initialized
  ngOnInit(): void {
    // Subscribe to the shared service's updateTitle$ observable to receive title updates
    this.titleSubscription = this.sharedService.updateTitle$.subscribe((newTitle) => {
      this.title = newTitle; // Update the title property whenever a new title is emitted by the shared service
    });
  }

  // ngOnDestroy is called when the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribe from the observable to avoid memory leaks
    if (this.titleSubscription) {
      this.titleSubscription.unsubscribe(); // Unsubscribing from the title subscription when the component is destroyed
    }
  }
}
