
# Angular Interactions
This is an experimental library for Angular.
The main purpose is to provide a discriptive language using HTML tags.
Consists of Triggers and Actions.

# Setup

1. install via npm:
```
npm i ng-interactions@latest --save
```
2. Import NgInteractionsModule in you module
```typescript
import { NgInteractionsModule } from "ng-interactions";

@NgModule({
    imports: [
        NgInteractionsModule,
        ....
    ]
})
export class AppModule { }
```

# Triggers

## 1. Event Trigger:
Event Trigger will subscribe to an event of a given object, and will execute the actions when the event fires:
```html
<event-trigger on="click" element="#element-id">
    ...actions go here...
</event-trigger>
```
Or 
```html
<event-trigger on="click" [element]="element">
    ...actions go here...
</event-trigger>
```
Or 
```html
<button>
    <event-trigger on="click">
        ...actions go here...
    </event-trigger>
    Click me!
</button>
```
`element`: property can be an HTML Element or an object. if `element` was not provided, default element will be the parent of `event-trigger`.

`on`: property is a name of a known HTML event or an observable member in `element`.

## 2. State Trigger:
State Trigger fires when the condition changes to true.
You can provide either (value1), (value2) or (value1, oper, value2):
```html
<state-trigger [value1]="object" oper="===" value2="some value">
    ...actions go here...
</state-trigger>
```
```html
<state-trigger [value1]="value">
    ...actions go here...
</state-trigger>
```
```html
<state-trigger [value2]="value">
    ...actions go here...
</state-trigger>
```


# Actions
Action is like a block of code that can be executed.

All actions have `delay` property to delay the execution, you can pass a number (in ms) or a Date.

All actions have `param` property to pass parameters from Angular scope to your code scope, see [Custom Binding](#Custom-Binding) section.

## 1. css
`element` property can be a string to query (#id, .class...) or an HTML element.

```html
<css element="#cover" property="height" value="10px" [delay]="300"></css>
```

## 2. css-class
```html
<css element="#cover" add="class-to-add" remove="class-to-remove" toggle="class-to-toggle"></css>
```

## 3. css-translate
```html
<css-translate element="#cover" property="x" value="100px"></css-translate>
```

## 4. css-rotate
```html
<css-rotate element="#cover" property="z" value="90px"></css-rotate>
```

## 5. css-scale
```html
<css-scale element="#cover" property="x" value="90px"></css-scale>
```

## 6. css-skew
```html
<css-skew element="#cover" property="z" value="90px"></css-skew>
```

## 7. css-matrix
TODO


## 8. exec
```html
<exec [source]="object" function="someFunction" [params]="[]"></exec>
```

You can pass a callback parameter like this:
```html
<exec function=":setTimeout" [params]="[,500]">
    <callback-param index="0"> <!-- index="0" is the default -->
        acctions...
    </callback-param>
</exec>
```

## 9. func
TODO

## 10. set
```html
<set [target]="object" property="prop" value="value..."></set>
```

## 11. if
`if` condition can be set by providing either (value1), (value2) or (value1, oper, value2):
```html
<if [value1]="object" oper=">" value2="50">
    <then>
        body goes here...
    </then>
    <else>
        else goes here...
    </else>
</if>
```
```html
<if [value1]="object">
</if>
```
```html
<if [value2]="object">
</if>
```
```html
<if value1=":$param">
</if>
```
```html
<if value1=":param1 > param2">
</if>
```

## 12. switch
```html
<switch [value]="state">
    <case value="a">
        case 'a' body goes here...
    </case>
    <case value="b">
        case 'b' body goes here...
    </case>
    <case value="c">
        case 'c' body goes here...
    </case>
</switch>
```

## 13. counter
`indexVar` default value is `$index`

`from` default value is `0`

`by` default value is `1`
```html
<counter [from]="from" [to]="to" [by]="by" indexVar="i">
    <if value1=":i % 2 === 0">
        <then>
            <exec function=":console.log" params=":[i]"></exec>
        </then>
    </if>
</counter>
```

## 14. foreach
`itemVar` default value is `$item`.

`indexVar` default value is `$index`.
```html
<foreach [items]="data" itemVar="item" indexVar="i">
    <if value1=":i % 2 === 0">
        <then>
            <exec function=":console.log" params=":[i, item]"></exec>
        </then>
    </if>
</foreach>
```

## 15. while
```html
<while [value]="value">
    ...
</while>
```

<br>


# Custom Binding
You can always use Angular binding (e.g. [value1]="value") with any property in any action or trigger.

Using Angular binding may become a performance issue, instead, you can use `prop=":rest of code..."` to use a simple binding that evaluates only when needed.

Example:
```html
<if value1=":index === 0">
    ...
</if>
```
Unlike Angular, the code after `:` can't access variables outside the scope, only can access variables that passed in `[param]` attribute.

Example of passing param:
```html
<if value1=":h > 0 && h < 200" [param]="{ h: formGroup.controls['height'].value }">
    <css-translate property="y" element="#element-id" value=":h"></css-translate>
</if>
```

<br>

# Extending Triggers
Trigger is an Angular Component, inherted from TriggerBase.

Example:
```javascript
import { Component } from '@angular/core';
import { TriggerBase } from 'ng-interactions';

@Component({
    selector: 'my-trigger',
    template: ''
})
export class MyCustomTrigger extends TriggerBase {
    constructor() {
        super();
    }

    protected onLoad() {
        // trigger loaded === ngAfterViewInit()
    }
    
    when_you_need_to_execute_actions() {
        this.fire(params);
    }
}
```

<br>

# Extending Actions
Action is an Angular Component inherted from `ActionBase`, and implements `executeInternal` function.

Don't forget to add `providers` to be discoverable and executed automatically.

Example:
```javascript
import { Component, forwardRef } from '@angular/core';
import { ActionBase } from 'ng-interactions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

@Component({
    selector: 'my-action',
    template: '',
    providers: [{provide: ActionBase, useExisting: forwardRef(() => MyCustomAction) }]
})
export class MyCustomAction extends ActionBase {
    constructor() {
        super();
    }

    @Input() myProp: any;

    protected executeInternal(params: any): Observable<any> {
        // custom implementation goes here...

        // call tryExecuteCode to evaluate code from myProp (e.g. myProp=":user code..."). 
        let value = this.tryExecuteCode(params, this.myProp);
        // use `value` as you want.

        // call extendParams to extend parameters to 
        params = this.extendParams(params);
        let value = this.tryExecuteCode(params, this.myProp);
        
        return Observable.empty();
    }
}
```
