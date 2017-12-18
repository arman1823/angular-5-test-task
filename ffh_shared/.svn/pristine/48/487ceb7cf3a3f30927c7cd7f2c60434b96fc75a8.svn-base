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
module wijmo.input {
    'use strict';

    /**
     * DropDown control (abstract).
     *
     * Contains an input element and a button used to show or hide the drop-down.
     * 
     * Derived classes must override the _createDropDown method to create whatever
     * editor they want to show in the drop down area (a list of items, a calendar,
     * a color editor, etc).
     */
    export class DropDown extends Control {

        // child elements
        _tbx: HTMLInputElement;
        _elRef: HTMLElement;
        _btn: HTMLElement;
        _dropDown: HTMLElement;

        // property storage
        _showBtn = true;
        _autoExpand = true;
        _animate = false;
        _cssClass: string;

        // private stuff
        _oldText: string;
        _altDown: boolean;

        /**
         * Gets or sets the template used to instantiate @see:DropDown controls.
         */
        static controlTemplate = '<div style="position:relative" class="wj-template">' +
                '<div class="wj-input">' +
                    '<div class="wj-input-group wj-input-btn-visible">' +
                        '<input wj-part="input" type="text" class="wj-form-control" />' +
                        '<span wj-part="btn" class="wj-input-group-btn" tabindex="-1">' +
                            '<button class="wj-btn wj-btn-default" type="button" tabindex="-1">' +
                                '<span class="wj-glyph-down"></span>' +
                            '</button>' +
                        '</span>' +
                    '</div>' +
                '</div>' +
                '<div wj-part="dropdown" class="wj-dropdown-panel wj-content" style="display:none">' +
                '</div>' +
            '</div>';

        /**
         * Initializes a new instance of the @see:DropDown class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element, null, true);

            // instantiate and apply template
            let tpl = this.getTemplate();
            this.applyTemplate('wj-control wj-dropdown wj-content', tpl, {
                _tbx: 'input',
                _btn: 'btn',
                _dropDown: 'dropdown'
            }, 'input');

            // set reference element (used for positioning the drop-down)
            let tbx = this._tbx;
            this._elRef = tbx;

            // disable autocomplete/correct/capitalize
            // (important for mobile browsers including Chrome/ Android)
            // https://davidwalsh.name/disable-autocorrect
            'autocomplete,autocorrect,autocapitalize,spellcheck'.split(',').forEach((att) => {
                if (!tbx.hasAttribute(att)) {
                    tbx.setAttribute(att, att == 'spellcheck' ? 'false' : 'off');
                }
            })

            // create drop-down element, update button display
            this._createDropDown();
            this._updateBtn();

            // remove drop-down from DOM (so IE/Edge can print properly)
            // NOTE: this causes some accessibility warnings
            let dd = this._dropDown;
            if (dd && dd.parentElement) {
                dd.parentElement.removeChild(dd);
            }

            // we start collapsed
            addClass(this.hostElement, 'wj-state-collapsed');

            // update focus state when the drop-down gets or loses focus
            let fs = this._updateFocusState.bind(this); // TFS 153367
            this.addEventListener(this.dropDown, 'blur', fs, true);
            this.addEventListener(this.dropDown, 'focus', fs);
            
            // keyboard events (the same handlers are used for the control and for the drop-down)
            let kd = this._keydown.bind(this);
            this.addEventListener(this.hostElement, 'keydown', kd);
            this.addEventListener(this.dropDown, 'keydown', kd);

            // prevent smiley that appears when the user presses alt-down
            this.addEventListener(tbx, 'keypress', (e: KeyboardEvent) => {
                if (e.keyCode == 9787 && this._altDown) {
                    e.preventDefault();
                }
            });

            // textbox events
            this.addEventListener(tbx, 'input', () => {
                this._setText(this.text, false);
            });
            this.addEventListener(tbx, 'click', () => {
                if (this._autoExpand) {
                    this._expandSelection(); // expand the selection to the whole number/word that was clicked
                }
            });

            // IE 9 does not fire an input event when the user removes characters from input 
            // filled by keyboard, cut, or drag operations.
            // https://developer.mozilla.org/en-US/docs/Web/Events/input
            // so subscribe to keyup and set the text just in case (TFS 111189)
            if (isIE9()) {
                this.addEventListener(tbx, 'keyup', () => {
                    this._setText(this.text, false);
                });
            }

            // handle clicks on the drop-down button
            this.addEventListener(this._btn, 'click', this._btnclick.bind(this));

            // stop propagation of click events on the drop-down element
            // they are not children of the hostElement, which can confuse Bootstrap popups
            this.addEventListener(this._dropDown, 'click', (e) => {
                e.stopPropagation();
            });
        }

        //--------------------------------------------------------------------------
        //#region ** object model

        /**
         * Gets or sets the text shown on the control.
         */
        get text(): string {
            return this._tbx.value;
        }
        set text(value: string) {
            if (value != this.text) {
                this._setText(value, true);
            }
        }
        /**
         * Gets the HTML input element hosted by the control.
         *
         * Use this property in situations where you want to customize the
         * attributes of the input element.
         */
        get inputElement(): HTMLInputElement {
            return this._tbx;
        }
        /**
         * Gets or sets a value that indicates whether the user can modify
	     * the control value using the mouse and keyboard.
         */
        get isReadOnly(): boolean {
            return this._tbx.readOnly;
        }
        set isReadOnly(value: boolean) {
            this._tbx.readOnly = asBoolean(value);
            toggleClass(this.hostElement, 'wj-state-readonly', this.isReadOnly);
        }
        /**
         * Gets or sets a value that determines whether the control value must be set to 
         * a non-null value or whether it can be set to null 
         * (by deleting the content of the control).
         */
        get isRequired(): boolean {
            return this._tbx.required;
        }
        set isRequired(value: boolean) {
            this._tbx.required = asBoolean(value);
        }
        /**
         * Gets or sets the string shown as a hint when the control is empty.
         */
        get placeholder(): string {
            return this._tbx.placeholder;
        }
        set placeholder(value: string) {
            this._tbx.placeholder = value;
        }
        /**
         * Gets or sets a value that indicates whether the drop down is currently visible.
         */
        get isDroppedDown(): boolean {
            return this._dropDown.style.display != 'none';
        }
        set isDroppedDown(value: boolean) {
            value = asBoolean(value) && !this.isDisabled && !this.isReadOnly;
            if (value != this.isDroppedDown && this.onIsDroppedDownChanging(new CancelEventArgs())) {
                let host = this.hostElement,
                    dd = this._dropDown;
                if (value) { // show drop-down
                    if (!dd.style.minWidth) {
                        dd.style.minWidth = host.getBoundingClientRect().width + 'px';
                    }
                    dd.style.display = 'block';
                    this._updateDropDown();
                } else { // hide drop-down
                    if (this.containsFocus()) {
                        if (!this.isTouching || !this.showDropDownButton) {
                            this.selectAll();
                        } else {
                            this.focus(); // keep the focus (needed on Android: TFS 143147)
                        }
                    }
                    hidePopup(dd);
                }
                this._updateFocusState();
                toggleClass(host, 'wj-state-collapsed', !this.isDroppedDown);
                this.onIsDroppedDownChanged();
            }
        }
        /**
         * Gets the drop down element shown when the @see:isDroppedDown 
         * property is set to true.
         */
        get dropDown(): HTMLElement {
            return this._dropDown;
        }
        /**
         * Gets or sets a CSS class name to add to the control's drop-down element.
         *
         * This property is useful when styling the drop-down element, because it is
         * shown as a child of the document body rather than as a child of the control
         * itself, which prevents using CSS selectors based on the parent control.
         */
        get dropDownCssClass(): string {
            return this._cssClass;
        }
        set dropDownCssClass(value: string) {
            if (value != this._cssClass) {
                removeClass(this._dropDown, this._cssClass);
                this._cssClass = asString(value);
                addClass(this._dropDown, this._cssClass);
            }
        }
        /**
         * Gets or sets a value that indicates whether the control should display a drop-down button.
         */
        get showDropDownButton(): boolean {
            return this._showBtn;
        }
        set showDropDownButton(value: boolean) {
            this._showBtn = asBoolean(value);
            this._updateBtn();
        }
        /**
         * Gets or sets a value that indicates whether the control should automatically expand the 
         * selection to whole words/numbers when the control is clicked.
         */
        get autoExpandSelection(): boolean {
            return this._autoExpand;
        }
        set autoExpandSelection(value: boolean) {
            this._autoExpand = asBoolean(value);
        }
        /**
         * Gets or sets a value that indicates whether the control should use a fade-in animation
         * when displaying the drop-down.
         */
        get isAnimated(): boolean {
            return this._animate;
        }
        set isAnimated(value: boolean) {
            this._animate = asBoolean(value);
        }
        /**
         * Sets the focus to the control and selects all its content.
         */
        selectAll() {
            if (this._elRef == this._tbx) {
                setSelectionRange(this._tbx, 0, this.text.length);
            } else {
                this.focus(); // TFS 243195
            }
        }
        /**
         * Occurs when the value of the @see:text property changes.
         */
        readonly textChanged = new Event();
        /**
         * Raises the @see:textChanged event.
         */
        onTextChanged(e?: EventArgs) {
            this.textChanged.raise(this, e);
            this._updateState();
        }
        /**
         * Occurs before the drop down is shown or hidden.
         */
        readonly isDroppedDownChanging = new Event();
        /**
         * Raises the @see:isDroppedDownChanging event.
         */
        onIsDroppedDownChanging(e: CancelEventArgs): boolean {
            this.isDroppedDownChanging.raise(this, e);
            return !e.cancel;
        }
        /**
         * Occurs after the drop down is shown or hidden.
         */
        readonly isDroppedDownChanged = new Event();
        /**
         * Raises the @see:isDroppedDownChanged event.
         */
        onIsDroppedDownChanged(e?: EventArgs) {
            this.isDroppedDownChanged.raise(this, e);
        }

        //#endregion

        //--------------------------------------------------------------------------
        //#region ** overrides

        // transfer focus from control to textbox
        // (but don't show the soft keyboard when the user touches the drop-down button)
        onGotFocus(e?: EventArgs) {
            if (!this.isTouching) {
                this.selectAll();
            }
            super.onGotFocus(e);
        }

        // close the drop-down when losing focus
        onLostFocus(e?: EventArgs) {
            this._commitText();
            if (!this.containsFocus()) {
                this.isDroppedDown = false;
            }
            super.onLostFocus(e);
        }

        // check whether this control or its drop-down contain the focused element.
        // this is needed mostly for context menus, where the drop-down's owner
        // is not a child of the control (TFS 268503).
        containsFocus(): boolean {
            return super.containsFocus() || contains(this._dropDown, getActiveElement());
        }

        // close and dispose of drop-down when disposing the control
        dispose() {
            this.isDroppedDown = false;
            let dd = this.dropDown;
            if (dd) {
                let ctl = Control.getControl(dd);
                if (ctl) {
                    ctl.dispose();
                } else if (dd.parentElement) {
                    dd.parentElement.removeChild(dd);
                }
            }
            super.dispose();
        }

        // reposition dropdown when refreshing
        refresh(fullUpdate = true) {
            super.refresh(fullUpdate);

            // update popup/focus
            if (this.isDroppedDown) {
                if (getComputedStyle(this.hostElement).display != 'none') {
                    let ae = getActiveElement();
                    showPopup(this._dropDown, this.hostElement, false, false, this.dropDownCssClass == null);
                    if (ae instanceof HTMLElement && ae != getActiveElement()) {
                        ae.focus();
                    }
                }
            }
        }

        // reposition dropdown when window size changes
        _handleResize() {
            if (this.isDroppedDown) {
                this.refresh();
            }
        }

        //#endregion

        //--------------------------------------------------------------------------
        //#region ** implementation

        // expand the current selection to the entire number/string that was clicked
        private _expandSelection() {
            let tbx = this._tbx,
                val = tbx.value,
                start = tbx.selectionStart,
                end = tbx.selectionEnd;
            if (val && start == end) {
                let ct = this._getCharType(val, start);
                if (ct > -1) {
                    for (; end < val.length; end++) {
                        if (this._getCharType(val, end) != ct) {
                            break;
                        }
                    }
                    for (; start > 0; start--) {
                        if (this._getCharType(val, start - 1) != ct) {
                            break;
                        }
                    }
                    if (start != end) {
                        setSelectionRange(tbx, start, end);
                    }
                }
            }
        }

        // get the type of character (digit, letter, other) at a given position
        private _getCharType(text: string, pos: number) {
            let chr = text[pos];
            if (chr >= '0' && chr <= '9') return 0;
            if ((chr >= 'a' && chr <= 'z') || (chr >= 'A' && chr <= 'Z')) return 1;
            return -1;
        }

        // handle keyboard events
        protected _keydown(e: KeyboardEvent) {


            // remember alt key for preventing smiley
            this._altDown = e.altKey;

            // ignore if default prevented
            if (e.defaultPrevented) return;

            // handle key
            switch (e.keyCode) {

                // close dropdown on tab, escape, enter
                case Key.Tab:
                case Key.Escape:
                case Key.Enter:
                    if (this.isDroppedDown) {
                        this.isDroppedDown = false;
                        if (e.keyCode != Key.Tab && !this.containsFocus()) {
                            this.focus();
                        }
                        e.preventDefault();
                    }
                    break;

                // toggle drop-down on F4, alt up/down
                case Key.F4:
                case Key.Up:
                case Key.Down:
                    if (e.keyCode == Key.F4 || e.altKey) {
                        if (contains(document.body, this.hostElement)) { // TFS 142447
                            this.isDroppedDown = !this.isDroppedDown; // sets focus to input element (TFS 242752)
                            e.preventDefault();
                        }
                    }
                    break;
            }
        }

        // handle clicks on the drop-down button
        protected _btnclick(e: MouseEvent) {
            this.isDroppedDown = !this.isDroppedDown;
        }

        // update text in textbox
        protected _setText(text: string, fullMatch: boolean) {

            // make sure we have a string
            if (text == null) text = '';
            text = text.toString();

            // update element
            if (text != this._tbx.value) {
                this._tbx.value = text;
            }

            // fire change event
            if (text != this._oldText) {
                this._oldText = text;
                this.onTextChanged();
            }
        }

        // update drop-down button visibility
        protected _updateBtn() {
            this._btn.tabIndex = -1;
            this._btn.style.display = this._showBtn ? '' : 'none';
        }

        // create the drop-down element
        protected _createDropDown() {
            // override in derived classes
        }

        // commit the text in the value element
        protected _commitText() {
            // override in derived classes
        }

        // update drop down content before showing it
        protected _updateDropDown() {
            if (this.isDroppedDown) {
                this._commitText();
                showPopup(this._dropDown, this.hostElement, false, this._animate, this.dropDownCssClass == null);
           }
        }
    }
}
module wijmo.input {
    'use strict';

    /**
     * Specifies constants that define the date selection behavior.
     */
    export enum DateSelectionMode {
        /** The user cannot change the current value using the mouse or keyboard. */
        None,
        /** The user can select days. */
        Day,
        /** The user can select months. */
        Month,
    }

    /**
     * The @see:Calendar control displays a one-month calendar and allows users
     * to select a date.
     * 
     * You may use the @see:min and @see:max properties to restrict the range
     * of dates that the user can select.
     *
     * For details about using the @see:min and @see:max properties, please see the 
     * <a href="static/minMax.html">Using the min and max properties</a> topic.
     *
     * Use the @see:value property to get or set the currently selected date.
     *
     * Use the @see:selectionMode property to determine whether users should be
     * allowed to select days, months, or no values at all.
     *
     * The @see:Calendar control supports the following keyboard commands:
     *
     * <table>
     *   <thead>
     *     <tr><th>Key Combination</th><th>Moves Selection To</th></tr>
     *   </thead>
     *   <tbody>
     *     <tr><td>Left</td><td>Previous day</td></tr>
     *     <tr><td>Right</td><td>Next day</td></tr>
     *     <tr><td>Up</td><td>Previous week</td></tr>
     *     <tr><td>Down</td><td>Next week</td></tr>
     *     <tr><td>PgUp</td><td>Previous month</td></tr>
     *     <tr><td>PgDn</td><td>Next month</td></tr>
     *     <tr><td>Alt + PgUp</td><td>Previous year</td></tr>
     *     <tr><td>Alt + PgDn</td><td>Next year</td></tr>
     *     <tr><td>Home</td><td>@see:min value (if defined) or first of the month</td></tr>
     *     <tr><td>End</td><td>@see:max value (if defined) or last of the month</td></tr>
     *     <tr><td>Alt + End</td><td>Today's date</td></tr>
     *   </tbody>
     * </table>
     *
     * The example below shows a <b>Date</b> value with date and time information
     * using an @see:InputDate and an @see:InputTime control. Notice how both
     * controls are bound to the same controller variable, and each edits the
     * appropriate information (either date or time). The example also shows a
     * @see:Calendar control that allows users to select the date with a
     * single click.
     *
     * @fiddle:vgc3Y
     */
    export class Calendar extends Control {

        // child elements
        private _tbHdr: HTMLTableElement;
        private _tbMth: HTMLTableElement;
        private _tbYr: HTMLTableElement;
        private _btnMth: HTMLElement;
        private _spMth: HTMLSpanElement;
        private _btnPrv : HTMLButtonElement;
        private _btnTdy: HTMLButtonElement;
        private _btnNxt: HTMLButtonElement;

        // property storage
        private _value: Date;
        private _currMonth: Date;
        private _firstDay: Date;
        private _min: Date;
        private _max: Date;
        private _fdw: number;
        private _itemFormatter: Function;
        private _itemValidator: Function;
        private _readOnly = false;
        private _selMode = DateSelectionMode.Day;

        // formats used to display calendar elements
        private _fmtYrMo = 'y';
        private _fmtYr = 'yyyy'
        private _fmtDayHdr = 'ddd';
        private _fmtDay = 'd ';
        private _fmtMonths = 'MMM';

        /**
         * Gets or sets the template used to instantiate @see:Calendar controls.
         */
        static controlTemplate = '<div class="wj-calendar-outer wj-content">' +
            '<div wj-part="tbl-header" class="wj-calendar-header">' +
                '<div wj-part="btn-month" class="wj-month-select">' +
                    '<span wj-part="span-month"></span> <span class="wj-glyph-down"></span>' +
                '</div>' +
                '<div class="wj-btn-group">' +
                    '<button type="button" tabindex="-1" wj-part="btn-prev" class="wj-btn wj-btn-default"><span class="wj-glyph-left"></span></button>' +
                    '<button type="button" tabindex="-1" wj-part="btn-today" class="wj-btn wj-btn-default"><span class="wj-glyph-circle"></span></button>' +
                    '<button type="button" tabindex="-1" wj-part="btn-next" class="wj-btn wj-btn-default"><span class="wj-glyph-right"></span></button>' +
                '</div>' +
            '</div>' +
            '<table wj-part="tbl-month" class="wj-calendar-month"/>' +
            '<table wj-part="tbl-year" class="wj-calendar-year" style="display:none"/>' +
        '</div>';

        /**
         * Initializes a new instance of the @see:Calendar class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            // initialize value (current date)
            this._value = DateTime.newDate();
            this._currMonth = this._getMonth(this._value);

            // create child elements
            this._createChildren();

            // update the control
            this.refresh(true);

            // handle mouse and keyboard
            // The 'click' event may not be triggered on iOS Safari if focus changed
            // during previous tap, so use 'mouseup' instead.
            //this.addEventListener(this.hostElement, 'click', this._click.bind(this));
            this.addEventListener(this.hostElement, 'mouseup', this._click.bind(this));
            this.addEventListener(this.hostElement, 'keydown', this._keydown.bind(this));

            // initialize control options
            this.initialize(options);
        }

        //--------------------------------------------------------------------------
        //#region ** object model

        /**
         * Gets or sets the currently selected date.
         */
        get value(): Date {
            return this._value;
        }
        set value(value: Date) {
            value = asDate(value, true);

            // honor ranges (but keep the time)
            // REVIEW: should not clamp this...
            value = this._clamp(value);

            // update control
            if (this._valid(value)) {
                this.displayMonth = this._getMonth(value);
                if (!DateTime.equals(this._value, value)) {
                    this._value = value;
                    this.invalidate(false);
                    this.onValueChanged();
                }
            }
        }
        /**
         * Gets or sets the earliest date that the user can select in the calendar.
         * 
         * For details about using the @see:min and @see:max properties, please see the 
         * <a href="static/minMax.html">Using the min and max properties</a> topic.
         */
        get min(): Date {
            return this._min;
        }
        set min(value: Date) {
            if (value != this.min) {
                this._min = asDate(value, true);
                this.refresh();
            }
        }
        /**
         * Gets or sets the latest date that the user can select in the calendar.
         * 
         * For details about using the @see:min and @see:max properties, please see the 
         * <a href="static/minMax.html">Using the min and max properties</a> topic.
         */
        get max(): Date {
            return this._max;
        }
        set max(value: Date) {
            if (value != this.max) {
                this._max = asDate(value, true);
                this.refresh();
            }
        }
        /**
         * Gets or sets a value that indicates whether users can select
         * days, months, or no values at all.
         */
        get selectionMode(): DateSelectionMode {
            return this._selMode;
        }
        set selectionMode(value: DateSelectionMode) {
            if (value != this._selMode) {

                // apply new setting
                this._selMode = asEnum(value, DateSelectionMode);

                // update monthView
                let mthMode = this._monthMode();
                if (mthMode) this.monthView = false;

                // update month glyph
                let mthGlyph = this._btnMth.querySelector('.wj-glyph-down') as HTMLElement;
                if (mthGlyph) mthGlyph.style.display = mthMode ? 'none' : '';
            }
        }
        /**
         * Gets or sets a value that indicates whether the user can modify
	     * the control value using the mouse and keyboard.
         */
        get isReadOnly(): boolean {
            return this._readOnly;
        }
        set isReadOnly(value: boolean) {
            this._readOnly = asBoolean(value);
            toggleClass(this.hostElement, 'wj-state-readonly', this.isReadOnly);
        }
        /**
         * Gets or sets a value that represents the first day of the week,
         * the one displayed in the first column of the calendar.
         *
         * Setting this property to null causes the calendar to use the default
         * for the current culture. In the English culture, the first day of the 
         * week is Sunday (0); in most European cultures, the first day of the
         * week is Monday (1).
         */
        get firstDayOfWeek(): number {
            return this._fdw;
        }
        set firstDayOfWeek(value: number) {
            if (value != this._fdw) {
                value = asNumber(value, true);
                if (value && (value > 6 || value < 0)) {
                    throw 'firstDayOfWeek must be between 0 and 6 (Sunday to Saturday).'
                }
                this._fdw = value;
                this.refresh();
            }
        }
        /**
         * Gets or sets the month displayed in the calendar.
         */
        get displayMonth(): Date {
            return this._currMonth;
        }
        set displayMonth(value: Date) {
            if (!DateTime.equals(this.displayMonth, value)) {
                value = asDate(value);
                let valid = this.monthView // TFS 208757
                    ? this._monthInValidRange(value)
                    : this._yearInValidRange(value);
                if (valid) {
                    this._currMonth = this._getMonth(this._clamp(value));  // TFS 208757
                    this.invalidate(true);
                    this.onDisplayMonthChanged();
                }
            }
        }
        /**
         * Gets or sets the format used to display the month and year
         * above the calendar in month view.
         *
         * The default value for this property is 'y'.
         */
        get formatYearMonth(): string {
            return this._fmtYrMo;
        }
        set formatYearMonth(value: string) {
            if (value != this._fmtYrMo) {
                this._fmtYrMo = asString(value);
                this.invalidate();
            }
        }
        /**
         * Gets or sets the format used to display the headers
         * above the days in month view.
         *
         * The default value for this property is 'ddd'.
         */
        get formatDayHeaders(): string {
            return this._fmtDayHdr;
        }
        set formatDayHeaders(value: string) {
            if (value != this._fmtDayHdr) {
                this._fmtDayHdr = asString(value);
                this.invalidate();
            }
        }
        /**
         * Gets or sets the format used to display the days
         * in month view.
         *
         * The default value for this property is 'd ' (the space after the 'd'
         * prevents the format from being interpreted as 'd', the standard format
         * used to represent the short date pattern).
         */
        get formatDays(): string {
            return this._fmtDay;
        }
        set formatDays(value: string) {
            if (value != this._fmtDay) {
                this._fmtDay = asString(value);
                this.invalidate();
            }
        }
        /**
         * Gets or sets the format used to display the year
         * above the months in year view.
         *
         * The default value for this property is 'yyyy'.
         */
        get formatYear(): string {
            return this._fmtYr;
        }
        set formatYear(value: string) {
            if (value != this._fmtYr) {
                this._fmtYr = asString(value);
                this.invalidate();
            }
        }
        /**
         * Gets or sets the format used to display the months
         * in year view.
         *
         * The default value for this property is 'MMM'.
         */
        get formatMonths(): string {
            return this._fmtMonths;
        }
        set formatMonths(value: string) {
            if (value != this._fmtMonths) {
                this._fmtMonths = asString(value);
                this.invalidate();
            }
        }
        /**
         * Gets or sets a value indicating whether the control displays the header 
         * area with the current month and navigation buttons.
         */
        get showHeader(): boolean {
            return this._tbHdr.style.display != 'none';
        }
        set showHeader(value: boolean) {
            this._tbHdr.style.display = asBoolean(value) ? '' : 'none';
        }
        /**
         * Gets or sets a value indicating whether the calendar displays a month or a year.
         */
        get monthView(): boolean {
            return this._tbMth.style.display != 'none';
        }
        set monthView(value: boolean) {
            if (value != this.monthView) {
                this._tbMth.style.display = value ? '' : 'none';
                this._tbYr.style.display = value ? 'none' : '';
            }
        }
        /**
         * Gets or sets a formatter function to customize dates in the calendar.
         *
         * The formatter function can add any content to any date. It allows 
         * complete customization of the appearance and behavior of the calendar.
         *
         * If specified, the function takes two parameters: 
         * <ul>
         *     <li>the date being formatted </li>
         *     <li>the HTML element that represents the date</li>
         * </ul>
         *
         * For example, the code below shows weekends with a yellow background:
         * <pre>
         * calendar.itemFormatter = function(date, element) {
         *   var day = date.getDay();
         *   element.style.backgroundColor = day == 0 || day == 6 ? 'yellow' : '';
         * }
         * </pre>
         */
        get itemFormatter(): Function {
            return this._itemFormatter;
        }
        set itemFormatter(value: Function) {
            if (value != this._itemFormatter) {
                this._itemFormatter = asFunction(value);
                this.invalidate();
            }
        }
        /**
         * Gets or sets a validator function to determine whether dates are valid for selection.
         *
         * If specified, the validator function should take one parameter representing the
         * date to be tested, and should return false if the date is invalid and should not 
         * be selectable.
         *
         * For example, the code below shows weekends in a disabled state and prevents users 
         * from selecting those dates:
         * <pre>
         * calendar.itemValidator = function(date) {
         *   var weekday = date.getDay();
         *   return weekday != 0 && weekday != 6;
         * }
         * </pre>
         */
        get itemValidator(): Function {
            return this._itemValidator;
        }
        set itemValidator(value: Function) {
            if (value != this._itemValidator) {
                this._itemValidator = asFunction(value);
                this.invalidate();
            }
        }
        /**
         * Occurs when the value of the @see:value property changes, either
         * as a result of user actions or by assignment in code.
         */
        readonly valueChanged = new Event();
        /**
         * Raises the @see:valueChanged event.
         */
        onValueChanged(e?: EventArgs) {
            this.valueChanged.raise(this, e);
        }
        /**
         * Occurs after the @see:displayMonth property changes.
         */
        readonly displayMonthChanged = new Event();
        /**
         * Raises the @see:displayMonthChanged event.
         */
        onDisplayMonthChanged(e?: EventArgs) {
            this.displayMonthChanged.raise(this, e);
        }
        /**
         * Occurs when an element representing a day in the calendar has been created.
         *
         * This event can be used to format calendar items for display. It is similar 
         * in purpose to the @see:itemFormatter property, but has the advantage 
         * of allowing multiple independent handlers.
         *
         * For example, the code below uses the @see:formatItem event to disable weekends
         * so they appear dimmed in the calendar:
         *
         * <pre>// disable Sundays and Saturdays
         * calendar.formatItem.addHandler(function (s, e) {
         *   var day = e.data.getDay();
         *   if (day == 0 || day == 6) {
         *     wijmo.addClass(e.item, 'wj-state-disabled');
         *   }
         * });</pre>
         */
        readonly formatItem = new Event();
        /**
         * Raises the @see:formatItem event.
         *
         * @param e @see:FormatItemEventArgs that contains the event data.
         */
        onFormatItem(e: FormatItemEventArgs) {
            this.formatItem.raise(this, e);
        }

