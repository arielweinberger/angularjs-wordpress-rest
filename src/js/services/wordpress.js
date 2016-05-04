/*
    WordPress REST Service
    Repository: https://github.com/arielweinberger/angularjs-wordpress-rest
    ----------------------------------
    Ariel Weinberger, 2016
    GitHub: https://github.com/arielweinberger
    
    Contributors: -
 */
var mod = angular.module('app.services.wordpress', [
  'app.services.rest'
]);

mod.service('WordPress', function ($q, REST) {
 
  var self = {};
  
  REST.setStaticRoute('http://myblog.com/wp-json/wp/v2');
  self.ACFBaseRoute = 'http://myblog.com/wp-json/acf/v2';

  /**
   * WordPress.getPostById
   * ----------------------
   * Get a post by its unique id.
   *
   * @param id
   * @returns {Promise}
   */
  self.getPostById = function (id) {
    var d = $q.defer();

    REST.get('/posts/' + id)
      .then(function (res) {
        d.resolve(res);
      }, function (err) {
        d.reject(err);
      });

    return d.promise;
  };

  /**
   * WordPress.getPostsByCategory
   * ------------------------------
   * Gets all posts from a specific category.
   *
   * @param id
   * @returns {Promise}
   */
  self.getPostsByCategory = function (id, page) {
    var d = $q.defer();

    // By default, page will be 1 (first page).
    if(page === undefined) {
      page = 1;
    }

    // -1 for unlimited posts per page (well, 999999).
    if(page === -1) {
      var postsPerPage = 999999;
    } else {
      var postsPerPage = 5;
    }

    REST.get('/posts?filter[cat]=' + id + '&orderby=date&order=desc&page=' + page + '&per_page=' + postsPerPage)
      .then(function (res) {
        d.resolve(res);
      }, function (err) {
        d.reject(err);
      });

    return d.promise;
  };

  /**
   * WordPress.getAllCategories
   * ----------------------------
   * Gets all categories.
   *
   * @returns {Promise}
   */
  self.getAllCategories = function () {
    var d = $q.defer();

    REST.get('/categories')
      .then(function (res) {
        d.resolve(res);
      }, function (err) {
        d.reject(err);
      });

    return d.promise;
  };

  /**
   * WordPress.ACFByCategoryId
   * ----------------------------
   * Gets ACF values of a category by its unique id.
   *
   * @param id
   * @returns {Promise}
   */
  self.getACFByCategoryId = function (id) {
    var d = $q.defer();

    REST.get(self.ACFBaseRoute + '/term/categories/' + id, true)
      .then(function (res) {
        d.resolve(res);
      }, function (err) {
        d.reject(err);
      });

    return d.promise;
  };

  /**
   * WordPress.getLatestPostOfCategory
   * --------------------------------
   * Returns latest post from a category.
   * @param id
   * @returns {Promise}
   */
  self.getLatestPostOfCategory = function (id) {
    var d = $q.defer();

    REST.get('/posts?filter[cat]=' + id + '&filter[posts_per_page]=1')
      .then(function (res) {
        d.resolve({ data: res.data[0] });
      }, function (err) {
        d.reject(err);
      });

    return d.promise;
  };

  /**
   * WordPress.getCategoryById
   * -------------------------
   * Gets a category by its unique id.
   * 
   * @param id
   * @returns {Promise}
   */
  self.getCategoryById = function (id) {
    var d = $q.defer();

    REST.get('/categories/' + id)
      .then(function (res) {
        d.resolve(res);
      }, function (err) {
        d.reject(err);
      });

    return d.promise;
  };

  /**
   * WordPress.getCategoryBySlug
   * ---------------------------
   * Gets a category by its unique slug.
   * 
   * @param slug
   * @returns {Promise}
   */
  self.getCategoryBySlug = function (slug) {
    var d = $q.defer();

    REST.get('/categories?slug=' + slug)
    .then(function (res) {
      d.resolve(res);
    }, function (err) {
      d.reject(err);
    })

    return d.promise;
  };

  /**
   * WordPress.getMediaById
   * ----------------------
   * Gets a media by its unique id.
   *
   * @param id
   * @returns {Promise}
   */
  self.getMediaById = function (id) {
    var d = $q.defer();

    REST.get('/media/' + id)
      .then(function (res) {
        d.resolve(res);
      }, function (err) {
        d.reject(err)
      });

    return d.promise;
  };

  /**
   * WordPress.getUserById
   * ---------------------
   * Gets a user by its unique id.
   *
   * @param id
   * @returns {Promise}
   */
  self.getUserById = function (id) {
    var d = $q.defer();

    REST.get('/users/' + id)
      .then(function (res) {
        d.resolve(res);
      }, function (err) {
        d.reject(err)
      });

    return d.promise;
  };

  /**
   * WordPress.getCommentsByPostId
   * -----------------------------
   * Gets comments by unique post id.
   *
   * @param id
   * @returns {Promise}
   */
  self.getCommentsByPostId = function (id) {
    var d = $q.defer();

    REST.get('/comments?post=' + id)
      .then(function (res) {
        d.resolve(res);
      }, function (err) {
        d.reject(err);
      });

    return d.promise;
  };

  /**
   * WordPress.submitComment
   * -----------------------
   * Submit a new comment to a post by its unique id.
   *
   * @param id
   * @param data (content, author_name, author_email, post)
   * @returns {Promise}
   */
  self.submitComment = function (id, data) {
    var d = $q.defer();

    REST.post('/comments', {
      'content': data.content,
      'author_name': data.name,
      'author_email': data.email,
      'post': data.postId
    }).then(function (res) {
      console.info('[WordPress] Comment submitted successfully!', res);
      d.resolve(res);
    }, function (err) {
      console.error('[WordPress] Failed to submit comment. Error: ', err);
      d.reject(err);
    });

    return d.promise;
  };

  return self;
});