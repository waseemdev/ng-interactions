// import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { components } from './components';
import { providers } from './providers';

@NgModule({
    declarations: [
      ...components
    ],
    imports: [
        CommonModule
    ],
    exports: [
      ...components
    ]
})
export class NgInteractionsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgInteractionsModule
        };
    }
}
