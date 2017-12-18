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
