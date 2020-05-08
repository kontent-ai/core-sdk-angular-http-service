import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    IBaseResponse,
    IBaseResponseError,
    IHeader,
    IHttpDeleteQueryCall,
    IHttpGetQueryCall,
    IHttpPostQueryCall,
    IHttpPutQueryCall,
    IHttpQueryCall,
    IHttpQueryOptions,
    IHttpService,
    observableRetryStrategy,
    retryService,
    IHttpPatchQueryCall
} from '@kentico/kontent-core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retryWhen } from 'rxjs/operators';

@Injectable()
export class AngularHttpService implements IHttpService {
    constructor(private http: HttpClient) {}

    get<TError extends any, TRawData extends any>(
        call: IHttpGetQueryCall<TError>,
        options?: IHttpQueryOptions
    ): Observable<IBaseResponse<TRawData>> {
        const angularObs = this.http.get(call.url, {
            headers: this.getAngularHeaders(options ? options.headers : undefined)
        });

        return this.mapAngularObservable(angularObs, call, options);
    }

    post<TError extends any, TRawData extends any>(
        call: IHttpPostQueryCall<TError>,
        options?: IHttpQueryOptions
    ): Observable<IBaseResponse<TRawData>> {
        const angularObs = this.http.post(call.url, call.body, {
            headers: this.getAngularHeaders(options ? options.headers : undefined)
        });

        return this.mapAngularObservable(angularObs, call, options);
    }

    patch<TError extends any, TRawData extends any>(
        call: IHttpPatchQueryCall<TError>,
        options?: IHttpQueryOptions
    ): Observable<IBaseResponse<TRawData>> {
        const angularObs = this.http.patch(call.url, call.body, {
            headers: this.getAngularHeaders(options ? options.headers : undefined)
        });

        return this.mapAngularObservable(angularObs, call, options);
    }

    put<TError extends any, TRawData extends any>(
        call: IHttpPutQueryCall<TError>,
        options?: IHttpQueryOptions
    ): Observable<IBaseResponse<TRawData>> {
        const angularObs = this.http.put(call.url, call.body, {
            headers: this.getAngularHeaders(options ? options.headers : undefined)
        });

        return this.mapAngularObservable(angularObs, call, options);
    }

    delete<TError extends any, TRawData extends any>(
        call: IHttpDeleteQueryCall<TError>,
        options?: IHttpQueryOptions
    ): Observable<IBaseResponse<TRawData>> {
        const angularObs = this.http.delete(call.url, {
            headers: this.getAngularHeaders(options ? options.headers : undefined)
        });

        return this.mapAngularObservable(angularObs, call, options);
    }

    private mapAngularObservable<TError extends any, TRawData extends any>(
        obs: Observable<any>,
        call: IHttpQueryCall<TError>,
        options?: IHttpQueryOptions
    ): Observable<IBaseResponse<TRawData>> {
        return obs.pipe(
            map(
                (response) =>
                    <IBaseResponse<TRawData>>{
                        data: response,
                        response: undefined,
                        headers: [],
                        status: 0
                    }
            ),
            retryWhen(
                observableRetryStrategy.strategy(
                    retryService.getRetryStrategyFromStrategyOptions(
                        options && options.retryStrategy ? options.retryStrategy : undefined
                    ),
                    {
                        startTime: new Date()
                    }
                )
            ),
            catchError((error) => {
                if (options && options.logErrorToConsole) {
                    console.warn(`Kentico Kontent Angular HTTP service encountered an error: `, error);
                }

                return throwError(<IBaseResponseError<TError>>{
                    originalError: error,
                    mappedError: call.mapError(error)
                });
            })
        );
    }

    private getAngularHeaders(headers?: IHeader[]): HttpHeaders | undefined {
        if (!headers) {
            return undefined;
        }

        let angularHeaders = new HttpHeaders();
        for (const header of headers) {
            angularHeaders = angularHeaders.append(header.header, header.value);
        }

        return angularHeaders;
    }
}
