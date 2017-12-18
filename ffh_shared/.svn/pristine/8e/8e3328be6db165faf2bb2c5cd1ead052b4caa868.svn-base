/*
    *
    * Wijmo Library 5.20173.380
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
///<wijmo-replace />
///<wijmo-replace-with />
//import * as ReactDOM from 'react-dom';
//import * as  React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * Base class for all Wijmo components for React.
         */
        var ComponentBase = /** @class */ (function (_super) {
            __extends(ComponentBase, _super);
            function ComponentBase(props, controlType, meta) {
                var _this = _super.call(this, props) || this;
                //private _meta: _IReactComponentMeta;
                _this._objPropHash = {};
                _this.props = props;
                _this.controlType = controlType;
                for (var _i = 0, _a = (meta && meta.objectProps || []); _i < _a.length; _i++) {
                    var objProp = _a[_i];
                    _this._objPropHash[objProp] = true;
                }
                return _this;
            }
            ComponentBase.prototype.render = function () {
                return React.createElement('div');
            };
            //mounts a new control onto a component
            ComponentBase.prototype.componentDidMount = function () {
                // instantiate the control
                var host = ReactDOM.findDOMNode(this), control = new this.controlType(host), cprops = this.props;
                // initialize the control with properties and event handlers,
                // and the host element with the regular HTML properties
                var props = {};
                for (var prop in cprops) {
                    if (prop in control) {
                        // save property to assign to control later
                        props[prop] = cprops[prop];
                    }
                    else {
                        // assign property to host element
                        switch (prop) {
                            case 'className':
                                wijmo.addClass(host, cprops.className);
                                break;
                            case 'style':
                                wijmo.setCss(host, cprops.style);
                                break;
                            default:// id, title, name, etc...
                                if (host[prop] != null) {
                                    host[prop] = cprops[prop];
                                }
                                break;
                        }
                    }
                }
                // apply saved props to control
                control.initialize(props);
                // fire initialize event
                if (wijmo.isFunction(cprops.initialized)) {
                    cprops.initialized(control);
                }
                // done creating the control
                return control;
            };
            // disposes of the control associated with a component
            ComponentBase.prototype.componentWillUnmount = function () {
                this._getControl(this).dispose();
            };
            // updates the control properties to match its associated component
            ComponentBase.prototype.shouldComponentUpdate = function (nextProps) {
                var ctl = this._getControl(this);
                this._copy(ctl, nextProps);
                return true;
            };
            ComponentBase.prototype._getControl = function (component) {
                var host = ReactDOM.findDOMNode(component);
                return wijmo.Control.getControl(host);
            };
            ComponentBase.prototype._copy = function (dst, src) {
                if (!(dst && src)) {
                    return;
                }
                var ctrl;
                for (var p in src) {
                    var value = src[p], isValid = p in dst || p == 'className' || p == 'style'; // TFS 277044
                    if (isValid && !this._isEvent(dst, p) && !this._sameValue(dst[p], value)) {
                        if (value == null) {
                            dst[p] = value;
                        }
                        else if (p == 'className') {
                            if (dst.hostElement) {
                                wijmo.addClass(dst.hostElement, src[p]);
                            }
                        }
                        else if (p == 'style') {
                            if (dst.hostElement) {
                                wijmo.setCss(dst.hostElement, src[p]);
                            }
                        }
                        else if (wijmo.isPrimitive(value) || // copy properties declared as PropertyType.Any in metadata
                            this._objPropHash[p] && dst === (ctrl || (ctrl = this._getControl(this)))) {
                            dst[p] = value;
                        }
                        else if (wijmo.isArray(value) && wijmo.isArray(dst[p])) {
                            var dstArr = dst[p], srcArr = value;
                            if (srcArr.length == dstArr.length) {
                                for (var i = 0; i < srcArr.length; i++) {
                                    this._copy(dstArr[i], srcArr[i]);
                                }
                            }
                        }
                        else if (wijmo.isObject(value)) {
                            this._copy(dst[p], src[p]);
                        }
                    }
                }
            };
            // compares two objects by value
            ComponentBase.prototype._sameValue = function (v1, v2) {
                return v1 == v2 || wijmo.DateTime.equals(v1, v2);
            };
            ComponentBase.prototype._isEvent = function (ctrl, propName) {
                var propVal = ctrl && ctrl[propName];
                return propVal != null && propVal instanceof wijmo.Event;
            };
            return ComponentBase;
        }(React.Component));
        react.ComponentBase = ComponentBase;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {}));

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.input.ComboBox control.
         */
        var ComboBox = /** @class */ (function (_super) {
            __extends(ComboBox, _super);
            function ComboBox(props) {
                return _super.call(this, props, wijmo.input.ComboBox, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue'] }) || this;
            }
            return ComboBox;
        }(react.ComponentBase));
        react.ComboBox = ComboBox;
        /**
         * React component that encapsulates the @see:wijmo.input.AutoComplete control.
         */
        var AutoComplete = /** @class */ (function (_super) {
            __extends(AutoComplete, _super);
            function AutoComplete(props) {
                return _super.call(this, props, wijmo.input.AutoComplete, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue'] }) || this;
            }
            return AutoComplete;
        }(react.ComponentBase));
        react.AutoComplete = AutoComplete;
        /**
         * React component that encapsulates the @see:wijmo.input.Calendar control.
         */
        var Calendar = /** @class */ (function (_super) {
            __extends(Calendar, _super);
            function Calendar(props) {
                return _super.call(this, props, wijmo.input.Calendar) || this;
            }
            return Calendar;
        }(react.ComponentBase));
        react.Calendar = Calendar;
        /**
         * React component that encapsulates the @see:wijmo.input.ColorPicker control.
         */
        var ColorPicker = /** @class */ (function (_super) {
            __extends(ColorPicker, _super);
            function ColorPicker(props) {
                return _super.call(this, props, wijmo.input.ColorPicker, { objectProps: ['palette'] }) || this;
            }
            return ColorPicker;
        }(react.ComponentBase));
        react.ColorPicker = ColorPicker;
        /**
         * React component that encapsulates the @see:wijmo.input.InputMask control.
         */
        var InputMask = /** @class */ (function (_super) {
            __extends(InputMask, _super);
            function InputMask(props) {
                return _super.call(this, props, wijmo.input.InputMask) || this;
            }
            return InputMask;
        }(react.ComponentBase));
        react.InputMask = InputMask;
        /**
         * React component that encapsulates the @see:wijmo.input.InputColor control.
         */
        var InputColor = /** @class */ (function (_super) {
            __extends(InputColor, _super);
            function InputColor(props) {
                return _super.call(this, props, wijmo.input.InputColor) || this;
            }
            return InputColor;
        }(react.ComponentBase));
        react.InputColor = InputColor;
        /**
         * React component that encapsulates the @see:wijmo.input.MultiSelect control.
         */
        var MultiSelect = /** @class */ (function (_super) {
            __extends(MultiSelect, _super);
            function MultiSelect(props) {
                return _super.call(this, props, wijmo.input.MultiSelect, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue', 'checkedItems'] }) || this;
            }
            return MultiSelect;
        }(react.ComponentBase));
        react.MultiSelect = MultiSelect;
        /**
         * React component that encapsulates the @see:wijmo.input.MultiAutoComplete control.
         */
        var MultiAutoComplete = /** @class */ (function (_super) {
            __extends(MultiAutoComplete, _super);
            function MultiAutoComplete(props) {
                return _super.call(this, props, wijmo.input.MultiAutoComplete, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue', 'selectedItems'] }) || this;
            }
            return MultiAutoComplete;
        }(react.ComponentBase));
        react.MultiAutoComplete = MultiAutoComplete;
        /**
         * React component that encapsulates the @see:wijmo.input.InputNumber control.
         */
        var InputNumber = /** @class */ (function (_super) {
            __extends(InputNumber, _super);
            function InputNumber(props) {
                return _super.call(this, props, wijmo.input.InputNumber) || this;
            }
            return InputNumber;
        }(react.ComponentBase));
        react.InputNumber = InputNumber;
        /**
         * React component that encapsulates the @see:wijmo.input.InputDate control.
         */
        var InputDate = /** @class */ (function (_super) {
            __extends(InputDate, _super);
            function InputDate(props) {
                return _super.call(this, props, wijmo.input.InputDate) || this;
            }
            return InputDate;
        }(react.ComponentBase));
        react.InputDate = InputDate;
        /**
         * React component that encapsulates the @see:wijmo.input.InputTime control.
         */
        var InputTime = /** @class */ (function (_super) {
            __extends(InputTime, _super);
            function InputTime(props) {
                return _super.call(this, props, wijmo.input.InputTime, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue'] }) || this;
            }
            return InputTime;
        }(react.ComponentBase));
        react.InputTime = InputTime;
        /**
         * React component that encapsulates the @see:wijmo.input.InputDateTime control.
         */
        var InputDateTime = /** @class */ (function (_super) {
            __extends(InputDateTime, _super);
            function InputDateTime(props) {
                return _super.call(this, props, wijmo.input.InputDateTime) || this;
            }
            return InputDateTime;
        }(react.ComponentBase));
        react.InputDateTime = InputDateTime;
        /**
         * React component that encapsulates the @see:wijmo.input.ListBox control.
         */
        var ListBox = /** @class */ (function (_super) {
            __extends(ListBox, _super);
            function ListBox(props) {
                return _super.call(this, props, wijmo.input.ListBox, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue', 'checkedItems'] }) || this;
            }
            return ListBox;
        }(react.ComponentBase));
        react.ListBox = ListBox;
        /**
         * React component that encapsulates the @see:wijmo.input.Menu control.
         */
        var Menu = /** @class */ (function (_super) {
            __extends(Menu, _super);
            function Menu(props) {
                return _super.call(this, props, wijmo.input.Menu, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue', 'value'] }) || this;
            }
            return Menu;
        }(react.ComponentBase));
        react.Menu = Menu;
        /**
         * React component that encapsulates the @see:wijmo.input.Popup control.
         */
        var Popup = /** @class */ (function (_super) {
            __extends(Popup, _super);
            function Popup(props) {
                return _super.call(this, props, wijmo.input.Popup) || this;
            }
            Popup.prototype.render = function () {
                return React.createElement('div', null, this.props.children);
            };
            return Popup;
        }(react.ComponentBase));
        react.Popup = Popup;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<wijmo-soft-import from="wijmo.input"/>
///<wijmo-soft-import from="wijmo.grid.detail"/>
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.grid.FlexGrid control.
         * The example below shows how to instantiate and initialize a
         * @see:wijmo.grid.FlexGrid control in JSX:
         *
         * <pre>&lt;Wj.FlexGrid
         *   autoGenerateColumns={ false }
         *   columns={[
         *     { binding: 'name', header: 'Name' },
         *     { binding: 'sales', header: 'Sales', format: 'c0' },
         *     { binding: 'expenses', header: 'Expenses', format: 'c0' },
         *     { binding: 'active', header: 'Active' },
         *     { binding: 'date', header: 'Date' }
         *   ]}
         *   itemsSource={ this.state.data } /&gt;</pre>
         *
         * The code sets the <b>autoGenerateColumns</b> property to false, then
         * sets the <b>columns</b> property, and finally sets the <b>itemsSource</b>
         * property. This order is important, it prevents the grid from automatically
         * generating the columns.
         */
        var FlexGrid = /** @class */ (function (_super) {
            __extends(FlexGrid, _super);
            function FlexGrid(props) {
                return _super.call(this, props, wijmo.grid.FlexGrid, { objectProps: ['childItemsPath', 'mergeManager', 'itemsSource'] }) || this;
            }
            return FlexGrid;
        }(react.ComponentBase));
        react.FlexGrid = FlexGrid;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.grid.grouppanel.GroupPanel control.
         */
        var GroupPanel = /** @class */ (function (_super) {
            __extends(GroupPanel, _super);
            function GroupPanel(props) {
                return _super.call(this, props, wijmo.grid.grouppanel.GroupPanel, { objectProps: ['grid'] }) || this;
            }
            return GroupPanel;
        }(react.ComponentBase));
        react.GroupPanel = GroupPanel;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<wijmo-soft-import from="wijmo.chart.finance"/>
///<wijmo-soft-import from="wijmo.chart.analytics"/>
///<wijmo-soft-import from="wijmo.chart.animation"/>
///<wijmo-soft-import from="wijmo.chart.annotation"/>
///<wijmo-soft-import from="wijmo.chart.finance.analytics"/>
///<wijmo-soft-import from="wijmo.chart.hierarchical"/>
///<wijmo-soft-import from="wijmo.chart.interaction"/>
///<wijmo-soft-import from="wijmo.chart.radar"/>
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.chart.FlexChart control.
         *
         * The example below shows how to instantiate and initialize a
         * @see:wijmo.chart.FlexChart control in JSX:
         *
         * <pre>&lt;Wj.FlexChart
         *   itemsSource={ this.state.data }
         *   bindingX="name"
         *   header={ this.state.header }
         *   footer={ this.state.footer }
         *   axisX={&#8203;{ title: this.state.titleX }}
         *   axisY={&#8203;{ title: this.state.titleY }}
         *   legend={&#8203;{ position: this.state.legendPosition }}
         *   series={[
         *       { name: 'Sales', binding: 'sales' },
         *       { name: 'Expenses', binding: 'expenses' },
         *       { name: 'Downloads', binding: 'downloads', chartType: 'LineSymbols' }
         *   ]} /&gt;</pre>
         *
    
         * The code sets the <b>itemsSource</b> property to a collection that contains
         * the data to chart and the <b>bindingX</b> property to specify the name of the
         * data property to use for the chart's X values.
         *
         * It sets the <b>header</b> and <b>footer</b> properties to specify the
         * chart titles, and customizes the chart's axes and legend.
         *
         * Finally, it sets the <b>series</b> property to an array that specifies the
         * data items that the chart should display.
         */
        var FlexChart = /** @class */ (function (_super) {
            __extends(FlexChart, _super);
            function FlexChart(props) {
                return _super.call(this, props, wijmo.chart.FlexChart, { objectProps: ['palette', 'plotMargin', 'footerStyle', 'headerStyle', 'itemsSource', 'options', 'selection'] }) || this;
            }
            return FlexChart;
        }(react.ComponentBase));
        react.FlexChart = FlexChart;
        /**
         * React component that encapsulates the @see:wijmo.chart.FlexPie control.
         */
        var FlexPie = /** @class */ (function (_super) {
            __extends(FlexPie, _super);
            function FlexPie(props) {
                return _super.call(this, props, wijmo.chart.FlexPie, { objectProps: ['palette', 'plotMargin', 'footerStyle', 'headerStyle', 'itemsSource'] }) || this;
            }
            return FlexPie;
        }(react.ComponentBase));
        react.FlexPie = FlexPie;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.gauge.LinearGauge control.
         *
         * The example below shows how to instantiate and initialize a
         * @see:wijmo.gauge.LinearGauge control in JSX:
         *
         * <pre>&lt;Wj.LinearGauge
         *   min={ 0 } max={ 1000 } step={ 50 } isReadOnly={ false }
         *   value={ this.state.view.currentItem.sales }
         *   valueChanged={ this.salesChanged }
         *   format="c0" thumbSize={ 20 } showRanges={ false }
         *   face={&#8203;{ thickness:0.5 }}
         *   pointer={&#8203;{ thickness:0.5 }}
         *   ranges={[
         *       { min: 0, max: 333, color: 'red' },
         *       { min: 333, max: 666, color: 'gold' },
         *       { min: 666, max: 1000, color: 'green' }
         *   ]} /&gt;</pre>
         *
         * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
         * to define the range of the gauge and to allow users to edit its value.
         * Next, it sets the <b>value</b> and <b>valueChanged</b> properties to create
         * a two-way binding for the gauge's value.
         *
         * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
         * properties to define the appearance of the gauge. Finally, the markup sets
         * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
         * that will control the color of the <b>value</b> range depending on the gauge's
         * current value.
         */
        var LinearGauge = /** @class */ (function (_super) {
            __extends(LinearGauge, _super);
            function LinearGauge(props) {
                return _super.call(this, props, wijmo.gauge.LinearGauge) || this;
            }
            return LinearGauge;
        }(react.ComponentBase));
        react.LinearGauge = LinearGauge;
        /**
         * React component that encapsulates the @see:wijmo.gauge.BulletGraph control.
         *
         * The example below shows how to instantiate and initialize a
         * @see:wijmo.gauge.BulletGraph control in JSX:
         *
         * <pre>&lt;Wj.BulletGraph
         *   min={ 0 } max={ 1000 } step={ 50 } isReadOnly={ false }
         *   value={ this.state.view.currentItem.sales }
         *   valueChanged={ this.salesChanged }
         *   format="c0" thumbSize={ 20 } showRanges={ false }
         *   face={&#8203;{ thickness:0.5 }}
         *   pointer={&#8203;{ thickness:0.5 }}
         *   ranges={[
         *       { min: 0, max: 333, color: 'red' },
         *       { min: 333, max: 666, color: 'gold' },
         *       { min: 666, max: 1000, color: 'green' }
         *   ]} /&gt;</pre>
         *
         * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
         * to define the range of the gauge and to allow users to edit its value.
         * Next, it sets the <b>value</b> and <b>valueChanged</b> properties to create
         * a two-way binding for the gauge's value.
         *
         * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
         * properties to define the appearance of the gauge. Finally, the markup sets
         * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
         * that will control the color of the <b>value</b> range depending on the gauge's
         * current value.
         */
        var BulletGraph = /** @class */ (function (_super) {
            __extends(BulletGraph, _super);
            function BulletGraph(props) {
                return _super.call(this, props, wijmo.gauge.BulletGraph) || this;
            }
            return BulletGraph;
        }(react.ComponentBase));
        react.BulletGraph = BulletGraph;
        /**
         * React component that encapsulates the @see:wijmo.gauge.RadialGauge control.
         *
         * The example below shows how to instantiate and initialize a
         * @see:wijmo.gauge.RadialGauge control in JSX:
         *
         * <pre>&lt;Wj.RadialGauge
         *   min={ 0 } max={ 1000 } step={ 50 } isReadOnly={ false }
         *   value={ this.state.view.currentItem.sales }
         *   valueChanged={ this.salesChanged }
         *   format="c0" thumbSize={ 20 } showRanges={ false }
         *   face={&#8203;{ thickness:0.5 }}
         *   pointer={&#8203;{ thickness:0.5 }}
         *   ranges={[
         *       { min: 0, max: 333, color: 'red' },
         *       { min: 333, max: 666, color: 'gold' },
         *       { min: 666, max: 1000, color: 'green' }
         *   ]} /&gt;</pre>
         *
         * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
         * to define the range of the gauge and to allow users to edit its value.
         * Next, it sets the <b>value</b> and <b>valueChanged</b> properties to create
         * a two-way binding for the gauge's value.
         *
         * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
         * properties to define the appearance of the gauge. Finally, the markup sets
         * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
         * that will control the color of the <b>value</b> range depending on the gauge's
         * current value.
         */
        var RadialGauge = /** @class */ (function (_super) {
            __extends(RadialGauge, _super);
            function RadialGauge(props) {
                return _super.call(this, props, wijmo.gauge.RadialGauge) || this;
            }
            return RadialGauge;
        }(react.ComponentBase));
        react.RadialGauge = RadialGauge;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.olap.PivotGrid control.
         */
        var PivotGrid = /** @class */ (function (_super) {
            __extends(PivotGrid, _super);
            function PivotGrid(props) {
                return _super.call(this, props, wijmo.olap.PivotGrid, { objectProps: ['childItemsPath', 'mergeManager', 'itemsSource'] }) || this;
            }
            return PivotGrid;
        }(react.ComponentBase));
        react.PivotGrid = PivotGrid;
        /**
         * React component that encapsulates the @see:wijmo.olap.PivotChart control.
         */
        var PivotChart = /** @class */ (function (_super) {
            __extends(PivotChart, _super);
            function PivotChart(props) {
                return _super.call(this, props, wijmo.olap.PivotChart, { objectProps: ['itemsSource'] }) || this;
            }
            return PivotChart;
        }(react.ComponentBase));
        react.PivotChart = PivotChart;
        /**
         * React component that encapsulates the @see:wijmo.olap.PivotPanel control.
         */
        var PivotPanel = /** @class */ (function (_super) {
            __extends(PivotPanel, _super);
            function PivotPanel(props) {
                return _super.call(this, props, wijmo.olap.PivotPanel, { objectProps: ['engine', 'itemsSource'] }) || this;
            }
            return PivotPanel;
        }(react.ComponentBase));
        react.PivotPanel = PivotPanel;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.nav.TreeView control.
         */
        var TreeView = /** @class */ (function (_super) {
            __extends(TreeView, _super);
            function TreeView(props) {
                return _super.call(this, props, wijmo.nav.TreeView, { objectProps: ['childItemsPath', 'displayMemberPath', 'imageMemberPath', 'itemsSource', 'selectedItem', 'selectedNode', 'checkedItems'] }) || this;
            }
            return TreeView;
        }(react.ComponentBase));
        react.TreeView = TreeView;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.grid.multirow.MultiRow control.
         */
        var MultiRow = /** @class */ (function (_super) {
            __extends(MultiRow, _super);
            function MultiRow(props) {
                return _super.call(this, props, wijmo.grid.multirow.MultiRow, { objectProps: ['childItemsPath', 'mergeManager', 'itemsSource', 'layoutDefinition'] }) || this;
            }
            return MultiRow;
        }(react.ComponentBase));
        react.MultiRow = MultiRow;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.viewer.ReportViewer control.
         */
        var ReportViewer = /** @class */ (function (_super) {
            __extends(ReportViewer, _super);
            function ReportViewer(props) {
                return _super.call(this, props, wijmo.viewer.ReportViewer) || this;
            }
            return ReportViewer;
        }(react.ComponentBase));
        react.ReportViewer = ReportViewer;
        /**
         * React component that encapsulates the @see:wijmo.viewer.PdfViewer control.
         */
        var PdfViewer = /** @class */ (function (_super) {
            __extends(PdfViewer, _super);
            function PdfViewer(props) {
                return _super.call(this, props, wijmo.viewer.PdfViewer) || this;
            }
            return PdfViewer;
        }(react.ComponentBase));
        react.PdfViewer = PdfViewer;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.grid.sheet.FlexSheet control.
         */
        var FlexSheet = /** @class */ (function (_super) {
            __extends(FlexSheet, _super);
            function FlexSheet(props) {
                return _super.call(this, props, wijmo.grid.sheet.FlexSheet, { objectProps: ['childItemsPath', 'mergeManager', 'itemsSource'] }) || this;
            }
            return FlexSheet;
        }(react.ComponentBase));
        react.FlexSheet = FlexSheet;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.chart.finance.FinancialChart control.
         */
        var FinancialChart = /** @class */ (function (_super) {
            __extends(FinancialChart, _super);
            function FinancialChart(props) {
                return _super.call(this, props, wijmo.chart.finance.FinancialChart, { objectProps: ['palette', 'plotMargin', 'footerStyle', 'headerStyle', 'itemsSource', 'options', 'selection'] }) || this;
            }
            return FinancialChart;
        }(react.ComponentBase));
        react.FinancialChart = FinancialChart;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.chart.hierarchical.Sunburst control.
         */
        var Sunburst = /** @class */ (function (_super) {
            __extends(Sunburst, _super);
            function Sunburst(props) {
                return _super.call(this, props, wijmo.chart.hierarchical.Sunburst, { objectProps: ['palette', 'plotMargin', 'footerStyle', 'headerStyle', 'itemsSource', 'bindingName', 'childItemsPath'] }) || this;
            }
            return Sunburst;
        }(react.ComponentBase));
        react.Sunburst = Sunburst;
        /**
         * React component that encapsulates the @see:wijmo.chart.hierarchical.TreeMap control.
         */
        var TreeMap = /** @class */ (function (_super) {
            __extends(TreeMap, _super);
            function TreeMap(props) {
                return _super.call(this, props, wijmo.chart.hierarchical.TreeMap, { objectProps: ['palette', 'plotMargin', 'footerStyle', 'headerStyle', 'itemsSource', 'bindingName', 'childItemsPath'] }) || this;
            }
            return TreeMap;
        }(react.ComponentBase));
        react.TreeMap = TreeMap;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Wijmo interop module for <a href="https://facebook.github.io/react/">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an @see:InputNumber control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
var wijmo;
(function (wijmo) {
    var react;
    (function (react) {
        /**
         * React component that encapsulates the @see:wijmo.chart.radar.FlexRadar control.
         */
        var FlexRadar = /** @class */ (function (_super) {
            __extends(FlexRadar, _super);
            function FlexRadar(props) {
                return _super.call(this, props, wijmo.chart.radar.FlexRadar, { objectProps: ['palette', 'plotMargin', 'footerStyle', 'headerStyle', 'itemsSource', 'options', 'selection'] }) || this;
            }
            return FlexRadar;
        }(react.ComponentBase));
        react.FlexRadar = FlexRadar;
    })(react = wijmo.react || (wijmo.react = {}));
})(wijmo || (wijmo = {})); // make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;

