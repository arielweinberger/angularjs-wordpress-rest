# WordPress REST Service
During my work as a hybrid mobile applications developer (using Ionic Framework) I encountered the need to make REST requests to WordPress blogs. I created this service to make my life easier. Please note that it's probably missing features - feel free to contribute!

# Requirements & Dependencies
- The `WordPress` service depends on the `REST` service (found in the **src** folder).
- AngularJS (will work with any framework that is build up on AngularJS).
- Basic understanding of JS promises (using the default **$q** promises by AngularJS). For more information read [AngularJS Documentation: $q](https://docs.angularjs.org/api/ng/service/$q) .

# Setup
It's dead simple.
1. Clone the repo /or/ download as ZIP /or/ manually copy-paste the files located in *src/js/services*.
2. Include the files in your project's **index.html** file.
3. Add `REST` and `WordPress` as dependencies to your application (preferably REST first).
4. Inject the WordPress service as `WordPress` to your controller, like so:
```
mod.controller('MyCtrl', function (WordPress) {
    // Do stuff...
});
```
