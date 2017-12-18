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
