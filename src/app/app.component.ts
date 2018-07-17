import { Component, OnInit } from '@angular/core';

import { ApiService } from "src/app/_services/api.service";

@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
} )
export class AppComponent {
    title = 'app';

    constructor(
        private ApiService: ApiService
    ) { }

    ngOnInit() {
        this.ApiService.read('http://localhost:3001/api/v1/users').subscribe((result) => {
           console.log(result);
        });
    }
}
