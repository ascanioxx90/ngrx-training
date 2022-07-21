import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserComponent} from './components/user/user.component';
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/user/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability:true,
      },
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
