import { Component, Input, ElementRef, Renderer, forwardRef } from '@angular/core';
import { ActionBase } from './action-base';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { CssAction } from './css';

@Component({
    selector: 'css-class',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => CssClassAction) }]
})
export class CssClassAction extends CssAction {
    constructor(elementRef: ElementRef,
                renderer: Renderer) {
        super(elementRef, renderer);
    }


    @Input('add') addClass: string;
    @Input('remove') removeClass: string;
    @Input('toggle') toggleClass: string;


    protected applyCss(params, element, property, value) {
        super.applyCss(params, element, property, value);

        if (this.addClass) {
            let addClass = this.tryExecuteCode(params, this.addClass);
            addClass && element.classList.add(addClass);
        }
        if (this.removeClass) {
            let removeClass = this.tryExecuteCode(params, this.removeClass);
            removeClass && element.classList.remove(removeClass);
        }
        if (this.toggleClass) {
            let toggleClass = this.tryExecuteCode(params, this.toggleClass);
            toggleClass && element.classList.toggle(toggleClass);
        }
    }
}
