import { Component, Input, forwardRef, QueryList, ContentChild } from '@angular/core';
import { ActionList } from './action-list';

@Component({
    selector: 'then',
    template: ''
})
export class ThenAction extends ActionList {
    constructor() {
        super();
    }
}
