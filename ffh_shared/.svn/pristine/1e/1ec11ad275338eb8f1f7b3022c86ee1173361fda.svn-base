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
System.register("wijmo/wijmo.angular2.chart.radar", ["@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
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
    var core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1, wjFlexRadarMeta, WjFlexRadar, wjFlexRadarAxisMeta, WjFlexRadarAxis, wjFlexRadarSeriesMeta, WjFlexRadarSeries, moduleExports, WjChartRadarModule;
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
            exports_1("wjFlexRadarMeta", wjFlexRadarMeta = {
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
            });
            WjFlexRadar = /** @class */ (function (_super) {
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
                    outputs: wjFlexRadarMeta.outputs,
                    changeEvents: {
                        'selectionChanged': ['selection']
                    },
                };
                WjFlexRadar = WjFlexRadar_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexRadarMeta.selector,
                        template: wjFlexRadarMeta.template,
                        inputs: wjFlexRadarMeta.inputs,
                        outputs: wjFlexRadarMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexRadar_1; }) }
                        ].concat(wjFlexRadarMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexRadar);
                return WjFlexRadar;
                var WjFlexRadar_1;
            }(wijmo.chart.radar.FlexRadar));
            exports_1("WjFlexRadar", WjFlexRadar);
            exports_1("wjFlexRadarAxisMeta", wjFlexRadarAxisMeta = {
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
            });
            WjFlexRadarAxis = /** @class */ (function (_super) {
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
                    outputs: wjFlexRadarAxisMeta.outputs,
                };
                WjFlexRadarAxis = WjFlexRadarAxis_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexRadarAxisMeta.selector,
                        template: wjFlexRadarAxisMeta.template,
                        inputs: wjFlexRadarAxisMeta.inputs,
                        outputs: wjFlexRadarAxisMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexRadarAxis_1; }) }
                        ].concat(wjFlexRadarAxisMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexRadarAxis);
                return WjFlexRadarAxis;
                var WjFlexRadarAxis_1;
            }(wijmo.chart.radar.FlexRadarAxis));
            exports_1("WjFlexRadarAxis", WjFlexRadarAxis);
            exports_1("wjFlexRadarSeriesMeta", wjFlexRadarSeriesMeta = {
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
            });
            WjFlexRadarSeries = /** @class */ (function (_super) {
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
                    outputs: wjFlexRadarSeriesMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFlexRadarSeries = WjFlexRadarSeries_1 = __decorate([
                    core_1.Component({
                        selector: wjFlexRadarSeriesMeta.selector,
                        template: wjFlexRadarSeriesMeta.template,
                        inputs: wjFlexRadarSeriesMeta.inputs,
                        outputs: wjFlexRadarSeriesMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFlexRadarSeries_1; }) }
                        ].concat(wjFlexRadarSeriesMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFlexRadarSeries);
                return WjFlexRadarSeries;
                var WjFlexRadarSeries_1;
            }(wijmo.chart.radar.FlexRadarSeries));
            exports_1("WjFlexRadarSeries", WjFlexRadarSeries);
            moduleExports = [
                WjFlexRadar,
                WjFlexRadarAxis,
                WjFlexRadarSeries
            ];
            WjChartRadarModule = /** @class */ (function () {
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
            exports_1("WjChartRadarModule", WjChartRadarModule);
        }
    };
});
