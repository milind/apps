// Generated by CoffeeScript 1.3.3

/*
# ownCloud - News app
#
# @author Bernhard Posselt
# Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
#
# This file is licensed under the Affero General Public License version 3 or later.
# See the COPYING-README file
#
*/


(function() {
  var scrolling,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('News', []).run(function() {});

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  scrolling = true;

  angular.module('News').directive('whenScrolled', function() {
    return function(scope, elm, attr) {
      var scrollTimeout;
      scrollTimeout = 500;
      return elm.bind('scroll', function() {
        if (scrolling) {
          scrolling = false;
          setTimeout(function() {
            return scrolling = true;
          }, scrollTimeout);
          return scope.$apply(attr.whenScrolled);
        }
      });
    };
  });

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').filter('feedInFolder', function() {
    return function(feeds, folderId) {
      var feed, result, _i, _len;
      result = [];
      for (_i = 0, _len = feeds.length; _i < _len; _i++) {
        feed = feeds[_i];
        if (feed.folder === folderId) {
          result.push(feed);
        }
      }
      return result;
    };
  });

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').filter('itemInFeed', [
    'FeedType', 'FeedModel', function(FeedType, FeedModel) {
      return function(items, typeAndId) {
        var feed, feedId, item, result, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref;
        result = [];
        if (typeAndId.type === FeedType.Subscriptions) {
          return items;
        }
        if (typeAndId.type === FeedType.Starred) {
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            item = items[_i];
            if (item.isImportant) {
              result.push(item);
            }
          }
        }
        if (typeAndId.type === FeedType.Shared) {
          return result;
        }
        if (typeAndId.type === FeedType.Folder) {
          for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
            item = items[_j];
            feedId = 0;
            _ref = FeedModel.getItems();
            for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
              feed = _ref[_k];
              if (feed.folder = typeAndId.id) {
                feedId = feed.id;
              }
            }
            if (item.feed === feedId) {
              result.push(item);
            }
          }
        }
        if (typeAndId.type === FeedType.Feed) {
          for (_l = 0, _len3 = items.length; _l < _len3; _l++) {
            item = items[_l];
            if (item.feed === typeAndId.id) {
              result.push(item);
            }
          }
        }
        return result;
      };
    }
  ]);

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').factory('FeedModel', [
    'Model', function(Model) {
      var FeedModel;
      FeedModel = (function(_super) {

        __extends(FeedModel, _super);

        function FeedModel() {
          FeedModel.__super__.constructor.call(this);
          this.add({
            id: 1,
            name: 'test',
            unreadCount: 0,
            folder: 0,
            show: true,
            icon: 'url(http://feeds.feedburner.com/favicon.ico)'
          });
          this.add({
            id: 2,
            name: 'sub',
            unreadCount: 0,
            folder: 1,
            show: true,
            icon: 'url(http://feeds.feedburner.com/favicon.ico)'
          });
        }

        return FeedModel;

      })(Model);
      return new FeedModel();
    }
  ]);

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').factory('ShowAll', function() {
    var showAll;
    return showAll = {
      showAll: true
    };
  });

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').factory('PersistenceNews', [
    'Persistence', '$http', function(Persistence, $http) {
      var PersistenceNews;
      PersistenceNews = (function(_super) {

        __extends(PersistenceNews, _super);

        function PersistenceNews($http) {
          PersistenceNews.__super__.constructor.call(this, 'news', $http);
        }

        PersistenceNews.prototype.collapseFolder = function(folderId, value) {
          var data;
          data = {
            folderId: folderId,
            opened: value
          };
          return this.post('collapsefolder', data);
        };

        return PersistenceNews;

      })(Persistence);
      return new PersistenceNews($http);
    }
  ]);

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').factory('FeedType', function() {
    var feedType;
    return feedType = {
      Feed: 0,
      Folder: 1,
      Starred: 2,
      Subscriptions: 3,
      Shared: 4
    };
  });

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').factory('FolderModel', [
    'Model', function(Model) {
      var FolderModel;
      FolderModel = (function(_super) {

        __extends(FolderModel, _super);

        function FolderModel() {
          FolderModel.__super__.constructor.call(this);
          this.add({
            id: 1,
            name: 'folder',
            open: true,
            hasChildren: true
          });
          this.add({
            id: 2,
            name: 'testfolder',
            open: true,
            hasChildren: false
          });
        }

        return FolderModel;

      })(Model);
      return new FolderModel();
    }
  ]);

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').factory('ActiveFeed', function() {
    var activeFeed;
    return activeFeed = {
      id: 0,
      type: 3
    };
  });

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').factory('ItemModel', [
    'Model', function(Model) {
      var ItemModel;
      ItemModel = (function(_super) {

        __extends(ItemModel, _super);

        function ItemModel() {
          ItemModel.__super__.constructor.call(this);
          this.add({
            id: 1,
            title: 'test1',
            isImportant: true,
            isRead: false,
            feed: 1,
            body: '<p>this is a test</p>'
          });
          this.add({
            id: 2,
            title: 'test2',
            isImportant: true,
            isRead: false,
            feed: 1,
            body: '<p>this is a second test</p>'
          });
          this.add({
            id: 3,
            title: 'test3',
            isImportant: true,
            isRead: false,
            feed: 1,
            body: '<p>this is a second test</p>'
          });
          this.add({
            id: 4,
            title: 'test4',
            isImportant: true,
            isRead: false,
            feed: 1,
            body: '<p>this is a second test</p>'
          });
          this.add({
            id: 5,
            title: 'test5',
            isImportant: true,
            isRead: false,
            feed: 1,
            body: '<p>this is a second test</p>'
          });
        }

        return ItemModel;

      })(Model);
      return new ItemModel();
    }
  ]);

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').factory('Persistence', function() {
    var Persistence;
    return Persistence = (function() {

      function Persistence(appName, $http) {
        this.appName = appName;
        this.$http = $http;
      }

      Persistence.prototype.post = function(file, data, callback) {
        var headers, url;
        if (data == null) {
          data = {};
        }
        if (!callback) {
          callback = function() {};
        }
        url = OC.filePath(this.appName, 'ajax', file + '.php');
        headers = {
          requesttoken: OC.Request.Token
        };
        return this.$http({
          method: 'POST',
          url: url,
          data: data,
          headers: headers
        }).success(function(data, status, headers, config) {
          return callback(data);
        }).error(function(data, status, headers, config) {
          console.warn('Error occured: ');
          console.warn(status);
          console.warn(headers);
          return console.warn(config);
        });
      };

      return Persistence;

    })();
  });

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').factory('Model', function() {
    var Model;
    return Model = (function() {

      function Model() {
        this.items = [];
        this.itemIds = {};
      }

      Model.prototype.add = function(item) {
        if (item.id in this.itemIds) {
          return this.update(item);
        } else {
          this.items.push(item);
          return this.itemIds[item.id] = item;
        }
      };

      Model.prototype.update = function(item) {
        var key, updatedItem, value, _results;
        updatedItem = this.items[item.id];
        _results = [];
        for (key in item) {
          value = item[key];
          if (key !== 'id') {
            _results.push(updatedItem[key] = value);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      Model.prototype.removeById = function(id) {
        var counter, item, removeItemIndex, _i, _len, _ref;
        removeItemIndex = null;
        _ref = this.items;
        for (counter = _i = 0, _len = _ref.length; _i < _len; counter = ++_i) {
          item = _ref[counter];
          if (item.id === id) {
            removeItemIndex = counter;
          }
        }
        if (removeItemIndex !== null) {
          this.items.splice(removeItemId, 1);
          return delete this.itemIds[id];
        }
      };

      Model.prototype.getItemById = function(id) {
        return this.itemIds[id];
      };

      Model.prototype.getItems = function() {
        return this.items;
      };

      return Model;

    })();
  });

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').factory('StarredCount', function() {
    var starredCount;
    return starredCount = {
      count: 0
    };
  });

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').factory('Updater', ['$rootScope', '$http', function($rootScope, $http) {}]);

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').factory('Controller', function() {
    var Controller;
    return Controller = (function() {

      function Controller() {}

      return Controller;

    })();
  });

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').controller('ItemController', [
    'Controller', '$scope', 'ItemModel', 'ActiveFeed', function(Controller, $scope, ItemModel, ActiveFeed) {
      var ItemController;
      ItemController = (function(_super) {

        __extends(ItemController, _super);

        function ItemController($scope, itemModel, activeFeed) {
          var _this = this;
          this.$scope = $scope;
          this.itemModel = itemModel;
          this.activeFeed = activeFeed;
          this.batchSize = 4;
          this.loaderQueue = 0;
          this.$scope.items = this.itemModel.getItems();
          this.$scope.loadNext = function() {
            return console.info('scrolled');
          };
        }

        ItemController.prototype.getItemOffset = function() {
          return this.$scope.items.length;
        };

        ItemController.prototype.incrementLoaderQueue = function() {
          console.log(this.loaderQueue);
          return this.loaderQueue += 1;
        };

        ItemController.prototype.loaderQueueIsFull = function() {
          if (this.loaderQueue > this.batchSize) {
            this.loaderQueue = 0;
            return true;
          } else {
            return false;
          }
        };

        ItemController.prototype.pushBatch = function() {
          var i, item, _i, _ref, _results;
          _results = [];
          for (i = _i = 1, _ref = this.batchSize; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
            console.log('filling');
            item = {
              id: i + this.getOffset(),
              title: 'test ' + i,
              isImportant: true,
              isRead: false,
              feed: 1,
              body: '<p>this is a second test</p>'
            };
            _results.push(this.$scope.items.push(item));
          }
          return _results;
        };

        return ItemController;

      })(Controller);
      return new ItemController($scope, ItemModel, ActiveFeed);
    }
  ]);

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').controller('FeedController', [
    'Controller', '$scope', 'FeedModel', 'FeedType', 'FolderModel', 'ActiveFeed', 'PersistenceNews', 'StarredCount', 'ShowAll', function(Controller, $scope, FeedModel, FeedType, FolderModel, ActiveFeed, PersistenceNews, StarredCount, ShowAll) {
      var FeedController;
      FeedController = (function(_super) {

        __extends(FeedController, _super);

        function FeedController($scope, feedModel, folderModel, feedType, activeFeed, persistence, starredCount, showAll) {
          var _this = this;
          this.$scope = $scope;
          this.feedModel = feedModel;
          this.folderModel = folderModel;
          this.feedType = feedType;
          this.activeFeed = activeFeed;
          this.persistence = persistence;
          this.starredCount = starredCount;
          this.showAll = showAll;
          this.showSubscriptions = true;
          this.showStarred = true;
          this.triggerHideRead();
          this.$scope.feeds = this.feedModel.getItems();
          this.$scope.folders = this.folderModel.getItems();
          this.$scope.feedType = this.feedType;
          this.$scope.toggleFolder = function(folderId) {
            var folder;
            folder = _this.folderModel.getItemById(folderId);
            folder.open = !folder.open;
            return _this.persistence.collapseFolder(folder.id, folder.open);
          };
          this.$scope.isFeedActive = function(type, id) {
            if (type === _this.activeFeed.type && id === _this.activeFeed.id) {
              return true;
            } else {
              return false;
            }
          };
          this.$scope.loadFeed = function(type, id) {
            _this.activeFeed.id = id;
            _this.activeFeed.type = type;
            return _this.$scope.triggerHideRead();
          };
          this.$scope.getUnreadCount = function(type, id) {
            return _this.getUnreadCount(type, id);
          };
          this.$scope.triggerHideRead = function() {
            return _this.triggerHideRead();
          };
          this.$scope.isShown = function(type, id) {
            switch (type) {
              case _this.feedType.Subscriptions:
                return _this.showSubscriptions;
              case _this.feedType.Starred:
                return _this.showStarred;
            }
          };
          this.$scope.$on('triggerHideRead', function() {
            return _this.triggerHideRead();
          });
        }

        FeedController.prototype.triggerHideRead = function() {
          var feed, folder, preventParentFolder, _i, _j, _len, _len1, _ref, _ref1;
          preventParentFolder = 0;
          _ref = this.feedModel.getItems();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            feed = _ref[_i];
            if (this.showAll.showAll === false && this.getUnreadCount(this.feedType.Feed, feed.id) === 0) {
              if (this.activeFeed.type === this.feedType.Feed && this.activeFeed.id === feed.id) {
                feed.show = true;
                preventParentFolder = feed.folder;
              } else {
                feed.show = false;
              }
            } else {
              feed.show = true;
            }
          }
          _ref1 = this.folderModel.getItems();
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            folder = _ref1[_j];
            if (this.showAll.showAll === false && this.getUnreadCount(this.feedType.Folder, folder.id) === 0) {
              if ((this.activeFeed.type === this.feedType.Folder && this.activeFeed.id === folder.id) || preventParentFolder === folder.id) {
                folder.show = true;
              } else {
                folder.show = false;
              }
            } else {
              folder.show = true;
            }
          }
          if (this.showAll.showAll === false && this.getUnreadCount(this.feedType.Subscriptions, 0) === 0) {
            if (this.activeFeed.type === this.feedType.Subscriptions) {
              this.showSubscriptions = true;
            } else {
              this.showSubscriptions = false;
            }
          } else {
            this.showSubscriptions = true;
          }
          if (this.showAll.showAll === false && this.getUnreadCount(this.feedType.Starred, 0) === 0) {
            if (this.activeFeed.type === this.feedType.Starred) {
              return this.showStarred = true;
            } else {
              return this.showStarred = false;
            }
          } else {
            return this.showStarred = true;
          }
        };

        FeedController.prototype.getUnreadCount = function(type, id) {
          var counter, feed, _i, _j, _len, _len1, _ref, _ref1;
          switch (type) {
            case this.feedType.Feed:
              return this.feedModel.getItemById(id).unreadCount;
            case this.feedType.Folder:
              counter = 0;
              _ref = this.feedModel.getItems();
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                feed = _ref[_i];
                if (feed.folder === id) {
                  counter += feed.unreadCount;
                }
              }
              return counter;
            case this.feedType.Starred:
              return this.starredCount.count;
            case this.feedType.Subscriptions:
              counter = 0;
              _ref1 = this.feedModel.getItems();
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                feed = _ref1[_j];
                counter += feed.unreadCount;
              }
              return counter;
          }
        };

        return FeedController;

      })(Controller);
      return new FeedController($scope, FeedModel, FolderModel, FeedType, ActiveFeed, PersistenceNews, StarredCount, ShowAll);
    }
  ]);

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').controller('SettingsController', [
    'Controller', '$scope', 'ShowAll', '$rootScope', function(Controller, $scope, ShowAll, $rootScope) {
      var SettingsController;
      SettingsController = (function(_super) {

        __extends(SettingsController, _super);

        function SettingsController($scope, $rootScope, showAll) {
          var _this = this;
          this.$scope = $scope;
          this.$rootScope = $rootScope;
          this.showAll = showAll;
          this.$scope.getShowAll = function() {
            return _this.showAll.showAll;
          };
          this.$scope.setShowAll = function(value) {
            _this.showAll.showAll = value;
            return _this.$rootScope.$broadcast('triggerHideRead');
          };
        }

        return SettingsController;

      })(Controller);
      return new SettingsController($scope, $rootScope, ShowAll);
    }
  ]);

  /*
  # ownCloud - News app
  #
  # @author Bernhard Posselt
  # Copyright (c) 2012 - Bernhard Posselt <nukeawhale@gmail.com>
  #
  # This file is licensed under the Affero General Public License version 3 or later.
  # See the COPYING-README file
  #
  */


  angular.module('News').controller('SettingsController', [
    'Controller', '$scope', 'ShowAll', '$rootScope', function(Controller, $scope, ShowAll, $rootScope) {
      var SettingsController;
      SettingsController = (function(_super) {

        __extends(SettingsController, _super);

        function SettingsController($scope, $rootScope, showAll) {
          var _this = this;
          this.$scope = $scope;
          this.$rootScope = $rootScope;
          this.showAll = showAll;
          this.$scope.getShowAll = function() {
            return _this.showAll.showAll;
          };
          this.$scope.setShowAll = function(value) {
            _this.showAll.showAll = value;
            return _this.$rootScope.$broadcast('triggerHideRead');
          };
        }

        return SettingsController;

      })(Controller);
      return new SettingsController($scope, $rootScope, ShowAll);
    }
  ]);

}).call(this);
