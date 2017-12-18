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
System.register("wijmo/wijmo.angular2.grid.multirow", ["@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
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
    var core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1, wjMultiRowMeta, WjMultiRow, moduleExports, WjGridMultirowModule;
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
            exports_1("wjMultiRowMeta", wjMultiRowMeta = {
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
            });
            WjMultiRow = /** @class */ (function (_super) {
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
                    outputs: wjMultiRowMeta.outputs,
                };
                WjMultiRow = WjMultiRow_1 = __decorate([
                    core_1.Component({
                        selector: wjMultiRowMeta.selector,
                        template: wjMultiRowMeta.template,
                        inputs: wjMultiRowMeta.inputs,
                        outputs: wjMultiRowMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMultiRow_1; }) }
                        ].concat(wjMultiRowMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjMultiRow);
                return WjMultiRow;
                var WjMultiRow_1;
            }(wijmo.grid.multirow.MultiRow));
            exports_1("WjMultiRow", WjMultiRow);
            moduleExports = [
                WjMultiRow
            ];
            WjGridMultirowModule = /** @class */ (function () {
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
            exports_1("WjGridMultirowModule", WjGridMultirowModule);
        }
    };
});
