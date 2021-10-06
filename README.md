
[![Build](https://github.com/Kentico/kontent-angular-http-service/actions/workflows/main.yml/badge.svg)](https://github.com/Kentico/kontent-angular-http-service/actions/workflows/main.yml)
[![GitHub license](https://img.shields.io/github/license/Enngage/kontent-angular-http-service)](https://github.com/Kentico/kontent-angular-http-service/blob/master/LICENSE.md)
[![Discord](https://img.shields.io/discord/821885171984891914?label=Discord&logo=Discord&logoColor=white)](https://discord.gg/SKCxwPtevJ)
[![GitHub issues](https://img.shields.io/github/issues/Kentico/kontent-angular-http-service)](https://github.com/Kentico/kontent-angular-http-service/issues)

# Angular Http service

This is an implementation of the `IHttpService` that can be used instead of the default http service available in [Core package](https://www.npmjs.com/package/kentico-kontent-core) that uses `axios` package. 

This library uses Angular's `HttpClient` to make http requests and can be used only in Angular applications.

## Why and when should you use this library? 

If you need to use `server side rendering with prerender` using Angular universal, you have to use Angular's built-in Http service because otherwise Angular will not wait until the requests are fetched from server and therefore your code would not be reflected in HTML of your page. You can find more information about the issue [here](https://github.com/Kentico/kentico-kontent-js/blob/master/doc/delivery.md)

## Sample app

Sample Angular using this implementation of `IHttpService` can be found at https://github.com/Enngage/kontent-delivery-angular-sample

## Example

Snippet from angular's component: 

```typescript
  private readonly deliveryClient: IDeliveryClient;

  constructor(angularHttpService: AngularHttpService) {
    this.deliveryClient = new DeliveryClient({
      projectId: 'da5abe9f-fdad-4168-97cd-b3464be2ccb9',
      httpService: angularHttpService
    });
  }
```
