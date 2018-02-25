import { Component, Input, forwardRef, QueryList, ContentChild } from '@angular/core';
import { ActionList } from './action-list';

@Component({
    selector: 'else',
    template: ''
})
export class ElseAction extends ActionList {
    constructor() {
        super();
    }
}
