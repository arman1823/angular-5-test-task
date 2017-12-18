﻿/*
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
System.register("wijmo/wijmo.angular2.gauge", ["@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
    "use strict";
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
    var __moduleName = context_1 && context_1.id;
    var core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1, wjLinearGaugeMeta, WjLinearGauge, wjBulletGraphMeta, WjBulletGraph, wjRadialGaugeMeta, WjRadialGauge, wjRangeMeta, WjRange, moduleExports, WjGaugeModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (wijmo_angular2_directiveBase_1_1) {
                wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1;
            }
        ],
        execute: function () {
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
            exports_1("wjLinearGaugeMeta", wjLinearGaugeMeta = {
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
            });
            WjLinearGauge = /** @class */ (function (_super) {
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
                    outputs: wjLinearGaugeMeta.outputs,
                    changeEvents: {
                        'valueChanged': ['value']
                    },
                };
                WjLinearGauge = WjLinearGauge_1 = __decorate([
                    core_1.Component({
                        selector: wjLinearGaugeMeta.selector,
                        template: wjLinearGaugeMeta.template,
                        inputs: wjLinearGaugeMeta.inputs,
                        outputs: wjLinearGaugeMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjLinearGauge_1; }) }
                        ].concat(wjLinearGaugeMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjLinearGauge);
                return WjLinearGauge;
                var WjLinearGauge_1;
            }(wijmo.gauge.LinearGauge));
            exports_1("WjLinearGauge", WjLinearGauge);
            exports_1("wjBulletGraphMeta", wjBulletGraphMeta = {
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
            });
            WjBulletGraph = /** @class */ (function (_super) {
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
                    outputs: wjBulletGraphMeta.outputs,
                    changeEvents: {
                        'valueChanged': ['value']
                    },
                };
                WjBulletGraph = WjBulletGraph_1 = __decorate([
                    core_1.Component({
                        selector: wjBulletGraphMeta.selector,
                        template: wjBulletGraphMeta.template,
                        inputs: wjBulletGraphMeta.inputs,
                        outputs: wjBulletGraphMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjBulletGraph_1; }) }
                        ].concat(wjBulletGraphMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjBulletGraph);
                return WjBulletGraph;
                var WjBulletGraph_1;
            }(wijmo.gauge.BulletGraph));
            exports_1("WjBulletGraph", WjBulletGraph);
            exports_1("wjRadialGaugeMeta", wjRadialGaugeMeta = {
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
            });
            WjRadialGauge = /** @class */ (function (_super) {
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
                    outputs: wjRadialGaugeMeta.outputs,
                    changeEvents: {
                        'valueChanged': ['value']
                    },
                };
                WjRadialGauge = WjRadialGauge_1 = __decorate([
                    core_1.Component({
                        selector: wjRadialGaugeMeta.selector,
                        template: wjRadialGaugeMeta.template,
                        inputs: wjRadialGaugeMeta.inputs,
                        outputs: wjRadialGaugeMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjRadialGauge_1; }) }
                        ].concat(wjRadialGaugeMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjRadialGauge);
                return WjRadialGauge;
                var WjRadialGauge_1;
            }(wijmo.gauge.RadialGauge));
            exports_1("WjRadialGauge", WjRadialGauge);
            exports_1("wjRangeMeta", wjRangeMeta = {
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
            });
            WjRange = /** @class */ (function (_super) {
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
                    outputs: wjRangeMeta.outputs,
                };
                WjRange = WjRange_1 = __decorate([
                    core_1.Component({
                        selector: wjRangeMeta.selector,
                        template: wjRangeMeta.template,
                        inputs: wjRangeMeta.inputs,
                        outputs: wjRangeMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjRange_1; }) }
                        ].concat(wjRangeMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjRange);
                return WjRange;
                var WjRange_1;
            }(wijmo.gauge.Range));
            exports_1("WjRange", WjRange);
            moduleExports = [
                WjLinearGauge,
                WjBulletGraph,
                WjRadialGauge,
                WjRange
            ];
            WjGaugeModule = /** @class */ (function () {
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
            exports_1("WjGaugeModule", WjGaugeModule);
        }
    };
});
