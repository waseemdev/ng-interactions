import { Component, Input, forwardRef, QueryList, ContentChild } from '@angular/core';
import { ActionBase } from './action-base';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { LoopBase } from './loop-base';

@Component({
    selector: 'while',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => WhileAction) }]
})
export class WhileAction extends LoopBase {
    constructor() {
        super();
    }

    @Input() value: any;

    
    protected isTrue(params) {
        let value = this.tryExecuteCode(params, this.value);
        return value;
    }

    protected start(params) {
        this.currentIndex = 0;
    }
}
