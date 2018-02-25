import { Component, ElementRef, Renderer, forwardRef } from '@angular/core';
import { ActionBase } from './action-base';
import { CssAction } from './css';

@Component({
    selector: 'css-rotate',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => CssRotateAction) }]
})
export class CssRotateAction extends CssAction {
    constructor(elementRef: ElementRef, renderer: Renderer) {
        super(elementRef, renderer);
    }

    protected applyCss(params, element, property, value) {
        super.applyTransform(element, 'rotate', property, value);
    }
}
