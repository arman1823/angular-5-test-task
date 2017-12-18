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
/**
* Basic Wijmo for Angular 2 module containing internal common services and platform options.
*
* <b>wijmo.angular2.directiveBase</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjBase from 'wijmo/wijmo.angular2.directiveBase';
* &nbsp;
* wjBase.WjOptions.asyncBindings = false;</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.directiveBase'/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("wijmo/wijmo.angular2.directiveBase", ["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    'use strict';
    /**
     * Exposes global options for the Wijmo for Angular 2 interop.
     */
    var WjOptions = /** @class */ (function () {
        function WjOptions() {
        }
        /**
        * Indicates whether Wijmo components update binding sources of the two-way bound properties asynchronously
        * or synchronously.
        *
        * If this property is set to true (default) then changes to the Wijmo components' properties
        * with two-way bindings (like WjInputNumber.value) will cause the component to update a binding
        * source property asynchronously, after the current change detection cycle is completed.
        * Otherwise, if this property is set to false, the binding source will be updated immediately.
        * A corresponding property change event (like WjInputNumber.valueChanged) is also triggered
        * asynchronously or synchronously depending on this property value, after the binding source
        * was updated.
        *
        * This global setting can be changed for specific instances of Wijmo components, by assigning
        * the component's <b>asyncBindings</b> property with a specific boolean value.
        *
        * Transition to asynchronous binding source updates has happened in Wijmo version 350. Before that version,
        * binding sources were updated immediately after the component's property change. In some cases this
        * could lead to the <b>ExpressionChangedAfterItHasBeenCheckedError</b> exception in the applications running
        * Angular in the debug mode. For example, if your component's property value is set to 0.12345, and
        * you two-way bind it to the <b>value</b> property of the <b>WjInputNumber</b> component with the <b>format</b>
        * property set to <b>'n2'</b>, the WjInputNumber immediately converts this value to 0.12. This change,
        * in turn, causes Angular to update your component property (the source of this binding), so that its
        * value changes from 0.12345 to 0.12. If this source update is performed synchronously then the binding
        * source property changes its value during the same change detection cycle, which is prohibited by Angular.
        * If Angular runs in debug mode then it executes a special check after every change detection cycle, which
        * detects this change and raises the <b>ExpressionChangedAfterItHasBeenCheckedError</b> exception.
        * Asynchronous binding source updates resolve this problem, because the binding source property
        * is updated after the current change detection cycle has finished.
        *
        * If the <b>ExpressionChangedAfterItHasBeenCheckedError</b> is not an issue for you, and parts of
        * you application logic are sensible to a moment when binding source update happens, you can change
        * this functionality by setting the global <b>asyncBindings</b> property to false. This should be
        * done before the first Wijmo component was instantiated by your application logic, and the best
        * place to do it is the file where you declare the application's root NgModel. This can be done
        * with the code like this:
        * <pre>import * as wjBase from 'wijmo/wijmo.angular2.directiveBase';
        * wjBase.WjOptions.asyncBindings = false;</pre>
        *
        * Alternatively, you can change the update mode for the specific component using its own
        * <b>asyncBindings</b> property. For example:
        * <pre>&lt;wj-input-number [asyncBindings]="false" [(value)]="amount"&gt;&lt;/wj-input-number&gt;</pre>
        */
        WjOptions.asyncBindings = true;
        return WjOptions;
    }());
    exports.WjOptions = WjOptions;
    var WjComponentResolvedMetadata = /** @class */ (function () {
        function WjComponentResolvedMetadata(rawMeta) {
            this.changeEventMap = [];
            this.allImplEvents = [];
            this.resolveChangeEventMap(rawMeta);
        }
        WjComponentResolvedMetadata.prototype.resolveChangeEventMap = function (rawMeta) {
            var map = this.changeEventMap, outputs = rawMeta.outputs, changeEvents = rawMeta.changeEvents || {};
            map.splice(0, map.length);
            this.allImplEvents = [];
            if (!(outputs && outputs.length)) {
                return;
            }
            var allEventsMap = outputs.map(function (strPair) { return strPair.split(':'); })
                .map(function (arrPair) { return { implName: arrPair[0].trim(), exposeName: arrPair[1] && arrPair[1].trim() }; });
            this.allImplEvents = allEventsMap.map(function (arrPair) { return arrPair.implName; });
            // Creates array of { implName, exposeName } objects, with both properties defined.
            var outputPairs = allEventsMap.filter(function (arrPair) { return arrPair.implName && arrPair.exposeName; });
            //let outputPairs = outputs.map((strPair) => strPair.split(':'))
            //    .filter((arrPair) => arrPair.length === 2 && arrPair[0] && arrPair[1])
            //    .map((arrPair) => { return { implName: arrPair[0].trim(), exposeName: arrPair[1].trim() } });
            for (var _i = 0, outputPairs_1 = outputPairs; _i < outputPairs_1.length; _i++) {
                var pair = outputPairs_1[_i];
                var wjEvent = Ng2Utils.getWjEventName(pair.implName);
                if (wjEvent) {
                    var eventItem = {
                        eventImpl: pair.implName, event: pair.exposeName
                    };
                    var changeProps = changeEvents[pair.exposeName];
                    if (changeProps && changeProps.length) {
                        eventItem.props = changeProps.map(function (prop) {
                            var ret = {
                                prop: prop,
                                evExposed: Ng2Utils.getChangeEventNameExposed(prop),
                                evImpl: Ng2Utils.getChangeEventNameImplemented(prop)
                            };
                            return ret;
                        });
                    }
                    map.push(eventItem);
                }
            }
            // add parent path ("dot") prop change events
            for (var propChangeEvent in changeEvents) {
                if (propChangeEvent.indexOf('.') > -1) {
                    var eventItem = {
                        eventImpl: null,
                        event: propChangeEvent,
                        props: changeEvents[propChangeEvent].map(function (prop) {
                            var ret = {
                                prop: prop,
                                evExposed: Ng2Utils.getChangeEventNameExposed(prop),
                                evImpl: Ng2Utils.getChangeEventNameImplemented(prop)
                            };
                            return ret;
                        })
                    };
                    map.push(eventItem);
                }
            }
        };
        return WjComponentResolvedMetadata;
    }());
    exports.WjComponentResolvedMetadata = WjComponentResolvedMetadata;
    var WjDirectiveBehavior = /** @class */ (function () {
        function WjDirectiveBehavior(directive, elementRef, injector, injectedParent) {
            this._pendingEvents = [];
            this.isInitialized = false;
            this.isDestroyed = false;
            this.directive = directive;
            this.elementRef = elementRef;
            this.injector = injector;
            this.injectedParent = injectedParent;
            var typeData = this.typeData =
                directive.constructor[WjDirectiveBehavior.directiveTypeDataProp];
            if (typeData.siblingId == null) {
                typeData.siblingId = (++WjDirectiveBehavior.siblingDirId) + '';
            }
            var resolvedTypeData = directive.constructor[WjDirectiveBehavior.directiveResolvedTypeDataProp];
            if (resolvedTypeData) {
                this.resolvedTypeData = resolvedTypeData;
            }
            else {
                directive.constructor[WjDirectiveBehavior.directiveResolvedTypeDataProp] =
                    resolvedTypeData = this.resolvedTypeData = new WjComponentResolvedMetadata(typeData);
            }
            directive[WjDirectiveBehavior.BehaviourRefProp] = this;
            injector[WjDirectiveBehavior.BehaviourRefProp] = this;
            directive[WjDirectiveBehavior.isInitializedPropAttr] = false;
            this._createEvents();
            this._setupAsChild();
            if (this._isHostElement()) {
                elementRef.nativeElement.setAttribute(WjDirectiveBehavior.siblingDirIdAttr, typeData.siblingId);
            }
            // We can subscribe only to 'own' (without '.' in event name) events here. Handlers to foreign
            // events will be added in ngOnInit.
            this.subscribeToEvents(false);
        }
        WjDirectiveBehavior.getHostElement = function (ngHostElRef, injector) {
            if (!WjDirectiveBehavior.ngZone) {
                WjDirectiveBehavior.ngZone = injector.get(core_1.NgZone);
            }
            return ngHostElRef.nativeElement;
        };
        WjDirectiveBehavior.attach = function (directive, elementRef, injector, injectedParent) {
            return new WjDirectiveBehavior(directive, elementRef, injector, injectedParent);
        };
        WjDirectiveBehavior.prototype.ngOnInit = function () {
            this.isInitialized = true;
            this._initParent();
            // subscribe to foreign events here (like Column's 'grid.selectionChanged').
            this.subscribeToEvents(true);
        };
        WjDirectiveBehavior.prototype.ngAfterViewInit = function () {
            this.directive[WjDirectiveBehavior.isInitializedPropAttr] = true;
            this.directive[WjDirectiveBehavior.initializedEventAttr].emit(undefined);
        };
        WjDirectiveBehavior.prototype.ngOnDestroy = function () {
            if (this.isDestroyed) {
                return;
            }
            this.isDestroyed = true;
            var control = this.directive;
            if (this._siblingInsertedEH) {
                this.elementRef.nativeElement.removeEventListener('DOMNodeInserted', this._siblingInsertedEH);
            }
            if (this._isChild() && this.parentBehavior) {
                var parControl = this.parentBehavior.directive, parProp = this._getParentProp();
                if (!this.parentBehavior.isDestroyed && parControl && parProp && control) {
                    var parArr = parControl[parProp];
                    if (wijmo.isArray(parArr)) {
                        if (parArr) {
                            var idx = parArr.indexOf(control);
                            if (idx >= 0) {
                                parArr.splice(idx, 1);
                            }
                        }
                    }
                }
            }
            if (control instanceof wijmo.Control) {
                // We call dispose() with a delay, to get directives such as ng-if/ng-repeat a chance to remove its child subtree
                // berore the control will be disposed. Otherwise, Control.dispose() replaces its host element with an assignment 
                // to outerHTML, that creates an element clone in its parent with a different pointer, not the one that
                // ng-if stores locally, so this clone is out of ng-if control and stays in DOM forever.
                // TBD: do we need this delay in Ng2?
                // Answer: no, it breaks controls in templates, because Ng2 reuses control's host elements.
                //setTimeout(function () {
                if (control.hostElement) {
                    // control.dispose() kills current host element (by outerHTML=... assignment), while Ng2 reuses it,
                    // so we need to keep it in its correct position after call to control.dispose().
                    var host = this.elementRef.nativeElement, hostParent = host && host.parentNode, hostIdx = hostParent ? Array.prototype.indexOf.call(hostParent.childNodes, host) : -1;
                    //TBD: !!! control.dispose() will dispose all child controls, we need to dispose all directives before it!!!
                    control.dispose();
                    if (hostIdx > -1 && Array.prototype.indexOf.call(hostParent.childNodes, host) < 0) {
                        host.textContent = '';
                        if (hostIdx < hostParent.childNodes.length) {
                            hostParent.replaceChild(host, hostParent.childNodes[hostIdx]);
                        }
                        //else {
                        //    hostParent.appendChild(host);
                        //}
                    }
                }
                //}, 0);
            }
            this.injector[WjDirectiveBehavior.BehaviourRefProp] = null;
        };
        WjDirectiveBehavior.instantiateTemplate = function (parent, viewContainerRef, templateRef, domRenderer, useTemplateRoot, dataContext) {
            if (useTemplateRoot === void 0) { useTemplateRoot = false; }
            if (dataContext === void 0) { dataContext = {}; }
            var viewRef = viewContainerRef.createEmbeddedView(templateRef, dataContext, viewContainerRef.length);
            var nodes = viewRef.rootNodes, rootEl;
            if (useTemplateRoot && nodes.length === 1) {
                rootEl = nodes[0];
            }
            else {
                rootEl = document.createElement('div');
                for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                    var curNode = nodes_1[_i];
                    rootEl.appendChild(curNode);
                }
            }
            if (parent) {
                parent.appendChild(rootEl);
            }
            return { viewRef: viewRef, rootElement: rootEl };
        };
        WjDirectiveBehavior.prototype.getPropChangeEvent = function (propName) {
            var evToProps = this.typeData.changeEvents;
            if (evToProps) {
                for (var event_1 in evToProps) {
                    if (evToProps[event_1].indexOf(propName) > -1) {
                        return event_1;
                    }
                }
            }
            return null;
        };
        WjDirectiveBehavior.prototype._createEvents = function () {
            var events = this.resolvedTypeData.allImplEvents;
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var evName = events_1[_i];
                var isAsync = evName === 'initialized';
                this.directive[evName] = new core_1.EventEmitter(isAsync);
            }
        };
        // afterInit - indicates the phase (constructor (false) or ngOnInit (true))
        WjDirectiveBehavior.prototype.subscribeToEvents = function (afterInit) {
            var changeEvents = this.resolvedTypeData.changeEventMap;
            afterInit = !!afterInit;
            // Add handlers
            for (var _i = 0, changeEvents_1 = changeEvents; _i < changeEvents_1.length; _i++) {
                var curEventMap = changeEvents_1[_i];
                if (afterInit !== (curEventMap.event.indexOf(".") < 0)) {
                    this.addHandlers(curEventMap);
                }
            }
            if (afterInit) {
                // update two-way bindings in the target-to-source direction
                for (var _a = 0, changeEvents_2 = changeEvents; _a < changeEvents_2.length; _a++) {
                    var curEventMap = changeEvents_2[_a];
                    this.triggerPropChangeEvents(curEventMap, true);
                }
            }
        };
        WjDirectiveBehavior.prototype.addHandlers = function (eventMap) {
            var _this = this;
            var directive = this.directive;
            WjDirectiveBehavior.evaluatePath(directive, eventMap.event).addHandler(function (s, e) {
                // ensure that events are triggered in ngzone, this will cause change detection after handlers
                // will be executed
                _this._runInsideNgZone(function () {
                    // Trigger property change events
                    if (_this.isInitialized) {
                        _this.triggerPropChangeEvents(eventMap);
                    }
                    // Trigger Wijmo event
                    if (eventMap.eventImpl) {
                        _this._triggerEvent(directive[eventMap.eventImpl], e, eventMap.props && eventMap.props.length > 0);
                        //(<ng2.EventEmitter<any>>directive[eventMap.eventImpl]).emit(e);
                    }
                });
            });
        };
        WjDirectiveBehavior.prototype.triggerPropChangeEvents = function (eventMap, allowAsync) {
            if (allowAsync === void 0) { allowAsync = true; }
            var directive = this.directive;
            if (eventMap.props && eventMap.props.length) {
                // Trigger property change events
                for (var _i = 0, _a = eventMap.props; _i < _a.length; _i++) {
                    var curChangeProp = _a[_i];
                    this._triggerEvent(directive[curChangeProp.evImpl], directive[curChangeProp.prop], allowAsync);
                    //(<ng2.EventEmitter<any>>directive[curChangeProp.evImpl]).emit(directive[curChangeProp.prop]);
                }
            }
        };
        WjDirectiveBehavior.prototype._setupAsChild = function () {
            if (!this._isChild()) {
                return;
            }
            if (this._isHostElement()) {
                this.elementRef.nativeElement.style.display = 'none';
            }
            this.parentBehavior = WjDirectiveBehavior.getBehavior(this.injectedParent);
        };
        WjDirectiveBehavior.prototype._isAsyncBinding = function () {
            var dirValue = this.directive[WjDirectiveBehavior.asyncBindingUpdatePropAttr];
            return dirValue == null ? WjOptions.asyncBindings : dirValue;
        };
        // --------------------- Child directive ------------------------
        //Determines whether this is a child link.
        //NOTE: functionality is *not* based on _parentPropDesc
        WjDirectiveBehavior.prototype._isChild = function () {
            return this._isParentInitializer() || this._isParentReferencer();
        };
        // Indicates whether this directictive operates as a child directictive that initializes a property of its parent.
        WjDirectiveBehavior.prototype._isParentInitializer = function () {
            return this.directive[WjDirectiveBehavior.parPropAttr] != null;
        };
        // Indicates whether this directictive operates as a child directictive that references a parent in its property or
        // a constructor.
        WjDirectiveBehavior.prototype._isParentReferencer = function () {
            // only non-empty string resolves to true
            return !!this.typeData.parentRefProperty;
        };
        //For the child directives returns parent's property name that it services. Property name defined via
        //the wjProperty attribute of directive tag has priority over the directive._property definition.
        //NOTE: functionality is *not* based on _parentPropDesc
        WjDirectiveBehavior.prototype._getParentProp = function () {
            return this.directive[WjDirectiveBehavior.parPropAttr];
        };
        // For a child directive, the name of the property of the directive's underlying object that receives the reference
        // to the parent, or an empty string that indicates that the reference to the parent should be passed as the 
        // underlying object's constructor parameter.
        WjDirectiveBehavior.prototype._getParentReferenceProperty = function () {
            //return this.typeData.metaData.parentReferenceProperty;
            return this.typeData.parentRefProperty;
        };
        // Determines whether the child link uses an object created by the parent property, instead of creating it by
        // itself, and thus object's initialization should be delayed until parent link's control is created.
        //IMPORTANT: functionality is *based* on _parentPropDesc
        WjDirectiveBehavior.prototype._useParentObj = function () {
            // we can't support this, all affected properties should be read-write
            return false;
        };
        // For the child referencer directive, indicates whether the parent should be passed as a parameter the object
        // constructor.
        WjDirectiveBehavior.prototype._parentInCtor = function () {
            return this._isParentReferencer() && this._getParentReferenceProperty() == '';
        };
        WjDirectiveBehavior.prototype._initParent = function () {
            if (!this.parentBehavior || this._useParentObj()) {
                return;
            }
            var parDir = this.parentBehavior.directive, propName = this._getParentProp(), control = this.directive;
            if (this._isParentInitializer()) {
                var parProp = this._getParentProp();
                var parArr = parDir[propName];
                if (wijmo.isArray(parArr)) {
                    // insert child at correct index, which is the same as an index of the directive element amid sibling directives
                    // of the same type
                    var isHostElement = this._isHostElement(), linkIdx = isHostElement ? this._getSiblingIndex() : -1;
                    if (linkIdx < 0 || linkIdx >= parArr.length) {
                        linkIdx = parArr.length;
                    }
                    parArr.splice(linkIdx, 0, control);
                    if (isHostElement) {
                        this._siblingInsertedEH = this._siblingInserted.bind(this);
                        this.elementRef.nativeElement.addEventListener('DOMNodeInserted', this._siblingInsertedEH);
                    }
                }
                else {
                    parDir[propName] = control;
                }
            }
            if (this._isParentReferencer() && !this._parentInCtor()) {
                control[this._getParentReferenceProperty()] = parDir;
            }
        };
        // Gets an index of this directive host element among another host elements pertain to the same directive type.
        WjDirectiveBehavior.prototype._getSiblingIndex = function () {
            var thisEl = this.elementRef.nativeElement, parEl = thisEl.parentElement;
            // If parentElement is null, e.g. because this element is temporary in DocumentFragment, the index
            // of the element isn't relevant to the item's position in the array, so we return -1 and thus force
            // a calling code to not reposition the item in the array at all.  
            if (!parEl) {
                return -1;
            }
            var siblings = parEl.childNodes, idx = -1, dirId = this.typeData.siblingId;
            for (var i = 0; i < siblings.length; i++) {
                var curEl = siblings[i];
                if (curEl.nodeType == 1 && curEl.getAttribute(WjDirectiveBehavior.siblingDirIdAttr) == dirId) {
                    ++idx;
                    if (curEl === thisEl) {
                        return idx;
                    }
                }
            }
            return -1;
        };
        WjDirectiveBehavior.prototype._siblingInserted = function (e) {
            if (e.target === this.elementRef.nativeElement) {
                var lIdx = this._getSiblingIndex(), parArr = this.parentBehavior.directive[this._getParentProp()], directive = this.directive, arrIdx = parArr.indexOf(directive);
                if (lIdx >= 0 && arrIdx >= 0 && lIdx !== arrIdx) {
                    parArr.splice(arrIdx, 1);
                    lIdx = Math.min(lIdx, parArr.length);
                    parArr.splice(lIdx, 0, directive);
                }
            }
        };
        // Indicates whether the host node is HTMLElement. E.g. for template directive a host node is comment.
        WjDirectiveBehavior.prototype._isHostElement = function () {
            return this.elementRef.nativeElement.nodeType === Node.ELEMENT_NODE;
        };
        // --- end of Child directive ------------------------
        WjDirectiveBehavior.prototype._runInsideNgZone = function (func) {
            var behCl = WjDirectiveBehavior;
            if (behCl.ngZone && !behCl._ngZoneRun) {
                behCl._ngZoneRun = behCl.ngZone.run.bind(behCl.ngZone);
            }
            return (behCl._ngZoneRun || (function (fn) { return fn(); }))(func);
        };
        WjDirectiveBehavior.prototype._triggerEvent = function (event, args, allowAsync) {
            var _this = this;
            if (allowAsync && this._isAsyncBinding()) {
                var pendingEvents = this._pendingEvents, delayedEvent = {
                    event: event,
                    args: args
                };
                pendingEvents.push(delayedEvent);
                if (this._pendingEventsTO == null) {
                    this._pendingEventsTO = setTimeout(function () {
                        _this._triggerPendingEvents(false);
                    }, 0);
                }
            }
            else {
                event.emit(args);
            }
        };
        WjDirectiveBehavior.prototype._triggerPendingEvents = function (flush) {
            if (this._pendingEventsTO != null) {
                clearTimeout(this._pendingEventsTO);
                this._pendingEventsTO = null;
            }
            // clone pending events array
            var pendingEvents = [].concat(this._pendingEvents);
            this._pendingEvents.splice(0, this._pendingEvents.length);
            for (var _i = 0, pendingEvents_1 = pendingEvents; _i < pendingEvents_1.length; _i++) {
                var curEvent = pendingEvents_1[_i];
                curEvent.event.emit(curEvent.args);
            }
            // if flushing and previous events caused new events, trigger
            // new events too.
            if (flush && this._pendingEvents.length) {
                this._triggerPendingEvents(true);
            }
        };
        // Triggers pending events queued for the asynchronous execution immediately.
        WjDirectiveBehavior.prototype.flushPendingEvents = function () {
            this._triggerPendingEvents(true);
        };
        // ----- Utility methods
        WjDirectiveBehavior.evaluatePath = function (obj, path) {
            this._pathBinding.path = path;
            return this._pathBinding.getValue(obj);
        };
        // Gets WjDirectiveBehavior associated with specified directive.
        WjDirectiveBehavior.getBehavior = function (directive) {
            return directive ? directive[WjDirectiveBehavior.BehaviourRefProp] : null;
        };
        // Name of the property created on directive and Injector instances that references this behavior
        WjDirectiveBehavior.directiveTypeDataProp = 'meta';
        WjDirectiveBehavior.directiveResolvedTypeDataProp = '_wjResolvedMeta';
        WjDirectiveBehavior.BehaviourRefProp = '_wjBehaviour';
        WjDirectiveBehavior.parPropAttr = 'wjProperty';
        WjDirectiveBehavior.wjModelPropAttr = 'wjModelProperty';
        WjDirectiveBehavior.initializedEventAttr = 'initialized';
        WjDirectiveBehavior.isInitializedPropAttr = 'isInitialized';
        WjDirectiveBehavior.siblingDirIdAttr = 'wj-directive-id';
        WjDirectiveBehavior.asyncBindingUpdatePropAttr = 'asyncBindings';
        WjDirectiveBehavior.siblingDirId = 0;
        WjDirectiveBehavior.wijmoComponentProviderId = 'WjComponent';
        // An hash object of event names that Wijmo controls should subscribe to outside NgZone.
        WjDirectiveBehavior.outsideZoneEvents = {
            // IMPORTANT: don't include the commented out events!
            //'drag': true,
            //'dragover': true,
            'pointermove': true,
            'pointerover': true,
            'mousemove': true,
            'wheel': true,
            'touchmove': true
        };
        WjDirectiveBehavior._pathBinding = new wijmo.Binding('');
        return WjDirectiveBehavior;
    }());
    exports.WjDirectiveBehavior = WjDirectiveBehavior;
    var Ng2Utils = /** @class */ (function () {
        function Ng2Utils() {
        }
        // Returns an array for the @Component 'outputs' property.
        Ng2Utils.initEvents = function (directiveType, changeEvents) {
            var ret = [];
            for (var _i = 0, changeEvents_3 = changeEvents; _i < changeEvents_3.length; _i++) {
                var curEventMap = changeEvents_3[_i];
                var changeProps = curEventMap.props;
                if (curEventMap.event && curEventMap.eventImpl) {
                    ret.push(curEventMap.eventImpl + ':' + curEventMap.event);
                }
                if (changeProps && changeProps.length) {
                    for (var _a = 0, changeProps_1 = changeProps; _a < changeProps_1.length; _a++) {
                        var curChangeProp = changeProps_1[_a];
                        ret.push(curChangeProp.evImpl + ':' + curChangeProp.evExposed);
                    }
                }
            }
            return ret;
        };
        Ng2Utils.getChangeEventNameImplemented = function (propertyName) {
            //return Ng2Utils.getChangeEventNameExposed(propertyName) + 'Ng';
            return Ng2Utils.getChangeEventNameExposed(propertyName) + Ng2Utils.changeEventImplementSuffix; //'PC';
        };
        Ng2Utils.getChangeEventNameExposed = function (propertyName) {
            return propertyName + 'Change';
        };
        Ng2Utils.getWjEventNameImplemented = function (eventName) {
            //return eventName + 'Wj';
            return eventName + Ng2Utils.wjEventImplementSuffix; //'Ng';
        };
        Ng2Utils.getWjEventName = function (ngEventName) {
            if (ngEventName) {
                var ngSuffix = Ng2Utils.wjEventImplementSuffix;
                var suffixIdx = ngEventName.length - ngSuffix.length;
                if (suffixIdx > 0 && ngEventName.substr(suffixIdx) === ngSuffix) {
                    return ngEventName.substr(0, suffixIdx);
                }
            }
            return null;
        };
        // Gets the base type for the specified type.
        Ng2Utils.getBaseType = function (type) {
            var proto;
            return type && (proto = Object.getPrototypeOf(type.prototype)) && proto.constructor;
        };
        Ng2Utils.getAnnotations = function (type) {
            //return type && reflector.annotations(type);
            return Reflect.getMetadata('annotations', type);
        };
        Ng2Utils.getAnnotation = function (annotations, annotationType) {
            if (annotationType && annotations) {
                for (var _i = 0, annotations_1 = annotations; _i < annotations_1.length; _i++) {
                    var curAnno = annotations_1[_i];
                    if (curAnno instanceof annotationType) {
                        return curAnno;
                    }
                }
            }
            return null;
        };
        // Gets the annotation of the specified annotationType defined on the specified 'type'. 
        // If 'own' is true then method will traverse up the type inheritance hierarchy to find the requested
        // annotation type.
        Ng2Utils.getTypeAnnotation = function (type, annotationType, own) {
            for (var curType = type; curType; curType = own ? null : Ng2Utils.getBaseType(curType)) {
                var anno = Ng2Utils.getAnnotation(Ng2Utils.getAnnotations(curType), annotationType);
                if (anno) {
                    return anno;
                }
            }
            return null;
        };
        Ng2Utils.equals = function (v1, v2) {
            return (v1 != v1 && v2 != v2) || wijmo.DateTime.equals(v1, v2) || v1 === v2;
        };
        // override - if true then array property values will be replaced; otherwise, concatenated.
        // includePrivate - if true then properties whose names start with '_' will be copied.
        // filter - function(name, value): boolean
        Ng2Utils._copy = function (dst, src, override, includePrivate, filter) {
            if (dst && src) {
                for (var prop in src) {
                    if (includePrivate || prop[0] !== '_') {
                        var val = src[prop];
                        if (!filter || filter(prop, val)) {
                            var dstVal = dst[prop];
                            if (wijmo.isArray(val)) {
                                dst[prop] = (!wijmo.isArray(dstVal) || override ? [] : dstVal)
                                    .concat(val);
                            }
                            else if (val !== undefined) {
                                dst[prop] = val;
                            }
                        }
                    }
                }
            }
        };
        Ng2Utils.changeEventImplementSuffix = 'PC';
        Ng2Utils.wjEventImplementSuffix = 'Ng';
        return Ng2Utils;
    }());
    exports.Ng2Utils = Ng2Utils;
    //@Injectable()
    var WjValueAccessor = /** @class */ (function () {
        function WjValueAccessor(/*@Inject(Injector) injector: Injector*/ directive) {
            this._isFirstChange = true;
            this._isSubscribed = false;
            this._onChange = function (_) { };
            this._onTouched = function () { };
            //this._injector = injector;
            this._directive = directive;
            this._behavior = WjDirectiveBehavior.getBehavior(directive);
        }
        WjValueAccessor.prototype.writeValue = function (value) {
            var _this = this;
            //this._ensureDirective();
            this._modelValue = value;
            // the directive can be not initialized yet during this call, so we wait for its initialization
            // and assign the value only after it
            if (this._directive.isInitialized) {
                this._ensureInitEhUnsubscribed();
                this._updateDirective();
                this._isFirstChange = false; //see _updateDirective()
            }
            else {
                if (this._dirInitEh) {
                    this._isFirstChange = false; //see _updateDirective()
                }
                else {
                    var initEvent = this._directive.initialized;
                    this._dirInitEh = initEvent.subscribe(function () {
                        _this._updateDirective();
                        _this._ensureInitEhUnsubscribed();
                    });
                }
            }
        };
        WjValueAccessor.prototype.registerOnChange = function (fn) { this._onChange = fn; };
        WjValueAccessor.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
        WjValueAccessor.prototype._updateDirective = function () {
            // patch: seems a bug introduced in RC.4 - ngModel always writes a null during initialization,
            // though the source value is not a null, so we avoid value propagation during the first call
            // using _notFirstChange.
            // Note that this is not the issue when accessors is initialized by the FormControlName->FormGroupDirective
            // (in scenarios like in Ng2 DynamicForms sample).
            if (!this._isFirstChange || this._modelValue != null) {
                this._ensureNgModelProp();
                if (this._directive && this._ngModelProp) {
                    var normValue = this._modelValue;
                    // Ng2 converts nulls/indefined to '', we have to convert them back.
                    if (normValue === '') {
                        normValue = null;
                    }
                    this._directive[this._ngModelProp] = normValue;
                }
                this._ensureSubscribed();
            }
        };
        WjValueAccessor.prototype._ensureSubscribed = function () {
            if (this._isSubscribed) {
                return;
            }
            var directive = this._directive;
            if (directive) {
                this._ensureNgModelProp();
                var ngModelProp = this._ngModelProp = directive[WjDirectiveBehavior.wjModelPropAttr];
                if (ngModelProp) {
                    var changeEvent = this._behavior.getPropChangeEvent(ngModelProp);
                    if (changeEvent) {
                        directive[changeEvent].addHandler(this._dirValChgEh, this);
                    }
                }
                if (directive instanceof wijmo.Control) {
                    directive.lostFocus.addHandler(this._dirLostFocusEh, this);
                }
                this._isSubscribed = true;
            }
        };
        WjValueAccessor.prototype._ensureNgModelProp = function () {
            if (!this._ngModelProp && this._directive) {
                this._ngModelProp = this._directive[WjDirectiveBehavior.wjModelPropAttr];
            }
        };
        WjValueAccessor.prototype._ensureInitEhUnsubscribed = function () {
            if (this._dirInitEh) {
                this._dirInitEh.unsubscribe();
                this._dirInitEh = null;
            }
        };
        WjValueAccessor.prototype._dirValChgEh = function (s, e) {
            if (this._onChange && this._directive && this._ngModelProp) {
                var dirValue = this._directive[this._ngModelProp];
                // write the value to the model only if it's really different; otherwise, the form will be marked
                // as dirty, which may dirty form right during initialization.
                if (!Ng2Utils.equals(this._modelValue, dirValue)) {
                    this._modelValue = dirValue;
                    this._onChange(dirValue);
                }
            }
        };
        WjValueAccessor.prototype._dirLostFocusEh = function (s, e) {
            if (this._onTouched) {
                this._onTouched();
            }
        };
        return WjValueAccessor;
    }());
    exports.WjValueAccessor = WjValueAccessor;
    function WjValueAccessorFactory(/*injector: Injector*/ directive) {
        return new WjValueAccessor(/*injector*/ directive);
    }
    exports.WjValueAccessorFactory = WjValueAccessorFactory;
    var moduleExports = [];
    var WjDirectiveBaseModule = /** @class */ (function () {
        function WjDirectiveBaseModule() {
        }
        WjDirectiveBaseModule = __decorate([
            core_1.NgModule({})
        ], WjDirectiveBaseModule);
        return WjDirectiveBaseModule;
    }());
    exports.WjDirectiveBaseModule = WjDirectiveBaseModule;
});

