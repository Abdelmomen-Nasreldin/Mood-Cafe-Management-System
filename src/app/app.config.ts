import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),                                  // Provide HttpClient globally
    provideZoneChangeDetection({ eventCoalescing: true }), // Enable event coalescing
    { provide: LocationStrategy, useClass: HashLocationStrategy }  // Use HashLocationStrategy
  ]
}
