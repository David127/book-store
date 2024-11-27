import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemComponent } from './shared/components/item/item.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ItemComponent,
        HomePageComponent,
        ProductListComponent,
        ProductCardComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