/**
* Contains Angular 2 components for the <b>wijmo</b> module.
*
* <b>wijmo.angular2.core</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjCore from 'wijmo/wijmo.angular2.core';
* &nbsp;
* &#64;Component({
*     directives: [wjCore.WjTooltip],
*     template: '&lt;span [wjTooltip]="'Greeting'"&gt;Hello&lt;/span&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.core'/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.core", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, ngCore, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjTooltipMeta = {
        selector: '[wjTooltip]',
        inputs: [],
        outputs: [
            'initialized',
        ],
        exportAs: 'wjTooltip',
        providers: []
    };
    /**
        * Angular 2 directive for the @see:Tooltip class.
        *
        * Use the <b>wjTooltip</b> directive to add tooltips to elements on the page.
        * The wjTooltip directive supports HTML content, smart positioning, and touch.
        *
        * The wjTooltip directive is specified as a parameter added to the
        * element that the tooltip applies to. The parameter value is the tooltip
        * text or the id of an element that contains the text. For example:
        *
        * <pre>&lt;p [wjTooltip]="'#fineprint'" &gt;
        *     Regular paragraph content...&lt;/p&gt;
        * ...
        * &lt;div id="fineprint" style="display:none"&gt;
        *   &lt;h3&gt;Important Note&lt;/h3&gt;
        *   &lt;p&gt;
        *     Data for the current quarter is estimated
        *     by pro-rating etc.&lt;/p&gt;
        * &lt;/div&gt;</pre>
        */
    var WjTooltip = /** @class */ (function () {
        function WjTooltip(elRef, injector, parentCmp) {
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            this.isInitialized = false;
            var behavior = this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
            this._elRef = elRef;
            if (!WjTooltip_1._toolTip) {
                WjTooltip_1._toolTip = new wijmo.Tooltip();
            }
            this.created();
        }
        WjTooltip_1 = WjTooltip;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjTooltip.prototype.created = function () {
        };
        WjTooltip.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjTooltip.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjTooltip.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
            this.wjTooltip = null;
        };
        Object.defineProperty(WjTooltip.prototype, "wjTooltip", {
            get: function () {
                return this._toolTipText;
            },
            set: function (value) {
                if (this._toolTipText != value) {
                    this._toolTipText != value;
                    WjTooltip_1._toolTip.setTooltip(this._elRef.nativeElement, value);
                }
            },
            enumerable: true,
            configurable: true
        });
        WjTooltip.meta = {
            outputs: exports.wjTooltipMeta.outputs,
        };
        __decorate([
            core_3.Input()
        ], WjTooltip.prototype, "wjTooltip", null);
        WjTooltip = WjTooltip_1 = __decorate([
            core_2.Directive({
                selector: exports.wjTooltipMeta.selector,
                inputs: exports.wjTooltipMeta.inputs,
                outputs: exports.wjTooltipMeta.outputs,
                exportAs: exports.wjTooltipMeta.exportAs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjTooltip_1; }) }
                ].concat(exports.wjTooltipMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjTooltip);
        return WjTooltip;
        var WjTooltip_1;
    }());
    exports.WjTooltip = WjTooltip;
    /**
        * TBD
        */
    var WjComponentLoader = /** @class */ (function () {
        function WjComponentLoader(/*@Inject(DynamicComponentLoader) private _dcl: DynamicComponentLoader,*/ _cmpResolver, _elementRef) {
            this._cmpResolver = _cmpResolver;
            this._elementRef = _elementRef;
            this._isInit = false;
            this.propertiesChange = new ngCore.EventEmitter();
        }
        Object.defineProperty(WjComponentLoader.prototype, "component", {
            get: function () {
                return this._component;
            },
            set: function (value) {
                if (this._component !== value) {
                    this._component = value;
                    this._createComponent();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjComponentLoader.prototype, "properties", {
            get: function () {
                return this._properties;
            },
            set: function (value) {
                this._properties = value;
                this._updateProperties();
            },
            enumerable: true,
            configurable: true
        });
        WjComponentLoader.prototype.ngOnInit = function () {
            this._isInit = true;
            this._createComponent();
        };
        WjComponentLoader.prototype._createComponent = function () {
            if (this._isInit) {
                if (this._cmpRef) {
                    this._cmpRef.destroy();
                    this._cmpRef = null;
                }
                var value = this._component;
                if (value && this._anchor) {
                    //this._dcl.loadNextToLocation(value, this._anchor).then((cmpRef) => {
                    //    this._cmpRef = cmpRef;
                    //    this._updateProperties();
                    //});
                    this._cmpRef = this._anchor.createComponent(this._cmpResolver.resolveComponentFactory(value));
                    this._updateProperties();
                }
            }
        };
        WjComponentLoader.prototype._updateProperties = function () {
            var cmp = this._cmpRef && this._cmpRef.instance, properties = this.properties;
            if (cmp && properties) {
                var propNames = Object.getOwnPropertyNames(properties);
                for (var _i = 0, propNames_1 = propNames; _i < propNames_1.length; _i++) {
                    var pName = propNames_1[_i];
                    cmp[pName] = properties[pName];
                    var propChange = cmp[pName + 'Change'];
                    if (propChange instanceof core_1.EventEmitter) {
                        //TBD: unsubscribe
                        this._addPropListener(cmp, pName, propChange);
                    }
                }
            }
        };
        WjComponentLoader.prototype._addPropListener = function (component, propName, propChange) {
            var _this = this;
            propChange.subscribe(function (data) {
                _this.properties[propName] =
                    _this.properties[propName] = component[propName];
                _this.propertiesChange.next(_this.properties);
            });
        };
        __decorate([
            core_1.ViewChild('anchor', { read: core_2.ViewContainerRef })
        ], WjComponentLoader.prototype, "_anchor", void 0);
        WjComponentLoader = __decorate([
            core_1.Component({
                selector: 'wj-component-loader',
                template: "<div #anchor></div>",
                inputs: ['component', 'properties'],
                outputs: ['propertiesChange']
            }),
            __param(0, core_3.Inject(core_1.ComponentFactoryResolver)),
            __param(1, core_3.Inject(core_2.ElementRef))
        ], WjComponentLoader);
        return WjComponentLoader;
    }());
    exports.WjComponentLoader = WjComponentLoader;
    var moduleExports = [
        WjTooltip, WjComponentLoader
    ];
    var WjCoreModule = /** @class */ (function () {
        function WjCoreModule() {
        }
        WjCoreModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjCoreModule);
        return WjCoreModule;
    }());
    exports.WjCoreModule = WjCoreModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.input</b> module.
*
* <b>wijmo.angular2.input</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjInput from 'wijmo/wijmo.angular2.input';
* &nbsp;
* &#64;Component({
*     directives: [wjInput.WjInputNumber],
*     template: '&lt;wj-input-number [(value)]="amount"&gt;&lt;/wj-input-number&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     amount = 0;
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.input'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.input", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjComboBoxMeta = {
        selector: 'wj-combo-box',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'displayMemberPath',
            'selectedValuePath',
            'headerPath',
            'isContentHtml',
            'isEditable',
            'maxDropDownHeight',
            'maxDropDownWidth',
            'itemFormatter',
            'itemsSource',
            'text',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'formatItemNg: formatItem',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.ComboBox control.
     *
     * Use the <b>wj-combo-box</b> component to add <b>ComboBox</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjComboBox</b> component is derived from the <b>ComboBox</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-combo-box</b> component may contain a @see:wijmo/wijmo.angular2.input.WjItemTemplate child directive.
    */
    var WjComboBox = /** @class */ (function (_super) {
        __extends(WjComboBox, _super);
        function WjComboBox(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'selectedValue'.
             */
            _this.wjModelProperty = 'selectedValue';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjComboBox_1 = WjComboBox;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjComboBox.prototype.created = function () {
        };
        WjComboBox.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjComboBox.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjComboBox.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjComboBox.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjComboBox.meta = {
            outputs: exports.wjComboBoxMeta.outputs,
            changeEvents: {
                'isDroppedDownChanged': ['isDroppedDown'],
                'textChanged': ['text'],
                'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue']
            },
        };
        WjComboBox = WjComboBox_1 = __decorate([
            core_1.Component({
                selector: exports.wjComboBoxMeta.selector,
                template: exports.wjComboBoxMeta.template,
                inputs: exports.wjComboBoxMeta.inputs,
                outputs: exports.wjComboBoxMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjComboBox_1; }) }
                ].concat(exports.wjComboBoxMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjComboBox);
        return WjComboBox;
        var WjComboBox_1;
    }(wijmo.input.ComboBox));
    exports.WjComboBox = WjComboBox;
    exports.wjAutoCompleteMeta = {
        selector: 'wj-auto-complete',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'displayMemberPath',
            'selectedValuePath',
            'headerPath',
            'isContentHtml',
            'isEditable',
            'maxDropDownHeight',
            'maxDropDownWidth',
            'itemFormatter',
            'delay',
            'maxItems',
            'minLength',
            'cssMatch',
            'itemsSourceFunction',
            'searchMemberPath',
            'itemsSource',
            'text',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'formatItemNg: formatItem',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.AutoComplete control.
     *
     * Use the <b>wj-auto-complete</b> component to add <b>AutoComplete</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjAutoComplete</b> component is derived from the <b>AutoComplete</b> control and
     * inherits all its properties, events and methods.
    */
    var WjAutoComplete = /** @class */ (function (_super) {
        __extends(WjAutoComplete, _super);
        function WjAutoComplete(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'selectedValue'.
             */
            _this.wjModelProperty = 'selectedValue';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjAutoComplete_1 = WjAutoComplete;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjAutoComplete.prototype.created = function () {
        };
        WjAutoComplete.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjAutoComplete.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjAutoComplete.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjAutoComplete.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjAutoComplete.meta = {
            outputs: exports.wjAutoCompleteMeta.outputs,
            changeEvents: {
                'isDroppedDownChanged': ['isDroppedDown'],
                'textChanged': ['text'],
                'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue']
            },
        };
        WjAutoComplete = WjAutoComplete_1 = __decorate([
            core_1.Component({
                selector: exports.wjAutoCompleteMeta.selector,
                template: exports.wjAutoCompleteMeta.template,
                inputs: exports.wjAutoCompleteMeta.inputs,
                outputs: exports.wjAutoCompleteMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjAutoComplete_1; }) }
                ].concat(exports.wjAutoCompleteMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjAutoComplete);
        return WjAutoComplete;
        var WjAutoComplete_1;
    }(wijmo.input.AutoComplete));
    exports.WjAutoComplete = WjAutoComplete;
    exports.wjCalendarMeta = {
        selector: 'wj-calendar',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'monthView',
            'showHeader',
            'itemFormatter',
            'itemValidator',
            'firstDayOfWeek',
            'max',
            'min',
            'formatYearMonth',
            'formatDayHeaders',
            'formatDays',
            'formatYear',
            'formatMonths',
            'selectionMode',
            'isReadOnly',
            'value',
            'displayMonth',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
            'displayMonthChangedNg: displayMonthChanged',
            'displayMonthChangePC: displayMonthChange',
            'formatItemNg: formatItem',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.Calendar control.
     *
     * Use the <b>wj-calendar</b> component to add <b>Calendar</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjCalendar</b> component is derived from the <b>Calendar</b> control and
     * inherits all its properties, events and methods.
    */
    var WjCalendar = /** @class */ (function (_super) {
        __extends(WjCalendar, _super);
        function WjCalendar(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjCalendar_1 = WjCalendar;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjCalendar.prototype.created = function () {
        };
        WjCalendar.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjCalendar.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjCalendar.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjCalendar.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjCalendar.meta = {
            outputs: exports.wjCalendarMeta.outputs,
            changeEvents: {
                'valueChanged': ['value'],
                'displayMonthChanged': ['displayMonth']
            },
        };
        WjCalendar = WjCalendar_1 = __decorate([
            core_1.Component({
                selector: exports.wjCalendarMeta.selector,
                template: exports.wjCalendarMeta.template,
                inputs: exports.wjCalendarMeta.inputs,
                outputs: exports.wjCalendarMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjCalendar_1; }) }
                ].concat(exports.wjCalendarMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjCalendar);
        return WjCalendar;
        var WjCalendar_1;
    }(wijmo.input.Calendar));
    exports.WjCalendar = WjCalendar;
    exports.wjColorPickerMeta = {
        selector: 'wj-color-picker',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'showAlphaChannel',
            'showColorString',
            'palette',
            'value',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.ColorPicker control.
     *
     * Use the <b>wj-color-picker</b> component to add <b>ColorPicker</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjColorPicker</b> component is derived from the <b>ColorPicker</b> control and
     * inherits all its properties, events and methods.
    */
    var WjColorPicker = /** @class */ (function (_super) {
        __extends(WjColorPicker, _super);
        function WjColorPicker(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjColorPicker_1 = WjColorPicker;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjColorPicker.prototype.created = function () {
        };
        WjColorPicker.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjColorPicker.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjColorPicker.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjColorPicker.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjColorPicker.meta = {
            outputs: exports.wjColorPickerMeta.outputs,
            changeEvents: {
                'valueChanged': ['value']
            },
        };
        WjColorPicker = WjColorPicker_1 = __decorate([
            core_1.Component({
                selector: exports.wjColorPickerMeta.selector,
                template: exports.wjColorPickerMeta.template,
                inputs: exports.wjColorPickerMeta.inputs,
                outputs: exports.wjColorPickerMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjColorPicker_1; }) }
                ].concat(exports.wjColorPickerMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjColorPicker);
        return WjColorPicker;
        var WjColorPicker_1;
    }(wijmo.input.ColorPicker));
    exports.WjColorPicker = WjColorPicker;
    exports.wjInputMaskMeta = {
        selector: 'wj-input-mask',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'mask',
            'isRequired',
            'promptChar',
            'placeholder',
            'rawValue',
            'value',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'rawValueChangePC: rawValueChange',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.InputMask control.
     *
     * Use the <b>wj-input-mask</b> component to add <b>InputMask</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjInputMask</b> component is derived from the <b>InputMask</b> control and
     * inherits all its properties, events and methods.
    */
    var WjInputMask = /** @class */ (function (_super) {
        __extends(WjInputMask, _super);
        function WjInputMask(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjInputMask_1 = WjInputMask;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjInputMask.prototype.created = function () {
        };
        WjInputMask.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjInputMask.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjInputMask.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjInputMask.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjInputMask.meta = {
            outputs: exports.wjInputMaskMeta.outputs,
            changeEvents: {
                'valueChanged': ['rawValue', 'value']
            },
        };
        WjInputMask = WjInputMask_1 = __decorate([
            core_1.Component({
                selector: exports.wjInputMaskMeta.selector,
                template: exports.wjInputMaskMeta.template,
                inputs: exports.wjInputMaskMeta.inputs,
                outputs: exports.wjInputMaskMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputMask_1; }) }
                ].concat(exports.wjInputMaskMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjInputMask);
        return WjInputMask;
        var WjInputMask_1;
    }(wijmo.input.InputMask));
    exports.WjInputMask = WjInputMask;
    exports.wjInputColorMeta = {
        selector: 'wj-input-color',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'showAlphaChannel',
            'value',
            'text',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.InputColor control.
     *
     * Use the <b>wj-input-color</b> component to add <b>InputColor</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjInputColor</b> component is derived from the <b>InputColor</b> control and
     * inherits all its properties, events and methods.
    */
    var WjInputColor = /** @class */ (function (_super) {
        __extends(WjInputColor, _super);
        function WjInputColor(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjInputColor_1 = WjInputColor;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjInputColor.prototype.created = function () {
        };
        WjInputColor.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjInputColor.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjInputColor.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjInputColor.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjInputColor.meta = {
            outputs: exports.wjInputColorMeta.outputs,
            changeEvents: {
                'isDroppedDownChanged': ['isDroppedDown'],
                'textChanged': ['text'],
                'valueChanged': ['value']
            },
        };
        WjInputColor = WjInputColor_1 = __decorate([
            core_1.Component({
                selector: exports.wjInputColorMeta.selector,
                template: exports.wjInputColorMeta.template,
                inputs: exports.wjInputColorMeta.inputs,
                outputs: exports.wjInputColorMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputColor_1; }) }
                ].concat(exports.wjInputColorMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjInputColor);
        return WjInputColor;
        var WjInputColor_1;
    }(wijmo.input.InputColor));
    exports.WjInputColor = WjInputColor;
    exports.wjMultiSelectMeta = {
        selector: 'wj-multi-select',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'displayMemberPath',
            'selectedValuePath',
            'headerPath',
            'isContentHtml',
            'isEditable',
            'maxDropDownHeight',
            'maxDropDownWidth',
            'itemFormatter',
            'checkedMemberPath',
            'maxHeaderItems',
            'headerFormat',
            'headerFormatter',
            'showSelectAllCheckbox',
            'selectAllLabel',
            'itemsSource',
            'checkedItems',
            'text',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'formatItemNg: formatItem',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
            'checkedItemsChangedNg: checkedItemsChanged',
            'checkedItemsChangePC: checkedItemsChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.MultiSelect control.
     *
     * Use the <b>wj-multi-select</b> component to add <b>MultiSelect</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjMultiSelect</b> component is derived from the <b>MultiSelect</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-multi-select</b> component may contain a @see:wijmo/wijmo.angular2.input.WjItemTemplate child directive.
    */
    var WjMultiSelect = /** @class */ (function (_super) {
        __extends(WjMultiSelect, _super);
        function WjMultiSelect(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'checkedItems'.
             */
            _this.wjModelProperty = 'checkedItems';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjMultiSelect_1 = WjMultiSelect;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjMultiSelect.prototype.created = function () {
        };
        WjMultiSelect.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjMultiSelect.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjMultiSelect.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjMultiSelect.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjMultiSelect.meta = {
            outputs: exports.wjMultiSelectMeta.outputs,
            changeEvents: {
                'isDroppedDownChanged': ['isDroppedDown'],
                'textChanged': ['text'],
                'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
                'checkedItemsChanged': ['checkedItems']
            },
        };
        WjMultiSelect = WjMultiSelect_1 = __decorate([
            core_1.Component({
                selector: exports.wjMultiSelectMeta.selector,
                template: exports.wjMultiSelectMeta.template,
                inputs: exports.wjMultiSelectMeta.inputs,
                outputs: exports.wjMultiSelectMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMultiSelect_1; }) }
                ].concat(exports.wjMultiSelectMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjMultiSelect);
        return WjMultiSelect;
        var WjMultiSelect_1;
    }(wijmo.input.MultiSelect));
    exports.WjMultiSelect = WjMultiSelect;
    exports.wjMultiAutoCompleteMeta = {
        selector: 'wj-multi-auto-complete',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'displayMemberPath',
            'selectedValuePath',
            'headerPath',
            'isContentHtml',
            'isEditable',
            'maxDropDownHeight',
            'maxDropDownWidth',
            'itemFormatter',
            'delay',
            'maxItems',
            'minLength',
            'cssMatch',
            'itemsSourceFunction',
            'searchMemberPath',
            'maxSelectedItems',
            'selectedItems',
            'itemsSource',
            'selectedMemberPath',
            'text',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'formatItemNg: formatItem',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
            'selectedItemsChangedNg: selectedItemsChanged',
            'selectedItemsChangePC: selectedItemsChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.MultiAutoComplete control.
     *
     * Use the <b>wj-multi-auto-complete</b> component to add <b>MultiAutoComplete</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjMultiAutoComplete</b> component is derived from the <b>MultiAutoComplete</b> control and
     * inherits all its properties, events and methods.
    */
    var WjMultiAutoComplete = /** @class */ (function (_super) {
        __extends(WjMultiAutoComplete, _super);
        function WjMultiAutoComplete(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'selectedItems'.
             */
            _this.wjModelProperty = 'selectedItems';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjMultiAutoComplete_1 = WjMultiAutoComplete;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjMultiAutoComplete.prototype.created = function () {
        };
        WjMultiAutoComplete.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjMultiAutoComplete.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjMultiAutoComplete.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjMultiAutoComplete.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjMultiAutoComplete.meta = {
            outputs: exports.wjMultiAutoCompleteMeta.outputs,
            changeEvents: {
                'isDroppedDownChanged': ['isDroppedDown'],
                'textChanged': ['text'],
                'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
                'selectedItemsChanged': ['selectedItems']
            },
        };
        WjMultiAutoComplete = WjMultiAutoComplete_1 = __decorate([
            core_1.Component({
                selector: exports.wjMultiAutoCompleteMeta.selector,
                template: exports.wjMultiAutoCompleteMeta.template,
                inputs: exports.wjMultiAutoCompleteMeta.inputs,
                outputs: exports.wjMultiAutoCompleteMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMultiAutoComplete_1; }) }
                ].concat(exports.wjMultiAutoCompleteMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjMultiAutoComplete);
        return WjMultiAutoComplete;
        var WjMultiAutoComplete_1;
    }(wijmo.input.MultiAutoComplete));
    exports.WjMultiAutoComplete = WjMultiAutoComplete;
    exports.wjInputNumberMeta = {
        selector: 'wj-input-number',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'showSpinner',
            'max',
            'min',
            'step',
            'isRequired',
            'placeholder',
            'inputType',
            'format',
            'isReadOnly',
            'value',
            'text',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.InputNumber control.
     *
     * Use the <b>wj-input-number</b> component to add <b>InputNumber</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjInputNumber</b> component is derived from the <b>InputNumber</b> control and
     * inherits all its properties, events and methods.
    */
    var WjInputNumber = /** @class */ (function (_super) {
        __extends(WjInputNumber, _super);
        function WjInputNumber(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjInputNumber_1 = WjInputNumber;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjInputNumber.prototype.created = function () {
        };
        WjInputNumber.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjInputNumber.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjInputNumber.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjInputNumber.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjInputNumber.meta = {
            outputs: exports.wjInputNumberMeta.outputs,
            changeEvents: {
                'valueChanged': ['value'],
                'textChanged': ['text']
            },
        };
        WjInputNumber = WjInputNumber_1 = __decorate([
            core_1.Component({
                selector: exports.wjInputNumberMeta.selector,
                template: exports.wjInputNumberMeta.template,
                inputs: exports.wjInputNumberMeta.inputs,
                outputs: exports.wjInputNumberMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputNumber_1; }) }
                ].concat(exports.wjInputNumberMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjInputNumber);
        return WjInputNumber;
        var WjInputNumber_1;
    }(wijmo.input.InputNumber));
    exports.WjInputNumber = WjInputNumber;
    exports.wjInputDateMeta = {
        selector: 'wj-input-date',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'selectionMode',
            'format',
            'mask',
            'max',
            'min',
            'inputType',
            'itemValidator',
            'itemFormatter',
            'text',
            'value',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.InputDate control.
     *
     * Use the <b>wj-input-date</b> component to add <b>InputDate</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjInputDate</b> component is derived from the <b>InputDate</b> control and
     * inherits all its properties, events and methods.
    */
    var WjInputDate = /** @class */ (function (_super) {
        __extends(WjInputDate, _super);
        function WjInputDate(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjInputDate_1 = WjInputDate;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjInputDate.prototype.created = function () {
        };
        WjInputDate.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjInputDate.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjInputDate.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjInputDate.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjInputDate.meta = {
            outputs: exports.wjInputDateMeta.outputs,
            changeEvents: {
                'isDroppedDownChanged': ['isDroppedDown'],
                'textChanged': ['text'],
                'valueChanged': ['value']
            },
        };
        WjInputDate = WjInputDate_1 = __decorate([
            core_1.Component({
                selector: exports.wjInputDateMeta.selector,
                template: exports.wjInputDateMeta.template,
                inputs: exports.wjInputDateMeta.inputs,
                outputs: exports.wjInputDateMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputDate_1; }) }
                ].concat(exports.wjInputDateMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjInputDate);
        return WjInputDate;
        var WjInputDate_1;
    }(wijmo.input.InputDate));
    exports.WjInputDate = WjInputDate;
    exports.wjInputTimeMeta = {
        selector: 'wj-input-time',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'displayMemberPath',
            'selectedValuePath',
            'headerPath',
            'isContentHtml',
            'isEditable',
            'maxDropDownHeight',
            'maxDropDownWidth',
            'itemFormatter',
            'max',
            'min',
            'step',
            'format',
            'mask',
            'inputType',
            'itemsSource',
            'text',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
            'value',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'formatItemNg: formatItem',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.InputTime control.
     *
     * Use the <b>wj-input-time</b> component to add <b>InputTime</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjInputTime</b> component is derived from the <b>InputTime</b> control and
     * inherits all its properties, events and methods.
    */
    var WjInputTime = /** @class */ (function (_super) {
        __extends(WjInputTime, _super);
        function WjInputTime(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjInputTime_1 = WjInputTime;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjInputTime.prototype.created = function () {
        };
        WjInputTime.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjInputTime.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjInputTime.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjInputTime.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjInputTime.meta = {
            outputs: exports.wjInputTimeMeta.outputs,
            changeEvents: {
                'isDroppedDownChanged': ['isDroppedDown'],
                'textChanged': ['text'],
                'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
                'valueChanged': ['value']
            },
        };
        WjInputTime = WjInputTime_1 = __decorate([
            core_1.Component({
                selector: exports.wjInputTimeMeta.selector,
                template: exports.wjInputTimeMeta.template,
                inputs: exports.wjInputTimeMeta.inputs,
                outputs: exports.wjInputTimeMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputTime_1; }) }
                ].concat(exports.wjInputTimeMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjInputTime);
        return WjInputTime;
        var WjInputTime_1;
    }(wijmo.input.InputTime));
    exports.WjInputTime = WjInputTime;
    exports.wjInputDateTimeMeta = {
        selector: 'wj-input-date-time',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'selectionMode',
            'format',
            'mask',
            'max',
            'min',
            'inputType',
            'itemValidator',
            'itemFormatter',
            'timeMax',
            'timeMin',
            'timeStep',
            'timeFormat',
            'text',
            'value',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.InputDateTime control.
     *
     * Use the <b>wj-input-date-time</b> component to add <b>InputDateTime</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjInputDateTime</b> component is derived from the <b>InputDateTime</b> control and
     * inherits all its properties, events and methods.
    */
    var WjInputDateTime = /** @class */ (function (_super) {
        __extends(WjInputDateTime, _super);
        function WjInputDateTime(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjInputDateTime_1 = WjInputDateTime;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjInputDateTime.prototype.created = function () {
        };
        WjInputDateTime.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjInputDateTime.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjInputDateTime.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjInputDateTime.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjInputDateTime.meta = {
            outputs: exports.wjInputDateTimeMeta.outputs,
            changeEvents: {
                'isDroppedDownChanged': ['isDroppedDown'],
                'textChanged': ['text'],
                'valueChanged': ['value']
            },
        };
        WjInputDateTime = WjInputDateTime_1 = __decorate([
            core_1.Component({
                selector: exports.wjInputDateTimeMeta.selector,
                template: exports.wjInputDateTimeMeta.template,
                inputs: exports.wjInputDateTimeMeta.inputs,
                outputs: exports.wjInputDateTimeMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputDateTime_1; }) }
                ].concat(exports.wjInputDateTimeMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjInputDateTime);
        return WjInputDateTime;
        var WjInputDateTime_1;
    }(wijmo.input.InputDateTime));
    exports.WjInputDateTime = WjInputDateTime;
    exports.wjListBoxMeta = {
        selector: 'wj-list-box',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'isContentHtml',
            'maxHeight',
            'selectedValuePath',
            'itemFormatter',
            'displayMemberPath',
            'checkedMemberPath',
            'itemsSource',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
            'checkedItems',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'formatItemNg: formatItem',
            'itemsChangedNg: itemsChanged',
            'itemCheckedNg: itemChecked',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
            'checkedItemsChangedNg: checkedItemsChanged',
            'checkedItemsChangePC: checkedItemsChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.ListBox control.
     *
     * Use the <b>wj-list-box</b> component to add <b>ListBox</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjListBox</b> component is derived from the <b>ListBox</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-list-box</b> component may contain a @see:wijmo/wijmo.angular2.input.WjItemTemplate child directive.
    */
    var WjListBox = /** @class */ (function (_super) {
        __extends(WjListBox, _super);
        function WjListBox(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'selectedValue'.
             */
            _this.wjModelProperty = 'selectedValue';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjListBox_1 = WjListBox;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjListBox.prototype.created = function () {
        };
        WjListBox.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjListBox.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjListBox.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjListBox.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjListBox.meta = {
            outputs: exports.wjListBoxMeta.outputs,
            changeEvents: {
                'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
                'checkedItemsChanged': ['checkedItems']
            },
        };
        WjListBox = WjListBox_1 = __decorate([
            core_1.Component({
                selector: exports.wjListBoxMeta.selector,
                template: exports.wjListBoxMeta.template,
                inputs: exports.wjListBoxMeta.inputs,
                outputs: exports.wjListBoxMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjListBox_1; }) }
                ].concat(exports.wjListBoxMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjListBox);
        return WjListBox;
        var WjListBox_1;
    }(wijmo.input.ListBox));
    exports.WjListBox = WjListBox;
    exports.wjMenuMeta = {
        selector: 'wj-menu',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'isDroppedDown',
            'showDropDownButton',
            'autoExpandSelection',
            'placeholder',
            'dropDownCssClass',
            'isAnimated',
            'isReadOnly',
            'isRequired',
            'displayMemberPath',
            'selectedValuePath',
            'headerPath',
            'isContentHtml',
            'isEditable',
            'maxDropDownHeight',
            'maxDropDownWidth',
            'itemFormatter',
            'header',
            'commandParameterPath',
            'commandPath',
            'isButton',
            'itemsSource',
            'text',
            'selectedIndex',
            'selectedItem',
            'selectedValue',
            'value',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'isDroppedDownChangingNg: isDroppedDownChanging',
            'isDroppedDownChangedNg: isDroppedDownChanged',
            'isDroppedDownChangePC: isDroppedDownChange',
            'textChangedNg: textChanged',
            'textChangePC: textChange',
            'formatItemNg: formatItem',
            'selectedIndexChangedNg: selectedIndexChanged',
            'selectedIndexChangePC: selectedIndexChange',
            'selectedItemChangePC: selectedItemChange',
            'selectedValueChangePC: selectedValueChange',
            'itemClickedNg: itemClicked',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.Menu control.
     *
     * Use the <b>wj-menu</b> component to add <b>Menu</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjMenu</b> component is derived from the <b>Menu</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-menu</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.input.WjMenuItem
     * , @see:wijmo/wijmo.angular2.input.WjMenuSeparator
     *  and @see:wijmo/wijmo.angular2.input.WjItemTemplate.
    */
    var WjMenu = /** @class */ (function (_super) {
        __extends(WjMenu, _super);
        function WjMenu(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'selectedValue'.
             */
            _this.wjModelProperty = 'selectedValue';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.itemsSource = new wijmo.collections.ObservableArray();
            _this.selectedIndex = 0;
            _this.created();
            return _this;
        }
        WjMenu_1 = WjMenu;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjMenu.prototype.created = function () {
        };
        WjMenu.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
            this._attachToControl();
            this._updateHeader();
        };
        WjMenu.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjMenu.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
            this.listBox.formatItem.removeHandler(this._fmtItem, this);
            this.listBox.loadingItems.removeHandler(this._loadingItems, this);
        };
        WjMenu.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        Object.defineProperty(WjMenu.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                //if (this._value != value) {
                this._value = value;
                if (value != null) {
                    this.selectedValue = value;
                    this._updateHeader();
                }
                //this._cdRef.markForCheck();
                //this._appRef.tick();
                //}
            },
            enumerable: true,
            configurable: true
        });
        WjMenu.prototype.ngOnChanges = function (changes) {
            var headerChange = changes['header'];
            if (headerChange) {
                this._definedHeader = headerChange.currentValue;
                this._updateHeader();
            }
        };
        WjMenu.prototype.ngAfterContentInit = function () {
            // to force correct selectedValue and header update
            this.value = this.value;
            //this._updateHeader();
            ////this.itemClicked.addHandler(() => {
            //this.selectedIndexChanged.addHandler(() => {
            //    this.value = this.selectedValue;
            //});
        };
        WjMenu.prototype.onItemClicked = function (e) {
            // assign value before triggering the event, otherwise Ng 'valueChange' will be called with an
            // old 'value' value and two-way binding's source will receive an old value.
            this.value = this.selectedValue;
            _super.prototype.onItemClicked.call(this, e);
        };
        WjMenu.prototype.refresh = function (fullUpdate) {
            if (fullUpdate === void 0) { fullUpdate = true; }
            _super.prototype.refresh.call(this, fullUpdate);
            this._updateHeader();
        };
        WjMenu.prototype._attachToControl = function () {
            this.listBox.formatItem.addHandler(this._fmtItem, this);
            this.listBox.loadingItems.addHandler(this._loadingItems, this);
            //if (this.parent._isInitialized) {
            //    ownerControl.invalidate();
            this.invalidate();
        };
        WjMenu.prototype._loadingItems = function (s) {
            //TBD: will this destroy Wijmo directives in templates?
            //this.viewContainerRef.clear();
            var items = s.hostElement.getElementsByClassName('wj-listbox-item');
            for (var i = items.length - 1; i >= 0; i--) {
                var itemEl = items[i];
                itemEl.textContent = '';
            }
        };
        WjMenu.prototype._fmtItem = function (s, e) {
            if (!(e.data instanceof WjMenuItem)) {
                return;
            }
            var itemEl = e.item;
            itemEl.textContent = '';
            var menuItem = e.data, contentRoot = menuItem.contentRoot;
            if (contentRoot) {
                itemEl.appendChild(contentRoot);
                menuItem.added(itemEl);
            }
        };
        // if the scope has a value, show it in the header
        WjMenu.prototype._updateHeader = function () {
            this.header = this._definedHeader || '';
            var selItem = this.selectedItem;
            if (this.value != null && selItem && this.displayMemberPath) {
                var currentValue = null;
                if (selItem instanceof WjMenuItem) {
                    var contentRoot = selItem.contentRoot;
                    if (contentRoot) {
                        currentValue = contentRoot.innerHTML;
                    }
                    else {
                        currentValue = selItem[this.displayMemberPath];
                    }
                }
                if (currentValue != null) {
                    this.header += ': <b>' + currentValue + '</b>';
                }
            }
        };
        WjMenu.meta = {
            outputs: exports.wjMenuMeta.outputs,
            changeEvents: {
                'isDroppedDownChanged': ['isDroppedDown'],
                'textChanged': ['text'],
                'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
                'itemClicked': ['value']
            },
        };
        WjMenu = WjMenu_1 = __decorate([
            core_1.Component({
                selector: exports.wjMenuMeta.selector,
                template: exports.wjMenuMeta.template,
                inputs: exports.wjMenuMeta.inputs,
                outputs: exports.wjMenuMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMenu_1; }) }
                ].concat(exports.wjMenuMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjMenu);
        return WjMenu;
        var WjMenu_1;
    }(wijmo.input.Menu));
    exports.WjMenu = WjMenu;
    exports.wjMenuItemMeta = {
        selector: 'wj-menu-item',
        template: "<div *wjMenuItemTemplateDir><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'value',
            'cmd',
            'cmdParam',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see: control.
     *
     * The <b>wj-menu-item</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.input.WjMenu component.
     *
     * Use the <b>wj-menu-item</b> component to add <b></b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
    */
    var WjMenuItem = /** @class */ (function () {
        function WjMenuItem(elRef, injector, parentCmp, viewContainerRef, domRenderer) {
            this.viewContainerRef = viewContainerRef;
            this.domRenderer = domRenderer;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'itemsSource'.
             */
            this.wjProperty = 'itemsSource';
            var behavior = this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
            this._ownerMenu = behavior.parentBehavior.directive;
            this.created();
        }
        WjMenuItem_1 = WjMenuItem;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjMenuItem.prototype.created = function () {
        };
        WjMenuItem.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
            var ownerMenu = this._ownerMenu;
            if (ownerMenu.itemsSource.length == 1 && ownerMenu.selectedIndex < 0) {
                ownerMenu.selectedIndex = 0;
            }
            if (!ownerMenu.displayMemberPath) {
                ownerMenu.displayMemberPath = 'header';
            }
            if (!ownerMenu.selectedValuePath) {
                ownerMenu.selectedValuePath = 'value';
            }
            if (!ownerMenu.commandPath) {
                ownerMenu.commandPath = 'cmd';
            }
            if (!ownerMenu.commandParameterPath) {
                ownerMenu.commandParameterPath = 'cmdParam';
            }
            //ownerMenu.invalidate();
        };
        WjMenuItem.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjMenuItem.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjMenuItem.prototype.added = function (toItem) {
        };
        WjMenuItem.meta = {
            outputs: exports.wjMenuItemMeta.outputs,
            siblingId: 'menuItemDir',
        };
        WjMenuItem = WjMenuItem_1 = __decorate([
            core_1.Component({
                selector: exports.wjMenuItemMeta.selector,
                template: exports.wjMenuItemMeta.template,
                inputs: exports.wjMenuItemMeta.inputs,
                outputs: exports.wjMenuItemMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMenuItem_1; }) }
                ].concat(exports.wjMenuItemMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
            __param(3, core_3.Inject(core_2.ViewContainerRef)),
            __param(4, core_3.Inject(core_2.Renderer))
        ], WjMenuItem);
        return WjMenuItem;
        var WjMenuItem_1;
    }());
    exports.WjMenuItem = WjMenuItem;
    var WjMenuItemTemplateDir = /** @class */ (function () {
        function WjMenuItemTemplateDir(viewContainerRef, templateRef, elRef, injector, domRenderer, menuItem, menuSeparator) {
            this.viewContainerRef = viewContainerRef;
            this.templateRef = templateRef;
            this.elRef = elRef;
            this.domRenderer = domRenderer;
            this.ownerItem = menuItem || menuSeparator;
            this.ownerItem.templateDir = this;
        }
        WjMenuItemTemplateDir.prototype.ngAfterContentInit = function () {
            var self = this;
            //Without timeout, we get "LifeCycle.tick is called recursively" exception.
            //this.ngZone.run(() => {
            setTimeout(function () {
                var rootEl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(null, self.viewContainerRef, self.templateRef, self.domRenderer, true).rootElement;
                self.contentRoot = rootEl;
                self.ownerItem.contentRoot = rootEl;
                self.ownerItem._ownerMenu.listBox.invalidate();
                self.ownerItem._ownerMenu.invalidate();
            }, 0);
            //});
        };
        WjMenuItemTemplateDir = __decorate([
            core_2.Directive({
                selector: '[wjMenuItemTemplateDir]',
                inputs: ['wjMenuItemTemplateDir']
            }),
            __param(0, core_3.Inject(core_2.ViewContainerRef)),
            __param(1, core_3.Inject(core_2.TemplateRef)), __param(1, core_2.Optional()),
            __param(2, core_3.Inject(core_2.ElementRef)),
            __param(3, core_3.Inject(core_2.Injector)),
            __param(4, core_3.Inject(core_2.Renderer)),
            __param(5, core_3.Inject(WjMenuItem)), __param(5, core_2.Optional()),
            __param(6, core_3.Inject(core_2.forwardRef(function () { return WjMenuSeparator; }))), __param(6, core_2.Optional())
        ], WjMenuItemTemplateDir);
        return WjMenuItemTemplateDir;
    }());
    exports.WjMenuItemTemplateDir = WjMenuItemTemplateDir;
    exports.wjMenuSeparatorMeta = {
        selector: 'wj-menu-separator',
        template: "<div *wjMenuItemTemplateDir class=\"wj-state-disabled\" style=\"width:100%;height:1px;background-color:lightgray\"></div>",
        inputs: [
            'wjProperty',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see: control.
     *
     * The <b>wj-menu-separator</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.input.WjMenu component.
     *
     * Use the <b>wj-menu-separator</b> component to add <b></b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
    */
    var WjMenuSeparator = /** @class */ (function (_super) {
        __extends(WjMenuSeparator, _super);
        function WjMenuSeparator(elRef, injector, parentCmp, viewContainerRef, domRenderer) {
            var _this = _super.call(this, elRef, injector, parentCmp, viewContainerRef, domRenderer) || this;
            _this.created();
            return _this;
        }
        WjMenuSeparator_1 = WjMenuSeparator;
        WjMenuSeparator.prototype.added = function (toItem) {
            // prevent item selection
            wijmo.addClass(toItem, 'wj-state-disabled');
        };
        WjMenuSeparator = WjMenuSeparator_1 = __decorate([
            core_1.Component({
                selector: exports.wjMenuSeparatorMeta.selector,
                template: exports.wjMenuSeparatorMeta.template,
                inputs: exports.wjMenuSeparatorMeta.inputs,
                outputs: exports.wjMenuSeparatorMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMenuSeparator_1; }) }
                ].concat(exports.wjMenuSeparatorMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
            __param(3, core_3.Inject(core_2.ViewContainerRef)),
            __param(4, core_3.Inject(core_2.Renderer))
        ], WjMenuSeparator);
        return WjMenuSeparator;
        var WjMenuSeparator_1;
    }(WjMenuItem));
    exports.WjMenuSeparator = WjMenuSeparator;
    exports.wjItemTemplateMeta = {
        selector: '[wjItemTemplate]',
        inputs: [
            'wjItemTemplate',
        ],
        outputs: [
            'initialized',
        ],
        exportAs: 'wjItemTemplate',
        providers: []
    };
    /**
     * Angular 2 component for the @see: control.
     *
     * The <b>[wjItemTemplate]</b> directive must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.input.WjListBox
     * , @see:wijmo/wijmo.angular2.input.WjMenu
     * , @see:wijmo/wijmo.angular2.input.WjComboBox
     *  or @see:wijmo/wijmo.angular2.input.WjMultiSelect.
     *
     * The <b>[wjItemTemplate]</b> directive defines a template for items of a component
     * that it's nested in.
     * The template may contain an arbitrary HTML fragment with Angular 2 bindings and directives.
     * The local <b>item</b>, <b>itemIndex</b> and <b>control</b> template variables can be used in Angular 2
     * bindings that refer to the data item, its index, and the owner control. For example:
     *
     *<pre>&lt;wj-list-box style="max-height:300px;width:250px;"
     *             [itemsSource]="musicians"&gt;
     *   &lt;template wjItemTemplate let-item="item" let-itemIndex="itemIndex"&gt;
     *       {&#8203;{itemIndex + 1}}. &lt;b&gt;{&#8203;{item.name}}&lt;/b&gt;
     *       &lt;div *ngIf="item.photo"&gt;
     *           &lt;img [src]="item.photo" height="100" /&gt;
     *           &lt;br /&gt;
     *           &lt;a href="https://www.google.com/#newwindow=1&q=The+Beatles+"
     *              target="_blank"
     *              style="color:red"&gt;go there!&lt;/a&gt;
     *       &lt;/div&gt;
     *   &lt;/template&gt;
     * &lt;/wj-list-box&gt;</pre>
    */
    var WjItemTemplate = /** @class */ (function () {
        function WjItemTemplate(elRef, injector, parentCmp, viewContainerRef, templateRef, domRenderer, cdRef) {
            this.viewContainerRef = viewContainerRef;
            this.templateRef = templateRef;
            this.domRenderer = domRenderer;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            this.isInitialized = false;
            var behavior = this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
            this.ownerControl = behavior.parentBehavior.directive;
            this.listBox = WjItemTemplate_1._getListBox(this.ownerControl);
            this._cdRef = cdRef;
            this.created();
        }
        WjItemTemplate_1 = WjItemTemplate;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjItemTemplate.prototype.created = function () {
        };
        WjItemTemplate.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
            this._attachToControl();
        };
        WjItemTemplate.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjItemTemplate.prototype.ngOnDestroy = function () {
            var ownerControl = this.ownerControl, listBox = this.listBox;
            if (listBox) {
                listBox.formatItem.removeHandler(this._fmtItem, this);
                listBox.loadingItems.removeHandler(this._loadingItems, this);
            }
            if (ownerControl) {
                ownerControl.invalidate();
            }
        };
        WjItemTemplate.prototype._attachToControl = function () {
            this.listBox.formatItem.addHandler(this._fmtItem, this);
            this.listBox.loadingItems.addHandler(this._loadingItems, this);
            //if (this.parent._isInitialized) {
            //    ownerControl.invalidate();
            this.ownerControl.invalidate();
        };
        WjItemTemplate.prototype._loadingItems = function (s) {
            //TBD: will this destroy Wijmo directives in templates?
            this.viewContainerRef.clear();
        };
        WjItemTemplate.prototype._fmtItem = function (s, e) {
            var itemEl = e.item;
            itemEl.textContent = '';
            var viewRef = this._instantiateTemplate(itemEl);
            //viewRef.setLocal('control', s);
            //viewRef.setLocal('item', e.data);
            //viewRef.setLocal('itemIndex', e.index);
            viewRef.context.control = s;
            viewRef.context.item = e.data;
            viewRef.context.itemIndex = e.index;
            // Force change detection before itemsLoaded==>selectedIndexChanged, in order
            // to provide ComboBox with a consistent display text for its item search
            // functionality.
            if (e.index === (this.listBox.collectionView.items.length - 1)) {
                this._cdRef.detectChanges();
            }
        };
        WjItemTemplate.prototype._instantiateTemplate = function (parent) {
            return wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(parent, this.viewContainerRef, this.templateRef, this.domRenderer).viewRef;
        };
        // Gets a ListBox control whose items are templated, it maybe the control itself or internal ListBox used by controls like
        // ComboBox.
        WjItemTemplate._getListBox = function (ownerControl) {
            if (ownerControl) {
                return ownerControl instanceof wijmo.input.ListBox ? ownerControl : ownerControl.listBox;
            }
            return null;
        };
        WjItemTemplate.meta = {
            outputs: exports.wjItemTemplateMeta.outputs,
            parentRefProperty: 'owner',
        };
        WjItemTemplate = WjItemTemplate_1 = __decorate([
            core_2.Directive({
                selector: exports.wjItemTemplateMeta.selector,
                inputs: exports.wjItemTemplateMeta.inputs,
                outputs: exports.wjItemTemplateMeta.outputs,
                exportAs: exports.wjItemTemplateMeta.exportAs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjItemTemplate_1; }) }
                ].concat(exports.wjItemTemplateMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
            __param(3, core_3.Inject(core_2.ViewContainerRef)),
            __param(4, core_3.Inject(core_2.TemplateRef)), __param(4, core_2.Optional()),
            __param(5, core_3.Inject(core_2.Renderer)),
            __param(6, core_3.Inject(core_3.ChangeDetectorRef))
        ], WjItemTemplate);
        return WjItemTemplate;
        var WjItemTemplate_1;
    }());
    exports.WjItemTemplate = WjItemTemplate;
    exports.wjPopupMeta = {
        selector: 'wj-popup',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'owner',
            'showTrigger',
            'hideTrigger',
            'fadeIn',
            'fadeOut',
            'dialogResultEnter',
            'modal',
            'removeOnHide',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'showingNg: showing',
            'shownNg: shown',
            'hidingNg: hiding',
            'hiddenNg: hidden',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.input.Popup control.
     *
     * Use the <b>wj-popup</b> component to add <b>Popup</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjPopup</b> component is derived from the <b>Popup</b> control and
     * inherits all its properties, events and methods.
    */
    var WjPopup = /** @class */ (function (_super) {
        __extends(WjPopup, _super);
        function WjPopup(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjPopup_1 = WjPopup;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjPopup.prototype.created = function () {
        };
        WjPopup.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjPopup.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjPopup.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjPopup.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjPopup.prototype.ngOnChanges = function (changes) {
            var ownerChange = changes['owner'];
            if (ownerChange) {
                if (this.modal == null) {
                    this.modal = this.owner ? false : true;
                }
            }
        };
        WjPopup.prototype.dispose = function () {
            //TBD: patch, should be fixed in the base class
            // hide if visible
            if (this.isVisible) {
                this.hiding.removeAllHandlers();
                // don't use this trick, it prevents popup's DOM tree from removal
                //(<HTMLElement>this._elRef.nativeElement).style.display = "none";
                // suppress fade animation because it may cause weird effects in some scenarious (e.g. in cell editor)
                this.fadeOut = false;
                this.hide();
                //if (this._modal) {
                //    wijmo.hidePopup(this._bkdrop);
                //}
                //wijmo.hidePopup(this.hostElement);
            }
            // release owner
            //this._owner = null;
            // dispose as usual
            _super.prototype.dispose.call(this);
        };
        WjPopup.meta = {
            outputs: exports.wjPopupMeta.outputs,
        };
        WjPopup = WjPopup_1 = __decorate([
            core_1.Component({
                selector: exports.wjPopupMeta.selector,
                template: exports.wjPopupMeta.template,
                inputs: exports.wjPopupMeta.inputs,
                outputs: exports.wjPopupMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPopup_1; }) }
                ].concat(exports.wjPopupMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjPopup);
        return WjPopup;
        var WjPopup_1;
    }(wijmo.input.Popup));
    exports.WjPopup = WjPopup;
    /**
        * Angular 2 directive for context menus.
        *
        * Use the <b>wjContextMenu</b> directive to add context menus to elements
        * on the page. The wjContextMenu directive is based on the <b>wj-menu</b>
        * component; it displays a popup menu when the user performs a context menu
        * request on an element (usually a right-click).
        *
        * The wjContextMenu directive is specified as a parameter added to the
        * element that the context menu applies to. The parameter value is a
        * reference to the <b>wj-menu</b> component. For example:
        *
        * <pre>&lt;!-- paragraph with a context menu --&gt;
        *&lt;p [wjContextMenu]="menu" &gt;
        *  This paragraph has a context menu.&lt;/p&gt;
        *
        *&lt;!-- define the context menu (hidden and with an id) --&gt;
        *&lt;wj-menu #menu style="display:none"&gt;
        *  &lt;wj-menu-item [cmd]="cmdOpen" [cmdParam] ="1"&gt;Open...&lt;/wj-menu-item&gt;
        *  &lt;wj-menu-item [cmd]="cmdSave" [cmdParam]="2"&gt;Save &lt;/wj-menu-item&gt;
        *  &lt;wj-menu-item [cmd]="cmdSave" [cmdParam]="3"&gt;Save As...&lt;/wj-menu-item&gt;
        *  &lt;wj-menu-item [cmd]="cmdNew" [cmdParam] ="4"&gt;New...&lt;/wj-menu-item&gt;
        *  &lt;wj-menu-separator&gt;&lt;/wj-menu-separator&gt;
        *  &lt;wj-menu-item [cmd]="cmdExit" [cmdParam]="5"&gt;Exit&lt;/wj-menu-item&gt;
        *&lt;/wj-menu &gt;</pre>
        */
    var WjContextMenu = /** @class */ (function () {
        function WjContextMenu(elRef) {
            this.elRef = elRef;
        }
        WjContextMenu.prototype.onContextMenu = function (e) {
            var menu = this.wjContextMenu, dropDown = menu.dropDown;
            if (menu && dropDown && !wijmo.closest(e.target, '[disabled]')) {
                e.preventDefault();
                menu.owner = this.elRef.nativeElement;
                menu.show(e);
            }
        };
        WjContextMenu = __decorate([
            core_2.Directive({
                selector: '[wjContextMenu]',
                inputs: ['wjContextMenu'],
                exportAs: 'wjContextMenu',
                host: { '(contextmenu)': 'onContextMenu($event)' }
            }),
            __param(0, core_3.Inject(core_2.ElementRef))
        ], WjContextMenu);
        return WjContextMenu;
    }());
    exports.WjContextMenu = WjContextMenu;
    exports.wjCollectionViewNavigatorMeta = {
        selector: 'wj-collection-view-navigator',
        template: "<div class=\"wj-control wj-content wj-pager\">\n                <div class=\"wj-input-group\">\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                           (click)=\"cv.moveCurrentToFirst()\"\n                           [disabled]=\"!cv || cv?.currentPosition <= 0\">\n                            <span class=\"wj-glyph-left\" style=\"margin-right: -4px;\"></span>\n                            <span class=\"wj-glyph-left\"></span>\n                         </button>\n                    </span>\n                    <span class=\"wj-input-group-btn\" >\n                       <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                           (click)=\"cv.moveCurrentToPrevious()\"\n                           [disabled]=\"!cv || cv?.currentPosition <= 0\">\n                            <span class=\"wj-glyph-left\"></span>\n                       </button>\n                    </span>\n                    <input type=\"text\" class=\"wj-form-control\" \n                           value=\"{{cv?.currentPosition + 1 | number}} / {{cv?.itemCount | number}}\" \n                           disabled />\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                           (click)=\"cv.moveCurrentToNext()\"\n                           [disabled]=\"!cv || cv?.currentPosition >= cv?.itemCount - 1\">\n                            <span class=\"wj-glyph-right\"></span>\n                        </button>\n                    </span>\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                           (click)=\"cv.moveCurrentToLast()\"\n                           [disabled]=\"!cv || cv?.currentPosition >= cv?.itemCount - 1\">\n                            <span class=\"wj-glyph-right\"></span>\n                            <span class=\"wj-glyph-right\" style=\"margin-left: -4px;\"></span>\n                        </button>\n                    </span>\n                </div>\n            </div>",
        inputs: [
            'wjModelProperty',
            'cv',
        ],
        outputs: [
            'initialized',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
        * Angular 2 component for an @see:ICollectionView navigator element.
        *
        * Use the <b>wj-collection-view-navigator</b> component to add an element
        * that allows users to navigate through the items in an @see:ICollectionView.
        * For details about Angular 2 markup syntax, see
        * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
        *
        * <pre>&lt;wj-collection-view-navigator
        *   [cv]="myCollectionView"&gt;
        * &lt;/wj-collection-view-navigator&gt;</pre>
        */
    var WjCollectionViewNavigator = /** @class */ (function () {
        function WjCollectionViewNavigator(elRef, injector, parentCmp) {
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            this.isInitialized = false;
            var behavior = this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
            this.created();
        }
        WjCollectionViewNavigator_1 = WjCollectionViewNavigator;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjCollectionViewNavigator.prototype.created = function () {
        };
        WjCollectionViewNavigator.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjCollectionViewNavigator.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjCollectionViewNavigator.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjCollectionViewNavigator.meta = {
            outputs: exports.wjCollectionViewNavigatorMeta.outputs,
        };
        WjCollectionViewNavigator = WjCollectionViewNavigator_1 = __decorate([
            core_1.Component({
                selector: exports.wjCollectionViewNavigatorMeta.selector,
                template: exports.wjCollectionViewNavigatorMeta.template,
                inputs: exports.wjCollectionViewNavigatorMeta.inputs,
                outputs: exports.wjCollectionViewNavigatorMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjCollectionViewNavigator_1; }) }
                ].concat(exports.wjCollectionViewNavigatorMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjCollectionViewNavigator);
        return WjCollectionViewNavigator;
        var WjCollectionViewNavigator_1;
    }());
    exports.WjCollectionViewNavigator = WjCollectionViewNavigator;
    exports.wjCollectionViewPagerMeta = {
        selector: 'wj-collection-view-pager',
        template: "<div class=\"wj-control wj-content wj-pager\" >\n                <div class=\"wj-input-group\">\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                            (click)=\"cv.moveToFirstPage()\"\n                            [disabled]=\"!cv || cv?.pageIndex <= 0\">\n                            <span class=\"wj-glyph-left\" style=\"margin-right: -4px;\"></span>\n                            <span class=\"wj-glyph-left\"></span>\n                        </button>\n                    </span>\n                    <span class=\"wj-input-group-btn\" >\n                    <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                            (click)=\"cv.moveToPreviousPage()\"\n                            [disabled]=\"!cv || cv?.pageIndex <= 0\">\n                            <span class=\"wj-glyph-left\"></span>\n                        </button>\n                    </span>\n                    <input type=\"text\" class=\"wj-form-control\" \n                           value=\"{{cv?.pageIndex + 1 | number}} / {{cv?.pageCount | number}}\" \n                           disabled />\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                            (click)=\"cv.moveToNextPage()\"\n                            [disabled]=\"!cv || cv?.pageIndex >= cv?.pageCount - 1\">\n                            <span class=\"wj-glyph-right\"></span>\n                        </button>\n                    </span>\n                    <span class=\"wj-input-group-btn\" >\n                        <button class=\"wj-btn wj-btn-default\" type=\"button\"\n                            (click)=\"cv.moveToLastPage()\"\n                            [disabled]=\"!cv || cv?.pageIndex >= cv?.pageCount - 1\">\n                            <span class=\"wj-glyph-right\"></span>\n                            <span class=\"wj-glyph-right\" style=\"margin-left: -4px;\"></span>\n                        </button>\n                    </span>\n                </div>\n            </div>",
        inputs: [
            'wjModelProperty',
            'cv',
        ],
        outputs: [
            'initialized',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
        * Angular 2 component for an @see:ICollectionView pager element.
        *
        * Use the <b>wj-collection-view-pager</b> component to add an element
        * that allows users to navigate through the pages in a paged @see:ICollectionView.
        * For details about Angular 2 markup syntax, see
        * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
        *
        * <pre>&lt;wj-collection-view-pager
        *   [cv]="myCollectionView"&gt;
        * &lt;/wj-collection-view-pager&gt;</pre>
        */
    var WjCollectionViewPager = /** @class */ (function () {
        function WjCollectionViewPager(elRef, injector, parentCmp) {
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            this.isInitialized = false;
            var behavior = this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
            this.created();
        }
        WjCollectionViewPager_1 = WjCollectionViewPager;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjCollectionViewPager.prototype.created = function () {
        };
        WjCollectionViewPager.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjCollectionViewPager.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjCollectionViewPager.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjCollectionViewPager.meta = {
            outputs: exports.wjCollectionViewPagerMeta.outputs,
        };
        WjCollectionViewPager = WjCollectionViewPager_1 = __decorate([
            core_1.Component({
                selector: exports.wjCollectionViewPagerMeta.selector,
                template: exports.wjCollectionViewPagerMeta.template,
                inputs: exports.wjCollectionViewPagerMeta.inputs,
                outputs: exports.wjCollectionViewPagerMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjCollectionViewPager_1; }) }
                ].concat(exports.wjCollectionViewPagerMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjCollectionViewPager);
        return WjCollectionViewPager;
        var WjCollectionViewPager_1;
    }());
    exports.WjCollectionViewPager = WjCollectionViewPager;
    var moduleExports = [
        WjComboBox,
        WjAutoComplete,
        WjCalendar,
        WjColorPicker,
        WjInputMask,
        WjInputColor,
        WjMultiSelect,
        WjMultiAutoComplete,
        WjInputNumber,
        WjInputDate,
        WjInputTime,
        WjInputDateTime,
        WjListBox,
        WjMenu,
        WjMenuItem,
        WjMenuSeparator,
        WjItemTemplate,
        WjPopup,
        WjContextMenu,
        WjCollectionViewNavigator,
        WjCollectionViewPager
    ];
    var WjInputModule = /** @class */ (function () {
        function WjInputModule() {
        }
        WjInputModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.concat([WjMenuItemTemplateDir]),
                exports: moduleExports.slice(),
            })
        ], WjInputModule);
        return WjInputModule;
    }());
    exports.WjInputModule = WjInputModule;
});

///<wijmo-soft-import from="wijmo.input"/>
///<wijmo-soft-import from="wijmo.grid.detail"/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.grid", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexGridMeta = {
        selector: 'wj-flex-grid',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'newRowAtTop',
            'allowAddNew',
            'allowDelete',
            'allowDragging',
            'allowMerging',
            'allowResizing',
            'allowSorting',
            'quickAutoSize',
            'autoSizeMode',
            'autoGenerateColumns',
            'childItemsPath',
            'groupHeaderFormat',
            'headersVisibility',
            'showSelectedHeaders',
            'showMarquee',
            'itemFormatter',
            'isReadOnly',
            'imeEnabled',
            'mergeManager',
            'selectionMode',
            'showGroups',
            'showSort',
            'showDropDown',
            'showAlternatingRows',
            'showErrors',
            'validateEdits',
            'treeIndent',
            'itemsSource',
            'autoClipboard',
            'frozenRows',
            'frozenColumns',
            'cloneFrozenCells',
            'deferResizing',
            'sortRowIndex',
            'stickyHeaders',
            'preserveSelectedState',
            'preserveOutlineState',
            'keyActionTab',
            'keyActionEnter',
            'rowHeaderPath',
            'virtualizationThreshold',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'beginningEditNg: beginningEdit',
            'cellEditEndedNg: cellEditEnded',
            'cellEditEndingNg: cellEditEnding',
            'prepareCellForEditNg: prepareCellForEdit',
            'formatItemNg: formatItem',
            'resizingColumnNg: resizingColumn',
            'resizedColumnNg: resizedColumn',
            'autoSizingColumnNg: autoSizingColumn',
            'autoSizedColumnNg: autoSizedColumn',
            'draggingColumnNg: draggingColumn',
            'draggingColumnOverNg: draggingColumnOver',
            'draggedColumnNg: draggedColumn',
            'sortingColumnNg: sortingColumn',
            'sortedColumnNg: sortedColumn',
            'resizingRowNg: resizingRow',
            'resizedRowNg: resizedRow',
            'autoSizingRowNg: autoSizingRow',
            'autoSizedRowNg: autoSizedRow',
            'draggingRowNg: draggingRow',
            'draggingRowOverNg: draggingRowOver',
            'draggedRowNg: draggedRow',
            'deletingRowNg: deletingRow',
            'deletedRowNg: deletedRow',
            'loadingRowsNg: loadingRows',
            'loadedRowsNg: loadedRows',
            'rowEditStartingNg: rowEditStarting',
            'rowEditStartedNg: rowEditStarted',
            'rowEditEndingNg: rowEditEnding',
            'rowEditEndedNg: rowEditEnded',
            'rowAddedNg: rowAdded',
            'groupCollapsedChangedNg: groupCollapsedChanged',
            'groupCollapsedChangingNg: groupCollapsedChanging',
            'itemsSourceChangedNg: itemsSourceChanged',
            'selectionChangingNg: selectionChanging',
            'selectionChangedNg: selectionChanged',
            'scrollPositionChangedNg: scrollPositionChanged',
            'updatingViewNg: updatingView',
            'updatedViewNg: updatedView',
            'updatingLayoutNg: updatingLayout',
            'updatedLayoutNg: updatedLayout',
            'pastingNg: pasting',
            'pastedNg: pasted',
            'pastingCellNg: pastingCell',
            'pastedCellNg: pastedCell',
            'copyingNg: copying',
            'copiedNg: copied',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.FlexGrid control.
     *
     * Use the <b>wj-flex-grid</b> component to add <b>FlexGrid</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>. For example:
     *
     * <pre>&lt;p&gt;Here is a data bound FlexGrid control with four columns:&lt;/p&gt;
     * &lt;wj-flex-grid [itemsSource]="data"&gt;
     *   &lt;wj-flex-grid-column
     *     [header]="'Country'"
     *     [binding]="'country'"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column
     *     [header]="'Sales'"
     *     [binding]="'sales'"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column
     *     [header]="'Expenses'"
     *     [binding]="'expenses'"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column
     *     [header]="'Downloads'"
     *     [binding]="'downloads'"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     * &lt;/wj-flex-grid&gt;</pre>
     *
    
     * The <b>WjFlexGrid</b> component is derived from the <b>FlexGrid</b> control and
     * inherits all its properties, events and methods.
     * The following properties are not available for binding in templates:
     * <b>scrollPosition</b>, <b>selection</b> and <b>columnLayout</b> properties.
     *
     * The <b>wj-flex-grid</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.grid.detail.WjFlexGridDetail
     * , @see:wijmo/wijmo.angular2.grid.filter.WjFlexGridFilter
     * , @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn
     *  and @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate.
    */
    var WjFlexGrid = /** @class */ (function (_super) {
        __extends(WjFlexGrid, _super);
        function WjFlexGrid(elRef, injector, parentCmp, cdRef) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            new DirectiveCellFactory(_this, cdRef);
            //TBD: patch: default row height, remove after the issue will be fixed in grid
            _this.deferUpdate(function () {
                if (_this.rows.defaultSize < 10) {
                    var e = _this.hostElement, csh = getComputedStyle(e), csb = getComputedStyle(document.body), defRowHei = parseInt(csh.fontSize && wijmo.contains(document.body, e) ? csh.fontSize : csb.fontSize) * 2;
                    _this.rows.defaultSize = defRowHei;
                    _this.columns.defaultSize = defRowHei * 4;
                    _this.columnHeaders.rows.defaultSize = defRowHei;
                    _this.rowHeaders.columns.defaultSize = Math.round(defRowHei * 1.25);
                }
            });
            _this.created();
            return _this;
        }
        WjFlexGrid_1 = WjFlexGrid;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexGrid.prototype.created = function () {
        };
        WjFlexGrid.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexGrid.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexGrid.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexGrid.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjFlexGrid.meta = {
            outputs: exports.wjFlexGridMeta.outputs,
        };
        WjFlexGrid = WjFlexGrid_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexGridMeta.selector,
                template: exports.wjFlexGridMeta.template,
                inputs: exports.wjFlexGridMeta.inputs,
                outputs: exports.wjFlexGridMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGrid_1; }) }
                ].concat(exports.wjFlexGridMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
            __param(3, core_3.Inject(core_3.ChangeDetectorRef))
        ], WjFlexGrid);
        return WjFlexGrid;
        var WjFlexGrid_1;
    }(wijmo.grid.FlexGrid));
    exports.WjFlexGrid = WjFlexGrid;
    exports.wjFlexGridColumnMeta = {
        selector: 'wj-flex-grid-column',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'name',
            'dataMap',
            'dataType',
            'binding',
            'sortMemberPath',
            'format',
            'header',
            'width',
            'maxLength',
            'minWidth',
            'maxWidth',
            'align',
            'allowDragging',
            'allowSorting',
            'allowResizing',
            'allowMerging',
            'aggregate',
            'isReadOnly',
            'cssClass',
            'isContentHtml',
            'isSelected',
            'visible',
            'wordWrap',
            'mask',
            'inputType',
            'isRequired',
            'showDropDown',
            'dropDownCssClass',
            'quickAutoSize',
        ],
        outputs: [
            'initialized',
            'isSelectedChangePC: isSelectedChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.Column control.
     *
     * The <b>wj-flex-grid-column</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
     *
     * Use the <b>wj-flex-grid-column</b> component to add <b>Column</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexGridColumn</b> component is derived from the <b>Column</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-grid-column</b> component may contain a @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate child directive.
    */
    var WjFlexGridColumn = /** @class */ (function (_super) {
        __extends(WjFlexGridColumn, _super);
        function WjFlexGridColumn(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'columns'.
             */
            _this.wjProperty = 'columns';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            var gridCmp = behavior.parentBehavior.directive;
            if (gridCmp.autoGenerateColumns) {
                gridCmp.autoGenerateColumns = false;
                gridCmp.columns.clear();
            }
            _this.created();
            return _this;
        }
        WjFlexGridColumn_1 = WjFlexGridColumn;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexGridColumn.prototype.created = function () {
        };
        WjFlexGridColumn.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexGridColumn.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexGridColumn.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexGridColumn.meta = {
            outputs: exports.wjFlexGridColumnMeta.outputs,
            changeEvents: {
                'grid.selectionChanged': ['isSelected']
            },
        };
        WjFlexGridColumn = WjFlexGridColumn_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexGridColumnMeta.selector,
                template: exports.wjFlexGridColumnMeta.template,
                inputs: exports.wjFlexGridColumnMeta.inputs,
                outputs: exports.wjFlexGridColumnMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridColumn_1; }) }
                ].concat(exports.wjFlexGridColumnMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexGridColumn);
        return WjFlexGridColumn;
        var WjFlexGridColumn_1;
    }(wijmo.grid.Column));
    exports.WjFlexGridColumn = WjFlexGridColumn;
    /**
    * Angular 2 directive for the @see:FlexGrid cell templates.
    *
    * The <b>wjFlexGridCellTemplate</b> directive defines a template for a certain
    * cell type in @see:FlexGrid. The template should be defined on a <b>&lt;template&gt;</b> element
    * and must contain a <b>cellType</b> attribute that
    * specifies the @see:wijmo/wijmo.angular2.grid.CellTemplateType. Depending on the template's cell type,
    * the <b>&lt;template&gt;</b> element with the <b>wjFlexGridCellTemplate</b> directive must be a child
    * of either @see:wijmo/wijmo.angular2.grid.WjFlexGrid
    * or @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn directives.
    *
    * Column-specific cell templates must be contained in <b>wj-flex-grid-column</b>
    * components, and cells that are not column-specific (like row header or top left cells)
    * must be contained in the <b>wj-flex-grid</b> component.
    *
    * The <b>&lt;template&gt;</b> element with the <b>wjFlexGridCellTemplate</b> directive
    * may contain an arbitrary HTML fragment with Angular 2 interpolation expressions and
    * other components and directives.
    *
    * Bindings in HTML fragment can use the <b>cell</b> local template variable containing the cell context object,
    * with <b>col</b>, <b>row</b>, and <b>item</b> properties that refer to the @see:Column,
    * @see:Row, and <b>Row.dataItem</b> objects pertaining to the cell.
    *
    * For cell types like <b>Group</b> and <b>CellEdit</b>, an additional <b>value</b>
    * property containing an unformatted cell value is provided. For example, here is a
    * @see:FlexGrid control with templates for row header cells and, regular
    * and column header cells of the Country column:
    *
    * <pre>import * as wjGrid from 'wijmo/wijmo.angular2.grid';
    * &nbsp;
    * &#64;Component({
    *     directives: [wjGrid.WjFlexGrid, wjGrid.WjFlexGridColumn, wjGrid.WjFlexGridCellTemplate],
    *     template: `
    * &lt;wj-flex-grid [itemsSource]="data"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeader'" let-cell="cell"&gt;
    *     {&#8203;{cell.row.index}}
    *   &lt;/template&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
    *     ...
    *   &lt;/template&gt;
    * &nbsp;
    *   &lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
    *     &lt;template wjFlexGridCellTemplate [cellType]="'ColumnHeader'" let-cell="cell"&gt;
    *       &lt;img src="resources/globe.png" /&gt;
    *         {&#8203;{cell.col.header}}
    *     &lt;/template&gt;
    *     &lt;template wjFlexGridCellTemplate [cellType]="'Cell'" let-cell="cell"&gt;
    *       &lt;img src="resources/{&#8203;{cell.item.country}}.png" /&gt;
    *       {&#8203;{cell.item.country}}
    *     &lt;/template&gt;
    *   &lt;/wj-flex-grid-column&gt;
    *   &lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'"&gt;&lt;/wj-flex-grid-column&gt;
    * &lt;/wj-flex-grid&gt;
    * `,
    *     selector: 'my-cmp',
    * })
    * export class MyCmp {
    *     data: any[];
    * }</pre>
    *
    * For more detailed information on specific cell type templates, refer to the
    * documentation for @see:wijmo/wijmo.angular2.grid.CellTemplateType enumeration.
    *
    * The <b>wjFlexGridCellTemplate</b> directive supports the following attributes:
    *
    * <dl class="dl-horizontal">
    *   <dt>cellType</dt>
    *   <dd>
    *     The <b>CellTemplateType</b> value defining the type of cell to which the template is applied.
    *   </dd>
    *   <dt>cellOverflow</dt>
    *   <dd>
    *     Defines the <b>style.overflow</b> property value for cells.
    *   </dd>
    * </dl>
    *
    * The <b>cellType</b> attribute takes any of the following enumerated values:
    *
    * <b>Cell</b>
    *
    * Defines a regular (data) cell template. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
    * For example, this cell template shows flags in the cells of Country column:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'Cell'" let-cell="cell"&gt;
    *     &lt;img src="resources/{&#8203;{cell.item.country}}.png" /&gt;
    *     {&#8203;{cell.item.country}}
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * If <b>Group</b> template is not provided for a hierarchical @see:FlexGrid (that is, one with the <b>childItemsPath</b> property
    * specified), non-header cells in group rows of
    * this @see:Column also use this template.
    *
    * <b>CellEdit</b>
    *
    * Defines a template for a cell in edit mode. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
    * This cell type has an additional <b>cell.value</b> property available for binding. It contains the
    * original cell value before editing, and the updated value after editing.
    
    * For example, here is a template that uses the Wijmo @see:InputNumber control as an editor
    * for the "Sales" column:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'CellEdit'"&gt;
    *     &lt;wj-input-number [(value)]="cell.value" [step]="1"&gt;&lt;/wj-input-number&gt;
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>ColumnHeader</b>
    *
    * Defines a template for a column header cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
    * For example, this template adds an image to the header of the "Country" column:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'ColumnHeader'" let-cell="cell"&gt;
    *     &lt;img src="resources/globe.png" /&gt;
    *       {&#8203;{cell.col.header}}
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>RowHeader</b>
    *
    * Defines a template for a row header cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
    * For example, this template shows row indices in the row headers:
    *
    * <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeader'" let-cell="cell"&gt;
    *     {&#8203;{cell.row.index + 1}}
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * Note that this template is applied to a row header cell, even if it is in a row that is
    * in edit mode. In order to provide an edit-mode version of a row header cell with alternate
    * content, define the <b>RowHeaderEdit</b> template.
    *
    * <b>RowHeaderEdit</b>
    *
    * Defines a template for a row header cell in edit mode. Must be a child of the
    * @see:wijmo/wijmo.angular2.grid.WjFlexGrid component. For example, this template shows dots in the header
    * of rows being edited:
    *
    * <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
    *     ...
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * Use the following <b>RowHeaderEdit</b> template to add the standard edit-mode indicator to cells where the <b>RowHeader</b> template
    * applies:
    *
    * <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'RowHeaderEdit'"&gt;
    *     {&#8203;{&amp;#x270e;}}
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * <b>TopLeft</b>
    *
    * Defines a template for the top left cell. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
    * For example, this template shows a down/right glyph in the top-left cell of the grid:
    *
    * <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'TopLeft'"&gt;
    *     &lt;span class="wj-glyph-down-right"&gt;&lt;/span&gt;
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * <b>GroupHeader</b>
    *
    * Defines a template for a group header cell in a @see:GroupRow, Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
    *
    * The <b>cell.row</b> property contains an instance of the <b>GroupRow</b> class. If the grouping comes
    * from @see:CollectionView, the <b>cell.item</b> property references the @see:CollectionViewGroup object.
    *
    * For example, this template uses a checkbox element as an expand/collapse toggle:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Country'" [binding]="'country'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'GroupHeader'" let-cell="cell"&gt;
    *     &lt;input type="checkbox" [(ngModel)]="cell.row.isCollapsed"/&gt;
    *     {&#8203;{cell.item.name}} ({&#8203;{cell.item.items.length}} items)
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>Group</b>
    *
    * Defines a template for a regular cell (not a group header) in a @see:GroupRow. Must be a child of the
    * @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component. This cell type has an additional <b>cell.value</b> property available for
    * binding. In cases where columns have the <b>aggregate</b> property specified, it contains the unformatted
    * aggregate value.
    *
    * For example, this template shows aggregate's value and kind for group row cells in the "Sales"
    * column:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'" [aggregate]="'Avg'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'Group'" let-cell="cell"&gt;
    *     Average: {&#8203;{cell.value | number:'1.0-0'}}
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>ColumnFooter</b>
    *
    * Defines a template for a regular cell in a <b>columnFooters</b> panel. Must be a child of the
    * @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component. This cell type has an additional <b>cell.value</b>
    * property available for binding that contains a cell value.
    *
    * For example, this template shows aggregate's value and kind for a footer cell in the "Sales"
    * column:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Sales'" [binding]="'sales'" [aggregate]="'Avg'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'ColumnFooter'" let-cell="cell"&gt;
    *     Average: {&#8203;{cell.value | number:'1.0-0'}}
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>BottomLeft</b>
    *
    * Defines a template for the bottom left cells (at the intersection of the row header and column footer cells).
    * Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
    * For example, this template shows a sigma glyph in the bottom-left cell of the grid:
    *
    * <pre>&lt;wj-flex-grid [itemsSource]="data"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'BottomLeft'"&gt;
    *     &amp;#931;
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * <b>NewCellTemplate</b>
    *
    * Defines a cell in a new row template. Must be a child of the @see:wijmo/wijmo.angular2.grid.WjFlexGridColumn component.
    * Note that the <b>cell.item</b> property is undefined for this type of a cell.
    * For example, this cell template shows a placeholder in the Date column's cell in the "new row" item:
    *
    * <pre>&lt;wj-flex-grid-column [header]="'Date'" [binding]="'date'"&gt;
    *   &lt;template wjFlexGridCellTemplate [cellType]="'NewCellTemplate'"&gt;
    *     Enter a date here
    *   &lt;/template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    */
    var WjFlexGridCellTemplate = /** @class */ (function () {
        function WjFlexGridCellTemplate(viewContainerRef, templateRef, elRef, parentCmp, domRenderer, injector, cdRef) {
            this.viewContainerRef = viewContainerRef;
            this.templateRef = templateRef;
            this.elRef = elRef;
            this.domRenderer = domRenderer;
            this.cdRef = cdRef;
            /**
            * Gets or sets a value indicating whether the cell template will increase grid's default row height
            * to accomodate cells content. Defaults to true.
            */
            this.autoSizeRows = true;
            /**
            * For cell edit templates, indicates whether cell editing forcibly starts in full edit mode,
            * regardless of how the editing was initiated. In full edit mode pressing cursor keys don't finish editing.
            * Defaults to true.
            */
            this.forceFullEdit = true;
            if (parentCmp instanceof WjFlexGrid) {
                this.grid = parentCmp;
            }
            else if (parentCmp instanceof WjFlexGridColumn) {
                this.column = parentCmp;
                this.grid = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getBehavior(parentCmp).parentBehavior.directive;
            }
        }
        WjFlexGridCellTemplate_1 = WjFlexGridCellTemplate;
        // returns the name of the property on control instance that stores info for the specified cell template type.
        WjFlexGridCellTemplate._getTemplContextProp = function (templateType) {
            return '$__cellTempl' + CellTemplateType[templateType];
        };
        WjFlexGridCellTemplate.prototype.ngOnInit = function () {
            this.ownerControl = this.column && this.column.grid === this.grid ? this.column : this.grid;
            this._attachToControl();
        };
        WjFlexGridCellTemplate.prototype.ngOnDestroy = function () {
            if (this.cellTypeStr) {
                this.viewContainerRef.clear();
                this.ownerControl[WjFlexGridCellTemplate_1._getTemplContextProp(this.cellType)] = null;
                this.grid.invalidate();
            }
        };
        WjFlexGridCellTemplate.prototype._instantiateTemplate = function (parent, dataContext) {
            return wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(parent, this.viewContainerRef, this.templateRef, this.domRenderer, false, dataContext);
        };
        WjFlexGridCellTemplate.prototype._attachToControl = function () {
            if (!this.cellTypeStr) {
                return;
            }
            var cellType = this.cellType = wijmo.asEnum(this.cellTypeStr, CellTemplateType), ownerControl = this.ownerControl;
            ownerControl[WjFlexGridCellTemplate_1._getTemplContextProp(cellType)] = this;
            // TBD: remove flag on dispose if possible
            if (ownerControl instanceof wijmo.grid.Column && (cellType === CellTemplateType.Cell ||
                cellType === CellTemplateType.ColumnHeader || cellType === CellTemplateType.ColumnFooter)) {
                ownerControl._setFlag(wijmo.grid.RowColFlags.HasTemplate, true);
            }
            this.grid.invalidate();
        };
        WjFlexGridCellTemplate = WjFlexGridCellTemplate_1 = __decorate([
            core_2.Directive({
                selector: '[wjFlexGridCellTemplate]',
                inputs: ['wjFlexGridCellTemplate', 'cellTypeStr: cellType', 'cellOverflow', 'valuePaths',
                    'autoSizeRows', 'forceFullEdit'],
                exportAs: 'wjFlexGridCellTemplate',
                providers: [{ provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridCellTemplate_1; }) }]
            }),
            __param(0, core_3.Inject(core_2.ViewContainerRef)),
            __param(1, core_3.Inject(core_2.TemplateRef)), __param(1, core_2.Optional()),
            __param(2, core_3.Inject(core_2.ElementRef)),
            __param(3, core_3.Inject('WjComponent')), __param(3, core_3.SkipSelf()), __param(3, core_2.Optional()),
            __param(4, core_3.Inject(core_2.Renderer)),
            __param(5, core_3.Inject(core_2.Injector)),
            __param(6, core_3.Inject(core_3.ChangeDetectorRef))
        ], WjFlexGridCellTemplate);
        return WjFlexGridCellTemplate;
        var WjFlexGridCellTemplate_1;
    }());
    exports.WjFlexGridCellTemplate = WjFlexGridCellTemplate;
    /**
    * Defines the type of cell on which a template is to be applied. This value is specified in the <b>cellType</b> attribute
    * of the @see:wijmo/wijmo.angular2.grid.WjFlexGridCellTemplate directive.
    */
    var CellTemplateType;
    (function (CellTemplateType) {
        /** Defines a regular (data) cell. */
        CellTemplateType[CellTemplateType["Cell"] = 0] = "Cell";
        /** Defines a cell in edit mode. */
        CellTemplateType[CellTemplateType["CellEdit"] = 1] = "CellEdit";
        /** Defines a column header cell. */
        CellTemplateType[CellTemplateType["ColumnHeader"] = 2] = "ColumnHeader";
        /** Defines a row header cell. */
        CellTemplateType[CellTemplateType["RowHeader"] = 3] = "RowHeader";
        /** Defines a row header cell in edit mode. */
        CellTemplateType[CellTemplateType["RowHeaderEdit"] = 4] = "RowHeaderEdit";
        /** Defines a top left cell. */
        CellTemplateType[CellTemplateType["TopLeft"] = 5] = "TopLeft";
        /** Defines a group header cell in a group row. */
        CellTemplateType[CellTemplateType["GroupHeader"] = 6] = "GroupHeader";
        /** Defines a regular cell in a group row. */
        CellTemplateType[CellTemplateType["Group"] = 7] = "Group";
        /** Defines a cell in a new row template. */
        CellTemplateType[CellTemplateType["NewCellTemplate"] = 8] = "NewCellTemplate";
        /** Defines a column footer cell. */
        CellTemplateType[CellTemplateType["ColumnFooter"] = 9] = "ColumnFooter";
        /** Defines a bottom left cell (at the intersection of the row header and column footer cells). **/
        CellTemplateType[CellTemplateType["BottomLeft"] = 10] = "BottomLeft";
    })(CellTemplateType = exports.CellTemplateType || (exports.CellTemplateType = {}));
    var DirectiveCellFactory = /** @class */ (function (_super) {
        __extends(DirectiveCellFactory, _super);
        function DirectiveCellFactory(grid, gridCdRef) {
            var _this = _super.call(this) || this;
            _this._needsCdCheck = false;
            _this._lastApplyTimeStamp = 0;
            _this._noApplyLag = false;
            _this._startingEditing = false;
            _this._cellStampCounter = 0;
            _this._composing = false;
            _this.grid = grid;
            _this._gridCdRef = gridCdRef;
            // init _templateTypes
            if (!DirectiveCellFactory._templateTypes) {
                DirectiveCellFactory._templateTypes = [];
                for (var templateType in CellTemplateType) {
                    if (isNaN(templateType)) {
                        DirectiveCellFactory._templateTypes.push(templateType);
                    }
                }
            }
            var self = _this;
            _this._baseCf = grid.cellFactory;
            grid.cellFactory = _this;
            // initialize input event dispatcher
            _this._evtInput = document.createEvent('HTMLEvents');
            _this._evtInput.initEvent('input', true, false);
            // initialize blur event dispatcher
            _this._evtBlur = document.createEvent('HTMLEvents');
            _this._evtBlur.initEvent('blur', false, false);
            // no $apply() lag while editing
            grid.prepareCellForEdit.addHandler(function (s, e) {
                self._noApplyLag = true;
            });
            grid.cellEditEnded.addHandler(function (s, e) {
                // If column has no cell edit template, clear _editChar buffer.
                if (e.range.col < 0 || e.range.col < grid.columns.length &&
                    !grid.columns[e.range.col][WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.CellEdit)]) {
                    self._editChar = null;
                }
                setTimeout(function () {
                    self._noApplyLag = false;
                }, 300);
            });
            grid.beginningEdit.addHandler(function (s, e) {
                self._startingEditing = true;
            });
            grid.hostElement.addEventListener('keydown', function (e) {
                self._startingEditing = false;
            }, true);
            grid.hostElement.addEventListener('keypress', function (e) {
                var char = e.charCode > 32 ? String.fromCharCode(e.charCode) : null;
                if (char) {
                    // Grid's _KeyboardHandler may receive 'keypress' before or after this handler (observed at least in IE,
                    // not clear why this happens). So both grid.activeEditor and _startingEditing (the latter is initialized in
                    // beginningEdit and cleared in 'keydown') participate in detecting whether this char has initialized a cell
                    // editing.
                    if (!grid.activeEditor || self._startingEditing) {
                        self._editChar = char;
                    }
                    else if (self._editChar) {
                        self._editChar += char;
                    }
                }
            }, true);
            grid.hostElement.addEventListener('compositionstart', function (e) {
                self._composing = true;
            }, true);
            grid.hostElement.addEventListener('compositionend', function (e) {
                self._composing = false;
            }, true);
            // If host component uses OnPush change detection, we need to markForCheck; otherwise,
            // cell template bindings will not be updated.
            grid.updatedView.addHandler(function () {
                if (_this._needsCdCheck) {
                    _this._needsCdCheck = false;
                    _this._gridCdRef.markForCheck();
                }
            }, _this);
            return _this;
        }
        DirectiveCellFactory.prototype.updateCell = function (panel, rowIndex, colIndex, cell, rng) {
            var _this = this;
            this._cellStampCounter = (this._cellStampCounter + 1) % 10000000;
            var cellStamp = cell[DirectiveCellFactory._cellStampProp] = this._cellStampCounter;
            // restore overflow for any cell
            if (cell.style.overflow) {
                cell.style.overflow = '';
            }
            var self = this, grid = panel.grid, editRange = grid.editRange, templateType, row = panel.rows[rowIndex], dataItem = row.dataItem, isGridCtx = false, needCellValue = false, isEdit = false, isCvGroup = false;
            // determine template type
            switch (panel.cellType) {
                case wijmo.grid.CellType.Cell:
                    if (editRange && editRange.row === rowIndex && editRange.col === colIndex) {
                        templateType = CellTemplateType.CellEdit;
                        needCellValue = isEdit = true;
                    }
                    else if (row instanceof wijmo.grid.GroupRow) {
                        isCvGroup = dataItem instanceof wijmo.collections.CollectionViewGroup;
                        var isHierNonGroup = !(isCvGroup || row.hasChildren);
                        if (colIndex == panel.columns.firstVisibleIndex) {
                            templateType = isHierNonGroup ? CellTemplateType.Cell : CellTemplateType.GroupHeader;
                        }
                        else {
                            templateType = isHierNonGroup ? CellTemplateType.Cell : CellTemplateType.Group;
                            needCellValue = true;
                        }
                    }
                    else if (row instanceof wijmo.grid._NewRowTemplate) {
                        templateType = CellTemplateType.NewCellTemplate;
                    }
                    else if (!(wijmo.grid.detail && wijmo.grid.detail.DetailRow &&
                        (row instanceof wijmo.grid.detail.DetailRow))) {
                        templateType = CellTemplateType.Cell;
                    }
                    break;
                case wijmo.grid.CellType.ColumnHeader:
                    templateType = CellTemplateType.ColumnHeader;
                    break;
                case wijmo.grid.CellType.RowHeader:
                    templateType = grid.collectionView &&
                        grid.collectionView.currentEditItem === dataItem
                        ? CellTemplateType.RowHeaderEdit
                        : CellTemplateType.RowHeader;
                    isGridCtx = true;
                    break;
                case wijmo.grid.CellType.TopLeft:
                    templateType = CellTemplateType.TopLeft;
                    isGridCtx = true;
                    break;
                case wijmo.grid.CellType.ColumnFooter:
                    templateType = CellTemplateType.ColumnFooter;
                    needCellValue = true;
                    break;
                case wijmo.grid.CellType.BottomLeft:
                    templateType = CellTemplateType.BottomLeft;
                    isGridCtx = true;
                    break;
            }
            var isUpdated = false;
            if (templateType != null) {
                var col = (isCvGroup && templateType == CellTemplateType.GroupHeader ?
                    grid.columns.getColumn(dataItem.groupDescription['propertyName']) :
                    (colIndex >= 0 && colIndex < panel.columns.length ? panel.columns[colIndex] : null));
                if (col) {
                    var templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType), templContext = (isGridCtx ? grid : col)[templContextProp];
                    // maintain template inheritance
                    if (!templContext) {
                        if (templateType === CellTemplateType.RowHeaderEdit) {
                            templateType = CellTemplateType.RowHeader;
                            templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType);
                            templContext = grid[templContextProp];
                        }
                        else if (templateType === CellTemplateType.Group || templateType === CellTemplateType.GroupHeader) {
                            if (!isCvGroup) {
                                templateType = CellTemplateType.Cell;
                                templContextProp = WjFlexGridCellTemplate._getTemplContextProp(templateType);
                                templContext = col[templContextProp];
                            }
                        }
                    }
                    if (templContext) {
                        // apply directive template and style
                        var isTpl = true, cellValue;
                        if (needCellValue) {
                            cellValue = panel.getCellData(rowIndex, colIndex, false);
                        }
                        // apply cell template
                        if (isTpl) {
                            isUpdated = true;
                            var measureAttr = cell.getAttribute(wijmo.grid.FlexGrid._WJS_MEASURE), isMeasuring = measureAttr && measureAttr.toLowerCase() === 'true';
                            if (isEdit) {
                                this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng, true);
                            }
                            // if this is false then we can't reuse previously cached scope and linked tree.
                            var cellContext_1 = (cell[templContextProp] || {}), isForeignCell = cellContext_1.column !== col || !cellContext_1.viewRef ||
                                cellContext_1.templateContextProperty !== templContextProp ||
                                cell.firstChild != cellContext_1.rootElement, isImeInput_1 = isEdit && this._composing && grid.imeEnabled;
                            var cellInfo_1;
                            if (isForeignCell) {
                                if (isEdit) {
                                    var rootEl = cell.firstElementChild;
                                    if (rootEl) {
                                        // set focus to cell, because hiding a focused element may move focus to a page body
                                        // that will force Grid to finish editing.
                                        if (!isImeInput_1) {
                                            cell.focus();
                                        }
                                        rootEl.style.display = 'none';
                                    }
                                }
                                else {
                                    cell.textContent = '';
                                }
                                this._doDisposeCell(cell);
                                var vrContext = {};
                                cellInfo_1 = this._setViewRefContext(vrContext, row, col, dataItem, cellValue, templContext.valuePaths);
                                var templInstance = templContext._instantiateTemplate(cell, vrContext);
                                cellContext_1.column = col;
                                cellContext_1.viewRef = templInstance.viewRef;
                                cellContext_1.rootElement = templInstance.rootElement;
                                cellContext_1.templateContextProperty = templContextProp;
                                cell[templContextProp] = cellContext_1;
                            }
                            else {
                                cellInfo_1 = this._setViewRefContext(cellContext_1.viewRef.context, row, col, dataItem, cellValue, templContext.valuePaths);
                            }
                            if (templContext.cellOverflow) {
                                cell.style.overflow = templContext.cellOverflow;
                            }
                            if (isMeasuring) {
                                //force local template 'cell' var values to be applied immediately
                                templContext.cdRef.detectChanges();
                            }
                            else if (templContext.autoSizeRows && !isImeInput_1) {
                                // increase row height if cell doesn't fit in the current row height.
                                setTimeout(function () {
                                    // ignore the cell if it is already obsolete at this moment
                                    if (cellStamp !== cell[DirectiveCellFactory._cellStampProp]) {
                                        return;
                                    }
                                    var cellHeight = cell.scrollHeight, panelRows = panel.rows, rowSpan = rng && rng.rowSpan || 1;
                                    // TBD: it's not clear why we need (cellHeight - 1), but without it may get to an 
                                    // infinite loop. It's not the issue in Ng2 Explorer.
                                    if (rowIndex < panelRows.length &&
                                        (panelRows[rowIndex].renderHeight * rowSpan) < (cellHeight - 1)) {
                                        panelRows.defaultSize = cellHeight / rowSpan;
                                        if (isEdit) {
                                            var isFullEdit = self._isFullEdit();
                                            grid.refresh();
                                            grid.startEditing(isFullEdit);
                                            return;
                                        }
                                    }
                                    else if (isEdit) {
                                        _this._initEditInput(cellContext_1, templContext, null);
                                    }
                                    ;
                                }, 0);
                            }
                            else if (isEdit) {
                                setTimeout(function () {
                                    if (isImeInput_1) {
                                        _this._initImeEditInput(cellContext_1, templContext);
                                    }
                                    else {
                                        _this._initEditInput(cellContext_1, templContext, null);
                                    }
                                }, 0);
                            }
                            if (isEdit) {
                                self._cellEditorVars = cellInfo_1.localVars;
                                var editEndingEH = function (s, e) {
                                    grid.cellEditEnding.removeHandler(editEndingEH);
                                    // Move focus out of the current input element, in order to let it to save
                                    // its value (necessary for controls like InputDate that can't update value immediately
                                    // as user typing).
                                    // We do it via event emulation, instead of moving focus to another element,
                                    // because in IE an element doesn't fit in time to receive the 'blur' event.
                                    if (!e.stayInEditMode) {
                                        var activeElement = wijmo.getActiveElement();
                                        if (activeElement) {
                                            activeElement.dispatchEvent(self._evtBlur);
                                        }
                                        // We need to move focus nevertheless, because without this grid may lose focus at all in IE.
                                        cell.focus();
                                    }
                                    self._triggerEditorEvents(cell);
                                    if (!(e.cancel || e.stayInEditMode)) {
                                        //e.cancel = true;
                                        var cellVar = cellInfo_1.localVars, 
                                        //newVal = cellVar.value,
                                        bindNames = Object.getOwnPropertyNames(cellInfo_1.bindings);
                                        // set cell value
                                        //panel.grid.setCellData(rowIndex, colIndex, newVal);
                                        // set values for valuePaths
                                        for (var _i = 0, bindNames_1 = bindNames; _i < bindNames_1.length; _i++) {
                                            var curName = bindNames_1[_i];
                                            cellInfo_1.bindings[curName].setValue(cellVar, cellInfo_1.localVars.values[curName]);
                                        }
                                    }
                                    // close all open dropdowns 
                                    var dropDowns = cell.querySelectorAll('.wj-dropdown');
                                    [].forEach.call(dropDowns, function (el) {
                                        var ctrl = wijmo.Control.getControl(el);
                                        if (ctrl && wijmo.input && ctrl instanceof wijmo.input.DropDown) {
                                            ctrl.isDroppedDown = false;
                                        }
                                    });
                                };
                                var editEndedEH_1 = function (s, e) {
                                    grid.cellEditEnded.removeHandler(editEndedEH_1);
                                    self._cellEditorVars = null;
                                };
                                // subscribe the handler to the cellEditEnding event
                                grid.cellEditEnding.addHandler(editEndingEH);
                                grid.cellEditEnded.addHandler(editEndedEH_1);
                            }
                            else {
                                this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng, false);
                            }
                        }
                    }
                }
            }
            if (!isUpdated) {
                this._doDisposeCell(cell);
                this._baseCf.updateCell(panel, rowIndex, colIndex, cell, rng);
            }
        };
        DirectiveCellFactory.prototype.getEditorValue = function (g) {
            if (this._cellEditorVars) {
                // trigger all pending async events in the child Wijmo controls immediately
                var editRange = g.editRange;
                if (editRange && editRange.isValid) {
                    this._triggerEditorEvents(g.cells.getCellElement(editRange.row, editRange.col));
                }
                return this._cellEditorVars.value;
            }
            else {
                return _super.prototype.getEditorValue.call(this, g);
            }
        };
        DirectiveCellFactory.prototype.disposeCell = function (cell) {
            this._doDisposeCell(cell);
        };
        DirectiveCellFactory.prototype._doDisposeCell = function (cell) {
            var ttm = DirectiveCellFactory._templateTypes;
            for (var i = 0; i < ttm.length; i++) {
                var templContextProp = WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[ttm[i]]), cellContext = (cell[templContextProp]);
                if (cellContext && cellContext.viewRef) {
                    var templateOwner = cellContext.column || this.grid, templateContext = templateOwner[templContextProp];
                    if (templateContext) {
                        var viewIdx = templateContext.viewContainerRef.indexOf(cellContext.viewRef);
                        if (viewIdx > -1) {
                            templateContext.viewContainerRef.remove(viewIdx);
                        }
                    }
                    cellContext.viewRef = null;
                    cellContext.rootElement = null;
                    cellContext.column = null;
                    cellContext.templateContextProperty = null;
                    cell[templContextProp] = null;
                }
            }
        };
        DirectiveCellFactory.prototype._setViewRefContext = function (context, row, col, dataItem, cellValue, valuePaths) {
            this._needsCdCheck = true;
            context.row = row;
            context.col = col;
            context.item = dataItem;
            var values = {}, 
            //cellCtx = { row: row, col: col, item: dataItem, value: cellValue, values: values },
            cellCtx = context.cell || {}, bindings = {}, ret = { localVars: cellCtx, bindings: bindings };
            cellCtx.row = row;
            cellCtx.col = col;
            cellCtx.item = dataItem;
            cellCtx.value = cellValue;
            cellCtx.values = values;
            if (valuePaths) {
                var pathNames = Object.getOwnPropertyNames(valuePaths);
                for (var _i = 0, pathNames_1 = pathNames; _i < pathNames_1.length; _i++) {
                    var pName = pathNames_1[_i];
                    var binding = new wijmo.Binding(valuePaths[pName]);
                    bindings[pName] = binding;
                    values[pName] = binding.getValue(cellCtx);
                }
            }
            if (context.cell !== cellCtx) {
                context.cell = cellCtx;
            }
            return ret;
        };
        // finds a first input element in the edit template and initializes it with a data typed by keyboard
        DirectiveCellFactory.prototype._initEditInput = function (cellContext, templContext, initialValue) {
            var _this = this;
            this._setFullEdit(templContext);
            var input = this._findInitialInput(cellContext);
            if (input) {
                var inpSt = window.getComputedStyle(input);
                if (inpSt.display !== 'none' && inpSt.visibility === 'visible') {
                    var inpFocusEh = function () {
                        input.removeEventListener('focus', inpFocusEh);
                        setTimeout(function () {
                            // at this moment control had to select the whole content
                            setTimeout(function () {
                                var value = initialValue != null ? initialValue : _this._editChar;
                                if (value) {
                                    var changeSelection = true;
                                    var caretPos_1 = input.selectionStart + value.length;
                                    input.value = value;
                                    _this._editChar = null;
                                    input.dispatchEvent(_this._evtInput);
                                    if (changeSelection) {
                                        setTimeout(function () {
                                            // at this moment control had to process 'input' event,
                                            // even if it happens asynchronously 
                                            setTimeout(function () {
                                                wijmo.setSelectionRange(input, Math.min(caretPos_1, input.value.length), input.value.length);
                                            }, 0);
                                        }, 0);
                                    }
                                }
                            }, 0);
                        }, 0);
                    };
                    input.addEventListener('focus', inpFocusEh);
                    input.focus();
                }
            }
        };
        DirectiveCellFactory.prototype._initImeEditInput = function (cellContext, templContext) {
            var _this = this;
            var imeEditor = wijmo.getActiveElement();
            if (imeEditor && (imeEditor instanceof HTMLInputElement) && wijmo.hasClass(imeEditor, 'wj-grid-ime')) {
                var compEndEh_1 = function (e) {
                    imeEditor.removeEventListener('compositionend', compEndEh_1);
                    wijmo.setCss(imeEditor, wijmo.grid._ImeHandler._cssHidden);
                    _this._initEditInput(cellContext, templContext, imeEditor.value);
                };
                imeEditor.addEventListener('compositionend', compEndEh_1);
                // position/size the editor
                var templateInput = this._findInitialInput(cellContext);
                if (templateInput) {
                    var tRect = templateInput.getBoundingClientRect(), imeRect = imeEditor.getBoundingClientRect(), imeStyle = window.getComputedStyle(imeEditor), imeStyleLeft = parseFloat(imeStyle.left), imeStyleTop = parseFloat(imeStyle.top);
                    wijmo.setCss(imeEditor, {
                        left: (imeStyleLeft + tRect.left - imeRect.left) + 'px',
                        top: (imeStyleTop + tRect.top - imeRect.top) + 'px',
                        width: tRect.width + 'px',
                        height: tRect.height + 'px'
                    });
                }
            }
        };
        DirectiveCellFactory.prototype._findInitialInput = function (cellContext) {
            var inputs = cellContext && cellContext.rootElement
                && cellContext.rootElement.querySelectorAll('input');
            if (inputs) {
                for (var i = 0; i < inputs.length; i++) {
                    var input = inputs[i], inpSt = window.getComputedStyle(input);
                    if (inpSt.display !== 'none' && inpSt.visibility === 'visible') {
                        return input;
                    }
                }
            }
            return null;
        };
        DirectiveCellFactory.prototype._triggerEditorEvents = function (editCell) {
            if (editCell) {
                var cellCtrlElements = editCell.querySelectorAll('.wj-control');
                for (var i = 0; i < cellCtrlElements.length; i++) {
                    var curCtrlElement = cellCtrlElements[i], ctrl = wijmo.Control.getControl(curCtrlElement);
                    if (ctrl) {
                        var behaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getBehavior(ctrl);
                        if (behaviour) {
                            behaviour.flushPendingEvents();
                        }
                    }
                }
            }
        };
        DirectiveCellFactory.prototype._isFullEdit = function () {
            var grid = this.grid;
            return !grid.activeEditor || grid._edtHdl._fullEdit;
        };
        DirectiveCellFactory.prototype._setFullEdit = function (templContext) {
            var grid = this.grid;
            if (templContext.forceFullEdit && grid.activeEditor) {
                grid._edtHdl._fullEdit = true;
            }
        };
        DirectiveCellFactory._cellStampProp = '__wjCellStamp';
        return DirectiveCellFactory;
    }(wijmo.grid.CellFactory));
    var moduleExports = [
        WjFlexGrid,
        WjFlexGridColumn,
        WjFlexGridCellTemplate
    ];
    var WjGridModule = /** @class */ (function () {
        function WjGridModule() {
        }
        WjGridModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjGridModule);
        return WjGridModule;
    }());
    exports.WjGridModule = WjGridModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.grid.filter</b> module.
*
* <b>wijmo.angular2.grid.filter</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjFilter from 'wijmo/wijmo.angular2.grid.filter';
* import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjFilter.WjFlexGridFilter],
*     template: `
*       &lt;wj-flex-grid [itemsSource]="data"&gt;
*           &lt;wj-flex-grid-filter [filterColumns]="['country', 'expenses']"&gt;&lt;/wj-flex-grid-filter&gt;
*       &lt;/wj-flex-grid&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.filter'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.grid.filter", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexGridFilterMeta = {
        selector: 'wj-flex-grid-filter',
        template: "",
        inputs: [
            'wjProperty',
            'showFilterIcons',
            'showSortButtons',
            'defaultFilterType',
            'filterColumns',
        ],
        outputs: [
            'initialized',
            'filterChangingNg: filterChanging',
            'filterChangedNg: filterChanged',
            'filterAppliedNg: filterApplied',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.filter.FlexGridFilter control.
     *
     * The <b>wj-flex-grid-filter</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.grid.WjFlexGrid component.
     *
     * Use the <b>wj-flex-grid-filter</b> component to add <b>FlexGridFilter</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexGridFilter</b> component is derived from the <b>FlexGridFilter</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexGridFilter = /** @class */ (function (_super) {
        __extends(WjFlexGridFilter, _super);
        function WjFlexGridFilter(elRef, injector, parentCmp) {
            var _this = _super.call(this, parentCmp) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexGridFilter_1 = WjFlexGridFilter;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexGridFilter.prototype.created = function () {
        };
        WjFlexGridFilter.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexGridFilter.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexGridFilter.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexGridFilter.meta = {
            outputs: exports.wjFlexGridFilterMeta.outputs,
        };
        WjFlexGridFilter = WjFlexGridFilter_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexGridFilterMeta.selector,
                template: exports.wjFlexGridFilterMeta.template,
                inputs: exports.wjFlexGridFilterMeta.inputs,
                outputs: exports.wjFlexGridFilterMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridFilter_1; }) }
                ].concat(exports.wjFlexGridFilterMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexGridFilter);
        return WjFlexGridFilter;
        var WjFlexGridFilter_1;
    }(wijmo.grid.filter.FlexGridFilter));
    exports.WjFlexGridFilter = WjFlexGridFilter;
    var moduleExports = [
        WjFlexGridFilter
    ];
    var WjGridFilterModule = /** @class */ (function () {
        function WjGridFilterModule() {
        }
        WjGridFilterModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjGridFilterModule);
        return WjGridFilterModule;
    }());
    exports.WjGridFilterModule = WjGridFilterModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.grid.grouppanel</b> module.
*
* <b>wijmo.angular2.grid.grouppanel</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjPanel from 'wijmo/wijmo.angular2.grid.grouppanel';
* import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjPanel.WjGroupPanel],
*     template: `
*       &lt;wj-group-panel
*           [grid]="flex"
*           [placeholder]="'Drag columns here to create groups.'"&gt;
*       &lt;/wj-group-panel&gt;
*       &lt;wj-flex-grid #flex [itemsSource]="data"&gt;
*       &lt;/wj-flex-grid&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.grouppanel'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.grid.grouppanel", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjGroupPanelMeta = {
        selector: 'wj-group-panel',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'hideGroupedColumns',
            'maxGroups',
            'placeholder',
            'grid',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.grouppanel.GroupPanel control.
     *
     * Use the <b>wj-group-panel</b> component to add <b>GroupPanel</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjGroupPanel</b> component is derived from the <b>GroupPanel</b> control and
     * inherits all its properties, events and methods.
    */
    var WjGroupPanel = /** @class */ (function (_super) {
        __extends(WjGroupPanel, _super);
        function WjGroupPanel(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjGroupPanel_1 = WjGroupPanel;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjGroupPanel.prototype.created = function () {
        };
        WjGroupPanel.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjGroupPanel.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjGroupPanel.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjGroupPanel.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjGroupPanel.meta = {
            outputs: exports.wjGroupPanelMeta.outputs,
        };
        WjGroupPanel = WjGroupPanel_1 = __decorate([
            core_1.Component({
                selector: exports.wjGroupPanelMeta.selector,
                template: exports.wjGroupPanelMeta.template,
                inputs: exports.wjGroupPanelMeta.inputs,
                outputs: exports.wjGroupPanelMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjGroupPanel_1; }) }
                ].concat(exports.wjGroupPanelMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjGroupPanel);
        return WjGroupPanel;
        var WjGroupPanel_1;
    }(wijmo.grid.grouppanel.GroupPanel));
    exports.WjGroupPanel = WjGroupPanel;
    var moduleExports = [
        WjGroupPanel
    ];
    var WjGridGrouppanelModule = /** @class */ (function () {
        function WjGridGrouppanelModule() {
        }
        WjGridGrouppanelModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjGridGrouppanelModule);
        return WjGridGrouppanelModule;
    }());
    exports.WjGridGrouppanelModule = WjGridGrouppanelModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.grid.detail</b> module.
*
* <b>wijmo.angular2.grid.detail</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjDetail from 'wijmo/wijmo.angular2.grid.detail';
* import * as wjGrid from 'wijmo/wijmo.angular2.grid';
* &nbsp;
* &#64;Component({
*     directives: [wjGrid.WjFlexGrid, wjDetail.WjFlexGridDetail],
*     template: `
*       &lt;wj-flex-grid [itemsSource]="data"&gt;
*           &lt;template wjFlexGridDetail&gt;
*               Detail row content here...
*           &lt;/template&gt;
*       &lt;/wj-flex-grid&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.detail'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.grid.detail", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexGridDetailMeta = {
        selector: '[wjFlexGridDetail]',
        inputs: [
            'wjFlexGridDetail',
            'maxHeight',
            'detailVisibilityMode',
            'rowHasDetail',
            'isAnimated',
        ],
        outputs: [
            'initialized',
        ],
        exportAs: 'wjFlexGridDetail',
        providers: []
    };
    /**
        * Angular 2 directive for @see:FlexGrid @see:DetailRow templates.
        *
        * The <b>wj-flex-grid-detail</b> directive must be specified on a <b>&lt;template&gt;</b>
        * template element contained in a <b>wj-flex-grid</b> component.
        *
        * The <b>wj-flex-grid-detail</b> directive is derived from the @see:FlexGridDetailProvider
        * class that maintains detail rows visibility, with detail rows content defined as
        * an arbitrary HTML fragment within the directive tag. The fragment may contain
        * Angular 2 bindings, components and directives.
        * The <b>row</b> and
        * <b>item</b> template variables can be used in Angular 2 bindings that refer to
        * the detail row's parent @see:Row and <b>Row.dataItem</b> objects.
        *
        */
    var WjFlexGridDetail = /** @class */ (function (_super) {
        __extends(WjFlexGridDetail, _super);
        function WjFlexGridDetail(elRef, injector, parentCmp, viewContainerRef, templateRef, domRenderer) {
            var _this = _super.call(this, parentCmp) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this._viewContainerRef = viewContainerRef;
            _this._templateRef = templateRef;
            _this._domRenderer = domRenderer;
            _this._init();
            _this.created();
            return _this;
        }
        WjFlexGridDetail_1 = WjFlexGridDetail;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexGridDetail.prototype.created = function () {
        };
        WjFlexGridDetail.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexGridDetail.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexGridDetail.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexGridDetail.prototype._init = function () {
            var _this = this;
            // show detail when asked to
            this.createDetailCell = function (row, col) {
                var templ = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(_this.grid.hostElement, _this._viewContainerRef, _this._templateRef, _this._domRenderer), viewRef = templ.viewRef, templRoot = templ.rootElement;
                //viewRef.setLocal('row', row);
                //viewRef.setLocal('col', col);
                //viewRef.setLocal('item', row.dataItem);
                viewRef.context.row = row;
                viewRef.context.col = col;
                viewRef.context.item = row.dataItem;
                templRoot.parentElement.removeChild(templRoot);
                templRoot[WjFlexGridDetail_1._viewRefProp] = viewRef;
                return templRoot;
            };
            // dispose detail scope when asked to
            this.disposeDetailCell = function (row) {
                var viewRef;
                if (row.detail && (viewRef = row.detail[WjFlexGridDetail_1._viewRefProp])) {
                    row.detail[WjFlexGridDetail_1._viewRefProp] = null;
                    var idx = _this._viewContainerRef.indexOf(viewRef);
                    if (idx > -1) {
                        _this._viewContainerRef.remove(idx);
                    }
                }
            };
        };
        WjFlexGridDetail._viewRefProp = '__wj_viewRef';
        WjFlexGridDetail.meta = {
            outputs: exports.wjFlexGridDetailMeta.outputs,
        };
        WjFlexGridDetail = WjFlexGridDetail_1 = __decorate([
            core_2.Directive({
                selector: exports.wjFlexGridDetailMeta.selector,
                inputs: exports.wjFlexGridDetailMeta.inputs,
                outputs: exports.wjFlexGridDetailMeta.outputs,
                exportAs: exports.wjFlexGridDetailMeta.exportAs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexGridDetail_1; }) }
                ].concat(exports.wjFlexGridDetailMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
            __param(3, core_3.Inject(core_2.ViewContainerRef)),
            __param(4, core_3.Inject(core_2.TemplateRef)),
            __param(5, core_3.Inject(core_2.Renderer))
        ], WjFlexGridDetail);
        return WjFlexGridDetail;
        var WjFlexGridDetail_1;
    }(wijmo.grid.detail.FlexGridDetailProvider));
    exports.WjFlexGridDetail = WjFlexGridDetail;
    var moduleExports = [
        WjFlexGridDetail
    ];
    var WjGridDetailModule = /** @class */ (function () {
        function WjGridDetailModule() {
        }
        WjGridDetailModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjGridDetailModule);
        return WjGridDetailModule;
    }());
    exports.WjGridDetailModule = WjGridDetailModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.grid.multirow</b> module.
*
* <b>wijmo.angular2.grid.multirow</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjMultiRow from 'wijmo/wijmo.angular2.grid.multirow';
* &nbsp;
* &#64;Component({
*     directives: [wjMultiRow.WjMultiRow],
*     template: `&lt;wj-multi-row&gt;&lt;/wj-multi-row&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.multirow'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.grid.multirow", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjMultiRowMeta = {
        selector: 'wj-multi-row',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'newRowAtTop',
            'allowAddNew',
            'allowDelete',
            'allowDragging',
            'allowMerging',
            'allowResizing',
            'allowSorting',
            'autoSizeMode',
            'autoGenerateColumns',
            'childItemsPath',
            'groupHeaderFormat',
            'headersVisibility',
            'showSelectedHeaders',
            'showMarquee',
            'itemFormatter',
            'isReadOnly',
            'imeEnabled',
            'mergeManager',
            'selectionMode',
            'showGroups',
            'showSort',
            'showDropDown',
            'showAlternatingRows',
            'showErrors',
            'validateEdits',
            'treeIndent',
            'itemsSource',
            'autoClipboard',
            'frozenRows',
            'frozenColumns',
            'deferResizing',
            'sortRowIndex',
            'stickyHeaders',
            'preserveSelectedState',
            'preserveOutlineState',
            'keyActionTab',
            'keyActionEnter',
            'rowHeaderPath',
            'virtualizationThreshold',
            'layoutDefinition',
            'centerHeadersVertically',
            'collapsedHeaders',
            'showHeaderCollapseButton',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'beginningEditNg: beginningEdit',
            'cellEditEndedNg: cellEditEnded',
            'cellEditEndingNg: cellEditEnding',
            'prepareCellForEditNg: prepareCellForEdit',
            'formatItemNg: formatItem',
            'resizingColumnNg: resizingColumn',
            'resizedColumnNg: resizedColumn',
            'autoSizingColumnNg: autoSizingColumn',
            'autoSizedColumnNg: autoSizedColumn',
            'draggingColumnNg: draggingColumn',
            'draggingColumnOverNg: draggingColumnOver',
            'draggedColumnNg: draggedColumn',
            'sortingColumnNg: sortingColumn',
            'sortedColumnNg: sortedColumn',
            'resizingRowNg: resizingRow',
            'resizedRowNg: resizedRow',
            'autoSizingRowNg: autoSizingRow',
            'autoSizedRowNg: autoSizedRow',
            'draggingRowNg: draggingRow',
            'draggingRowOverNg: draggingRowOver',
            'draggedRowNg: draggedRow',
            'deletingRowNg: deletingRow',
            'deletedRowNg: deletedRow',
            'loadingRowsNg: loadingRows',
            'loadedRowsNg: loadedRows',
            'rowEditStartingNg: rowEditStarting',
            'rowEditStartedNg: rowEditStarted',
            'rowEditEndingNg: rowEditEnding',
            'rowEditEndedNg: rowEditEnded',
            'rowAddedNg: rowAdded',
            'groupCollapsedChangedNg: groupCollapsedChanged',
            'groupCollapsedChangingNg: groupCollapsedChanging',
            'itemsSourceChangedNg: itemsSourceChanged',
            'selectionChangingNg: selectionChanging',
            'selectionChangedNg: selectionChanged',
            'scrollPositionChangedNg: scrollPositionChanged',
            'updatingViewNg: updatingView',
            'updatedViewNg: updatedView',
            'updatingLayoutNg: updatingLayout',
            'updatedLayoutNg: updatedLayout',
            'pastingNg: pasting',
            'pastedNg: pasted',
            'pastingCellNg: pastingCell',
            'pastedCellNg: pastedCell',
            'copyingNg: copying',
            'copiedNg: copied',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.multirow.MultiRow control.
     *
     * Use the <b>wj-multi-row</b> component to add <b>MultiRow</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjMultiRow</b> component is derived from the <b>MultiRow</b> control and
     * inherits all its properties, events and methods.
    */
    var WjMultiRow = /** @class */ (function (_super) {
        __extends(WjMultiRow, _super);
        function WjMultiRow(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjMultiRow_1 = WjMultiRow;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjMultiRow.prototype.created = function () {
        };
        WjMultiRow.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjMultiRow.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjMultiRow.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjMultiRow.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjMultiRow.meta = {
            outputs: exports.wjMultiRowMeta.outputs,
        };
        WjMultiRow = WjMultiRow_1 = __decorate([
            core_1.Component({
                selector: exports.wjMultiRowMeta.selector,
                template: exports.wjMultiRowMeta.template,
                inputs: exports.wjMultiRowMeta.inputs,
                outputs: exports.wjMultiRowMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMultiRow_1; }) }
                ].concat(exports.wjMultiRowMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjMultiRow);
        return WjMultiRow;
        var WjMultiRow_1;
    }(wijmo.grid.multirow.MultiRow));
    exports.WjMultiRow = WjMultiRow;
    var moduleExports = [
        WjMultiRow
    ];
    var WjGridMultirowModule = /** @class */ (function () {
        function WjGridMultirowModule() {
        }
        WjGridMultirowModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjGridMultirowModule);
        return WjGridMultirowModule;
    }());
    exports.WjGridMultirowModule = WjGridMultirowModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.grid.sheet</b> module.
*
* <b>wijmo.angular2.grid.sheet</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjSheet from 'wijmo/wijmo.angular2.grid.sheet';
* &nbsp;
* &#64;Component({
*     directives: [wjSheet.WjFlexSheet],
*     template: `&lt;wj-flex-sheet&gt;&lt;/wj-flex-sheet&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.grid.sheet'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.grid.sheet", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexSheetMeta = {
        selector: 'wj-flex-sheet',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'newRowAtTop',
            'allowAddNew',
            'allowDelete',
            'allowDragging',
            'allowMerging',
            'allowResizing',
            'allowSorting',
            'autoSizeMode',
            'autoGenerateColumns',
            'childItemsPath',
            'groupHeaderFormat',
            'headersVisibility',
            'showSelectedHeaders',
            'showMarquee',
            'itemFormatter',
            'isReadOnly',
            'imeEnabled',
            'mergeManager',
            'selectionMode',
            'showGroups',
            'showSort',
            'showDropDown',
            'showAlternatingRows',
            'showErrors',
            'validateEdits',
            'treeIndent',
            'itemsSource',
            'autoClipboard',
            'frozenRows',
            'frozenColumns',
            'deferResizing',
            'sortRowIndex',
            'stickyHeaders',
            'preserveSelectedState',
            'preserveOutlineState',
            'keyActionTab',
            'keyActionEnter',
            'rowHeaderPath',
            'virtualizationThreshold',
            'isTabHolderVisible',
            'selectedSheetIndex',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'beginningEditNg: beginningEdit',
            'cellEditEndedNg: cellEditEnded',
            'cellEditEndingNg: cellEditEnding',
            'prepareCellForEditNg: prepareCellForEdit',
            'formatItemNg: formatItem',
            'resizingColumnNg: resizingColumn',
            'resizedColumnNg: resizedColumn',
            'autoSizingColumnNg: autoSizingColumn',
            'autoSizedColumnNg: autoSizedColumn',
            'draggingColumnNg: draggingColumn',
            'draggingColumnOverNg: draggingColumnOver',
            'draggedColumnNg: draggedColumn',
            'sortingColumnNg: sortingColumn',
            'sortedColumnNg: sortedColumn',
            'resizingRowNg: resizingRow',
            'resizedRowNg: resizedRow',
            'autoSizingRowNg: autoSizingRow',
            'autoSizedRowNg: autoSizedRow',
            'draggingRowNg: draggingRow',
            'draggingRowOverNg: draggingRowOver',
            'draggedRowNg: draggedRow',
            'deletingRowNg: deletingRow',
            'deletedRowNg: deletedRow',
            'loadingRowsNg: loadingRows',
            'loadedRowsNg: loadedRows',
            'rowEditStartingNg: rowEditStarting',
            'rowEditStartedNg: rowEditStarted',
            'rowEditEndingNg: rowEditEnding',
            'rowEditEndedNg: rowEditEnded',
            'rowAddedNg: rowAdded',
            'groupCollapsedChangedNg: groupCollapsedChanged',
            'groupCollapsedChangingNg: groupCollapsedChanging',
            'itemsSourceChangedNg: itemsSourceChanged',
            'selectionChangingNg: selectionChanging',
            'selectionChangedNg: selectionChanged',
            'scrollPositionChangedNg: scrollPositionChanged',
            'updatingViewNg: updatingView',
            'updatedViewNg: updatedView',
            'updatingLayoutNg: updatingLayout',
            'updatedLayoutNg: updatedLayout',
            'pastingNg: pasting',
            'pastedNg: pasted',
            'pastingCellNg: pastingCell',
            'pastedCellNg: pastedCell',
            'copyingNg: copying',
            'copiedNg: copied',
            'selectedSheetChangedNg: selectedSheetChanged',
            'selectedSheetIndexChangePC: selectedSheetIndexChange',
            'draggingRowColumnNg: draggingRowColumn',
            'droppingRowColumnNg: droppingRowColumn',
            'loadedNg: loaded',
            'unknownFunctionNg: unknownFunction',
            'sheetClearedNg: sheetCleared',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.sheet.FlexSheet control.
     *
     * Use the <b>wj-flex-sheet</b> component to add <b>FlexSheet</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexSheet</b> component is derived from the <b>FlexSheet</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-sheet</b> component may contain a @see:wijmo/wijmo.angular2.grid.sheet.WjSheet child component.
    */
    var WjFlexSheet = /** @class */ (function (_super) {
        __extends(WjFlexSheet, _super);
        function WjFlexSheet(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexSheet_1 = WjFlexSheet;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexSheet.prototype.created = function () {
        };
        WjFlexSheet.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexSheet.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexSheet.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexSheet.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjFlexSheet.meta = {
            outputs: exports.wjFlexSheetMeta.outputs,
            changeEvents: {
                'selectedSheetChanged': ['selectedSheetIndex']
            },
        };
        WjFlexSheet = WjFlexSheet_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexSheetMeta.selector,
                template: exports.wjFlexSheetMeta.template,
                inputs: exports.wjFlexSheetMeta.inputs,
                outputs: exports.wjFlexSheetMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexSheet_1; }) }
                ].concat(exports.wjFlexSheetMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexSheet);
        return WjFlexSheet;
        var WjFlexSheet_1;
    }(wijmo.grid.sheet.FlexSheet));
    exports.WjFlexSheet = WjFlexSheet;
    exports.wjSheetMeta = {
        selector: 'wj-sheet',
        template: "",
        inputs: [
            'wjProperty',
            'name',
            'itemsSource',
            'visible',
            'rowCount',
            'columnCount',
        ],
        outputs: [
            'initialized',
            'nameChangedNg: nameChanged',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.grid.sheet.Sheet control.
     *
     * The <b>wj-sheet</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.grid.sheet.WjFlexSheet component.
     *
     * Use the <b>wj-sheet</b> component to add <b>Sheet</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjSheet</b> component is derived from the <b>Sheet</b> control and
     * inherits all its properties, events and methods.
    */
    var WjSheet = /** @class */ (function (_super) {
        __extends(WjSheet, _super);
        function WjSheet(elRef, injector, parentCmp) {
            var _this = _super.call(this, parentCmp) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this._flexSheet = parentCmp;
            _this.created();
            return _this;
        }
        WjSheet_1 = WjSheet;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjSheet.prototype.created = function () {
        };
        WjSheet.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
            //TBD: it should add itself to FlexSheet
            if (this.itemsSource) {
                return this._flexSheet.addBoundSheet(this.name, this.itemsSource);
            }
            else {
                return this._flexSheet.addUnboundSheet(this.name, this.boundRowCount != null ? +this.boundRowCount : null, this.boundColumnCount != null ? +this.boundColumnCount : null);
            }
        };
        WjSheet.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjSheet.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjSheet.prototype.ngOnChanges = function (changes) {
            var chg;
            if ((chg = changes['rowCount']) && chg.isFirstChange) {
                this.boundRowCount = chg.currentValue;
            }
            if ((chg = changes['columnCount']) && chg.isFirstChange) {
                this.boundColumnCount = chg.currentValue;
            }
        };
        WjSheet.meta = {
            outputs: exports.wjSheetMeta.outputs,
        };
        WjSheet = WjSheet_1 = __decorate([
            core_1.Component({
                selector: exports.wjSheetMeta.selector,
                template: exports.wjSheetMeta.template,
                inputs: exports.wjSheetMeta.inputs,
                outputs: exports.wjSheetMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjSheet_1; }) }
                ].concat(exports.wjSheetMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjSheet);
        return WjSheet;
        var WjSheet_1;
    }(wijmo.grid.sheet.Sheet));
    exports.WjSheet = WjSheet;
    var moduleExports = [
        WjFlexSheet,
        WjSheet
    ];
    var WjGridSheetModule = /** @class */ (function () {
        function WjGridSheetModule() {
        }
        WjGridSheetModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjGridSheetModule);
        return WjGridSheetModule;
    }());
    exports.WjGridSheetModule = WjGridSheetModule;
});

///<wijmo-soft-import from="wijmo.chart.finance"/>
///<wijmo-soft-import from="wijmo.chart.analytics"/>
///<wijmo-soft-import from="wijmo.chart.animation"/>
///<wijmo-soft-import from="wijmo.chart.annotation"/>
///<wijmo-soft-import from="wijmo.chart.finance.analytics"/>
///<wijmo-soft-import from="wijmo.chart.hierarchical"/>
///<wijmo-soft-import from="wijmo.chart.interaction"/>
///<wijmo-soft-import from="wijmo.chart.radar"/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.chart", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartMeta = {
        selector: 'wj-flex-chart',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'binding',
            'footer',
            'header',
            'selectionMode',
            'palette',
            'plotMargin',
            'footerStyle',
            'headerStyle',
            'tooltipContent',
            'itemsSource',
            'bindingX',
            'interpolateNulls',
            'legendToggle',
            'symbolSize',
            'options',
            'selection',
            'itemFormatter',
            'labelContent',
            'chartType',
            'rotated',
            'stacking',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'selectionChangedNg: selectionChanged',
            'selectionChangePC: selectionChange',
            'seriesVisibilityChangedNg: seriesVisibilityChanged',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.FlexChart control.
     *
     * Use the <b>wj-flex-chart</b> component to add <b>FlexChart</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChart</b> component is derived from the <b>FlexChart</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartTrendLine
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartMovingAverage
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartYFunctionSeries
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartParametricFunctionSeries
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartWaterfall
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartBoxWhisker
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartErrorBar
     * , @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer
     * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartRangeSelector
     * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartGestures
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartDataLabel
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartSeries
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLineMarker
     *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartPlotArea.
    */
    var WjFlexChart = /** @class */ (function (_super) {
        __extends(WjFlexChart, _super);
        function WjFlexChart(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChart_1 = WjFlexChart;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChart.prototype.created = function () {
        };
        WjFlexChart.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChart.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChart.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChart.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        Object.defineProperty(WjFlexChart.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjFlexChart.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        WjFlexChart.meta = {
            outputs: exports.wjFlexChartMeta.outputs,
            changeEvents: {
                'selectionChanged': ['selection']
            },
        };
        WjFlexChart = WjFlexChart_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartMeta.selector,
                template: exports.wjFlexChartMeta.template,
                inputs: exports.wjFlexChartMeta.inputs,
                outputs: exports.wjFlexChartMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChart_1; }) }
                ].concat(exports.wjFlexChartMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChart);
        return WjFlexChart;
        var WjFlexChart_1;
    }(wijmo.chart.FlexChart));
    exports.WjFlexChart = WjFlexChart;
    exports.wjFlexPieMeta = {
        selector: 'wj-flex-pie',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'binding',
            'footer',
            'header',
            'selectionMode',
            'palette',
            'plotMargin',
            'footerStyle',
            'headerStyle',
            'tooltipContent',
            'itemsSource',
            'bindingName',
            'innerRadius',
            'isAnimated',
            'offset',
            'reversed',
            'startAngle',
            'selectedItemPosition',
            'selectedItemOffset',
            'itemFormatter',
            'labelContent',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'selectionChangedNg: selectionChanged',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.FlexPie control.
     *
     * Use the <b>wj-flex-pie</b> component to add <b>FlexPie</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexPie</b> component is derived from the <b>FlexPie</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-pie</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
     *  and @see:wijmo/wijmo.angular2.chart.WjFlexPieDataLabel.
    */
    var WjFlexPie = /** @class */ (function (_super) {
        __extends(WjFlexPie, _super);
        function WjFlexPie(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexPie_1 = WjFlexPie;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexPie.prototype.created = function () {
        };
        WjFlexPie.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexPie.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexPie.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexPie.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        Object.defineProperty(WjFlexPie.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjFlexPie.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        WjFlexPie.meta = {
            outputs: exports.wjFlexPieMeta.outputs,
        };
        WjFlexPie = WjFlexPie_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexPieMeta.selector,
                template: exports.wjFlexPieMeta.template,
                inputs: exports.wjFlexPieMeta.inputs,
                outputs: exports.wjFlexPieMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexPie_1; }) }
                ].concat(exports.wjFlexPieMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexPie);
        return WjFlexPie;
        var WjFlexPie_1;
    }(wijmo.chart.FlexPie));
    exports.WjFlexPie = WjFlexPie;
    exports.wjFlexChartAxisMeta = {
        selector: 'wj-flex-chart-axis',
        template: "",
        inputs: [
            'wjProperty',
            'axisLine',
            'format',
            'labels',
            'majorGrid',
            'majorTickMarks',
            'majorUnit',
            'max',
            'min',
            'position',
            'reversed',
            'title',
            'labelAngle',
            'minorGrid',
            'minorTickMarks',
            'minorUnit',
            'origin',
            'logBase',
            'plotArea',
            'labelAlign',
            'name',
            'overlappingLabels',
            'labelPadding',
            'itemFormatter',
            'itemsSource',
            'binding',
        ],
        outputs: [
            'initialized',
            'rangeChangedNg: rangeChanged',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.Axis control.
     *
     * The <b>wj-flex-chart-axis</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartSeries
     * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChartSeries.
     *
     * Use the <b>wj-flex-chart-axis</b> component to add <b>Axis</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartAxis</b> component is derived from the <b>Axis</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartAxis = /** @class */ (function (_super) {
        __extends(WjFlexChartAxis, _super);
        function WjFlexChartAxis(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'axes'.
             */
            _this.wjProperty = 'axes';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartAxis_1 = WjFlexChartAxis;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartAxis.prototype.created = function () {
        };
        WjFlexChartAxis.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAxis.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAxis.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartAxis.meta = {
            outputs: exports.wjFlexChartAxisMeta.outputs,
        };
        WjFlexChartAxis = WjFlexChartAxis_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartAxisMeta.selector,
                template: exports.wjFlexChartAxisMeta.template,
                inputs: exports.wjFlexChartAxisMeta.inputs,
                outputs: exports.wjFlexChartAxisMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAxis_1; }) }
                ].concat(exports.wjFlexChartAxisMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartAxis);
        return WjFlexChartAxis;
        var WjFlexChartAxis_1;
    }(wijmo.chart.Axis));
    exports.WjFlexChartAxis = WjFlexChartAxis;
    exports.wjFlexChartLegendMeta = {
        selector: 'wj-flex-chart-legend',
        template: "",
        inputs: [
            'wjProperty',
            'position',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.Legend control.
     *
     * The <b>wj-flex-chart-legend</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     * , @see:wijmo/wijmo.angular2.chart.WjFlexPie
     * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
     * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar
     *  or @see:wijmo/wijmo.angular2.chart.hierarchical.WjSunburst.
     *
     * Use the <b>wj-flex-chart-legend</b> component to add <b>Legend</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartLegend</b> component is derived from the <b>Legend</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartLegend = /** @class */ (function (_super) {
        __extends(WjFlexChartLegend, _super);
        function WjFlexChartLegend(elRef, injector, parentCmp) {
            var _this = _super.call(this, parentCmp) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'legend'.
             */
            _this.wjProperty = 'legend';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartLegend_1 = WjFlexChartLegend;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartLegend.prototype.created = function () {
        };
        WjFlexChartLegend.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartLegend.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartLegend.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartLegend.meta = {
            outputs: exports.wjFlexChartLegendMeta.outputs,
        };
        WjFlexChartLegend = WjFlexChartLegend_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartLegendMeta.selector,
                template: exports.wjFlexChartLegendMeta.template,
                inputs: exports.wjFlexChartLegendMeta.inputs,
                outputs: exports.wjFlexChartLegendMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartLegend_1; }) }
                ].concat(exports.wjFlexChartLegendMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartLegend);
        return WjFlexChartLegend;
        var WjFlexChartLegend_1;
    }(wijmo.chart.Legend));
    exports.WjFlexChartLegend = WjFlexChartLegend;
    exports.wjFlexChartDataLabelMeta = {
        selector: 'wj-flex-chart-data-label',
        template: "",
        inputs: [
            'wjProperty',
            'content',
            'border',
            'offset',
            'connectingLine',
            'position',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.DataLabel control.
     *
     * The <b>wj-flex-chart-data-label</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
     *
     * Use the <b>wj-flex-chart-data-label</b> component to add <b>DataLabel</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartDataLabel</b> component is derived from the <b>DataLabel</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartDataLabel = /** @class */ (function (_super) {
        __extends(WjFlexChartDataLabel, _super);
        function WjFlexChartDataLabel(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'dataLabel'.
             */
            _this.wjProperty = 'dataLabel';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartDataLabel_1 = WjFlexChartDataLabel;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartDataLabel.prototype.created = function () {
        };
        WjFlexChartDataLabel.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartDataLabel.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartDataLabel.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartDataLabel.meta = {
            outputs: exports.wjFlexChartDataLabelMeta.outputs,
        };
        WjFlexChartDataLabel = WjFlexChartDataLabel_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartDataLabelMeta.selector,
                template: exports.wjFlexChartDataLabelMeta.template,
                inputs: exports.wjFlexChartDataLabelMeta.inputs,
                outputs: exports.wjFlexChartDataLabelMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartDataLabel_1; }) }
                ].concat(exports.wjFlexChartDataLabelMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartDataLabel);
        return WjFlexChartDataLabel;
        var WjFlexChartDataLabel_1;
    }(wijmo.chart.DataLabel));
    exports.WjFlexChartDataLabel = WjFlexChartDataLabel;
    exports.wjFlexPieDataLabelMeta = {
        selector: 'wj-flex-pie-data-label',
        template: "",
        inputs: [
            'wjProperty',
            'content',
            'border',
            'offset',
            'connectingLine',
            'position',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.PieDataLabel control.
     *
     * The <b>wj-flex-pie-data-label</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexPie component.
     *
     * Use the <b>wj-flex-pie-data-label</b> component to add <b>PieDataLabel</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexPieDataLabel</b> component is derived from the <b>PieDataLabel</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexPieDataLabel = /** @class */ (function (_super) {
        __extends(WjFlexPieDataLabel, _super);
        function WjFlexPieDataLabel(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'dataLabel'.
             */
            _this.wjProperty = 'dataLabel';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexPieDataLabel_1 = WjFlexPieDataLabel;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexPieDataLabel.prototype.created = function () {
        };
        WjFlexPieDataLabel.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexPieDataLabel.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexPieDataLabel.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexPieDataLabel.meta = {
            outputs: exports.wjFlexPieDataLabelMeta.outputs,
        };
        WjFlexPieDataLabel = WjFlexPieDataLabel_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexPieDataLabelMeta.selector,
                template: exports.wjFlexPieDataLabelMeta.template,
                inputs: exports.wjFlexPieDataLabelMeta.inputs,
                outputs: exports.wjFlexPieDataLabelMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexPieDataLabel_1; }) }
                ].concat(exports.wjFlexPieDataLabelMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexPieDataLabel);
        return WjFlexPieDataLabel;
        var WjFlexPieDataLabel_1;
    }(wijmo.chart.PieDataLabel));
    exports.WjFlexPieDataLabel = WjFlexPieDataLabel;
    exports.wjFlexChartSeriesMeta = {
        selector: 'wj-flex-chart-series',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'chartType',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.Series control.
     *
     * The <b>wj-flex-chart-series</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
     *
     * Use the <b>wj-flex-chart-series</b> component to add <b>Series</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartSeries</b> component is derived from the <b>Series</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis child component.
    */
    var WjFlexChartSeries = /** @class */ (function (_super) {
        __extends(WjFlexChartSeries, _super);
        function WjFlexChartSeries(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartSeries_1 = WjFlexChartSeries;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartSeries.prototype.created = function () {
        };
        WjFlexChartSeries.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartSeries.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartSeries.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartSeries.meta = {
            outputs: exports.wjFlexChartSeriesMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartSeries = WjFlexChartSeries_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartSeriesMeta.selector,
                template: exports.wjFlexChartSeriesMeta.template,
                inputs: exports.wjFlexChartSeriesMeta.inputs,
                outputs: exports.wjFlexChartSeriesMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartSeries_1; }) }
                ].concat(exports.wjFlexChartSeriesMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartSeries);
        return WjFlexChartSeries;
        var WjFlexChartSeries_1;
    }(wijmo.chart.Series));
    exports.WjFlexChartSeries = WjFlexChartSeries;
    exports.wjFlexChartLineMarkerMeta = {
        selector: 'wj-flex-line-marker',
        template: "",
        inputs: [
            'wjProperty',
            'isVisible',
            'seriesIndex',
            'horizontalPosition',
            'content',
            'verticalPosition',
            'alignment',
            'lines',
            'interaction',
            'dragLines',
            'dragThreshold',
            'dragContent',
        ],
        outputs: [
            'initialized',
            'positionChangedNg: positionChanged',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.LineMarker control.
     *
     * The <b>wj-flex-line-marker</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-line-marker</b> component to add <b>LineMarker</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartLineMarker</b> component is derived from the <b>LineMarker</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartLineMarker = /** @class */ (function (_super) {
        __extends(WjFlexChartLineMarker, _super);
        function WjFlexChartLineMarker(elRef, injector, parentCmp) {
            var _this = _super.call(this, parentCmp) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartLineMarker_1 = WjFlexChartLineMarker;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartLineMarker.prototype.created = function () {
        };
        WjFlexChartLineMarker.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartLineMarker.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartLineMarker.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartLineMarker.meta = {
            outputs: exports.wjFlexChartLineMarkerMeta.outputs,
        };
        WjFlexChartLineMarker = WjFlexChartLineMarker_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartLineMarkerMeta.selector,
                template: exports.wjFlexChartLineMarkerMeta.template,
                inputs: exports.wjFlexChartLineMarkerMeta.inputs,
                outputs: exports.wjFlexChartLineMarkerMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartLineMarker_1; }) }
                ].concat(exports.wjFlexChartLineMarkerMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartLineMarker);
        return WjFlexChartLineMarker;
        var WjFlexChartLineMarker_1;
    }(wijmo.chart.LineMarker));
    exports.WjFlexChartLineMarker = WjFlexChartLineMarker;
    exports.wjFlexChartDataPointMeta = {
        selector: 'wj-flex-chart-data-point',
        template: "",
        inputs: [
            'wjProperty',
            'x',
            'y',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.DataPoint control.
     *
     * The <b>wj-flex-chart-data-point</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationText
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationEllipse
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationRectangle
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLine
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationPolygon
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationCircle
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationSquare
     *  or @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationImage.
     *
     * Use the <b>wj-flex-chart-data-point</b> component to add <b>DataPoint</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartDataPoint</b> component is derived from the <b>DataPoint</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartDataPoint = /** @class */ (function (_super) {
        __extends(WjFlexChartDataPoint, _super);
        function WjFlexChartDataPoint(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is ''.
             */
            _this.wjProperty = '';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartDataPoint_1 = WjFlexChartDataPoint;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartDataPoint.prototype.created = function () {
        };
        WjFlexChartDataPoint.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartDataPoint.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartDataPoint.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartDataPoint.meta = {
            outputs: exports.wjFlexChartDataPointMeta.outputs,
        };
        WjFlexChartDataPoint = WjFlexChartDataPoint_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartDataPointMeta.selector,
                template: exports.wjFlexChartDataPointMeta.template,
                inputs: exports.wjFlexChartDataPointMeta.inputs,
                outputs: exports.wjFlexChartDataPointMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartDataPoint_1; }) }
                ].concat(exports.wjFlexChartDataPointMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartDataPoint);
        return WjFlexChartDataPoint;
        var WjFlexChartDataPoint_1;
    }(wijmo.chart.DataPoint));
    exports.WjFlexChartDataPoint = WjFlexChartDataPoint;
    exports.wjFlexChartPlotAreaMeta = {
        selector: 'wj-flex-chart-plot-area',
        template: "",
        inputs: [
            'wjProperty',
            'column',
            'height',
            'name',
            'row',
            'style',
            'width',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.PlotArea control.
     *
     * The <b>wj-flex-chart-plot-area</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-plot-area</b> component to add <b>PlotArea</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartPlotArea</b> component is derived from the <b>PlotArea</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartPlotArea = /** @class */ (function (_super) {
        __extends(WjFlexChartPlotArea, _super);
        function WjFlexChartPlotArea(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'plotAreas'.
             */
            _this.wjProperty = 'plotAreas';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartPlotArea_1 = WjFlexChartPlotArea;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartPlotArea.prototype.created = function () {
        };
        WjFlexChartPlotArea.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartPlotArea.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartPlotArea.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartPlotArea.meta = {
            outputs: exports.wjFlexChartPlotAreaMeta.outputs,
        };
        WjFlexChartPlotArea = WjFlexChartPlotArea_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartPlotAreaMeta.selector,
                template: exports.wjFlexChartPlotAreaMeta.template,
                inputs: exports.wjFlexChartPlotAreaMeta.inputs,
                outputs: exports.wjFlexChartPlotAreaMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartPlotArea_1; }) }
                ].concat(exports.wjFlexChartPlotAreaMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartPlotArea);
        return WjFlexChartPlotArea;
        var WjFlexChartPlotArea_1;
    }(wijmo.chart.PlotArea));
    exports.WjFlexChartPlotArea = WjFlexChartPlotArea;
    var moduleExports = [
        WjFlexChart,
        WjFlexPie,
        WjFlexChartAxis,
        WjFlexChartLegend,
        WjFlexChartDataLabel,
        WjFlexPieDataLabel,
        WjFlexChartSeries,
        WjFlexChartLineMarker,
        WjFlexChartDataPoint,
        WjFlexChartPlotArea
    ];
    var WjChartModule = /** @class */ (function () {
        function WjChartModule() {
        }
        WjChartModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjChartModule);
        return WjChartModule;
    }());
    exports.WjChartModule = WjChartModule;
});

///<wijmo-soft-import from="wijmo.chart.finance"/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.chart.interaction", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartRangeSelectorMeta = {
        selector: 'wj-flex-chart-range-selector',
        template: "",
        inputs: [
            'wjProperty',
            'isVisible',
            'min',
            'max',
            'orientation',
            'seamless',
            'minScale',
            'maxScale',
        ],
        outputs: [
            'initialized',
            'rangeChangedNg: rangeChanged',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.interaction.RangeSelector control.
     *
     * The <b>wj-flex-chart-range-selector</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-range-selector</b> component to add <b>RangeSelector</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartRangeSelector</b> component is derived from the <b>RangeSelector</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartRangeSelector = /** @class */ (function (_super) {
        __extends(WjFlexChartRangeSelector, _super);
        function WjFlexChartRangeSelector(elRef, injector, parentCmp) {
            var _this = _super.call(this, parentCmp) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartRangeSelector_1 = WjFlexChartRangeSelector;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartRangeSelector.prototype.created = function () {
        };
        WjFlexChartRangeSelector.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartRangeSelector.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartRangeSelector.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartRangeSelector.meta = {
            outputs: exports.wjFlexChartRangeSelectorMeta.outputs,
        };
        WjFlexChartRangeSelector = WjFlexChartRangeSelector_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartRangeSelectorMeta.selector,
                template: exports.wjFlexChartRangeSelectorMeta.template,
                inputs: exports.wjFlexChartRangeSelectorMeta.inputs,
                outputs: exports.wjFlexChartRangeSelectorMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartRangeSelector_1; }) }
                ].concat(exports.wjFlexChartRangeSelectorMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartRangeSelector);
        return WjFlexChartRangeSelector;
        var WjFlexChartRangeSelector_1;
    }(wijmo.chart.interaction.RangeSelector));
    exports.WjFlexChartRangeSelector = WjFlexChartRangeSelector;
    exports.wjFlexChartGesturesMeta = {
        selector: 'wj-flex-chart-gestures',
        template: "",
        inputs: [
            'wjProperty',
            'mouseAction',
            'interactiveAxes',
            'enable',
            'scaleX',
            'scaleY',
            'posX',
            'posY',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.interaction.ChartGestures control.
     *
     * The <b>wj-flex-chart-gestures</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-gestures</b> component to add <b>ChartGestures</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartGestures</b> component is derived from the <b>ChartGestures</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartGestures = /** @class */ (function (_super) {
        __extends(WjFlexChartGestures, _super);
        function WjFlexChartGestures(elRef, injector, parentCmp) {
            var _this = _super.call(this, parentCmp) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartGestures_1 = WjFlexChartGestures;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartGestures.prototype.created = function () {
        };
        WjFlexChartGestures.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartGestures.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartGestures.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartGestures.meta = {
            outputs: exports.wjFlexChartGesturesMeta.outputs,
        };
        WjFlexChartGestures = WjFlexChartGestures_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartGesturesMeta.selector,
                template: exports.wjFlexChartGesturesMeta.template,
                inputs: exports.wjFlexChartGesturesMeta.inputs,
                outputs: exports.wjFlexChartGesturesMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartGestures_1; }) }
                ].concat(exports.wjFlexChartGesturesMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartGestures);
        return WjFlexChartGestures;
        var WjFlexChartGestures_1;
    }(wijmo.chart.interaction.ChartGestures));
    exports.WjFlexChartGestures = WjFlexChartGestures;
    var moduleExports = [
        WjFlexChartRangeSelector,
        WjFlexChartGestures
    ];
    var WjChartInteractionModule = /** @class */ (function () {
        function WjChartInteractionModule() {
        }
        WjChartInteractionModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjChartInteractionModule);
        return WjChartInteractionModule;
    }());
    exports.WjChartInteractionModule = WjChartInteractionModule;
});

///<wijmo-soft-import from="wijmo.chart.finance"/>
///<wijmo-soft-import from="wijmo.chart.radar"/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.chart.animation", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartAnimationMeta = {
        selector: 'wj-flex-chart-animation',
        template: "",
        inputs: [
            'wjProperty',
            'animationMode',
            'easing',
            'duration',
            'axisAnimation',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.animation.ChartAnimation control.
     *
     * The <b>wj-flex-chart-animation</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     * , @see:wijmo/wijmo.angular2.chart.WjFlexPie
     * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart
     *  or @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar.
     *
     * Use the <b>wj-flex-chart-animation</b> component to add <b>ChartAnimation</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartAnimation</b> component is derived from the <b>ChartAnimation</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartAnimation = /** @class */ (function (_super) {
        __extends(WjFlexChartAnimation, _super);
        function WjFlexChartAnimation(elRef, injector, parentCmp) {
            var _this = _super.call(this, parentCmp) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartAnimation_1 = WjFlexChartAnimation;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartAnimation.prototype.created = function () {
        };
        WjFlexChartAnimation.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnimation.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnimation.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartAnimation.meta = {
            outputs: exports.wjFlexChartAnimationMeta.outputs,
        };
        WjFlexChartAnimation = WjFlexChartAnimation_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartAnimationMeta.selector,
                template: exports.wjFlexChartAnimationMeta.template,
                inputs: exports.wjFlexChartAnimationMeta.inputs,
                outputs: exports.wjFlexChartAnimationMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnimation_1; }) }
                ].concat(exports.wjFlexChartAnimationMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartAnimation);
        return WjFlexChartAnimation;
        var WjFlexChartAnimation_1;
    }(wijmo.chart.animation.ChartAnimation));
    exports.WjFlexChartAnimation = WjFlexChartAnimation;
    var moduleExports = [
        WjFlexChartAnimation
    ];
    var WjChartAnimationModule = /** @class */ (function () {
        function WjChartAnimationModule() {
        }
        WjChartAnimationModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjChartAnimationModule);
        return WjChartAnimationModule;
    }());
    exports.WjChartAnimationModule = WjChartAnimationModule;
});

///<wijmo-soft-import from="wijmo.chart.finance"/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.chart.analytics", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartTrendLineMeta = {
        selector: 'wj-flex-chart-trend-line',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'sampleCount',
            'order',
            'fitType',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.TrendLine control.
     *
     * The <b>wj-flex-chart-trend-line</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-trend-line</b> component to add <b>TrendLine</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartTrendLine</b> component is derived from the <b>TrendLine</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartTrendLine = /** @class */ (function (_super) {
        __extends(WjFlexChartTrendLine, _super);
        function WjFlexChartTrendLine(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartTrendLine_1 = WjFlexChartTrendLine;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartTrendLine.prototype.created = function () {
        };
        WjFlexChartTrendLine.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartTrendLine.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartTrendLine.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartTrendLine.meta = {
            outputs: exports.wjFlexChartTrendLineMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartTrendLine = WjFlexChartTrendLine_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartTrendLineMeta.selector,
                template: exports.wjFlexChartTrendLineMeta.template,
                inputs: exports.wjFlexChartTrendLineMeta.inputs,
                outputs: exports.wjFlexChartTrendLineMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartTrendLine_1; }) }
                ].concat(exports.wjFlexChartTrendLineMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartTrendLine);
        return WjFlexChartTrendLine;
        var WjFlexChartTrendLine_1;
    }(wijmo.chart.analytics.TrendLine));
    exports.WjFlexChartTrendLine = WjFlexChartTrendLine;
    exports.wjFlexChartMovingAverageMeta = {
        selector: 'wj-flex-chart-moving-average',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'sampleCount',
            'period',
            'type',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.MovingAverage control.
     *
     * The <b>wj-flex-chart-moving-average</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-moving-average</b> component to add <b>MovingAverage</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartMovingAverage</b> component is derived from the <b>MovingAverage</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartMovingAverage = /** @class */ (function (_super) {
        __extends(WjFlexChartMovingAverage, _super);
        function WjFlexChartMovingAverage(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartMovingAverage_1 = WjFlexChartMovingAverage;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartMovingAverage.prototype.created = function () {
        };
        WjFlexChartMovingAverage.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartMovingAverage.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartMovingAverage.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartMovingAverage.meta = {
            outputs: exports.wjFlexChartMovingAverageMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartMovingAverage = WjFlexChartMovingAverage_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartMovingAverageMeta.selector,
                template: exports.wjFlexChartMovingAverageMeta.template,
                inputs: exports.wjFlexChartMovingAverageMeta.inputs,
                outputs: exports.wjFlexChartMovingAverageMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMovingAverage_1; }) }
                ].concat(exports.wjFlexChartMovingAverageMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartMovingAverage);
        return WjFlexChartMovingAverage;
        var WjFlexChartMovingAverage_1;
    }(wijmo.chart.analytics.MovingAverage));
    exports.WjFlexChartMovingAverage = WjFlexChartMovingAverage;
    exports.wjFlexChartYFunctionSeriesMeta = {
        selector: 'wj-flex-chart-y-function-series',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'sampleCount',
            'min',
            'max',
            'func',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.YFunctionSeries control.
     *
     * The <b>wj-flex-chart-y-function-series</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-y-function-series</b> component to add <b>YFunctionSeries</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartYFunctionSeries</b> component is derived from the <b>YFunctionSeries</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartYFunctionSeries = /** @class */ (function (_super) {
        __extends(WjFlexChartYFunctionSeries, _super);
        function WjFlexChartYFunctionSeries(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartYFunctionSeries_1 = WjFlexChartYFunctionSeries;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartYFunctionSeries.prototype.created = function () {
        };
        WjFlexChartYFunctionSeries.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartYFunctionSeries.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartYFunctionSeries.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartYFunctionSeries.meta = {
            outputs: exports.wjFlexChartYFunctionSeriesMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartYFunctionSeries = WjFlexChartYFunctionSeries_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartYFunctionSeriesMeta.selector,
                template: exports.wjFlexChartYFunctionSeriesMeta.template,
                inputs: exports.wjFlexChartYFunctionSeriesMeta.inputs,
                outputs: exports.wjFlexChartYFunctionSeriesMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartYFunctionSeries_1; }) }
                ].concat(exports.wjFlexChartYFunctionSeriesMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartYFunctionSeries);
        return WjFlexChartYFunctionSeries;
        var WjFlexChartYFunctionSeries_1;
    }(wijmo.chart.analytics.YFunctionSeries));
    exports.WjFlexChartYFunctionSeries = WjFlexChartYFunctionSeries;
    exports.wjFlexChartParametricFunctionSeriesMeta = {
        selector: 'wj-flex-chart-parametric-function-series',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'sampleCount',
            'min',
            'max',
            'func',
            'xFunc',
            'yFunc',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.ParametricFunctionSeries control.
     *
     * The <b>wj-flex-chart-parametric-function-series</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-parametric-function-series</b> component to add <b>ParametricFunctionSeries</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartParametricFunctionSeries</b> component is derived from the <b>ParametricFunctionSeries</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartParametricFunctionSeries = /** @class */ (function (_super) {
        __extends(WjFlexChartParametricFunctionSeries, _super);
        function WjFlexChartParametricFunctionSeries(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartParametricFunctionSeries_1 = WjFlexChartParametricFunctionSeries;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartParametricFunctionSeries.prototype.created = function () {
        };
        WjFlexChartParametricFunctionSeries.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartParametricFunctionSeries.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartParametricFunctionSeries.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartParametricFunctionSeries.meta = {
            outputs: exports.wjFlexChartParametricFunctionSeriesMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartParametricFunctionSeries = WjFlexChartParametricFunctionSeries_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartParametricFunctionSeriesMeta.selector,
                template: exports.wjFlexChartParametricFunctionSeriesMeta.template,
                inputs: exports.wjFlexChartParametricFunctionSeriesMeta.inputs,
                outputs: exports.wjFlexChartParametricFunctionSeriesMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartParametricFunctionSeries_1; }) }
                ].concat(exports.wjFlexChartParametricFunctionSeriesMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartParametricFunctionSeries);
        return WjFlexChartParametricFunctionSeries;
        var WjFlexChartParametricFunctionSeries_1;
    }(wijmo.chart.analytics.ParametricFunctionSeries));
    exports.WjFlexChartParametricFunctionSeries = WjFlexChartParametricFunctionSeries;
    exports.wjFlexChartWaterfallMeta = {
        selector: 'wj-flex-chart-waterfall',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'relativeData',
            'start',
            'startLabel',
            'showTotal',
            'totalLabel',
            'showIntermediateTotal',
            'intermediateTotalPositions',
            'intermediateTotalLabels',
            'connectorLines',
            'styles',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.Waterfall control.
     *
     * The <b>wj-flex-chart-waterfall</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-waterfall</b> component to add <b>Waterfall</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartWaterfall</b> component is derived from the <b>Waterfall</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartWaterfall = /** @class */ (function (_super) {
        __extends(WjFlexChartWaterfall, _super);
        function WjFlexChartWaterfall(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartWaterfall_1 = WjFlexChartWaterfall;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartWaterfall.prototype.created = function () {
        };
        WjFlexChartWaterfall.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartWaterfall.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartWaterfall.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartWaterfall.meta = {
            outputs: exports.wjFlexChartWaterfallMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartWaterfall = WjFlexChartWaterfall_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartWaterfallMeta.selector,
                template: exports.wjFlexChartWaterfallMeta.template,
                inputs: exports.wjFlexChartWaterfallMeta.inputs,
                outputs: exports.wjFlexChartWaterfallMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartWaterfall_1; }) }
                ].concat(exports.wjFlexChartWaterfallMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartWaterfall);
        return WjFlexChartWaterfall;
        var WjFlexChartWaterfall_1;
    }(wijmo.chart.analytics.Waterfall));
    exports.WjFlexChartWaterfall = WjFlexChartWaterfall;
    exports.wjFlexChartBoxWhiskerMeta = {
        selector: 'wj-flex-chart-box-whisker',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'quartileCalculation',
            'groupWidth',
            'gapWidth',
            'showMeanLine',
            'meanLineStyle',
            'showMeanMarker',
            'meanMarkerStyle',
            'showInnerPoints',
            'showOutliers',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.BoxWhisker control.
     *
     * The <b>wj-flex-chart-box-whisker</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-box-whisker</b> component to add <b>BoxWhisker</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartBoxWhisker</b> component is derived from the <b>BoxWhisker</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartBoxWhisker = /** @class */ (function (_super) {
        __extends(WjFlexChartBoxWhisker, _super);
        function WjFlexChartBoxWhisker(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartBoxWhisker_1 = WjFlexChartBoxWhisker;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartBoxWhisker.prototype.created = function () {
        };
        WjFlexChartBoxWhisker.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartBoxWhisker.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartBoxWhisker.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartBoxWhisker.meta = {
            outputs: exports.wjFlexChartBoxWhiskerMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartBoxWhisker = WjFlexChartBoxWhisker_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartBoxWhiskerMeta.selector,
                template: exports.wjFlexChartBoxWhiskerMeta.template,
                inputs: exports.wjFlexChartBoxWhiskerMeta.inputs,
                outputs: exports.wjFlexChartBoxWhiskerMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartBoxWhisker_1; }) }
                ].concat(exports.wjFlexChartBoxWhiskerMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartBoxWhisker);
        return WjFlexChartBoxWhisker;
        var WjFlexChartBoxWhisker_1;
    }(wijmo.chart.analytics.BoxWhisker));
    exports.WjFlexChartBoxWhisker = WjFlexChartBoxWhisker;
    exports.wjFlexChartErrorBarMeta = {
        selector: 'wj-flex-chart-error-bar',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'chartType',
            'errorBarStyle',
            'value',
            'errorAmount',
            'endStyle',
            'direction',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.analytics.ErrorBar control.
     *
     * The <b>wj-flex-chart-error-bar</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.WjFlexChart component.
     *
     * Use the <b>wj-flex-chart-error-bar</b> component to add <b>ErrorBar</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartErrorBar</b> component is derived from the <b>ErrorBar</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartErrorBar = /** @class */ (function (_super) {
        __extends(WjFlexChartErrorBar, _super);
        function WjFlexChartErrorBar(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartErrorBar_1 = WjFlexChartErrorBar;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartErrorBar.prototype.created = function () {
        };
        WjFlexChartErrorBar.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartErrorBar.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartErrorBar.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartErrorBar.meta = {
            outputs: exports.wjFlexChartErrorBarMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartErrorBar = WjFlexChartErrorBar_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartErrorBarMeta.selector,
                template: exports.wjFlexChartErrorBarMeta.template,
                inputs: exports.wjFlexChartErrorBarMeta.inputs,
                outputs: exports.wjFlexChartErrorBarMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartErrorBar_1; }) }
                ].concat(exports.wjFlexChartErrorBarMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartErrorBar);
        return WjFlexChartErrorBar;
        var WjFlexChartErrorBar_1;
    }(wijmo.chart.analytics.ErrorBar));
    exports.WjFlexChartErrorBar = WjFlexChartErrorBar;
    var moduleExports = [
        WjFlexChartTrendLine,
        WjFlexChartMovingAverage,
        WjFlexChartYFunctionSeries,
        WjFlexChartParametricFunctionSeries,
        WjFlexChartWaterfall,
        WjFlexChartBoxWhisker,
        WjFlexChartErrorBar
    ];
    var WjChartAnalyticsModule = /** @class */ (function () {
        function WjChartAnalyticsModule() {
        }
        WjChartAnalyticsModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjChartAnalyticsModule);
        return WjChartAnalyticsModule;
    }());
    exports.WjChartAnalyticsModule = WjChartAnalyticsModule;
});

///<wijmo-soft-import from="wijmo.chart.finance"/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.chart.annotation", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartAnnotationLayerMeta = {
        selector: 'wj-flex-chart-annotation-layer',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.AnnotationLayer control.
     *
     * The <b>wj-flex-chart-annotation-layer</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.WjFlexChart
     *  or @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart.
     *
     * Use the <b>wj-flex-chart-annotation-layer</b> component to add <b>AnnotationLayer</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartAnnotationLayer</b> component is derived from the <b>AnnotationLayer</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-layer</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationText
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationEllipse
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationRectangle
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLine
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationPolygon
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationCircle
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationSquare
     *  and @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationImage.
    */
    var WjFlexChartAnnotationLayer = /** @class */ (function (_super) {
        __extends(WjFlexChartAnnotationLayer, _super);
        function WjFlexChartAnnotationLayer(elRef, injector, parentCmp) {
            var _this = _super.call(this, parentCmp) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartAnnotationLayer_1 = WjFlexChartAnnotationLayer;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartAnnotationLayer.prototype.created = function () {
        };
        WjFlexChartAnnotationLayer.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationLayer.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationLayer.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartAnnotationLayer.meta = {
            outputs: exports.wjFlexChartAnnotationLayerMeta.outputs,
        };
        WjFlexChartAnnotationLayer = WjFlexChartAnnotationLayer_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartAnnotationLayerMeta.selector,
                template: exports.wjFlexChartAnnotationLayerMeta.template,
                inputs: exports.wjFlexChartAnnotationLayerMeta.inputs,
                outputs: exports.wjFlexChartAnnotationLayerMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationLayer_1; }) }
                ].concat(exports.wjFlexChartAnnotationLayerMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartAnnotationLayer);
        return WjFlexChartAnnotationLayer;
        var WjFlexChartAnnotationLayer_1;
    }(wijmo.chart.annotation.AnnotationLayer));
    exports.WjFlexChartAnnotationLayer = WjFlexChartAnnotationLayer;
    exports.wjFlexChartAnnotationTextMeta = {
        selector: 'wj-flex-chart-annotation-text',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Text control.
     *
     * The <b>wj-flex-chart-annotation-text</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-text</b> component to add <b>Text</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartAnnotationText</b> component is derived from the <b>Text</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-text</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationText = /** @class */ (function (_super) {
        __extends(WjFlexChartAnnotationText, _super);
        function WjFlexChartAnnotationText(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartAnnotationText_1 = WjFlexChartAnnotationText;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartAnnotationText.prototype.created = function () {
        };
        WjFlexChartAnnotationText.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationText.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationText.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartAnnotationText.meta = {
            outputs: exports.wjFlexChartAnnotationTextMeta.outputs,
            siblingId: 'annotation',
        };
        WjFlexChartAnnotationText = WjFlexChartAnnotationText_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartAnnotationTextMeta.selector,
                template: exports.wjFlexChartAnnotationTextMeta.template,
                inputs: exports.wjFlexChartAnnotationTextMeta.inputs,
                outputs: exports.wjFlexChartAnnotationTextMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationText_1; }) }
                ].concat(exports.wjFlexChartAnnotationTextMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartAnnotationText);
        return WjFlexChartAnnotationText;
        var WjFlexChartAnnotationText_1;
    }(wijmo.chart.annotation.Text));
    exports.WjFlexChartAnnotationText = WjFlexChartAnnotationText;
    exports.wjFlexChartAnnotationEllipseMeta = {
        selector: 'wj-flex-chart-annotation-ellipse',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Ellipse control.
     *
     * The <b>wj-flex-chart-annotation-ellipse</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-ellipse</b> component to add <b>Ellipse</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartAnnotationEllipse</b> component is derived from the <b>Ellipse</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-ellipse</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationEllipse = /** @class */ (function (_super) {
        __extends(WjFlexChartAnnotationEllipse, _super);
        function WjFlexChartAnnotationEllipse(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartAnnotationEllipse_1 = WjFlexChartAnnotationEllipse;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartAnnotationEllipse.prototype.created = function () {
        };
        WjFlexChartAnnotationEllipse.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationEllipse.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationEllipse.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartAnnotationEllipse.meta = {
            outputs: exports.wjFlexChartAnnotationEllipseMeta.outputs,
            siblingId: 'annotation',
        };
        WjFlexChartAnnotationEllipse = WjFlexChartAnnotationEllipse_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartAnnotationEllipseMeta.selector,
                template: exports.wjFlexChartAnnotationEllipseMeta.template,
                inputs: exports.wjFlexChartAnnotationEllipseMeta.inputs,
                outputs: exports.wjFlexChartAnnotationEllipseMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationEllipse_1; }) }
                ].concat(exports.wjFlexChartAnnotationEllipseMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartAnnotationEllipse);
        return WjFlexChartAnnotationEllipse;
        var WjFlexChartAnnotationEllipse_1;
    }(wijmo.chart.annotation.Ellipse));
    exports.WjFlexChartAnnotationEllipse = WjFlexChartAnnotationEllipse;
    exports.wjFlexChartAnnotationRectangleMeta = {
        selector: 'wj-flex-chart-annotation-rectangle',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Rectangle control.
     *
     * The <b>wj-flex-chart-annotation-rectangle</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-rectangle</b> component to add <b>Rectangle</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartAnnotationRectangle</b> component is derived from the <b>Rectangle</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-rectangle</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationRectangle = /** @class */ (function (_super) {
        __extends(WjFlexChartAnnotationRectangle, _super);
        function WjFlexChartAnnotationRectangle(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartAnnotationRectangle_1 = WjFlexChartAnnotationRectangle;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartAnnotationRectangle.prototype.created = function () {
        };
        WjFlexChartAnnotationRectangle.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationRectangle.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationRectangle.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartAnnotationRectangle.meta = {
            outputs: exports.wjFlexChartAnnotationRectangleMeta.outputs,
            siblingId: 'annotation',
        };
        WjFlexChartAnnotationRectangle = WjFlexChartAnnotationRectangle_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartAnnotationRectangleMeta.selector,
                template: exports.wjFlexChartAnnotationRectangleMeta.template,
                inputs: exports.wjFlexChartAnnotationRectangleMeta.inputs,
                outputs: exports.wjFlexChartAnnotationRectangleMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationRectangle_1; }) }
                ].concat(exports.wjFlexChartAnnotationRectangleMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartAnnotationRectangle);
        return WjFlexChartAnnotationRectangle;
        var WjFlexChartAnnotationRectangle_1;
    }(wijmo.chart.annotation.Rectangle));
    exports.WjFlexChartAnnotationRectangle = WjFlexChartAnnotationRectangle;
    exports.wjFlexChartAnnotationLineMeta = {
        selector: 'wj-flex-chart-annotation-line',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Line control.
     *
     * The <b>wj-flex-chart-annotation-line</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-line</b> component to add <b>Line</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartAnnotationLine</b> component is derived from the <b>Line</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-line</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationLine = /** @class */ (function (_super) {
        __extends(WjFlexChartAnnotationLine, _super);
        function WjFlexChartAnnotationLine(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartAnnotationLine_1 = WjFlexChartAnnotationLine;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartAnnotationLine.prototype.created = function () {
        };
        WjFlexChartAnnotationLine.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationLine.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationLine.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartAnnotationLine.meta = {
            outputs: exports.wjFlexChartAnnotationLineMeta.outputs,
            siblingId: 'annotation',
        };
        WjFlexChartAnnotationLine = WjFlexChartAnnotationLine_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartAnnotationLineMeta.selector,
                template: exports.wjFlexChartAnnotationLineMeta.template,
                inputs: exports.wjFlexChartAnnotationLineMeta.inputs,
                outputs: exports.wjFlexChartAnnotationLineMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationLine_1; }) }
                ].concat(exports.wjFlexChartAnnotationLineMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartAnnotationLine);
        return WjFlexChartAnnotationLine;
        var WjFlexChartAnnotationLine_1;
    }(wijmo.chart.annotation.Line));
    exports.WjFlexChartAnnotationLine = WjFlexChartAnnotationLine;
    exports.wjFlexChartAnnotationPolygonMeta = {
        selector: 'wj-flex-chart-annotation-polygon',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Polygon control.
     *
     * The <b>wj-flex-chart-annotation-polygon</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-polygon</b> component to add <b>Polygon</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartAnnotationPolygon</b> component is derived from the <b>Polygon</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-polygon</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationPolygon = /** @class */ (function (_super) {
        __extends(WjFlexChartAnnotationPolygon, _super);
        function WjFlexChartAnnotationPolygon(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartAnnotationPolygon_1 = WjFlexChartAnnotationPolygon;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartAnnotationPolygon.prototype.created = function () {
        };
        WjFlexChartAnnotationPolygon.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationPolygon.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationPolygon.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartAnnotationPolygon.meta = {
            outputs: exports.wjFlexChartAnnotationPolygonMeta.outputs,
            siblingId: 'annotation',
        };
        WjFlexChartAnnotationPolygon = WjFlexChartAnnotationPolygon_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartAnnotationPolygonMeta.selector,
                template: exports.wjFlexChartAnnotationPolygonMeta.template,
                inputs: exports.wjFlexChartAnnotationPolygonMeta.inputs,
                outputs: exports.wjFlexChartAnnotationPolygonMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationPolygon_1; }) }
                ].concat(exports.wjFlexChartAnnotationPolygonMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartAnnotationPolygon);
        return WjFlexChartAnnotationPolygon;
        var WjFlexChartAnnotationPolygon_1;
    }(wijmo.chart.annotation.Polygon));
    exports.WjFlexChartAnnotationPolygon = WjFlexChartAnnotationPolygon;
    exports.wjFlexChartAnnotationCircleMeta = {
        selector: 'wj-flex-chart-annotation-circle',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Circle control.
     *
     * The <b>wj-flex-chart-annotation-circle</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-circle</b> component to add <b>Circle</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartAnnotationCircle</b> component is derived from the <b>Circle</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-circle</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationCircle = /** @class */ (function (_super) {
        __extends(WjFlexChartAnnotationCircle, _super);
        function WjFlexChartAnnotationCircle(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartAnnotationCircle_1 = WjFlexChartAnnotationCircle;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartAnnotationCircle.prototype.created = function () {
        };
        WjFlexChartAnnotationCircle.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationCircle.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationCircle.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartAnnotationCircle.meta = {
            outputs: exports.wjFlexChartAnnotationCircleMeta.outputs,
            siblingId: 'annotation',
        };
        WjFlexChartAnnotationCircle = WjFlexChartAnnotationCircle_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartAnnotationCircleMeta.selector,
                template: exports.wjFlexChartAnnotationCircleMeta.template,
                inputs: exports.wjFlexChartAnnotationCircleMeta.inputs,
                outputs: exports.wjFlexChartAnnotationCircleMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationCircle_1; }) }
                ].concat(exports.wjFlexChartAnnotationCircleMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartAnnotationCircle);
        return WjFlexChartAnnotationCircle;
        var WjFlexChartAnnotationCircle_1;
    }(wijmo.chart.annotation.Circle));
    exports.WjFlexChartAnnotationCircle = WjFlexChartAnnotationCircle;
    exports.wjFlexChartAnnotationSquareMeta = {
        selector: 'wj-flex-chart-annotation-square',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Square control.
     *
     * The <b>wj-flex-chart-annotation-square</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-square</b> component to add <b>Square</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartAnnotationSquare</b> component is derived from the <b>Square</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-square</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationSquare = /** @class */ (function (_super) {
        __extends(WjFlexChartAnnotationSquare, _super);
        function WjFlexChartAnnotationSquare(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartAnnotationSquare_1 = WjFlexChartAnnotationSquare;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartAnnotationSquare.prototype.created = function () {
        };
        WjFlexChartAnnotationSquare.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationSquare.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationSquare.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartAnnotationSquare.meta = {
            outputs: exports.wjFlexChartAnnotationSquareMeta.outputs,
            siblingId: 'annotation',
        };
        WjFlexChartAnnotationSquare = WjFlexChartAnnotationSquare_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartAnnotationSquareMeta.selector,
                template: exports.wjFlexChartAnnotationSquareMeta.template,
                inputs: exports.wjFlexChartAnnotationSquareMeta.inputs,
                outputs: exports.wjFlexChartAnnotationSquareMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationSquare_1; }) }
                ].concat(exports.wjFlexChartAnnotationSquareMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartAnnotationSquare);
        return WjFlexChartAnnotationSquare;
        var WjFlexChartAnnotationSquare_1;
    }(wijmo.chart.annotation.Square));
    exports.WjFlexChartAnnotationSquare = WjFlexChartAnnotationSquare;
    exports.wjFlexChartAnnotationImageMeta = {
        selector: 'wj-flex-chart-annotation-image',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjProperty',
            'type',
            'attachment',
            'position',
            'point',
            'seriesIndex',
            'pointIndex',
            'offset',
            'style',
            'isVisible',
            'tooltip',
            'text',
            'content',
            'name',
            'width',
            'height',
            'start',
            'end',
            'radius',
            'length',
            'href',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.annotation.Image control.
     *
     * The <b>wj-flex-chart-annotation-image</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer component.
     *
     * Use the <b>wj-flex-chart-annotation-image</b> component to add <b>Image</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartAnnotationImage</b> component is derived from the <b>Image</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-chart-annotation-image</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartDataPoint child component.
    */
    var WjFlexChartAnnotationImage = /** @class */ (function (_super) {
        __extends(WjFlexChartAnnotationImage, _super);
        function WjFlexChartAnnotationImage(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'items'.
             */
            _this.wjProperty = 'items';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartAnnotationImage_1 = WjFlexChartAnnotationImage;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartAnnotationImage.prototype.created = function () {
        };
        WjFlexChartAnnotationImage.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAnnotationImage.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAnnotationImage.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartAnnotationImage.meta = {
            outputs: exports.wjFlexChartAnnotationImageMeta.outputs,
            siblingId: 'annotation',
        };
        WjFlexChartAnnotationImage = WjFlexChartAnnotationImage_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartAnnotationImageMeta.selector,
                template: exports.wjFlexChartAnnotationImageMeta.template,
                inputs: exports.wjFlexChartAnnotationImageMeta.inputs,
                outputs: exports.wjFlexChartAnnotationImageMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAnnotationImage_1; }) }
                ].concat(exports.wjFlexChartAnnotationImageMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartAnnotationImage);
        return WjFlexChartAnnotationImage;
        var WjFlexChartAnnotationImage_1;
    }(wijmo.chart.annotation.Image));
    exports.WjFlexChartAnnotationImage = WjFlexChartAnnotationImage;
    var moduleExports = [
        WjFlexChartAnnotationLayer,
        WjFlexChartAnnotationText,
        WjFlexChartAnnotationEllipse,
        WjFlexChartAnnotationRectangle,
        WjFlexChartAnnotationLine,
        WjFlexChartAnnotationPolygon,
        WjFlexChartAnnotationCircle,
        WjFlexChartAnnotationSquare,
        WjFlexChartAnnotationImage
    ];
    var WjChartAnnotationModule = /** @class */ (function () {
        function WjChartAnnotationModule() {
        }
        WjChartAnnotationModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjChartAnnotationModule);
        return WjChartAnnotationModule;
    }());
    exports.WjChartAnnotationModule = WjChartAnnotationModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.chart.finance</b> module.
*
* <b>wijmo.angular2.chart.finance</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjFinance from 'wijmo/wijmo.angular2.chart.finance';
* &nbsp;
* &#64;Component({
*     directives: [wjFinance.WjFinancialChart, wjFinance.WjFinancialChartSeries],
*     template: `
*       &lt;wj-financial-chart [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-financial-chart-series [binding]="'y'"&gt;&lt;/wj-financial-chart-series&gt;
*       &lt;/wj-financial-chart&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.finance'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.chart.finance", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFinancialChartMeta = {
        selector: 'wj-financial-chart',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'binding',
            'footer',
            'header',
            'selectionMode',
            'palette',
            'plotMargin',
            'footerStyle',
            'headerStyle',
            'tooltipContent',
            'itemsSource',
            'bindingX',
            'interpolateNulls',
            'legendToggle',
            'symbolSize',
            'options',
            'selection',
            'itemFormatter',
            'labelContent',
            'chartType',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'selectionChangedNg: selectionChanged',
            'selectionChangePC: selectionChange',
            'seriesVisibilityChangedNg: seriesVisibilityChanged',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.FinancialChart control.
     *
     * Use the <b>wj-financial-chart</b> component to add <b>FinancialChart</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFinancialChart</b> component is derived from the <b>FinancialChart</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-financial-chart</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartTrendLine
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartMovingAverage
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartYFunctionSeries
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartParametricFunctionSeries
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartWaterfall
     * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartBoxWhisker
     * , @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
     * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacci
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciArcs
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciFans
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciTimeZones
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartAtr
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartCci
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartRsi
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartWilliamsR
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartMacd
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartMacdHistogram
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartStochastic
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartBollingerBands
     * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartEnvelopes
     * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChartSeries
     * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartRangeSelector
     * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartGestures
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
     * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLineMarker
     *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartPlotArea.
    */
    var WjFinancialChart = /** @class */ (function (_super) {
        __extends(WjFinancialChart, _super);
        function WjFinancialChart(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFinancialChart_1 = WjFinancialChart;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFinancialChart.prototype.created = function () {
        };
        WjFinancialChart.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFinancialChart.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFinancialChart.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFinancialChart.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        Object.defineProperty(WjFinancialChart.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjFinancialChart.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        WjFinancialChart.meta = {
            outputs: exports.wjFinancialChartMeta.outputs,
            changeEvents: {
                'selectionChanged': ['selection']
            },
        };
        WjFinancialChart = WjFinancialChart_1 = __decorate([
            core_1.Component({
                selector: exports.wjFinancialChartMeta.selector,
                template: exports.wjFinancialChartMeta.template,
                inputs: exports.wjFinancialChartMeta.inputs,
                outputs: exports.wjFinancialChartMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFinancialChart_1; }) }
                ].concat(exports.wjFinancialChartMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFinancialChart);
        return WjFinancialChart;
        var WjFinancialChart_1;
    }(wijmo.chart.finance.FinancialChart));
    exports.WjFinancialChart = WjFinancialChart;
    exports.wjFinancialChartSeriesMeta = {
        selector: 'wj-financial-chart-series',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'chartType',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.FinancialSeries control.
     *
     * The <b>wj-financial-chart-series</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-financial-chart-series</b> component to add <b>FinancialSeries</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFinancialChartSeries</b> component is derived from the <b>FinancialSeries</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-financial-chart-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis child component.
    */
    var WjFinancialChartSeries = /** @class */ (function (_super) {
        __extends(WjFinancialChartSeries, _super);
        function WjFinancialChartSeries(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFinancialChartSeries_1 = WjFinancialChartSeries;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFinancialChartSeries.prototype.created = function () {
        };
        WjFinancialChartSeries.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFinancialChartSeries.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFinancialChartSeries.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFinancialChartSeries.meta = {
            outputs: exports.wjFinancialChartSeriesMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFinancialChartSeries = WjFinancialChartSeries_1 = __decorate([
            core_1.Component({
                selector: exports.wjFinancialChartSeriesMeta.selector,
                template: exports.wjFinancialChartSeriesMeta.template,
                inputs: exports.wjFinancialChartSeriesMeta.inputs,
                outputs: exports.wjFinancialChartSeriesMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFinancialChartSeries_1; }) }
                ].concat(exports.wjFinancialChartSeriesMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFinancialChartSeries);
        return WjFinancialChartSeries;
        var WjFinancialChartSeries_1;
    }(wijmo.chart.finance.FinancialSeries));
    exports.WjFinancialChartSeries = WjFinancialChartSeries;
    var moduleExports = [
        WjFinancialChart,
        WjFinancialChartSeries
    ];
    var WjChartFinanceModule = /** @class */ (function () {
        function WjChartFinanceModule() {
        }
        WjChartFinanceModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjChartFinanceModule);
        return WjChartFinanceModule;
    }());
    exports.WjChartFinanceModule = WjChartFinanceModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.chart.finance.analytics</b> module.
*
* <b>wijmo.angular2.chart.finance.analytics</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjFinanceAnalitics from 'wijmo/wijmo.angular2.chart.finance.analytics';</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.finance.analytics'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.chart.finance.analytics", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexChartFibonacciMeta = {
        selector: 'wj-flex-chart-fibonacci',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'high',
            'low',
            'labelPosition',
            'levels',
            'minX',
            'maxX',
            'uptrend',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.Fibonacci control.
     *
     * The <b>wj-flex-chart-fibonacci</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-fibonacci</b> component to add <b>Fibonacci</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartFibonacci</b> component is derived from the <b>Fibonacci</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartFibonacci = /** @class */ (function (_super) {
        __extends(WjFlexChartFibonacci, _super);
        function WjFlexChartFibonacci(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartFibonacci_1 = WjFlexChartFibonacci;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartFibonacci.prototype.created = function () {
        };
        WjFlexChartFibonacci.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartFibonacci.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartFibonacci.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartFibonacci.meta = {
            outputs: exports.wjFlexChartFibonacciMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartFibonacci = WjFlexChartFibonacci_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartFibonacciMeta.selector,
                template: exports.wjFlexChartFibonacciMeta.template,
                inputs: exports.wjFlexChartFibonacciMeta.inputs,
                outputs: exports.wjFlexChartFibonacciMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacci_1; }) }
                ].concat(exports.wjFlexChartFibonacciMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartFibonacci);
        return WjFlexChartFibonacci;
        var WjFlexChartFibonacci_1;
    }(wijmo.chart.finance.analytics.Fibonacci));
    exports.WjFlexChartFibonacci = WjFlexChartFibonacci;
    exports.wjFlexChartFibonacciArcsMeta = {
        selector: 'wj-flex-chart-fibonacci-arcs',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'start',
            'end',
            'labelPosition',
            'levels',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.FibonacciArcs control.
     *
     * The <b>wj-flex-chart-fibonacci-arcs</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-fibonacci-arcs</b> component to add <b>FibonacciArcs</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartFibonacciArcs</b> component is derived from the <b>FibonacciArcs</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartFibonacciArcs = /** @class */ (function (_super) {
        __extends(WjFlexChartFibonacciArcs, _super);
        function WjFlexChartFibonacciArcs(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartFibonacciArcs_1 = WjFlexChartFibonacciArcs;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartFibonacciArcs.prototype.created = function () {
        };
        WjFlexChartFibonacciArcs.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartFibonacciArcs.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartFibonacciArcs.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartFibonacciArcs.meta = {
            outputs: exports.wjFlexChartFibonacciArcsMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartFibonacciArcs = WjFlexChartFibonacciArcs_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartFibonacciArcsMeta.selector,
                template: exports.wjFlexChartFibonacciArcsMeta.template,
                inputs: exports.wjFlexChartFibonacciArcsMeta.inputs,
                outputs: exports.wjFlexChartFibonacciArcsMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciArcs_1; }) }
                ].concat(exports.wjFlexChartFibonacciArcsMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartFibonacciArcs);
        return WjFlexChartFibonacciArcs;
        var WjFlexChartFibonacciArcs_1;
    }(wijmo.chart.finance.analytics.FibonacciArcs));
    exports.WjFlexChartFibonacciArcs = WjFlexChartFibonacciArcs;
    exports.wjFlexChartFibonacciFansMeta = {
        selector: 'wj-flex-chart-fibonacci-fans',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'start',
            'end',
            'labelPosition',
            'levels',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.FibonacciFans control.
     *
     * The <b>wj-flex-chart-fibonacci-fans</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-fibonacci-fans</b> component to add <b>FibonacciFans</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartFibonacciFans</b> component is derived from the <b>FibonacciFans</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartFibonacciFans = /** @class */ (function (_super) {
        __extends(WjFlexChartFibonacciFans, _super);
        function WjFlexChartFibonacciFans(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartFibonacciFans_1 = WjFlexChartFibonacciFans;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartFibonacciFans.prototype.created = function () {
        };
        WjFlexChartFibonacciFans.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartFibonacciFans.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartFibonacciFans.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartFibonacciFans.meta = {
            outputs: exports.wjFlexChartFibonacciFansMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartFibonacciFans = WjFlexChartFibonacciFans_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartFibonacciFansMeta.selector,
                template: exports.wjFlexChartFibonacciFansMeta.template,
                inputs: exports.wjFlexChartFibonacciFansMeta.inputs,
                outputs: exports.wjFlexChartFibonacciFansMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciFans_1; }) }
                ].concat(exports.wjFlexChartFibonacciFansMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartFibonacciFans);
        return WjFlexChartFibonacciFans;
        var WjFlexChartFibonacciFans_1;
    }(wijmo.chart.finance.analytics.FibonacciFans));
    exports.WjFlexChartFibonacciFans = WjFlexChartFibonacciFans;
    exports.wjFlexChartFibonacciTimeZonesMeta = {
        selector: 'wj-flex-chart-fibonacci-time-zones',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'startX',
            'endX',
            'labelPosition',
            'levels',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.FibonacciTimeZones control.
     *
     * The <b>wj-flex-chart-fibonacci-time-zones</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-fibonacci-time-zones</b> component to add <b>FibonacciTimeZones</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartFibonacciTimeZones</b> component is derived from the <b>FibonacciTimeZones</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartFibonacciTimeZones = /** @class */ (function (_super) {
        __extends(WjFlexChartFibonacciTimeZones, _super);
        function WjFlexChartFibonacciTimeZones(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartFibonacciTimeZones_1 = WjFlexChartFibonacciTimeZones;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartFibonacciTimeZones.prototype.created = function () {
        };
        WjFlexChartFibonacciTimeZones.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartFibonacciTimeZones.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartFibonacciTimeZones.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartFibonacciTimeZones.meta = {
            outputs: exports.wjFlexChartFibonacciTimeZonesMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartFibonacciTimeZones = WjFlexChartFibonacciTimeZones_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartFibonacciTimeZonesMeta.selector,
                template: exports.wjFlexChartFibonacciTimeZonesMeta.template,
                inputs: exports.wjFlexChartFibonacciTimeZonesMeta.inputs,
                outputs: exports.wjFlexChartFibonacciTimeZonesMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciTimeZones_1; }) }
                ].concat(exports.wjFlexChartFibonacciTimeZonesMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartFibonacciTimeZones);
        return WjFlexChartFibonacciTimeZones;
        var WjFlexChartFibonacciTimeZones_1;
    }(wijmo.chart.finance.analytics.FibonacciTimeZones));
    exports.WjFlexChartFibonacciTimeZones = WjFlexChartFibonacciTimeZones;
    exports.wjFlexChartAtrMeta = {
        selector: 'wj-flex-chart-atr',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'period',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.ATR control.
     *
     * The <b>wj-flex-chart-atr</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-atr</b> component to add <b>ATR</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartAtr</b> component is derived from the <b>ATR</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartAtr = /** @class */ (function (_super) {
        __extends(WjFlexChartAtr, _super);
        function WjFlexChartAtr(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartAtr_1 = WjFlexChartAtr;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartAtr.prototype.created = function () {
        };
        WjFlexChartAtr.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartAtr.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartAtr.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartAtr.meta = {
            outputs: exports.wjFlexChartAtrMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartAtr = WjFlexChartAtr_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartAtrMeta.selector,
                template: exports.wjFlexChartAtrMeta.template,
                inputs: exports.wjFlexChartAtrMeta.inputs,
                outputs: exports.wjFlexChartAtrMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAtr_1; }) }
                ].concat(exports.wjFlexChartAtrMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartAtr);
        return WjFlexChartAtr;
        var WjFlexChartAtr_1;
    }(wijmo.chart.finance.analytics.ATR));
    exports.WjFlexChartAtr = WjFlexChartAtr;
    exports.wjFlexChartCciMeta = {
        selector: 'wj-flex-chart-cci',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'period',
            'constant',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.CCI control.
     *
     * The <b>wj-flex-chart-cci</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-cci</b> component to add <b>CCI</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartCci</b> component is derived from the <b>CCI</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartCci = /** @class */ (function (_super) {
        __extends(WjFlexChartCci, _super);
        function WjFlexChartCci(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartCci_1 = WjFlexChartCci;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartCci.prototype.created = function () {
        };
        WjFlexChartCci.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartCci.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartCci.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartCci.meta = {
            outputs: exports.wjFlexChartCciMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartCci = WjFlexChartCci_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartCciMeta.selector,
                template: exports.wjFlexChartCciMeta.template,
                inputs: exports.wjFlexChartCciMeta.inputs,
                outputs: exports.wjFlexChartCciMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartCci_1; }) }
                ].concat(exports.wjFlexChartCciMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartCci);
        return WjFlexChartCci;
        var WjFlexChartCci_1;
    }(wijmo.chart.finance.analytics.CCI));
    exports.WjFlexChartCci = WjFlexChartCci;
    exports.wjFlexChartRsiMeta = {
        selector: 'wj-flex-chart-rsi',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'period',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.RSI control.
     *
     * The <b>wj-flex-chart-rsi</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-rsi</b> component to add <b>RSI</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartRsi</b> component is derived from the <b>RSI</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartRsi = /** @class */ (function (_super) {
        __extends(WjFlexChartRsi, _super);
        function WjFlexChartRsi(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartRsi_1 = WjFlexChartRsi;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartRsi.prototype.created = function () {
        };
        WjFlexChartRsi.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartRsi.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartRsi.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartRsi.meta = {
            outputs: exports.wjFlexChartRsiMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartRsi = WjFlexChartRsi_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartRsiMeta.selector,
                template: exports.wjFlexChartRsiMeta.template,
                inputs: exports.wjFlexChartRsiMeta.inputs,
                outputs: exports.wjFlexChartRsiMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartRsi_1; }) }
                ].concat(exports.wjFlexChartRsiMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartRsi);
        return WjFlexChartRsi;
        var WjFlexChartRsi_1;
    }(wijmo.chart.finance.analytics.RSI));
    exports.WjFlexChartRsi = WjFlexChartRsi;
    exports.wjFlexChartWilliamsRMeta = {
        selector: 'wj-flex-chart-williams-r',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'period',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.WilliamsR control.
     *
     * The <b>wj-flex-chart-williams-r</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-williams-r</b> component to add <b>WilliamsR</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartWilliamsR</b> component is derived from the <b>WilliamsR</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartWilliamsR = /** @class */ (function (_super) {
        __extends(WjFlexChartWilliamsR, _super);
        function WjFlexChartWilliamsR(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartWilliamsR_1 = WjFlexChartWilliamsR;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartWilliamsR.prototype.created = function () {
        };
        WjFlexChartWilliamsR.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartWilliamsR.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartWilliamsR.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartWilliamsR.meta = {
            outputs: exports.wjFlexChartWilliamsRMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartWilliamsR = WjFlexChartWilliamsR_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartWilliamsRMeta.selector,
                template: exports.wjFlexChartWilliamsRMeta.template,
                inputs: exports.wjFlexChartWilliamsRMeta.inputs,
                outputs: exports.wjFlexChartWilliamsRMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartWilliamsR_1; }) }
                ].concat(exports.wjFlexChartWilliamsRMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartWilliamsR);
        return WjFlexChartWilliamsR;
        var WjFlexChartWilliamsR_1;
    }(wijmo.chart.finance.analytics.WilliamsR));
    exports.WjFlexChartWilliamsR = WjFlexChartWilliamsR;
    exports.wjFlexChartMacdMeta = {
        selector: 'wj-flex-chart-macd',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'fastPeriod',
            'slowPeriod',
            'smoothingPeriod',
            'styles',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.Macd control.
     *
     * The <b>wj-flex-chart-macd</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-macd</b> component to add <b>Macd</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartMacd</b> component is derived from the <b>Macd</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartMacd = /** @class */ (function (_super) {
        __extends(WjFlexChartMacd, _super);
        function WjFlexChartMacd(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartMacd_1 = WjFlexChartMacd;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartMacd.prototype.created = function () {
        };
        WjFlexChartMacd.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartMacd.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartMacd.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartMacd.meta = {
            outputs: exports.wjFlexChartMacdMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartMacd = WjFlexChartMacd_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartMacdMeta.selector,
                template: exports.wjFlexChartMacdMeta.template,
                inputs: exports.wjFlexChartMacdMeta.inputs,
                outputs: exports.wjFlexChartMacdMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMacd_1; }) }
                ].concat(exports.wjFlexChartMacdMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartMacd);
        return WjFlexChartMacd;
        var WjFlexChartMacd_1;
    }(wijmo.chart.finance.analytics.Macd));
    exports.WjFlexChartMacd = WjFlexChartMacd;
    exports.wjFlexChartMacdHistogramMeta = {
        selector: 'wj-flex-chart-macd-histogram',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'fastPeriod',
            'slowPeriod',
            'smoothingPeriod',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.MacdHistogram control.
     *
     * The <b>wj-flex-chart-macd-histogram</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-macd-histogram</b> component to add <b>MacdHistogram</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartMacdHistogram</b> component is derived from the <b>MacdHistogram</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartMacdHistogram = /** @class */ (function (_super) {
        __extends(WjFlexChartMacdHistogram, _super);
        function WjFlexChartMacdHistogram(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartMacdHistogram_1 = WjFlexChartMacdHistogram;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartMacdHistogram.prototype.created = function () {
        };
        WjFlexChartMacdHistogram.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartMacdHistogram.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartMacdHistogram.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartMacdHistogram.meta = {
            outputs: exports.wjFlexChartMacdHistogramMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartMacdHistogram = WjFlexChartMacdHistogram_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartMacdHistogramMeta.selector,
                template: exports.wjFlexChartMacdHistogramMeta.template,
                inputs: exports.wjFlexChartMacdHistogramMeta.inputs,
                outputs: exports.wjFlexChartMacdHistogramMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMacdHistogram_1; }) }
                ].concat(exports.wjFlexChartMacdHistogramMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartMacdHistogram);
        return WjFlexChartMacdHistogram;
        var WjFlexChartMacdHistogram_1;
    }(wijmo.chart.finance.analytics.MacdHistogram));
    exports.WjFlexChartMacdHistogram = WjFlexChartMacdHistogram;
    exports.wjFlexChartStochasticMeta = {
        selector: 'wj-flex-chart-stochastic',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'dPeriod',
            'kPeriod',
            'smoothingPeriod',
            'styles',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.Stochastic control.
     *
     * The <b>wj-flex-chart-stochastic</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-stochastic</b> component to add <b>Stochastic</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartStochastic</b> component is derived from the <b>Stochastic</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartStochastic = /** @class */ (function (_super) {
        __extends(WjFlexChartStochastic, _super);
        function WjFlexChartStochastic(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartStochastic_1 = WjFlexChartStochastic;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartStochastic.prototype.created = function () {
        };
        WjFlexChartStochastic.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartStochastic.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartStochastic.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartStochastic.meta = {
            outputs: exports.wjFlexChartStochasticMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartStochastic = WjFlexChartStochastic_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartStochasticMeta.selector,
                template: exports.wjFlexChartStochasticMeta.template,
                inputs: exports.wjFlexChartStochasticMeta.inputs,
                outputs: exports.wjFlexChartStochasticMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartStochastic_1; }) }
                ].concat(exports.wjFlexChartStochasticMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartStochastic);
        return WjFlexChartStochastic;
        var WjFlexChartStochastic_1;
    }(wijmo.chart.finance.analytics.Stochastic));
    exports.WjFlexChartStochastic = WjFlexChartStochastic;
    exports.wjFlexChartBollingerBandsMeta = {
        selector: 'wj-flex-chart-bollinger-bands',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'period',
            'multiplier',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.BollingerBands control.
     *
     * The <b>wj-flex-chart-bollinger-bands</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-bollinger-bands</b> component to add <b>BollingerBands</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartBollingerBands</b> component is derived from the <b>BollingerBands</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartBollingerBands = /** @class */ (function (_super) {
        __extends(WjFlexChartBollingerBands, _super);
        function WjFlexChartBollingerBands(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartBollingerBands_1 = WjFlexChartBollingerBands;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartBollingerBands.prototype.created = function () {
        };
        WjFlexChartBollingerBands.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartBollingerBands.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartBollingerBands.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartBollingerBands.meta = {
            outputs: exports.wjFlexChartBollingerBandsMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartBollingerBands = WjFlexChartBollingerBands_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartBollingerBandsMeta.selector,
                template: exports.wjFlexChartBollingerBandsMeta.template,
                inputs: exports.wjFlexChartBollingerBandsMeta.inputs,
                outputs: exports.wjFlexChartBollingerBandsMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartBollingerBands_1; }) }
                ].concat(exports.wjFlexChartBollingerBandsMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartBollingerBands);
        return WjFlexChartBollingerBands;
        var WjFlexChartBollingerBands_1;
    }(wijmo.chart.finance.analytics.BollingerBands));
    exports.WjFlexChartBollingerBands = WjFlexChartBollingerBands;
    exports.wjFlexChartEnvelopesMeta = {
        selector: 'wj-flex-chart-envelopes',
        template: "",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'period',
            'size',
            'type',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.finance.analytics.Envelopes control.
     *
     * The <b>wj-flex-chart-envelopes</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
     *
     * Use the <b>wj-flex-chart-envelopes</b> component to add <b>Envelopes</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexChartEnvelopes</b> component is derived from the <b>Envelopes</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexChartEnvelopes = /** @class */ (function (_super) {
        __extends(WjFlexChartEnvelopes, _super);
        function WjFlexChartEnvelopes(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexChartEnvelopes_1 = WjFlexChartEnvelopes;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexChartEnvelopes.prototype.created = function () {
        };
        WjFlexChartEnvelopes.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexChartEnvelopes.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexChartEnvelopes.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexChartEnvelopes.meta = {
            outputs: exports.wjFlexChartEnvelopesMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexChartEnvelopes = WjFlexChartEnvelopes_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexChartEnvelopesMeta.selector,
                template: exports.wjFlexChartEnvelopesMeta.template,
                inputs: exports.wjFlexChartEnvelopesMeta.inputs,
                outputs: exports.wjFlexChartEnvelopesMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartEnvelopes_1; }) }
                ].concat(exports.wjFlexChartEnvelopesMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexChartEnvelopes);
        return WjFlexChartEnvelopes;
        var WjFlexChartEnvelopes_1;
    }(wijmo.chart.finance.analytics.Envelopes));
    exports.WjFlexChartEnvelopes = WjFlexChartEnvelopes;
    var moduleExports = [
        WjFlexChartFibonacci,
        WjFlexChartFibonacciArcs,
        WjFlexChartFibonacciFans,
        WjFlexChartFibonacciTimeZones,
        WjFlexChartAtr,
        WjFlexChartCci,
        WjFlexChartRsi,
        WjFlexChartWilliamsR,
        WjFlexChartMacd,
        WjFlexChartMacdHistogram,
        WjFlexChartStochastic,
        WjFlexChartBollingerBands,
        WjFlexChartEnvelopes
    ];
    var WjChartFinanceAnalyticsModule = /** @class */ (function () {
        function WjChartFinanceAnalyticsModule() {
        }
        WjChartFinanceAnalyticsModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjChartFinanceAnalyticsModule);
        return WjChartFinanceAnalyticsModule;
    }());
    exports.WjChartFinanceAnalyticsModule = WjChartFinanceAnalyticsModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.chart.hierarchical</b> module.
