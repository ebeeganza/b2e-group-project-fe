import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CartComponent } from './components/cart/cart.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

import { MatCardModule } from '@angular/material/card'

import { AccountComponent } from './components/account/account.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductsListComponent } from './components/products-list/products-list.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';

import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { CouponComponent } from './components/coupon/coupon.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    CartComponent,
    CreateProductComponent,
    AccountComponent,
    AccountListComponent,
    ProductsListComponent,
    EditAccountComponent,
    CouponComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSidenavModule,
    MatBadgeModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
