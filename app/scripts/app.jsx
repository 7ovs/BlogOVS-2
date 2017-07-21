import angular from 'angular';
import axios from 'axios';
import {createStore, combineReducers} from 'redux';
import { createLogger } from 'redux-logger'
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';

var newsReducer = (state = {isFeatching: false, items: []}, action) => {
  switch (action.type) {
    case 'GET_NEWS':
      return {
        isFeatching: true,
        items: []
      };
    case 'GET_NEWS_COMPLETE':
      return {
        isFeatching: false,
        items: action.items
      };
    default:
      return state;
  };
};

class NewsController {
  constructor($scope) {
    console.log($scope, this);
  }
}

function news() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      items: '='
    },
    controllerAs: 'pc',
    controller: NewsController,
    template: require('./news.html'),
  };
}

class AppController {

  constructor($ngRedux, $scope, AsyncActions) {
    const unsubscribe = $ngRedux.connect(this.mapStateToThis, AsyncActions)(this);
    $scope.$on('$destroy', unsubscribe);
    this.fetchNews();
    console.log("AppController", $scope, this);
  }

  mapStateToThis(state) {
    return state.news;
  }
}

export default function app() {
  return {
    restrict: 'E',
    controllerAs: 'app',
    controller: AppController,
    template: require('./app.html'),
    scope: {}
  };
}

function asyncService($http) {

  var getNews = () => {
    return {
      type: 'GET_NEWS'
    };
  };

  var getNewsComplete = (items) => {
    return {
      type: 'GET_NEWS_COMPLETE',
      items
    };
  };

  var fetchNews = () => {
    return dispatch => {
      dispatch(getNews());
      axios.get('/api/news').then((res) => {
        console.log(res)
        let items = res.data;
        dispatch(getNewsComplete(items));
      });
    }
  };

  return {
    getNews,
    getNewsComplete,
    fetchNews
  };
}

angular
  .module('app', [ngRedux])
  .config(($ngReduxProvider) => {
    let reducer = combineReducers({news: newsReducer});
    const logger = createLogger();
    $ngReduxProvider.createStoreWith(reducer, [thunk, logger]);
  })
  .service('AsyncActions', asyncService)
  .directive('news', news)
  .directive('app', app);

//angular.module('tabsDemoDynamicHeight', ['ngMaterial']);

  