*
* <b>wijmo.angular2.chart.hierarchical</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjHierarchical from 'wijmo/wijmo.angular2.chart.hierarchical';
* &nbsp;
* &#64;Component({
*     directives: [wjHierarchical.WjSunburst],
*     template: `
*       &lt;wj-sunburst [itemsSource]="data" [binding]="'y'" [bindingX]="'x'"&gt;
*       &lt;/wj-sunburst&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.hierarchical'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.chart.hierarchical", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjSunburstMeta = {
        selector: 'wj-sunburst',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'binding',
            'footer',
            'header',
            'selectionMode',
            'palette',
            'plotMargin',
            'footerStyle',
            'headerStyle',
            'tooltipContent',
            'itemsSource',
            'bindingName',
            'innerRadius',
            'isAnimated',
            'offset',
            'reversed',
            'startAngle',
            'selectedItemPosition',
            'selectedItemOffset',
            'itemFormatter',
            'labelContent',
            'childItemsPath',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'selectionChangedNg: selectionChanged',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.hierarchical.Sunburst control.
     *
     * Use the <b>wj-sunburst</b> component to add <b>Sunburst</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjSunburst</b> component is derived from the <b>Sunburst</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-sunburst</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend child component.
    */
    var WjSunburst = /** @class */ (function (_super) {
        __extends(WjSunburst, _super);
        function WjSunburst(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjSunburst_1 = WjSunburst;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjSunburst.prototype.created = function () {
        };
        WjSunburst.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjSunburst.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjSunburst.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjSunburst.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        Object.defineProperty(WjSunburst.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjSunburst.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        WjSunburst.meta = {
            outputs: exports.wjSunburstMeta.outputs,
        };
        WjSunburst = WjSunburst_1 = __decorate([
            core_1.Component({
                selector: exports.wjSunburstMeta.selector,
                template: exports.wjSunburstMeta.template,
                inputs: exports.wjSunburstMeta.inputs,
                outputs: exports.wjSunburstMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjSunburst_1; }) }
                ].concat(exports.wjSunburstMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjSunburst);
        return WjSunburst;
        var WjSunburst_1;
    }(wijmo.chart.hierarchical.Sunburst));
    exports.WjSunburst = WjSunburst;
    exports.wjTreeMapMeta = {
        selector: 'wj-tree-map',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'binding',
            'footer',
            'header',
            'selectionMode',
            'palette',
            'plotMargin',
            'footerStyle',
            'headerStyle',
            'tooltipContent',
            'itemsSource',
            'bindingName',
            'maxDepth',
            'type',
            'labelContent',
            'childItemsPath',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'selectionChangedNg: selectionChanged',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.hierarchical.TreeMap control.
     *
     * Use the <b>wj-tree-map</b> component to add <b>TreeMap</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjTreeMap</b> component is derived from the <b>TreeMap</b> control and
     * inherits all its properties, events and methods.
    */
    var WjTreeMap = /** @class */ (function (_super) {
        __extends(WjTreeMap, _super);
        function WjTreeMap(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjTreeMap_1 = WjTreeMap;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjTreeMap.prototype.created = function () {
        };
        WjTreeMap.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjTreeMap.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjTreeMap.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjTreeMap.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        Object.defineProperty(WjTreeMap.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjTreeMap.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        WjTreeMap.meta = {
            outputs: exports.wjTreeMapMeta.outputs,
        };
        WjTreeMap = WjTreeMap_1 = __decorate([
            core_1.Component({
                selector: exports.wjTreeMapMeta.selector,
                template: exports.wjTreeMapMeta.template,
                inputs: exports.wjTreeMapMeta.inputs,
                outputs: exports.wjTreeMapMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjTreeMap_1; }) }
                ].concat(exports.wjTreeMapMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjTreeMap);
        return WjTreeMap;
        var WjTreeMap_1;
    }(wijmo.chart.hierarchical.TreeMap));
    exports.WjTreeMap = WjTreeMap;
    var moduleExports = [
        WjSunburst,
        WjTreeMap
    ];
    var WjChartHierarchicalModule = /** @class */ (function () {
        function WjChartHierarchicalModule() {
        }
        WjChartHierarchicalModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjChartHierarchicalModule);
        return WjChartHierarchicalModule;
    }());
    exports.WjChartHierarchicalModule = WjChartHierarchicalModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.chart.radar</b> module.
*
* <b>wijmo.angular2.chart.radar</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjRadar from 'wijmo/wijmo.angular2.chart.radar';
* &nbsp;
* &#64;Component({
*     directives: [wjRadar.WjFlexRadar, wjRadar.WjFlexRadarSeries],
*     template: `
*       &lt;wj-flex-radar [itemsSource]="data" [bindingX]="'x'"&gt;
*           &lt;wj-flex-radar-series [binding]="'y'"&gt;&lt;/wj-flex-radar-series&gt;
*       &lt;/wj-flex-radar&gt;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.radar'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.chart.radar", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjFlexRadarMeta = {
        selector: 'wj-flex-radar',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'binding',
            'footer',
            'header',
            'selectionMode',
            'palette',
            'plotMargin',
            'footerStyle',
            'headerStyle',
            'tooltipContent',
            'itemsSource',
            'bindingX',
            'interpolateNulls',
            'legendToggle',
            'symbolSize',
            'options',
            'selection',
            'itemFormatter',
            'labelContent',
            'chartType',
            'startAngle',
            'totalAngle',
            'reversed',
            'stacking',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'selectionChangedNg: selectionChanged',
            'selectionChangePC: selectionChange',
            'seriesVisibilityChangedNg: seriesVisibilityChanged',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.radar.FlexRadar control.
     *
     * Use the <b>wj-flex-radar</b> component to add <b>FlexRadar</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexRadar</b> component is derived from the <b>FlexRadar</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-radar</b> component may contain the following child components:
     * @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
     * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarAxis
     * , @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarSeries
     *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend.
    */
    var WjFlexRadar = /** @class */ (function (_super) {
        __extends(WjFlexRadar, _super);
        function WjFlexRadar(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexRadar_1 = WjFlexRadar;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexRadar.prototype.created = function () {
        };
        WjFlexRadar.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexRadar.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexRadar.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexRadar.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        Object.defineProperty(WjFlexRadar.prototype, "tooltipContent", {
            get: function () {
                return this.tooltip.content;
            },
            set: function (value) {
                this.tooltip.content = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WjFlexRadar.prototype, "labelContent", {
            get: function () {
                return this.dataLabel.content;
            },
            set: function (value) {
                this.dataLabel.content = value;
            },
            enumerable: true,
            configurable: true
        });
        WjFlexRadar.meta = {
            outputs: exports.wjFlexRadarMeta.outputs,
            changeEvents: {
                'selectionChanged': ['selection']
            },
        };
        WjFlexRadar = WjFlexRadar_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexRadarMeta.selector,
                template: exports.wjFlexRadarMeta.template,
                inputs: exports.wjFlexRadarMeta.inputs,
                outputs: exports.wjFlexRadarMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexRadar_1; }) }
                ].concat(exports.wjFlexRadarMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexRadar);
        return WjFlexRadar;
        var WjFlexRadar_1;
    }(wijmo.chart.radar.FlexRadar));
    exports.WjFlexRadar = WjFlexRadar;
    exports.wjFlexRadarAxisMeta = {
        selector: 'wj-flex-radar-axis',
        template: "",
        inputs: [
            'wjProperty',
            'axisLine',
            'format',
            'labels',
            'majorGrid',
            'majorTickMarks',
            'majorUnit',
            'max',
            'min',
            'position',
            'reversed',
            'title',
            'labelAngle',
            'minorGrid',
            'minorTickMarks',
            'minorUnit',
            'origin',
            'logBase',
            'plotArea',
            'labelAlign',
            'name',
            'overlappingLabels',
            'labelPadding',
            'itemFormatter',
            'itemsSource',
            'binding',
        ],
        outputs: [
            'initialized',
            'rangeChangedNg: rangeChanged',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.radar.FlexRadarAxis control.
     *
     * The <b>wj-flex-radar-axis</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar
     *  or @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarSeries.
     *
     * Use the <b>wj-flex-radar-axis</b> component to add <b>FlexRadarAxis</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexRadarAxis</b> component is derived from the <b>FlexRadarAxis</b> control and
     * inherits all its properties, events and methods.
    */
    var WjFlexRadarAxis = /** @class */ (function (_super) {
        __extends(WjFlexRadarAxis, _super);
        function WjFlexRadarAxis(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'axes'.
             */
            _this.wjProperty = 'axes';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexRadarAxis_1 = WjFlexRadarAxis;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexRadarAxis.prototype.created = function () {
        };
        WjFlexRadarAxis.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexRadarAxis.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexRadarAxis.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexRadarAxis.meta = {
            outputs: exports.wjFlexRadarAxisMeta.outputs,
        };
        WjFlexRadarAxis = WjFlexRadarAxis_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexRadarAxisMeta.selector,
                template: exports.wjFlexRadarAxisMeta.template,
                inputs: exports.wjFlexRadarAxisMeta.inputs,
                outputs: exports.wjFlexRadarAxisMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexRadarAxis_1; }) }
                ].concat(exports.wjFlexRadarAxisMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexRadarAxis);
        return WjFlexRadarAxis;
        var WjFlexRadarAxis_1;
    }(wijmo.chart.radar.FlexRadarAxis));
    exports.WjFlexRadarAxis = WjFlexRadarAxis;
    exports.wjFlexRadarSeriesMeta = {
        selector: 'wj-flex-radar-series',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjProperty',
            'axisX',
            'axisY',
            'binding',
            'bindingX',
            'cssClass',
            'name',
            'style',
            'altStyle',
            'symbolMarker',
            'symbolSize',
            'symbolStyle',
            'visibility',
            'itemsSource',
            'chartType',
        ],
        outputs: [
            'initialized',
            'renderingNg: rendering',
            'renderedNg: rendered',
            'visibilityChangePC: visibilityChange',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.chart.radar.FlexRadarSeries control.
     *
     * The <b>wj-flex-radar-series</b> component must be
     * contained in a @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadar component.
     *
     * Use the <b>wj-flex-radar-series</b> component to add <b>FlexRadarSeries</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjFlexRadarSeries</b> component is derived from the <b>FlexRadarSeries</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-flex-radar-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.radar.WjFlexRadarAxis child component.
    */
    var WjFlexRadarSeries = /** @class */ (function (_super) {
        __extends(WjFlexRadarSeries, _super);
        function WjFlexRadarSeries(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'series'.
             */
            _this.wjProperty = 'series';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjFlexRadarSeries_1 = WjFlexRadarSeries;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjFlexRadarSeries.prototype.created = function () {
        };
        WjFlexRadarSeries.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjFlexRadarSeries.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjFlexRadarSeries.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjFlexRadarSeries.meta = {
            outputs: exports.wjFlexRadarSeriesMeta.outputs,
            changeEvents: {
                'chart.seriesVisibilityChanged': ['visibility']
            },
            siblingId: 'series',
        };
        WjFlexRadarSeries = WjFlexRadarSeries_1 = __decorate([
            core_1.Component({
                selector: exports.wjFlexRadarSeriesMeta.selector,
                template: exports.wjFlexRadarSeriesMeta.template,
                inputs: exports.wjFlexRadarSeriesMeta.inputs,
                outputs: exports.wjFlexRadarSeriesMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexRadarSeries_1; }) }
                ].concat(exports.wjFlexRadarSeriesMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjFlexRadarSeries);
        return WjFlexRadarSeries;
        var WjFlexRadarSeries_1;
    }(wijmo.chart.radar.FlexRadarSeries));
    exports.WjFlexRadarSeries = WjFlexRadarSeries;
    var moduleExports = [
        WjFlexRadar,
        WjFlexRadarAxis,
        WjFlexRadarSeries
    ];
    var WjChartRadarModule = /** @class */ (function () {
        function WjChartRadarModule() {
        }
        WjChartRadarModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjChartRadarModule);
        return WjChartRadarModule;
    }());
    exports.WjChartRadarModule = WjChartRadarModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.gauge</b> module.
*
* <b>wijmo.angular2.gauge</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjGauge from 'wijmo/wijmo.angular2.gauge';
* &nbsp;
* &#64;Component({
*     directives: [wjGauge.WjLinearGauge],
*     template: '&lt;wj-linear-gauge [(value)]="amount" [isReadOnly]="false"&gt;&lt;/wj-linear-gauge&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     amount = 0;
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.gauge'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.gauge", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjLinearGaugeMeta = {
        selector: 'wj-linear-gauge',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'value',
            'min',
            'max',
            'origin',
            'isReadOnly',
            'step',
            'format',
            'thickness',
            'hasShadow',
            'isAnimated',
            'showText',
            'showTicks',
            'showRanges',
            'thumbSize',
            'tickSpacing',
            'getText',
            'direction',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.gauge.LinearGauge control.
     *
     * Use the <b>wj-linear-gauge</b> component to add <b>LinearGauge</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjLinearGauge</b> component is derived from the <b>LinearGauge</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-linear-gauge</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
    */
    var WjLinearGauge = /** @class */ (function (_super) {
        __extends(WjLinearGauge, _super);
        function WjLinearGauge(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjLinearGauge_1 = WjLinearGauge;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjLinearGauge.prototype.created = function () {
        };
        WjLinearGauge.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjLinearGauge.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjLinearGauge.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjLinearGauge.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjLinearGauge.meta = {
            outputs: exports.wjLinearGaugeMeta.outputs,
            changeEvents: {
                'valueChanged': ['value']
            },
        };
        WjLinearGauge = WjLinearGauge_1 = __decorate([
            core_1.Component({
                selector: exports.wjLinearGaugeMeta.selector,
                template: exports.wjLinearGaugeMeta.template,
                inputs: exports.wjLinearGaugeMeta.inputs,
                outputs: exports.wjLinearGaugeMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjLinearGauge_1; }) }
                ].concat(exports.wjLinearGaugeMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjLinearGauge);
        return WjLinearGauge;
        var WjLinearGauge_1;
    }(wijmo.gauge.LinearGauge));
    exports.WjLinearGauge = WjLinearGauge;
    exports.wjBulletGraphMeta = {
        selector: 'wj-bullet-graph',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'value',
            'min',
            'max',
            'origin',
            'isReadOnly',
            'step',
            'format',
            'thickness',
            'hasShadow',
            'isAnimated',
            'showText',
            'showTicks',
            'showRanges',
            'thumbSize',
            'tickSpacing',
            'getText',
            'direction',
            'target',
            'good',
            'bad',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.gauge.BulletGraph control.
     *
     * Use the <b>wj-bullet-graph</b> component to add <b>BulletGraph</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjBulletGraph</b> component is derived from the <b>BulletGraph</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-bullet-graph</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
    */
    var WjBulletGraph = /** @class */ (function (_super) {
        __extends(WjBulletGraph, _super);
        function WjBulletGraph(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjBulletGraph_1 = WjBulletGraph;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjBulletGraph.prototype.created = function () {
        };
        WjBulletGraph.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjBulletGraph.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjBulletGraph.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjBulletGraph.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjBulletGraph.meta = {
            outputs: exports.wjBulletGraphMeta.outputs,
            changeEvents: {
                'valueChanged': ['value']
            },
        };
        WjBulletGraph = WjBulletGraph_1 = __decorate([
            core_1.Component({
                selector: exports.wjBulletGraphMeta.selector,
                template: exports.wjBulletGraphMeta.template,
                inputs: exports.wjBulletGraphMeta.inputs,
                outputs: exports.wjBulletGraphMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjBulletGraph_1; }) }
                ].concat(exports.wjBulletGraphMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjBulletGraph);
        return WjBulletGraph;
        var WjBulletGraph_1;
    }(wijmo.gauge.BulletGraph));
    exports.WjBulletGraph = WjBulletGraph;
    exports.wjRadialGaugeMeta = {
        selector: 'wj-radial-gauge',
        template: "<div><ng-content></ng-content></div>",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'value',
            'min',
            'max',
            'origin',
            'isReadOnly',
            'step',
            'format',
            'thickness',
            'hasShadow',
            'isAnimated',
            'showText',
            'showTicks',
            'showRanges',
            'thumbSize',
            'tickSpacing',
            'getText',
            'autoScale',
            'startAngle',
            'sweepAngle',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'valueChangedNg: valueChanged',
            'valueChangePC: valueChange',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.gauge.RadialGauge control.
     *
     * Use the <b>wj-radial-gauge</b> component to add <b>RadialGauge</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjRadialGauge</b> component is derived from the <b>RadialGauge</b> control and
     * inherits all its properties, events and methods.
     *
     * The <b>wj-radial-gauge</b> component may contain a @see:wijmo/wijmo.angular2.gauge.WjRange child component.
    */
    var WjRadialGauge = /** @class */ (function (_super) {
        __extends(WjRadialGauge, _super);
        function WjRadialGauge(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Defines a name of a property represented by [(ngModel)] directive (if specified).
             * Default value is 'value'.
             */
            _this.wjModelProperty = 'value';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjRadialGauge_1 = WjRadialGauge;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjRadialGauge.prototype.created = function () {
        };
        WjRadialGauge.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjRadialGauge.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjRadialGauge.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjRadialGauge.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjRadialGauge.meta = {
            outputs: exports.wjRadialGaugeMeta.outputs,
            changeEvents: {
                'valueChanged': ['value']
            },
        };
        WjRadialGauge = WjRadialGauge_1 = __decorate([
            core_1.Component({
                selector: exports.wjRadialGaugeMeta.selector,
                template: exports.wjRadialGaugeMeta.template,
                inputs: exports.wjRadialGaugeMeta.inputs,
                outputs: exports.wjRadialGaugeMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjRadialGauge_1; }) }
                ].concat(exports.wjRadialGaugeMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjRadialGauge);
        return WjRadialGauge;
        var WjRadialGauge_1;
    }(wijmo.gauge.RadialGauge));
    exports.WjRadialGauge = WjRadialGauge;
    exports.wjRangeMeta = {
        selector: 'wj-range',
        template: "",
        inputs: [
            'wjProperty',
            'color',
            'min',
            'max',
            'name',
            'thickness',
        ],
        outputs: [
            'initialized',
        ],
        providers: []
    };
    /**
     * Angular 2 component for the @see:wijmo.gauge.Range control.
     *
     * The <b>wj-range</b> component must be
     * contained in one of the following components:
     * @see:wijmo/wijmo.angular2.gauge.WjLinearGauge
     * , @see:wijmo/wijmo.angular2.gauge.WjBulletGraph
     *  or @see:wijmo/wijmo.angular2.gauge.WjRadialGauge.
     *
     * Use the <b>wj-range</b> component to add <b>Range</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjRange</b> component is derived from the <b>Range</b> control and
     * inherits all its properties, events and methods.
    */
    var WjRange = /** @class */ (function (_super) {
        __extends(WjRange, _super);
        function WjRange(elRef, injector, parentCmp) {
            var _this = _super.call(this) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            /**
             * Gets or sets a name of a property that this component is assigned to.
             * Default value is 'ranges'.
             */
            _this.wjProperty = 'ranges';
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjRange_1 = WjRange;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjRange.prototype.created = function () {
        };
        WjRange.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjRange.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjRange.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjRange.meta = {
            outputs: exports.wjRangeMeta.outputs,
        };
        WjRange = WjRange_1 = __decorate([
            core_1.Component({
                selector: exports.wjRangeMeta.selector,
                template: exports.wjRangeMeta.template,
                inputs: exports.wjRangeMeta.inputs,
                outputs: exports.wjRangeMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjRange_1; }) }
                ].concat(exports.wjRangeMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjRange);
        return WjRange;
        var WjRange_1;
    }(wijmo.gauge.Range));
    exports.WjRange = WjRange;
    var moduleExports = [
        WjLinearGauge,
        WjBulletGraph,
        WjRadialGauge,
        WjRange
    ];
    var WjGaugeModule = /** @class */ (function () {
        function WjGaugeModule() {
        }
        WjGaugeModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjGaugeModule);
        return WjGaugeModule;
    }());
    exports.WjGaugeModule = WjGaugeModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.olap</b> module.
*
* <b>wijmo.angular2.olap</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjOlap from 'wijmo/wijmo.angular2.olap';
* &nbsp;
* &#64;Component({
*     directives: [wjOlap.WjPivotGrid],
*     template: '&lt;wj-pivot-grid [itemsSource]="data"&gt;&lt;/wj-pivot-grid&gt;',
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.olap'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.olap", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjPivotGridMeta = {
        selector: 'wj-pivot-grid',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'newRowAtTop',
            'allowAddNew',
            'allowDelete',
            'allowDragging',
            'allowMerging',
            'allowResizing',
            'allowSorting',
            'autoSizeMode',
            'autoGenerateColumns',
            'childItemsPath',
            'groupHeaderFormat',
            'headersVisibility',
            'showSelectedHeaders',
            'showMarquee',
            'itemFormatter',
            'isReadOnly',
            'imeEnabled',
            'mergeManager',
            'selectionMode',
            'showGroups',
            'showSort',
            'showDropDown',
            'showAlternatingRows',
            'showErrors',
            'validateEdits',
            'treeIndent',
            'itemsSource',
            'autoClipboard',
            'frozenRows',
            'frozenColumns',
            'deferResizing',
            'sortRowIndex',
            'stickyHeaders',
            'preserveSelectedState',
            'preserveOutlineState',
            'keyActionTab',
            'keyActionEnter',
            'rowHeaderPath',
            'virtualizationThreshold',
            'showDetailOnDoubleClick',
            'customContextMenu',
            'collapsibleSubtotals',
            'centerHeadersVertically',
            'showColumnFieldHeaders',
            'showRowFieldHeaders',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'beginningEditNg: beginningEdit',
            'cellEditEndedNg: cellEditEnded',
            'cellEditEndingNg: cellEditEnding',
            'prepareCellForEditNg: prepareCellForEdit',
            'formatItemNg: formatItem',
            'resizingColumnNg: resizingColumn',
            'resizedColumnNg: resizedColumn',
            'autoSizingColumnNg: autoSizingColumn',
            'autoSizedColumnNg: autoSizedColumn',
            'draggingColumnNg: draggingColumn',
            'draggingColumnOverNg: draggingColumnOver',
            'draggedColumnNg: draggedColumn',
            'sortingColumnNg: sortingColumn',
            'sortedColumnNg: sortedColumn',
            'resizingRowNg: resizingRow',
            'resizedRowNg: resizedRow',
            'autoSizingRowNg: autoSizingRow',
            'autoSizedRowNg: autoSizedRow',
            'draggingRowNg: draggingRow',
            'draggingRowOverNg: draggingRowOver',
            'draggedRowNg: draggedRow',
            'deletingRowNg: deletingRow',
            'deletedRowNg: deletedRow',
            'loadingRowsNg: loadingRows',
            'loadedRowsNg: loadedRows',
            'rowEditStartingNg: rowEditStarting',
            'rowEditStartedNg: rowEditStarted',
            'rowEditEndingNg: rowEditEnding',
            'rowEditEndedNg: rowEditEnded',
            'rowAddedNg: rowAdded',
            'groupCollapsedChangedNg: groupCollapsedChanged',
            'groupCollapsedChangingNg: groupCollapsedChanging',
            'itemsSourceChangedNg: itemsSourceChanged',
            'selectionChangingNg: selectionChanging',
            'selectionChangedNg: selectionChanged',
            'scrollPositionChangedNg: scrollPositionChanged',
            'updatingViewNg: updatingView',
            'updatedViewNg: updatedView',
            'updatingLayoutNg: updatingLayout',
            'updatedLayoutNg: updatedLayout',
            'pastingNg: pasting',
            'pastedNg: pasted',
            'pastingCellNg: pastingCell',
            'pastedCellNg: pastedCell',
            'copyingNg: copying',
            'copiedNg: copied',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.olap.PivotGrid control.
     *
     * Use the <b>wj-pivot-grid</b> component to add <b>PivotGrid</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjPivotGrid</b> component is derived from the <b>PivotGrid</b> control and
     * inherits all its properties, events and methods.
    */
    var WjPivotGrid = /** @class */ (function (_super) {
        __extends(WjPivotGrid, _super);
        function WjPivotGrid(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjPivotGrid_1 = WjPivotGrid;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjPivotGrid.prototype.created = function () {
        };
        WjPivotGrid.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjPivotGrid.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjPivotGrid.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjPivotGrid.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjPivotGrid.meta = {
            outputs: exports.wjPivotGridMeta.outputs,
        };
        WjPivotGrid = WjPivotGrid_1 = __decorate([
            core_1.Component({
                selector: exports.wjPivotGridMeta.selector,
                template: exports.wjPivotGridMeta.template,
                inputs: exports.wjPivotGridMeta.inputs,
                outputs: exports.wjPivotGridMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotGrid_1; }) }
                ].concat(exports.wjPivotGridMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjPivotGrid);
        return WjPivotGrid;
        var WjPivotGrid_1;
    }(wijmo.olap.PivotGrid));
    exports.WjPivotGrid = WjPivotGrid;
    exports.wjPivotChartMeta = {
        selector: 'wj-pivot-chart',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'chartType',
            'showHierarchicalAxes',
            'showTotals',
            'showTitle',
            'showLegend',
            'legendPosition',
            'stacking',
            'maxSeries',
            'maxPoints',
            'itemsSource',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.olap.PivotChart control.
     *
     * Use the <b>wj-pivot-chart</b> component to add <b>PivotChart</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjPivotChart</b> component is derived from the <b>PivotChart</b> control and
     * inherits all its properties, events and methods.
    */
    var WjPivotChart = /** @class */ (function (_super) {
        __extends(WjPivotChart, _super);
        function WjPivotChart(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjPivotChart_1 = WjPivotChart;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjPivotChart.prototype.created = function () {
        };
        WjPivotChart.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjPivotChart.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjPivotChart.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjPivotChart.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjPivotChart.meta = {
            outputs: exports.wjPivotChartMeta.outputs,
        };
        WjPivotChart = WjPivotChart_1 = __decorate([
            core_1.Component({
                selector: exports.wjPivotChartMeta.selector,
                template: exports.wjPivotChartMeta.template,
                inputs: exports.wjPivotChartMeta.inputs,
                outputs: exports.wjPivotChartMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotChart_1; }) }
                ].concat(exports.wjPivotChartMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjPivotChart);
        return WjPivotChart;
        var WjPivotChart_1;
    }(wijmo.olap.PivotChart));
    exports.WjPivotChart = WjPivotChart;
    exports.wjPivotPanelMeta = {
        selector: 'wj-pivot-panel',
        template: "",
        inputs: [
            'wjModelProperty',
            'isDisabled',
            'autoGenerateFields',
            'viewDefinition',
            'engine',
            'itemsSource',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'itemsSourceChangedNg: itemsSourceChanged',
            'viewDefinitionChangedNg: viewDefinitionChanged',
            'updatingViewNg: updatingView',
            'updatedViewNg: updatedView',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.olap.PivotPanel control.
     *
     * Use the <b>wj-pivot-panel</b> component to add <b>PivotPanel</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjPivotPanel</b> component is derived from the <b>PivotPanel</b> control and
     * inherits all its properties, events and methods.
    */
    var WjPivotPanel = /** @class */ (function (_super) {
        __extends(WjPivotPanel, _super);
        function WjPivotPanel(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjPivotPanel_1 = WjPivotPanel;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjPivotPanel.prototype.created = function () {
        };
        WjPivotPanel.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjPivotPanel.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjPivotPanel.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjPivotPanel.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjPivotPanel.meta = {
            outputs: exports.wjPivotPanelMeta.outputs,
        };
        WjPivotPanel = WjPivotPanel_1 = __decorate([
            core_1.Component({
                selector: exports.wjPivotPanelMeta.selector,
                template: exports.wjPivotPanelMeta.template,
                inputs: exports.wjPivotPanelMeta.inputs,
                outputs: exports.wjPivotPanelMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotPanel_1; }) }
                ].concat(exports.wjPivotPanelMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjPivotPanel);
        return WjPivotPanel;
        var WjPivotPanel_1;
    }(wijmo.olap.PivotPanel));
    exports.WjPivotPanel = WjPivotPanel;
    var moduleExports = [
        WjPivotGrid,
        WjPivotChart,
        WjPivotPanel
    ];
    var WjOlapModule = /** @class */ (function () {
        function WjOlapModule() {
        }
        WjOlapModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjOlapModule);
        return WjOlapModule;
    }());
    exports.WjOlapModule = WjOlapModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.viewer</b> module.
*
* <b>wijmo.angular2.viewer</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjViewer from 'wijmo/wijmo.angular2.viewer';
* &nbsp;
* &#64;Component({
*     directives: [wjViewer.WjReportViewer, wjViewer.WjPdfViewer],
*     template: `
*       &lt;wj-report-viewer [reportName]="sales" [serviceUrl]="'webserviceApi'"&gt;
*       &lt;/wj-report-viewer;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.viewer'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.viewer", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjReportViewerMeta = {
        selector: 'wj-report-viewer',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'serviceUrl',
            'filePath',
            'fullScreen',
            'zoomFactor',
            'mouseMode',
            'selectMouseMode',
            'viewMode',
            'paginated',
            'reportName',
        ],
        outputs: [
            'initialized',
            'pageIndexChangedNg: pageIndexChanged',
            'viewModeChangedNg: viewModeChanged',
            'viewModeChangePC: viewModeChange',
            'mouseModeChangedNg: mouseModeChanged',
            'mouseModeChangePC: mouseModeChange',
            'selectMouseModeChangedNg: selectMouseModeChanged',
            'selectMouseModeChangePC: selectMouseModeChange',
            'fullScreenChangedNg: fullScreenChanged',
            'fullScreenChangePC: fullScreenChange',
            'zoomFactorChangedNg: zoomFactorChanged',
            'zoomFactorChangePC: zoomFactorChange',
            'queryLoadingDataNg: queryLoadingData',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.viewer.ReportViewer control.
     *
     * Use the <b>wj-report-viewer</b> component to add <b>ReportViewer</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjReportViewer</b> component is derived from the <b>ReportViewer</b> control and
     * inherits all its properties, events and methods.
    */
    var WjReportViewer = /** @class */ (function (_super) {
        __extends(WjReportViewer, _super);
        function WjReportViewer(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjReportViewer_1 = WjReportViewer;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjReportViewer.prototype.created = function () {
        };
        WjReportViewer.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjReportViewer.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjReportViewer.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjReportViewer.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjReportViewer.prototype.onSelectMouseModeChanged = function (e) {
            // Wijmo interop always subscribes to any event, so we issue a deprecated warning
            // only if there are more than one subscriber. 
            if (this.selectMouseModeChanged['_handlers'].length > 1 ||
                this.selectMouseModeChangedNg.observers.length > 0) {
                wijmo._deprecated('selectMouseModeChanged', 'mouseModeChanged');
            }
            this.selectMouseModeChanged.raise(this, e);
        };
        WjReportViewer.meta = {
            outputs: exports.wjReportViewerMeta.outputs,
            changeEvents: {
                'viewModeChanged': ['viewMode'],
                'mouseModeChanged': ['mouseMode'],
                'selectMouseModeChanged': ['selectMouseMode'],
                'fullScreenChanged': ['fullScreen'],
                'zoomFactorChanged': ['zoomFactor']
            },
        };
        WjReportViewer = WjReportViewer_1 = __decorate([
            core_1.Component({
                selector: exports.wjReportViewerMeta.selector,
                template: exports.wjReportViewerMeta.template,
                inputs: exports.wjReportViewerMeta.inputs,
                outputs: exports.wjReportViewerMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjReportViewer_1; }) }
                ].concat(exports.wjReportViewerMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjReportViewer);
        return WjReportViewer;
        var WjReportViewer_1;
    }(wijmo.viewer.ReportViewer));
    exports.WjReportViewer = WjReportViewer;
    exports.wjPdfViewerMeta = {
        selector: 'wj-pdf-viewer',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'serviceUrl',
            'filePath',
            'fullScreen',
            'zoomFactor',
            'mouseMode',
            'selectMouseMode',
            'viewMode',
        ],
        outputs: [
            'initialized',
            'pageIndexChangedNg: pageIndexChanged',
            'viewModeChangedNg: viewModeChanged',
            'viewModeChangePC: viewModeChange',
            'mouseModeChangedNg: mouseModeChanged',
            'mouseModeChangePC: mouseModeChange',
            'selectMouseModeChangedNg: selectMouseModeChanged',
            'selectMouseModeChangePC: selectMouseModeChange',
            'fullScreenChangedNg: fullScreenChanged',
            'fullScreenChangePC: fullScreenChange',
            'zoomFactorChangedNg: zoomFactorChanged',
            'zoomFactorChangePC: zoomFactorChange',
            'queryLoadingDataNg: queryLoadingData',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.viewer.PdfViewer control.
     *
     * Use the <b>wj-pdf-viewer</b> component to add <b>PdfViewer</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjPdfViewer</b> component is derived from the <b>PdfViewer</b> control and
     * inherits all its properties, events and methods.
    */
    var WjPdfViewer = /** @class */ (function (_super) {
        __extends(WjPdfViewer, _super);
        function WjPdfViewer(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjPdfViewer_1 = WjPdfViewer;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjPdfViewer.prototype.created = function () {
        };
        WjPdfViewer.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjPdfViewer.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjPdfViewer.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjPdfViewer.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjPdfViewer.prototype.onSelectMouseModeChanged = function (e) {
            // Wijmo interop always subscribes to any event, so we issue a deprecated warning
            // only if there are more than one subscriber. 
            if (this.selectMouseModeChanged['_handlers'].length > 1 ||
                this.selectMouseModeChangedNg.observers.length > 0) {
                wijmo._deprecated('selectMouseModeChanged', 'mouseModeChanged');
            }
            this.selectMouseModeChanged.raise(this, e);
        };
        WjPdfViewer.meta = {
            outputs: exports.wjPdfViewerMeta.outputs,
            changeEvents: {
                'viewModeChanged': ['viewMode'],
                'mouseModeChanged': ['mouseMode'],
                'selectMouseModeChanged': ['selectMouseMode'],
                'fullScreenChanged': ['fullScreen'],
                'zoomFactorChanged': ['zoomFactor']
            },
        };
        WjPdfViewer = WjPdfViewer_1 = __decorate([
            core_1.Component({
                selector: exports.wjPdfViewerMeta.selector,
                template: exports.wjPdfViewerMeta.template,
                inputs: exports.wjPdfViewerMeta.inputs,
                outputs: exports.wjPdfViewerMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPdfViewer_1; }) }
                ].concat(exports.wjPdfViewerMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjPdfViewer);
        return WjPdfViewer;
        var WjPdfViewer_1;
    }(wijmo.viewer.PdfViewer));
    exports.WjPdfViewer = WjPdfViewer;
    var moduleExports = [
        WjReportViewer,
        WjPdfViewer
    ];
    var WjViewerModule = /** @class */ (function () {
        function WjViewerModule() {
        }
        WjViewerModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjViewerModule);
        return WjViewerModule;
    }());
    exports.WjViewerModule = WjViewerModule;
});

/**
* Contains Angular 2 components for the <b>wijmo.nav</b> module.
*
* <b>wijmo.angular2.nav</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjNav from 'wijmo/wijmo.angular2.nav';
* &nbsp;
* &#64;Component({
*     directives: [wjNav.WjTreeView],
*     template: `
*       &lt;wj-tree-view [itemsSource]="items" [displayMemberPath]="'header'" [childItemsPath]="'items'"&gt;
*       &lt;/wj-tree-view;`,
*     selector: 'my-cmp',
* })
* export class MyCmp {
*     data: any[];
* }</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.nav'/>
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define("wijmo/wijmo.angular2.nav", ["require", "exports", "@angular/core", "@angular/core", "@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (require, exports, core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjTreeViewMeta = {
        selector: 'wj-tree-view',
        template: "",
        inputs: [
            'asyncBindings',
            'wjModelProperty',
            'isDisabled',
            'childItemsPath',
            'displayMemberPath',
            'imageMemberPath',
            'isContentHtml',
            'showCheckboxes',
            'autoCollapse',
            'isAnimated',
            'isReadOnly',
            'allowDragging',
            'expandOnClick',
            'lazyLoadFunction',
            'itemsSource',
            'selectedItem',
            'selectedNode',
            'checkedItems',
        ],
        outputs: [
            'initialized',
            'gotFocusNg: gotFocus',
            'lostFocusNg: lostFocus',
            'itemsSourceChangedNg: itemsSourceChanged',
            'loadingItemsNg: loadingItems',
            'loadedItemsNg: loadedItems',
            'itemClickedNg: itemClicked',
            'selectedItemChangedNg: selectedItemChanged',
            'selectedItemChangePC: selectedItemChange',
            'selectedNodeChangePC: selectedNodeChange',
            'checkedItemsChangedNg: checkedItemsChanged',
            'checkedItemsChangePC: checkedItemsChange',
            'isCollapsedChangingNg: isCollapsedChanging',
            'isCollapsedChangedNg: isCollapsedChanged',
            'isCheckedChangingNg: isCheckedChanging',
            'isCheckedChangedNg: isCheckedChanged',
            'formatItemNg: formatItem',
            'dragStartNg: dragStart',
            'dragOverNg: dragOver',
            'dropNg: drop',
            'dragEndNg: dragEnd',
            'nodeEditStartingNg: nodeEditStarting',
            'nodeEditStartedNg: nodeEditStarted',
            'nodeEditEndingNg: nodeEditEnding',
            'nodeEditEndedNg: nodeEditEnded',
        ],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR, useFactory: wijmo_angular2_directiveBase_1.WjValueAccessorFactory, multi: true,
                deps: ['WjComponent']
            }
        ]
    };
    /**
     * Angular 2 component for the @see:wijmo.nav.TreeView control.
     *
     * Use the <b>wj-tree-view</b> component to add <b>TreeView</b> controls to your
     * Angular 2 applications. For details about Angular 2 markup syntax, see
     * <a href="static/angular2Markup.html">Angular 2 Markup</a>.
     *
    * The <b>WjTreeView</b> component is derived from the <b>TreeView</b> control and
     * inherits all its properties, events and methods.
    */
    var WjTreeView = /** @class */ (function (_super) {
        __extends(WjTreeView, _super);
        function WjTreeView(elRef, injector, parentCmp) {
            var _this = _super.call(this, wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(elRef, injector)) || this;
            /**
             * Indicates whether the component has been initialized by Angular.
             * Changes its value from false to true right before triggering the <b>initialized</b> event.
             */
            _this.isInitialized = false;
            var behavior = _this._wjBehaviour = wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(_this, elRef, injector, parentCmp);
            _this.created();
            return _this;
        }
        WjTreeView_1 = WjTreeView;
        /**
         * If you create a custom component inherited from a Wijmo component, you can override this
         * method and perform necessary initializations that you usually do in a class constructor.
         * This method is called in the last line of a Wijmo component constructor and allows you
         * to not declare your custom component's constructor at all, thus preventing you from a necessity
         * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
         */
        WjTreeView.prototype.created = function () {
        };
        WjTreeView.prototype.ngOnInit = function () {
            this._wjBehaviour.ngOnInit();
        };
        WjTreeView.prototype.ngAfterViewInit = function () {
            this._wjBehaviour.ngAfterViewInit();
        };
        WjTreeView.prototype.ngOnDestroy = function () {
            this._wjBehaviour.ngOnDestroy();
        };
        WjTreeView.prototype.addEventListener = function (target, type, fn, capture) {
            var _this = this;
            if (capture === void 0) { capture = false; }
            var behCl = wijmo_angular2_directiveBase_1.WjDirectiveBehavior, ngZone = behCl.ngZone;
            if (ngZone && behCl.outsideZoneEvents[type]) {
                ngZone.runOutsideAngular(function () {
                    _super.prototype.addEventListener.call(_this, target, type, fn, capture);
                });
            }
            else {
                _super.prototype.addEventListener.call(this, target, type, fn, capture);
            }
        };
        WjTreeView.meta = {
            outputs: exports.wjTreeViewMeta.outputs,
            changeEvents: {
                'selectedItemChanged': ['selectedItem', 'selectedNode'],
                'checkedItemsChanged': ['checkedItems']
            },
        };
        WjTreeView = WjTreeView_1 = __decorate([
            core_1.Component({
                selector: exports.wjTreeViewMeta.selector,
                template: exports.wjTreeViewMeta.template,
                inputs: exports.wjTreeViewMeta.inputs,
                outputs: exports.wjTreeViewMeta.outputs,
                providers: [
                    { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjTreeView_1; }) }
                ].concat(exports.wjTreeViewMeta.providers)
            }),
            __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
            __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
        ], WjTreeView);
        return WjTreeView;
        var WjTreeView_1;
    }(wijmo.nav.TreeView));
    exports.WjTreeView = WjTreeView;
    var moduleExports = [
        WjTreeView
    ];
    var WjNavModule = /** @class */ (function () {
        function WjNavModule() {
        }
        WjNavModule = __decorate([
            core_1.NgModule({
                imports: [wijmo_angular2_directiveBase_1.WjDirectiveBaseModule, common_1.CommonModule],
                declarations: moduleExports.slice(),
                exports: moduleExports.slice(),
            })
        ], WjNavModule);
        return WjNavModule;
    }());
    exports.WjNavModule = WjNavModule;
});

///<amd-module name='wijmo/wijmo.angular2.all'/>
define("wijmo/wijmo.angular2.all", ["require", "exports", "wijmo/wijmo.angular2.input", "wijmo/wijmo.angular2.grid", "wijmo/wijmo.angular2.chart", "wijmo/wijmo.angular2.gauge", "wijmo/wijmo.angular2.core", "wijmo/wijmo.angular2.viewer"], function (require, exports, wjNg2Input, wjNg2Grid, wjNg2Chart, wjNg2Gauge, wjNg2Core, wjNg2Viewer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wjNg2Input = wjNg2Input;
    exports.wjNg2Grid = wjNg2Grid;
    exports.wjNg2Chart = wjNg2Chart;
    exports.wjNg2Gauge = wjNg2Gauge;
    exports.wjNg2Core = wjNg2Core;
    exports.wjNg2Viewer = wjNg2Viewer;
});
//export module wj.angular2 {
//} 