        /**
         * Refreshes the control.
         *
         * @param fullUpdate Indicates whether to update the control layout as well as the content.
         */
        refresh(fullUpdate = true) {
            let cells: any,
                cell: HTMLElement,
                day: Date,
                month = this.displayMonth,
                fdw = this.firstDayOfWeek != null ? this.firstDayOfWeek : Globalize.getFirstDayOfWeek();

            // call base class to suppress any pending invalidations
            super.refresh(fullUpdate);

            // calculate first day of the calendar
            this._firstDay = DateTime.addDays(month, -(month.getDay() - fdw + 7) % 7);

            // update current display month (e.g. January 2014)
            setText(this._spMth, Globalize.format(month, this._fmtYrMo));

            // update week day headers (localizable)
            cells = this._tbMth.querySelectorAll('td');
            for (let i = 0; i < 7 && i < cells.length; i++) {
                day = DateTime.addDays(this._firstDay, i);
                setText(cells[i], Globalize.format(day, this._fmtDayHdr));
            }

            // update month days
            for (let i = 7; i < cells.length; i++) {
                cell = cells[i];
                day = DateTime.addDays(this._firstDay, i - 7);
                setText(cell, Globalize.format(day, this._fmtDay));
                cell.className = '';
                let invalid = !this._valid(day);
                toggleClass(cell, 'wj-state-invalid', invalid);
                toggleClass(cell, 'wj-state-selected', DateTime.sameDate(day, this.value));
                toggleClass(cell, 'wj-day-today', DateTime.sameDate(day, DateTime.newDate()));
                toggleClass(cell, 'wj-day-othermonth', invalid || day.getMonth() != month.getMonth() || !this._inValidRange(day));

                // customize the display
                if (this.itemFormatter) {
                    this.itemFormatter(day, cell);
                }
                if (this.formatItem.hasHandlers) {
                    let e = new FormatItemEventArgs(i, day, cell);
                    this.onFormatItem(e);
                }
            }

            // hide rows that belong to the next month
            let rows = this._tbMth.querySelectorAll('tr');
            if (rows.length) {
                day = DateTime.addDays(this._firstDay, 28);
                (rows[rows.length - 2] as HTMLElement).style.display = (day.getMonth() == month.getMonth()) ? '' : 'none';
                day = DateTime.addDays(this._firstDay, 35);
                (rows[rows.length - 1] as HTMLElement).style.display = (day.getMonth() == month.getMonth()) ? '' : 'none';
            }

            // update current year 
            cells = this._tbYr.querySelectorAll('td');
            if (cells.length) {
                setText(cells[0], Globalize.format(month, this._fmtYr));
            }

            // update month names
            for (let i = 1; i < cells.length; i++) {
                cell = cells[i];
                day = DateTime.newDate(month.getFullYear(), i - 1, 1);
                setText(cell, Globalize.format(day, this._fmtMonths));
                cell.className = '';
                toggleClass(cell, 'wj-state-disabled', !this._monthInValidRange(day));
                toggleClass(cell, 'wj-state-selected', this._sameMonth(day, this.value));
            }
        }

        //#endregion

        //--------------------------------------------------------------------------
        //#region ** implementation

        // checks whether the control can change the current value
        private _canChangeValue(): boolean {
            return !this._readOnly && this._selMode != DateSelectionMode.None;
        }

        // check whether a date should be selectable by the user
        private _valid(date: Date): boolean {
            return this.itemValidator && date
                ? this.itemValidator(date)
                : true;
        }

        // check whether a day is within the valid range
        private _inValidRange(date: Date) {
            if (this.min && date < DateTime.fromDateTime(this.min, date)) return false;
            if (this.max && date > DateTime.fromDateTime(this.max, date)) return false;
            return true;
        }

        // check whether a month contains days in the valid range
        // get the month's first and last days, then test whether
        // the min is after the last or the max is before the first
        // to detect invalid months (TFS 221061)
        private _monthInValidRange(month: Date): boolean {
            if (this.min || this.max) {
                let y = month.getFullYear(),
                    m = month.getMonth(),
                    first = DateTime.newDate(y, m, 1),
                    last = DateTime.addDays(DateTime.newDate(y, m + 1, 1), -1); // TFS 276518
                if (this.min && this.min > last) return false;
                if (this.max && this.max < first) return false;
            }
            return true;
        }

        // check whether a year contains days in the valid range
        private _yearInValidRange(year: Date) {
            if (this.min || this.max) {
                let y = year.getFullYear(),
                    first = DateTime.newDate(y, 0),
                    last = DateTime.newDate(y, 11, 31);
                if (this.min && this.min > last) return false;
                if (this.max && this.max < first) return false;
            }
            return true;
        }

        // checks whether a date is in the current month
        private _sameMonth(date: Date, month: Date): boolean {
            return isDate(date) && isDate(month) &&
                date.getMonth() == month.getMonth() &&
                date.getFullYear() == month.getFullYear();
        }

        // honor min/max range (keeping the time)
        _clamp(value: Date): Date {
            if (value) {
                if (this.min) {
                    let min = DateTime.fromDateTime(this.min, value);
                    if (value < min) {
                        value = min;
                    }
                }
                if (this.max) {
                    let max = DateTime.fromDateTime(this.max, value);
                    if (value > max) {
                        value = max;
                    }
                }
            }
            return value;
        }

        // create child elements
        private _createChildren() {

            // instantiate and apply template
            let tpl = this.getTemplate();
            this.applyTemplate('wj-control wj-calendar', tpl, {
                _tbHdr: 'tbl-header',
                _btnMth: 'btn-month',
                _spMth: 'span-month',
                _btnPrv: 'btn-prev',
                _btnTdy: 'btn-today',
                _btnNxt: 'btn-next',
                _tbMth: 'tbl-month',
                _tbYr: 'tbl-year'
            });

            // populate month calendar
            let tr = this._createElement('tr', this._tbMth, 'wj-header');
            for (let d = 0; d < 7; d++) {
                this._createElement('td', tr);
            }
            for (let w = 0; w < 6; w++) {
                tr = this._createElement('tr', this._tbMth);
                for (let d = 0; d < 7; d++) {
                    this._createElement('td', tr);
                }
            }

            // populate year calendar
            tr = this._createElement('tr', this._tbYr, 'wj-header');
            this._createElement('td', tr).setAttribute('colspan', '4');
            for (let i = 0; i < 3; i++) {
                tr = this._createElement('tr', this._tbYr);
                for (let j = 0; j < 4; j++) {
                    this._createElement('td', tr);
                }
            }
        }

        // create an element, append it to another element, and set its class name
        private _createElement(tag: string, parent?: HTMLElement, className?: string) {
            let el = document.createElement(tag);
            if (parent) parent.appendChild(el);
            if (className) addClass(el, className);
            return el;
        }

        // handle clicks on the calendar
        private _click(e: MouseEvent) {
            let handled = false;

            // get element that was clicked
            let elem = e.target as HTMLElement;

            // switch month/year view
            if (contains(this._btnMth, elem) && !this._monthMode()) {
                this.monthView = !this.monthView;
                handled = true;
            }

            // navigate month/year
            else if (contains(this._btnPrv, elem)) {
                this._navigate(-1);
                handled = true;
            } else if (contains(this._btnNxt, elem)) {
                this._navigate(+1);
                handled = true;
            } else if (contains(this._btnTdy, elem)) {
                this._navigate(0);
                handled = true;
            }

            // select day/month
            if (elem && !handled) {
                elem = closest(elem, 'TD') as HTMLElement;
                if (elem) {
                    if (this.monthView) {
                        let index = this._getCellIndex(this._tbMth, elem);
                        if (index > 6 && this._canChangeValue()) {
                            let value = DateTime.fromDateTime(DateTime.addDays(this._firstDay, index - 7), this.value);
                            if (this._inValidRange(value) && this._valid(value)) {
                                this.value = value;
                            }
                            handled = true;
                        }
                    } else {
                        let index = this._getCellIndex(this._tbYr, elem);
                        if (index > 0) {
                            this.displayMonth = DateTime.newDate(this.displayMonth.getFullYear(), index - 1, 1);
                            if (this._monthMode()) {
                                if (this._canChangeValue()) {
                                    let value = DateTime.fromDateTime(this.displayMonth, this.value);
                                    if (this._inValidRange(value)) {
                                        this.value = value;
                                    }
                                }
                            } else {
                                this.monthView = true;
                            }
                            handled = true;
                        }
                    }
                }
            }

            // if we handled the mouse, prevent browser from seeing it
            if (handled) {
                e.preventDefault();
                this.focus();
            }
        }

        // gets the index of a cell in a table
        private _getCellIndex(tbl: HTMLTableElement, cell: HTMLElement): number {
            let cells = tbl.querySelectorAll('TD');
            // handle the key
            for (let i = 0; i < cells.length; i++) {
                if (cells[i] == cell) return i;
            }
            return -1;
        }

        // handle keyboard events
        private _keydown(e: KeyboardEvent) {

            // honor defaultPrevented
            if (e.defaultPrevented) return;

            // alt up/down: open/close popup
            if (e.altKey) {
                switch (e.keyCode) {
                    case Key.Up:
                    case Key.Down:
                        return;
                    case Key.End: // alt End: today's date
                        this._navigate(0);
                        e.preventDefault();
                        return;
                }
            }

            // not interested in meta keys
            if (e.ctrlKey || e.metaKey || e.shiftKey) {
                return;
            }

            // perform date navigation
            let addDays = 0,
                addMonths = 0,
                handled = true;
            if (this.monthView) { // add days
                switch (e.keyCode) {
                    case Key.Left:
                        addDays = -1;
                        break;
                    case Key.Right:
                        addDays = +1;
                        break;
                    case Key.Up:
                        addDays = -7;
                        break;
                    case Key.Down:
                        addDays = +7;
                        break;
                    case Key.PageDown:
                        addMonths = e.altKey ? +12 : +1; // year/month
                        break;
                    case Key.PageUp:
                        addMonths = e.altKey ? -12 : -1; // year/month
                        break;
                    case Key.Home: // min/first of the month
                        if (this._canChangeValue()) {
                            if (this.min) {
                                this.value = DateTime.fromDateTime(this.min, this.value);
                            } else if (this.value) {
                                let dt = this.value;
                                dt = DateTime.newDate(dt.getFullYear(), dt.getMonth(), 1);
                                this.value = DateTime.fromDateTime(dt, this.value);
                            }
                        }
                        break;
                    case Key.End: // max/last of the month
                        if (this._canChangeValue()) {
                            if (this.max) {
                                this.value = DateTime.fromDateTime(this.max, this.value);
                            } else if (this.value) {
                                let dt = this.value;
                                dt = DateTime.newDate(dt.getFullYear(), dt.getMonth() + 1, 0);
                                this.value = DateTime.fromDateTime(dt, this.value);
                            }
                        }
                        break;
                    default:
                        handled = false;
                        break;
                }
            } else { // add months
                switch (e.keyCode) {
                    case Key.Left:
                        addMonths = -1;
                        break;
                    case Key.Right:
                        addMonths = +1;
                        break;
                    case Key.Up:
                        addMonths = -4;
                        break;
                    case Key.Down:
                        addMonths = +4;
                        break;
                    case Key.PageDown:
                        addMonths = e.altKey ? +120 : +12; // decade/year
                        break;
                    case Key.PageUp:
                        addMonths = e.altKey ? -120 : -12; // decade/year
                        break;
                    case Key.Home: // jan
                        addMonths = this.value ? -this.value.getMonth() : 0;
                        break;
                    case Key.End: // dec
                        addMonths = this.value ? 11 - this.value.getMonth() : 0;
                        break;
                    case Key.Enter: // back to month view
                        if (!this._monthMode()) {
                            this.monthView = true;
                        } else {
                            handled = false;
                        }
                        break;
                    default:
                        handled = false;
                        break;
                }
            }

            // apply the change
            if (this.value && this._canChangeValue() && (addDays || addMonths)) {

                // add days/months
                let dt = this.value;
                dt = DateTime.addDays(dt, addDays);
                dt = DateTime.addMonths(dt, addMonths);

                // skip over invalid dates (TFS 223913)
                for (let cnt = 0; !this._valid(dt) && cnt < 31; cnt++) {
                    dt = DateTime.addDays(dt, addDays > 0 || addMonths > 0 ? +1 : -1);
                }

                // set the new value
                this.value = dt;
            }

            // if we handled the key, prevent browser from seeing it
            if (handled) {
                e.preventDefault();
            }
        }

        // gets the month being displayed in the calendar
        private _getMonth(date: Date) {
            if (!date) date = DateTime.newDate();
            return DateTime.newDate(date.getFullYear(), date.getMonth(), 1);
        }

        // returns true in month selection mode
        private _monthMode() {
            return this.selectionMode == DateSelectionMode.Month;
        }

        // change display month by a month or a year, or skip to the current
        private _navigate(skip: number) {
            let monthView = this.monthView;
            switch (skip) {

                // today/this month
                case 0:
                    let today = DateTime.newDate();
                    if (monthView) {
                        if (this._canChangeValue()) {
                            this.value = DateTime.fromDateTime(today, this.value); // select today's date
                        }
                    } else { // year view
                        if (/*this._monthMode() &&*/ this._canChangeValue()) { // TFS 214733
                            this.value = this._getMonth(today); // select today's month
                        }
                    }
                    this._setDisplayMonth(this._getMonth(today)); // show today's month
                    break;

                // show next month/year (keeping current value)
                case +1: 
                    this._setDisplayMonth(DateTime.addMonths(this.displayMonth, monthView ? +1 : +12));
                    break;

                // show previous month/year (keeping current value)
                case -1:
                    this._setDisplayMonth(DateTime.addMonths(this.displayMonth, monthView ? -1 : -12));
                    break;
            }
        }

        // set the display month if it is within the valid range
        _setDisplayMonth(value: Date) {
            if (this._yearInValidRange(value)) {
                this.displayMonth = value;
            }
        }

        //#endregion
    }
}
module wijmo.input {
    'use strict';

    /**
     * The @see:ColorPicker control allows users to select a color by clicking
     * on panels to adjust color channels (hue, saturation, brightness, alpha).
     *
     * Use the @see:value property to get or set the currently selected color.
     *
     * The control is used as a drop-down for the @see:InputColor control.
     *
     * @fiddle:84xvsz90
     */
    export class ColorPicker extends Control {
        _hsb = [.5, 1, 1];
        _alpha = 1;
        _value: string;
        _palette: string[];

        _eSB: HTMLElement;
        _eHue: HTMLElement;
        _eAlpha: HTMLElement;
        _cSB: HTMLElement;
        _cHue: HTMLElement;
        _cAlpha: HTMLElement;
        _ePal: HTMLElement;
        _ePreview: HTMLElement;
        _eText: HTMLElement;

        _htDown: Element;

        /**
         * Gets or sets the template used to instantiate @see:ColorPicker controls.
         */
        static controlTemplate = 
            '<div style="position:relative;width:100%;height:100%">' +
                '<div style="float:left;width:50%;height:100%;box-sizing:border-box;padding:2px">' +
                    '<div wj-part="div-pal">' +
                        '<div style="float:left;width:10%;box-sizing:border-box;padding:2px">' +
                            '<div style="background-color:black;width:100%">&nbsp;</div>' +
                            '<div style="height:6px"></div>' +
                        '</div>' +
                    '</div>' +
                    '<div wj-part="div-text" style="position:absolute;bottom:0px;display:none"></div>' +
                '</div>' +
                '<div style="float:left;width:50%;height:100%;box-sizing:border-box;padding:2px">' +
                    '<div wj-part="div-sb" class="wj-colorbox" style="float:left;width:89%;height:89%">' +
                        '<div style="position:absolute;width:100%;height:100%;background:linear-gradient(to right, white 0%,transparent 100%)"></div>' +
                        '<div style="position:absolute;width:100%;height:100%;background:linear-gradient(to top, black 0%,transparent 100%)"></div>' +
                    '</div>' +
                    '<div style="float:left;width:1%;height:89%"></div>' +
                    '<div style="float:left;width:10%;height:89%">' +
                        '<div wj-part="div-hue" class="wj-colorbox"></div>' +
                    '</div>' +
                    '<div style="float:left;width:89%;height:1%"></div>' +
                    '<div style="float:left;width:89%;height:10%">' +
                        '<div style="width:100%;height:100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAAcSURBVBhXY/iPBBYgAWpKQGkwgMqDAdUk/v8HAM7Mm6GatDUYAAAAAElFTkSuQmCC)">' +
                            '<div wj-part="div-alpha" class="wj-colorbox"></div>' +
                        '</div>' +
                    '</div>' +
                    '<div style="float:left;width:1%;height:10%"></div>' +
                    '<div style="float:left;width:10%;height:10%">' +
                        '<div wj-part="div-pv" class="wj-colorbox" style="position:static"></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        static _tplCursor = '<div style="position:absolute;left:50%;top:50%;width:7px;height:7px;transform:translate(-50%,-50%);border:2px solid #f0f0f0;border-radius:50px;box-shadow:0px 0px 4px 2px #0f0f0f"></div>';

        /**
         * Initializes a new instance of the @see:ColorPicker class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            // instantiate and apply template
            let tpl = this.getTemplate();
            this.applyTemplate('wj-control wj-colorpicker wj-content', tpl, {
                _eSB: 'div-sb',
                _eHue: 'div-hue',
                _eAlpha: 'div-alpha',
                _ePreview: 'div-pv',
                _ePal: 'div-pal',
                _eText: 'div-text'
            });

            // build palette
            this._palette = '#FFF,#000, #F00,#FFC000,#FFFF00,#92D050,#00B050,#00B0F0,#0070C0,#7030A0'.split(',');
            this._updatePalette();

            // build hue gradient 
            // (use an image since IE9 doesn't support multi-stop gradients)
            this._eHue.style.backgroundImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAD4CAIAAACi6hsPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAGvSURBVDhPXdBPaM9xHMfxz4pWaxcmtoOhpdXSVpiyHWxqmVpDjaU5rK34XfypjTJ/p+ZPay6jhsOsRrKwaJElf9IQq03WIkv4FeMwMq221tfje1ByeFzfvd7PEKWGEKWTQRZLySWfVRRTQjmVbKWGOhLsZT+HaeY0bbTTQSfdXOcWffTzmAFeMcwoYyT5ygS/mA5hNgphip98J8kHRnnNSwZ4yH1uc4OrdHGR87RximYO0cgedlLLdqqoYAPrWMtKVrCcJSxiPmnMJUQp/Bsyk2xyyKOAQooopYwKtlDNDur5G7SBJo7RQiv/B+2hl3s84CkvGGKEOOYnxolj/mYmhBmDJ5ngCx95xxsGecYj4pB3iENeoZMO2mmlhaMcpIE4ZII6aqhmM3HMMkooopB88sghm0wySCeVlCjMCVFIYx4LWUwOeRSwhmLWU84mqqihll3sppEmjnOSs5zjEl1c4yZ99POE5wwxwns+840fTDFLFKaZZIJxkozxlmEGGSC+GF++Sy89dHOZC8Rr4lVnOMERDrCPBPXEX22jko2UEn+/mnxyWUYWC0gnNUQh/AEc0HJs6cex0gAAAABJRU5ErkJggg==)';
            this._eHue.style.backgroundSize = 'contain';

            // add filter gradients to IE 9
            if (navigator.appVersion.indexOf('MSIE 9') > -1) {
                (this._eSB.children[0] as HTMLElement).style.filter = 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#ffffffff,endColorstr=#00ffffff,GradientType=1)';
                (this._eSB.children[1] as HTMLElement).style.filter = 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#00000000,endColorstr=#ff000000,GradientType=0)';
            }

            // add cursors to panels
            tpl = ColorPicker._tplCursor;
            this._cSB = createElement(tpl);
            this._cHue = createElement(tpl);
            this._cHue.style.width = '100%';
            this._cAlpha = createElement(tpl);
            this._cAlpha.style.height = '100%';
            this._eSB.appendChild(this._cSB);
            this._eHue.appendChild(this._cHue);
            this._eAlpha.appendChild(this._cAlpha);

            // handle mouse
            this.addEventListener(this.hostElement, 'mousedown', (e: MouseEvent) => {
                document.addEventListener('mousemove', mouseMove);
                document.addEventListener('mouseup', mouseUp);
                this._mouseDown(e);
            });
            let mouseMove = (e: MouseEvent) => {
                this._mouseMove(e);
            };
            let mouseUp = (e: MouseEvent) => {
                document.removeEventListener('mousemove', mouseMove);
                document.removeEventListener('mouseup', mouseUp);
                this._mouseUp(e);
            };

            // handle clicks on the palette
            this.addEventListener(this.hostElement, 'click', (e: MouseEvent) => {
                let el = e.target as HTMLElement;
                if (el && el.tagName == 'DIV' && contains(this._ePal, el)) {
                    let color = el.style.backgroundColor;
                    if (color) {
                        this.value = new Color(color).toString();
                    }
                }
            });

            // initialize value to white
            this.value = '#ffffff';

            // initialize control options
            this.initialize(options);

            // initialize control
            this._updatePanels();
        }
        /**
         * Gets or sets a value indicating whether the @see:ColorPicker allows users
         * to edit the color's alpha channel (transparency).
         */
        get showAlphaChannel(): boolean {
            return this._eAlpha.parentElement.style.display != 'none';
        }
        set showAlphaChannel(value: boolean) {
            this._eAlpha.parentElement.style.display = asBoolean(value) ? '' : 'none';
        }
        /**
         * Gets or sets a value indicating whether the @see:ColorPicker shows a string representation 
         * of the current color.
         */
        get showColorString(): boolean {
            return this._eText.style.display != 'none';
        }
        set showColorString(value: boolean) {
            this._eText.style.display = asBoolean(value) ? '' : 'none';
        }
        /**
         * Gets or sets the currently selected color.
         */
        get value(): string {
            return this._value;
        }
        set value(value: string) {
            if (value != this.value) {

                // save new value
                this._value = asString(value);
                this._eText.innerText = this._value;

                // parse new color, convert to hsb values
                let c = new Color(this._value),
                    hsb = c.getHsb();

                // check whether the color really changed
                if (this._hsb[0] != hsb[0] || this._hsb[1] != hsb[1] ||
                    this._hsb[2] != hsb[2] || this._alpha != c.a) {

                    // update hsb channels (but keep hue when s/b go to zero)
                    if (hsb[2] == 0) {
                        hsb[0] = this._hsb[0];
                        hsb[1] = this._hsb[1];
                    } else if (hsb[1] == 0) {
                        hsb[0] = this._hsb[0];
                    }
                    this._hsb = hsb;
                    this._alpha = c.a;

                    // raise valueChanged event
                    this.onValueChanged();
                }
            }
        }
        /**
         * Gets or sets an array that contains the colors in the palette.
         *
         * The palette contains ten colors, represented by an array with 
         * ten strings. The first two colors are usually white and black.
         */
        get palette(): string[] {
            return this._palette;
        }
        set palette(value: string[]) {
            value = asArray(value);
            for (let i = 0; i < value.length && i < this._palette.length; i++) {
                let entry = asString(value[i]);
                this._palette[i] = entry;
            }
            this._updatePalette();
        }
        /**
         * Occurs when the value of the @see:value property changes, either
         * as a result of user actions or by assignment in code.
         */
        readonly valueChanged = new Event();
        /**
         * Raises the @see:valueChanged event.
         */
        onValueChanged(e?: EventArgs) {
            this._updatePanels();
            this.valueChanged.raise(this, e);
        }

        // ** event handlers
        protected _mouseDown(e: MouseEvent) {
            this._htDown = this._getTargetPanel(e);
            if (this._htDown) {
                e.preventDefault();
                this.focus();
                this._mouseMove(e);
            }
        }
        protected _mouseMove(e: MouseEvent) {
            if (this._htDown) {
                let rc = this._htDown.getBoundingClientRect();
                if (this._htDown == this._eHue) {
                    this._hsb[0] = clamp((e.clientY - rc.top) / rc.height, 0, .99);
                    this._updateColor();
                } else if (this._htDown == this._eSB) {
                    this._hsb[1] = clamp((e.clientX - rc.left) / rc.width, 0, 1);
                    this._hsb[2] = clamp(1 - (e.clientY - rc.top) / rc.height, 0, 1);
                    this._updateColor();
                } else if (this._htDown == this._eAlpha) {
                    this._alpha = clamp((e.clientX - rc.left) / rc.width, 0, 1);
                    this._updateColor();
                }
            }
        }
        protected _mouseUp(e: MouseEvent) {
            this._htDown = null;
        }

        // update color value to reflect new hsb values
        private _updateColor() {
            let c = Color.fromHsb(this._hsb[0], this._hsb[1], this._hsb[2], this._alpha);
            this.value = c.toString();
            this._updatePanels();
        }

        // updates the color elements in the palette
        private _updatePalette() {
            let white = new Color('#fff'),
                black = new Color('#000');

            // clear the current palette
            this._ePal.innerHTML = '';

            // add one column per palette color
            for (let i = 0; i < this._palette.length; i++) {
                let div = createElement('<div style="float:left;width:10%;box-sizing:border-box;padding:1px">'),
                    clr = new Color(this._palette[i]),
                    hsb = clr.getHsb();

                // add palette color
                div.appendChild(this._makePalEntry(clr, 4));

                // add six shades for this color
                for (let r = 0; r < 5; r++) {
                    if (hsb[1] == 0) { // grey tone (no saturation)
                        let pct = r * .1 + (hsb[2] > .5 ? .05 : .55);
                        clr = Color.interpolate(white, black, pct);
                    } else {
                        clr = Color.fromHsb(hsb[0], 0.1 + r * 0.2, 1 - r * 0.1);
                    }
                    div.appendChild(this._makePalEntry(clr, 0));
                }

                // add color and shades to palette
                this._ePal.appendChild(div);
            }
        }

        // creates a palette entry with the given color
        private _makePalEntry(color: Color, margin: any): HTMLElement {
            let e = document.createElement('div');
            setCss(e, {
                cursor: 'pointer',
                backgroundColor: color.toString(),
                marginBottom: margin ? margin : ''
            });
            e.innerHTML = '&nbsp';
            return e;
        }

        // update color and cursor on all panels
        private _updatePanels() {
            let clrHue = Color.fromHsb(this._hsb[0], 1, 1, 1),
                clrSolid = Color.fromHsb(this._hsb[0], this._hsb[1], this._hsb[2], 1);
            this._eSB.style.backgroundColor = clrHue.toString();
            this._eAlpha.style.background = 'linear-gradient(to right, transparent 0%, ' + clrSolid.toString() + ' 100%)';
            if (navigator.appVersion.indexOf('MSIE 9') > -1) {
                this._eAlpha.style.filter = 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#00000000,endColorstr=' + clrSolid.toString() + ', GradientType = 1)';
            }
            this._ePreview.style.backgroundColor = this.value;

            this._cHue.style.top = (this._hsb[0] * 100).toFixed(0) + '%';
            this._cSB.style.left = (this._hsb[1] * 100).toFixed(0) + '%';
            this._cSB.style.top = (100 - this._hsb[2] * 100).toFixed(0) + '%';
            this._cAlpha.style.left = (this._alpha * 100).toFixed(0) + '%';
        }

        // gets the design panel that contains the mouse target
        private _getTargetPanel(e: MouseEvent): HTMLElement {
            let target = e.target as HTMLElement;
            if (contains(this._eSB, target)) return this._eSB;
            if (contains(this._eHue, target)) return this._eHue;
            if (contains(this._eAlpha, target)) return this._eAlpha;
            return null;
        }
    }
} 

module wijmo.input {
    'use strict';

    /**
     * The @see:ListBox control displays a list of items which may contain 
     * plain text or HTML, and allows users to select items with the mouse or 
     * the keyboard.
     * 
     * Use the @see:ListBox.selectedIndex property to determine which item is
     * currently selected.
     *
     * You can populate a @see:ListBox using an array of strings or you can use
     * an array of objects, in which case the @see:ListBox.displayMemberPath
     * property determines which object property is displayed on the list.
     *
     * To display items that contain HTML rather than plain text, set the
     * @see:ListBox.isContentHtml property to true.
     *
     * The example below creates a @see:ListBox control and populates it using
     * a 'countries' array. The control updates its @see:ListBox.selectedIndex
     * and @see:ListBox.selectedItem properties as the user moves the selection.
     * 
     * @fiddle:8HnLx
     */
    export class ListBox extends Control {
        private static _AUTOSEARCH_DELAY = 600;

        // property storage
        _items: any; // any[] or ICollectionView
        _cv: collections.ICollectionView;
        _itemFormatter: Function;
        _pathDisplay = new Binding(null);
        _pathValue = new Binding(null);
        _pathChecked = new Binding(null);
        _html = false;
        _checkedItems = [];

        // work variables
        _itemRole = 'option';
        _checking: boolean;
        _search = '';
        _toSearch: any;
        _bndDisplay: Binding;
        _tabIndex: number;

        /**
         * Initializes a new instance of the @see:ListBox class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            // instantiate and apply template
            this.applyTemplate('wj-control wj-listbox wj-content', null, null);

            // accessibility: https://www.w3.org/TR/wai-aria-1.1/#listbox
            let host = this.hostElement;
            setAttribute(host, 'role', 'listbox', true);

            // initializing from <select> tag
            if (this._orgTag == 'SELECT') {
                this._initFromSelect(this.hostElement);
            }

            // handle mouse and keyboard
            this.addEventListener(host, 'click', this._click.bind(this));
            this.addEventListener(host, 'keydown', this._keydown.bind(this));
            this.addEventListener(host, 'keypress', this._keypress.bind(this));

            // prevent wheel from propagating to parent elements
            this.addEventListener(host, 'wheel', (e: WheelEvent) => {
                if (host.scrollHeight > host.offsetHeight) {
                    if ((e.deltaY < 0 && host.scrollTop == 0) ||
                        (e.deltaY > 0 && host.scrollTop + host.offsetHeight >= host.scrollHeight)) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            });

            // save tabIndex to apply to items later
            this._tabIndex = host.tabIndex;

            // initialize control options
            this.initialize(options);
        }

        //--------------------------------------------------------------------------
        //#region ** overrides

        /**
         * Refreshes the list.
         */
        refresh() {
            super.refresh();

            // re-populate list unless we're binding directly to values and 
            // are showing CheckBoxes (in which case re-populating would 
            // reset the checked state of the items).
            if (this.displayMemberPath || !this.checkedMemberPath) {
                this._populateList();
            }
        }

        //#endregion

        //--------------------------------------------------------------------------
        //#region ** object model

