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
///<wijmo-soft-import from="wijmo.chart.finance"/>
System.register("wijmo/wijmo.angular2.chart.analytics", ["@angular/core", "@angular/common", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
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
    var core_1, core_2, core_3, common_1, wijmo_angular2_directiveBase_1, wjFlexChartTrendLineMeta, WjFlexChartTrendLine, wjFlexChartMovingAverageMeta, WjFlexChartMovingAverage, wjFlexChartYFunctionSeriesMeta, WjFlexChartYFunctionSeries, wjFlexChartParametricFunctionSeriesMeta, WjFlexChartParametricFunctionSeries, wjFlexChartWaterfallMeta, WjFlexChartWaterfall, wjFlexChartBoxWhiskerMeta, WjFlexChartBoxWhisker, wjFlexChartErrorBarMeta, WjFlexChartErrorBar, moduleExports, WjChartAnalyticsModule;
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
            ///<wijmo-soft-import from="wijmo.chart.finance"/>
            exports_1("wjFlexChartTrendLineMeta", wjFlexChartTrendLineMeta = {
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
            });
            WjFlexChartTrendLine = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartTrendLineMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartTrendLine = WjFlexChartTrendLine_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartTrendLineMeta.selector,
                        template: wjFlexChartTrendLineMeta.template,
                        inputs: wjFlexChartTrendLineMeta.inputs,
                        outputs: wjFlexChartTrendLineMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartTrendLine_1; }) }
                        ].concat(wjFlexChartTrendLineMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartTrendLine);
                return WjFlexChartTrendLine;
                var WjFlexChartTrendLine_1;
            }(wijmo.chart.analytics.TrendLine));
            exports_1("WjFlexChartTrendLine", WjFlexChartTrendLine);
            exports_1("wjFlexChartMovingAverageMeta", wjFlexChartMovingAverageMeta = {
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
            });
            WjFlexChartMovingAverage = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartMovingAverageMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartMovingAverage = WjFlexChartMovingAverage_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartMovingAverageMeta.selector,
                        template: wjFlexChartMovingAverageMeta.template,
                        inputs: wjFlexChartMovingAverageMeta.inputs,
                        outputs: wjFlexChartMovingAverageMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartMovingAverage_1; }) }
                        ].concat(wjFlexChartMovingAverageMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartMovingAverage);
                return WjFlexChartMovingAverage;
                var WjFlexChartMovingAverage_1;
            }(wijmo.chart.analytics.MovingAverage));
            exports_1("WjFlexChartMovingAverage", WjFlexChartMovingAverage);
            exports_1("wjFlexChartYFunctionSeriesMeta", wjFlexChartYFunctionSeriesMeta = {
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
            });
            WjFlexChartYFunctionSeries = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartYFunctionSeriesMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartYFunctionSeries = WjFlexChartYFunctionSeries_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartYFunctionSeriesMeta.selector,
                        template: wjFlexChartYFunctionSeriesMeta.template,
                        inputs: wjFlexChartYFunctionSeriesMeta.inputs,
                        outputs: wjFlexChartYFunctionSeriesMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartYFunctionSeries_1; }) }
                        ].concat(wjFlexChartYFunctionSeriesMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartYFunctionSeries);
                return WjFlexChartYFunctionSeries;
                var WjFlexChartYFunctionSeries_1;
            }(wijmo.chart.analytics.YFunctionSeries));
            exports_1("WjFlexChartYFunctionSeries", WjFlexChartYFunctionSeries);
            exports_1("wjFlexChartParametricFunctionSeriesMeta", wjFlexChartParametricFunctionSeriesMeta = {
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
            });
            WjFlexChartParametricFunctionSeries = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartParametricFunctionSeriesMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartParametricFunctionSeries = WjFlexChartParametricFunctionSeries_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartParametricFunctionSeriesMeta.selector,
                        template: wjFlexChartParametricFunctionSeriesMeta.template,
                        inputs: wjFlexChartParametricFunctionSeriesMeta.inputs,
                        outputs: wjFlexChartParametricFunctionSeriesMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartParametricFunctionSeries_1; }) }
                        ].concat(wjFlexChartParametricFunctionSeriesMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartParametricFunctionSeries);
                return WjFlexChartParametricFunctionSeries;
                var WjFlexChartParametricFunctionSeries_1;
            }(wijmo.chart.analytics.ParametricFunctionSeries));
            exports_1("WjFlexChartParametricFunctionSeries", WjFlexChartParametricFunctionSeries);
            exports_1("wjFlexChartWaterfallMeta", wjFlexChartWaterfallMeta = {
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
            });
            WjFlexChartWaterfall = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartWaterfallMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartWaterfall = WjFlexChartWaterfall_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartWaterfallMeta.selector,
                        template: wjFlexChartWaterfallMeta.template,
                        inputs: wjFlexChartWaterfallMeta.inputs,
                        outputs: wjFlexChartWaterfallMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartWaterfall_1; }) }
                        ].concat(wjFlexChartWaterfallMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartWaterfall);
                return WjFlexChartWaterfall;
                var WjFlexChartWaterfall_1;
            }(wijmo.chart.analytics.Waterfall));
            exports_1("WjFlexChartWaterfall", WjFlexChartWaterfall);
            exports_1("wjFlexChartBoxWhiskerMeta", wjFlexChartBoxWhiskerMeta = {
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
            });
            WjFlexChartBoxWhisker = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartBoxWhiskerMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartBoxWhisker = WjFlexChartBoxWhisker_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartBoxWhiskerMeta.selector,
                        template: wjFlexChartBoxWhiskerMeta.template,
                        inputs: wjFlexChartBoxWhiskerMeta.inputs,
                        outputs: wjFlexChartBoxWhiskerMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartBoxWhisker_1; }) }
                        ].concat(wjFlexChartBoxWhiskerMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartBoxWhisker);
                return WjFlexChartBoxWhisker;
                var WjFlexChartBoxWhisker_1;
            }(wijmo.chart.analytics.BoxWhisker));
            exports_1("WjFlexChartBoxWhisker", WjFlexChartBoxWhisker);
            exports_1("wjFlexChartErrorBarMeta", wjFlexChartErrorBarMeta = {
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
            });
            WjFlexChartErrorBar = /** @class */ (function (_super) {
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
                    outputs: wjFlexChartErrorBarMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexChartErrorBar = WjFlexChartErrorBar_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexChartErrorBarMeta.selector,
                        template: wjFlexChartErrorBarMeta.template,
                        inputs: wjFlexChartErrorBarMeta.inputs,
                        outputs: wjFlexChartErrorBarMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexChartErrorBar_1; }) }
                        ].concat(wjFlexChartErrorBarMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexChartErrorBar);
                return WjFlexChartErrorBar;
                var WjFlexChartErrorBar_1;
            }(wijmo.chart.analytics.ErrorBar));
            exports_1("WjFlexChartErrorBar", WjFlexChartErrorBar);
            moduleExports = [
                WjFlexChartTrendLine,
                WjFlexChartMovingAverage,
                WjFlexChartYFunctionSeries,
                WjFlexChartParametricFunctionSeries,
                WjFlexChartWaterfall,
                WjFlexChartBoxWhisker,
                WjFlexChartErrorBar
            ];
            WjChartAnalyticsModule = /** @class */ (function () {
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
            exports_1("WjChartAnalyticsModule", WjChartAnalyticsModule);
        }
    };
});
