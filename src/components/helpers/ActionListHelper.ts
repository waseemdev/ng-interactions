import {  QueryList } from '@angular/core';
import { ActionBase } from '../actions';

export class ActionListHelper {
    constructor(private actions: Array<ActionBase>,
                private sync: boolean = false,
                private completeOnError: boolean = false) {
    }

    private success: () => void;
    private error: () => void;

    executeActions(params: {}, success: () => void, error: () => void) {
        if (!this.actions) {
            success && success();
            return;
        }
        this.success = success;
        this.error = error;

        if (this.sync) {
            this.execActionsSync(0, this.actions, params, false);
        }
        else {
            this.countExecuted = 0;
            this.actions.forEach(action => this.execAction(params, action));
        }
    }

    private countExecuted: number = 0;
    private hasErrors: boolean;
    private execAction(params: {}, action: ActionBase) {
        let done = (res, err) => {
            this.hasErrors = this.hasErrors || !!err;
            this.countExecuted++;
            if (this.actions.length === this.countExecuted) {
                this.countExecuted = 0;
                if (this.hasErrors) {
                    this.error && this.error();
                }
                else {
                    this.success && this.success();
                }
            }
        };
        action.execute(params).subscribe((res) => {
            done(res, null);
        }, err => {
            done(null, err);
        });
    }

    private execActionsSync(index: number, actions: ActionBase[], params: {}, hasErrors: boolean) {
        if (index >= actions.length) {
            if (hasErrors) {
                this.error && this.error();
            }
            else {
                this.success && this.success();
            }
            return;
        }

        actions[index].execute(params).subscribe(res => {
            this.execActionsSync(index + 1, actions, params, hasErrors);
        }, err => {
            if (this.completeOnError) {
                this.execActionsSync(index + 1, actions, params, true);
            }
            else {
                this.error && this.error();
            }
        });
    }
}
