import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Csv2JsonComponent } from './csv2json.component';

export * from './csv2json.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Csv2JsonComponent,
  ],
  exports: [
    Csv2JsonComponent,
  ]
})
export class CSV2JSONModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CSV2JSONModule
    };
  }
}
