import { Component, Input, forwardRef, QueryList, ContentChild } from '@angular/core';
import { ActionList } from './action-list';

@Component({
    selector: 'case',
    template: ''
})
export class SwitchCaseAction extends ActionList {
    constructor() {
        super();
    }

    @Input() value: any;

    getCaseValue(params: any): any {
        return this.tryExecuteCode(params, this.value);
    }
}
