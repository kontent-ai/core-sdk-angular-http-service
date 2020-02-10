
# Angular Http service

This is an implementation of the `IHttpService` that can be used instead of the default http service available in [Core package](https://www.npmjs.com/package/kentico-kontent-core) that uses `axios` package. 

This library uses Angular's `HttpClient` to make http requests and can be used only in Angular applications.

## Versions

In table below you can see what version of this library to use depending on your Angular version.

| Angular version | This library version|
|-----------|-------|
| Angular 8 | ~3.0.0 |
| Angular 9 | ~4.0.0 |
| Angular 7 | 2.0.0 |

## Why and when should you use this library? 

If you need to use `server side rendering with prerender` using Angular universal, you have to use Angular's built-in Http service because otherwise Angular will not wait until the requests are fetched from server and therefore your code would not be reflected in HTML of your page. You can find more information about the issue [here](https://github.com/Kentico/kentico-kontent-js/blob/master/doc/delivery.md)

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
