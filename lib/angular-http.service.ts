import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    IHeader,
    IHttpService,
    IResponse,
    IHttpDeleteQueryCall,
    IHttpGetQueryCall,
    IHttpPatchQueryCall,
    IHttpPostQueryCall,
    IHttpPutQueryCall,
    IHttpQueryOptions,
    IHttpCancelRequestToken,
    IRetryStrategyOptions,
    retryHelper,
    httpDebugger
} from '@kontent-ai/core-sdk';
import { ResponseType } from 'axios';
import { firstValueFrom } from 'rxjs';

type CancelToken = null;

@Injectable({
    providedIn: 'root'
})
export class AngularHttpService implements IHttpService<CancelToken> {
    constructor(private http: HttpClient) {}

    async getAsync<TRawData>(
        call: IHttpGetQueryCall,
        options?: IHttpQueryOptions<CancelToken>
    ): Promise<IResponse<TRawData>> {
        const retryStrategyOptions = options?.retryStrategy ?? retryHelper.defaultRetryStrategy;

        return await this.runWithRetryAsync<TRawData>({
            retryAttempt: 0,
            url: call.url,
            retryStrategy: retryStrategyOptions,
            call: async (retryAttempt) => {
                httpDebugger.debugStartHttpRequest();

                const angularResponse = await firstValueFrom(
                    this.http.get<TRawData>(call.url, {
                        headers: this.getAngularHeaders(options?.headers ?? []),
                        responseType: this.getResponseType(options) as any,
                        observe: 'response'
                    })
                );

                const response: IResponse<TRawData> = {
                    data: angularResponse.body as TRawData,
                    rawResponse: angularResponse,
                    headers: this.extractHeadersFromAngularResponse(angularResponse),
                    status: angularResponse.status,
                    retryStrategy: {
                        options: retryStrategyOptions,
                        retryAttempts: retryAttempt
                    }
                };

                httpDebugger.debugSuccessHttpRequest();
                return response;
            }
        });
    }

    async postAsync<TRawData>(
        call: IHttpPostQueryCall,
        options?: IHttpQueryOptions<CancelToken>
    ): Promise<IResponse<TRawData>> {
        const retryStrategyOptions = options?.retryStrategy ?? retryHelper.defaultRetryStrategy;

        return await this.runWithRetryAsync<TRawData>({
            retryAttempt: 0,
            url: call.url,
            retryStrategy: retryStrategyOptions,
            call: async (retryAttempt) => {
                httpDebugger.debugStartHttpRequest();

                const angularResponse = await firstValueFrom(
                    this.http.post<TRawData>(call.url, call.body, {
                        headers: this.getAngularHeaders(options?.headers ?? []),
                        responseType: this.getResponseType(options) as any,
                        observe: 'response'
                    })
                );

                const response: IResponse<TRawData> = {
                    data: angularResponse.body as TRawData,
                    rawResponse: angularResponse,
                    headers: this.extractHeadersFromAngularResponse(angularResponse),
                    status: angularResponse.status,
                    retryStrategy: {
                        options: retryStrategyOptions,
                        retryAttempts: retryAttempt
                    }
                };

                httpDebugger.debugSuccessHttpRequest();
                return response;
            }
        });
    }

    async putAsync<TRawData>(
        call: IHttpPutQueryCall,
        options?: IHttpQueryOptions<CancelToken>
    ): Promise<IResponse<TRawData>> {
        const retryStrategyOptions = options?.retryStrategy ?? retryHelper.defaultRetryStrategy;

        return await this.runWithRetryAsync<TRawData>({
            retryAttempt: 0,
            url: call.url,
            retryStrategy: retryStrategyOptions,
            call: async (retryAttempt) => {
                httpDebugger.debugStartHttpRequest();

                const angularResponse = await firstValueFrom(
                    this.http.put<TRawData>(call.url, call.body, {
                        headers: this.getAngularHeaders(options?.headers ?? []),
                        responseType: this.getResponseType(options) as any,
                        observe: 'response'
                    })
                );

                const response: IResponse<TRawData> = {
                    data: angularResponse.body as TRawData,
                    rawResponse: angularResponse,
                    headers: this.extractHeadersFromAngularResponse(angularResponse),
                    status: angularResponse.status,
                    retryStrategy: {
                        options: retryStrategyOptions,
                        retryAttempts: retryAttempt
                    }
                };

                httpDebugger.debugSuccessHttpRequest();
                return response;
            }
        });
    }

