import { Component, Input, forwardRef, QueryList, ContentChild } from '@angular/core';
import { ActionBase } from './action-base';
import { LoopBase } from './loop-base';

@Component({
    selector: 'foreach',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => ForeachAction) }]
})
export class ForeachAction extends LoopBase {
    constructor() {
        super();
    }

    @Input() items: any[];
    @Input() itemVar: string = '$item';


    protected start(params) {
        let items = this.tryExecuteCode(params, this.items);
        if (items && items.length) {
            this.toValue = items.length - 1;
        }
        super.start(params);
    }

    protected isTrue(params) {
        return this.items && this.items.length && super.isTrue(params);
    }

    protected getLoopParams(params): any {
        let scopeParams = this.extendParams(params, {
            [this.indexVar]: this.currentIndex,
            [this.itemVar]: this.items[this.currentIndex]
        });
        return scopeParams;
    }
}
