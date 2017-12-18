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


module wijmo.react {

    /**
     * Base class for all Wijmo components for React.
     */
    export class ComponentBase extends React.Component<any, any> {
        //private _meta: _IReactComponentMeta;
        private _objPropHash: { [propName: string]: boolean } = {};
        controlType: any;
        props: any;
        constructor(props: any, controlType: any, meta?: any) {
            super(props);
            this.props = props;
            this.controlType = controlType;

            for (let objProp of (meta && (<_IReactComponentMeta>meta).objectProps || [])) {
                this._objPropHash[objProp] = true;
            }
        }

        render() {
            return React.createElement('div');
        }

        //mounts a new control onto a component
        componentDidMount() {
            // instantiate the control
            var host = <HTMLElement>ReactDOM.findDOMNode(this),
                control = new this.controlType(host),
                cprops = this.props;

            // initialize the control with properties and event handlers,
            // and the host element with the regular HTML properties
            var props = {};
            for (var prop in cprops) {
                if (prop in control) {

                    // save property to assign to control later
                    props[prop] = cprops[prop];

                } else {

                    // assign property to host element
                    switch (prop) {
                        case 'className':
                            wijmo.addClass(host, cprops.className);
                            break;
                        case 'style':
                            wijmo.setCss(host, cprops.style);
                            break;
                        default: // id, title, name, etc...
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

        }

        // disposes of the control associated with a component
        componentWillUnmount() {
            this._getControl(this).dispose();
        }

        // updates the control properties to match its associated component
        shouldComponentUpdate(nextProps) {
            var ctl = this._getControl(this);
            this._copy(ctl, nextProps);
            return true;
        }

        private _getControl(component): any {
            var host = ReactDOM.findDOMNode(component);
            return wijmo.Control.getControl(host);
        }

        private _copy(dst, src) {
            if (!(dst && src)) {
                return;
            }
            let ctrl;
            for (var p in src) {
                var value = src[p],
                    isValid = p in dst || p == 'className' || p == 'style'; // TFS 277044

                if (isValid && !this._isEvent(dst, p) && !this._sameValue(dst[p], value)) {
                    if (value == null) { // copy null/undefined
                        dst[p] = value;
                    } else if (p == 'className') { // copy className
                        if (dst.hostElement) {
                            wijmo.addClass(dst.hostElement, src[p]);
                        }
                    } else if (p == 'style') { // copy style
                        if (dst.hostElement) {
                            wijmo.setCss(dst.hostElement, src[p]);
                        }
                    } else if (wijmo.isPrimitive(value) || // copy properties declared as PropertyType.Any in metadata
                        this._objPropHash[p] && dst === (ctrl || (ctrl = this._getControl(this)))) {
                        dst[p] = value;
                    } else if (wijmo.isArray(value) && wijmo.isArray(dst[p])) { // copy arrays (of equal size)
                        let dstArr = dst[p],
                            srcArr = value;
                        if (srcArr.length == dstArr.length) {
                            for (var i = 0; i < srcArr.length; i++) {
                                this._copy(dstArr[i], srcArr[i]);
                            }
                        }
                    } else if (wijmo.isObject(value)) { // copy object content
                        this._copy(dst[p], src[p]);
                    }
                }
            }
        }

        // compares two objects by value
        private _sameValue(v1, v2): boolean {
            return v1 == v2 || wijmo.DateTime.equals(v1, v2);
        }

        private _isEvent(ctrl: any, propName: string): boolean {
            let propVal = ctrl && ctrl[propName];
            return propVal != null && propVal instanceof Event;
        }

    }

    interface _IReactComponentMeta {
        // Names of properties declared in metadata with PropertyType.Any.
        objectProps: string[]
    }

}
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />


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
module wijmo.react {	
    /**
     * React component that encapsulates the @see:wijmo.input.ComboBox control. 
     */
    export class ComboBox extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.ComboBox, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue']});
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.AutoComplete control. 
     */
    export class AutoComplete extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.AutoComplete, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue']});
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.Calendar control. 
     */
    export class Calendar extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.Calendar);
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.ColorPicker control. 
     */
    export class ColorPicker extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.ColorPicker, { objectProps: ['palette']});
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.InputMask control. 
     */
    export class InputMask extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.InputMask);
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.InputColor control. 
     */
    export class InputColor extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.InputColor);
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.MultiSelect control. 
     */
    export class MultiSelect extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.MultiSelect, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue', 'checkedItems']});
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.MultiAutoComplete control. 
     */
    export class MultiAutoComplete extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.MultiAutoComplete, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue', 'selectedItems']});
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.InputNumber control. 
     */
    export class InputNumber extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.InputNumber);
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.InputDate control. 
     */
    export class InputDate extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.InputDate);
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.InputTime control. 
     */
    export class InputTime extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.InputTime, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue']});
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.InputDateTime control. 
     */
    export class InputDateTime extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.InputDateTime);
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.ListBox control. 
     */
    export class ListBox extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.ListBox, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue', 'checkedItems']});
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.Menu control. 
     */
    export class Menu extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.Menu, { objectProps: ['itemsSource', 'selectedItem', 'selectedValue', 'value']});
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.input.Popup control. 
     */
    export class Popup extends ComponentBase {
        constructor(props) {
            super(props, wijmo.input.Popup);
        }
        render() {
            return React.createElement('div', null, this.props.children); 
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />

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
module wijmo.react {	
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
    export class FlexGrid extends ComponentBase {
        constructor(props) {
            super(props, wijmo.grid.FlexGrid, { objectProps: ['childItemsPath', 'mergeManager', 'itemsSource']});
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />


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
module wijmo.react {	
    /**
     * React component that encapsulates the @see:wijmo.grid.grouppanel.GroupPanel control. 
     */
    export class GroupPanel extends ComponentBase {
        constructor(props) {
            super(props, wijmo.grid.grouppanel.GroupPanel, { objectProps: ['grid']});
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />

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
module wijmo.react {	
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
    export class FlexChart extends ComponentBase {
        constructor(props) {
            super(props, wijmo.chart.FlexChart, { objectProps: ['palette', 'plotMargin', 'footerStyle', 'headerStyle', 'itemsSource', 'options', 'selection']});
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.chart.FlexPie control. 
     */
    export class FlexPie extends ComponentBase {
        constructor(props) {
            super(props, wijmo.chart.FlexPie, { objectProps: ['palette', 'plotMargin', 'footerStyle', 'headerStyle', 'itemsSource']});
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />


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
module wijmo.react {	
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
    export class LinearGauge extends ComponentBase {
        constructor(props) {
            super(props, wijmo.gauge.LinearGauge);
        } 
    }
 
 	
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
    export class BulletGraph extends ComponentBase {
        constructor(props) {
            super(props, wijmo.gauge.BulletGraph);
        } 
    }
 
 	
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
    export class RadialGauge extends ComponentBase {
        constructor(props) {
            super(props, wijmo.gauge.RadialGauge);
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />


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
module wijmo.react {	
    /**
     * React component that encapsulates the @see:wijmo.olap.PivotGrid control. 
     */
    export class PivotGrid extends ComponentBase {
        constructor(props) {
            super(props, wijmo.olap.PivotGrid, { objectProps: ['childItemsPath', 'mergeManager', 'itemsSource']});
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.olap.PivotChart control. 
     */
    export class PivotChart extends ComponentBase {
        constructor(props) {
            super(props, wijmo.olap.PivotChart, { objectProps: ['itemsSource']});
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.olap.PivotPanel control. 
     */
    export class PivotPanel extends ComponentBase {
        constructor(props) {
            super(props, wijmo.olap.PivotPanel, { objectProps: ['engine', 'itemsSource']});
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />


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
module wijmo.react {	
    /**
     * React component that encapsulates the @see:wijmo.nav.TreeView control. 
     */
    export class TreeView extends ComponentBase {
        constructor(props) {
            super(props, wijmo.nav.TreeView, { objectProps: ['childItemsPath', 'displayMemberPath', 'imageMemberPath', 'itemsSource', 'selectedItem', 'selectedNode', 'checkedItems']});
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />


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
module wijmo.react {	
    /**
     * React component that encapsulates the @see:wijmo.grid.multirow.MultiRow control. 
     */
    export class MultiRow extends ComponentBase {
        constructor(props) {
            super(props, wijmo.grid.multirow.MultiRow, { objectProps: ['childItemsPath', 'mergeManager', 'itemsSource', 'layoutDefinition']});
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />


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
module wijmo.react {	
    /**
     * React component that encapsulates the @see:wijmo.viewer.ReportViewer control. 
     */
    export class ReportViewer extends ComponentBase {
        constructor(props) {
            super(props, wijmo.viewer.ReportViewer);
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.viewer.PdfViewer control. 
     */
    export class PdfViewer extends ComponentBase {
        constructor(props) {
            super(props, wijmo.viewer.PdfViewer);
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />


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
module wijmo.react {	
    /**
     * React component that encapsulates the @see:wijmo.grid.sheet.FlexSheet control. 
     */
    export class FlexSheet extends ComponentBase {
        constructor(props) {
            super(props, wijmo.grid.sheet.FlexSheet, { objectProps: ['childItemsPath', 'mergeManager', 'itemsSource']});
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />


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
module wijmo.react {	
    /**
     * React component that encapsulates the @see:wijmo.chart.finance.FinancialChart control. 
     */
    export class FinancialChart extends ComponentBase {
        constructor(props) {
            super(props, wijmo.chart.finance.FinancialChart, { objectProps: ['palette', 'plotMargin', 'footerStyle', 'headerStyle', 'itemsSource', 'options', 'selection']});
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />


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
module wijmo.react {	
    /**
     * React component that encapsulates the @see:wijmo.chart.hierarchical.Sunburst control. 
     */
    export class Sunburst extends ComponentBase {
        constructor(props) {
            super(props, wijmo.chart.hierarchical.Sunburst, { objectProps: ['palette', 'plotMargin', 'footerStyle', 'headerStyle', 'itemsSource', 'bindingName', 'childItemsPath']});
        } 
    }
 
 	
    /**
     * React component that encapsulates the @see:wijmo.chart.hierarchical.TreeMap control. 
     */
    export class TreeMap extends ComponentBase {
        constructor(props) {
            super(props, wijmo.chart.hierarchical.TreeMap, { objectProps: ['palette', 'plotMargin', 'footerStyle', 'headerStyle', 'itemsSource', 'bindingName', 'childItemsPath']});
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
///<wijmo-replace />
///<wijmo-replace-with />
//import * as React from 'react';
///<wijmo-replace-end />


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
module wijmo.react {	
    /**
     * React component that encapsulates the @see:wijmo.chart.radar.FlexRadar control. 
     */
    export class FlexRadar extends ComponentBase {
        constructor(props) {
            super(props, wijmo.chart.radar.FlexRadar, { objectProps: ['palette', 'plotMargin', 'footerStyle', 'headerStyle', 'itemsSource', 'options', 'selection']});
        } 
    }
 
 }// make components available through the "Wj" prefix, so users can write
// "Wj.FlexGrid" instead of "wijmo.react.FlexGrid":
var Wj = wijmo.react;
