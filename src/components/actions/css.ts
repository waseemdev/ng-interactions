import { Component, Input, ElementRef, Renderer, forwardRef } from '@angular/core';
import { ActionBase } from './action-base';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

@Component({
    selector: 'css',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => CssAction) }]
})
export class CssAction extends ActionBase {
    constructor(protected elementRef: ElementRef,
        protected renderer: Renderer) {
        super();
    }

    @Input() element: HTMLElement | string;
    @Input() value: any;
    @Input() property: string;
    @Input() cache: boolean = true;
    // @Input() @ContentChild(ActionBase) value: QueryList<ActionBase> | any;


    private static readonly transforms: Map<Element, TransformValue> = new Map();
    private static readonly elementsCache: Map<any, Element> = new Map();


    protected executeInternal(params: any): Observable<any> {
        let element = this.getElement(params);
        let property = this.tryExecuteCode(params, this.property);
        let value = this.tryExecuteCode(params, this.value);

        if (!element) {
            return Observable.empty();
        }

        this.applyCss(params, element, property, value);
        return Observable.empty();
    }


    private builtInElementTags = {
        'action-base': true,
        'action-list': true,
        'css-class': true,
        'css-matrix': true,
        'css-skew': true,
        'css-rotate': true,
        'css-scale': true,
        'css-translate': true,
        'css': true,
        'exec': true,
        'func': true,
        // 'get': true,
        'else': true,
        'then': true,
        'if': true,
        'loop': true,
        'counter': true,
        'foreach': true,
        'set': true,
        'switch': true,
        'case': true,

        'event-trigger': true,
        'state-trigger': true,
        'trigger-base': true
    };

    private getElement(params) {
        let element;

        if (this.cache && (element = CssAction.elementsCache.get(this))) {
            return element;
        }

        element = this.element ? this.tryExecuteCode(params, this.element) : this.getParentElement();
        if (typeof element === 'string') {
            element = this.getHTMLElement(element);
        }

        if (this.cache) {
            CssAction.elementsCache.set(this, element);
        }

        return element
    }

    private getParentElement(): Element {
        let element: Element = this.elementRef.nativeElement.parentElement;
        while (element.localName in this.builtInElementTags) {
            element = this.elementRef.nativeElement.parentElement;
        }
        return element;
    }

    private getHTMLElement(element: string): Element {
        let el: Element;
        if (CssAction.elementsCache.has(element)) {
            el = CssAction.elementsCache.get(element);
        }
        else {
            el = document.querySelector(element);
            CssAction.elementsCache.set(element, el);
        }
        return el;
    }


    protected applyCss(params, element, property, value) {
        if (property) {
            this.renderer.setElementStyle(element, property, value);
        }
    }

    protected applyTransform(element, property: string, axe: string, value: string) {
        axe = (axe || 'x').toUpperCase();
        if (axe === '3D') {
            axe = '3d';
        }

        let transformValue: TransformValue = new TransformValue();
        if (CssAction.transforms.has(element)) {
            transformValue = CssAction.transforms.get(element);
        }
        
        // value = this.extractAxesValues(value);
        transformValue[property] = property + axe + '(' + value + ')';
        CssAction.transforms.set(element, transformValue);
        
        let transform = transformValue.getValue();
        this.renderer.setElementStyle(element, 'transform', transform);
    }

    private extractAxesValues(value) {
        // todo: 
        return value;
    }
}

export class TransformValue {
    scale;
    rotate;
    translate;

    getValue(): string {
        return `${this.scale ? this.scale : ''} ${this.rotate ? this.rotate : ''} ${this.translate ? this.translate : ''}`;
    }
}
