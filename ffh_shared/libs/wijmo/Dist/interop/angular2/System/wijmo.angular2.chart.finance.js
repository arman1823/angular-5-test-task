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
System.register("wijmo/wijmo.angular2.chart.finance", ["@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
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
    var core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1, wjFinancialChartMeta, WjFinancialChart, wjFinancialChartSeriesMeta, WjFinancialChartSeries, moduleExports, WjChartFinanceModule;
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
            exports_1("wjFinancialChartMeta", wjFinancialChartMeta = {
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
            });
            WjFinancialChart = /** @class */ (function (_super) {
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
                    outputs: wjFinancialChartMeta.outputs,
                    changeEvents: {
                        'selectionChanged': ['selection']
                    },
                };
                WjFinancialChart = WjFinancialChart_1 = __decorate([
                    core_1.Component({
                        selector: wjFinancialChartMeta.selector,
                        template: wjFinancialChartMeta.template,
                        inputs: wjFinancialChartMeta.inputs,
                        outputs: wjFinancialChartMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFinancialChart_1; }) }
                        ].concat(wjFinancialChartMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFinancialChart);
                return WjFinancialChart;
                var WjFinancialChart_1;
            }(wijmo.chart.finance.FinancialChart));
            exports_1("WjFinancialChart", WjFinancialChart);
            exports_1("wjFinancialChartSeriesMeta", wjFinancialChartSeriesMeta = {
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
            });
            WjFinancialChartSeries = /** @class */ (function (_super) {
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
                    outputs: wjFinancialChartSeriesMeta.outputs,
                    changeEvents: {
                        'chart.seriesVisibilityChanged': ['visibility']
                    },
                    siblingId: 'series',
                };
                WjFinancialChartSeries = WjFinancialChartSeries_1 = __decorate([
                    core_1.Component({
                        selector: wjFinancialChartSeriesMeta.selector,
                        template: wjFinancialChartSeriesMeta.template,
                        inputs: wjFinancialChartSeriesMeta.inputs,
                        outputs: wjFinancialChartSeriesMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjFinancialChartSeries_1; }) }
                        ].concat(wjFinancialChartSeriesMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjFinancialChartSeries);
                return WjFinancialChartSeries;
                var WjFinancialChartSeries_1;
            }(wijmo.chart.finance.FinancialSeries));
            exports_1("WjFinancialChartSeries", WjFinancialChartSeries);
            moduleExports = [
                WjFinancialChart,
                WjFinancialChartSeries
            ];
            WjChartFinanceModule = /** @class */ (function () {
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
            exports_1("WjChartFinanceModule", WjChartFinanceModule);
        }
    };
});
