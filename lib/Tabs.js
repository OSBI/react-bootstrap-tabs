'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAutobind = require('react-autobind');

var _reactAutobind2 = _interopRequireDefault(_reactAutobind);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   Copyright 2016 OSBI Ltd
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *       http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Saiku <Tabs /> component. It requires a createContent function, it is
 * responsible for populate the tab content, whenever the '+' button is pressed.
 * @example
 * function myContent() {
 *   return (<h1>Tab Content</h1>);
 * }
 * <Tabs createContent={myContent}/>
 */

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tabs).call(this, props));

    _this.id = _underscore2.default.uniqueId('tabs_');
    _this.tabCounter = 1;
    _this.state = {
      tabs: [],
      selectedTab: null
    };

    (0, _reactAutobind2.default)(_this, 'renderTabButtons', 'renderTabPanels');
    (0, _reactAutobind2.default)(_this, '_newTab', '_deleteTab', '_selectTab');
    return _this;
  }

  /**
   * Method automatically called when React already built and mounted the
   * component on a dom element. In this case, this method will create the
   * tabs' first tab, filled with the createContent function's content.
   */


  _createClass(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._newTab();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'ul',
          { className: 'nav nav-tabs', role: 'tablist', key: this.id },
          this.state.tabs.map(this.renderTabButtons),
          _react2.default.createElement(
            'li',
            { className: 'add-tab', role: 'tab' },
            _react2.default.createElement(
              'a',
              { role: 'tab', href: '#', onClick: this._newTab },
              '+'
            )
          )
        ),
        this.state.tabs.map(this.renderTabPanels)
      );
    }

    /**
     * Helper method called for each tab in order to render its button.
     * @param {Object} tab - an object containing tab data
     * @param {string} tab.key - unique tab identifier
     * @param {string} tab.title - text to be displayed on tab's button
     * @param {Object} tab.component - content returned by createContent function
     * @param {number} index - the index of the tab (the render order)
     */

  }, {
    key: 'renderTabButtons',
    value: function renderTabButtons(tab, index) {
      var _this2 = this;

      return _react2.default.createElement(
        'li',
        {
          className: this._isSelected(tab) ? 'active' : '',
          role: 'tab',
          key: 'tab_button_' + index
        },
        _react2.default.createElement(
          'a',
          {
            role: 'tab',
            href: '#' + tab.key,
            'data-toggle': 'tab',
            'aria-expanded': this._isSelected(tab),
            'aria-controls': tab.key,
            onClick: function onClick(event) {
              return _this2._selectTab(tab, event);
            }
          },
          _react2.default.createElement(
            'button',
            {
              className: 'close closeTab',
              type: 'button',
              onClick: function onClick(event) {
                return _this2._deleteTab(tab, event);
              }
            },
            '×'
          ),
          tab.title
        )
      );
    }

    /**
     * Helper method called for each tab in order to render its content.
     * @param {Object} tab - an object containing tab data
     * @param {string} tab.key - unique tab identifier
     * @param {string} tab.title - text to be displayed on tab's button
     * @param {Object} tab.component - content returned by createContent function
     * @param {number} index - the index of the tab (the render order)
     */

  }, {
    key: 'renderTabPanels',
    value: function renderTabPanels(tab, index) {
      return _react2.default.createElement(
        'div',
        { className: 'tab-content', key: tab.key + '_content' },
        _react2.default.createElement(
          _Tab2.default,
          { tabKey: tab.key, isSelected: this._isSelected(tab) },
          tab.component
        )
      );
    }

    /**
     * Utility method to test if a tab is selected of not.
     * @param {Object} tab - an object containing tab data
     * @param {string} tab.key - unique tab identifier
     * @param {string} tab.title - text to be displayed on tab's button
     * @param {Object} tab.component - content returned by createContent function
     */

  }, {
    key: '_isSelected',
    value: function _isSelected(tab) {
      return tab.key === this.state.selectedTab;
    }

    /**
     * Method called when the '+' button is pressed. It will instantiate a new tab
     * component, passing the result of createContent function as its child. This
     * method also sets an incremental title to the tab ('Unsaved query(x)').
     */

  }, {
    key: '_newTab',
    value: function _newTab(event) {
      if (event) {
        event.preventDefault();
      }

      var tab = {
        key: _underscore2.default.uniqueId('tab_'),
        title: 'Unsaved query (' + this.tabCounter + ')',
        component: this.props.createContent()
      };

      this.state.tabs.push(tab);
      this.tabCounter++;

      this.setState({
        tabs: this.state.tabs
      });

      this._selectTab(tab);
    }

    /**
     * Method called when the user clicks on one tab button. It will set the
     * respective tab as the selected one.
     * @param {Object} tab - an object containing tab data
     * @param {string} tab.key - unique tab identifier
     * @param {string} tab.title - text to be displayed on tab's button
     * @param {Object} tab.component - content returned by createContent function
     */

  }, {
    key: '_selectTab',
    value: function _selectTab(tab, event) {
      if (event) {
        event.preventDefault();
      }

      this.setState({ selectedTab: tab.key });
    }

    /**
     * Method called when the user clicks on a tab's 'x' button. It will remove
     * this tab and, it it was the selected one, choose another tab to be the
     * new active.
     * @param {Object} tab - an object containing tab data
     * @param {string} tab.key - unique tab identifier
     * @param {string} tab.title - text to be displayed on tab's button
     * @param {Object} tab.component - content returned by createContent function
     */

  }, {
    key: '_deleteTab',
    value: function _deleteTab(tab, event) {
      var _this3 = this;

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      var key = tab.key;
      var tabs = this.state.tabs;

      // Remove the tab
      this.state.tabs = _underscore2.default.without(tabs, _underscore2.default.findWhere(tabs, { key: key }));
      this.setState({ tabs: this.state.tabs });

      // If the removed that is the selected, find and select another one
      if (this._isSelected(tab) && this.state.tabs.length > 0) {
        _underscore2.default.defer(function () {
          return _this3._selectTab(_this3.state.tabs[0]);
        });
      }
    }
  }]);

  return Tabs;
}(_react2.default.Component);

Tabs.propTypes = {
  createContent: _react2.default.PropTypes.func.isRequired
};

exports.default = Tabs;
