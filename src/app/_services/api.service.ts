import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Observable, of } from "rxjs/index";
import { catchError, map, tap } from "rxjs/internal/operators";

import { MessageService } from "./message.service";
import { JwtService } from "src/app/_services/jwt.service";

@Injectable( { providedIn: 'root' } )
export class ApiService {

    constructor( private httpClient: HttpClient,
                 private jwtService: JwtService,
                 private messageService: MessageService ) {
    };

    /**
     * Set Header to HttpHeaders
     * @returns {HttpHeaders}
     */
    private setHeaders(): HttpHeaders {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if ( this.jwtService.getToken() ) {
            headersConfig[ 'Authorization' ] = `Bearer ${this.jwtService.getToken()}`;
        }

        return new HttpHeaders( headersConfig );
    }

    /**
     * Set Header for POST, PUT method FormData to HttpHeaders
     * @returns {HttpHeaders}
     */
    private setHeadersFormData(): HttpHeaders {
        const headersConfig = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        };

        if ( this.jwtService.getToken() ) {
            headersConfig[ 'Authorization' ] = `Bearer ${this.jwtService.getToken()}`;
        }

        return new HttpHeaders( headersConfig );
    }

    /**
     * Method Create New Data for POST
     * @param {String} path
     * @param {Object} body
     * @returns {Observable<any>}
     */
    create( path: String, body: Object = {} ): Observable<any> {
        return this.httpClient.post(
            `${path}`, JSON.stringify( body ), {
                headers: this.setHeaders()
            }
        ).pipe(
            map( ( response: Response ) => {
                response.json();
            } ),
            tap( ( tabObj ) => {

            } ),
            catchError( this.handleError( 'message', [] ) )
        );
    }

    /**
     * Method Create New Data for POST FormData
     * @param {String} path
     * @param {Object} body
     * @returns {Observable<any>}
     */
    createWithFormData( path: String, body: Object = {} ): Observable<any> {
        return this.httpClient.post(
            `${path}`, this.setFormData( body ), {
                headers: this.setHeadersFormData()
            }
        ).pipe(
            map( ( response: Response ) => {
                response.json();
            } ),
            tap( ( tabObj ) => {

            } ),
            catchError( this.handleError( 'message', [] ) )
        );
    }

    /**
     * Method Read Data
     * @param {string} path
     * @param {Object} params
     * @returns {Observable<any>}
     */
    read( path: String, params: Object = {} ): Observable<any> {
        return this.httpClient.get(
            `${path}`, {
                headers: this.setHeaders(),
                params: this.setParams( params )
            }
        ).pipe(
            map( ( response: Response ) => {
                response.json();
            } ),
            tap( ( tabObj ) => {

            } ),
            catchError( this.handleError( 'message', [] ) )
        );
    }

    /**
     * Method Update Data
     * @param {String} path
     * @param {Object} body
     * @returns {Observable<any>}
     */
    update( path: String, body: Object = {} ): Observable<any> {
        return this.httpClient.put(
            `${path}`, JSON.stringify( body ), {
                headers: this.setHeaders()
            }
        ).pipe(
            map( ( response: Response ) => {
                response.json();
            } ),
            tap( ( tabObj ) => {

            } ),
            catchError( this.handleError( 'message', [] ) )
        );
    }

    /**
     * Method Update Data for PUT FormData
     * @param {String} path
     * @param {Object} body
     * @returns {Observable<any>}
     */
    updateWithFormData( path: String, body: Object = {} ): Observable<any> {
        return this.httpClient.put(
            `${path}`, this.setFormData( body ), {
                headers: this.setHeadersFormData()
            }
        ).pipe(
            map( ( response: Response ) => {

            } ),
            tap( ( tabObj ) => {

            } ),
            catchError( this.handleError( 'message', [] ) )
        );
    }

    /**
     * Method Delete
     * @param {String} path
     * @returns {Observable<any>}
     */
    delete( path: String ): Observable<any> {
        return this.httpClient.delete(
            `${path}`, {
                headers: this.setHeaders()
            }
        ).pipe(
            map( ( response: Response ) => {
                response.json();
            } ),
            tap( ( tabObj ) => {

            } ),
            catchError( this.handleError( 'message', [] ) )
        );
    }

    /**
     * Convert Object to HttpParams
     * @param {Object} obj
     * @returns {HttpParams}
     */
    private setParams( params: Object = {} ): HttpParams {
        let httpParams = new HttpParams();

        Object.keys( params ).forEach( ( key ) => {
            if ( params.hasOwnProperty( key ) ) {
                const valOfKey = params[ key ];

                if ( valOfKey !== null && valOfKey !== undefined ) {
                    httpParams = httpParams.append( key, params[ key ] );
                }
            }
        } );

        return httpParams;
    }

    /**
     * Set FormData for Data
     * @param {Object} body
     * @returns {FormData}
     */
    private setFormData( body: Object = {} ) {
        const formData = new FormData();

        for ( let key in body ) {
            formData.append( key, body[ key ] )
        }

        return formData;
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>( operation = 'operation', result?: T ) {
        return ( error: any ): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error( error ); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log( `${operation} failed: ${error.message}` );

            // Let the app keep running by returning an empty result.
            return of( result as T );
        }
    }

    /** Log a HeroService message with the MessageService */
    private log( message: string ) {
        this.messageService.add( `ApiService: ${message}` );
    }
}