        /**
         * Gets or sets the array or @see:ICollectionView object that contains the list items. 
         */
        get itemsSource(): any {
            return this._items;
        }
        set itemsSource(value: any) {
            if (this._items != value) {

                // unbind current collection view
                if (this._cv) {
                    this._cv.currentChanged.removeHandler(this._cvCurrentChanged, this);
                    this._cv.collectionChanged.removeHandler(this._cvCollectionChanged, this);
                    this._cv = null;
                }

                // save new data source and collection view
                this._items = value;
                this._cv = asCollectionView(value);

                // bind new collection view
                if (this._cv != null) {
                    this._cv.currentChanged.addHandler(this._cvCurrentChanged, this);
                    this._cv.collectionChanged.addHandler(this._cvCollectionChanged, this);
                }

                // update the list
                this._populateList();
                this.onItemsChanged();
                this.onSelectedIndexChanged();
            }
        }
        /**
         * Gets the @see:ICollectionView object used as the item source.
         */
        get collectionView(): collections.ICollectionView {
            return this._cv;
        }
        /**
         * Gets or sets a value indicating whether items contain plain text or HTML.
         */
        get isContentHtml(): boolean {
            return this._html;
        }
        set isContentHtml(value: boolean) {
            if (value != this._html) {
                this._html = asBoolean(value);
                this._populateList();
            }
        }
        /**
         * Gets or sets a function used to customize the values shown on the list.
         * The function takes two arguments, the item index and the default text or html, and
         * returns the new text or html to display.
         *
         * If the formatting function needs a scope (i.e. a meaningful 'this'
         * value), then remember to set the filter using the 'bind' function to
         * specify the 'this' object. For example:
         *
         * <pre>
         *   listBox.itemFormatter = customItemFormatter.bind(this);
         *   function customItemFormatter(index, content) {
         *     if (this.makeItemBold(index)) {
         *       content = '&lt;b&gt;' + content + '&lt;/b&gt;';
         *     }
         *     return content;
         *   }
         * </pre>
         */
        get itemFormatter(): Function {
            return this._itemFormatter;
        }
        set itemFormatter(value: Function) {
            if (value != this._itemFormatter) {
                this._itemFormatter = asFunction(value);
                this._populateList();
            }
        }
        /**
         * Gets or sets the name of the property to use as the visual representation of the items.
         */
        get displayMemberPath(): string {
            return this._pathDisplay.path;
        }
        set displayMemberPath(value: string) {
            if (value != this.displayMemberPath) {
                this._pathDisplay.path = asString(value);
                this._populateList();
            }
        }
        /**
         * Gets or sets the name of the property used to get the @see:selectedValue 
         * from the @see:selectedItem.
         */
        get selectedValuePath(): string {
            return this._pathValue.path;
        }
        set selectedValuePath(value: string) {
            this._pathValue.path = asString(value);
        }
        /**
         * Gets or sets the name of the property used to control the CheckBoxes 
         * placed next to each item.
         *
         * Use this property to create multi-select LisBoxes.
         * When an item is checked or unchecked, the control raises the @see:itemChecked event.
         * Use the @see:selectedItem property to retrieve the item that was checked or unchecked,
         * or use the @see:checkedItems property to retrieve the list of items that are currently
         * checked.
         */
        get checkedMemberPath() {
            return this._pathChecked.path;
        }
        set checkedMemberPath(value: string) {
            if (value != this.checkedMemberPath) {
                this._pathChecked.path = asString(value);
                this._populateList();
            }
        }
        /**
         * Gets or sets the value or the "role" attribute added to the
         * list items. The default value for this property is "option".
         */
        get itemRole(): string {
            return this._itemRole;
        }
        set itemRole(value: string) {
            if (value != this.itemRole) {
                this._itemRole = asString(value);
                this._populateList();
            }
        }
        /**
         * Gets the string displayed for the item at a given index.
         *
         * The string may be plain text or HTML, depending on the setting
         * of the @see:isContentHtml property.
         *
         * @param index The index of the item.
         */
        getDisplayValue(index: number): string {

            // get the text or html
            let item = null;
            if (index > -1 && hasItems(this._cv)) {
                item = this._cv.items[index];
                if (this.displayMemberPath) {
                    item = this._pathDisplay.getValue(item);
                }
            }
            let text = item != null ? item.toString() : '';

            // allow caller to override/modify the text or html
            if (this.itemFormatter) {
                text = this.itemFormatter(index, text);
            }

            // return the result
            return text;
        }
        /**
         * Gets the text displayed for the item at a given index (as plain text).
         *
         * @param index The index of the item.
         */
        getDisplayText(index: number): string {
            let children = this.hostElement.children,
                item = index > -1 && index < children.length
                    ? children[index] as HTMLElement
                    : null;
            return item != null ? item.textContent : '';
        }
        /**
         * Gets a value that determines whether the item at a given index is enabled.
         *
         * @param index The index of the item.
         */
        isItemEnabled(index: number) {

            // skip empty items
            if (!this.getDisplayText(index)) {
                return false;
            }

            // skip disabled items
            var item = this.hostElement.children[index];
            if (!item ||
                item.hasAttribute('disabled') ||
                hasClass(item as HTMLElement, 'wj-state-disabled')) {
                return false;
            }

            // seems OK
            return true;
        }

        /**
         * Gets or sets the index of the currently selected item.
         */
        get selectedIndex(): number {
            return this._cv ? this._cv.currentPosition : -1;
        }
        set selectedIndex(value: number) {
            if (this._cv) {
                this._cv.moveCurrentToPosition(asNumber(value));
            }
        }
        /**
         * Gets or sets the item that is currently selected.
         */
        get selectedItem(): any {
            return this._cv ? this._cv.currentItem: null;
        }
        set selectedItem(value: any) {
            if (this._cv) {
                this._cv.moveCurrentTo(value);
            }
        }
        /**
         * Gets or sets the value of the @see:selectedItem obtained using the @see:selectedValuePath.
         */
        get selectedValue(): any {
            let item = this.selectedItem;
            if (item && this.selectedValuePath) {
                item = this._pathValue.getValue(item);
            }
            return item;
        }
        set selectedValue(value: any) {
            let path = this.selectedValuePath,
                index = -1;
            if (this._cv) {
                for (let i = 0; i < this._cv.items.length; i++) {
                    let item = this._cv.items[i],
                        itemValue = path ? this._pathValue.getValue(item) : item;
                    if (itemValue === value) { // not just '==': TFS 289009
                        index = i;
                        break;
                    }
                }
                this.selectedIndex = index;
            }
        }
        /**
         * Gets or sets the maximum height of the list.
         */
        get maxHeight(): number {
            let host = this.hostElement;
            return host ? parseFloat(host.style.maxHeight) : null;
        }
        set maxHeight(value: number) {
            let host = this.hostElement;
            if (host) {
                host.style.maxHeight = asNumber(value) + 'px';
            }
        }
        /**
         * Highlights the selected item and scrolls it into view.
         */
        showSelection() {
            let index = this.selectedIndex,
                host = this.hostElement,
                children = host.children,
                e: HTMLElement;

            // highlight
            for (let i = 0; i < children.length; i++) {
                e = children[i] as HTMLElement;
                toggleClass(e, 'wj-state-selected', i == index);
                setAttribute(e, 'tabindex', i == index ? this._tabIndex : -1);
            }

            // scroll into view
            if (index > -1 && index < children.length) {
                e = children[index] as HTMLElement;
                let rco = e.getBoundingClientRect(),
                    rcc = host.getBoundingClientRect();
                if (rco.bottom > rcc.bottom) {
                    host.scrollTop += rco.bottom - rcc.bottom;
                } else if (rco.top < rcc.top) {
                    host.scrollTop -= rcc.top - rco.top;
                }
            }

            // make sure the focus is within the selected element (TFS 135278)
            if (index > -1 && this.containsFocus()) {
                e = children[index] as HTMLElement;
                if (e instanceof HTMLElement && !contains(e, getActiveElement())) {
                    e.focus();
                }
            }

            // update control's tabindex as well
            setAttribute(host, 'tabindex', index < 0 ? this._tabIndex : -1);
        }
        /**
         * Gets the checked state of an item on the list.
         *
         * This method is applicable only on multi-select ListBoxes 
         * (see the @see:checkedMemberPath property).
         *
         * @param index Item index.
         */
        getItemChecked(index: number): boolean {
            let item = this._cv.items[index];
            if (isObject(item) && this.checkedMemberPath) {
                return this._pathChecked.getValue(item);
            }
            let cb = this._getCheckbox(index);
            return cb ? cb.checked : false;
        }
        /**
         * Sets the checked state of an item on the list.
         *
         * This method is applicable only on multi-select ListBoxes 
         * (see the @see:checkedMemberPath property).
         *
         * @param index Item index.
         * @param checked Item's new checked state.
         */
        setItemChecked(index: number, checked: boolean) {
            this._setItemChecked(index, checked, true);
        }
        /**
         * Toggles the checked state of an item on the list.
         * This method is applicable only to multi-select ListBoxes 
         * (see the @see:checkedMemberPath property).
         *
         * @param index Item index.
         */
        toggleItemChecked(index: number) {
            this.setItemChecked(index, !this.getItemChecked(index));
        }
        /**
         * Gets or sets an array containing the items that are currently checked.
         */
        get checkedItems(): any[] {
            this._checkedItems.splice(0, this._checkedItems.length);
            if (this._cv) {
                for (let i = 0; i < this._cv.items.length; i++) {
                    if (this.getItemChecked(i)) {
                        this._checkedItems.push(this._cv.items[i]);
                    }
                }
            }
            return this._checkedItems;
        }
        set checkedItems(value: any[]) {
            let cv = this._cv,
                host = this.hostElement,
                arr = asArray(value, false);
            if (cv && arr) {
                let pos = cv.currentPosition,
                    top = host.scrollTop;
                for (let i = 0; i < cv.items.length; i++) {
                    let item = cv.items[i];
                    this._setItemChecked(i, arr.indexOf(item) > -1, false);
                }
                cv.moveCurrentToPosition(pos);
                host.scrollTop = top;
                this.onCheckedItemsChanged();
            }
        }
        /**
         * Occurs when the value of the @see:selectedIndex property changes.
         */
        readonly selectedIndexChanged = new Event();
        /**
         * Raises the @see:selectedIndexChanged event.
         */
        onSelectedIndexChanged(e?: EventArgs) {
            this.selectedIndexChanged.raise(this, e);
        }
        /**
         * Occurs when the list of items changes.
         */
        readonly itemsChanged = new Event();
        /**
         * Raises the @see:itemsChanged event.
         */
        onItemsChanged(e?: EventArgs) {
            this.itemsChanged.raise(this, e);
        }
        /**
         * Occurs before the list items are generated.
         */
        readonly loadingItems = new Event();
        /**
         * Raises the @see:loadingItems event.
         */
        onLoadingItems(e?: EventArgs) {
            this.loadingItems.raise(this, e);
        }
        /**
         * Occurs after the list items have been generated.
         */
        readonly loadedItems = new Event();
        /**
         * Raises the @see:loadedItems event.
         */
        onLoadedItems(e?: EventArgs) {
            this.loadedItems.raise(this, e);
        }
        /**
         * Occurs when the current item is checked or unchecked by the user.
         *
         * This event is raised when the @see:checkedMemberPath is set to the name of a 
         * property to add CheckBoxes to each item in the control.
         *
         * Use the @see:selectedItem property to retrieve the item that was checked or 
         * unchecked.
         */
        readonly itemChecked = new Event();
        /**
         * Raises the @see:itemChecked event.
         */
        onItemChecked(e?: EventArgs) {
            this.itemChecked.raise(this, e);
        }
        /**
         * Occurs when the value of the @see:checkedItems property changes.
         */
        readonly checkedItemsChanged = new Event();
        /**
         * Raises the @see:checkedItemsChanged event.
         */
        onCheckedItemsChanged(e?: EventArgs) {
            this.checkedItemsChanged.raise(this, e);
        }
        /**
         * Occurs when an element representing a list item has been created.
         *
         * This event can be used to format list items for display. It is similar 
         * in purpose to the @see:itemFormatter property, but has the advantage 
         * of allowing multiple independent handlers.
         */
        readonly formatItem = new Event();
        /**
         * Raises the @see:formatItem event.
         *
         * @param e @see:FormatItemEventArgs that contains the event data.
         */
        onFormatItem(e: FormatItemEventArgs) {
            this.formatItem.raise(this, e);
        }

        //#endregion

        //--------------------------------------------------------------------------
        //#region ** implementation

        // sets the checked state of an item on the list
        private _setItemChecked(index: number, checked: boolean, notify = true) {

            // update data item
            let item = this._cv.items[index];
            if (isObject(item)) {
                let ecv = <collections.IEditableCollectionView>tryCast(this._cv, 'IEditableCollectionView');
                if (this._pathChecked.getValue(item) != checked) {
                    this._checking = true;
                    if (ecv) {
                        ecv.editItem(item);
                        this._pathChecked.setValue(item, checked);
                        ecv.commitEdit();
                    } else {
                        this._pathChecked.setValue(item, checked);
                        this._cv.refresh();
                    }
                    this._checking = false;
                }
            }

            // update checkbox value and checked pseudo-class
            let cb = this._getCheckbox(index);
            if (cb) {
                cb.checked = checked;
                let e = closest(cb, '.wj-listbox-item') as HTMLElement;
                if (e) {
                    toggleClass(e, 'wj-state-checked', checked);
                }
            }

            // fire events
            if (notify) {
                this.onItemChecked();
                this.onCheckedItemsChanged();
            }
        }

        // handle changes to the data source
        private _cvCollectionChanged(sender: any, e: collections.NotifyCollectionChangedEventArgs) {
            if (!this._checking) {
                this._populateList();
                this.onItemsChanged();
            }
        }
        private _cvCurrentChanged(sender: any, e: EventArgs) {
            if (!this._checking) { // TFS 294202
                this.showSelection();
                this.onSelectedIndexChanged();
            }
        }

        // populate the list from the current itemsSource
        private _populateList() {

            // get ready to populate
            let host = this.hostElement;
            if (host) {

                // remember if we have focus
                let focus = this.containsFocus();

                // fire event so user can clean up any current items
                this.onLoadingItems();

                // populate list
                host.innerHTML = '';
                if (this._cv) {

                    // add items to document fragment
                    let frag = document.createDocumentFragment();
                    for (let i = 0; i < this._cv.items.length; i++) {

                        // get item text
                        let text = this.getDisplayValue(i);
                        if (this._html != true) {
                            text = escapeHtml(text);
                        }

                        // add checkbox (with tabindex -1 for accessibility: TFS 135857?)
                        if (this.checkedMemberPath) {
                            let checked = this._pathChecked.getValue(this._cv.items[i]);
                            text = '<label><input tabindex="-1" type="checkbox"' +
                                (checked ? ' checked' : '') + '> ' + text + '</label>';
                        }

                        // build item
                        let item = document.createElement('div');
                        item.innerHTML = text;
                        item.className = 'wj-listbox-item';
                        if (hasClass(item.firstChild as HTMLElement, 'wj-separator')) {
                            item.className += ' wj-separator';
                        }

                        // set the item role
                        setAttribute(item, 'role', this.itemRole ? this.itemRole : null);

                        // allow custom formatting
                        if (this.formatItem.hasHandlers) {
                            let e = new FormatItemEventArgs(i, this._cv.items[i], item);
                            this.onFormatItem(e);
                        }

                        // add item to list
                        frag.appendChild(item);
                    }

                    // move elements to host all at once (doesn't seem to be faster, but...)
                    host.appendChild(frag);
                }

                // make sure the list is not totally empty
                // or min-height/max-height won't work properly in IE/Edge
                if (host.children.length == 0) {
                    host.appendChild(document.createElement('div'));
                }

                // restore focus
                if (focus && !this.containsFocus()) {
                    this.focus();
                }

                // scroll selection into view
                this.showSelection();

                // fire event so user can hook up to items
                this.onLoadedItems();
            }
        }

        // click to select elements
        private _click(e: MouseEvent) {
            if (!e.defaultPrevented) {

                // select the item that was clicked
                let children = this.hostElement.children;
                for (let index = 0; index < children.length; index++) {
                    if (contains(children[index], e.target)) {
                        this.selectedIndex = index;
                        break;
                    }
                }

                // handle checkboxes
                let index = this.selectedIndex;
                if (this.checkedMemberPath && index > -1) {
                    let cb = this._getCheckbox(index);
                    if (cb == e.target) {
                        let item = children[index] as HTMLElement;
                        item.focus(); // take focus from the checkbox (Firefox, TFS 135857)
                        this.setItemChecked(index, cb.checked);
                    }
                }
            }
        }

        // handle keydown (cursor keys)
        private _keydown(e: KeyboardEvent) {
            let index = this.selectedIndex,
                host = this.hostElement,
                children = host.children;

            // honor defaultPrevented
            if (e.defaultPrevented) return;

            // ctrl+A toggles checkboxes
            if (e.keyCode == 65 && (e.ctrlKey || e.metaKey)) {
                if (this.checkedMemberPath && hasItems(this.collectionView)) {
                    this.checkedItems = this.getItemChecked(0) ? [] : this.collectionView.items;
                    e.preventDefault();
                    return;
                }
            }

            // not interested in other meta keys
            if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;

            // handle the event
            switch (e.keyCode) {
                case Key.Down:
                    e.preventDefault();
                    this._selectNext();
                    break;
                case Key.Up:
                    e.preventDefault();
                    this._selectPrev();
                    break;
                case Key.Home:
                    e.preventDefault();
                    this._selectFirst();
                    break;
                case Key.End:
                    e.preventDefault();
                    this._selectLast();
                    break;
                case Key.PageDown:
                    e.preventDefault();
                    this._selectNextPage();
                    break;
                case Key.PageUp:
                    e.preventDefault();
                    this._selectPrevPage();
                    break;
                case Key.Space:
                    if (this.checkedMemberPath && index > -1) {
                        let cb = this._getCheckbox(index);
                        if (cb && this.isItemEnabled(index)) {
                            this.setItemChecked(index, !cb.checked);
                            e.preventDefault();
                        }
                    }
                    break;
            }
        }

        // handle keypress (select/search)
        private _keypress(e: KeyboardEvent) {

            // honor defaultPrevented
            if (e.defaultPrevented) return;

            // don't interfere with inner input elements (TFS 132081)
            if (e.target instanceof HTMLInputElement) return;

            // auto search
            if (e.charCode > 32 || (e.charCode == 32 && this._search)) {
                e.preventDefault();

                // update search string
                this._search += String.fromCharCode(e.charCode).toLowerCase();
                //console.log('looking for ' + this._search);
                if (this._toSearch) {
                    clearTimeout(this._toSearch);
                }
                this._toSearch = setTimeout(() => {
                    this._toSearch = null;
                    this._search = '';
                }, ListBox._AUTOSEARCH_DELAY);

                // perform search
                let index = this._findNext(); // multi-char search
                if (index < 0 && this._search.length > 1) {
                    this._search = this._search[this._search.length - 1];
                    index = this._findNext(); // single-char search
                }
                if (index > -1) {
                    this.selectedIndex = index;
                }
            }
        }

        // move the selection to the next enabled item
        _selectNext(): boolean {
            let len = this.hostElement.children.length;
            for (let i = this.selectedIndex + 1; i < len; i++) {
                if (this.isItemEnabled(i)) {
                    this.selectedIndex = i;
                    return true;
                }
            }
            return false;
        }

        // move the selection to the previous enabled item
        _selectPrev(): boolean {
            for (let i = this.selectedIndex - 1; i >= 0; i--) {
                if (this.isItemEnabled(i)) {
                    this.selectedIndex = i;
                    return true;
                }
            }
            return false;
        }

        // select the first enabled item
        _selectFirst(): boolean {
            let len = this.hostElement.children.length;
            for (let i = 0; i < len; i++) {
                if (this.isItemEnabled(i)) {
                    this.selectedIndex = i;
                    return true;
                }
            }
            return false;
        }

        // select the last enabled item
        _selectLast(): boolean {
            let len = this.hostElement.children.length;
            for (let i = len - 1; i >= 0; i--) {
                if (this.isItemEnabled(i)) {
                    this.selectedIndex = i;
                    return true;
                }
            }
            return false;
        }

        // select the first valid item in the next page
        _selectNextPage(): boolean {
            let host = this.hostElement,
                height = host.offsetHeight,
                children = host.children,
                offset = 0;
            for (let i = this.selectedIndex + 1; i < this._cv.items.length; i++) {
                let itemHeight = children[i].scrollHeight;
                if (offset + itemHeight > height && this.isItemEnabled(i)) {
                    this.selectedIndex = i;
                    return true;
                }
                offset += itemHeight;
            }
            return this._selectLast();
        }

        // select the first valid item in the previous page
        _selectPrevPage(): boolean {
            let host = this.hostElement,
                height = host.offsetHeight,
                children = host.children,
                offset = 0;
            for (let i = this.selectedIndex - 1; i > 0; i--) {
                let itemHeight = children[i].scrollHeight;
                if (offset + itemHeight > height && this.isItemEnabled(i)) {
                    this.selectedIndex = i;
                    return true;
                }
                offset += itemHeight;
            }
            return this._selectFirst();
        }

        // look for the '_search' string from the current position
        private _findNext(): number {
            if (this.hostElement) {
                let cnt = this.hostElement.childElementCount,
                    start = this.selectedIndex;

                // start searching from current or next item
                if (start < 0 || this._search.length == 1) {
                    start++;
                }

                // search through the items (with wrapping)
                for (let off = 0; off < cnt; off++) {
                    let index = (start + off) % cnt,
                        txt = this.getDisplayText(index).trim().toLowerCase();
                    if (txt.indexOf(this._search) == 0 && this.isItemEnabled(index)) {
                        //console.log('match at ' + index);
                        return index;
                    }
                }
            }

            // not found
            return -1;
        }

        // gets the checkbox element in a given ListBox item
        private _getCheckbox(index: number): HTMLInputElement {
            let host = this.hostElement;
            return (host && index > -1 && index < host.children.length)
                ? host.children[index].querySelector('input[type=checkbox]') as HTMLInputElement
                : null;
        }

        // build collectionView from OPTION elements items in a SELECT element
        // this is used by the ComboBox
        _initFromSelect(hostElement: HTMLElement) {
            let children = hostElement.children,
                items = [],
                selIndex = -1;
            for (let i = 0; i < children.length; i++) {
                let child = children[i] as HTMLElement;
                if (child.tagName == 'OPTION') {

                    // keep track of selected item
                    if (child.hasAttribute('selected')) {
                        selIndex = items.length;
                    }

                    // add option to collectionView
                    if (child.innerHTML) {
                        items.push({
                            hdr: child.innerHTML,
                            val: child.getAttribute('value'),
                            cmdParam: child.getAttribute('cmd-param')
                        });
                    } else {
                        items.push({
                            hdr: '<div class="wj-separator"/>'
                        });
                    }

                    // remove child from host
                    hostElement.removeChild(child);
                    i--;
                }
            }

            // apply items to control
            if (items) {
                this.displayMemberPath = 'hdr';
                this.selectedValuePath = 'val';
                this.itemsSource = items;
                this.selectedIndex = selIndex;
            }
        }

        //#endregion
    }

    /**
     * Provides arguments for the @see:ListBox.formatItem event.
     */
    export class FormatItemEventArgs extends EventArgs {
        _index: number;
        _data: any;
        _item: HTMLElement;

       /**
        * Initializes a new instance of the @see:FormatItemEventArgs class.
        *
        * @param index Index of the item being formatted.
        * @param data Data item being formatted.
        * @param item Element that represents the list item to be formatted.
        */
        constructor(index: number, data: any, item: HTMLElement) {
            super();
            this._index = asNumber(index);
            this._data = data;
            this._item = asType(item, HTMLElement);
        }
        /**
         * Gets the index of the data item in the list.
         */
        get index():  number {
            return this._index;
        }
        /**
         * Gets the data item being formatted.
         */
        get data(): any {
            return this._data;
        }
        /**
         * Gets a reference to the element that represents the list item to be formatted.
         */
        get item(): HTMLElement {
            return this._item;
        }
    }
}
module wijmo.input {
    'use strict';

    /**
     * The @see:ComboBox control allows users to pick strings from lists.
     *
     * The control automatically completes entries as the user types, and allows users 
     * to show a drop-down list with the items available.
     *
     * Use the @see:ComboBox.itemsSource property to populate the list of options.
     * The items may be strings or objects. If the items are objects, use the
     * @see:ComboBox.displayMemberPath to define which property of the items will be
     * displayed in the list and use the @see:ComboBox.selectedValuePath property to
     * define which property of the items will be used to set the combo's
     * @see:ComboBox.selectedValue property.
     *
     * Use the @see:ComboBox.selectedIndex or the @see:ComboBox.text properties to
     * determine which item is currently selected.
     *
     * The @see:ComboBox.isEditable property determines whether users can enter values
     * that are not present in the list.
     *
     * The example below creates a @see:ComboBox control and populates it with a list
     * of countries. The @see:ComboBox searches for the country as the user types. 
     * The @see:ComboBox.isEditable property is set to false, so the user is forced to
     * select one of the items in the list.
     *
     * The example also shows how to create and populate a @see:ComboBox using
     * an HTML <b>&lt;select&gt;</b> element with <b>&lt;option&gt;</b> child
     * elements.
     *
     * @fiddle:8HnLx
     */
    export class ComboBox extends DropDown {

        // child elements
        _lbx: ListBox;

        // property storage
        _editable = false;

        // private stuff
        _delKey = 0;
        _composing = false;
        _settingText: boolean;
        _pathHdr = new Binding(null);
        _cvt: HTMLElement;
        _bsCollapse = true;

