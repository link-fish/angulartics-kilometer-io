(function(angular) {
  'use strict';

  angular.module('angulartics.kilometer-io', ['angulartics'])
    .config(['$analyticsProvider', '$windowProvider', function ($analyticsProvider, $windowProvider) {

      var $window = $windowProvider.$get();

      if (!$window.Kilometer) {
        return;
      }

      var Kilometer = $window.Kilometer;

      $analyticsProvider.settings.pageTracking.trackRelativePath = true;

      $analyticsProvider.registerSetUsername(function (userId) {
        Kilometer.identify(userId);
      });

      $analyticsProvider.registerSetUserProperties(function (properties) {
        if(properties) {
          Kilometer.setUserProperties(properties);
        }
      });

      $analyticsProvider.registerPageTrack(function(path, locationObj) {
        Kilometer.transmitEvent("visit_app", {title: $window.document.title, url: path});
      });

      $analyticsProvider.registerEventTrack(function (action, properties) {
        Kilometer.transmitEvent(action, properties);
      });

    }]);

})(angular);
