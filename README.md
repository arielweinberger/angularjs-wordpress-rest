# WordPress REST Service
During my work as a hybrid mobile applications developer (using Ionic Framework) I encountered the need to make REST requests to WordPress blogs. I created this service to make my life easier. Please note that it's probably missing features - feel free to contribute!

# Requirements & Dependencies
- The `WordPress` service depends on the `REST` service (found in the **src** folder).
- AngularJS (will work with any framework that is build up on AngularJS).
- Basic understanding of JS promises (using the default **$q** promises by AngularJS). For more information read [AngularJS Documentation: $q](https://docs.angularjs.org/api/ng/service/$q) .

# Setup
It's dead simple.

Clone the repo /or/ download as ZIP /or/ manually copy-paste the files located in *src/js/services*.

Include the files in your project's **index.html** file.
```
<script src="js/services/rest.js"></script>
<script src="js/services/wordpress.js"></script>
```

Add `REST` and `WordPress` as dependencies to your application (preferably REST first).

Inject the WordPress service as `WordPress` to your controller, like so:
```
mod.controller('MyCtrl', function (WordPress) {
    // Do stuff...
});
```

# Why Promises?
Welcome to 2016, where JavaScript can do several things at once. Single-threaded on steroids.
Especially when it comes to HTTP requests, we cannot ever make sure that the results come in time.
I have adopted the common usage of Promises (using the default AngularJS $q promises library). This way we can manipulate our data in our own sequence.

Imagine a situation where we need to:

1. Get all categories.

2. Get first 5 posts of a category.

3. Get the featured media image of each post.

4. Apply to view.

Without promises, it is very likely that something will break in between.

# Examples
Below are several examples of usage.

- **REST.setStaticRoute()**:  Setting a base static path for all requests. This is useful if you want to make your life easier and make your path parameters shorter. It is set by default in the **wordpress.js** file.
```
REST.setStaticRoute('http://myblog.com/wp-json/wp/v2');
```

- **WordPress.getAllCategories()**: Get an array of all categories to exist in the blog.
```
WordPress.getAllCategories().then(function (res) {
    var categories = res.data;
    console.log(categories.length); // Will print the amount of categories
}, function (err) {
    // Error callback
});
```

- **WordPress.getPostById()**: Get a specific post by its unique id.
```
WordPress.getPostById(12).then(function (res) {
    var post = res.data;
    console.log('We just got post "' + post.title.rendered + '"'); // Will print the title of post ID 12
}, function (err) {
    // Error callback
});
```

- **WordPress.getMediaById()**: Get a specific media by its unique id.
```
WordPress.getMediaById(7).then(function (res) {
    var media = res.data;
    console.log('The image URL is: "' + media.source_url + '"'); // Will print the path to the image (on the blog)
}, function (err) {
    // Error callback
});
```

# CORS issues
CORS issues might be encountered. There are several ways to bypass this.

1. Make sure that the remote host (the one hosting the WordPress blog) allows incoming connections from the outside world.

2. If using Ionic/Cordova/PhoneGap - make sure to install the [Cordova Whitelist Plugin](https://github.com/apache/cordova-plugin-whitelist) and add the desired `<meta>` tags as well as define `<allow-navigation>` rules in Cordova's **config.xml** file.

3. If occurs on iOS devices, you might need to add the `NSAppTransportSecurity` dictionary to your app's **info.plist**.

4. Use an application such as [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) to perform test API calls (to eliminate the option that the problem is caused by your blog).

5. (**Not recommended**) Download extensions such as [Allow-Control-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) to disable CORS protection for your browser. There are alternatives for literally any browser out there.
