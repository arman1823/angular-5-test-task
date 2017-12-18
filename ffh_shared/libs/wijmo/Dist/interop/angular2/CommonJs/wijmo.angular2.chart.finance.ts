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


import { Component, EventEmitter, NgModule, AfterViewInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ElementRef, Injector, Directive, ViewContainerRef, TemplateRef, Optional, forwardRef, Renderer } from '@angular/core';
import { Input, Output, Injectable, Inject, OnInit, OnChanges, OnDestroy, AfterContentInit, SimpleChange, 
    ChangeDetectorRef, SkipSelf } from '@angular/core';
import { ChangeDetectionStrategy, Type, ViewEncapsulation, ComponentFactory, TypeDecorator } from '@angular/core';
import * as ngCore from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { WjDirectiveBehavior, WjDirectiveBaseModule, WjValueAccessorFactory, IWjComponentMetadata,
    IWjComponentMeta, IWjDirectiveMeta } from 'wijmo/wijmo.angular2.directiveBase';





export var wjFinancialChartMeta: IWjComponentMeta = {
    selector: 'wj-financial-chart',
    template: `<div><ng-content></ng-content></div>`,
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
            provide: NG_VALUE_ACCESSOR, useFactory: WjValueAccessorFactory, multi: true,
            deps: ['WjComponent']
        }
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.FinancialChart control.
 *
 * Use the <b>wj-financial-chart</b> component to add <b>FinancialChart</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
* The <b>WjFinancialChart</b> component is derived from the <b>FinancialChart</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-financial-chart</b> component may contain the following child components:
 * @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartTrendLine
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartMovingAverage
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartYFunctionSeries
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartParametricFunctionSeries
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartWaterfall
 * , @see:wijmo/wijmo.angular2.chart.analytics.WjFlexChartBoxWhisker
 * , @see:wijmo/wijmo.angular2.chart.animation.WjFlexChartAnimation
 * , @see:wijmo/wijmo.angular2.chart.annotation.WjFlexChartAnnotationLayer
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacci
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciArcs
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciFans
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartFibonacciTimeZones
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartAtr
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartCci
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartRsi
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartWilliamsR
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartMacd
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartMacdHistogram
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartStochastic
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartBollingerBands
 * , @see:wijmo/wijmo.angular2.chart.finance.analytics.WjFlexChartEnvelopes
 * , @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChartSeries
 * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartRangeSelector
 * , @see:wijmo/wijmo.angular2.chart.interaction.WjFlexChartGestures
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLegend
 * , @see:wijmo/wijmo.angular2.chart.WjFlexChartLineMarker
 *  and @see:wijmo/wijmo.angular2.chart.WjFlexChartPlotArea.
*/
@Component({
    selector: wjFinancialChartMeta.selector,
    template: wjFinancialChartMeta.template,
    inputs: wjFinancialChartMeta.inputs,
    outputs: wjFinancialChartMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFinancialChart)},
        ...wjFinancialChartMeta.providers
    ]
})
export class WjFinancialChart extends wijmo.chart.finance.FinancialChart implements OnInit, OnDestroy, AfterViewInit {
    
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFinancialChartMeta.outputs,
        changeEvents: {
            'selectionChanged': ['selection']            
        },
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized: EventEmitter<any>;
    /**
     * Defines a name of a property represented by [(ngModel)] directive (if specified). 
     * Default value is ''.
     */
    wjModelProperty: string;
    /**
     * Allows you to override the global <b>WjOptions.asyncBindings</b> setting for this specific component.
     * See the <b>WjOptions.</b>@see:WjOptions.asyncBindings property description for details.
     */
    asyncBindings: boolean;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>gotFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>gotFocus</b> Wijmo event name.
     */
    gotFocusNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>lostFocus</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>lostFocus</b> Wijmo event name.
     */
    lostFocusNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rendering</b> Wijmo event name.
     */
    renderingNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rendered</b> Wijmo event name.
     */
    renderedNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>selectionChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>selectionChanged</b> Wijmo event name.
     */
    selectionChangedNg: EventEmitter<any>;
    selectionChangePC: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>seriesVisibilityChanged</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>seriesVisibilityChanged</b> Wijmo event name.
     */
    seriesVisibilityChangedNg: EventEmitter<any>;

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super(WjDirectiveBehavior.getHostElement(elRef, injector));
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    }

    addEventListener(target: EventTarget, type: string, fn: any, capture = false) {
        let behCl = WjDirectiveBehavior,
            ngZone = behCl.ngZone;
        if (ngZone && behCl.outsideZoneEvents[type]) {
            ngZone.runOutsideAngular(() => {
                super.addEventListener(target, type, fn, capture);
            });
        } else {
            super.addEventListener(target, type, fn, capture);
        }
    }

    get tooltipContent(): any {
        return this.tooltip.content;
    }
    set tooltipContent(value: any) {
        this.tooltip.content = value;
    }

    get labelContent(): any {
        return this.dataLabel.content;
    }
    set labelContent(value: any) {
        this.dataLabel.content = value;
    }
 
}