    async patchAsync<TRawData>(
        call: IHttpPatchQueryCall,
        options?: IHttpQueryOptions<CancelToken>
    ): Promise<IResponse<TRawData>> {
        const retryStrategyOptions = options?.retryStrategy ?? retryHelper.defaultRetryStrategy;

        return await this.runWithRetryAsync<TRawData>({
            retryAttempt: 0,
            url: call.url,
            retryStrategy: retryStrategyOptions,
            call: async (retryAttempt) => {
                httpDebugger.debugStartHttpRequest();

                const angularResponse = await firstValueFrom(
                    this.http.patch<TRawData>(call.url, call.body, {
                        headers: this.getAngularHeaders(options?.headers ?? []),
                        responseType: this.getResponseType(options) as any,
                        observe: 'response'
                    })
                );

                const response: IResponse<TRawData> = {
                    data: angularResponse.body as TRawData,
                    rawResponse: angularResponse,
                    headers: this.extractHeadersFromAngularResponse(angularResponse),
                    status: angularResponse.status,
                    retryStrategy: {
                        options: retryStrategyOptions,
                        retryAttempts: retryAttempt
                    }
                };

                httpDebugger.debugSuccessHttpRequest();
                return response;
            }
        });
    }

    async deleteAsync<TRawData>(
        call: IHttpDeleteQueryCall,
        options?: IHttpQueryOptions<CancelToken>
    ): Promise<IResponse<TRawData>> {
        const retryStrategyOptions = options?.retryStrategy ?? retryHelper.defaultRetryStrategy;

        return await this.runWithRetryAsync<TRawData>({
            retryAttempt: 0,
            url: call.url,
            retryStrategy: retryStrategyOptions,
            call: async (retryAttempt) => {
                httpDebugger.debugStartHttpRequest();

                const angularResponse = await firstValueFrom(
                    this.http.delete<TRawData>(call.url, {
                        headers: this.getAngularHeaders(options?.headers ?? []),
                        responseType: this.getResponseType(options) as any,
                        observe: 'response'
                    })
                );

                const response: IResponse<TRawData> = {
                    data: angularResponse.body as TRawData,
                    rawResponse: angularResponse,
                    headers: this.extractHeadersFromAngularResponse(angularResponse),
                    status: angularResponse.status,
                    retryStrategy: {
                        options: retryStrategyOptions,
                        retryAttempts: retryAttempt
                    }
                };

                httpDebugger.debugSuccessHttpRequest();
                return response;
            }
        });
    }

    createCancelToken(): IHttpCancelRequestToken<CancelToken> {
        throw Error(
            `Cancel tokens are not supported in Angular Http Service. You may convert Promise into Rxjs Observable and use unsubscribe method as an alternative.`
        );
    }

    private extractHeadersFromAngularResponse(httpResponse: HttpResponse<any>): IHeader[] {
        const headers: IHeader[] = [];

        for (const headerName of httpResponse.headers.keys()) {
            headers.push({
                header: headerName,
                value: httpResponse.headers.get(headerName) ?? ''
            });
        }

        return headers;
    }

    private getResponseType(options?: IHttpQueryOptions<CancelToken>): ResponseType {
        if (!options?.responseType) {
            return 'json';
        }

        return options.responseType;
    }

    private getAngularHeaders(headers?: IHeader[]): HttpHeaders {
        let angularHeaders = new HttpHeaders();

        if (!headers) {
            return angularHeaders;
        }

        for (const header of headers) {
            angularHeaders = angularHeaders.append(header.header, header.value);
        }

        return angularHeaders;
    }

    private async runWithRetryAsync<TRawData>(data: {
        url: string;
        retryAttempt: number;
        call: (retryAttempt: number) => Promise<IResponse<TRawData>>;
        retryStrategy: IRetryStrategyOptions;
    }): Promise<IResponse<TRawData>> {
        try {
            return await data.call(data.retryAttempt);
        } catch (error) {
            const retryResult = retryHelper.getRetryErrorResult({
                error: error,
                retryAttempt: data.retryAttempt,
                retryStrategy: data.retryStrategy
            });

            if (retryResult.canRetry) {
                httpDebugger.debugRetryHttpRequest();

                // wait time before retrying
                await new Promise((resolve) => setTimeout(resolve, retryResult.retryInMs));

                // retry request
                console.warn(
                    `Retry attempt '${data.retryAttempt + 1}' from a maximum of '${
                        retryResult.maxRetries
                    }' retries. Request url: '${data.url}'`
                );

                return await this.runWithRetryAsync({
                    call: data.call,
                    retryStrategy: data.retryStrategy,
                    retryAttempt: data.retryAttempt + 1,
                    url: data.url
                });
            }

            console.error(`Executing '${data.url}' failed. Request was retried '${data.retryAttempt}' times. `, error);

            throw error;
        }
    }
}
