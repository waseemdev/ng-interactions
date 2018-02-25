import { Component, OnInit, ContentChildren, QueryList, Input } from '@angular/core';
import { ActionBase } from '../actions';
import { ActionListHelper } from '../helpers/ActionListHelper';
import { InteractionBase } from '../InteractionBase';

@Component({
    selector: 'trigger-base',
    template: ''
})
export abstract class TriggerBase extends InteractionBase {
    constructor() {
        super();
    }

    ngAfterViewInit() {
        this.onLoad();
    }

    protected onLoad() {
    }

    @ContentChildren(ActionBase) actions: QueryList<ActionBase>;
    @Input() sync: boolean = false;
    /**
        completeOnError if the execution of actions is sync.
    */
    @Input() completeOnError: boolean = false;

    fire(params: any) {
        if (this.actions && this.actions.length) {
            this.executeActions(params);
        }
    }

    private executeActions(params: any) {
        params = this.extendParams(params);

        // todo
        let success = null;
        let error = null;

        let helper: ActionListHelper = new ActionListHelper(this.actions.toArray(), this.sync, this.completeOnError);
        helper.executeActions(params, success, error);
    }
}
