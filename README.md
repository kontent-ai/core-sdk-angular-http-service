
[![Build](https://github.com/kontent-ai/core-sdk-angular-http-service/actions/workflows/main.yml/badge.svg)](https://github.com/kontent-ai/core-sdk-angular-http-service/actions/workflows/main.yml)
[![GitHub license](https://img.shields.io/github/license/kontent-ai/core-sdk-angular-http-service)](https://github.com/kontent-ai/core-sdk-angular-http-service/blob/master/LICENSE.md)
[![Discord](https://img.shields.io/discord/821885171984891914?label=Discord&logo=Discord&logoColor=white)](https://discord.gg/SKCxwPtevJ)
[![GitHub issues](https://img.shields.io/github/issues/kontent-ai/core-sdk-angular-http-service)](https://github.com/kontent-ai/core-sdk-angular-http-service/issues)

# Angular Http service

This is an implementation of the `IHttpService` that can be used instead of the default http service available in [Core package](https://www.npmjs.com/package/@kontent-ai/core-sdk) that uses `axios` package. 

This library uses Angular's `HttpClient` to make http requests and can be used only in Angular applications.

## Why and when should you use this library? 

If you need to use `server side rendering with prerender` using Angular universal, you have to use Angular's built-in Http service because otherwise Angular will not wait until the requests are fetched from server and therefore your code would not be reflected in HTML of your page. 

## Example

```typescript
import { AngularHttpService } from '@kontent-ai/core-sdk-angular-http-service';

const deliveryClient = new DeliveryClient({
      projectId: 'xyz',
      httpService: new AngularHttpService()
    });
```
