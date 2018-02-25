import { Component, Input, ElementRef } from '@angular/core';
import { TriggerBase } from './trigger-base';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'event-trigger',
    template: ''
})
export class EventTrigger extends TriggerBase {
    constructor(private elementRef: ElementRef) {
        super();
    }

    private removeDomEventListeners: boolean;
    private loaded: boolean;
    private subscribtions: any[] = [];

    protected onLoad() {
        this.loaded = true;
        if (!this.event) {
            // todo: auto-detect event type
            // if (isButtonOrAnchor) {
            //     // click
            // }
            // else {
            //     // load
            // }
        }
        else if (this.event === 'load') {
            this.fire({ $event: null });
        }
        else if (this.event === 'unload') {
            // do nothing
        }
        else {
            this.initElement();
            this.init();
        }
    }

    private initElement() {
        // try to set parent element as a source element.
        if (this.element) {
            return;
        }

        let elem: HTMLElement = this.elementRef.nativeElement;
        if (elem.parentElement) {
            this.element = elem.parentElement;
        }
    }

    private init() {
        if (!this.loaded || !this.event || !this.element) {
            return;
        }

        if (typeof this.element === 'string') {
            this.element = document.querySelector(this.element);
        }
        if (!this.element) {
            return;
        }

        // html element
        if (this.element instanceof HTMLElement || this.element instanceof Node) {
            this.removeDomEventListeners = true;
            let event = this.event.startsWith('on') ? this.event : ('on' + this.event);
            this.element.addEventListener(event, this.onEvent.bind(this));
        }
        // observable
        else if (this.event in this.element) {
            if (this.element[this.event] instanceof Observable) {
                let sb = (this.element[this.event] as Observable<any>).subscribe((res) => {
                    this.onEvent(res);
                });
                this.subscribtions.push(sb);
            }
        }
    }

    private onEvent(eventArgs) {
        this.fire({ $event: eventArgs });
    }

    private cleanup() {
        if (this.removeDomEventListeners) {
            this.removeDomEventListeners = false;
            let event = this.event.startsWith('on') ? this.event : ('on' + this.event);
            this.element.removeEventListener(event, this.onEvent.bind(this));
        }
        this.subscribtions.forEach(sb => sb && sb.unsubscribe && sb.unsubscribe());
        this.subscribtions = [];
    }

    ngOnDestroy() {
        if (this.event === 'unload') {
            this.fire({ $event: null });
        }
        
        this.cleanup();
    }


    private _element : HTMLElement | Node | string | any;
    public get element() : HTMLElement | Node | string | any {
        return this._element;
    }
    @Input()
    public set element(v : HTMLElement | Node | string | any) {
        if (this._element !== v) {
            this.cleanup();
            this._element = v;
            this.init();
        }
    }


    private _event : string;
    public get event() : string {
        return this._event;
    }
    @Input('on')
    public set event(v : string) {
        if (this._event) {
            this.loaded = false;
            this.cleanup();
        }
        this._event = v;
        if (v) {
            this.init();
        }
    }
}