        /**
         * Initializes a new instance of the @see:ComboBox class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            // add wj-combobox class to host element
            let host = this.hostElement;
            addClass(host, 'wj-combobox');

            // accessibility: 
            // https://www.w3.org/TR/wai-aria-1.1/#combobox
            // http://oaa-accessibility.org/examples/role/77/
            let tbx = this._tbx,
                ddId = getUniqueId(host.id + '_dropdown');
            this.dropDown.id = ddId;
            setAttribute(tbx, 'role', 'combobox');
            setAttribute(tbx, 'aria-autocomplete', 'both');
            setAttribute(tbx, 'aria-owns', ddId);
            setAttribute(this._btn, 'aria-controls', ddId);
            setAttribute(this.dropDown, 'aria-expanded', false);

            // disable auto-expand by default
            this.autoExpandSelection = false;

            // handle IME
            this.addEventListener(this._tbx, 'compositionstart', () => {
                this._composing = true;
            });
            this.addEventListener(this._tbx, 'compositionend', () => {
                this._composing = false;
                setTimeout(() => {
                    this._setText(this.text, true);
                });
            });

            // use wheel to scroll through the items
            this.addEventListener(host, 'wheel', (e: WheelEvent) => {
                if (!e.defaultPrevented && !this.isDroppedDown && !this.isReadOnly && this.containsFocus()) {
                    if (this.selectedIndex > -1) {
                        let step = clamp(-e.deltaY, -1, +1);
                        this.selectedIndex = clamp(this.selectedIndex - step, 0, this.collectionView.items.length - 1);
                        e.preventDefault();
                    }
                }
            });

            // initializing from <select> tag
            if (this._orgTag == 'SELECT') {
                this._lbx._initFromSelect(host);
            }

            // refresh text after CollectionView updates
            this._lbx.loadedItems.addHandler(() => {
                if (this.selectedIndex > -1) {
                    this.selectedIndex = this._lbx.selectedIndex;
                }
            })

            // initialize control options
            this.isRequired = true;
            this.initialize(options);
        }

        //--------------------------------------------------------------------------
        //#region ** object model

        /**
         * Gets or sets the array or @see:ICollectionView object that contains the items to select from. 
         */
        get itemsSource(): any {
            return this._lbx.itemsSource;
        }
        set itemsSource(value: any) {
            if (this._lbx.itemsSource != value) {
                this._lbx.itemsSource = value;
                this.onItemsSourceChanged();
            }
            this._updateBtn();
        }
        /**
         * Gets the @see:ICollectionView object used as the item source.
         */
        get collectionView(): collections.ICollectionView {
            return this._lbx.collectionView;
        }
        /**
         * Gets or sets the name of the property to use as the visual representation of the items.
         */
        get displayMemberPath(): string {
            return this._lbx.displayMemberPath;
        }
        set displayMemberPath(value: string) {
            this._lbx.displayMemberPath = value;
            let text = this.getDisplayText();
            if (this.text != text) {
                this._setText(text, true);
            }
        }
        /**
         * Gets or sets the name of a property to use for getting the value displayed in the
         * control's input element.
         *
         * The default value for this property is null, which causes the control to display
         * the same content in the input element as in the selected item of the drop-down list.
         *
         * Use this property if you want to de-couple the value shown in the input element
         * from the values shown in the drop-down list. For example, the input element could
         * show an item's name and the drop-down list could show additional detail.
         */
        get headerPath(): string {
            return this._pathHdr.path;
        }
        set headerPath(value: string) {
            this._pathHdr.path = asString(value);
            let text = this.getDisplayText();
            if (this.text != text) {
                this._setText(text, true);
            }
        }
        /**
         * Gets or sets the name of the property used to get the
         * @see:selectedValue from the @see:selectedItem.
         */
        get selectedValuePath(): string {
            return this._lbx.selectedValuePath;
        }
        set selectedValuePath(value: string) {
            this._lbx.selectedValuePath = value;
        }
        /**
         * Gets or sets a value indicating whether the drop-down list displays
         * items as plain text or as HTML.
         */
        get isContentHtml(): boolean {
            return this._lbx.isContentHtml;
        }
        set isContentHtml(value: boolean) {
            if (value != this.isContentHtml) {
                this._lbx.isContentHtml = asBoolean(value);
                let text = this.getDisplayText();
                if (this.text != text) {
                    this._setText(text, true);
                }
            }
        }
        /**
         * Gets or sets a function used to customize the values shown in the
         * drop-down list.
         * The function takes two arguments, the item index and the default
         * text or html, and returns the new text or html to display.
         *
         * If the formatting function needs a scope (i.e. a meaningful 'this'
         * value), then remember to set the filter using the 'bind' function to
         * specify the 'this' object. For example:
         *
         * <pre>
         *   comboBox.itemFormatter = customItemFormatter.bind(this);
         *   function customItemFormatter(index, content) {
         *     if (this.makeItemBold(index)) {
         *       content = '&lt;b&gt;' + content + '&lt;/b&gt;';
         *     }
         *     return content;
         *   }
         * </pre>
         */
        get itemFormatter(): Function {
            return this._lbx.itemFormatter;
        }
        set itemFormatter(value: Function) {
            this._lbx.itemFormatter = asFunction(value); // update drop-down
            this.selectedIndex = this._lbx.selectedIndex; // update control
        }
        /**
         * Event that fires when items in the drop-down list are created.
         *
         * You can use this event to modify the HTML in the list items.
         * For details, see the @see:ListBox.formatItem event.
         */
        get formatItem(): Event {
            return this.listBox.formatItem;
        }
        /**
         * Gets or sets the index of the currently selected item in the drop-down list.
         */
        get selectedIndex(): number {
            return this._lbx.selectedIndex;
        }
        set selectedIndex(value: number) {
            if (value != this.selectedIndex) {
                this._lbx.selectedIndex = value;
            }
            value = this.selectedIndex; // TFS 214555
            let text = this.getDisplayText(value);
            if (this.text != text) {
                this._setText(text, true);
            }
        }
        /**
         * Gets or sets the item that is currently selected in the drop-down list.
         */
        get selectedItem(): any {
            return this._lbx.selectedItem;
        }
        set selectedItem(value: any) {
            this._lbx.selectedItem = value;
        }
        /**
         * Gets or sets the value of the @see:selectedItem, obtained using the @see:selectedValuePath.
         */
        get selectedValue(): any {
            return this._lbx.selectedValue;
        }
        set selectedValue(value: any) {
            this._lbx.selectedValue = value;
        }
        /**
         * Gets or sets a value that determines whether the content of the
         * input element should be restricted to items in the @see:itemsSource
         * collection.
         */
        get isEditable(): boolean {
            return this._editable;
        }
        set isEditable(value: boolean) {
            this._editable = asBoolean(value);
        }
        /**
         * Gets or sets the maximum height of the drop-down list.
         */
        get maxDropDownHeight(): number {
            return this._lbx.maxHeight;
        }
        set maxDropDownHeight(value: number) {
            this._lbx.maxHeight = asNumber(value);
        }
        /**
         * Gets or sets the maximum width of the drop-down list.
         *
         * The width of the drop-down list is also limited by the width of 
         * the control itself (that value represents the drop-down's minimum width).
         */
        get maxDropDownWidth(): number {
            let lbx = this._dropDown as HTMLElement;
            return parseInt(lbx.style.maxWidth);
        }
        set maxDropDownWidth(value: number) {
            let lbx = this._dropDown as HTMLElement;
            lbx.style.maxWidth = asNumber(value) + 'px';
        }
        /**
         * Gets the string displayed in the input element for the item at a 
         * given index (always plain text).
         *
         * @param index The index of the item to retrieve the text for.
         */
        getDisplayText(index: number = this.selectedIndex): string {

            // get display text directly from the headerPath if that was specified
            if (this.headerPath && index > -1 && hasItems(this.collectionView)) {
                let item = this.collectionView.items[index],
                    text = item ? this._pathHdr.getValue(item) : null;
                text = text != null ? text.toString() : '';
                if (this.isContentHtml) {
                    if (!this._cvt) {
                        this._cvt = document.createElement('div');
                    }
                    this._cvt.innerHTML = text;
                    text = this._cvt.textContent;
                }
                return text.trim();
            }

            // headerPath not specified, get text straight from the ListBox
            return this._lbx.getDisplayText(index).trim();
        }
        /**
         * Gets the index of the first item that matches a given string.
         *
         * @param text The text to search for.
         * @param fullMatch Whether to look for a full match or just the start of the string.
         * @return The index of the item, or -1 if not found.
         */
        indexOf(text: string, fullMatch: boolean): number {
            let cv = this.collectionView;
            if (hasItems(cv) && text != null) { // OK to search for empty strings (TFS 221701)

                // preserve the current selection if possible 
                // http://wijmo.com/topic/wj-combo-box-bug/#post-76154
                let index = this.selectedIndex;
                if (fullMatch && text == this.getDisplayText(index)) { // TFS 253162
                    return index;
                }

                // scan the list from the start
                text = text.toString().toLowerCase();
                for (let i = 0; i < cv.items.length; i++) {
                    if (this.listBox.isItemEnabled(i)) { // skip disabled items
                        let t = this.getDisplayText(i).toLowerCase();
                        if (fullMatch) {
                            if (t == text) {
                                return i;
                            }
                        } else {
                            if (text && t.indexOf(text) == 0) {
                                return i;
                            }
                        }
                    }
                }
            }

            // not found
            return -1;
        }
        /**
         * Gets the @see:ListBox control shown in the drop-down.
         */
        get listBox(): ListBox {
            return this._lbx;
        }

        /**
         * Occurs when the value of the @see:itemsSource property changes.
         */
        readonly itemsSourceChanged = new Event();
        /**
         * Raises the @see:itemsSourceChanged event.
         */
        onItemsSourceChanged(e?: EventArgs) {
            this.itemsSourceChanged.raise(this, e);
        }
        /**
         * Occurs when the value of the @see:selectedIndex property changes.
         */
        readonly selectedIndexChanged = new Event();
        /**
         * Raises the @see:selectedIndexChanged event.
         */
        onSelectedIndexChanged(e?: EventArgs) {
            this._updateBtn();
            this.selectedIndexChanged.raise(this, e);
        }

        //#endregion ** object model

        //--------------------------------------------------------------------------
        //#region ** overrides

        // update the content when refreshing
        refresh(fullUpdate?: boolean) {
            super.refresh(fullUpdate);
            if (hasItems(this.collectionView)) { // TFS 201563
                this._lbx.refresh();
                if (this.selectedIndex > -1) {
                    this.selectedIndex = this._lbx.selectedIndex;
                }
            }
        }

        // prevent empty values if editable and required
        onLostFocus(e?: EventArgs) {

            // Safari does not finish composition on blur (TFS 236810)
            if (this._composing) {
                this._composing = false;
                this._setText(this.text, true);
            }

            // prevent empty values if editable and required (TFS 138025)
            if (this.isEditable && this.isRequired && !this.text) {
                if (hasItems(this.collectionView)) {
                    this.selectedIndex = 0;
                }
            }

            // raise event as usual
            super.onLostFocus(e);
        }

        // prevent dropping down with no items
        onIsDroppedDownChanging(e: CancelEventArgs): boolean {
            if (!this.isDroppedDown && !hasItems(this.collectionView)) {
                e.cancel = true;
                return false; // TFS 252531
            }
            return super.onIsDroppedDownChanging(e);
        }

        // show current selection when dropping down
        onIsDroppedDownChanged(e?: EventArgs) {
            super.onIsDroppedDownChanged(e);
            if (this.isDroppedDown) {
                this._lbx.showSelection();
                if (!this.isTouching) {
                    this.selectAll();
                }
            }
            setAttribute(this.dropDown, 'aria-expanded', this.isDroppedDown);
        }

        // update button visibility and state
        protected _updateBtn() {
            let cv = this.collectionView;

            // show button if the 'showButton' property is true and we have an itemsSource
            this._btn.style.display = (this._showBtn && cv != null) ? '' : 'none';

            // enable the button if the itemsSource is not empty
            enable(this._btn, hasItems(cv));
        }

        // select all text (and focus on the input element) when user clicks the button
        protected _btnclick(e: MouseEvent) {
            super._btnclick(e);
            if (!this.isTouching && this._elRef == this._tbx) { // TFS 292344, 292650
                this.selectAll();
            }
        }

        // create the drop-down element
        protected _createDropDown() {

            // create the drop-down element
            if (!this._lbx) {
                this._lbx = new ListBox(this._dropDown);
            }

            // limit the size of the drop-down
            this._lbx.maxHeight = 200;

            // update our selection when user picks an item from the ListBox
            // or when the selected index changes because the list changed
            this._lbx.selectedIndexChanged.addHandler(() => {
                this._updateBtn();
                this.selectedIndex = this._lbx.selectedIndex;
                this.onSelectedIndexChanged();
            });

            // update button display when item list changes
            this._lbx.itemsChanged.addHandler(() => {
                this._updateBtn();
            });

            // close the drop-down when the user clicks to select an item
            this.addEventListener(this._dropDown, 'click', this._dropDownClick.bind(this));
        }

        //#endregion ** overrides

        //--------------------------------------------------------------------------
        //#region ** implementation

        // close the drop-down when the user clicks to select an item
        protected _dropDownClick(e: MouseEvent) {
            if (!e.defaultPrevented) {
                if (e.target != this._dropDown) { // an item, not the list itself...
                    this.isDroppedDown = false;
                }
            }
        }

        // update text in textbox
        protected _setText(text: string, fullMatch: boolean) {

            // not while composing IME text...
            if (this._composing) return;

            // prevent reentrant calls while moving CollectionView cursor
            if (this._settingText) return;
            this._settingText = true;

            // make sure we have a string
            if (text == null) text = '';
            text = text.toString();

            // get variables we need
            let index = this.selectedIndex,
                cv = this.collectionView,
                start = this._getSelStart(),
                len = -1,
                autoComplete = true;

            // handle cases where user presses delete on editable boxes
            if (this._delKey && this.isEditable) {
                fullMatch = true;
                autoComplete = false;
            }

            // search for the index
            index = this.indexOf(text, fullMatch);
            if (autoComplete) {
                if (index < 0 && fullMatch) { // not found, try partial match
                    index = this.indexOf(text, false);
                }
                if (index < 0 && start > 0) { // not found, try up to cursor
                    index = this.indexOf(text.substr(0, start), false);
                }
            }

            // not found and not editable? restore old text and move cursor to matching part
            if (index < 0 && !this.isEditable && hasItems(cv)) {
                if (this.isRequired || text) { // allow removing the value if not required
                    let oldText = this._oldText || ''; // TFS 233094
                    index = Math.max(0, this.indexOf(oldText, false));
                    for (let i = 0; i < text.length && i < oldText.length; i++) {
                        if (text[i] != oldText[i]) {
                            start = i;
                            break;
                        }
                    }
                }
            }
            if (index > -1) {
                len = start;
                text = this.getDisplayText(index);
            }

            // update element
            if (text != this._tbx.value) {
                this._tbx.value = text;
            }

            // update text selection
            if (len > -1 && this.containsFocus() && !this.isTouching) {
                this._updateInputSelection(len);
            }

            // update collectionView
            if (cv) {
                cv.moveCurrentToPosition(index);
            }

            // call base class to fire textChanged event
            super._setText(text, fullMatch);

            // clear flags
            this._delKey = 0;
            this._settingText = false;
        }

        // skip to the next/previous item that starts with a given string, wrapping
        protected _findNext(text: string, step: number): number {
            if (this.collectionView) {
                text = text.toLowerCase();
                let len = this.collectionView.items.length,
                    index: number,
                    t: string;
                for (let i = 1; i <= len; i++) {
                    index = (this.selectedIndex + i * step + len) % len;
                    t = this.getDisplayText(index).toLowerCase();
                    if (t && t.indexOf(text) == 0) { // look for a match (if we have text)
                        let item = this.dropDown.children[index] as HTMLElement; // skip disabled items
                        if (!item || this.listBox.isItemEnabled(index)) {
                            return index;
                        }
                    }
                }
            }
            return this.selectedIndex;
        }

        // override to select items with the keyboard
        protected _keydown(e: KeyboardEvent) {

            // allow base class
            super._keydown(e);

            // done if default prevented or read-only
            if (e.defaultPrevented || this.isReadOnly) {
                return;
            }

            // not if the alt key is pressed (TFS 273476/272449)
            if (e.altKey) {
                return;
            }

            // not if we have no items
            if (!hasItems(this.collectionView)) {
                return;
            }

            // if the input element is not visible, we're done (e.g. menu)
            if (this._elRef != this._tbx) {
                return;
            }

            // special handling for Back/Delete/Up/Down keys (TFS 153089, 200212, 279218)
            this._delKey = 0;
            let start = this._getSelStart();
            switch (e.keyCode) {

                // remember Back/Delete for use later in _setText
                case Key.Back:
                    if (this._bsCollapse && !this.isEditable) { // make sure the cursor moves
                        let end = this._getSelEnd();
                        if (start > 0 && end == this._tbx.value.length && hasItems(this.collectionView)) {
                            this._setSelRange(start - 1, end);
                        }
                    }
                    this._delKey = e.keyCode;
                    break;
                case Key.Delete:
                    this._delKey = e.keyCode;
                    break;

                // move up/down the list
                case Key.Up:
                case Key.Down:
                    if (start == this.text.length) {
                        start = 0;
                    };
                    this.selectedIndex = this._findNext(this.text.substr(0, start), e.keyCode == Key.Up ? -1 : +1);
                    this._setSelRange(start, this.text.length);
                    e.preventDefault();
                    break;
            }
        }

        // set selection range in input element (if it is visible)
        protected _updateInputSelection(start: number) {
            if (this._elRef == this._tbx) {
                this._setSelRange(start, this._tbx.value.length);
            }
        }

        // get selection start in an extra-safe way (TFS 82372)
        private _getSelStart(): number {
            return this._tbx && this._tbx.value
                ? this._tbx.selectionStart
                : 0;
        }

        // get selection end in an extra-safe way
        private _getSelEnd(): number {
            return this._tbx && this._tbx.value
                ? this._tbx.selectionEnd
                : 0;
        }

        // set selection range if the input element is visible and not read-only
        private _setSelRange(start: number, end: number) {
            let tbx = this._tbx;
            if (this._elRef == tbx) { // && !tbx.readOnly) {
                setSelectionRange(tbx, start, end)
            }
        }

        //#endregion ** implementation
    }
}
/**
 * Defines input controls for strings, numbers, dates, times, and colors.
 */
module wijmo.input {
    'use strict';

    /**
     * The @see:AutoComplete control is an input control that allows callers 
     * to customize the item list as the user types.
     *
     * The control is similar to the @see:ComboBox, except the item source is a 
     * function (@see:itemsSourceFunction) rather than a static list. For example,
     * you can look up items on remote databases as the user types.
     *
     * The example below creates an @see:AutoComplete control and populates it using
     * a 'countries' array. The @see:AutoComplete searches for the country as the user
     * types, and narrows down the list of countries that match the current input.
     * 
     * @fiddle:8HnLx
     */
    export class AutoComplete extends ComboBox {

        // property storage
        private _cssMatch = 'wj-autocomplete-match';
        private _itemsSourceFn: Function;
        private _itemsSourceFnCallBackBnd: Function;
        private _srchProp: string;
        private _minLength = 2;
        private _maxItems = 6;
        private _itemCount = 0;
        private _delay = 500;

        // private stuff
        private _toSearch: any;
        private _query = '';
        private _rxMatch: any;
        private _rxHighlight: any;
        private _inCallback = false;
        private _srchProps: string[] = [];

        /**
         * Initializes a new instance of the @see:AutoComplete class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any) {
            super(element);
            addClass(this.hostElement, 'wj-autocomplete');
            this._bsCollapse = false; // do not collapse selection on Backspace
            this.isEditable = true;
            this.isRequired = false; // TFS 142492
            this.isContentHtml = true;
            this.listBox.formatItem.addHandler(this._formatListItem, this);
            this._itemsSourceFnCallBackBnd = this._itemSourceFunctionCallback.bind(this);
            this.initialize(options);
        }

        //--------------------------------------------------------------------------
        //#region ** object model

        /**
         * Gets or sets the minimum input length to trigger auto-complete suggestions.
         */
        get minLength(): number {
            return this._minLength;
        }
        set minLength(value: number) {
            this._minLength = asNumber(value, false, true);
        }
        /**
         * Gets or sets the maximum number of items to display in the drop-down list.
         */
        get maxItems(): number {
            return this._maxItems;
        }
        set maxItems(value: number) {
            this._maxItems = asNumber(value, false, true);
        }
        /**
         * Gets or sets the delay, in milliseconds, between when a keystroke occurs
         * and when the search is performed.
         */
        get delay(): number {
            return this._delay;
        }
        set delay(value: number) {
            this._delay = asNumber(value, false, true);
        }
        /**
         * Gets or sets a string containing a comma-separated list of properties to use
         * when searching for items.
         *
         * By default, the @see:AutoComplete control searches for matches against the
         * property specified by the @see:displayMemberPath property. The @see:searchMemberPath
         * property allows you to search using additional properties.
         *
         * For example, the code below would cause the control to display the company name
         * and search by company name, symbol, and country:
         *
         * <pre>var ac = new wijmo.input.AutoComplete('#autoComplete', {
         *   itemsSource: companies,
         *   displayMemberPath: 'name',
         *   searchMemberPath: 'symbol,country'
         * });</pre>
         */
        get searchMemberPath(): string {
            return this._srchProp;
        }
        set searchMemberPath(value: string) {
            this._srchProp = asString(value);
            this._srchProps = value ? value.trim().split(/\s*,\s*/) : [];
        }
        /**
         * Gets or sets a function that provides list items dynamically as the user types.
         *
         * The function takes three parameters: 
         * <ul>
         *     <li>the query string typed by the user</li>
         *     <li>the maximum number of items to return</li>
         *     <li>the callback function to call when the results become available</li>
         * </ul>
         *
         * For example:
         * <pre>autoComplete.itemsSourceFunction = function (query, max, callback) {
         *   // get results from the server
         *   var params = { query: query, max: max };
         *   $.getJSON('companycatalog.ashx', params, function (response) {
         *     // return results to the control
         *     callback(response);
         *   });
         * };</pre>
         */
        get itemsSourceFunction(): Function {
            return this._itemsSourceFn;
        }
        set itemsSourceFunction(value: Function) {
            this._itemsSourceFn = asFunction(value);
            if (isFunction(this._itemsSourceFn)) {
                this.itemsSourceFunction(this.text, this.maxItems, this._itemsSourceFnCallBackBnd);
            }
        }
        /**
         * Gets or sets the name of the CSS class used to highlight any parts 
         * of the content that match the search terms.
         */
        get cssMatch(): string {
            return this._cssMatch;
        }
        set cssMatch(value: string) {
            this._cssMatch = asString(value);
        }

        //#endregion ** object model

        //--------------------------------------------------------------------------
        //#region ** overrides

        // override to make up/down keys work properly
        _keydown(e: KeyboardEvent) {
            if (!e.defaultPrevented && this.isDroppedDown) {
                switch (e.keyCode) {
                    case Key.Up:
                    case Key.Down:
                        this.selectAll();
                        break;
                }
            }
            super._keydown(e);
        }

        // update text in textbox
        _setText(text: string) {
            // don't call base class (to avoid autocomplete)

            // don't do this while handling the itemsSourcefunction callback
            if (this._inCallback) {
                return;
            }

            // resetting...
            if (!text && this.selectedIndex > -1) {
                this.selectedIndex = -1;
            }

            // raise textChanged
            if (text != this._oldText) {

                // assign only if necessary to prevent occasionally swapping chars (Android 4.4.2)
                if (this._tbx.value != text) {
                    this._tbx.value = text;
                }
                this._oldText = text;
                this.onTextChanged();

                // no text? no filter...
                if (!text && this.collectionView) {
                    this._rxHighlight = null; // TFS 278848
                    this.collectionView.filter = this._query = null;
                    this.isDroppedDown = false;
                    return;
                }
            }

            // update list when user types in some text
            if (this._toSearch) {
                clearTimeout(this._toSearch);
            }
            if (text != this.getDisplayText()) {

                // get new search terms on a timeOut (so the control doesn't update too often)
                this._toSearch = setTimeout(() => {
                    this._toSearch = null;

                    // get search terms
                    let terms = this.text.trim().toLowerCase();
                    if (terms.length >= this._minLength && terms != this._query) {

                        // save new search terms
                        this._query = terms;

                        // escape RegEx characters in the terms string
                        terms = terms.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");

                        // escape HTML characters in the terms string
                        let termsEscaped = escapeHtml(terms);

                        // build regular expressions for searching and highlighting the items
                        // when searching, match *all* terms on the string
                        // when highlighting, match *any* terms on the string
                        // if the content is html, use negative lookahead to highlight only outside HTML tags
                        // http://stackoverflow.com/questions/18621568/regex-replace-text-outside-html-tags
                        this._rxMatch = new RegExp('(?=.*' + terms.replace(/ /g, ')(?=.*') + ')', 'ig');
                        this._rxHighlight = this.isContentHtml
                            ? new RegExp('(' + termsEscaped.replace(/ /g, '|') + ')(?![^<]*>|[^<>]* </)', 'ig')
                            : new RegExp('(' + termsEscaped.replace(/ /g, '|') + ')', 'ig');

                        // update list
                        //this.isDroppedDown = false;
                        if (this.itemsSourceFunction) {
                            this.itemsSourceFunction(terms, this.maxItems, this._itemsSourceFnCallBackBnd);
                        } else {
                            this._updateItems();
                        }
                    }
                }, this._delay);
            }
        }

        // populate list with results from itemSourceFunction
        _itemSourceFunctionCallback(result) {

            // update list
            this._inCallback = true;
            let cv = asCollectionView(result);
            if (cv) {
                cv.moveCurrentToPosition(-1);
            }
            this.itemsSource = cv;
            this._inCallback = false;

            // show list at the proper place if we have the focus 
            if (this.containsFocus()) { // TFS 202912
                this.isDroppedDown = true;
                this.refresh();
            }
        }

        // closing the drop-down: commit the change
        onIsDroppedDownChanged(e?: EventArgs) {

            // do not call super because it selects the whole text, 
            // and we don't want that while the user is typing
            //super.onIsDroppedDownChanged(e);
            this.isDroppedDownChanged.raise(this, e);

            // keep cursor at the end of the string if the list closed because
            // the user just typed something that didn't match any items
            if (this.containsFocus()) {
                if (!this.isDroppedDown && !this.isTouching) {
                    if (this.selectedItem == null) { // TFS 289104
                        let len = this.text.length;
                        setSelectionRange(this._tbx, len);
                    }
                }
            }

            // clear query string
            this._query = '';

            // remove the filter if the dropdown is closed (or not: TFS 284543)
            //if (!this.isDroppedDown && this.collectionView) {
            //    this.collectionView.filter = null;
            //}
        }

        //#endregion ** overrides

        //--------------------------------------------------------------------------
        //#region ** implementation

        // apply the filter to show only the matches
        protected _updateItems() {
            let cv = this.collectionView;
            if (cv) {

                // apply the filter
                this._inCallback = true;
                cv.beginUpdate();
                this._itemCount = 0;
                cv.filter = this._filter.bind(this);
                cv.moveCurrentToPosition(-1);
                cv.endUpdate();
                this._inCallback = false;

                // show/hide the drop-down
                let cnt = cv.items.length;
                this.isDroppedDown = cnt > 0 && this.containsFocus();
                if (cnt == 0 && !this.isEditable) { // honor isEditable: TFS 81936, 275758
                    this.selectedIndex = -1;
                }

                // refresh to update the drop-down position
                this.refresh();
            }
        }

        // filter the items and show only the matches
        protected _filter(item: any): boolean {

            // honor maxItems
            if (this._itemCount >= this._maxItems) {
                return false;
            }

            // apply filter to item
            let text = this._getItemText(item, false);
            if (this._srchProps) {
                for (let i = 0; i < this._srchProps.length; i++) {
                    text += '\0' + item[this._srchProps[i]];
                }
            }

            // remove html tags for matching
            if (this.isContentHtml) {
                text = text.replace(/<[^>]*>/g, '');
            }

            // count matches
            if (text.match(this._rxMatch)) {
                this._itemCount++;
                return true;
            }

            // no pass
            return false;
        }

        // gets the text to display for a given item (TFS 253890)
        protected _getItemText(item: any, header: boolean): string {
            let text = item ? item.toString() : '',
                binding = header && this.headerPath
                    ? this._pathHdr
                    : this._lbx._pathDisplay;
            if (binding) {
                text = binding.getValue(item);
                text = text != null ? text.toString() : ''; // TFS 268268
            }
            return text;
        }

        // ListBox item formatter: show matches in bold
        protected _formatListItem(sender, e: FormatItemEventArgs) {
            if (this._cssMatch && this._rxHighlight) {
                let highlight = '<span class="' + this._cssMatch + '">$1</span>';
                e.item.innerHTML = e.item.innerHTML.replace(this._rxHighlight, highlight);
            }
        }

        //#endregion ** implementation
    }
}
module wijmo.input {
    'use strict';

    /**
     * The @see:Menu control shows a text element with a drop-down list of commands that
     * the user can invoke by click or touch.
     *
     * The @see:Menu control inherits from @see:ComboBox, so you populate and style it 
     * in the same way that you do the @see:ComboBox (see the @see:Menu.itemsSource
     * property).
     *
     * The @see:Menu control adds an @see:Menu.itemClicked event that fires when the user
     * selects an item from the menu. The event handler can inspect the @see:Menu control
     * to determine which item was clicked. For example:
     * 
     * <pre>
     * var menu = new wijmo.input.Menu(hostElement);
     * menu.header = 'Main Menu';
     * menu.itemsSource = ['option 1', 'option 2', 'option 3'];
     * menu.itemClicked.addHandler(function(sender, args) {
     * var menu = sender;
     *   alert('Thanks for selecting item ' + menu.selectedIndex + ' from menu ' + menu.header + '!');
     * });
     * </pre>
     *
     * The example below illustrates how you can create value pickers, command-based menus, and
     * menus that respond to the @see:Menu.itemClicked event. The menus in this example are based
     * on HTML <b>&lt;select;&gt</b> and <b>&lt;option;&gt</b> elements.
     *
     * @fiddle:BX853
     */
    export class Menu extends ComboBox {
        _hdr: HTMLElement;
        _closing: boolean;
        _command: any;
        _cmdPath: string;
        _cmdParamPath: string;
        _isButton: boolean;
        _defaultItem: any;
        _owner: HTMLElement;

