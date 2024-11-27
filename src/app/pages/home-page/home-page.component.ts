import { Component } from '@angular/core';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [ProductListComponent]
})
export class HomePageComponent {

}
