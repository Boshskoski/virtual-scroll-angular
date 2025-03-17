import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { IVirtualScrollSettings } from 'src/app/interfaces/virtual-scroll-settings';
import { IVirtualScrollViewport } from 'src/app/interfaces/virtual-scroll-viewport';
import { VirtualScrollValidationService } from 'src/app/services/virtual-scroll-validation.service';
import { VirtualScrollService } from 'src/app/services/virtual-scroll.service';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss']
})
export class VirtualScrollComponent implements OnInit {

  private _settings: IVirtualScrollSettings;
  @Input() set settings(settings: IVirtualScrollSettings) {
    this._settings = VirtualScrollValidationService.settingsValidator(settings);
  }
  get settings(): IVirtualScrollSettings {
    return this._settings;
  }

  @Input() data: any[] = [];
  @ContentChild(TemplateRef) rowTemplateRef: TemplateRef<any>;
  @ViewChild('viewport', { static: true }) viewportElementRef: ElementRef;
  private viewport: IVirtualScrollViewport | null = VirtualScrollService.createInitialViewport();

  ngOnInit(): void {
    this.viewport = VirtualScrollService.updateViewport(this.data, this.settings, this.settings?.scrollToIndex);
  }

  ngAfterViewInit(): void {
    if (this.viewportElementRef?.nativeElement && this.viewport) {
      this.viewportElementRef.nativeElement.scrollTop = this.viewport?.topPaddingHeight;
      fromEvent(this.viewportElementRef.nativeElement, 'scroll')
        .pipe(auditTime(200))
        .subscribe((event) => {
          this.onScroll(event as Event & { target: HTMLElement });
        });
    }
  }

  ngOnDestroy() {
    if(this.viewportElementRef?.nativeElement) {
      this.viewportElementRef.nativeElement.removeEventListener('scroll', this.onScroll);
    }
  }

  public get topPaddingHeight(): number {
    return this.viewport?.topPaddingHeight ?? 0;
  }

  public get bottomPaddingHeight(): number {
    return this.viewport?.bottomPaddingHeight ?? 0;
  }

  public get visibleData(): any[] {
    return this.viewport?.visibleData ?? []
  }

  private onScroll = (event: Event & { target: HTMLElement }): void => {
    if(event && event.target) {
      const scrollTop = event.target.scrollTop;
      const scrollItemIndex = Math.max(0, Math.floor(scrollTop / this.settings.itemHeight));
      this.viewport = VirtualScrollService.updateViewport(this.data, this.settings, scrollItemIndex);
    }
  };
  
}
