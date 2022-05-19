# Shipments

This is a simple demo project based on VueJS and Django.

> This GitHub repo contains frontend part. Backend can be found by this [link](https://github.com/soulless-viewer/shipments-backend/blob/master/README.md).

## Installation

Install the packages with NPM:

```bash
$ npm install
```

## Usage

Run project with the following command **_(you should specify the URL of your backend app)_**:

```bash
$ VUE_APP_SERVER_URL=http://127.0.0.1:8888 npm run serve
```

Now you can open your browser at [127.0.0.1:8080](http://127.0.0.1:8080/shipments/demo/)

### Main page

Default view

![](https://user-images.githubusercontent.com/29832584/167332242-1bc3d115-e16d-4908-acbb-84e313d2168e.png)

To schedule a new one shipment you should fill all the fields

![](https://user-images.githubusercontent.com/29832584/167332737-c4028d02-0319-4d23-a0f6-d825901ddab9.png)

Here we are

![](https://user-images.githubusercontent.com/29832584/167332795-3daebd31-7c0a-419c-8509-d070a7b7153b.png)

Let's click on "Details"

![](https://user-images.githubusercontent.com/29832584/167333112-eebe06a7-7f2e-4c25-afc3-53c9a6610ec5.png)

Now we should change something

![](https://user-images.githubusercontent.com/29832584/167333209-56829dab-6202-4bf8-ae94-74b28f871827.png)

Looks fine

![image](https://user-images.githubusercontent.com/29832584/167333287-19c3d803-02da-45dd-9bb1-bbd5f5f6ea1e.png)

Let's then remove it)

![image](https://user-images.githubusercontent.com/29832584/167333357-58da3fdd-35ad-407e-86cb-6296af1aa47b.png)

Here we go again...

## Testing

Nothing really special, but anyway I will show)

```bash
$ npm run test:unit
```

## Contributing

1.  Fork it.
2.  Create your feature branch:  `git checkout -b my-new-feature`
3.  Commit your changes:  `git commit -am 'Add some feature'`
4.  Push to the branch:  `git push origin my-new-feature`
5.  Submit a pull request

## License
The MIT License (MIT)

Copyright (c) 2022 Mikalai Lisitsa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
