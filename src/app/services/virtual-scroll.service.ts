import { Injectable } from '@angular/core';
import { IVirtualScrollViewport } from '../interfaces/virtual-scroll-viewport';
import { IVirtualScrollSettings } from '../interfaces/virtual-scroll-settings';

@Injectable({
  providedIn: 'root'
})
export class VirtualScrollService {

  public static createInitialViewport(): IVirtualScrollViewport {
    return { topPaddingHeight: 0, bottomPaddingHeight: 0, visibleData: [] };
  }

  public static updateViewport(data: any[], settings: IVirtualScrollSettings, scrollItemIndex: number): IVirtualScrollViewport | null {
    if (!data?.length || !settings) return null;

    const maxIndex = data.length;
    const { itemHeight, amount, tolerance } = settings;

    const startIndex = Math.max(0, Math.min(scrollItemIndex, maxIndex - 1));
    const endIndex = Math.min(startIndex + amount + tolerance - 1, maxIndex - 1);

    return {
      topPaddingHeight: startIndex * itemHeight,
      bottomPaddingHeight: (maxIndex - endIndex - 1) * itemHeight,
      visibleData: data.slice(startIndex, endIndex + 1),
    };
  }

}