export var wjFinancialChartSeriesMeta: IWjComponentMeta = {
    selector: 'wj-financial-chart-series',
    template: `<div><ng-content></ng-content></div>`,
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
	providers: [
    ]
};
/**
 * Angular 2 component for the @see:wijmo.chart.finance.FinancialSeries control. 
 * 
 * The <b>wj-financial-chart-series</b> component must be 
 * contained in a @see:wijmo/wijmo.angular2.chart.finance.WjFinancialChart component.
 *
 * Use the <b>wj-financial-chart-series</b> component to add <b>FinancialSeries</b> controls to your
 * Angular 2 applications. For details about Angular 2 markup syntax, see 
 * <a href="static/angular2Markup.html">Angular 2 Markup</a>.  
 *
* The <b>WjFinancialChartSeries</b> component is derived from the <b>FinancialSeries</b> control and
 * inherits all its properties, events and methods. 
 * 
 * The <b>wj-financial-chart-series</b> component may contain a @see:wijmo/wijmo.angular2.chart.WjFlexChartAxis child component.
*/
@Component({
    selector: wjFinancialChartSeriesMeta.selector,
    template: wjFinancialChartSeriesMeta.template,
    inputs: wjFinancialChartSeriesMeta.inputs,
    outputs: wjFinancialChartSeriesMeta.outputs,
	providers: [
        { provide: 'WjComponent', useExisting: forwardRef(() => WjFinancialChartSeries)},
        ...wjFinancialChartSeriesMeta.providers
    ]
})
export class WjFinancialChartSeries extends wijmo.chart.finance.FinancialSeries implements OnInit, OnDestroy, AfterViewInit {
    static readonly meta: IWjComponentMetadata = {
        outputs: wjFinancialChartSeriesMeta.outputs,
        changeEvents: {
            'chart.seriesVisibilityChanged': ['visibility']            
        },
        siblingId: 'series',
    };
    private _wjBehaviour: WjDirectiveBehavior;
    /**
     * Indicates whether the component has been initialized by Angular.
     * Changes its value from false to true right before triggering the <b>initialized</b> event.
     */
    isInitialized = false;
    /**
     * This event is triggered after the component has been initialized by Angular, that is
     * all bound properties have been assigned and child components (if any) have been initialized.
     */
    initialized: EventEmitter<any>;
    /**
     * Gets or sets a name of a property that this component is assigned to. 
     * Default value is 'series'.
     */
    wjProperty: string = 'series';
    /**
     * Allows you to override the global <b>WjOptions.asyncBindings</b> setting for this specific component.
     * See the <b>WjOptions.</b>@see:WjOptions.asyncBindings property description for details.
     */
    asyncBindings: boolean;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rendering</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rendering</b> Wijmo event name.
     */
    renderingNg: EventEmitter<any>;
    /**
     * Angular (EventEmitter) version of the Wijmo <b>rendered</b> event for programmatic access.
     * Use this event name if you want to subscribe to the Angular version of the event in code.
     * In template bindings use the conventional <b>rendered</b> Wijmo event name.
     */
    renderedNg: EventEmitter<any>;
    visibilityChangePC: EventEmitter<any>;

    constructor(@Inject(ElementRef) elRef: ElementRef, @Inject(Injector) injector: Injector,
			@Inject('WjComponent') @SkipSelf() @Optional() parentCmp: any) {
        super();
        let behavior = this._wjBehaviour = WjDirectiveBehavior.attach(this, elRef, injector, parentCmp);
        this.created();
    }

    /**
     * If you create a custom component inherited from a Wijmo component, you can override this  
     * method and perform necessary initializations that you usually do in a class constructor. 
     * This method is called in the last line of a Wijmo component constructor and allows you
     * to not declare your custom component's constructor at all, thus preventing you from a necessity 
     * to maintain constructor parameters and keep them in synch with Wijmo component's constructor parameters.
     */
    created() {
    }
    
    ngOnInit() {
        this._wjBehaviour.ngOnInit();
    }

    ngAfterViewInit() {
        this._wjBehaviour.ngAfterViewInit();
    }

    ngOnDestroy() {
        this._wjBehaviour.ngOnDestroy();
    } 
}



let moduleExports = [
    WjFinancialChart,
    WjFinancialChartSeries];
@NgModule({
    imports: [WjDirectiveBaseModule, CommonModule],
    declarations: [...moduleExports,],
    exports: [...moduleExports],
})
export class WjChartFinanceModule {
}