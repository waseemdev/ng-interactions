import { Component, Input } from '@angular/core';
import { TriggerBase } from './trigger-base';
import { ConditionEval } from '../helpers/ConditionEval';

@Component({
    selector: 'state-trigger',
    template: ''
})
export class StateTrigger extends TriggerBase {
    constructor() {
        super();
    }

    private _oper : any;
    public get oper() : any {
        return this._oper;
    }
    @Input()
    public set oper(v : any) {
        if (this._oper !== v) {
            this._oper = v;
            this.checkState();
        }
    }
    
    private _value1 : any;
    public get value1() : any {
        return this._value1;
    }
    @Input()
    public set value1(v : any) {
        if (this._value1 !== v) {
            this._value1 = v;
            this.checkState();
        }
    }
    
    private _value2 : any;
    public get value2() : any {
        return this._value2;
    }
    @Input()
    public set value2(v : any) {
        if (this._value2 !== v) {
            this._value2 = v;
            this.checkState();
        }
    }
    

    // private lastOper: any;
    // private lastValue1: any;
    // private lastValue2: any;
    private loaded: boolean;
    private conditionEval: ConditionEval = new ConditionEval();

    protected onLoad() {
        this.loaded = true;
        this.checkState();
    }

    private checkState() {
        if (!this.loaded) {
            return;
        }

        // if (this.value1 === this.lastValue1 && this.value2 === this.lastValue2 && this.oper === this.lastOper) {
        //     // state didn't change
        //     return;
        // }

        // this.lastValue1 = this.value1;
        // this.lastValue2 = this.value2;
        // this.lastOper = this.oper;

        if (this.conditionEval.isTrue(this.value1, this.oper, this.value2)) {
            this.fire(null);
        }
    }
}