        /**
         * Initializes a new instance of the @see:Menu class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            // add css class name
            let host = this.hostElement,
                tbx = this._tbx;
            addClass(host, 'wj-menu');

            // replace textbox with header div
            tbx.style.display = 'none';
            let tpl = '<div wj-part="header" class="wj-form-control" style="cursor:default"/>';
            this._hdr = this._elRef = createElement(tpl);
            tbx.parentElement.insertBefore(this._hdr, this._tbx);

            // this is not required
            this.isRequired = false;

            // accessibility:
            // https://www.w3.org/TR/wai-aria-1.1/#menu
            // http://oaa-accessibility.org/examples/role/85/
            setAttribute(host, 'role', 'menubar', true);
            setAttribute(tbx, 'role', null);
            setAttribute(tbx, 'aria-autocomplete', null);
            setAttribute(tbx, 'aria-owns', null);
            setAttribute(this.dropDown, 'role', 'menu');
            this.listBox.itemRole = 'menuitem';

            // initializing from <select> tag
            if (this._orgTag == 'SELECT') {
                this.header = host.getAttribute('header');
                if (this._lbx.itemsSource) {
                    this.commandParameterPath = 'cmdParam';
                }
            }

            // change some defaults
            this.isContentHtml = true;
            this.maxDropDownHeight = 500;

            // toggle drop-down when clicking on the header
            // or fire the click event if this menu is a split-button
            this.addEventListener(this._hdr, 'click', (e) => {
                if (!e.defaultPrevented) {
                    if (this._isButton) {
                        this.isDroppedDown = false;
                        this._raiseCommand();
                    } else {
                        this.isDroppedDown = !this.isDroppedDown;
                    }
                }
            });

            // initialize control options
            this.initialize(options);
        }
        /**
         * Gets or sets the HTML text shown in the @see:Menu element.
         */
        get header(): string {
            return this._hdr.innerHTML;
        }
        set header(value: string) {
            this._hdr.innerHTML = asString(value);
        }
        /**
         * Gets or sets the command to execute when an item is clicked.
         *
         * Commands are objects that implement two methods:
         * <ul>
         *  <li><b>executeCommand(parameter)</b> This method executes the command.</li>
         *  <li><b>canExecuteCommand(parameter)</b> This method returns a Boolean value
         *      that determines whether the controller can execute the command.
         *      If this method returns false, the menu option is disabled.</li>
         * </ul>
         *
         * You can also set commands on individual items using the @see:commandPath
         * property.
         */
        get command(): any {
            return this._command;
        }
        set command(value: any) {
            this._command = value;
        }
        /**
         * Gets or sets the name of the property that contains the command to 
         * execute when the user clicks an item.
         *
         * Commands are objects that implement two methods:
         * <ul>
         *  <li><b>executeCommand(parameter)</b> This method executes the command.</li>
         *  <li><b>canExecuteCommand(parameter)</b> This method returns a Boolean value
         *      that determines whether the controller can execute the command.
         *      If this method returns false, the menu option is disabled.</li>
         * </ul>
         */
        get commandPath(): string {
            return this._cmdPath;
        }
        set commandPath(value: string) {
            this._cmdPath = asString(value);
        }
        /**
         * Gets or sets the name of the property that contains a parameter to use with
         * the command specified by the @see:commandPath property.
         */
        get commandParameterPath(): string {
            return this._cmdParamPath;
        }
        set commandParameterPath(value: string) {
            this._cmdParamPath = asString(value);
        }
        /**
         * Gets or sets a value that determines whether this @see:Menu should act
         * as a split button instead of a regular menu.
         *
         * The difference between regular menus and split buttons is what happens 
         * when the user clicks the menu header.
         * In regular menus, clicking the header shows or hides the menu options.
         * In split buttons, clicking the header raises the @see:Menu.itemClicked
         * event and/or invokes the command associated with the last option selected by
         * the user as if the user had picked the item from the drop-down list.
         *
         * If you want to differentiate between clicks on menu items and the button
         * part of a split button, check the value of the @see:Menu.isDroppedDown property
         * of the event sender. If that is true, then a menu item was clicked; if it 
         * is false, then the button was clicked.
         *
         * For example, the code below implements a split button that uses the drop-down
         * list only to change the default item/command, and triggers actions only when
         * the button is clicked:
         *
         * <pre>&lt;-- view --&gt;
         * &lt;wj-menu is-button="true" header="Run" value="browser"
         *   item-clicked="itemClicked(s, e)"&gt;
         *   &lt;wj-menu-item value="'Internet Explorer'"&gt;Internet Explorer&lt;/wj-menu-item&gt;
         *   &lt;wj-menu-item value="'Chrome'"&gt;Chrome&lt;/wj-menu-item&gt;
         *   &lt;wj-menu-item value="'Firefox'"&gt;Firefox&lt;/wj-menu-item&gt;
         *   &lt;wj-menu-item value="'Safari'"&gt;Safari&lt;/wj-menu-item&gt;
         *   &lt;wj-menu-item value="'Opera'"&gt;Opera&lt;/wj-menu-item&gt;
         * &lt;/wj-menu&gt;
         *
         * // controller
         * $scope.browser = 'Internet Explorer';
         * $scope.itemClicked = function (s, e) {
         *   // if not dropped down, click was on the button
         *   if (!s.isDroppedDown) {
         *     alert('running ' + $scope.browser);
         *   }
         *}</pre>
         */
        get isButton(): boolean {
            return this._isButton;
        }
        set isButton(value: boolean) {
            this._isButton = asBoolean(value);
        }
        /**
         * Gets or sets the element that owns this @see:Menu.
         *
         * This variable is set by the wj-context-menu directive in case a single
         * menu is used as a context menu for several different elements.
         */
        get owner(): HTMLElement {
            return this._owner;
        }
        set owner(value: HTMLElement) {
            this._owner = asType(value, HTMLElement, true);
            this._enableDisableItems(); // TFS 122978
        }
        /**
         * Shows the menu at a given location.
         *
         * This method is useful if you want to use the menu as a context
         * menu, attached to one or more elements on the page. For example:
         *
         * <pre>// create menu
         * var div = document.createElement('div');
         * var menu = new wijmo.input.Menu(div, {
         *     itemsSource: 'New,Open,Save,Exit'.split(','),
         *     itemClicked: function (s, e) {
         *         alert('thanks for picking ' + menu.selectedIndex);
         *     }
         * });
         *
         * // use it as a context menu for one or more elements
         * var element = document.getElementById('btn');
         * element.addEventListener('contextmenu', function (e) {
         *     e.preventDefault();
         *     menu.show(e);
         * });</pre>
         *
         * @param position An optional <b>MouseEvent</b> or reference element
         * that determines the position where the menu should be displayed.
         * If not provided, the menu is displayed at the center of the screen.
         */
        show(position?: any) {
            if (!this.isDroppedDown) {
                let dd = this.dropDown;
                this.selectedIndex = -1;
                if (this.onIsDroppedDownChanging(new CancelEventArgs())) {
                    if (this.owner) {
                        dd[Control._OWNR_KEY] = this.owner;
                    }
                    showPopup(dd, position);
                    this.onIsDroppedDownChanged();
                    dd.focus();
                }
            }
        }
        /**
         * Hides the menu.
         *
         * This method is useful if you want to hide a context menu displayed
         * with the @see:show method.
         */
        hide() {
            if (this.isDroppedDown) {
                if (this.onIsDroppedDownChanging(new CancelEventArgs())) {
                    hidePopup(this.dropDown)
                    this.onIsDroppedDownChanged();
                }
            }
        }

        /**
         * Occurs when the user picks an item from the menu.
         * 
         * The handler can determine which item was picked by reading the event sender's
         * @see:selectedIndex property.
         */
        readonly itemClicked = new Event();
        /**
         * Raises the @see:itemClicked event.
         */
        onItemClicked(e?: EventArgs) {
            this.itemClicked.raise(this, e);
        }

        // override onIsDroppedDownChanged to clear the selection when showing the menu
        onIsDroppedDownChanged(e?: EventArgs) {
            super.onIsDroppedDownChanged(e);
            if (this.isDroppedDown) {

                // suspend events
                this._closing = true;

                // save current item in case the user presses the split button
                // while the drop-down is open (TFS 119513)
                this._defaultItem = this.selectedItem;

                // reset menu
                this.isRequired = false;
                this.selectedIndex = -1;

                // enable/disable items
                this._enableDisableItems();

                // restore events
                this._closing = false;

                // move focus to the list so users can select with the keyboard
                this.dropDown.focus();

            } else {

                // closed the drop-down, make sure we have a selected item (TFS 122720)
                if (!this.selectedItem) {
                    this.selectedItem = this._defaultItem;
                }
            }
        }

        // ** implementation

        // override to raise itemClicked on Enter (when open) or 
        // to open the drop-down (when closed) TFS 206344
        protected _keydown(e: KeyboardEvent) {
            if (!e.defaultPrevented) {
                if (e.keyCode == Key.Enter) {
                    if (this.isDroppedDown) {
                        if (this.getDisplayText(this.selectedIndex)) {
                            this._raiseCommand();
                        }
                    } else {
                        this.isDroppedDown = true;
                        e.preventDefault();
                    }
                }
            }
            super._keydown(e);
        }

        // raise command and close drop-down when an item is clicked
        protected _dropDownClick(e: MouseEvent) {
            if (!e.defaultPrevented && e.target != this.dropDown) { // TFS 254447
                if (this.getDisplayText(this.selectedIndex)) {
                    this._raiseCommand();
                }
            }
            super._dropDownClick(e); // allow base class
        }

        // raise itemClicked and/or invoke the current command
        private _raiseCommand(e?: EventArgs) {

            // execute command if available
            let item = this.selectedItem,
                cmd = this._getCommand(item);
            if (cmd) {
                let parm = this._cmdParamPath ? item[this._cmdParamPath] : null;
                if (!this._canExecuteCommand(cmd, parm)) {
                    return; // command not currently available
                }
                this._executeCommand(cmd, parm);
            }

            // raise itemClicked
            this.onItemClicked(e);
        }

        // gets the command to be executed when an item is clicked
        private _getCommand(item: any) {
            let cmd = item && this.commandPath ? item[this.commandPath] : null;
            return cmd ? cmd : this.command;
        }

        // execute a command
        // cmd may be an object that implements the ICommand interface or it may be just a function
        // parm is an optional parameter passed to the command.
        private _executeCommand(cmd, parm) {
            if (cmd && !isFunction(cmd)) {
                cmd = cmd['executeCommand'];
            }
            if (isFunction(cmd)) {
                cmd(parm);
            }
        }

        // checks whether a command can be executed
        private _canExecuteCommand(cmd, parm): boolean {
            if (cmd) {
                let x = cmd['canExecuteCommand'];
                if (isFunction(x)) {
                    return x(parm);
                }
            }
            return true;
        }

        // enable/disable the menu options
        private _enableDisableItems() {
            if (this.collectionView && (this.command || this.commandPath)) {
                let items = this.collectionView.items;
                for (let i = 0; i < items.length; i++) {
                    let cmd = this._getCommand(items[i]),
                        parm = this.commandParameterPath ? items[i][this.commandParameterPath] : null;
                    if (cmd) {
                        let el = this._lbx.hostElement.children[i] as HTMLElement;
                        toggleClass(el, 'wj-state-disabled', !this._canExecuteCommand(cmd, parm));
                    }
                }
            }
        }
    }
}
// initialize header format
wijmo.culture.MultiSelect = window['wijmo'].culture.MultiSelect || {
    itemsSelected: '{count:n0} items selected',
    selectAll: 'Select All'
};

module wijmo.input {
    'use strict';

    /**
     * The @see:MultiSelect control allows users to select multiple items from 
     * drop-down lists that contain custom objects or simple strings.
     *
     * The @see:MultiSelect control extends @see:ComboBox, with all the usual 
     * properties, including @see:MultiSelect.itemsSource and
     * @see:MultiSelect.displayMemberPath.
     *
     * Like the @see:ListBox control, it has a @see:MultiSelect.checkedMemberPath
     * property that defines the name of the property that determines whether an
     * item is checked or not.
     *
     * The items currently checked (selected) can be obtained using the
     * @see:MultiSelect.checkedItems property.
     *
     * The control header is fully customizable. By default, it shows up to two items
     * selected and the item count after that. You can change the maximum number of
     * items to display (@see:MultiSelect.maxHeaderItems), the message shown when no
     * items are selected (@see:MultiSelect.placeholder), and the format string used to
     * show the item count (@see:MultiSelect.headerFormat).
     *
     * Alternatively, you can provide a function to generate the header content based
     * on whatever criteria your application requires (@see:MultiSelect.headerFormatter).
     */
    export class MultiSelect extends ComboBox {
        private _maxHdrItems = 2;
        private _readOnly = false;
        private _selectAll: HTMLElement;
        private _selectAllCheckbox: HTMLInputElement;
        private _selectAllSpan: HTMLSpanElement;
        private _selectAllLabel: string;
        private _hdrFmt = wijmo.culture.MultiSelect.itemsSelected;
        private _hdrFormatter: Function;

        static _DEF_CHECKED_PATH = '$checked';

        /**
         * Initializes a new instance of the @see:MultiSelect class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);
            addClass(this.hostElement, 'wj-multiselect');

            // make header element read-only, ListBox a multi-select
            this._tbx.readOnly = true;
            this.checkedMemberPath = null;

            // toggle drop-down when clicking on the header
            this.addEventListener(this.inputElement, 'click', () => {
                this.isDroppedDown = !this.isDroppedDown;
            });

            // handle clicks on the select all button
            this.addEventListener(this._selectAll, 'click', (e) => {
                if (hasItems(this.collectionView) && e.target == this._selectAllCheckbox) {
                    this.checkedItems = e.target.checked ? this.collectionView.items : [];
                }
            });

            // do NOT close the drop-down when the user clicks to select an item
            this.removeEventListener(this.dropDown, 'click');

            // update header now, when the itemsSource changes, and when items are selected
            this._updateHeader();
            this.listBox.itemsChanged.addHandler(() => {
                this._updateHeader();
            });
            this.listBox.checkedItemsChanged.addHandler(() => {
                this._updateHeader();
                this.onCheckedItemsChanged();
            });

            // initialize control options
            this.initialize(options);
        }

        //** object model

        /**
         * Gets or sets whether the control should display a "Select All" checkbox
         * above the items to select or de-select all items.
         */
        get showSelectAllCheckbox(): boolean {
            return this._selectAll.style.display == '';
        }
        set showSelectAllCheckbox(value: boolean) {
            this._selectAll.style.display = asBoolean(value) ? '' : 'none';
        }
        /**
         * Gets or sets the string to be used as a label for the "Select All"
         * checkbox that is displayed when the @see:showSelectAllCheckbox
         * property is set to true.
         *
         * This property is set to null by default, which causes the control
         * to show a localized version of the string "Select All".
         */
        get selectAllLabel(): string {
            return this._selectAllLabel;
        }
        set selectAllLabel(value: string) {
            if (value != this._selectAllLabel) {
                this._selectAllLabel = asString(value);
                this.refresh();
            }
        }
        /**
         * Gets or sets the name of the property used to control the checkboxes 
         * placed next to each item.
         */
        get checkedMemberPath(): string {
            let p = this.listBox.checkedMemberPath;
            return p != MultiSelect._DEF_CHECKED_PATH ? p : null;
        }
        set checkedMemberPath(value: string) {
            value = asString(value);
            this.listBox.checkedMemberPath = value ? value : MultiSelect._DEF_CHECKED_PATH;
        }
        /**
         * Gets or sets the maximum number of items to display on the control header.
         *
         * If no items are selected, the header displays the text specified by the
         * @see:placeholder property.
         *
         * If the number of selected items is smaller than or equal to the value of the
         * @see:maxHeaderItems property, the selected items are shown in the header.
         *
         * If the number of selected items is greater than @see:maxHeaderItems, the
         * header displays the selected item count instead.
         */
        get maxHeaderItems(): number {
            return this._maxHdrItems;
        }
        set maxHeaderItems(value: number) {
            if (this._maxHdrItems != value) {
                this._maxHdrItems = asNumber(value);
                this._updateHeader();
            }
        }
        /**
         * Gets or sets the format string used to create the header content
         * when the control has more than @see:maxHeaderItems items checked.
         *
         * The format string may contain the '{count}' replacement string 
         * which gets replaced with the number of items currently checked.
         * The default value for this property in the English culture is
         * '{count:n0} items selected'.
         */
        get headerFormat(): string {
            return this._hdrFmt;
        }
        set headerFormat(value: string) {
            if (value != this._hdrFmt) {
                this._hdrFmt = asString(value);
                this._updateHeader();
            }
        }
        /**
         * Gets or sets a function that gets the HTML in the control header.
         *
         * By default, the control header content is determined based on the 
         * @see:placeholder, @see:maxHeaderItems, and on the current selection.
         *
         * You may customize the header content by specifying a function that 
         * returns a custom string based on whatever criteria your application 
         * requires.
         */
        get headerFormatter(): Function {
            return this._hdrFormatter;
        }
        set headerFormatter(value: Function) {
            if (value != this._hdrFormatter) {
                this._hdrFormatter = asFunction(value);
                this._updateHeader();
            }
        }
        /**
         * Gets or sets an array containing the items that are currently checked.
         */
        get checkedItems(): any[] {
            return this.listBox.checkedItems;
        }
        set checkedItems(value: any[]) {
            this.listBox.checkedItems = asArray(value);
        }
        /**
         * Occurs when the value of the @see:checkedItems property changes.
         */
        readonly checkedItemsChanged = new Event();
        /**
         * Raises the @see:checkedItemsChanged event.
         */
        onCheckedItemsChanged(e?: EventArgs) {
            this.checkedItemsChanged.raise(this, e);
        }

        //** overrides

        // create the drop-down element
        protected _createDropDown() {

            // create selectAll element
            this._selectAll = createElement('<div class="wj-listbox-item wj-header wj-select-all" tabindex="0" style="display:none"><label><input type="checkbox"> <span></span></label></div>', this._dropDown);
            this._selectAllCheckbox = this._selectAll.querySelector('input[type=checkbox]') as HTMLInputElement;
            this._selectAllSpan = this._selectAll.querySelector('label>span') as HTMLSpanElement;
            setText(this._selectAllSpan, wijmo.culture.MultiSelect.selectAll);

            // create child ListBox control
            let lbHost = createElement('<div style="width:100%;border:none"></div>', this._dropDown);
            this._lbx = new wijmo.input.ListBox(lbHost);

            // let base class do its thing
            super._createDropDown();
        }

        // override since our input is always read-only
        get isReadOnly(): boolean {
            return this._readOnly;
        }
        set isReadOnly(value: boolean) {
            this._readOnly = asBoolean(value);
            toggleClass(this.hostElement, 'wj-state-readonly', this.isReadOnly);
        }

        // update header when refreshing
        refresh(fullUpdate = true) {
            super.refresh(fullUpdate);
            this._updateHeader();
            if (this._selectAllSpan) { // update the selectAll element text (globalization)
                setText(this._selectAllSpan, this._selectAllLabel || wijmo.culture.MultiSelect.selectAll);
            }
        }

        // give focus to list when dropping down
        onIsDroppedDownChanged(e?: EventArgs) {
            super.onIsDroppedDownChanged(e);
            if (this.isDroppedDown && this.containsFocus()) {
                setTimeout(() => { // TFS 247578
                    //this.dropDown.focus();
                    this.listBox.focus();
                }, 200);
            }
        }

        // textbox is read-only!
        protected _setText(text: string, fullMatch: boolean) {
            // keep existing text
        }

        // override to show drop-down and start selecting
        protected _keydown(e: KeyboardEvent) {
            super._keydown(e);
            if (!e.defaultPrevented && hasItems(this.collectionView) && e.keyCode > 32) {
                this.isDroppedDown = true;
            }
        }

        //** implementation

        // update the value of the control header
        private _updateHeader() {

            // get selected items
            let items = this.checkedItems;

            // update the header
            if (isFunction(this._hdrFormatter)) {
                this.inputElement.value = this._hdrFormatter();
            } else {
                let hdr = '';
                if (items.length > 0) {
                    if (items.length <= this._maxHdrItems) {
                        if (this.displayMemberPath) {
                            for (let i = 0; i < items.length; i++) {
                                items[i] = items[i][this.displayMemberPath];
                            }
                        }
                        hdr = items.join(', ');
                    } else {
                        hdr = format(this.headerFormat, {
                            count: items.length
                        });
                    }
                }
                this.inputElement.value = hdr;
            }

            // update the selectAll element state
            let checked = null,
                view = this.collectionView;
            if (hasItems(view)) {
                if (items.length == 0) {
                    checked = false;
                } else if (items.length == view.items.length) {
                    checked = true;
                }
            }
            this._selectAllCheckbox.indeterminate = checked == null;
            if (checked != null) {
                this._selectAllCheckbox.checked = checked;
            }

            // update wj-state attributes
            this._updateState();
        }
    }
}

module wijmo.input {
    'use strict';

    /**
     * The @see:MultiAutoComplete control allows users to pick items from lists
     * that contain custom objects or simple strings.
     */
    export class MultiAutoComplete extends AutoComplete {
        private _wjTpl: Element;
        private _wjInput: HTMLElement;
        private _helperInput: HTMLElement;
        private _selItems = [];
        private _maxtems: number;
        private _lastInputValue = '';
        private _selPath = new Binding(null);
        private _notAddItm = false;

        static _clsActive = 'wj-token-active';

        /**
         * Initializes a new instance of the @see:MultiAutoComplete class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            addClass(this.hostElement, 'wj-multi-autocomplete');
            this.showDropDownButton = false;

            // initialize control options
            this.initialize(options);

            this._wjTpl = this.hostElement.querySelector('.wj-template');
            this._wjInput = <HTMLElement>this.hostElement.querySelector('.wj-input');
            this.addEventListener(this.hostElement, 'keyup', this._keyup.bind(this), true);
            this.addEventListener(window, 'resize', this._adjustInputWidth.bind(this));

            // deactivate the token field when input gets the focus
            this.addEventListener(this._tbx, 'focus', () => {
                this._itemOff();
            });

            // add helper input element to handle focus
            this._addHelperInput();

            // refresh header now, when items are selected
            this._initSeltems();

            // when loading the first item will show in the header, so clear it.
            //if (this._selItems.length === 0) {
            //    setTimeout(() => {
            //        this._clearSelIndex();
            //    }, 0);
            //}

            this.listBox.itemsChanged.addHandler(() => this.selectedIndex = -1);
            this._refreshHeader();
        }

        //** object model

        /**
         * Override the value for indicating control should not display a drop-down button.
         */
        set showDropDownButton(value: boolean) {
            this._showBtn = false;
        }
        /**
         * Gets or sets the maximum number of items that can be selected.
         *
         * Setting this property to null (the default value) allows users
         * to pick any number of items.
         */
        get maxSelectedItems(): number {
            return this._maxtems;
        }
        set maxSelectedItems(value: number) {
            if (this._maxtems != value) {
                this._maxtems = asNumber(value, true);
                this._updateMaxItems();
                this._refreshHeader();
                this._clearSelIndex();
            }
        }
        /**
         * Gets or sets the name of the property used to control which 
         * item will be selected.
         */
        get selectedMemberPath(): string {
            return this._selPath.path;
        }
        set selectedMemberPath(value: string) {
            value = asString(value);
            if (value !== this.selectedMemberPath) {
                this._selPath.path = value;
                this._initSeltems();
                this._refreshHeader();
                this.onSelectedItemsChanged();
            }
        }
        /**
         * Gets or sets an array containing the items that are currently
         * selected.
         */
        get selectedItems(): any[] {
            return this._selItems;
        }
        set selectedItems(value: any[]) {

            // save the new value
            this._selItems = asArray(value);

            // update the data source
            if (this.selectedMemberPath && this.selectedMemberPath !== '') {
                if (this._selItems) {
                    for (let i = 0; i < this._selItems.length; i++) {
                        let item = this._selItems[i];
                        this._setSelItem(item, false);
                    }
                }
            }

            // update everything else
            this._updateMaxItems();
            this.onSelectedItemsChanged();
            this._refreshHeader();
            this._clearSelIndex();
        }

        // ** events

        /**
         * Occurs when the value of the @see:selectedItems property changes.
         */
        readonly selectedItemsChanged = new Event();
        /**
         * Raises the @see:selectedItemsChanged event.
         */
        onSelectedItemsChanged(e?: EventArgs) {
            this.selectedItemsChanged.raise(this, e);
        }

        //** overrides

        // give focus to list when dropping down
        onIsDroppedDownChanged(e?: EventArgs) {
            if (!this.isDroppedDown && this.selectedIndex > -1
                && !this._notAddItm) {
                this._addItem(true);
            }
            this._notAddItm = false;
            super.onIsDroppedDownChanged(e);
        }

        // update the header when refreshing
        refresh(fullUpdate?: boolean) {
            super.refresh(fullUpdate);
            this._initSeltems();

            // _itemSourceFunctionCallback call the refresh method,
            // so when dropdown list is close state, then refresh the header
            if (!this.isDroppedDown) {
                this._refreshHeader();
            }
        }

        // override keydown handle: BackSpace, Up, Down etc
        _keydown(e: KeyboardEvent) {
            if (this.isReadOnly) {
                return;
            }
            if (!e.defaultPrevented) {
                switch (e.keyCode) {

                    // remember last text value
                    case Key.Back:
                        this._lastInputValue = this._tbx.value;
                        break;

                    // add selected item and close dropdown
                    case Key.Enter:
                        this._itemOff();
                        this._addItem(true);
                        if (isIE) {// IE cannot get focus when added item
                            setSelectionRange(this._tbx, 0, 0);
                        }
                        break;

                    // add item and keep dropdown open
                    case Key.Tab:
                        if (this.isDroppedDown) {
                            this._addItem(false);
                            this._tbx.value = '';
                            this._lbx.selectedIndex = -1;
                            e.preventDefault();
                        } else {
                            this._updateFocus();
                        }
                        break;

                    // open dropdown list
                    case Key.Space:
                        if (this._tbx.value !== '') {
                            return;
                        }
                        if (!this.isDroppedDown && !this._tbx.disabled) {
                            this.isDroppedDown = true;
                            this._clearSelIndex();
                        }
                        break;

                    // don't add item and close dropdown 
                    case Key.Escape:
                        if (this.isDroppedDown) {
                            this._notAddItm = true;
                        }
                        break;

                    // activate previous item
                    case Key.Left:
                        this._itemOn(this.rightToLeft? false:true);
                        break;

                    // activate next item
                    case Key.Right:
                        this._itemOn(this.rightToLeft? true:false);
                        break;

                    // return if input element is not active element
                    case Key.Up:
                    case Key.Down:
                        let ae = getActiveElement();
                        if (e.altKey) {
                            if (this._tbx == ae) { // TFS 237696
                                this.isDroppedDown = !this.isDroppedDown;
                                if (!this.isDroppedDown) {
                                    this._tbx.focus();
                                }
                                e.preventDefault();
                                return;
                            }
                        } else if (this._tbx !== ae) {
                            return;
                        }

                    // all other keys
                    default:
                        if (e.keyCode === Key.Back || e.keyCode === Key.Delete) {
                            return;
                        }
                        this._itemOff();
                        if (this._maxtems != null &&
                            this._selItems.length >= this._maxtems) {
                            e.preventDefault();
                        }
                        break;
                }
            }

            // allow base class if the input element is not disabled: TFS 286036
            if (!this._tbx.disabled) {
                super._keydown(e);
            }
        }

        // override to deactivate the item
        protected _updateState() {
            super._updateState();

            // deactivate the item
            if (!this._wjTpl) {
                return;
            }
            if (!wijmo.hasClass(this.hostElement, 'wj-state-focused')) {
                this._itemOff();
            }
        }

        // handle the key up event: Back & Delete
        private _keyup(e: KeyboardEvent) {
            if (this.isReadOnly) {
                return;
            }
            if (!e.defaultPrevented) {
                switch (e.keyCode) {
                    case Key.Back:
                        if (this._tbx.value.length === 0 &&
                            this._lastInputValue.length === 0) {
                            this._delItem(false);
                        }
                        break;
                    case Key.Delete:
                        this._delItem(true);
                        break;
                }
            }
        }

        // add helper input element to handle focus
        private _addHelperInput() {
            let input = <HTMLInputElement>document.createElement("input");
            input.type = 'text';
            input.tabIndex = -1;
            input.className = 'wj-token-helper';
            input.readOnly = true;
            this._wjTpl.insertBefore(input, this._wjInput);
            this._helperInput = input;
        }

        // refresh the header to display the selected items
        private _refreshHeader() {

            // clear the token fields
            let tokenFields = this.hostElement.querySelectorAll('.wj-token');
            for (let i = 0; i < tokenFields.length; i++) {
                this._wjTpl.removeChild(tokenFields[i]);
            }

            // when loading the first item will show in the header, so clear it.
            let items = this.selectedItems;
            if (!items || items.length === 0) {
                return;
            }

            // add items to wj-template part
            for (let i = 0; i < items.length; i++) {
                this._insertToken(items[i]);
            }

            this._wjInput.style.cssFloat = this.rightToLeft ? 'right' : 'left';
            // adjust input width and be done
            this._adjustInputWidth();
        }

        // insert token into template
        private _insertToken(item: any) {
            let tokenTxt = this._getItemText(item, true); // TFS 253890
            if (this.isContentHtml) { // TFS 237683
                if (!this._cvt) {
                    this._cvt = document.createElement('div');
                }
                this._cvt.innerHTML = tokenTxt;
                tokenTxt = this._cvt.textContent.trim();
            } else {
                tokenTxt = escapeHtml(tokenTxt);
            }
            this._wjTpl.insertBefore(this._createItem(tokenTxt), this._wjInput);
        }

        // enforce maximum number of selected items
        private _updateMaxItems() {
            if (this._maxtems == null || !this._selItems) {
                return;
            }
            if (this._selItems.length > this._maxtems) {
                this._selItems = this._selItems.slice(0, this._maxtems);
            }
        }

        // update the control focus state
        private _updateFocus() {
            let activeToken = <HTMLElement>this._wjTpl.querySelector('.' + MultiAutoComplete._clsActive);
            if (activeToken) { // focus in the input element
                removeClass(activeToken, MultiAutoComplete._clsActive);
                setTimeout(() => {
                    this._tbx.focus();
                });
            } else { // clear the text input
                this._clearSelIndex();
                removeClass(this.hostElement, 'wj-state-focused');
            }
        }

        // add an item
        private _addItem(clearSelected: boolean) {

            // filter duplicate items
            if (this.selectedItems.indexOf(this.selectedItem) > -1) {
                this._clearSelIndex();
                return;
            }

            if (this.selectedIndex > -1) {
                this._updateSelItems(this.selectedItem, true);
                this._refreshHeader();
                if (clearSelected) {
                    this._clearSelIndex();
                }
                this._disableInput(true);
            }
        }

        // delete an item
        private _delItem(isDelKey: boolean) {

            // get active token
            let activeToken = this._wjTpl.querySelector('.' + MultiAutoComplete._clsActive),
                delItem, curIdx, selectedItmsChanged = false;

            // sanity
            if (isDelKey && !activeToken) {
                return;
            }

            if (activeToken) {
                curIdx = this._getItemIndex(activeToken);
                if (curIdx > -1) { // Delete: delete active token and remove from selectedItems
                    delItem = this._selItems[curIdx];
                    selectedItmsChanged = true;
                }
            } else { // BackSpace: delete last token and remove from selectedItems
                if (this._selItems.length > 0) {
                    delItem = this._selItems[this._selItems.length - 1];
                    selectedItmsChanged = true;
                }
            }

            // update selectedItems and refresh header
            if (selectedItmsChanged) {
                this._updateSelItems(delItem, false);
                this._refreshHeader();
                this._clearSelIndex();
                this._disableInput(false);
            }

            // focus back to input element
            this._tbx.focus();
        }

        // update the selected items
        private _updateSelItems(itm: any, isAdd: boolean) {
            if (isAdd) { // add selected item
                if (!this._selItems || this._selItems.length === 0) {
                    this._selItems = [];
                }
                if (this._maxtems != null &&
                    this._selItems.length >= this._maxtems) {
                    return;
                }
                this._selItems.push(itm);
            } else { // delete selected item
                let idx = this._selItems.indexOf(itm);
                this._selItems.splice(idx, 1);
            }

            if (this._hasSelectedMemeberPath()) {
                this._setSelItem(itm, isAdd);
            }
            this.onSelectedItemsChanged();
        }

