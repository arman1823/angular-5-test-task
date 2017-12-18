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
* Contains Angular 2 components for the <b>wijmo.chart.finance.analytics</b> module.
*
* <b>wijmo.angular2.chart.finance.analytics</b> is an external TypeScript module that can be imported to your code
* using its ambient module name. For example:
*
* <pre>import * as wjFinanceAnalitics from 'wijmo/wijmo.angular2.chart.finance.analytics';</pre>
*
*/
///<amd-module name='wijmo/wijmo.angular2.chart.finance.analytics'/>
System.register("wijmo/wijmo.angular2.chart.finance.analytics", ["@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
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
    var core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1, wjFlexChartFibonacciMeta, WjFlexChartFibonacci, wjFlexChartFibonacciArcsMeta, WjFlexChartFibonacciArcs, wjFlexChartFibonacciFansMeta, WjFlexChartFibonacciFans, wjFlexChartFibonacciTimeZonesMeta, WjFlexChartFibonacciTimeZones, wjFlexChartAtrMeta, WjFlexChartAtr, wjFlexChartCciMeta, WjFlexChartCci, wjFlexChartRsiMeta, WjFlexChartRsi, wjFlexChartWilliamsRMeta, WjFlexChartWilliamsR, wjFlexChartMacdMeta, WjFlexChartMacd, wjFlexChartMacdHistogramMeta, WjFlexChartMacdHistogram, wjFlexChartStochasticMeta, WjFlexChartStochastic, wjFlexChartBollingerBandsMeta, WjFlexChartBollingerBands, wjFlexChartEnvelopesMeta, WjFlexChartEnvelopes, moduleExports, WjChartFinanceAnalyticsModule;
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
            function (wijmo_angular2_directiveBase_1_1) {
                wijmo_angular2_directiveBase_1 = wijmo_angular2_directiveBase_1_1;
            }
        ],
        execute: function () {
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
            exports_1("wjFlexChartFibonacciMeta", wjFlexChartFibonacciMeta = {
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
            });
            WjFlexChartFibonacci = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartFibonacciMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartFibonacci = WjFlexChartFibonacci_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartFibonacciMeta.selector,
                        template: wjFlexChartFibonacciMeta.template,
                        inputs: wjFlexChartFibonacciMeta.inputs,
                        outputs: wjFlexChartFibonacciMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacci_1; }) }
                        ].concat(wjFlexChartFibonacciMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartFibonacci);
                return WjFlexChartFibonacci;
                var WjFlexChartFibonacci_1;
            }(wijmo.chart.finance.analytics.Fibonacci));
            exports_1("WjFlexChartFibonacci", WjFlexChartFibonacci);
            exports_1("wjFlexChartFibonacciArcsMeta", wjFlexChartFibonacciArcsMeta = {
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
            });
            WjFlexChartFibonacciArcs = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartFibonacciArcsMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartFibonacciArcs = WjFlexChartFibonacciArcs_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartFibonacciArcsMeta.selector,
                        template: wjFlexChartFibonacciArcsMeta.template,
                        inputs: wjFlexChartFibonacciArcsMeta.inputs,
                        outputs: wjFlexChartFibonacciArcsMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciArcs_1; }) }
                        ].concat(wjFlexChartFibonacciArcsMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartFibonacciArcs);
                return WjFlexChartFibonacciArcs;
                var WjFlexChartFibonacciArcs_1;
            }(wijmo.chart.finance.analytics.FibonacciArcs));
            exports_1("WjFlexChartFibonacciArcs", WjFlexChartFibonacciArcs);
            exports_1("wjFlexChartFibonacciFansMeta", wjFlexChartFibonacciFansMeta = {
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
            });
            WjFlexChartFibonacciFans = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartFibonacciFansMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartFibonacciFans = WjFlexChartFibonacciFans_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartFibonacciFansMeta.selector,
                        template: wjFlexChartFibonacciFansMeta.template,
                        inputs: wjFlexChartFibonacciFansMeta.inputs,
                        outputs: wjFlexChartFibonacciFansMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciFans_1; }) }
                        ].concat(wjFlexChartFibonacciFansMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartFibonacciFans);
                return WjFlexChartFibonacciFans;
                var WjFlexChartFibonacciFans_1;
            }(wijmo.chart.finance.analytics.FibonacciFans));
            exports_1("WjFlexChartFibonacciFans", WjFlexChartFibonacciFans);
            exports_1("wjFlexChartFibonacciTimeZonesMeta", wjFlexChartFibonacciTimeZonesMeta = {
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
            });
            WjFlexChartFibonacciTimeZones = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartFibonacciTimeZonesMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartFibonacciTimeZones = WjFlexChartFibonacciTimeZones_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartFibonacciTimeZonesMeta.selector,
                        template: wjFlexChartFibonacciTimeZonesMeta.template,
                        inputs: wjFlexChartFibonacciTimeZonesMeta.inputs,
                        outputs: wjFlexChartFibonacciTimeZonesMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartFibonacciTimeZones_1; }) }
                        ].concat(wjFlexChartFibonacciTimeZonesMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartFibonacciTimeZones);
                return WjFlexChartFibonacciTimeZones;
                var WjFlexChartFibonacciTimeZones_1;
            }(wijmo.chart.finance.analytics.FibonacciTimeZones));
            exports_1("WjFlexChartFibonacciTimeZones", WjFlexChartFibonacciTimeZones);
            exports_1("wjFlexChartAtrMeta", wjFlexChartAtrMeta = {
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
            });
            WjFlexChartAtr = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartAtrMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartAtr = WjFlexChartAtr_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartAtrMeta.selector,
                        template: wjFlexChartAtrMeta.template,
                        inputs: wjFlexChartAtrMeta.inputs,
                        outputs: wjFlexChartAtrMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartAtr_1; }) }
                        ].concat(wjFlexChartAtrMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartAtr);
                return WjFlexChartAtr;
                var WjFlexChartAtr_1;
            }(wijmo.chart.finance.analytics.ATR));
            exports_1("WjFlexChartAtr", WjFlexChartAtr);
            exports_1("wjFlexChartCciMeta", wjFlexChartCciMeta = {
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
            });
            WjFlexChartCci = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartCciMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartCci = WjFlexChartCci_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartCciMeta.selector,
                        template: wjFlexChartCciMeta.template,
                        inputs: wjFlexChartCciMeta.inputs,
                        outputs: wjFlexChartCciMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartCci_1; }) }
                        ].concat(wjFlexChartCciMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartCci);
                return WjFlexChartCci;
                var WjFlexChartCci_1;
            }(wijmo.chart.finance.analytics.CCI));
            exports_1("WjFlexChartCci", WjFlexChartCci);
            exports_1("wjFlexChartRsiMeta", wjFlexChartRsiMeta = {
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
            });
            WjFlexChartRsi = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartRsiMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartRsi = WjFlexChartRsi_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartRsiMeta.selector,
                        template: wjFlexChartRsiMeta.template,
                        inputs: wjFlexChartRsiMeta.inputs,
                        outputs: wjFlexChartRsiMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartRsi_1; }) }
                        ].concat(wjFlexChartRsiMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartRsi);
                return WjFlexChartRsi;
                var WjFlexChartRsi_1;
            }(wijmo.chart.finance.analytics.RSI));
            exports_1("WjFlexChartRsi", WjFlexChartRsi);
            exports_1("wjFlexChartWilliamsRMeta", wjFlexChartWilliamsRMeta = {
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
            });
            WjFlexChartWilliamsR = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartWilliamsRMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartWilliamsR = WjFlexChartWilliamsR_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartWilliamsRMeta.selector,
                        template: wjFlexChartWilliamsRMeta.template,
                        inputs: wjFlexChartWilliamsRMeta.inputs,
                        outputs: wjFlexChartWilliamsRMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartWilliamsR_1; }) }
                        ].concat(wjFlexChartWilliamsRMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartWilliamsR);
                return WjFlexChartWilliamsR;
                var WjFlexChartWilliamsR_1;
            }(wijmo.chart.finance.analytics.WilliamsR));
            exports_1("WjFlexChartWilliamsR", WjFlexChartWilliamsR);
            exports_1("wjFlexChartMacdMeta", wjFlexChartMacdMeta = {
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
            });
            WjFlexChartMacd = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartMacdMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartMacd = WjFlexChartMacd_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartMacdMeta.selector,
                        template: wjFlexChartMacdMeta.template,
                        inputs: wjFlexChartMacdMeta.inputs,
                        outputs: wjFlexChartMacdMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMacd_1; }) }
                        ].concat(wjFlexChartMacdMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartMacd);
                return WjFlexChartMacd;
                var WjFlexChartMacd_1;
            }(wijmo.chart.finance.analytics.Macd));
            exports_1("WjFlexChartMacd", WjFlexChartMacd);
            exports_1("wjFlexChartMacdHistogramMeta", wjFlexChartMacdHistogramMeta = {
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
            });
            WjFlexChartMacdHistogram = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartMacdHistogramMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartMacdHistogram = WjFlexChartMacdHistogram_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartMacdHistogramMeta.selector,
                        template: wjFlexChartMacdHistogramMeta.template,
                        inputs: wjFlexChartMacdHistogramMeta.inputs,
                        outputs: wjFlexChartMacdHistogramMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMacdHistogram_1; }) }
                        ].concat(wjFlexChartMacdHistogramMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartMacdHistogram);
                return WjFlexChartMacdHistogram;
                var WjFlexChartMacdHistogram_1;
            }(wijmo.chart.finance.analytics.MacdHistogram));
            exports_1("WjFlexChartMacdHistogram", WjFlexChartMacdHistogram);
            exports_1("wjFlexChartStochasticMeta", wjFlexChartStochasticMeta = {
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
            });
            WjFlexChartStochastic = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartStochasticMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartStochastic = WjFlexChartStochastic_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartStochasticMeta.selector,
                        template: wjFlexChartStochasticMeta.template,
                        inputs: wjFlexChartStochasticMeta.inputs,
                        outputs: wjFlexChartStochasticMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartStochastic_1; }) }
                        ].concat(wjFlexChartStochasticMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartStochastic);
                return WjFlexChartStochastic;
                var WjFlexChartStochastic_1;
            }(wijmo.chart.finance.analytics.Stochastic));
            exports_1("WjFlexChartStochastic", WjFlexChartStochastic);
            exports_1("wjFlexChartBollingerBandsMeta", wjFlexChartBollingerBandsMeta = {
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
            });
            WjFlexChartBollingerBands = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartBollingerBandsMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartBollingerBands = WjFlexChartBollingerBands_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartBollingerBandsMeta.selector,
                        template: wjFlexChartBollingerBandsMeta.template,
                        inputs: wjFlexChartBollingerBandsMeta.inputs,
                        outputs: wjFlexChartBollingerBandsMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartBollingerBands_1; }) }
                        ].concat(wjFlexChartBollingerBandsMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartBollingerBands);
                return WjFlexChartBollingerBands;
                var WjFlexChartBollingerBands_1;
            }(wijmo.chart.finance.analytics.BollingerBands));
            exports_1("WjFlexChartBollingerBands", WjFlexChartBollingerBands);
            exports_1("wjFlexChartEnvelopesMeta", wjFlexChartEnvelopesMeta = {
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
            });
            WjFlexChartEnvelopes = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartEnvelopesMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartEnvelopes = WjFlexChartEnvelopes_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartEnvelopesMeta.selector,
                        template: wjFlexChartEnvelopesMeta.template,
                        inputs: wjFlexChartEnvelopesMeta.inputs,
                        outputs: wjFlexChartEnvelopesMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartEnvelopes_1; }) }
                        ].concat(wjFlexChartEnvelopesMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartEnvelopes);
                return WjFlexChartEnvelopes;
                var WjFlexChartEnvelopes_1;
            }(wijmo.chart.finance.analytics.Envelopes));
            exports_1("WjFlexChartEnvelopes", WjFlexChartEnvelopes);
            moduleExports = [
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
            WjChartFinanceAnalyticsModule = /** @class */ (function () {
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
            exports_1("WjChartFinanceAnalyticsModule", WjChartFinanceAnalyticsModule);
        }
    };
});
