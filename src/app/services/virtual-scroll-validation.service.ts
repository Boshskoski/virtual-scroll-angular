import { Injectable } from '@angular/core';
import { IVirtualScrollDefaultSettings } from '../interfaces/virtual-scroll-default-settings';
import { IVirtualScrollSettings } from '../interfaces/virtual-scroll-settings';

@Injectable({
  providedIn: 'root'
})
export class VirtualScrollValidationService {

  private static readonly DEFAULT_SETTINGS: IVirtualScrollDefaultSettings = Object.freeze({
    ITEM_HEIGHT: 40,
    AMOUNT: 10,
    TOLERANCE: 15,
    SCROLL_TO_INDEX: 0,
  })

  public static settingsValidator(settings: IVirtualScrollSettings): IVirtualScrollSettings {
    return {
      itemHeight: VirtualScrollValidationService.settingsNumberValidator(settings?.itemHeight, VirtualScrollValidationService.DEFAULT_SETTINGS.ITEM_HEIGHT),
      amount: VirtualScrollValidationService.settingsNumberValidator(settings?.amount, VirtualScrollValidationService.DEFAULT_SETTINGS.AMOUNT),
      tolerance: VirtualScrollValidationService.settingsNumberValidator(settings?.tolerance, VirtualScrollValidationService.DEFAULT_SETTINGS.TOLERANCE),
      scrollToIndex: VirtualScrollValidationService.settingsNumberValidator(settings?.scrollToIndex, VirtualScrollValidationService.DEFAULT_SETTINGS.SCROLL_TO_INDEX)
    }
  }

  private static settingsNumberValidator(value: any, defaultValue: number): number {
    return typeof value === 'number' && !isNaN(value) ? value : defaultValue;
  }
}
