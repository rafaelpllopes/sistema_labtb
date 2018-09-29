import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { MenuModule } from '../shared/components/menu/menu.module';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MenuModule,
    RouterModule
  ],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent]
})
export class CoreModule { }
