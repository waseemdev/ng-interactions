import { Component, Input, forwardRef, QueryList, ContentChild } from '@angular/core';
import { ActionList } from './action-list';

@Component({
    selector: 'parameter',
    template: ''
})
export class ParamAction extends ActionList {
    constructor() {
        super();
    }

    @Input() index: number = 0;
}
