import { Component, Input, forwardRef, QueryList, ContentChild } from '@angular/core';
import { ActionBase } from './action-base';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { ActionList } from './action-list';

@Component({
    selector: 'loop-base',
    template: ''
})
export abstract class LoopBase extends ActionList {
    constructor() {
        super();
    }

    protected currentIndex: number = 0;
    protected fromValue: number = 0;
    protected toValue: number = 0;
    protected byValue: number = 1;

    @Input() indexVar: string = '$index';


    protected executeInternal(params): Observable<any> {
        if (!this.actions.length) {
            return Observable.empty();
        }

        return new Observable(observer => {
            this.start(params);
            
            while (this.isTrue(params)) {
                let scopedParams = this.getLoopParams(params);
                try {
                    this.executeActions(scopedParams).subscribe();
                }
                catch(ex) {
                    // break?
                }
                this.prepareNext(params);
            }

            this.end(params);

            observer.next();
            observer.complete();
        });
    }

    protected start(params) {
        this.currentIndex = this.fromValue;
    }

    protected isTrue(params) {
        return this.currentIndex <= this.toValue;
    }

    protected prepareNext(params) {
        this.currentIndex += this.byValue;
    }
    
    protected end(params) {
    }

    protected getLoopParams(params): any {
        let scopeParams = this.extendParams(params, { [this.indexVar]: this.currentIndex });
        return scopeParams;
    }
}