        // create a single item
        private _createItem(tokenTxt: any) {
            let container = document.createElement("div"),
                tSpan = document.createElement("span"),
                closeBtn = document.createElement("a");

            container.appendChild(tSpan);
            container.appendChild(closeBtn);
            container.className = 'wj-token';
            tSpan.className = 'wj-token-label';
            tSpan.innerHTML = tokenTxt;
            closeBtn.className = 'wj-token-close';
            closeBtn.href = '#';
            closeBtn.tabIndex = -1;
            closeBtn.text = '×';

            container.style.cssFloat = this.rightToLeft ? 'right' : 'left';

            this.addEventListener(container, 'click', (e) => {
                this._helperInput.focus();
                let activeToken = <HTMLElement>this._wjTpl.querySelector('.' + MultiAutoComplete._clsActive);
                if (activeToken) {
                    removeClass(activeToken, MultiAutoComplete._clsActive);
                }
                addClass(container, MultiAutoComplete._clsActive);
                e.stopPropagation();
                e.preventDefault();
            })

            this.addEventListener(closeBtn, 'click', (e) => {
                if (this.isReadOnly) {
                    return;
                }
                let idx = this._getItemIndex(container);
                if (idx > -1) {
                    let delItem = this._selItems[idx];
                    this._updateSelItems(delItem, false);
                }
                this._wjTpl.removeChild(container);
                this._adjustInputWidth();
                this._disableInput(false);
                this._tbx.focus();
                e.stopPropagation();
                e.preventDefault();
            });
            return container;
        }

        // activate the item
        private _itemOn(isPrev: boolean) {
            let ae = getActiveElement(),
                tokes, activeToken, activeTokenIdx;

            if (this._tbx == ae &&
                this._tbx.value.length !== 0) {
                return;
            }
            // get all tokens
            tokes = this._wjTpl.querySelectorAll('.wj-token');
            if (tokes.length === 0) {
                return;
            }
            // get active tokens
            activeToken = this._wjTpl.querySelector('.' + MultiAutoComplete._clsActive);
            activeTokenIdx = this._getItemIndex(activeToken);
            if (isPrev) {
                if (activeTokenIdx === 0) {
                    return;
                }
                if (activeTokenIdx === -1) { // activate last token
                    addClass(tokes[tokes.length - 1], MultiAutoComplete._clsActive);
                    this._helperInput.focus();
                } else { // active previous token
                    removeClass(activeToken, MultiAutoComplete._clsActive);
                    addClass(tokes[activeTokenIdx - 1], MultiAutoComplete._clsActive);
                    this._helperInput.focus();
                }

            } else if (!isPrev) {
                if (activeTokenIdx === -1) {
                    return;
                }
                if (activeTokenIdx !== tokes.length - 1) { // activate last token
                    removeClass(activeToken, MultiAutoComplete._clsActive);
                    addClass(tokes[activeTokenIdx + 1], MultiAutoComplete._clsActive);
                    this._helperInput.focus();
                } else { // activate input
                    removeClass(activeToken, MultiAutoComplete._clsActive);
                    this._tbx.focus();
                }
            }
        }

        // deactivate the currently active item
        private _itemOff() {
            let token = <HTMLElement>this._wjTpl.querySelector('.' + MultiAutoComplete._clsActive);
            if (token) {
                removeClass(token, MultiAutoComplete._clsActive);
            }
        }

        // initialize the selectedItems when control initializes
        private _initSeltems() {
            if (this.selectedMemberPath && this.selectedMemberPath !== '') {
                let cv = this.itemsSource;
                this._selItems.splice(0, this._selItems.length);
                if (cv) {
                    for (let i = 0; i < cv.sourceCollection.length; i++) {
                        if (this._getSelItem(i)) {
                            this._selItems.push(cv.sourceCollection[i]);
                        }
                    }
                }
            }
        }

        // get selected item
        private _getSelItem(index: number): boolean {
            let cv = this.itemsSource.sourceCollection,
                item = cv[index];
            if (isObject(item) && this.selectedMemberPath) {
                return this._selPath.getValue(item);
            }
            return false;
        }

        // set selected item
        private _setSelItem(item: any, selected: boolean) {
            let cv = this.itemsSource;
            if (isObject(item)) {
                if (this._selPath.getValue(item) != selected) {
                    this._selPath.setValue(item, selected);
                    //cv.refresh();
                }
            }
        }

        // clear the selected index
        private _clearSelIndex() {
            this.selectedIndex = -1;
        }

        // check the SelectedMemeberPath
        private _hasSelectedMemeberPath(): boolean {
            return this.selectedMemberPath && this.selectedMemberPath !== '';
        }

        // disable the input field
        private _disableInput(disabled: boolean) {
            if (this._maxtems != null) {
                if (this._selItems.length < this._maxtems) {
                    this._tbx.disabled = false;
                    this._tbx.focus();
                } else {
                    this._tbx.disabled = true;
                    this.hostElement.focus();
                }
            }
        }

        // adjust the input width
        private _adjustInputWidth() {
            // first set the input width to min width
            this._tbx.style.width = '60px';

            let width,
                offsetHost = getElementRect(this.hostElement),
                offsetInput = getElementRect(this._tbx),
                inputCss = getComputedStyle(this._tbx),
                inputPaddingLeft = parseInt(inputCss.paddingLeft, 10),
                inputPaddingRight = parseInt(inputCss.paddingRight, 10);

            if (this.rightToLeft) {
                width = offsetInput.left + offsetInput.width - offsetHost.left -
                    inputPaddingLeft - inputPaddingRight - 8;                
            } else {
                 width = offsetHost.left + offsetHost.width - offsetInput.left -
                    inputPaddingLeft - inputPaddingRight - 8;            
            }     
            this._tbx.style.width = width + 'px';       
        }

        // get the index of an item
        private _getItemIndex(token: Element) {
            let items = this.hostElement.querySelectorAll('.wj-token');
            for (let i = 0; i < items.length; i++) {
                if (token === items[i]) {
                    return i;
                }
            }
            return -1;
        }
    }
}

module wijmo.input {
    'use strict';

    /**
     * Specifies actions that trigger showing and hiding @see:Popup controls.
     */
    export enum PopupTrigger {
        /** No triggers; popups must be shown and hidden using code. */
        None = 0,
        /** Show or hide the popup when the owner element is clicked. */
        Click = 1,
        /** Hide the popup when it loses focus. */
        Blur = 2,
        /** Show or hide the popup when the owner element is clicked, hide when it loses focus. */
        ClickOrBlur = Click | Blur
    }

    /**
     * Class that shows an element as a popup.
     *
     * Popups may be have @see:owner elements, in which case they behave
     * as rich tooltips that may be shown or hidden based on actions
     * specified by the @see:Popup.showTrigger and @see:Popup.hideTrigger
     * properties.
     *
     * Popups with no owner elements behave like dialogs. They are centered
     * on the screen and displayed using the @see:show method.
     *
     * To close a @see:Popup, call the @see:Popup.hide method.
     *
     * Alternatively, any clickable elements within a @see:Popup that have
     * the classes starting with the 'wj-hide' string will hide the @see:Popup
     * when clicked and will set the @see:Popup.dialogResult property to the
     * class name so the caller may take appropriate action.
     *
     * For example, the @see:Popup below will be hidden when the user presses
     * the OK or Cancel buttons, and the @see:Popup.dialogResult property will
     * be set to either 'wj-hide-cancel' or 'wj-hide-ok':
     *
     * <pre>&lt;button id="btnPopup"&gt;Show Popup&lt;/button&gt;
     * &lt;wj-popup owner="#btnPopup" style="padding:12px"&gt;
     *   &lt;p&gt;Press one of the buttons below to hide the Popup.&lt;/p&gt;
     *   &lt;hr/&gt;
     *   &lt;button class="wj-hide-ok" ng-click="handleOK()"&gt;OK&lt;/button&gt;
     *   &lt;button class="wj-hide-cancel"&gt;Cancel&lt;/button&gt;
     * &lt;/wj-popup&gt;</pre>
     */
    export class Popup extends Control {
        _owner: HTMLElement;
        _modal: boolean;
        _showTrigger = PopupTrigger.Click;
        _hideTrigger = PopupTrigger.Blur;
        _hideAnim: any;
        _fadeIn = true;
        _fadeOut = true;
        _removeOnHide = true;
        _click = this._handleClick.bind(this);
        _mousedown = this._handleMouseDown.bind(this);
        _bkdrop: HTMLDivElement;
        _result: any;
        _resultEnter: any;
        _callback: Function;
        _refreshing: boolean;   // to avoid re-entrant calls to refresh
        _visible = false;       // to report correctly while fading out
        _wasVisible: boolean;   // to avoid hiding and showing again on clicks
        _composing: boolean;    // to avoid closing while composing IME chars

        /**
         * Initializes a new instance of the @see:Popup class.
         *
         * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any) {
            super(element, null, true);
            let host = this.hostElement;

            // add classes
            addClass(host, 'wj-control wj-content wj-popup');

            // ensure the host element can get the focus (TFS 199312)
            if (!host.getAttribute('tabindex')) {
                host.tabIndex = 0;
            }

            // start hidden
            hidePopup(host, false);

            // keep track of IME composition status
            this.addEventListener(host, 'compositionstart', (e: Event) => {
                this._composing = true;
            })
            this.addEventListener(host, 'compositionend', (e: Event) => {
                this._composing = false;
            })

            // hide Popup when user presses Escape or Enter keys
            this.addEventListener(host, 'keydown', (e: KeyboardEvent) => {
                if (!e.defaultPrevented) {

                    // Escape: hide the popup with no dialogResult
                    // (if not composing: TFS 286794)
                    if (e.keyCode == Key.Escape && !this._composing) {
                        e.preventDefault();
                        this.hide();
                    }

                    // Enter: hide the popup and provide a dialogResult
                    if (e.keyCode == Key.Enter) {
                        let result = this.dialogResultEnter;
                        if (result) {
                            e.preventDefault();
                            this._validateAndHide(result);
                        }
                    }

                    // Tab: keep focus within modal popups (TFS 148651)
                    if (e.keyCode == Key.Tab && this.modal) {
                        e.preventDefault();
                        moveFocus(host, e.shiftKey ? -1 : +1);
                    }
                }
            });

            // hide Popup when user clicks an element with the 'wj-hide' class
            this.addEventListener(host, 'click', (e: MouseEvent) => {
                if (e.target instanceof HTMLElement) {
                    let target = e.target as HTMLElement,
                        match = target.className.match(/\bwj-hide[\S]*\b/);
                    if (match && match.length > 0) {
                        e.preventDefault(); // cancel any navigation
                        e.stopPropagation();
                        this.hide(match[0]); // hide and pass the attribute as the dialogResult
                    }
                }
            });

            // limit wheel propagation while modals are open
            this.addEventListener(document, 'wheel', (e: MouseWheelEvent) => {
                if (this.isVisible && this._modal) {
                    for (let t = e.target as HTMLElement; t && t != document.body; t = t.parentElement) {
                        if (t.scrollHeight > t.clientHeight) {
                            return;
                        }
                    }
                    e.preventDefault();
                    e.stopPropagation();
                }
            });

            // apply options after control is fully initialized
            this.initialize(options);
        }

        // ** object model

        /**
         * Gets or sets the element that owns this @see:Popup.
         *
         * If the @see:owner is null, the @see:Popup behaves like a dialog.
         * It is centered on the screen and must be shown using the 
         * @see:show method.
         */
        get owner(): HTMLElement {
            return this._owner;
        }
        set owner(value: HTMLElement) {

            // disconnect previous owner
            if (this._owner) {
                this.removeEventListener(this._owner, 'mousedown');
                this.removeEventListener(this._owner, 'click');
            }

            // set new owner
            this._owner = value != null ? getElement(value) : null;

            // connect new owner
            if (this._owner) {
                this.addEventListener(this._owner, 'mousedown', this._mousedown, true);
                this.addEventListener(this._owner, 'click', this._click, true);
            }
        }
        /**
         * Gets or sets the HTML element contained in this @see:Popup.
         */
        get content(): HTMLElement {
            return this.hostElement.firstElementChild as HTMLElement;
        }
        set content(value: HTMLElement) {
            if (value != this.content) {
                this.hostElement.innerHTML = '';
                if (value instanceof HTMLElement) {
                    this.hostElement.appendChild(value);
                }
            }
        }
        /**
         * Gets or sets the actions that show the @see:Popup.
         *
         * By default, the @see:showTrigger property is set to @see:PopupTrigger.Click,
         * which causes the popup to appear when the user clicks the owner element.
         * 
         * If you set the @see:showTrigger property to @see:PopupTrigger.None, the popup
         * will be shown only when the @see:show method is called.
         */
        get showTrigger(): PopupTrigger {
            return this._showTrigger;
        }
        set showTrigger(value: PopupTrigger) {
            this._showTrigger = asEnum(value, PopupTrigger);
        }
        /**
         * Gets or sets the actions that hide the @see:Popup.
         *
         * By default, the @see:hideTrigger property is set to @see:PopupTrigger.Blur,
         * which hides the popup when it loses focus.
         *
         * If you set the @see:hideTrigger property to @see:PopupTrigger.Click, the popup
         * will be hidden only when the owner element is clicked.
         *
         * If you set the @see:hideTrigger property to @see:PopupTrigger.None, the popup
         * will be hidden only when the @see:hide method is called.
         */
        get hideTrigger(): PopupTrigger {
            return this._hideTrigger;
        }
        set hideTrigger(value: PopupTrigger) {
            this._hideTrigger = asEnum(value, PopupTrigger);
        }
        /**
         * Gets or sets a value that determines whether the @see:Popup should
         * use a fade-out animation when it is shown.
         */
        get fadeIn(): boolean {
            return this._fadeIn;
        }
        set fadeIn(value: boolean) {
            this._fadeIn = asBoolean(value);
        }
        /**
         * Gets or sets a value that determines whether the @see:Popup should
         * use a fade-out animation when it is hidden.
         */
        get fadeOut(): boolean {
            return this._fadeOut;
        }
        set fadeOut(value: boolean) {
            this._fadeOut = asBoolean(value);
        }
        /**
         * Gets or sets a value that determines whether the @see:Popup element
         * should be removed from the DOM when the @see:Popup is hidden, as
         * opposed to being hidden.
         *
         * This property is set to true by default.
         */
        get removeOnHide(): boolean {
            return this._removeOnHide;
        }
        set removeOnHide(value: boolean) {
            this._removeOnHide = asBoolean(value);
        }
        /**
         * Gets or sets a value that determines whether the @see:Popup should
         * be displayed as a modal dialog.
         *
         * Modal dialogs show a dark backdrop that makes the @see:Popup stand
         * out from other content on the page.
         *
         * If you want to make a dialog truly modal, also set the @see:Popup.hideTrigger
         * property to @see:PopupTrigger.None, so users won't be able to click the
         * backdrop to dismiss the dialog. In this case, the dialog will close only
         * if the @see:Popup.hide method is called or if the user presses the Escape
         * key.
         */
        get modal(): boolean {
            return this._modal;
        }
        set modal(value: boolean) {
            this._modal = asBoolean(value);
        }
        /**
         * Gets or sets a value that can be used for handling the content of the @see:Popup
         * after it is hidden.
         *
         * This property is set to null when the @see:Popup is displayed, and it can be
         * set in response to button click events or in the call to the @see:hide method.
         */
        get dialogResult(): any {
            return this._result;
        }
        set dialogResult(value: any) {
            this._result = value;
        }
        /**
         * Gets or sets a value to be used as a @see:dialogResult when the user presses
         * the Enter key while the @see:Popup is visible.
         *
         * If the user presses Enter and the @see:dialogResultEnter property is not null,
         * the popup checks whether all its child elements are in a valid state.
         * If so, the popup is closed and the @see:dialogResult property is set to
         * the value of the @see:dialogResultEnter property.
         */
        get dialogResultEnter(): any {
            return this._resultEnter;
        }
        set dialogResultEnter(value: any) {
            this._resultEnter = value;
        }
        /**
         * Gets a value that determines whether the @see:Popup is currently visible.
         */
        get isVisible(): boolean {
            let host = this.hostElement;
            return this._visible && host != null && host.offsetHeight > 0;
            //return this._visible && host && host.parentElement && host.style.display != 'none';
        }
        /**
         * Shows the @see:Popup.
         *
         * @param modal Whether to show the popup as a modal dialog. If provided, this 
         * sets the value of the @see:modal property.
         * @param handleResult Callback invoked when the popup is hidden. If provided,
         * this should be a function that receives the popup as a parameter.
         *
         * The <b>handleResult</b> callback allows callers to handle the result of modal
         * dialogs without attaching handlers to the @see:hidden event. For example,
         * the code below shows a dialog used to edit the current item in a
         * @see:CollectionView. The edits are committed or canceled depending on the
         * @see:Popup.dialogResult value. For example:
         *
         * <pre>$scope.editCurrentItem = function () {
         *   $scope.data.editItem($scope.data.currentItem);
         *   $scope.itemEditor.show(true, function (e) {
         *     if (e.dialogResult == 'wj-hide-ok') {
         *       $scope.data.commitEdit();
         *     } else {
         *       $scope.data.cancelEdit();
         *     }
         *   });
         * }</pre>
         */
        show(modal?: boolean, handleResult?: Function) {
            if (!this.isVisible) {
                let host = this.hostElement;

                // reset dialog result/callback
                this.dialogResult = null;
                this._callback = null;

                // suspend any pending hide animations (TFS 294608)
                if (this._hideAnim) {
                    clearInterval(this._hideAnim);
                    this._hideAnim = null;
                }

                // get the focus when the window gets the focus (TFS 267199)
                if (modal) {
                    this.addEventListener(window, 'focus', () => {
                        if (!this.containsFocus()) {
                            moveFocus(host, 0);
                        }
                    });
                }

                // raise the event
                let e = new CancelEventArgs();
                if (this.onShowing(e)) {

                    // honor parameters
                    if (modal != null) {
                        this.modal = asBoolean(modal);
                    }
                    if (handleResult != null) {
                        this._callback = asFunction(handleResult);
                    }

                    // show the popup using a rectangle as reference (to avoid copying styles)
                    let ref = this._owner ? this._owner.getBoundingClientRect() : null;
                    showPopup(host, ref, false, this._fadeIn);

                    // show modal backdrop behind the popup
                    if (this._modal) {
                        this._showBackdrop();
                    }

                    // raise shown event
                    this._composing = false;
                    this._visible = true;
                    this.onShown(e);

                    // move focus to the popup
                    setTimeout(() => {

                        // if this is not a touch event, set the focus to the 'autofocus' element 
                        // or to the first focusable element on the popup
                        if (!this.isTouching) {
                            let el = host.querySelector('input[autofocus]') as HTMLInputElement;
                            if (el && el.clientHeight > 0 && // ignore disabled, unfocusable, hidden
                                !el.disabled && el.tabIndex > -1 && 
                                !closest(el, '[disabled],.wj-state-disabled')) {
                                el.focus();
                                el.select(); // TFS 190336
                            } else {
                                moveFocus(host, 0);
                            }
                        }

                        // make sure the popup has the focus (no input elements/touch: TFS 143114)
                        if (!this.containsFocus()) {
                            host.tabIndex = 0;
                            host.focus();
                        }

                    }, 200);
                }
            }
        }
        /**
         * Hides the @see:Popup.
         * @param dialogResult Optional value assigned to the @see:dialogResult property
         * before closing the @see:Popup.
         */
        hide(dialogResult?: any) {
            if (this.isVisible) {
                if (!isUndefined(dialogResult)) {
                    this.dialogResult = dialogResult;
                }
                let e = new CancelEventArgs();
                if (this.onHiding(e)) {

                    // close any open drop-downs (just in case, TFS 152950)
                    let ddh = this.hostElement.querySelectorAll('.wj-control.wj-dropdown');
                    for (let i = 0; i < ddh.length; i++) {
                        let dd = Control.getControl(ddh[i]);
                        if (dd instanceof DropDown) {
                            dd.isDroppedDown = false;
                        }
                    }

                    // hide the popup
                    if (this._modal) {
                        hidePopup(this._bkdrop, this.removeOnHide, this.fadeOut);
                    }
                    this._hideAnim = hidePopup(this.hostElement, this.removeOnHide, this.fadeOut);
                    this._visible = false;

                    // clean up/update state (TFS 269434)
                    this.removeEventListener(window, 'focus');
                    if (this.containsFocus()) {
                        (document.activeElement as HTMLElement).blur();
                    }
                    setTimeout(() => {
                        this._updateState();
                        this.onHidden(e);
                        if (this._callback) {
                            this._callback(this);
                        }
                    });
                }
            }
        }
        /**
         * Occurs before the @see:Popup is shown.
         */
        readonly showing = new Event();
        /**
         * Raises the @see:showing event.
         */
        onShowing(e: CancelEventArgs): boolean {
            this.showing.raise(this, e);
            return !e.cancel;
        }
        /**
         * Occurs after the @see:Popup has been shown.
         */
        readonly shown = new Event();
        /**
         * Raises the @see:shown event.
         */
        onShown(e?: EventArgs) {
            this.shown.raise(this, e);
        }
        /**
         * Occurs before the @see:Popup is hidden.
         */
        readonly hiding = new Event();
        /**
         * Raises the @see:hiding event.
         */
        onHiding(e: CancelEventArgs): boolean {
            this.hiding.raise(this, e);
            return !e.cancel;
        }
        /**
         * Occurs after the @see:Popup has been hidden.
         */
        readonly hidden = new Event();
        /**
         * Raises the @see:hidden event.
         */
        onHidden(e?: EventArgs) {
            this.hidden.raise(this, e);
        }

        // ** overrides

        // release owner when disposing
        dispose() {
            this._owner = null;
            super.dispose();
        }

        // hide popup when popup loses focus
        onLostFocus(e?: EventArgs) {
            if (this.isVisible && (this._hideTrigger & PopupTrigger.Blur)) {
                if (!this.containsFocus()) {
                    this.hide();
                }
            }
            super.onLostFocus(e);
        }

        // reposition Popup when refreshing
        refresh(fullUpdate = true) {
            super.refresh(fullUpdate);
            if (this.isVisible && !this._refreshing) {
                this._refreshing = true;
                let ae = getActiveElement(),
                    ref = this._owner ? this._owner.getBoundingClientRect() : null;
                showPopup(this.hostElement, ref);
                if (this._modal && ae instanceof HTMLElement && ae != getActiveElement()) {
                    ae.focus();
                }
                this._refreshing = false;
            }
        }

        // ** implementation

        // reposition Popup when window size changes
        protected _handleResize() {
            if (this.isVisible) {
                this.refresh();
            }
        }

        // toggle Popup when user clicks the owner element
        protected _handleClick(e) {
            if (this.isVisible) {
                if (this._hideTrigger & PopupTrigger.Click) {
                    this.hide();
                }
            } else {
                if (this._showTrigger & PopupTrigger.Click) {
                    // don't show while fading out (in this case, visible is false 
                    // but host element is still visible on the page)
                    if (!this._wasVisible) {
                        this.show();
                    }
                }
            }
        }

        // remember visible state on mouse down to avoid hiding and showing again on click
        // (mousedown loses focus, hides, mouseup triggers click, shows again)
        protected _handleMouseDown(e) {
            this._wasVisible = this.isVisible;
        }

        // show/hide modal popup backdrop
        private _showBackdrop() {
            if (!this._bkdrop) {

                // create backdrop element
                this._bkdrop = document.createElement('div');
                this._bkdrop.tabIndex = -1;
                addClass(this._bkdrop, 'wj-popup-backdrop');

                // background is not clickable
                this.addEventListener(this._bkdrop, 'mousedown', (e: MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.hostElement.focus(); // close any open menus/popups TFS 152950
                    if (this.hideTrigger & PopupTrigger.Blur) {
                        this.hide(); // hide if trigger has blur: TFS 245415, 245953
                    }
                });
            }
            this._bkdrop.style.display = '';

            // insert background behind the popup (TFS 205400)
            let host = this.hostElement;
            host.parentElement.insertBefore(this._bkdrop, host);
        }

        // validate the dialog and hide it if there are no errors
        private _validateAndHide(result: any) {
            let invalid = this.hostElement.querySelector(':invalid') as HTMLElement;
            if (invalid) {
                invalid.focus(); // focus to invalid field
            } else {
                this.hide(result); // no errors
            }
        }
    }
}

module wijmo.input {
    'use strict';

    /**
     * The @see:InputDate control allows users to type in dates using any format 
     * supported by the @see:Globalize class, or to pick dates from a drop-down box
     * that shows a @see:Calendar control.
     *
     * Use the @see:min and @see:max properties to restrict the range of 
     * values that the user can enter.
     * 
     * For details about using the @see:min and @see:max properties, please see the 
     * <a href="static/minMax.html">Using the min and max properties</a> topic.
     *
     * Use the @see:value property to gets or set the currently selected date.
     *
     * The example below shows a <b>Date</b> value (that includes date and time information)
     * using an @see:InputDate and an an @see:InputTime control. Notice how both controls
     * are bound to the same controller variable, and each edits the appropriate information
     * (either date or time). The example also shows a @see:Calendar control that you can 
     * use to select the date with a single click.
     *
     * @fiddle:vgc3Y
     */
    export class InputDate extends DropDown {

        // child control
        _calendar: Calendar;

        // property storage
        _value: Date;
        _format = 'd';
        _calChanged: boolean;
        _msk: _MaskProvider;

        // private stuff

        /**
         * Initializes a new instance of the @see:InputDate class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);
            addClass(this.hostElement, 'wj-inputdate');

            // initialize mask provider
            this._msk = new _MaskProvider(this._tbx);

            // default to numeric keyboard (like InputNumber), unless this is IE9...
            if (!isIE9()) {
                this._tbx.type = 'tel';
            }

            // use wheel to increase/decrease the date
            this.addEventListener(this.hostElement, 'wheel', (e: WheelEvent) => {
                if (!e.defaultPrevented && !this.isDroppedDown && this.containsFocus()) {
                    if (this.value != null && this._canChangeValue()) {
                        let step = clamp(-e.deltaY, -1, +1);
                        this.value = this.selectionMode == DateSelectionMode.Month
                            ? DateTime.addMonths(this.value, step)
                            : DateTime.addDays(this.value, step);
                        this.selectAll();
                        e.preventDefault();
                    }
                }
            });

            // initialize value (current date) TFS 193848
            this.value = DateTime.newDate();

            // initializing from <input> tag
            if (this._orgTag == 'INPUT') {
                let value = this._tbx.getAttribute('value');
                if (value) {
                    this.value = Globalize.parseDate(value, 'yyyy-MM-dd');
                }
            }

            // initialize control options
            this.isRequired = true;
            this.initialize(options);
        }

        //--------------------------------------------------------------------------
        //#region ** object model

        /**
         * Gets or sets the current date.
         */
        get value(): Date {
            return this._value;
        }
        set value(value: Date) {
            if (DateTime.equals(this._value, value)) {
                this._tbx.value = Globalize.format(value, this.format);
            } else {

                // check type
                value = asDate(value, !this.isRequired || (value == null && this._value == null));

                // honor min/max range
                // REVIEW: should not clamp this...
                value = this._clamp(value);

                // update control text and value
                if (this._isValidDate(value)) {
                    this._tbx.value = value ? Globalize.format(value, this.format) : '';
                    if (value != this._value && !DateTime.equals(this._value, value)) {
                        this._value = value;
                        this.onValueChanged();
                    }
                } else {
                    this._tbx.value = value ? Globalize.format(this.value, this.format) : '';
                }

                // raise textChanged event
                if (this.text != this._oldText) {
                    this._oldText = this.text; // TFS 228044
                    this.onTextChanged();
                }
            }
        }
        /**
         * Gets or sets the text shown on the control.
         */
        get text(): string {
            return this._tbx.value;
        }
        set text(value: string) {
            if (value != this.text) {
                this._setText(value, true);
                this._commitText();
            }
        }
        /**
         * Gets or sets a value that indicates whether users can select
         * days, months, or no values at all.
         *
         * This property affects the behavior of the drop-down calendar,
         * but not the format used to display dates.
         * If you set @see:selectionMode to 'Month', you should normally
         * set the @see:format property to 'MMM yyyy' or some format that
         * does not include the day. For example:
         *
         * <pre>var inputDate = new wijmo.input.InputDate('#el, {
         *   selectionMode: 'Month',
         *   format: 'MMM yyyy'
         * });</pre>
         */
        get selectionMode(): DateSelectionMode {
            return this.calendar.selectionMode;
        }
        set selectionMode(value: DateSelectionMode) {
            this.calendar.selectionMode = value;
        }
        /**
         * Gets or sets the earliest date that the user can enter.
         * 
         * For details about using the @see:min and @see:max properties, please see the 
         * <a href="static/minMax.html">Using the min and max properties</a> topic.
         */
        get min(): Date {
            return this._calendar.min;
        }
        set min(value: Date) {
            this._calendar.min = asDate(value, true);
        }
        /**
         * Gets or sets the latest date that the user can enter.
         * 
         * For details about using the @see:min and @see:max properties, please see the 
         * <a href="static/minMax.html">Using the min and max properties</a> topic.
         */
        get max(): Date {
            return this._calendar.max;
        }
        set max(value: Date) {
            this._calendar.max = asDate(value, true);
        }
        /**
         * Gets or sets the format used to display the selected date.
         *
         * The format string is expressed as a .NET-style 
         * <a href="http://msdn.microsoft.com/en-us/library/8kb3ddd4(v=vs.110).aspx" target="_blank">
         * Date format string</a>.
         */
        get format(): string {
            return this._format;
        }
        set format(value: string) {
            if (value != this.format) {
                this._format = asString(value);
                this._tbx.value = Globalize.format(this.value, this.format);
            }
        }
        /**
         * Gets or sets a mask to use while editing.
         *
         * The mask format is the same one that the @see:wijmo.input.InputMask
         * control uses.
         *
         * If specified, the mask must be compatible with the value of
         * the @see:format property. For example, the mask '99/99/9999' can 
         * be used for entering dates formatted as 'MM/dd/yyyy'.
         */
        get mask(): string {
            return this._msk.mask;
        }
        set mask(value: string) {
            this._msk.mask = asString(value);
        }
        /**
         * Gets a reference to the @see:Calendar control shown in the drop-down box.
         */
        get calendar() : Calendar {
            return this._calendar;
        }
        /**
         * Gets the HTML input element hosted by the control.
         *
         * Use this property in situations where you want to customize the
         * attributes of the input element.
         */
        get inputElement(): HTMLInputElement {
            return this._tbx;
        }
        /**
         * Gets or sets the "type" attribute of the HTML input element hosted by the control.
         *
         * By default, this property is set to "tel", a value that causes mobile devices to
         * show a numeric keypad that includes a negative sign and a decimal separator.
         *
         * Use this property to change the default setting if the default does not work well
         * for the current culture, device, or application. In those cases, try changing
         * the value to "number" or "text."
         *
         * Note that input elements with type "number" prevent selection in Chrome and therefore
         * is not recommended. For more details, see this link:
         * http://stackoverflow.com/questions/21177489/selectionstart-selectionend-on-input-type-number-no-longer-allowed-in-chrome
         */
        get inputType(): string {
            return this._tbx.type;
        }
        set inputType(value: string) {
            this._tbx.type = asString(value);
        }
        /**
         * Gets or sets a validator function to determine whether dates are valid for selection.
         *
         * If specified, the validator function should take one parameter representing the
         * date to be tested, and should return false if the date is invalid and should not 
         * be selectable.
         *
         * For example, the code below prevents users from selecting dates that fall on
         * weekends:
         * <pre>
         * inputDate.itemValidator = function(date) {
         *   var weekday = date.getDay();
         *   return weekday != 0 && weekday != 6;
         * }
         * </pre>
         */
        get itemValidator(): Function {
            return this._calendar.itemValidator;
        }
        set itemValidator(value: Function) {
            if (value != this.itemValidator) {
                this._calendar.itemValidator = asFunction(value);
                this.invalidate();
            }
        }
        /**
         * Gets or sets a formatter function to customize dates in the drop-down calendar.
         *
         * The formatter function can add any content to any date. It allows 
         * complete customization of the appearance and behavior of the calendar.
         *
         * If specified, the function takes two parameters: 
         * <ul>
         *     <li>the date being formatted </li>
         *     <li>the HTML element that represents the date</li>
         * </ul>
         *
         * For example, the code below shows weekends with a yellow background:
         * <pre>
         * inputDate.itemFormatter = function(date, element) {
         *   var day = date.getDay();
         *   element.style.backgroundColor = day == 0 || day == 6 ? 'yellow' : '';
         * }
         * </pre>
         */
        get itemFormatter(): Function {
            return this.calendar.itemFormatter;
        }
        set itemFormatter(value: Function) {
            if (value != this.itemFormatter) {
                this.calendar.itemFormatter = asFunction(value);
            }
        }
        /**
         * Occurs when the value of the @see:value property changes, either
         * as a result of user actions or by assignment in code.
         */
        readonly valueChanged = new Event();
        /**
         * Raises the @see:valueChanged event.
         */
        onValueChanged(e?: EventArgs) {
            this.valueChanged.raise(this, e);
        }

