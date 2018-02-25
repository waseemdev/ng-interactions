import { Component, ElementRef, Renderer, forwardRef } from '@angular/core';
import { ActionBase } from './action-base';
import { CssAction } from './css';

@Component({
    selector: 'css-scale',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => CssScaleAction) }]
})
export class CssScaleAction extends CssAction {
    constructor(elementRef: ElementRef, renderer: Renderer) {
        super(elementRef, renderer);
    }

    protected applyCss(params, element, property, value) {
        super.applyTransform(element, 'scale', property, value);
    }
}
