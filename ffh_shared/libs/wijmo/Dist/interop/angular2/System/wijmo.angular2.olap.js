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
System.register("wijmo/wijmo.angular2.olap", ["@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
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
    var core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1, wjPivotGridMeta, WjPivotGrid, wjPivotChartMeta, WjPivotChart, wjPivotPanelMeta, WjPivotPanel, moduleExports, WjOlapModule;
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
            exports_1("wjPivotGridMeta", wjPivotGridMeta = {
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
            });
            WjPivotGrid = /** @class */ (function (_super) {
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
                    outputs: wjPivotGridMeta.outputs,
                };
                WjPivotGrid = WjPivotGrid_1 = __decorate([
                    core_1.Component({
                        selector: wjPivotGridMeta.selector,
                        template: wjPivotGridMeta.template,
                        inputs: wjPivotGridMeta.inputs,
                        outputs: wjPivotGridMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotGrid_1; }) }
                        ].concat(wjPivotGridMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjPivotGrid);
                return WjPivotGrid;
                var WjPivotGrid_1;
            }(wijmo.olap.PivotGrid));
            exports_1("WjPivotGrid", WjPivotGrid);
            exports_1("wjPivotChartMeta", wjPivotChartMeta = {
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
            });
            WjPivotChart = /** @class */ (function (_super) {
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
                    outputs: wjPivotChartMeta.outputs,
                };
                WjPivotChart = WjPivotChart_1 = __decorate([
                    core_1.Component({
                        selector: wjPivotChartMeta.selector,
                        template: wjPivotChartMeta.template,
                        inputs: wjPivotChartMeta.inputs,
                        outputs: wjPivotChartMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotChart_1; }) }
                        ].concat(wjPivotChartMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjPivotChart);
                return WjPivotChart;
                var WjPivotChart_1;
            }(wijmo.olap.PivotChart));
            exports_1("WjPivotChart", WjPivotChart);
            exports_1("wjPivotPanelMeta", wjPivotPanelMeta = {
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
            });
            WjPivotPanel = /** @class */ (function (_super) {
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
                    outputs: wjPivotPanelMeta.outputs,
                };
                WjPivotPanel = WjPivotPanel_1 = __decorate([
                    core_1.Component({
                        selector: wjPivotPanelMeta.selector,
                        template: wjPivotPanelMeta.template,
                        inputs: wjPivotPanelMeta.inputs,
                        outputs: wjPivotPanelMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPivotPanel_1; }) }
                        ].concat(wjPivotPanelMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjPivotPanel);
                return WjPivotPanel;
                var WjPivotPanel_1;
            }(wijmo.olap.PivotPanel));
            exports_1("WjPivotPanel", WjPivotPanel);
            moduleExports = [
                WjPivotGrid,
                WjPivotChart,
                WjPivotPanel
            ];
            WjOlapModule = /** @class */ (function () {
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
            exports_1("WjOlapModule", WjOlapModule);
        }
    };
});
