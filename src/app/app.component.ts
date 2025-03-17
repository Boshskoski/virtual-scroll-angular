import { Component } from '@angular/core';
import { IVirtualScrollSettings } from './interfaces/virtual-scroll-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Virtual scroll example';

  public settings: IVirtualScrollSettings = {
    itemHeight: 40,
    amount: 15,
    tolerance: 15,
    scrollToIndex: 0,
  };
  public data: any[] = [];

  ngOnInit() {
    this.data = Array.from({ length: 100000 }, (_, i) => ({ value: `Item #${i}` }));
  }
  
}