        //#endregion ** object model

        //--------------------------------------------------------------------------
        //#region ** overrides

        // update value display in case culture changed
        refresh() {
            this.isDroppedDown = false;
            if (this._msk) {
                this._msk.refresh();
            }
            if (this._calendar) {
                this._calendar.refresh();
            }
            this._tbx.value = Globalize.format(this.value, this.format);
        }

        // overridden to update calendar when dropping down
        onIsDroppedDownChanged(e?: EventArgs) {
            super.onIsDroppedDownChanged(e);
            if (this.isDroppedDown) {
                this._calChanged = false;
                this.dropDown.focus();
            }
        }

        // create the drop-down element
        protected _createDropDown() {

            // create the drop-down element
            this._calendar = new Calendar(this._dropDown);
            this._dropDown.tabIndex = -1;

            // update our value to match calendar's
            this._calendar.valueChanged.addHandler(() => {
                this.value = DateTime.fromDateTime(this._calendar.value, this.value);
                this._calChanged = true; // remember change to close drop-down on click
            });

            // close the drop-down when the user changes the date with the mouse
            // the 'click' event may not be triggered on iOS Safari if focus change
            // happens during previous tap, so use 'mouseup' instead.
            //this.addEventListener(this._dropDown, 'click', () => {
            this.addEventListener(this._dropDown, 'mouseup', (e) => {
                if (this._calChanged && !closest(e.target, '.wj-calendar-header')) { // TFS 205928, 220972
                    this.isDroppedDown = false;
                } else {
                    if (e.target.getAttribute('wj-part') == 'btn-today') { // today button
                        this.isDroppedDown = false;
                    }
                }
            });
        }

        // update drop down content and position before showing it
        protected _updateDropDown() {

            // update value
            this._commitText();

            // update selected date, range
            let cal = this._calendar;
            cal.value = this.value;
            cal.min = this.min;
            cal.max = this.max;

            // update view
            if (this.selectionMode != DateSelectionMode.Month) {
                cal.monthView = true;
            }

            // update size
            let cs = getComputedStyle(this.hostElement);
            this._dropDown.style.minWidth = parseFloat(cs.fontSize) * 18 + 'px';
            this._calendar.refresh(); // update layout/size now

            // let base class update position
            super._updateDropDown();
        }

        // override to commit text on Enter and cancel on Escape
        protected _keydown(e: KeyboardEvent) {
            if (!e.defaultPrevented && !e.altKey && !e.ctrlKey && !e.metaKey) { // TFS 199387
                switch (e.keyCode) {
                    case Key.Enter:
                        this._commitText();
                        this.selectAll();
                        break;
                    case Key.Escape:
                        this.text = Globalize.format(this.value, this.format);
                        this.selectAll();
                        break;
                    case Key.Up:
                    case Key.Down:
                        if (!this.isDroppedDown && this.value && this._canChangeValue()) {
                            let step = e.keyCode == Key.Up ? +1 : -1,
                                value = this.selectionMode == DateSelectionMode.Month
                                    ? DateTime.addMonths(this.value, step)
                                    : DateTime.addDays(this.value, step);
                            this.value = DateTime.fromDateTime(value, this.value); // set date, keep time
                            this.selectAll();
                            e.preventDefault();
                        }
                        break;
                }
            }
            super._keydown(e);
        }

        //#endregion ** overrides

        //--------------------------------------------------------------------------
        //#region ** implementation

        // checks whether the control can change the current value
        private _canChangeValue(): boolean {
            return !this.isReadOnly && this.selectionMode != DateSelectionMode.None;
        }

        // honor min/max range
        protected _clamp(value: Date): Date {
            return this.calendar._clamp(value);
        }

        // parse date, commit date part (no time) if successful or revert
        protected _commitText() {
            let txt = this._tbx.value;
            if (!txt && !this.isRequired) {
                this.value = null;
            } else {
                let dt = Globalize.parseDate(txt, this.format);
                if (dt) {
                    this.value = DateTime.fromDateTime(dt, this.value);
                } else {
                    this._tbx.value = Globalize.format(this.value, this.format);
                }
            }
        }

        // check whether a date should be selectable by the user
        private _isValidDate(value: Date): boolean {
            if (value) {
                if (this._clamp(value) != value) { // check range
                    return false;
                }
                if (this.itemValidator && !this.itemValidator(value)) { // check validity
                    return false;
                }
            }
            return true;
        }

       //#endregion ** implementation
    }
}
module wijmo.input {
    'use strict';

    /**
     * The @see:InputTime control allows users to enter times using any format 
     * supported by the @see:Globalize class, or to pick times from a drop-down 
     * list.
     *
     * The @see:min, @see:max, and @see:step properties determine the values shown 
     * in the list.
     *
     * For details about using the @see:min and @see:max properties, please see the 
     * <a href="static/minMax.html">Using the min and max properties</a> topic.
     *
     * The @see:value property gets or sets a @see:Date object that represents the time 
     * selected by the user.
     *
     * The example below shows a <b>Date</b> value (that includes date and time information)
     * using an @see:InputDate and an @see:InputTime control. Notice how both controls
     * are bound to the same controller variable, and each edits the appropriate information
     * (either date or time). The example also shows a @see:Calendar control that can be
     * used to select the date with a single click.
     *
     * @fiddle:vgc3Y
     */
    export class InputTime extends ComboBox {

        // property storage
        _value: Date;
        _min: Date;
        _max: Date;
        _step: number;
        _format = 't';
        _msk: _MaskProvider;

        // private stuff
        _hasCustomItems: boolean;

        /**
         * Initializes a new instance of the @see:InputTime class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);
            addClass(this.hostElement, 'wj-inputtime');

            // initialize value (current date)
            this._value = DateTime.newDate();

            // initialize mask provider
            this._msk = new _MaskProvider(this._tbx);

            // default to numeric keyboard (like InputNumber), unless this is IE9...
            if (!isIE9()) {
                this._tbx.type = 'tel';
            }

            // initializing from <input> tag
            if (this._orgTag == 'INPUT') {
                let value = this._tbx.getAttribute('value');
                if (value) {
                    this.value = Globalize.parseDate(value, 'HH:mm:ss');
                }
            }

            // friendly defaults
            this.step = 15;
            this.autoExpandSelection = true;

            // initialize control options
            this.initialize(options);
        }

        //--------------------------------------------------------------------------
        //#region ** object model

        /**
         * Gets the HTML input element hosted by the control.
         *
         * Use this property in situations where you want to customize the
         * attributes of the input element.
         */
        get inputElement(): HTMLInputElement {
            return this._tbx;
        }
        /**
         * Gets or sets the "type" attribute of the HTML input element hosted by the control.
         *
         * By default, this property is set to "tel", a value that causes mobile devices to
         * show a numeric keypad that includes a negative sign and a decimal separator.
         *
         * Use this property to change the default setting if the default does not work well
         * for the current culture, device, or application. In those cases, try changing
         * the value to "number" or "text."
         *
         * Note that input elements with type "number" prevent selection in Chrome and therefore
         * is not recommended. For more details, see this link:
         * http://stackoverflow.com/questions/21177489/selectionstart-selectionend-on-input-type-number-no-longer-allowed-in-chrome
         */
        get inputType(): string {
            return this._tbx.type;
        }
        set inputType(value: string) {
            this._tbx.type = asString(value);
        }
        /**
         * Gets or sets the current input time.
         */
        get value(): Date {
            return this._value;
        }
        set value(value: Date) {

            // check type
            value = asDate(value, !this.isRequired);

            // honor ranges (but keep the dates)
            if (value) {
                if (this._min != null && this._getTime(value) < this._getTime(this._min)) {
                    value = DateTime.fromDateTime(value, this._min);
                }
                if (this._max != null && this._getTime(value) > this._getTime(this._max)) {
                    value = DateTime.fromDateTime(value, this._max);
                }
            }

            // update control
            this._setText(value ? Globalize.format(value, this.format) : '', true);
            if (value != this._value && !DateTime.equals(value, this._value)) {
                this._value = value;
                this.onValueChanged();
            }
        }
        /**
         * Gets or sets the text shown in the control.
         */
        get text(): string {
            return this._tbx.value;
        }
        set text(value: string) {
            if (value != this.text) {
                this._setText(value, true);
                this._commitText();
            }
        }
        /**
         * Gets or sets the earliest time that the user can enter. 
         * 
         * For details about using the @see:min and @see:max properties, please see the 
         * <a href="static/minMax.html">Using the min and max properties</a> topic.
         */
        get min(): Date {
            return this._min;
        }
        set min(value: Date) {
            this._min = asDate(value, true);
            this.isDroppedDown = false;
            this._updateItems();
        }
        /**
         * Gets or sets the latest time that the user can enter.
         * 
         * For details about using the @see:min and @see:max properties, please see the 
         * <a href="static/minMax.html">Using the min and max properties</a> topic.
         */
        get max(): Date {
            return this._max;
        }
        set max(value: Date) {
            this._max = asDate(value, true);
            this.isDroppedDown = false;
            this._updateItems();
        }
        /**
         * Gets or sets the number of minutes between entries in the drop-down list.
         *
         * The default value for this property is 15 minutes. 
         * Setting it to null, zero, or any negative value disables the drop-down.
         */
        get step(): number {
            return this._step;
        }
        set step(value: number) {
            this._step = asNumber(value, true);
            this.isDroppedDown = false;
            this._updateItems();
        }
        /**
         * Gets or sets the format used to display the selected time (see @see:Globalize).
         *
         * The format string is expressed as a .NET-style 
         * <a href="http://msdn.microsoft.com/en-us/library/8kb3ddd4(v=vs.110).aspx" target="_blank">
         * time format string</a>.
         */
        get format(): string {
            return this._format;
        }
        set format(value: string) {
            if (value != this.format) {
                this._format = asString(value);
                this._tbx.value = Globalize.format(this.value, this.format);
                if (hasItems(this.collectionView)) {
                    this._updateItems();
                }
            }
        }
        /**
         * Gets or sets a mask to use while the user is editing.
         *
         * The mask format is the same used by the @see:wijmo.input.InputMask
         * control.
         *
         * If specified, the mask must be compatible with the value of
         * the @see:format property. For example, you can use the mask '99:99 >LL' 
         * for entering short times (format 't').
         */
        get mask(): string {
            return this._msk.mask;
        }
        set mask(value: string) {
            this._msk.mask = asString(value);
        }
        /**
         * Occurs when the value of the @see:value property changes, either
         * as a result of user actions or by assignment in code.
         */
        readonly valueChanged = new Event();
        /**
         * Raises the @see:valueChanged event.
         */
        onValueChanged(e?: EventArgs) {
            this.valueChanged.raise(this, e);
        }

        //#endregion ** object model

        //--------------------------------------------------------------------------
        //#region ** overrides

        // remember whether we have custom items on the list
        onItemsSourceChanged(e?: EventArgs) {
            super.onItemsSourceChanged(e);
            this._hasCustomItems = this.itemsSource != null;
        }

        // set selection range in input element (if it is visible)
        protected _updateInputSelection(start: number) {
            if (this._delKey) {
                super._updateInputSelection(start);
            } else {
                let val = this._tbx.value;
                while (start < val.length && !val[start].match(/[a-z0-9]/i)) {
                    start++;
                }
                setSelectionRange(this._tbx, start, this._tbx.value.length);
            }
        }

        // update value display in case culture changed
        refresh() {
            this.isDroppedDown = false;
            this._msk.refresh();
            this._tbx.value = Globalize.format(this.value, this.format);
            this._updateItems();
        }

        // commit changes when the user picks a value from the list
        onSelectedIndexChanged(e?: EventArgs) {
            if (this.selectedIndex > -1 && !this._settingText) {
                let value = this.value ? this.value : DateTime.newDate(),
                    selValue = this.selectedItem.value != null
                        ? this.selectedItem.value
                        : Globalize.parseDate(this.text, this.format);
                this.value = DateTime.fromDateTime(value, selValue);
            }
            super.onSelectedIndexChanged(e);
        }

        // update items in drop-down list
        protected _updateItems() {

            // not if we have custom items
            if (this._hasCustomItems) {
                return;
            }

            // populate the list
            let items = [],
                min = DateTime.newDate(0, 0, 0, 0, 0),
                max = DateTime.newDate(0, 0, 0, 23, 59, 59);
            if (this.min) {
                min.setHours(this.min.getHours(), this.min.getMinutes(), this.min.getSeconds());
            }
            if (this.max) {
                max.setHours(this.max.getHours(), this.max.getMinutes(), this.max.getSeconds());
            }
            if (isNumber(this.step) && this.step > 0) {
                for (let dt = min; dt <= max; dt = DateTime.addMinutes(dt, this.step)) {
                    items.push({ value: dt, text: Globalize.format(dt, this.format) });
                    //items.push(Globalize.format(dt, this.format));
                }
            }

            // save current value
            let value = this.value;
            this._settingText = true;

            // update item source
            this.displayMemberPath = 'text';
            this.selectedValuePath = 'text';
            this.itemsSource = items;
            this._hasCustomItems = false;

            // restore value
            this._settingText = false;
            this.value = value;
        }

        //#endregion ** overrides

        //--------------------------------------------------------------------------
        //#region ** implementation

        // gets the time of day in seconds
        private _getTime(value: Date): number {
            return value.getHours() * 3600 + value.getMinutes() * 60 + value.getSeconds();
        }

        // override to commit text on Enter and cancel on Escape
        protected _keydown(e: KeyboardEvent) {
            super._keydown(e);
            if (!e.defaultPrevented) {
                switch (e.keyCode) {
                    case Key.Enter:
                        if (!this.isDroppedDown) {
                            this._commitText();
                            this.selectAll();
                        }
                        break;
                    case Key.Escape:
                        this.text = Globalize.format(this.value, this.format);
                        this.selectAll();
                        break;
                }
            }
        }

        // parse time, commit if successful or revert
        protected _commitText() {
            if (!this.text && !this.isRequired) {
                this.value = null;
            } else {
                let text = this.value ? Globalize.format(this.value, this.format) : null;
                if (this.text != text) { // change only if needed (TFS 265289)
                    let value = this.selectedItem
                        ? this.selectedItem.value // TFS 290187
                        : Globalize.parseDate(this.text, this.format);
                    if (value) {
                        this.value = DateTime.fromDateTime(this.value, value);
                    } else {
                        this._tbx.value = text;
                    }
                }
            }
        }

        //#endregion ** implementation
    }
}
module wijmo.input {
    'use strict';

    /**
     * The @see:InputDateTime control extends the @see:InputDate control to allows users 
     * to input dates and times, either by typing complete date/time values in any format 
     * supported by the @see:Globalize class, or by picking dates from a drop-down calendar
     * and times from a drop-down list.
     *
     * Use the @see:InputDateTime.min and @see:InputDateTime.max properties to restrict
     * the range of dates that the user can enter.
     *
     * Use the @see:InputDateTime.timeMin and @see:InputDateTime.timeMax properties to
     * restrict the range of times that the user can enter.
     * 
     * Use the @see:InputDateTime.value property to gets or set the currently selected
     * date/time.
     */
    export class InputDateTime extends InputDate {
        _btnTm: HTMLElement;
        _inputTime: InputTime;

        /**
         * Gets or sets the template used to instantiate @see:InputDateTime controls.
         */
        static controlTemplate = '<div style="position:relative" class="wj-template">' +
          '<div class="wj-input">' +
            '<div class="wj-input-group wj-input-btn-visible">' +
              '<input wj-part="input" type="text" class="wj-form-control" />' +
              '<span class="wj-input-group-btn" tabindex="-1">' +
                '<button wj-part="btn" class="wj-btn wj-btn-default" type="button" tabindex="-1">' +
                  '<span class="wj-glyph-calendar"></span>' +
                '</button>' +
                '<button wj-part="btn-tm" class="wj-btn wj-btn-default" type="button" tabindex="-1">' +
                  '<span class="wj-glyph-clock"></span>' +
                '</button>' +
              '</span>' +
            '</div>' +
          '</div>' +
          '<div wj-part="dropdown" class="wj-content wj-dropdown-panel" ' +
                'style="display:none;position:absolute;z-index:100;width:auto">' +
          '</div>' +
        '</div>';

        //--------------------------------------------------------------------------
        //#region ** ctor

        /**
         * Initializes a new instance of the @see:InputDateTime class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);
            addClass(this.hostElement, 'wj-inputdatetime');

            // get reference to drop-down button for time part
            this._btnTm = this.hostElement.querySelector('[wj-part="btn-tm"]') as HTMLElement;

            // change default format to show date and time
            this._format = 'g';

            // create InputTime control (with additional drop-down)
            this._inputTime = new InputTime(document.createElement('div'));

            // update time when user selects a new value from time drop-down
            this._inputTime.valueChanged.addHandler(() => {

                // update value
                this.value = DateTime.fromDateTime(this.value, this._inputTime.value);

                // switch focus to input element
                if (this.containsFocus()) {
                    if (!this.isTouching || !this.showDropDownButton) {
                        this.selectAll();
                    }
                }
            });

            // create time picker drop-down
            let tmDropdown = this._inputTime.dropDown;

            // attach keyboard to time picker drop-down (open/close/commit, F4/Enter/Escape etc)
            let kd = this._keydown.bind(this);
            this.addEventListener(tmDropdown, 'keydown', kd, true);

            // handle focus (we have an extra drop-down)
            this.addEventListener(tmDropdown, 'blur', () => {
                this._updateFocusState();
            }, true);

            // handle clicks on the drop-down button (show drop-down, manage focus)
            this.addEventListener(this._btnTm, 'click', this._btnclick.bind(this));

            // switch editors on mousedown
            this.addEventListener(this._btn, 'mousedown', () => {
                this._setDropdown(this.calendar.hostElement);
            });
            this.addEventListener(this._btnTm, 'mousedown', (e: MouseEvent) => {

                // if we're showing the time drop-down, the mousedown will cause
                // the input time to lose focus and close the drop-down; 
                // so prevent the default action to avoid having the click event 
                // re-open the drop-down.
                if (this.isDroppedDown && this.dropDown == tmDropdown) {
                    e.preventDefault();
                }

                this._inputTime.dropDownCssClass = this.dropDownCssClass;
                this._setDropdown(tmDropdown);
            });

            // initialize control options
            this.initialize(options);
        }

        //#endregion
        //--------------------------------------------------------------------------
        //#region ** object model

        /**
         * Gets or sets the earliest time that the user can enter. 
         */
        get timeMin(): Date {
            return this._inputTime.min;
        }
        set timeMin(value: Date) {
            this._inputTime.min = value;
        }
        /**
         * Gets or sets the latest time that the user can enter.
         */
        get timeMax(): Date {
            return this._inputTime.max;
        }
        set timeMax(value: Date) {
            this._inputTime.max = value;
        }
        /**
         * Gets or sets the format used to display times in the drop-down list.
         *
         * This property does not affect the value shown in the control's input element. 
         * That value is formatted using the @see:format property.
         *
         * The format string is expressed as a .NET-style 
         * <a href="http://msdn.microsoft.com/en-us/library/8kb3ddd4(v=vs.110).aspx" target="_blank">
         * time format string</a>.
         */
        get timeFormat(): string {
            return this._inputTime.format;
        }
        set timeFormat(value: string) {
            this._inputTime.format = value;
        }
        /**
         * Gets or sets the number of minutes between entries in the drop-down list of times.
         */
        get timeStep(): number {
            return this._inputTime.step;
        }
        set timeStep(value: number) {
            this._inputTime.step = value;
        }
        /**
         * Gets a reference to the inner @see:InputTime control so you can access its
         * full object model.
         */
        get inputTime(): InputTime {
            return this._inputTime;
        }

        //#endregion
        //--------------------------------------------------------------------------
        //#region ** overrides

        // dispose of InputTime and Calendar controls
        dispose() {
            this._setDropdown(this.calendar.hostElement);
            super.dispose(); // Date
            this._inputTime.dispose(); // Time
        }

        // update value display in case culture changed
        refresh() {
            this._setDropdown(this.calendar.hostElement);
            super.refresh(); // Date
            this._inputTime.refresh(); // Time
        }

        // update drop-down button visibility
        protected _updateBtn() {
            super._updateBtn();
            if (this._btnTm) {
                this._btnTm.tabIndex = this._btn.tabIndex;
                this._btnTm.parentElement.style.display = this._btn.style.display;
            }
        }

        // honor min/max range (date and time)
        protected _clamp(value: Date): Date {
            if (value) {
                if (this.min && value < this.min) {
                    value = this.min;
                }
                if (this.max && value > this.max) {
                    value = this.max;
                }
            }
            return value;
        }

        // parse date, commit date and time parts if successful or revert
        protected _commitText() {
            let txt = this._tbx.value;
            if (!txt && !this.isRequired) {
                this.value = null;
            } else {
                let dt = Globalize.parseDate(txt, this.format);
                if (dt) {
                    this.value = dt;
                } else {
                    this._tbx.value = Globalize.format(this.value, this.format);
                }
            }
        }

        //#endregion
        //--------------------------------------------------------------------------
        //#region ** implementation

        // selects a drop-down element (date/time)
        protected _setDropdown(e: HTMLElement) {
            if (this._dropDown != e) {
                if (this.isDroppedDown) {
                    this.isDroppedDown = false;
                }
                this._dropDown = e;
            }
        }

        // update drop down content before showing it
        protected _updateDropDown() {
            let tm = this._inputTime;
            if (this._dropDown == tm.dropDown) {
                this._commitText();
                super._updateDropDown();
                tm.isRequired = this.isRequired;
                tm.value = this.value;
                if (this.isDroppedDown) {
                    tm.listBox.showSelection();
                }
            } else {
                super._updateDropDown();
            }
        }

        //#endregion
    }
}
module wijmo.input {
    'use strict';

    /**
     * The @see:InputNumber control allows users to enter numbers.
     *
     * The control prevents users from accidentally entering invalid data and 
     * formats the number as it is edited.
     *
     * Pressing the minus key reverses the sign of the value being edited, 
     * regardless of cursor position.
     *
     * You may use the @see:min and @see:max properties to limit the range of
     * acceptable values, and the @see:step property to provide spinner buttons
     * that increase or decrease the value with a click.
     *
     * For details about using the @see:min and @see:max properties, please see the 
     * <a href="static/minMax.html">Using the min and max properties</a> topic.
     *
     * Use the @see:value property to get or set the currently selected number.
     *
     * The example below creates several @see:InputNumber controls and shows 
     * the effect of using different formats, ranges, and step values.
     *
     * @fiddle:Cf9L9
     */
    export class InputNumber extends Control {

        // child elements
        _tbx: HTMLInputElement;
        _btnUp: HTMLElement;
        _btnDn: HTMLElement;

        // property storage
        _value: number;
        _min: number;
        _max: number;
        _format: string;
        _step: number;
        _showBtn = true;
        _readOnly = false;

        // private stuff
        _oldText: string;
        _composing: boolean;
        _chrDec: string;
        _chrCur: string;
        _fmtSpc: string;
        _fmtPrc: number;
        _rxSym: RegExp;
        _rxNeg: RegExp;
        _delKey: boolean;

        /**
         * Gets or sets the template used to instantiate @see:InputNumber controls.
         */
        static controlTemplate = '<div class="wj-input">' +
                '<div class="wj-input-group">' +
                    '<span wj-part="btn-dec" class="wj-input-group-btn" tabindex="-1">' +
                        '<button class="wj-btn wj-btn-default" type="button" tabindex="-1">-</button>' +
                    '</span>' +
                    '<input type="tel" wj-part="input" class="wj-form-control wj-numeric"/>' +
                    '<span wj-part="btn-inc" class="wj-input-group-btn" tabindex="-1">' +
                        '<button class="wj-btn wj-btn-default" type="button" tabindex="-1">+</button>' +
                    '</span>' +
                '</div>' + 
            '</div>';

