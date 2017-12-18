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
System.register("wijmo/wijmo.angular2.input", ["@angular/core", "@angular/common", "@angular/forms", "wijmo/wijmo.angular2.directiveBase"], function (exports_1, context_1) {
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
    var core_1, core_2, core_3, common_1, forms_1, wijmo_angular2_directiveBase_1, wjComboBoxMeta, WjComboBox, wjAutoCompleteMeta, WjAutoComplete, wjCalendarMeta, WjCalendar, wjColorPickerMeta, WjColorPicker, wjInputMaskMeta, WjInputMask, wjInputColorMeta, WjInputColor, wjMultiSelectMeta, WjMultiSelect, wjMultiAutoCompleteMeta, WjMultiAutoComplete, wjInputNumberMeta, WjInputNumber, wjInputDateMeta, WjInputDate, wjInputTimeMeta, WjInputTime, wjInputDateTimeMeta, WjInputDateTime, wjListBoxMeta, WjListBox, wjMenuMeta, WjMenu, wjMenuItemMeta, WjMenuItem, WjMenuItemTemplateDir, wjMenuSeparatorMeta, WjMenuSeparator, wjItemTemplateMeta, WjItemTemplate, wjPopupMeta, WjPopup, WjContextMenu, wjCollectionViewNavigatorMeta, WjCollectionViewNavigator, wjCollectionViewPagerMeta, WjCollectionViewPager, moduleExports, WjInputModule;
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
            exports_1("wjComboBoxMeta", wjComboBoxMeta = {
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
            });
            WjComboBox = /** @class */ (function (_super) {
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
                    outputs: wjComboBoxMeta.outputs,
                    changeEvents: {
                        'isDroppedDownChanged': ['isDroppedDown'],
                        'textChanged': ['text'],
                        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue']
                    },
                };
                WjComboBox = WjComboBox_1 = __decorate([
                    core_1.Component({
                        selector: wjComboBoxMeta.selector,
                        template: wjComboBoxMeta.template,
                        inputs: wjComboBoxMeta.inputs,
                        outputs: wjComboBoxMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjComboBox_1; }) }
                        ].concat(wjComboBoxMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjComboBox);
                return WjComboBox;
                var WjComboBox_1;
            }(wijmo.input.ComboBox));
            exports_1("WjComboBox", WjComboBox);
            exports_1("wjAutoCompleteMeta", wjAutoCompleteMeta = {
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
            });
            WjAutoComplete = /** @class */ (function (_super) {
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
                    outputs: wjAutoCompleteMeta.outputs,
                    changeEvents: {
                        'isDroppedDownChanged': ['isDroppedDown'],
                        'textChanged': ['text'],
                        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue']
                    },
                };
                WjAutoComplete = WjAutoComplete_1 = __decorate([
                    core_1.Component({
                        selector: wjAutoCompleteMeta.selector,
                        template: wjAutoCompleteMeta.template,
                        inputs: wjAutoCompleteMeta.inputs,
                        outputs: wjAutoCompleteMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjAutoComplete_1; }) }
                        ].concat(wjAutoCompleteMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjAutoComplete);
                return WjAutoComplete;
                var WjAutoComplete_1;
            }(wijmo.input.AutoComplete));
            exports_1("WjAutoComplete", WjAutoComplete);
            exports_1("wjCalendarMeta", wjCalendarMeta = {
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
            });
            WjCalendar = /** @class */ (function (_super) {
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
                    outputs: wjCalendarMeta.outputs,
                    changeEvents: {
                        'valueChanged': ['value'],
                        'displayMonthChanged': ['displayMonth']
                    },
                };
                WjCalendar = WjCalendar_1 = __decorate([
                    core_1.Component({
                        selector: wjCalendarMeta.selector,
                        template: wjCalendarMeta.template,
                        inputs: wjCalendarMeta.inputs,
                        outputs: wjCalendarMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjCalendar_1; }) }
                        ].concat(wjCalendarMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjCalendar);
                return WjCalendar;
                var WjCalendar_1;
            }(wijmo.input.Calendar));
            exports_1("WjCalendar", WjCalendar);
            exports_1("wjColorPickerMeta", wjColorPickerMeta = {
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
            });
            WjColorPicker = /** @class */ (function (_super) {
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
                    outputs: wjColorPickerMeta.outputs,
                    changeEvents: {
                        'valueChanged': ['value']
                    },
                };
                WjColorPicker = WjColorPicker_1 = __decorate([
                    core_1.Component({
                        selector: wjColorPickerMeta.selector,
                        template: wjColorPickerMeta.template,
                        inputs: wjColorPickerMeta.inputs,
                        outputs: wjColorPickerMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjColorPicker_1; }) }
                        ].concat(wjColorPickerMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjColorPicker);
                return WjColorPicker;
                var WjColorPicker_1;
            }(wijmo.input.ColorPicker));
            exports_1("WjColorPicker", WjColorPicker);
            exports_1("wjInputMaskMeta", wjInputMaskMeta = {
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
            });
            WjInputMask = /** @class */ (function (_super) {
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
                    outputs: wjInputMaskMeta.outputs,
                    changeEvents: {
                        'valueChanged': ['rawValue', 'value']
                    },
                };
                WjInputMask = WjInputMask_1 = __decorate([
                    core_1.Component({
                        selector: wjInputMaskMeta.selector,
                        template: wjInputMaskMeta.template,
                        inputs: wjInputMaskMeta.inputs,
                        outputs: wjInputMaskMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputMask_1; }) }
                        ].concat(wjInputMaskMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjInputMask);
                return WjInputMask;
                var WjInputMask_1;
            }(wijmo.input.InputMask));
            exports_1("WjInputMask", WjInputMask);
            exports_1("wjInputColorMeta", wjInputColorMeta = {
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
            });
            WjInputColor = /** @class */ (function (_super) {
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
                    outputs: wjInputColorMeta.outputs,
                    changeEvents: {
                        'isDroppedDownChanged': ['isDroppedDown'],
                        'textChanged': ['text'],
                        'valueChanged': ['value']
                    },
                };
                WjInputColor = WjInputColor_1 = __decorate([
                    core_1.Component({
                        selector: wjInputColorMeta.selector,
                        template: wjInputColorMeta.template,
                        inputs: wjInputColorMeta.inputs,
                        outputs: wjInputColorMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputColor_1; }) }
                        ].concat(wjInputColorMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjInputColor);
                return WjInputColor;
                var WjInputColor_1;
            }(wijmo.input.InputColor));
            exports_1("WjInputColor", WjInputColor);
            exports_1("wjMultiSelectMeta", wjMultiSelectMeta = {
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
            });
            WjMultiSelect = /** @class */ (function (_super) {
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
                    outputs: wjMultiSelectMeta.outputs,
                    changeEvents: {
                        'isDroppedDownChanged': ['isDroppedDown'],
                        'textChanged': ['text'],
                        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
                        'checkedItemsChanged': ['checkedItems']
                    },
                };
                WjMultiSelect = WjMultiSelect_1 = __decorate([
                    core_1.Component({
                        selector: wjMultiSelectMeta.selector,
                        template: wjMultiSelectMeta.template,
                        inputs: wjMultiSelectMeta.inputs,
                        outputs: wjMultiSelectMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMultiSelect_1; }) }
                        ].concat(wjMultiSelectMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjMultiSelect);
                return WjMultiSelect;
                var WjMultiSelect_1;
            }(wijmo.input.MultiSelect));
            exports_1("WjMultiSelect", WjMultiSelect);
            exports_1("wjMultiAutoCompleteMeta", wjMultiAutoCompleteMeta = {
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
            });
            WjMultiAutoComplete = /** @class */ (function (_super) {
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
                    outputs: wjMultiAutoCompleteMeta.outputs,
                    changeEvents: {
                        'isDroppedDownChanged': ['isDroppedDown'],
                        'textChanged': ['text'],
                        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
                        'selectedItemsChanged': ['selectedItems']
                    },
                };
                WjMultiAutoComplete = WjMultiAutoComplete_1 = __decorate([
                    core_1.Component({
                        selector: wjMultiAutoCompleteMeta.selector,
                        template: wjMultiAutoCompleteMeta.template,
                        inputs: wjMultiAutoCompleteMeta.inputs,
                        outputs: wjMultiAutoCompleteMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMultiAutoComplete_1; }) }
                        ].concat(wjMultiAutoCompleteMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjMultiAutoComplete);
                return WjMultiAutoComplete;
                var WjMultiAutoComplete_1;
            }(wijmo.input.MultiAutoComplete));
            exports_1("WjMultiAutoComplete", WjMultiAutoComplete);
            exports_1("wjInputNumberMeta", wjInputNumberMeta = {
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
            });
            WjInputNumber = /** @class */ (function (_super) {
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
                    outputs: wjInputNumberMeta.outputs,
                    changeEvents: {
                        'valueChanged': ['value'],
                        'textChanged': ['text']
                    },
                };
                WjInputNumber = WjInputNumber_1 = __decorate([
                    core_1.Component({
                        selector: wjInputNumberMeta.selector,
                        template: wjInputNumberMeta.template,
                        inputs: wjInputNumberMeta.inputs,
                        outputs: wjInputNumberMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputNumber_1; }) }
                        ].concat(wjInputNumberMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjInputNumber);
                return WjInputNumber;
                var WjInputNumber_1;
            }(wijmo.input.InputNumber));
            exports_1("WjInputNumber", WjInputNumber);
            exports_1("wjInputDateMeta", wjInputDateMeta = {
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
            });
            WjInputDate = /** @class */ (function (_super) {
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
                    outputs: wjInputDateMeta.outputs,
                    changeEvents: {
                        'isDroppedDownChanged': ['isDroppedDown'],
                        'textChanged': ['text'],
                        'valueChanged': ['value']
                    },
                };
                WjInputDate = WjInputDate_1 = __decorate([
                    core_1.Component({
                        selector: wjInputDateMeta.selector,
                        template: wjInputDateMeta.template,
                        inputs: wjInputDateMeta.inputs,
                        outputs: wjInputDateMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputDate_1; }) }
                        ].concat(wjInputDateMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjInputDate);
                return WjInputDate;
                var WjInputDate_1;
            }(wijmo.input.InputDate));
            exports_1("WjInputDate", WjInputDate);
            exports_1("wjInputTimeMeta", wjInputTimeMeta = {
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
            });
            WjInputTime = /** @class */ (function (_super) {
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
                    outputs: wjInputTimeMeta.outputs,
                    changeEvents: {
                        'isDroppedDownChanged': ['isDroppedDown'],
                        'textChanged': ['text'],
                        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
                        'valueChanged': ['value']
                    },
                };
                WjInputTime = WjInputTime_1 = __decorate([
                    core_1.Component({
                        selector: wjInputTimeMeta.selector,
                        template: wjInputTimeMeta.template,
                        inputs: wjInputTimeMeta.inputs,
                        outputs: wjInputTimeMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputTime_1; }) }
                        ].concat(wjInputTimeMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjInputTime);
                return WjInputTime;
                var WjInputTime_1;
            }(wijmo.input.InputTime));
            exports_1("WjInputTime", WjInputTime);
            exports_1("wjInputDateTimeMeta", wjInputDateTimeMeta = {
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
            });
            WjInputDateTime = /** @class */ (function (_super) {
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
                    outputs: wjInputDateTimeMeta.outputs,
                    changeEvents: {
                        'isDroppedDownChanged': ['isDroppedDown'],
                        'textChanged': ['text'],
                        'valueChanged': ['value']
                    },
                };
                WjInputDateTime = WjInputDateTime_1 = __decorate([
                    core_1.Component({
                        selector: wjInputDateTimeMeta.selector,
                        template: wjInputDateTimeMeta.template,
                        inputs: wjInputDateTimeMeta.inputs,
                        outputs: wjInputDateTimeMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjInputDateTime_1; }) }
                        ].concat(wjInputDateTimeMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjInputDateTime);
                return WjInputDateTime;
                var WjInputDateTime_1;
            }(wijmo.input.InputDateTime));
            exports_1("WjInputDateTime", WjInputDateTime);
            exports_1("wjListBoxMeta", wjListBoxMeta = {
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
            });
            WjListBox = /** @class */ (function (_super) {
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
                    outputs: wjListBoxMeta.outputs,
                    changeEvents: {
                        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
                        'checkedItemsChanged': ['checkedItems']
                    },
                };
                WjListBox = WjListBox_1 = __decorate([
                    core_1.Component({
                        selector: wjListBoxMeta.selector,
                        template: wjListBoxMeta.template,
                        inputs: wjListBoxMeta.inputs,
                        outputs: wjListBoxMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjListBox_1; }) }
                        ].concat(wjListBoxMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjListBox);
                return WjListBox;
                var WjListBox_1;
            }(wijmo.input.ListBox));
            exports_1("WjListBox", WjListBox);
            exports_1("wjMenuMeta", wjMenuMeta = {
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
            });
            WjMenu = /** @class */ (function (_super) {
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
                    outputs: wjMenuMeta.outputs,
                    changeEvents: {
                        'isDroppedDownChanged': ['isDroppedDown'],
                        'textChanged': ['text'],
                        'selectedIndexChanged': ['selectedIndex', 'selectedItem', 'selectedValue'],
                        'itemClicked': ['value']
                    },
                };
                WjMenu = WjMenu_1 = __decorate([
                    core_1.Component({
                        selector: wjMenuMeta.selector,
                        template: wjMenuMeta.template,
                        inputs: wjMenuMeta.inputs,
                        outputs: wjMenuMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMenu_1; }) }
                        ].concat(wjMenuMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjMenu);
                return WjMenu;
                var WjMenu_1;
            }(wijmo.input.Menu));
            exports_1("WjMenu", WjMenu);
            exports_1("wjMenuItemMeta", wjMenuItemMeta = {
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
            });
            WjMenuItem = /** @class */ (function () {
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
                    outputs: wjMenuItemMeta.outputs,
                    siblingId: 'menuItemDir',
                };
                WjMenuItem = WjMenuItem_1 = __decorate([
                    core_1.Component({
                        selector: wjMenuItemMeta.selector,
                        template: wjMenuItemMeta.template,
                        inputs: wjMenuItemMeta.inputs,
                        outputs: wjMenuItemMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMenuItem_1; }) }
                        ].concat(wjMenuItemMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
                    __param(3, core_3.Inject(core_2.ViewContainerRef)),
                    __param(4, core_3.Inject(core_2.Renderer))
                ], WjMenuItem);
                return WjMenuItem;
                var WjMenuItem_1;
            }());
            exports_1("WjMenuItem", WjMenuItem);
            WjMenuItemTemplateDir = /** @class */ (function () {
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
            exports_1("WjMenuItemTemplateDir", WjMenuItemTemplateDir);
            exports_1("wjMenuSeparatorMeta", wjMenuSeparatorMeta = {
                selector: 'wj-menu-separator',
                template: "<div *wjMenuItemTemplateDir class=\"wj-state-disabled\" style=\"width:100%;height:1px;background-color:lightgray\"></div>",
                inputs: [
                    'wjProperty',
                ],
                outputs: [
                    'initialized',
                ],
                providers: []
            });
            WjMenuSeparator = /** @class */ (function (_super) {
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
                        selector: wjMenuSeparatorMeta.selector,
                        template: wjMenuSeparatorMeta.template,
                        inputs: wjMenuSeparatorMeta.inputs,
                        outputs: wjMenuSeparatorMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjMenuSeparator_1; }) }
                        ].concat(wjMenuSeparatorMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional()),
                    __param(3, core_3.Inject(core_2.ViewContainerRef)),
                    __param(4, core_3.Inject(core_2.Renderer))
                ], WjMenuSeparator);
                return WjMenuSeparator;
                var WjMenuSeparator_1;
            }(WjMenuItem));
            exports_1("WjMenuSeparator", WjMenuSeparator);
            exports_1("wjItemTemplateMeta", wjItemTemplateMeta = {
                selector: '[wjItemTemplate]',
                inputs: [
                    'wjItemTemplate',
                ],
                outputs: [
                    'initialized',
                ],
                exportAs: 'wjItemTemplate',
                providers: []
            });
            WjItemTemplate = /** @class */ (function () {
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
                    outputs: wjItemTemplateMeta.outputs,
                    parentRefProperty: 'owner',
                };
                WjItemTemplate = WjItemTemplate_1 = __decorate([
                    core_2.Directive({
                        selector: wjItemTemplateMeta.selector,
                        inputs: wjItemTemplateMeta.inputs,
                        outputs: wjItemTemplateMeta.outputs,
                        exportAs: wjItemTemplateMeta.exportAs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjItemTemplate_1; }) }
                        ].concat(wjItemTemplateMeta.providers)
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
            exports_1("WjItemTemplate", WjItemTemplate);
            exports_1("wjPopupMeta", wjPopupMeta = {
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
            });
            WjPopup = /** @class */ (function (_super) {
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
                    outputs: wjPopupMeta.outputs,
                };
                WjPopup = WjPopup_1 = __decorate([
                    core_1.Component({
                        selector: wjPopupMeta.selector,
                        template: wjPopupMeta.template,
                        inputs: wjPopupMeta.inputs,
                        outputs: wjPopupMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjPopup_1; }) }
                        ].concat(wjPopupMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjPopup);
                return WjPopup;
                var WjPopup_1;
            }(wijmo.input.Popup));
            exports_1("WjPopup", WjPopup);
            WjContextMenu = /** @class */ (function () {
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
            exports_1("WjContextMenu", WjContextMenu);
            exports_1("wjCollectionViewNavigatorMeta", wjCollectionViewNavigatorMeta = {
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
            });
            WjCollectionViewNavigator = /** @class */ (function () {
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
                    outputs: wjCollectionViewNavigatorMeta.outputs,
                };
                WjCollectionViewNavigator = WjCollectionViewNavigator_1 = __decorate([
                    core_1.Component({
                        selector: wjCollectionViewNavigatorMeta.selector,
                        template: wjCollectionViewNavigatorMeta.template,
                        inputs: wjCollectionViewNavigatorMeta.inputs,
                        outputs: wjCollectionViewNavigatorMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjCollectionViewNavigator_1; }) }
                        ].concat(wjCollectionViewNavigatorMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjCollectionViewNavigator);
                return WjCollectionViewNavigator;
                var WjCollectionViewNavigator_1;
            }());
            exports_1("WjCollectionViewNavigator", WjCollectionViewNavigator);
            exports_1("wjCollectionViewPagerMeta", wjCollectionViewPagerMeta = {
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
            });
            WjCollectionViewPager = /** @class */ (function () {
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
                    outputs: wjCollectionViewPagerMeta.outputs,
                };
                WjCollectionViewPager = WjCollectionViewPager_1 = __decorate([
                    core_1.Component({
                        selector: wjCollectionViewPagerMeta.selector,
                        template: wjCollectionViewPagerMeta.template,
                        inputs: wjCollectionViewPagerMeta.inputs,
                        outputs: wjCollectionViewPagerMeta.outputs,
                        providers: [
                            { provide: 'WjComponent', useExisting: core_2.forwardRef(function () { return WjCollectionViewPager_1; }) }
                        ].concat(wjCollectionViewPagerMeta.providers)
                    }),
                    __param(0, core_3.Inject(core_2.ElementRef)), __param(1, core_3.Inject(core_2.Injector)),
                    __param(2, core_3.Inject('WjComponent')), __param(2, core_3.SkipSelf()), __param(2, core_2.Optional())
                ], WjCollectionViewPager);
                return WjCollectionViewPager;
                var WjCollectionViewPager_1;
            }());
            exports_1("WjCollectionViewPager", WjCollectionViewPager);
            moduleExports = [
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
            WjInputModule = /** @class */ (function () {
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
            exports_1("WjInputModule", WjInputModule);
        }
    };
});
