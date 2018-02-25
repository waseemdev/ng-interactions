import { Component, Input, forwardRef, QueryList, ContentChild } from '@angular/core';
import { ActionBase } from './action-base';
import { LoopBase } from './loop-base';

@Component({
    selector: 'counter',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => CounterAction) }]
})
export class CounterAction extends LoopBase {
    constructor() {
        super();
    }

    @Input() from: number = 0;
    @Input() to: number = 1;
    @Input() by: number = 1;


    protected start(params) {
        this.fromValue = this.tryExecuteCode(params, this.from);
        this.toValue = this.tryExecuteCode(params, this.to);
        this.byValue = this.tryExecuteCode(params, this.by);
        super.start(params);
    }
}