        /**
         * Initializes a new instance of the @see:InputNumber class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            // accessibility: 
            // https://www.w3.org/TR/wai-aria-1.1/#spinbutton
            // http://oaa-accessibility.org/example/33/
            let host = this.hostElement;
            setAttribute(host, 'role', 'spinbutton', true);

            // instantiate and apply template
            let tpl = this.getTemplate();
            this.applyTemplate('wj-control wj-inputnumber wj-content', tpl, {
                _tbx: 'input',
                _btnUp: 'btn-inc',
                _btnDn: 'btn-dec'
            }, 'input');

            // disable autocomplete/spellcheck (important for mobile browsers including Chrome/Android)
            let tb = this._tbx;
            tb.autocomplete = 'off';
            tb.spellcheck = false;

            // update localized decimal and currency symbols
            this._updateSymbols();

            // handle IME
            this.addEventListener(this._tbx, 'compositionstart', () => {
                this._composing = true;
            });
            this.addEventListener(this._tbx, 'compositionend', () => {
                this._composing = false;
                setTimeout(() => { // TFS 141948
                    this._setText(this.text);
                });
            });

            // textbox events
            this.addEventListener(tb, 'keypress', this._keypress.bind(this));
            this.addEventListener(tb, 'keydown', this._keydown.bind(this));
            this.addEventListener(tb, 'input', this._input.bind(this));

            // inc/dec buttons: change value
            // if this was a tap, keep focus on button; OW transfer to textbox
            this.addEventListener(this._btnUp, 'click', this._clickSpinner.bind(this));
            this.addEventListener(this._btnDn, 'click', this._clickSpinner.bind(this));

            // use wheel to increase/decrease the value
            this.addEventListener(host, 'wheel', (e: WheelEvent) => {
                if (!e.defaultPrevented && !this.isReadOnly && this.containsFocus()) {
                    if (this.value != null) {
                        let step = clamp(-e.deltaY, -1, +1);
                        this._increment((this.step || 1) * step);
                        setTimeout(() => this.selectAll());
                        e.preventDefault();
                    }
                }
            });

            // initialize value
            this.value = 0;

            // initialize control options
            this.isRequired = true;
            this.initialize(options);
        }

        //--------------------------------------------------------------------------
        //#region ** object model

        /**
         * Gets the HTML input element hosted by the control.
         *
         * Use this property in situations where you want to customize the
         * attributes of the input element.
         */
        get inputElement(): HTMLInputElement {
            return this._tbx;
        }
        /**
         * Gets or sets the "type" attribute of the HTML input element hosted by the control.
         *
         * By default, this property is set to "tel", a value that causes mobile devices to
         * show a numeric keypad that includes a negative sign and a decimal separator.
         *
         * Use this property to change the default setting if the default does not work well
         * for the current culture, device, or application. In those cases, try changing
         * the value to "number" or "text."
         *
         * Note that input elements with type "number" prevent selection in Chrome and therefore
         * is not recommended. For more details, see this link:
         * http://stackoverflow.com/questions/21177489/selectionstart-selectionend-on-input-type-number-no-longer-allowed-in-chrome
         */
        get inputType(): string {
            return this._tbx.type;
        }
        set inputType(value: string) {
            this._tbx.type = asString(value);
        }
        /**
         * Gets or sets the current value of the control.
         */
        get value(): number {
            return this._value;
        }
        set value(value: number) {
            if (value != this._value) {
                value = asNumber(value, !this.isRequired || (value == null && this._value == null));
                if (value == null) {
                    this._setText('');
                } else if (!isNaN(value)) {
                    let text = Globalize.format(value, this.format);
                    this._setText(text);
                }
            }
        }
        /**
         * Gets or sets a value indicating whether the control value must be a number or whether it
         * can be set to null (by deleting the content of the control).
         */
        get isRequired(): boolean {
            return this._tbx.required;
        }
        set isRequired(value: boolean) {
            this._tbx.required = asBoolean(value);
        }
        /**
         * Gets or sets a value that indicates whether the user can modify
	     * the control value using the mouse and keyboard.
         */
        get isReadOnly(): boolean {
            return this._readOnly;
        }
        set isReadOnly(value: boolean) {
            this._readOnly = asBoolean(value);
            this.inputElement.readOnly = this._readOnly;
            toggleClass(this.hostElement, 'wj-state-readonly', this.isReadOnly);
        }
        /**
         * Gets or sets the smallest number that the user can enter.
         * 
         * For details about using the @see:min and @see:max properties, please see the 
         * <a href="static/minMax.html">Using the min and max properties</a> topic.
         */
        get min(): number {
            return this._min;
        }
        set min(value: number) {
            this._min = asNumber(value, true);
        }
        /**
         * Gets or sets the largest number that the user can enter.
         * 
         * For details about using the @see:min and @see:max properties, please see the 
         * <a href="static/minMax.html">Using the min and max properties</a> topic.
         */
        get max(): number {
            return this._max;
        }
        set max(value: number) {
            this._max = asNumber(value, true);
        }
        /**
         * Gets or sets the amount to add or subtract to the @see:value property
         * when the user clicks the spinner buttons.
         */
        get step(): number {
            return this._step;
        }
        set step(value: number) {
            this._step = asNumber(value, true);
            this._updateBtn();
        }
        /**
         * Gets or sets the format used to display the number being edited (see @see:Globalize).
         *
         * The format string is expressed as a .NET-style 
         * <a href="http://msdn.microsoft.com/en-us/library/dwhawy9k(v=vs.110).aspx" target="_blank">
         * standard numeric format string</a>.
         */
        get format(): string {
            return this._format;
        }
        set format(value: string) {
            if (value != this.format) {
                this._format = asString(value);
                this.refresh();
            }
        }
        /**
         * Gets or sets the text shown in the control.
         */
        get text(): string {
            return this._tbx.value;
        }
        set text(value: string) {
            if (value != this.text) {
                this._oldText = null;
                this._setText(value);
            }
        }
        /**
         * Gets or sets the string shown as a hint when the control is empty.
         */
        get placeholder(): string {
            return this._tbx.placeholder;
        }
        set placeholder(value: string) {
            this._tbx.placeholder = value;
        }
        /**
         * Gets or sets a value indicating whether the control displays spinner buttons
         * to increment or decrement the value (the step property must be set to a 
         * value other than zero).
         */
        get showSpinner(): boolean {
            return this._showBtn;
        }
        set showSpinner(value: boolean) {
            this._showBtn = asBoolean(value);
            this._updateBtn();
        }
        /**
         * Sets the focus to the control and selects all its content.
         */
        selectAll() {
            let tbx = this._tbx;
            setSelectionRange(tbx, 0, tbx.value.length); // TFS 295426
        }

        /**
         * Occurs when the value of the @see:text property changes.
         */
        readonly textChanged = new Event();
        /**
         * Raises the @see:textChanged event.
         */
        onTextChanged(e?: EventArgs) {
            this.textChanged.raise(this, e);
            this._updateState();
        }
        /**
         * Occurs when the value of the @see:value property changes, either
         * as a result of user actions or by assignment in code.
         */
        readonly valueChanged = new Event();
        /**
         * Raises the @see:valueChanged event.
         */
        onValueChanged(e?: EventArgs) {
            this._updateAria();
            this.valueChanged.raise(this, e);
        }

        //#endregion

        //--------------------------------------------------------------------------
        //#region ** overrides

        // give focus to textbox unless touching
        onGotFocus(e: EventArgs) {
            if (!this.isTouching) {
                this._tbx.focus();
                this.selectAll();
            }
            super.onGotFocus(e);
        }

        // enforce min/max when losing focus
        onLostFocus(e?: EventArgs) {

            // Safari does not finish composition on blur (TFS 236810)
            if (this._composing) {
                this._composing = false;
                this._setText(this.text);
            }

            // enforce min/max
            let value = this._clamp(this.value),
                text = Globalize.format(value, this.format);
            this._setText(text);

            // allow base class
            super.onLostFocus(e);
        }

        // update culture symbols and display text when refreshing
        refresh(fullUpdate?: boolean) {
            this._updateSymbols();
            let text = Globalize.format(this.value, this.format);
            this._setText(text);
        }

        //#endregion

        //--------------------------------------------------------------------------
        //#region ** implementation

        // update culture/format symbols
        private _updateSymbols() {
            let nf = culture.Globalize.numberFormat,
                fmt = this.format ? this.format.match(/([a-z])(\d*)(,*)(.*)/i) : null;
            this._chrDec = nf['.'] || '.';
            this._chrCur = (fmt && fmt[4]) ? fmt[4] : (nf.currency.symbol || '$');
            this._fmtSpc = (fmt && fmt[1]) ? fmt[1].toLowerCase() : 'n';
            this._fmtPrc = (fmt && fmt[2]) ? parseInt(fmt[2]) : null;
            this._rxSym = new RegExp('^[%+\\-() ' + this._chrDec + this._chrCur + ']*$');
            this._rxNeg = new RegExp('(\\-|\\()');
        }

        // make sure a value is between min and max
        private _clamp(value: number): number {
            return clamp(value, this.min, this.max);
        }

        // checks whether a character is a digit, sign, or decimal point
        private _isNumeric(chr: string, digitsOnly: boolean) {
            let isNum = (chr == this._chrDec) || (chr >= '0' && chr <= '9');
            if (!isNum && !digitsOnly) {
                isNum = '+-()'.indexOf(chr) > -1;
            }
            return isNum;
        }

        // get the range of numeric characters within the current text
        private _getInputRange(digitsOnly: boolean): number[] {
            let rng = [0, 0],
                text = this.text,
                hasStart = false;
            for (let i = 0; i < text.length; i++) {
                if (this._isNumeric(text[i], digitsOnly)) {
                    if (!hasStart) {
                        rng[0] = i;
                        hasStart = true;
                    }
                    rng[1] = i + 1;
                }
            }
            return rng;
        }

        // flip the current value between positive and negative
        // keeping the cursor position
        private _flipSign() {
            let start = this._getSelStartDigits();
            this.value *= -1;
            this._setSelStartDigits(start);
        }

        // get selection start counting digits and decimals only
        private _getSelStartDigits(): number {
            let start = 0,
                selStart = this._tbx.selectionStart,
                str = this._tbx.value;
            for (let i = 0; i < str.length && i < selStart; i++) {
                if (this._isNumeric(str[i], true)) {
                    start++;
                }
            }
            return start;
        }

        // set selection start counting digits and decimals only
        private _setSelStartDigits(start: number) {
            let str = this._tbx.value;
            for (let i = 0; i < str.length && start >= 0; i++) {
                if (this._isNumeric(str[i], true)) {
                    if (!start) {
                        setSelectionRange(this._tbx, i);
                        break;
                    }
                    start--;
                } else if (!start) {
                    setSelectionRange(this._tbx, i);
                    break;
                }
            }
        }

        // apply increment with rounding (not truncating): TFS 142618, 145814, 153300
        private _increment(step: number) {
            if (step) {
                let value = this._clamp(this.value + step),
                    text = Globalize.format(value, this.format, false, false);
                this._setText(text);
            }
        }

        // update spinner button visibility
        protected _updateBtn() {
            let showBtn = this.showSpinner && !!this.step,
                enableBtn = showBtn && isNumber(this.value);
            setCss([this._btnUp, this._btnDn], {
                display: showBtn ? '' : 'none'
            });
            toggleClass(this.hostElement, 'wj-input-show-spinner', showBtn);
            enable(this._btnUp, enableBtn);
            enable(this._btnDn, enableBtn);
            this._updateAria();
        }

        // update text in textbox
        protected _setText(text: string) {
            let tbx = this._tbx;

            // not while composing IME text...
            if (this._composing) return;

            // save state
            let isNegative = this._rxNeg.test(text),
                delKey = this._delKey;

            // handle strings composed only of non-digit chars (TFS 143559, 141501)
            if (text && this._rxSym.test(text)) {
                text = (this.isRequired || !delKey) ? '0' : '';
            }

            // delete/backspace keys clear non-required zeros to null
            this._delKey = false;
            if (delKey && this.value == 0 && !this.isRequired) {
                text = '';
            }

            // handle nulls
            if (!text) {

                // if value is not required, setting to null is OK
                if (!this.isRequired) {
                    tbx.value = '';
                    if (this._value != null) {
                        this._value = null;
                        this.onValueChanged();
                    }
                    if (this._oldText) {
                        this._oldText = text;
                        this.onTextChanged();
                    }
                    this._updateBtn();
                    return;
                }

                // value is required, so change text to zero
                text = '0';
            }

            // parse input
            let fmt = this._format || (text.indexOf(this._chrDec) > -1 ? 'n2' : 'n0'),
                value = Globalize.parseFloat(text, fmt);

            // handle invalid input
            if (isNaN(value)) {
                tbx.value = this._oldText;
                return;
            }

            // get formatted value
            let fval = Globalize.format(value, fmt, false);

            // allow for '-0.00'
            if (isNegative && value >= 0) {
                fval = '-' + fval;
            }

            // allow trailing decimal/zeros when precision is not set (TFS 140302, 145764, 295990)
            if (this._fmtPrc == null || this._fmtSpc == 'g') {
                if (!delKey && tbx.value[tbx.selectionStart - 1] == this._chrDec) {
                    fval = text + (text == '0' ? this._chrDec : '');
                }
            }

            // update text with formatted value
            if (tbx.value != fval) {
                tbx.value = fval;
                value = Globalize.parseFloat(fval, this.format);
            }

            // update value, raise valueChanged
            if (value != this._value) {
                this._value = value;
                this.onValueChanged();
            }

            // raise textChanged
            if (this.text != this._oldText) {
                this._oldText = this.text;
                this.onTextChanged();
            }

            // update spinner button visibility
            this._updateBtn();
        }

        // handle the keypress events
        protected _keypress(e: KeyboardEvent) {

            // ignore the key if handled, composing, or if the control is read-only (TFS 199438)
            if (e.defaultPrevented || this._composing || this.isReadOnly) {
                return;
            }

            // if char pressed, not ctrl/command key // TFS 193087, 234934
            if (e.charCode && !e.ctrlKey && !e.metaKey) { 
                let tbx = this._tbx;

                // prevent invalid chars/validate cursor position (TFS 80733)
                let chr = String.fromCharCode(e.charCode);
                if (!this._isNumeric(chr, false)) {
                    e.preventDefault();
                } else {

                    // validate cursor position
                    let rng = this._getInputRange(true),
                        start = tbx.selectionStart,
                        end = tbx.selectionEnd;
                    if (start < rng[0] && end < tbx.value.length) { // TFS 295998
                        setSelectionRange(tbx, rng[0], end);
                    }

                    // ignore input after the end to prevent rounding (TFS 205653, 270431, 276538)
                    if (start >= rng[1]) {
                        let prec = this._fmtPrc != null ? this._fmtPrc : 2,
                            idx = tbx.value.indexOf(this._chrDec);
                        if (idx > -1 && start - idx > prec) {
                            e.preventDefault();
                        }
                    }
                }

                // handle special characters
                switch (chr) {

                    // flip sign
                    case '-':
                        if (this.min >= 0) {
                            if (this.value < 0) {
                                this._flipSign();
                            }
                        } else {
                            if (this.value && tbx.selectionStart == tbx.selectionEnd) {
                                this._flipSign();
                            } else {

                                // start with negative value
                                this._setText('-');

                                // position cursor before the decimal or after the last digit
                                let index = this.text.indexOf(this._chrDec);
                                if (index < 0) {
                                    index = this._getInputRange(true)[1];
                                }
                                setSelectionRange(tbx, index);
                            }
                        }
                        e.preventDefault();
                        break;

                    // make positive
                    case '+':
                        if (this.value < 0) {
                            this._flipSign();
                        }
                        e.preventDefault();
                        break;

                    // prevent decimal points altogether, or multiple instances
                    case this._chrDec:
                        if (this._fmtPrc == 0) { // prevent decimal points
                            e.preventDefault();
                        } else { // only one decimal point
                            let dec = tbx.value.indexOf(chr);
                            if (dec > -1) {
                                if (tbx.selectionStart <= dec) {
                                    dec++;
                                }
                                setSelectionRange(tbx, dec);
                                e.preventDefault();
                            }
                        }
                        break;
                }
            }
        }

        // handle the keydown event
        protected _keydown(e: KeyboardEvent) {
            this._delKey = false;

            // ignore the key if handled or composing
            if (e.defaultPrevented || this._composing) {
                return;
            }

            // handle the key
            let tbx = this._tbx,
                text = tbx.value,
                selStart = tbx.selectionStart,
                selEnd = tbx.selectionEnd;
            switch (e.keyCode) {

                // customize select all behavior
                case 65: // A
                    if (e.ctrlKey) {
                        setTimeout(() => { // TFS 135585: use timeouts for selection changes in this handler!
                            this.selectAll();
                        });
                        e.preventDefault();
                    }
                    break;

                // apply increment when user presses up/down
                case Key.Up:
                case Key.Down:
                    if (this.step && !this.isReadOnly) {
                        this._increment(this.step * (e.keyCode == Key.Up ? +1 : -1));
                        setTimeout(() => {
                            this.selectAll();
                        });
                        e.preventDefault();
                    }
                    break;

                // Back skips over decimal points, '%', and ')' signs (TFS 80472, 267528, 281341)
                case Key.Back:
                    this._delKey = true;
                    if (selEnd - selStart < 2 && !this.isReadOnly) {
                        let chr = text[selEnd - 1];
                        if (chr == this._chrDec || chr == '%' || chr == ')') {
                            setTimeout(() => {
                                selEnd = chr == '%'
                                    ? this._getInputRange(true)[1] // after the percentage
                                    : selEnd - 1; // before the decimal/parenthesis (TFS 283792)
                                setSelectionRange(tbx, selEnd);
                            });
                            e.preventDefault();
                        }
                    }
                    break;

                // Delete skips over decimal points, and '%' signs (TFS 80472, 267528, 281341)
                case Key.Delete:
                    this._delKey = true;
                    if (selEnd - selStart < 2 && !this.isReadOnly) {
                        if (text == '0' && selStart == 1) {
                            setSelectionRange(tbx, 0);
                        } else {
                            let chr = text[selStart];
                            if (chr == this._chrDec || chr == '%') {
                                setTimeout(() => {
                                    setSelectionRange(tbx, selStart + 1);
                                });
                                e.preventDefault();
                            }
                        }
                    }
                    break;
            }
        }

        // handle user input (keypress or paste)
        protected _input(e) {

            // not while composing IME text...
            if (this._composing) return;

            // this timeOut is **important** for Windows Phone/Android/Safari
            setTimeout(() => {

                // remember cursor position
                let tbx = this._tbx,
                    text = tbx.value,
                    dec = text.indexOf(this._chrDec),
                    sel = tbx.selectionStart,
                    pos = this._getSelStartDigits();

                // preserve percentage sign for percentage formats
                if (this._fmtSpc == 'p' && text.length && text.indexOf('%') < 0) {
                    text += '%';
                }

                // set the text
                this._setText(text);

                // update cursor position if we have the focus (TFS 136134)
                if (this.containsFocus()) {

                    // get updated values
                    let newText = tbx.value,
                        newDec = newText.indexOf(this._chrDec),
                        rng = this._getInputRange(true);

                    // handle cases where user types "-*" and the control switches to
                    // parenthesized values
                    if (text[0] == '-' && newText[0] != '-') {
                        this._setSelStartDigits(dec < 0 || sel <= dec ? pos - 1 : pos);
                        return;
                    }

                    // try to keep cursor offset from the right (TFS 136392, 143553)
                    if (text) {
                        if (text == this._chrDec && newDec > -1) {
                            sel = newDec + 1; // user just typed a decimal point (TFS 236650)
                        } else if ((sel <= dec && newDec > -1) || (dec < 0 && newDec < 0)) { 
                            sel += newText.length - text.length; // cursor was on the left of the decimal
                        } else if (dec < 0 && newDec > -1) { 
                            sel = newDec; // there was no decimal, but now there is
                        }
                    } else { // position at decimal or at end of valid range (TFS 277434)
                        sel = newDec > -1 ? newDec : rng[1];
                    }

                    // make sure it's within the valid range
                    sel = clamp(sel, rng[0], rng[1]);

                    // set cursor position
                    setSelectionRange(tbx, sel);
                }
            });
        }

        // handle clicks on the spinner buttons
        protected _clickSpinner(e: MouseEvent) {
            if (!e.defaultPrevented && !this.isReadOnly && this.step && this.value != null) {
                this._increment(this.step * (contains(this._btnUp, e.target) ? +1 : -1));
                if (!this.isTouching) {
                    setTimeout(() => this.selectAll());
                }
            }
        }

        // update ARIA attributes for this control
        protected _updateAria() {
            let host = this.hostElement;
            setAttribute(host, 'aria-valuemin', this.min);
            setAttribute(host, 'aria-valuemax', this.max);
            setAttribute(host, 'aria-valuenow', this.value);
        }
    }
}
module wijmo.input {
    'use strict';

    /**
     * The @see:InputMask control provides a way to govern what a user is allowed to input.
     *
     * The control prevents users from accidentally entering invalid data and 
     * saves time by skipping over literals (such as slashes in dates) as the user types.
     *
     * The mask used to validate the input is defined by the @see:InputMask.mask property,
     * which may contain one or more of the following special characters:
     *
     *  <dl class="dl-horizontal">
     *      <dt>0</dt>      <dd>Digit.</dd>
     *      <dt>9</dt>      <dd>Digit or space.</dd>
     *      <dt>#</dt>      <dd>Digit, sign, or space.</dd>
     *      <dt>L</dt>      <dd>Letter.</dd>
     *      <dt>l</dt>      <dd>Letter or space.</dd>
     *      <dt>A</dt>      <dd>Alphanumeric.</dd>
     *      <dt>a</dt>      <dd>Alphanumeric or space.</dd>
     *      <dt>.</dt>      <dd>Localized decimal point.</dd>
     *      <dt>,</dt>      <dd>Localized thousand separator.</dd>
     *      <dt>:</dt>      <dd>Localized time separator.</dd>
     *      <dt>/</dt>      <dd>Localized date separator.</dd>
     *      <dt>$</dt>      <dd>Localized currency symbol.</dd>
     *      <dt>&lt;</dt>   <dd>Converts characters that follow to lowercase.</dd>
     *      <dt>&gt;</dt>   <dd>Converts characters that follow to uppercase.</dd>
     *      <dt>|</dt>      <dd>Disables case conversion.</dd>
     *      <dt>\</dt>      <dd>Escapes any character, turning it into a literal.</dd>
     *      <dt>９</dt>      <dd>DBCS Digit.</dd>
     *      <dt>Ｊ</dt>      <dd>DBCS Hiragana.</dd>
     *      <dt>Ｇ</dt>      <dd>DBCS big Hiragana.</dd>
     *      <dt>Ｋ</dt>      <dd>DBCS Katakana. </dd>
     *      <dt>Ｎ</dt>      <dd>DBCS big Katakana.</dd>
     *      <dt>K</dt>      <dd>SBCS Katakana.</dd>
     *      <dt>N</dt>      <dd>SBCS big Katakana.</dd>
     *      <dt>Ｚ</dt>      <dd>Any DBCS character.</dd>
     *      <dt>H</dt>      <dd>Any SBCS character.</dd>
     *      <dt>All others</dt><dd>Literals.</dd>
     *  </dl>
     */
    export class InputMask extends Control {

        // child elements
        _tbx: HTMLInputElement;

        // property storage
        _msk: _MaskProvider;

        /**
         * Gets or sets the template used to instantiate @see:InputMask controls.
         */
        static controlTemplate = '<div class="wj-input">' +
                '<div class="wj-input-group">' +
                    '<input wj-part="input" class="wj-form-control"/>' +
                '</div>' +
            '</div>';

        /**
         * Initializes a new instance of the @see:InputMask class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);

            // instantiate and apply template
            let tpl = this.getTemplate();
            this.applyTemplate('wj-control wj-inputmask wj-content', tpl, {
                _tbx: 'input'
            }, 'input');

            // initialize value from <input> tag
            if (this._orgTag == 'INPUT') {
                let value = this._tbx.getAttribute('value');
                if (value) {
                    this.value = value;
                }
            }

            // create mask provider
            this._msk = new _MaskProvider(this._tbx);

            // initialize control options
            this.isRequired = true;
            this.initialize(options);

            // update mask on input
            this.addEventListener(this._tbx, 'input', () => {
                setTimeout(() => { // wait for _MaskProvider...
                    this.onValueChanged();
                });
            });
        }

        //--------------------------------------------------------------------------
        //#region ** object model

        /**
         * Gets the HTML input element hosted by the control.
         *
         * Use this property in situations where you want to customize the
         * attributes of the input element.
         */
        get inputElement(): HTMLInputElement {
            return this._tbx;
        }
        /**
         * Gets or sets the text currently shown in the control.
         */
        get value(): string {
            return this._tbx.value;
        }
        set value(value: string) {
            if (value != this.value) {

                // assign unmasked value to input element
                this._tbx.value = asString(value);

                // move selection to end without disturbing the focus (TFS 152756)
                // (for IE consistency with typing, important for vague literal handling)
                let ae = getActiveElement();
                this._tbx.selectionStart = this._tbx.value.length;
                if (ae && ae != getActiveElement()) {
                    ae.focus();
                }

                // update masked value
                value = this._msk._applyMask();

                // update input element
                this._tbx.value = value;
                this.onValueChanged();
            }
        }
        /**
         * Gets or sets the raw value of the control (excluding mask literals).
         *
         * The raw value of the control excludes prompt and literal characters.
         * For example, if the @see:mask property is set to "AA-9999" and the
         * user enters the value "AB-1234", the @see:rawValue property will
         * return "AB1234", excluding the hyphen that is part of the mask.
         */
        get rawValue(): string {
            return this._msk.getRawValue();
        }
        set rawValue(value: string) {
            if (value != this.rawValue) {
                this.value = asString(value);
            }
        }
        /**
         * Gets or sets the mask used to validate the input as the user types.
         *
         * The mask is defined as a string with one or more of the masking 
         * characters listed in the @see:InputMask topic.
         */
        get mask(): string {
            return this._msk.mask;
        }
        set mask(value: string) {
            let oldValue = this.value;
            this._msk.mask = asString(value);
            if (this.value != oldValue) {
                this.onValueChanged();
            }
        }
        /**
         * Gets or sets the symbol used to show input positions in the control.
         */
        get promptChar(): string {
            return this._msk.promptChar;
        }
        set promptChar(value: string) {
            let oldValue = this.value;
            this._msk.promptChar = value;
            if (this.value != oldValue) {
                this.onValueChanged();
            }
        }
        /**
         * Gets or sets the string shown as a hint when the control is empty.
         */
        get placeholder(): string {
            return this._tbx.placeholder;
        }
        set placeholder(value: string) {
            this._tbx.placeholder = value;
        }
        /**
         * Gets a value that indicates whether the mask has been completely filled.
         */
        get maskFull(): boolean {
            return this._msk.maskFull;
        }
        /**
         * Gets or sets a value indicating whether the control value
         * must be a non-empty string.
         */
        get isRequired(): boolean {
            return this._tbx.required;
        }
        set isRequired(value: boolean) {
            this._tbx.required = asBoolean(value);
        }
        /**
         * Sets the focus to the control and selects all its content.
         */
        selectAll() {
            let rng = this._msk.getMaskRange();
            setSelectionRange(this._tbx, rng[0], rng[1] + 1);
        }
        /**
         * Occurs when the value of the @see:value property changes, either
         * as a result of user actions or by assignment in code.
         */
        readonly valueChanged = new Event();
        /**
         * Raises the @see:valueChanged event.
         */
        onValueChanged(e?: EventArgs) {
            this.valueChanged.raise(this, e);
            this._updateState();
        }

        //#endregion

        //--------------------------------------------------------------------------
        //#region ** overrides

        // apply mask when refreshing
        refresh(fullUpdate?: boolean) {
            super.refresh(fullUpdate);
            this._msk.refresh();
        }

        // select all when getting the focus
        onGotFocus(e) {
            super.onGotFocus(e);
            this.selectAll();
        }

        //#endregion

    }
}
module wijmo.input {
    'use strict';

    /**
     * The @see:InputColor control allows users to select colors by typing in
     * HTML-supported color strings, or to pick colors from a drop-down 
     * that shows a @see:ColorPicker control.
     *
     * Use the @see:value property to get or set the currently selected color.
     *
     * @fiddle:84xvsz90
     */
    export class InputColor extends DropDown {

        // child controls
        _ePreview: HTMLElement;
        _colorPicker: ColorPicker;

        // property storage
        _value: string;

        /**
         * Initializes a new instance of the @see:InputColor class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?) {
            super(element);
            addClass(this.hostElement, 'wj-inputcolor');

            // create preview element
            this._tbx.style.paddingLeft = '24px';
            this._ePreview = createElement('<div class="wj-inputcolorbox" style="position:absolute;left:6px;top:6px;width:12px;bottom:6px;border:1px solid black"></div>');
            this.hostElement.style.position = 'relative';
            this.hostElement.appendChild(this._ePreview);

            // initializing from <input> tag
            if (this._orgTag == 'INPUT') {
                this._tbx.type = '';
                this._commitText();
            }
            
            // initialize value to white
            this.value = '#ffffff';

            // initialize control options
            this.isRequired = true;
            this.initialize(options);

            // close drop-down when user clicks a palette entry or the preview element
            this.addEventListener(this._colorPicker.hostElement, 'click', (e: MouseEvent) => {
                let el = e.target as HTMLElement;
                if (el && el.tagName == 'DIV') {
                    if (closest(el, '[wj-part="div-pal"]') || closest(el, '[wj-part="div-pv"]')) {
                        let color = el.style.backgroundColor;
                        if (color) {
                            this.isDroppedDown = false;
                        }
                    }
                }
            });

        }

        //--------------------------------------------------------------------------
        //#region ** object model

        /**
         * Gets or sets the current color.
         */
        get value(): string {
            return this._value;
        }
        set value(value: string) {
            if (value != this.value) {
                if (value || !this.isRequired) {
                    this.text = asString(value);
                }
            }
        }
        /**
         * Gets or sets the text shown on the control.
         */
        get text(): string {
            return this._tbx.value;
        }
        set text(value: string) {
            if (value != this.text) {
                this._setText(asString(value), true);
                this._commitText();
            }
        }
        /**
         * Gets or sets a value indicating whether the @see:ColorPicker allows users
         * to edit the color's alpha channel (transparency).
         */
        get showAlphaChannel(): boolean {
            return this._colorPicker.showAlphaChannel;
        }
        set showAlphaChannel(value: boolean) {
            this._colorPicker.showAlphaChannel = value;
        }
        /**
         * Gets or sets an array that contains the colors in the palette.
         *
         * The palette contains ten colors, represented by an array with 
         * ten strings. The first two colors are usually white and black.
         */
        get palette(): string[] {
            return this._colorPicker.palette;
        }
        set palette(value: string[]) {
            this._colorPicker.palette = value;
        }
        /**
         * Gets a reference to the @see:ColorPicker control shown in the drop-down.
         */
        get colorPicker(): ColorPicker {
            return this._colorPicker;
        }
        /**
         * Occurs when the value of the @see:value property changes, either
         * as a result of user actions or by assignment in code.
         */
        readonly valueChanged = new Event();
        /**
         * Raises the @see:valueChanged event.
         */
        onValueChanged(e?: EventArgs) {
            this.valueChanged.raise(this, e);
        }

        //#endregion ** object model

        //--------------------------------------------------------------------------
        //#region ** overrides

        // create the drop-down element
        protected _createDropDown() {

            // create the drop-down element
            this._colorPicker = new ColorPicker(this._dropDown);
            setCss(this._dropDown, {
                minWidth: 420,
                minHeight: 200
            });

            // update our value to match colorPicker's
            this._colorPicker.valueChanged.addHandler(() => {
                this.value = this._colorPicker.value;
            });
        }

        // override to commit/cancel edits
        protected _keydown(e: KeyboardEvent) {
            if (!e.defaultPrevented) {
                switch (e.keyCode) {
                    case Key.Enter:
                        this._commitText();
                        this.selectAll();
                        break;
                    case Key.Escape:
                        this.text = this.value;
                        this.selectAll();
                        break;
                }
            }
            super._keydown(e);
        }

        //#endregion ** overrides

        //--------------------------------------------------------------------------
        //#region ** implementation

        // assign new color to ColorPicker
        protected _commitText() {
            if (this.value != this.text) {

                // allow empty values
                if (!this.isRequired && !this.text) {
                    this._value = this.text;
                    this._ePreview.style.backgroundColor = '';
                    return;
                }

                // parse and assign color to control
                let c = Color.fromString(this.text);
                if (c) { // color is valid, update value based on text
                    this._colorPicker.value = this.text;
                    this._value = this._colorPicker.value;
                    this._ePreview.style.backgroundColor = this.value;
                    this.onValueChanged();
                } else { // color is invalid, restore text and keep value
                    this.text = this._value ? this._value : '';
                }
            }
        }

        //#endregion ** implementation
    }
}
