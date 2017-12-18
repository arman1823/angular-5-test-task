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
///<wijmo-soft-import from="wijmo.chart.analytics"/>
///<wijmo-soft-import from="wijmo.chart.animation"/>
///<wijmo-soft-import from="wijmo.chart.annotation"/>
///<wijmo-soft-import from="wijmo.chart.finance.analytics"/>
///<wijmo-soft-import from="wijmo.chart.finance"/>
///<wijmo-soft-import from="wijmo.chart.hierarchical"/>
///<wijmo-soft-import from="wijmo.chart.interaction"/>
///<wijmo-soft-import from="wijmo.chart.radar"/>
///<wijmo-soft-import from="wijmo.chart"/>
///<wijmo-soft-import from="wijmo.gauge"/>
///<wijmo-soft-import from="wijmo.grid.detail"/>
///<wijmo-soft-import from="wijmo.grid.filter"/>
///<wijmo-soft-import from="wijmo.grid.grouppanel"/>
///<wijmo-soft-import from="wijmo.grid.multirow"/>
///<wijmo-soft-import from="wijmo.grid.pdf"/>
///<wijmo-soft-import from="wijmo.grid.sheet"/>
///<wijmo-soft-import from="wijmo.grid"/>
///<wijmo-soft-import from="wijmo.grid.xlsx"/>
///<wijmo-soft-import from="wijmo.input"/>
///<wijmo-soft-import from="wijmo.metaFactory"/>
///<wijmo-soft-import from="wijmo.odata"/>
///<wijmo-soft-import from="wijmo.olap"/>
///<wijmo-soft-import from="wijmo.pdf"/>
///<wijmo-soft-import from="wijmo.xlsx"/>
///<wijmo-soft-import from="wijmo.viewer"/>
///<wijmo-soft-import from="wijmo.nav"/>
var wijmo;
(function (wijmo) {
    // prevent double loading
    //if (wijmo && wijmo.interop) {
    //    return;
    //}
    var meta;
    (function (meta) {
        /*
            Represents shared metadata (control properties/events descriptions) used by interop services like
            Angular directives and Knockout custom bindings.

            Control metadata is retrieved using the getMetaData method by passing the control's metaDataId (see the
            method description for details).

            Descriptor objects are created using the CreateProp, CreateEvent and CreateComplexProp static methods.

            The specific interop service should create a class derived from ControlMetaFactory and override these methods to
            create descriptors of the platform specific types (see the wijmo.angular.MetaFactory class as an example).

            To initialize platform specific properties of the descriptors an interop services can use the findProp, findEvent and
            findComplexProp methods to find a necessary descriptor object by name.
        */
        var ControlMetaFactory = /** @class */ (function () {
            function ControlMetaFactory() {
            }
            // Creates a property descriptor object. A specific interop service should override this method in the derived
            // metadata factory class to create platform specific descriptor object.
            ControlMetaFactory.CreateProp = function (propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority) {
                return new PropDescBase(propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority);
            };
            // Creates an event descriptor object. A specific interop service should override this method in the derived
            // metadata factory class to create platform specific descriptor object.
            ControlMetaFactory.CreateEvent = function (eventName, isPropChanged) {
                return new EventDescBase(eventName, isPropChanged);
            };
            // Creates a complex property descriptor object. A specific interop service should override this method in the derived
            // metadata factory class to create platform specific descriptor object.
            ControlMetaFactory.CreateComplexProp = function (propertyName, isArray, ownsObject) {
                return new ComplexPropDescBase(propertyName, isArray, ownsObject);
            };
            // Finds a property descriptor by the property name in the specified array.
            ControlMetaFactory.findProp = function (propName, props) {
                return this.findInArr(props, 'propertyName', propName);
            };
            // Finds an event descriptor by the event name in the specified array.
            ControlMetaFactory.findEvent = function (eventName, events) {
                return this.findInArr(events, 'eventName', eventName);
            };
            // Finds a complex property descriptor by the property name in the specified array.
            ControlMetaFactory.findComplexProp = function (propName, props) {
                return this.findInArr(props, 'propertyName', propName);
            };
            /*
                Returns metadata for the control by its metadata ID.In the most cases the control type (constructor function)
                is used as metadata ID. In cases where this is not applicable an arbitrary object can be used as an ID, e.g.
                'MenuItem' string is used as the ID for Menu Item.

                The sets of descriptors returned for the specific metadata ID take into account the controls inheritance chain
                and include metadata defined for the control's base classes.
                In case of a control that has no a base class metadata you create its metadata object with a constructor:
                return new MetaDataBase(... descriptor arrays ...);

                If the control has the base control metadata then you create its metadata object by a recursive call to
                the getMetaData method with the base control's metadata ID passed, and add the controls own metadata to
                the returned object using the 'add' method. E.g. for the ComboBox derived from the DropDown this looks like:
                return this.getMetaData(wijmo.input.DropDown).add(... descriptor arrays ...);

                The specific platforms provide the following implementations of the metadata ID support:

                Angular
                =======
                The WjDirective._getMetaDataId method returns a metadata ID. By default it returns a value of the
                WjDirective._controlConstructor property. Because of this approach it's reasonable to override the
                _controlConstructor property even in the abstract classes like WjDropDown, in this case it's not necessary
                to override the _getMetaDataId method itself.
                ----------------
                WARNING: if you override the _getMetaDataId method, don't forget to override it in the derived classes!
                ----------------
                You usually need to override the _getMetaDataId method only for classes like WjMenuItem and WjCollectionViewNavigator
                for which the _controlConstructor as an ID approach doesn't work.

                Knockout
                ========
                TBD
            */
            ControlMetaFactory.getMetaData = function (metaDataId) {
                switch (metaDataId) {
                    // wijmo.Control *************************************************************
                    case wijmo.Control:
                        return new MetaDataBase([
                            this.CreateProp('isDisabled', PropertyType.Boolean),
                        ], [
                            this.CreateEvent('gotFocus'),
                            this.CreateEvent('lostFocus')
                        ]);
                    // wijmo.input *************************************************************
                    case wijmo.input && wijmo.input.DropDown:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('isDroppedDown', PropertyType.Boolean, 'isDroppedDownChanged'),
                            this.CreateProp('showDropDownButton', PropertyType.Boolean),
                            this.CreateProp('autoExpandSelection', PropertyType.Boolean),
                            this.CreateProp('placeholder', PropertyType.String),
                            this.CreateProp('dropDownCssClass', PropertyType.String),
                            this.CreateProp('isAnimated', PropertyType.Boolean),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('isRequired', PropertyType.Boolean),
                            this.CreateProp('text', PropertyType.String, 'textChanged', null, true, 1000) // textChanged
                        ], [
                            this.CreateEvent('isDroppedDownChanging'),
                            this.CreateEvent('isDroppedDownChanged', true),
                            this.CreateEvent('textChanged', true)
                        ]);
                    case wijmo.input && wijmo.input.ComboBox:
                        return this.getMetaData(wijmo.input.DropDown).add([
                            this.CreateProp('displayMemberPath', PropertyType.String),
                            this.CreateProp('selectedValuePath', PropertyType.String),
                            this.CreateProp('headerPath', PropertyType.String),
                            this.CreateProp('isContentHtml', PropertyType.Boolean),
                            this.CreateProp('isEditable', PropertyType.Boolean),
                            this.CreateProp('maxDropDownHeight', PropertyType.Number),
                            this.CreateProp('maxDropDownWidth', PropertyType.Number),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('itemsSource', PropertyType.Any, '', null, true, 900),
                            this.CreateProp('selectedIndex', PropertyType.Number, 'selectedIndexChanged', null, true, 1000),
                            this.CreateProp('selectedItem', PropertyType.Any, 'selectedIndexChanged', null, true, 1000),
                            this.CreateProp('selectedValue', PropertyType.Any, 'selectedIndexChanged', null, true, 1000),
                        ], [
                            this.CreateEvent('formatItem'),
                            this.CreateEvent('selectedIndexChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'selectedValue' });
                    case wijmo.input && wijmo.input.AutoComplete:
                        return this.getMetaData(wijmo.input.ComboBox).add([
                            this.CreateProp('delay', PropertyType.Number),
                            this.CreateProp('maxItems', PropertyType.Number),
                            this.CreateProp('minLength', PropertyType.Number),
                            this.CreateProp('cssMatch', PropertyType.String),
                            this.CreateProp('itemsSourceFunction', PropertyType.Function),
                            this.CreateProp('searchMemberPath', PropertyType.String)
                        ]);
                    case wijmo.input && wijmo.input.Calendar:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('monthView', PropertyType.Boolean),
                            this.CreateProp('showHeader', PropertyType.Boolean),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('itemValidator', PropertyType.Function),
                            this.CreateProp('firstDayOfWeek', PropertyType.Number),
                            this.CreateProp('max', PropertyType.Date),
                            this.CreateProp('min', PropertyType.Date),
                            this.CreateProp('formatYearMonth', PropertyType.String),
                            this.CreateProp('formatDayHeaders', PropertyType.String),
                            this.CreateProp('formatDays', PropertyType.String),
                            this.CreateProp('formatYear', PropertyType.String),
                            this.CreateProp('formatMonths', PropertyType.String),
                            this.CreateProp('selectionMode', PropertyType.Enum, '', wijmo.input.DateSelectionMode),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('value', PropertyType.Date, 'valueChanged'),
                            // displayMonth should go after 'value'!
                            this.CreateProp('displayMonth', PropertyType.Date, 'displayMonthChanged'),
                        ], [
                            this.CreateEvent('valueChanged', true),
                            this.CreateEvent('displayMonthChanged', true),
                            this.CreateEvent('formatItem', false)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.ColorPicker:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('showAlphaChannel', PropertyType.Boolean),
                            this.CreateProp('showColorString', PropertyType.Boolean),
                            this.CreateProp('palette', PropertyType.Any),
                            this.CreateProp('value', PropertyType.String, 'valueChanged')
                        ], [
                            this.CreateEvent('valueChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.ListBox:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('isContentHtml', PropertyType.Boolean),
                            this.CreateProp('maxHeight', PropertyType.Number),
                            this.CreateProp('selectedValuePath', PropertyType.String),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('displayMemberPath', PropertyType.String),
                            this.CreateProp('checkedMemberPath', PropertyType.String),
                            this.CreateProp('itemsSource', PropertyType.Any),
                            this.CreateProp('selectedIndex', PropertyType.Number, 'selectedIndexChanged'),
                            this.CreateProp('selectedItem', PropertyType.Any, 'selectedIndexChanged'),
                            this.CreateProp('selectedValue', PropertyType.Any, 'selectedIndexChanged'),
                            this.CreateProp('checkedItems', PropertyType.Any, 'checkedItemsChanged'),
                        ], [
                            this.CreateEvent('formatItem', false),
                            this.CreateEvent('itemsChanged', true),
                            //AlexI: isPropChanged must be true, in order to run a digest and update bound expressions
                            this.CreateEvent('itemChecked', true),
                            this.CreateEvent('selectedIndexChanged', true),
                            this.CreateEvent('checkedItemsChanged', true),
                        ])
                            .addOptions({ ngModelProperty: 'selectedValue' });
                    case 'ItemTemplate':
                        return new MetaDataBase([], [], [], undefined, undefined, undefined, 'owner');
                    case wijmo.input && wijmo.input.Menu:
                        return this.getMetaData(wijmo.input.ComboBox).add([
                            this.CreateProp('header', PropertyType.String),
                            this.CreateProp('commandParameterPath', PropertyType.String),
                            this.CreateProp('commandPath', PropertyType.String),
                            this.CreateProp('isButton', PropertyType.Boolean),
                            //this.CreateProp('value', PropertyType.Any, 'selectedIndexChanged', null, false, 1000)
                            this.CreateProp('value', PropertyType.Any, 'itemClicked', null, false, 1000)
                        ], [
                            this.CreateEvent('itemClicked')
                        ]);
                    case 'MenuItem':
                        return new MetaDataBase([
                            //TBD: check whether they should be two-way
                            //this.CreateProp('value', PropertyType.String, BindingMode.TwoWay),
                            //this.CreateProp('cmd', PropertyType.String, BindingMode.TwoWay),
                            //this.CreateProp('cmdParam', PropertyType.String, BindingMode.TwoWay)
                            this.CreateProp('value', PropertyType.Any, ''),
                            this.CreateProp('cmd', PropertyType.Any, ''),
                            this.CreateProp('cmdParam', PropertyType.Any, '')
                        ], [], [], 'itemsSource', true);
                    case 'MenuSeparator':
                        return new MetaDataBase([], [], [], 'itemsSource', true);
                    case wijmo.input && wijmo.input.InputDate:
                        return this.getMetaData(wijmo.input.DropDown).add([
                            this.CreateProp('selectionMode', PropertyType.Enum, '', wijmo.input.DateSelectionMode),
                            this.CreateProp('format', PropertyType.String),
                            this.CreateProp('mask', PropertyType.String),
                            this.CreateProp('max', PropertyType.Date),
                            this.CreateProp('min', PropertyType.Date),
                            this.CreateProp('inputType', PropertyType.String),
                            this.CreateProp('value', PropertyType.Date, 'valueChanged', null, true, 1000),
                            this.CreateProp('itemValidator', PropertyType.Function),
                            this.CreateProp('itemFormatter', PropertyType.Function)
                        ], [
                            this.CreateEvent('valueChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.InputDateTime:
                        return this.getMetaData(wijmo.input.InputDate).add([
                            this.CreateProp('timeMax', PropertyType.Date),
                            this.CreateProp('timeMin', PropertyType.Date),
                            this.CreateProp('timeStep', PropertyType.Number),
                            this.CreateProp('timeFormat', PropertyType.String),
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.InputNumber:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('showSpinner', PropertyType.Boolean),
                            this.CreateProp('max', PropertyType.Number),
                            this.CreateProp('min', PropertyType.Number),
                            this.CreateProp('step', PropertyType.Number),
                            this.CreateProp('isRequired', PropertyType.Boolean),
                            this.CreateProp('placeholder', PropertyType.String),
                            this.CreateProp('inputType', PropertyType.String),
                            this.CreateProp('format', PropertyType.String),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('value', PropertyType.Number, 'valueChanged'),
                            this.CreateProp('text', PropertyType.String, 'textChanged')
                        ], [
                            this.CreateEvent('valueChanged', true),
                            this.CreateEvent('textChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.InputMask:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('mask', PropertyType.String),
                            this.CreateProp('isRequired', PropertyType.Boolean),
                            this.CreateProp('promptChar', PropertyType.String),
                            this.CreateProp('placeholder', PropertyType.String),
                            this.CreateProp('rawValue', PropertyType.String, 'valueChanged'),
                            this.CreateProp('value', PropertyType.String, 'valueChanged')
                        ], [
                            this.CreateEvent('valueChanged', true),
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.InputTime:
                        return this.getMetaData(wijmo.input.ComboBox).add([
                            this.CreateProp('max', PropertyType.Date),
                            this.CreateProp('min', PropertyType.Date),
                            this.CreateProp('step', PropertyType.Number),
                            this.CreateProp('format', PropertyType.String),
                            this.CreateProp('mask', PropertyType.String),
                            this.CreateProp('inputType', PropertyType.String),
                            this.CreateProp('value', PropertyType.Date, 'valueChanged', null, true, 1000),
                        ], [
                            this.CreateEvent('valueChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.InputColor:
                        return this.getMetaData(wijmo.input.DropDown).add([
                            this.CreateProp('showAlphaChannel', PropertyType.Boolean),
                            this.CreateProp('value', PropertyType.String, 'valueChanged')
                        ], [
                            this.CreateEvent('valueChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    case wijmo.input && wijmo.input.Popup:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('owner', PropertyType.String),
                            this.CreateProp('showTrigger', PropertyType.Enum, '', wijmo.input.PopupTrigger),
                            this.CreateProp('hideTrigger', PropertyType.Enum, '', wijmo.input.PopupTrigger),
                            this.CreateProp('fadeIn', PropertyType.Boolean),
                            this.CreateProp('fadeOut', PropertyType.Boolean),
                            this.CreateProp('dialogResultEnter', PropertyType.String),
                            this.CreateProp('modal', PropertyType.Boolean),
                            this.CreateProp('removeOnHide', PropertyType.Boolean)
                        ], [
                            this.CreateEvent('showing'),
                            this.CreateEvent('shown'),
                            this.CreateEvent('hiding'),
                            this.CreateEvent('hidden'),
                        ]);
                    case wijmo.input && wijmo.input.MultiSelect:
                        return this.getMetaData(wijmo.input.ComboBox).add([
                            this.CreateProp('checkedMemberPath', PropertyType.String),
                            this.CreateProp('maxHeaderItems', PropertyType.Number),
                            this.CreateProp('headerFormat', PropertyType.String),
                            this.CreateProp('headerFormatter', PropertyType.Function),
                            this.CreateProp('showSelectAllCheckbox', PropertyType.Boolean),
                            this.CreateProp('selectAllLabel', PropertyType.String),
                            // initialized after itemsSource but before selectedXXX
                            this.CreateProp('checkedItems', PropertyType.Any, 'checkedItemsChanged', BindingMode.TwoWay, true, 950),
                        ], [
                            this.CreateEvent('checkedItemsChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'checkedItems' });
                    case 'CollectionViewNavigator':
                        return new MetaDataBase([
                            this.CreateProp('cv', PropertyType.Any)
                        ]);
                    case 'CollectionViewPager':
                        return new MetaDataBase([
                            this.CreateProp('cv', PropertyType.Any)
                        ]);
                    case wijmo.input && wijmo.input.MultiAutoComplete:
                        return this.getMetaData(wijmo.input.AutoComplete).add([
                            this.CreateProp('maxSelectedItems', PropertyType.Number),
                            this.CreateProp('selectedMemberPath', PropertyType.String, '', null, true, 950),
                            this.CreateProp('selectedItems', PropertyType.Any, 'selectedItemsChanged'),
                        ], [
                            this.CreateEvent('selectedItemsChanged', true)
                        ])
                            .addOptions({ ngModelProperty: 'selectedItems' });
                    // wijmo.grid *************************************************************
                    case wijmo.grid && wijmo.grid.FlexGrid:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('newRowAtTop', PropertyType.Boolean),
                            this.CreateProp('allowAddNew', PropertyType.Boolean),
                            this.CreateProp('allowDelete', PropertyType.Boolean),
                            this.CreateProp('allowDragging', PropertyType.Enum, '', wijmo.grid.AllowDragging),
                            this.CreateProp('allowMerging', PropertyType.Enum, '', wijmo.grid.AllowMerging),
                            this.CreateProp('allowResizing', PropertyType.Enum, '', wijmo.grid.AllowResizing),
                            this.CreateProp('allowSorting', PropertyType.Boolean),
                            this.CreateProp('quickAutoSize', PropertyType.Boolean),
                            this.CreateProp('autoSizeMode', PropertyType.Enum, '', wijmo.grid.AutoSizeMode),
                            this.CreateProp('autoGenerateColumns', PropertyType.Boolean),
                            this.CreateProp('childItemsPath', PropertyType.Any),
                            this.CreateProp('groupHeaderFormat', PropertyType.String),
                            this.CreateProp('headersVisibility', PropertyType.Enum, '', wijmo.grid.HeadersVisibility),
                            this.CreateProp('showSelectedHeaders', PropertyType.Enum, '', wijmo.grid.HeadersVisibility),
                            this.CreateProp('showMarquee', PropertyType.Boolean),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('imeEnabled', PropertyType.Boolean),
                            this.CreateProp('mergeManager', PropertyType.Any),
                            // REVIEW: This breaks the grid too, see TFS 82636
                            //this.CreateProp('scrollPosition', PropertyType.Any, '='),
                            // REVIEW: this screws up the grid when selectionMode == ListBox.
                            // When the directive applies a selection to the grid and selectionMode == ListBox,
                            // the grid clears the row[x].isSelected properties of rows that are not in the selection.
                            // I think a possible fix would be for the directive to not set the grid's selection if it
                            // is the same range as the current selection property. I cannot do that in the grid because
                            // when the user does it, this side-effect is expected.
                            //this.CreateProp('selection', PropertyType.Any, '='),
                            //this.CreateProp('columnLayout', ...),
                            this.CreateProp('selectionMode', PropertyType.Enum, '', wijmo.grid.SelectionMode),
                            this.CreateProp('showGroups', PropertyType.Boolean),
                            this.CreateProp('showSort', PropertyType.Boolean),
                            this.CreateProp('showDropDown', PropertyType.Boolean),
                            this.CreateProp('showAlternatingRows', PropertyType.Boolean),
                            this.CreateProp('showErrors', PropertyType.Boolean),
                            this.CreateProp('validateEdits', PropertyType.Boolean),
                            this.CreateProp('treeIndent', PropertyType.Number),
                            this.CreateProp('itemsSource', PropertyType.Any),
                            this.CreateProp('autoClipboard', PropertyType.Boolean),
                            this.CreateProp('frozenRows', PropertyType.Number),
                            this.CreateProp('frozenColumns', PropertyType.Number),
                            this.CreateProp('cloneFrozenCells', PropertyType.Boolean),
                            this.CreateProp('deferResizing', PropertyType.Boolean),
                            this.CreateProp('sortRowIndex', PropertyType.Number),
                            this.CreateProp('stickyHeaders', PropertyType.Boolean),
                            this.CreateProp('preserveSelectedState', PropertyType.Boolean),
                            this.CreateProp('preserveOutlineState', PropertyType.Boolean),
                            this.CreateProp('keyActionTab', PropertyType.Enum, '', wijmo.grid.KeyAction),
                            this.CreateProp('keyActionEnter', PropertyType.Enum, '', wijmo.grid.KeyAction),
                            this.CreateProp('rowHeaderPath', PropertyType.String),
                            this.CreateProp('virtualizationThreshold', PropertyType.Number)
                        ], [
                            // Cell events
                            this.CreateEvent('beginningEdit'),
                            this.CreateEvent('cellEditEnded'),
                            this.CreateEvent('cellEditEnding'),
                            this.CreateEvent('prepareCellForEdit'),
                            this.CreateEvent('formatItem'),
                            // Column events
                            this.CreateEvent('resizingColumn'),
                            this.CreateEvent('resizedColumn'),
                            this.CreateEvent('autoSizingColumn'),
                            this.CreateEvent('autoSizedColumn'),
                            this.CreateEvent('draggingColumn'),
                            this.CreateEvent('draggingColumnOver'),
                            this.CreateEvent('draggedColumn'),
                            this.CreateEvent('sortingColumn'),
                            this.CreateEvent('sortedColumn'),
                            // Row Events
                            this.CreateEvent('resizingRow'),
                            this.CreateEvent('resizedRow'),
                            this.CreateEvent('autoSizingRow'),
                            this.CreateEvent('autoSizedRow'),
                            this.CreateEvent('draggingRow'),
                            this.CreateEvent('draggingRowOver'),
                            this.CreateEvent('draggedRow'),
                            this.CreateEvent('deletingRow'),
                            this.CreateEvent('deletedRow'),
                            this.CreateEvent('loadingRows'),
                            this.CreateEvent('loadedRows'),
                            this.CreateEvent('rowEditStarting'),
                            this.CreateEvent('rowEditStarted'),
                            this.CreateEvent('rowEditEnding'),
                            this.CreateEvent('rowEditEnded'),
                            this.CreateEvent('rowAdded'),
                            this.CreateEvent('groupCollapsedChanged'),
                            this.CreateEvent('groupCollapsedChanging'),
                            this.CreateEvent('itemsSourceChanged', true),
                            this.CreateEvent('selectionChanging'),
                            this.CreateEvent('selectionChanged', true),
                            this.CreateEvent('scrollPositionChanged', false),
                            this.CreateEvent('updatingView'),
                            this.CreateEvent('updatedView'),
                            this.CreateEvent('updatingLayout'),
                            this.CreateEvent('updatedLayout'),
                            // Clipboard events
                            this.CreateEvent('pasting'),
                            this.CreateEvent('pasted'),
                            this.CreateEvent('pastingCell'),
                            this.CreateEvent('pastedCell'),
                            this.CreateEvent('copying'),
                            this.CreateEvent('copied')
                        ]);
                    case wijmo.grid && wijmo.grid.Column:
                        return new MetaDataBase([
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('dataMap', PropertyType.Any),
                            this.CreateProp('dataType', PropertyType.Enum, '', wijmo.DataType),
                            this.CreateProp('binding', PropertyType.String),
                            this.CreateProp('sortMemberPath', PropertyType.String),
                            this.CreateProp('format', PropertyType.String),
                            this.CreateProp('header', PropertyType.String),
                            this.CreateProp('width', PropertyType.Number),
                            this.CreateProp('maxLength', PropertyType.Number),
                            this.CreateProp('minWidth', PropertyType.Number),
                            this.CreateProp('maxWidth', PropertyType.Number),
                            this.CreateProp('align', PropertyType.String),
                            this.CreateProp('allowDragging', PropertyType.Boolean),
                            this.CreateProp('allowSorting', PropertyType.Boolean),
                            this.CreateProp('allowResizing', PropertyType.Boolean),
                            this.CreateProp('allowMerging', PropertyType.Boolean),
                            this.CreateProp('aggregate', PropertyType.Enum, '', wijmo.Aggregate),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('cssClass', PropertyType.String),
                            this.CreateProp('isContentHtml', PropertyType.Boolean),
                            this.CreateProp('isSelected', PropertyType.Boolean, 'grid.selectionChanged'),
                            this.CreateProp('visible', PropertyType.Boolean),
                            this.CreateProp('wordWrap', PropertyType.Boolean),
                            this.CreateProp('mask', PropertyType.String),
                            this.CreateProp('inputType', PropertyType.String),
                            this.CreateProp('isRequired', PropertyType.Boolean),
                            this.CreateProp('showDropDown', PropertyType.Boolean),
                            this.CreateProp('dropDownCssClass', PropertyType.String),
                            this.CreateProp('quickAutoSize', PropertyType.Boolean),
                        ], [], [], 'columns', true);
                    case 'FlexGridCellTemplate':
                        return new MetaDataBase([
                            this.CreateProp('cellType', PropertyType.String, '', null, false),
                            this.CreateProp('cellOverflow', PropertyType.String, ''),
                            this.CreateProp('forceFullEdit', PropertyType.Boolean),
                        ], [], [], undefined, undefined, undefined, 'owner');
                    case wijmo.grid && wijmo.grid.filter && wijmo.grid.filter.FlexGridFilter:
                        return new MetaDataBase([
                            this.CreateProp('showFilterIcons', PropertyType.Boolean),
                            this.CreateProp('showSortButtons', PropertyType.Boolean),
                            this.CreateProp('defaultFilterType', PropertyType.Enum, '', wijmo.grid.filter.FilterType),
                            this.CreateProp('filterColumns', PropertyType.Any),
                        ], [
                            this.CreateEvent('filterChanging'),
                            this.CreateEvent('filterChanged'),
                            this.CreateEvent('filterApplied')
                        ], [], undefined, undefined, undefined, '');
                    case wijmo.grid && wijmo.grid.grouppanel && wijmo.grid.grouppanel.GroupPanel:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('hideGroupedColumns', PropertyType.Boolean),
                            this.CreateProp('maxGroups', PropertyType.Number),
                            this.CreateProp('placeholder', PropertyType.String),
                            this.CreateProp('grid', PropertyType.Any),
                        ]);
                    case wijmo.grid && wijmo.grid.detail && wijmo.grid.detail.FlexGridDetailProvider:
                        return new MetaDataBase([
                            this.CreateProp('maxHeight', PropertyType.Number),
                            this.CreateProp('detailVisibilityMode', PropertyType.Enum, '', wijmo.grid.detail.DetailVisibilityMode),
                            this.CreateProp('rowHasDetail', PropertyType.Function),
                            this.CreateProp('isAnimated', PropertyType.Boolean),
                        ], [], [], undefined, undefined, undefined, '');
                    case wijmo.grid && wijmo.grid.sheet && wijmo.grid.sheet.FlexSheet:
                        return this.getMetaData(wijmo.grid.FlexGrid).add([
                            this.CreateProp('isTabHolderVisible', PropertyType.Boolean),
                            this.CreateProp('selectedSheetIndex', PropertyType.Number, 'selectedSheetChanged'),
                        ], [
                            this.CreateEvent('selectedSheetChanged', true),
                            this.CreateEvent('draggingRowColumn'),
                            this.CreateEvent('droppingRowColumn'),
                            this.CreateEvent('loaded'),
                            this.CreateEvent('unknownFunction'),
                            this.CreateEvent('sheetCleared')
                        ]);
                    case wijmo.grid && wijmo.grid.sheet && wijmo.grid.sheet.Sheet:
                        return new MetaDataBase([
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('itemsSource', PropertyType.Any),
                            this.CreateProp('visible', PropertyType.Boolean),
                            this.CreateProp('rowCount', PropertyType.Number, '', null, false),
                            this.CreateProp('columnCount', PropertyType.Number, '', null, false)
                        ], [
                            this.CreateEvent('nameChanged'),
                        ])
                            .addOptions({ parentReferenceProperty: '' });
                    case wijmo.grid && wijmo.grid.multirow && wijmo.grid.multirow.MultiRow:
                        return this.getMetaData(wijmo.grid.FlexGrid).add([
                            this.CreateProp('layoutDefinition', PropertyType.Any),
                            this.CreateProp('centerHeadersVertically', PropertyType.Boolean),
                            this.CreateProp('collapsedHeaders', PropertyType.Boolean),
                            this.CreateProp('showHeaderCollapseButton', PropertyType.Boolean)
                        ]);
                    // Chart *************************************************************
                    case wijmo.chart && wijmo.chart.FlexChartBase:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('binding', PropertyType.String),
                            this.CreateProp('footer', PropertyType.String),
                            this.CreateProp('header', PropertyType.String),
                            this.CreateProp('selectionMode', PropertyType.Enum, '', wijmo.chart.SelectionMode),
                            this.CreateProp('palette', PropertyType.Any),
                            this.CreateProp('plotMargin', PropertyType.Any),
                            this.CreateProp('footerStyle', PropertyType.Any),
                            this.CreateProp('headerStyle', PropertyType.Any),
                            this.CreateProp('tooltipContent', PropertyType.String, '', null, false),
                            this.CreateProp('itemsSource', PropertyType.Any)
                        ], [
                            this.CreateEvent('rendering'),
                            this.CreateEvent('rendered'),
                            this.CreateEvent('selectionChanged', true),
                        ]);
                    case wijmo.chart && wijmo.chart.FlexChartCore:
                        return this.getMetaData(wijmo.chart.FlexChartBase).add([
                            this.CreateProp('bindingX', PropertyType.String),
                            // this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.ChartType),
                            this.CreateProp('interpolateNulls', PropertyType.Boolean),
                            this.CreateProp('legendToggle', PropertyType.Boolean),
                            this.CreateProp('symbolSize', PropertyType.Number),
                            this.CreateProp('options', PropertyType.Any),
                            this.CreateProp('selection', PropertyType.Any, 'selectionChanged'),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('labelContent', PropertyType.String, '', null, false),
                        ], [
                            this.CreateEvent('seriesVisibilityChanged'),
                        ], [
                            this.CreateComplexProp('axisX', false, false),
                            this.CreateComplexProp('axisY', false, false),
                            this.CreateComplexProp('axes', true),
                            this.CreateComplexProp('plotAreas', true)
                        ]);
                    case wijmo.chart && wijmo.chart.FlexChart:
                        return this.getMetaData(wijmo.chart.FlexChartCore).add([
                            this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.ChartType),
                            this.CreateProp('rotated', PropertyType.Boolean),
                            this.CreateProp('stacking', PropertyType.Enum, '', wijmo.chart.Stacking),
                        ]);
                    case wijmo.chart && wijmo.chart.FlexPie:
                        return this.getMetaData(wijmo.chart.FlexChartBase).add([
                            this.CreateProp('bindingName', PropertyType.String),
                            this.CreateProp('innerRadius', PropertyType.Number),
                            this.CreateProp('isAnimated', PropertyType.Boolean),
                            this.CreateProp('offset', PropertyType.Number),
                            this.CreateProp('reversed', PropertyType.Boolean),
                            this.CreateProp('startAngle', PropertyType.Number),
                            this.CreateProp('selectedItemPosition', PropertyType.Enum, '', wijmo.chart.Position),
                            this.CreateProp('selectedItemOffset', PropertyType.Number),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('labelContent', PropertyType.String, '', null, false),
                        ]);
                    case wijmo.chart && wijmo.chart.FlexPie && wijmo.chart.hierarchical && wijmo.chart.hierarchical.Sunburst:
                        return this.getMetaData(wijmo.chart.FlexChartBase).add([
                            this.CreateProp('bindingName', PropertyType.Any),
                            this.CreateProp('innerRadius', PropertyType.Number),
                            this.CreateProp('isAnimated', PropertyType.Boolean),
                            this.CreateProp('offset', PropertyType.Number),
                            this.CreateProp('reversed', PropertyType.Boolean),
                            this.CreateProp('startAngle', PropertyType.Number),
                            this.CreateProp('selectedItemPosition', PropertyType.Enum, '', wijmo.chart.Position),
                            this.CreateProp('selectedItemOffset', PropertyType.Number),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('labelContent', PropertyType.String, '', null, false),
                            this.CreateProp('childItemsPath', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.hierarchical && wijmo.chart.hierarchical.TreeMap:
                        return this.getMetaData(wijmo.chart.FlexChartBase).add([
                            this.CreateProp('bindingName', PropertyType.Any),
                            this.CreateProp('maxDepth', PropertyType.Number),
                            this.CreateProp('type', PropertyType.Enum, '', wijmo.chart.hierarchical.TreeMapType),
                            this.CreateProp('labelContent', PropertyType.String, '', null, false),
                            this.CreateProp('childItemsPath', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.Axis:
                        return new MetaDataBase([
                            this.CreateProp('axisLine', PropertyType.Boolean),
                            this.CreateProp('format', PropertyType.String),
                            this.CreateProp('labels', PropertyType.Boolean),
                            this.CreateProp('majorGrid', PropertyType.Boolean),
                            this.CreateProp('majorTickMarks', PropertyType.Enum, '', wijmo.chart.TickMark),
                            this.CreateProp('majorUnit', PropertyType.Number),
                            this.CreateProp('max', PropertyType.Number),
                            this.CreateProp('min', PropertyType.Number),
                            this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.Position),
                            this.CreateProp('reversed', PropertyType.Boolean),
                            this.CreateProp('title', PropertyType.String),
                            this.CreateProp('labelAngle', PropertyType.Number),
                            this.CreateProp('minorGrid', PropertyType.Boolean),
                            this.CreateProp('minorTickMarks', PropertyType.Enum, '', wijmo.chart.TickMark),
                            this.CreateProp('minorUnit', PropertyType.Number),
                            this.CreateProp('origin', PropertyType.Number),
                            this.CreateProp('logBase', PropertyType.Number),
                            this.CreateProp('plotArea', PropertyType.Any),
                            this.CreateProp('labelAlign', PropertyType.String),
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('overlappingLabels', PropertyType.Enum, '', wijmo.chart.OverlappingLabels),
                            this.CreateProp('labelPadding', PropertyType.Number),
                            this.CreateProp('itemFormatter', PropertyType.Function),
                            this.CreateProp('itemsSource', PropertyType.Any),
                            this.CreateProp('binding', PropertyType.String),
                        ], [
                            this.CreateEvent('rangeChanged'),
                        ], [], 'axes', true); //use wj-property attribute on directive to define axisX or axisY
                    case wijmo.chart && wijmo.chart.Legend:
                        return new MetaDataBase([
                            this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.Position)
                        ], [], [], 'legend', false, false, '');
                    case wijmo.chart && wijmo.chart.DataLabelBase:
                        return new MetaDataBase([
                            this.CreateProp('content', PropertyType.Any, ''),
                            this.CreateProp('border', PropertyType.Boolean),
                            this.CreateProp('offset', PropertyType.Number),
                            this.CreateProp('connectingLine', PropertyType.Boolean),
                        ], [
                            this.CreateEvent('rendering'),
                        ], [], 'dataLabel', false, false);
                    case wijmo.chart && wijmo.chart.DataLabel:
                        return this.getMetaData(wijmo.chart.DataLabelBase).add([
                            this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.LabelPosition),
                        ]);
                    case wijmo.chart && wijmo.chart.PieDataLabel:
                        return this.getMetaData(wijmo.chart.DataLabelBase).add([
                            this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.PieLabelPosition),
                        ]);
                    case wijmo.chart && wijmo.chart.SeriesBase:
                        return new MetaDataBase([
                            this.CreateProp('axisX', PropertyType.Any),
                            this.CreateProp('axisY', PropertyType.Any),
                            this.CreateProp('binding', PropertyType.String),
                            this.CreateProp('bindingX', PropertyType.String),
                            this.CreateProp('cssClass', PropertyType.String),
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('style', PropertyType.Any),
                            this.CreateProp('altStyle', PropertyType.Any),
                            this.CreateProp('symbolMarker', PropertyType.Enum, '', wijmo.chart.Marker),
                            this.CreateProp('symbolSize', PropertyType.Number),
                            this.CreateProp('symbolStyle', PropertyType.Any),
                            this.CreateProp('visibility', PropertyType.Enum, 'chart.seriesVisibilityChanged', wijmo.chart.SeriesVisibility),
                            this.CreateProp('itemsSource', PropertyType.Any),
                        ], [
                            this.CreateEvent('rendering'),
                            this.CreateEvent('rendered')
                        ], [
                            this.CreateComplexProp('axisX', false, true),
                            this.CreateComplexProp('axisY', false, true),
                        ], 'series', true);
                    case wijmo.chart && wijmo.chart.Series:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.ChartType)
                        ]);
                    case wijmo.chart && wijmo.chart.LineMarker:
                        return new MetaDataBase([
                            this.CreateProp('isVisible', PropertyType.Boolean),
                            this.CreateProp('seriesIndex', PropertyType.Number),
                            this.CreateProp('horizontalPosition', PropertyType.Number),
                            this.CreateProp('content', PropertyType.Function),
                            this.CreateProp('verticalPosition', PropertyType.Number),
                            this.CreateProp('alignment', PropertyType.Enum, '', wijmo.chart.LineMarkerAlignment),
                            this.CreateProp('lines', PropertyType.Enum, '', wijmo.chart.LineMarkerLines),
                            this.CreateProp('interaction', PropertyType.Enum, '', wijmo.chart.LineMarkerInteraction),
                            this.CreateProp('dragLines', PropertyType.Boolean),
                            this.CreateProp('dragThreshold', PropertyType.Number),
                            this.CreateProp('dragContent', PropertyType.Boolean),
                        ], [
                            this.CreateEvent('positionChanged'),
                        ], [], undefined, undefined, undefined, '');
                    case wijmo.chart && wijmo.chart.DataPoint:
                        return new MetaDataBase([
                            this.CreateProp('x', PropertyType.AnyPrimitive),
                            this.CreateProp('y', PropertyType.AnyPrimitive)
                        ], [], [], '');
                    case wijmo.chart && wijmo.chart.annotation && wijmo.chart.annotation.AnnotationLayer:
                        return new MetaDataBase([], [], [], undefined, undefined, undefined, '');
                    case 'FlexChartAnnotation':
                        return new MetaDataBase([
                            this.CreateProp('type', PropertyType.String, '', null, false),
                            this.CreateProp('attachment', PropertyType.Enum, '', wijmo.chart.annotation.AnnotationAttachment),
                            this.CreateProp('position', PropertyType.Enum, '', wijmo.chart.annotation.AnnotationPosition),
                            this.CreateProp('point', PropertyType.Any),
                            this.CreateProp('seriesIndex', PropertyType.Number),
                            this.CreateProp('pointIndex', PropertyType.Number),
                            this.CreateProp('offset', PropertyType.Any),
                            this.CreateProp('style', PropertyType.Any),
                            this.CreateProp('isVisible', PropertyType.Boolean),
                            this.CreateProp('tooltip', PropertyType.String),
                            this.CreateProp('text', PropertyType.String),
                            this.CreateProp('content', PropertyType.String),
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('width', PropertyType.Number),
                            this.CreateProp('height', PropertyType.Number),
                            this.CreateProp('start', PropertyType.Any),
                            this.CreateProp('end', PropertyType.Any),
                            this.CreateProp('radius', PropertyType.Number),
                            this.CreateProp('length', PropertyType.Number),
                            this.CreateProp('href', PropertyType.String)
                        ], [], [
                            this.CreateComplexProp('point', false, true),
                            this.CreateComplexProp('start', false, true),
                            this.CreateComplexProp('end', false, true),
                            this.CreateComplexProp('points', true),
                        ], 'items', true);
                    case wijmo.chart && wijmo.chart.interaction && wijmo.chart.interaction.RangeSelector:
                        return new MetaDataBase([
                            this.CreateProp('isVisible', PropertyType.Boolean),
                            this.CreateProp('min', PropertyType.Number),
                            this.CreateProp('max', PropertyType.Number),
                            this.CreateProp('orientation', PropertyType.Enum, '', wijmo.chart.interaction.Orientation),
                            this.CreateProp('seamless', PropertyType.Boolean),
                            this.CreateProp('minScale', PropertyType.Number),
                            this.CreateProp('maxScale', PropertyType.Number),
                        ], [
                            this.CreateEvent('rangeChanged'),
                        ], [], undefined, undefined, undefined, '');
                    case wijmo.chart && wijmo.chart.interaction && wijmo.chart.interaction.ChartGestures:
                        return new MetaDataBase([
                            this.CreateProp('mouseAction', PropertyType.Enum, '', wijmo.chart.interaction.MouseAction),
                            this.CreateProp('interactiveAxes', PropertyType.Enum, '', wijmo.chart.interaction.InteractiveAxes),
                            this.CreateProp('enable', PropertyType.Boolean),
                            this.CreateProp('scaleX', PropertyType.Number),
                            this.CreateProp('scaleY', PropertyType.Number),
                            this.CreateProp('posX', PropertyType.Number),
                            this.CreateProp('posY', PropertyType.Number),
                        ], [], [], undefined, undefined, undefined, '');
                    case wijmo.chart && wijmo.chart.animation && wijmo.chart.animation.ChartAnimation:
                        return new MetaDataBase([
                            this.CreateProp('animationMode', PropertyType.Enum, '', wijmo.chart.animation.AnimationMode),
                            this.CreateProp('easing', PropertyType.Enum, '', wijmo.chart.animation.Easing),
                            this.CreateProp('duration', PropertyType.Number),
                            this.CreateProp('axisAnimation', PropertyType.Boolean)
                        ], [], [], undefined, undefined, undefined, '');
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.FinancialChart:
                        return this.getMetaData(wijmo.chart.FlexChartCore).add([
                            this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.finance.FinancialChartType),
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.FinancialSeries:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.finance.FinancialChartType)
                        ]);
                    case wijmo.chart && wijmo.chart.radar && wijmo.chart.radar.FlexRadar:
                        return this.getMetaData(wijmo.chart.FlexChartCore).add([
                            this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.radar.RadarChartType),
                            this.CreateProp('startAngle', PropertyType.Number),
                            this.CreateProp('totalAngle', PropertyType.Number),
                            this.CreateProp('reversed', PropertyType.Boolean),
                            this.CreateProp('stacking', PropertyType.Enum, '', wijmo.chart.Stacking)
                        ]);
                    case wijmo.chart && wijmo.chart.radar && wijmo.chart.radar.FlexRadarSeries:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('chartType', PropertyType.Enum, '', wijmo.chart.radar.RadarChartType)
                        ]);
                    case wijmo.chart && wijmo.chart.radar && wijmo.chart.radar.FlexRadarAxis:
                        return this.getMetaData(wijmo.chart.Axis);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.TrendLineBase:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('sampleCount', PropertyType.Number)
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.TrendLine:
                        return this.getMetaData(wijmo.chart.analytics.TrendLineBase).add([
                            this.CreateProp('order', PropertyType.Number),
                            this.CreateProp('fitType', PropertyType.Enum, '', wijmo.chart.analytics.TrendLineFitType)
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.MovingAverage:
                        return this.getMetaData(wijmo.chart.analytics.TrendLineBase).add([
                            this.CreateProp('period', PropertyType.Number),
                            this.CreateProp('type', PropertyType.Enum, '', wijmo.chart.analytics.MovingAverageType)
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.FunctionSeries:
                        return this.getMetaData(wijmo.chart.analytics.TrendLineBase).add([
                            this.CreateProp('min', PropertyType.Number),
                            this.CreateProp('max', PropertyType.Number),
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.YFunctionSeries:
                        return this.getMetaData(wijmo.chart.analytics.FunctionSeries).add([
                            this.CreateProp('func', PropertyType.Function),
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.ParametricFunctionSeries:
                        return this.getMetaData(wijmo.chart.analytics.FunctionSeries).add([
                            //Add func property for xFunc property in angular1.
                            //Attribute names beginning with "x-" is reserved for user agent use, 'x-func' is parsed to 'func'
                            //Set func value to xFunc property in WjFlexChartParametricFunctionSeries._initProps function in wijmo.angular.chart.ts file.
                            this.CreateProp('func', PropertyType.Function),
                            this.CreateProp('xFunc', PropertyType.Function),
                            this.CreateProp('yFunc', PropertyType.Function),
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.Waterfall:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('relativeData', PropertyType.Boolean),
                            this.CreateProp('start', PropertyType.Number),
                            this.CreateProp('startLabel', PropertyType.String),
                            this.CreateProp('showTotal', PropertyType.Boolean),
                            this.CreateProp('totalLabel', PropertyType.String),
                            this.CreateProp('showIntermediateTotal', PropertyType.Boolean),
                            this.CreateProp('intermediateTotalPositions', PropertyType.Any),
                            this.CreateProp('intermediateTotalLabels', PropertyType.Any),
                            this.CreateProp('connectorLines', PropertyType.Boolean),
                            this.CreateProp('styles', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.BoxWhisker:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('quartileCalculation', PropertyType.Enum, '', wijmo.chart.analytics.QuartileCalculation),
                            this.CreateProp('groupWidth', PropertyType.Number),
                            this.CreateProp('gapWidth', PropertyType.Number),
                            this.CreateProp('showMeanLine', PropertyType.Boolean),
                            this.CreateProp('meanLineStyle', PropertyType.Any),
                            this.CreateProp('showMeanMarker', PropertyType.Boolean),
                            this.CreateProp('meanMarkerStyle', PropertyType.Any),
                            this.CreateProp('showInnerPoints', PropertyType.Boolean),
                            this.CreateProp('showOutliers', PropertyType.Boolean)
                        ]);
                    case wijmo.chart && wijmo.chart.analytics && wijmo.chart.analytics.ErrorBar:
                        return this.getMetaData(wijmo.chart.Series).add([
                            this.CreateProp('errorBarStyle', PropertyType.Any),
                            this.CreateProp('value', PropertyType.Any),
                            this.CreateProp('errorAmount', PropertyType.Enum, '', wijmo.chart.analytics.ErrorAmount),
                            this.CreateProp('endStyle', PropertyType.Enum, '', wijmo.chart.analytics.ErrorBarEndStyle),
                            this.CreateProp('direction', PropertyType.Enum, '', wijmo.chart.analytics.ErrorBarDirection)
                        ]);
                    case wijmo.chart && wijmo.chart.PlotArea:
                        return new MetaDataBase([
                            this.CreateProp('column', PropertyType.Number),
                            this.CreateProp('height', PropertyType.String),
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('row', PropertyType.Number),
                            this.CreateProp('style', PropertyType.Any),
                            this.CreateProp('width', PropertyType.String),
                        ], [], [], 'plotAreas', true);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.Fibonacci:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('high', PropertyType.Number),
                            this.CreateProp('low', PropertyType.Number),
                            this.CreateProp('labelPosition', PropertyType.Enum, '', wijmo.chart.LabelPosition),
                            this.CreateProp('levels', PropertyType.Any),
                            this.CreateProp('minX', PropertyType.AnyPrimitive),
                            this.CreateProp('maxX', PropertyType.AnyPrimitive),
                            this.CreateProp('uptrend', PropertyType.Boolean)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.FibonacciTimeZones:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('startX', PropertyType.Any),
                            this.CreateProp('endX', PropertyType.Any),
                            this.CreateProp('labelPosition', PropertyType.Enum, '', wijmo.chart.LabelPosition),
                            this.CreateProp('levels', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.FibonacciArcs:
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.FibonacciFans:
                        return this.getMetaData(wijmo.chart.SeriesBase).add([
                            this.CreateProp('start', PropertyType.Any),
                            this.CreateProp('end', PropertyType.Any),
                            this.CreateProp('labelPosition', PropertyType.Enum, '', wijmo.chart.LabelPosition),
                            this.CreateProp('levels', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.OverlayIndicatorBase:
                        return this.getMetaData(wijmo.chart.SeriesBase);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.SingleOverlayIndicatorBase:
                        return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                            this.CreateProp('period', PropertyType.Number)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.MacdBase:
                        return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                            this.CreateProp('fastPeriod', PropertyType.Number),
                            this.CreateProp('slowPeriod', PropertyType.Number),
                            this.CreateProp('smoothingPeriod', PropertyType.Number)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.Macd:
                        return this.getMetaData(wijmo.chart.finance.analytics.MacdBase).add([
                            this.CreateProp('styles', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.MacdHistogram:
                        return this.getMetaData(wijmo.chart.finance.analytics.MacdBase);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.ATR:
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.RSI:
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.WilliamsR:
                        return this.getMetaData(wijmo.chart.finance.analytics.SingleOverlayIndicatorBase);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.CCI:
                        return this.getMetaData(wijmo.chart.finance.analytics.SingleOverlayIndicatorBase).add([
                            this.CreateProp('constant', PropertyType.Number)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.Stochastic:
                        return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                            this.CreateProp('dPeriod', PropertyType.Number),
                            this.CreateProp('kPeriod', PropertyType.Number),
                            this.CreateProp('smoothingPeriod', PropertyType.Number),
                            this.CreateProp('styles', PropertyType.Any)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.Envelopes:
                        return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                            this.CreateProp('period', PropertyType.Number),
                            this.CreateProp('size', PropertyType.Number),
                            this.CreateProp('type', PropertyType.Enum, '', wijmo.chart.finance.analytics.MovingAverageType)
                        ]);
                    case wijmo.chart && wijmo.chart.finance && wijmo.chart.finance.analytics && wijmo.chart.finance.analytics.BollingerBands:
                        return this.getMetaData(wijmo.chart.finance.analytics.OverlayIndicatorBase).add([
                            this.CreateProp('period', PropertyType.Number),
                            this.CreateProp('multiplier', PropertyType.Number)
                        ]);
                    // *************************** Gauge *************************************************************
                    //case 'Gauge':
                    case wijmo.gauge && wijmo.gauge.Gauge:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('value', PropertyType.Number, 'valueChanged'),
                            this.CreateProp('min', PropertyType.Number),
                            this.CreateProp('max', PropertyType.Number),
                            this.CreateProp('origin', PropertyType.Number),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('step', PropertyType.Number),
                            this.CreateProp('format', PropertyType.String),
                            this.CreateProp('thickness', PropertyType.Number),
                            this.CreateProp('hasShadow', PropertyType.Boolean),
                            this.CreateProp('isAnimated', PropertyType.Boolean),
                            this.CreateProp('showText', PropertyType.Enum, '', wijmo.gauge.ShowText),
                            this.CreateProp('showTicks', PropertyType.Boolean),
                            this.CreateProp('showRanges', PropertyType.Boolean),
                            this.CreateProp('thumbSize', PropertyType.Number),
                            this.CreateProp('tickSpacing', PropertyType.Number),
                            this.CreateProp('getText', PropertyType.Function)
                        ], [
                            this.CreateEvent('valueChanged', true)
                        ], [
                            this.CreateComplexProp('ranges', true),
                            this.CreateComplexProp('pointer', false, false),
                            this.CreateComplexProp('face', false, false)
                        ])
                            .addOptions({ ngModelProperty: 'value' });
                    //case 'LinearGauge':
                    case wijmo.gauge && wijmo.gauge.LinearGauge:
                        return this.getMetaData(wijmo.gauge.Gauge).add([
                            this.CreateProp('direction', PropertyType.Enum, '', wijmo.gauge.GaugeDirection)
                        ]);
                    case wijmo.gauge && wijmo.gauge.BulletGraph:
                        return this.getMetaData(wijmo.gauge.LinearGauge).add([
                            this.CreateProp('target', PropertyType.Number),
                            this.CreateProp('good', PropertyType.Number),
                            this.CreateProp('bad', PropertyType.Number)
                        ]);
                    case wijmo.gauge && wijmo.gauge.RadialGauge:
                        return this.getMetaData(wijmo.gauge.Gauge).add([
                            this.CreateProp('autoScale', PropertyType.Boolean),
                            this.CreateProp('startAngle', PropertyType.Number),
                            this.CreateProp('sweepAngle', PropertyType.Number)
                        ]);
                    case wijmo.gauge && wijmo.gauge.Range:
                        return new MetaDataBase([
                            this.CreateProp('color', PropertyType.String),
                            this.CreateProp('min', PropertyType.Number),
                            this.CreateProp('max', PropertyType.Number),
                            this.CreateProp('name', PropertyType.String),
                            this.CreateProp('thickness', PropertyType.Number)
                        ], [], [], 'ranges', true);
                    // *************************** Olap *************************************************************
                    case wijmo.olap && wijmo.olap.PivotGrid:
                        return this.getMetaData(wijmo.grid.FlexGrid).add([
                            this.CreateProp('showDetailOnDoubleClick', PropertyType.Boolean),
                            this.CreateProp('customContextMenu', PropertyType.Boolean),
                            this.CreateProp('collapsibleSubtotals', PropertyType.Boolean),
                            this.CreateProp('centerHeadersVertically', PropertyType.Boolean),
                            this.CreateProp('showColumnFieldHeaders', PropertyType.Boolean),
                            this.CreateProp('showRowFieldHeaders', PropertyType.Boolean),
                        ]);
                    case wijmo.olap && wijmo.olap.PivotChart:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('chartType', PropertyType.Enum, '', wijmo.olap.PivotChartType),
                            this.CreateProp('showHierarchicalAxes', PropertyType.Boolean),
                            this.CreateProp('showTotals', PropertyType.Boolean),
                            this.CreateProp('showTitle', PropertyType.Boolean),
                            this.CreateProp('showLegend', PropertyType.Enum, '', wijmo.olap.LegendVisibility),
                            this.CreateProp('legendPosition', PropertyType.Enum, '', wijmo.chart.Position),
                            this.CreateProp('stacking', PropertyType.Enum, '', wijmo.chart.Stacking),
                            this.CreateProp('maxSeries', PropertyType.Number),
                            this.CreateProp('maxPoints', PropertyType.Number),
                            this.CreateProp('itemsSource', PropertyType.Any),
                        ]);
                    case wijmo.olap && wijmo.olap.PivotPanel:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('autoGenerateFields', PropertyType.Boolean),
                            this.CreateProp('viewDefinition', PropertyType.String),
                            this.CreateProp('engine', PropertyType.Any),
                            this.CreateProp('itemsSource', PropertyType.Any),
                        ], [
                            this.CreateEvent('itemsSourceChanged'),
                            this.CreateEvent('viewDefinitionChanged'),
                            this.CreateEvent('updatingView'),
                            this.CreateEvent('updatedView')
                        ]);
                    case wijmo.olap && wijmo.olap.PivotField:
                        return new MetaDataBase([
                            this.CreateProp('binding', PropertyType.String),
                            this.CreateProp('header', PropertyType.String),
                            this.CreateProp('dataType', PropertyType.Enum, '', wijmo.DataType),
                        ], [], [], '', true, true, '');
                    // *************************** ReportViewer *************************************************************
                    case wijmo.viewer && wijmo.viewer.ViewerBase:
                        return new MetaDataBase([
                            this.CreateProp('serviceUrl', PropertyType.String),
                            this.CreateProp('filePath', PropertyType.String),
                            this.CreateProp('fullScreen', PropertyType.Boolean, 'fullScreenChanged'),
                            this.CreateProp('zoomFactor', PropertyType.Number, 'zoomFactorChanged'),
                            this.CreateProp('mouseMode', PropertyType.Enum, 'mouseModeChanged', wijmo.viewer.MouseMode),
                            this.CreateProp('selectMouseMode', PropertyType.Boolean, 'selectMouseModeChanged'),
                            this.CreateProp('viewMode', PropertyType.Enum, 'viewModeChanged', wijmo.viewer.ViewMode),
                        ], [
                            this.CreateEvent('pageIndexChanged'),
                            this.CreateEvent('viewModeChanged'),
                            this.CreateEvent('mouseModeChanged'),
                            this.CreateEvent('selectMouseModeChanged'),
                            this.CreateEvent('fullScreenChanged'),
                            this.CreateEvent('zoomFactorChanged', true),
                            this.CreateEvent('queryLoadingData')
                        ]);
                    case wijmo.viewer && wijmo.viewer.ReportViewer:
                        return this.getMetaData(wijmo.viewer.ViewerBase).add([
                            this.CreateProp('paginated', PropertyType.Boolean),
                            this.CreateProp('reportName', PropertyType.String),
                        ]);
                    // *************************** PdfViewer *************************************************************
                    case wijmo.viewer && wijmo.viewer.PdfViewer:
                        return this.getMetaData(wijmo.viewer.ViewerBase);
                    // *************************** TreeView *************************************************************
                    case wijmo.nav && wijmo.nav.TreeView:
                        return this.getMetaData(wijmo.Control).add([
                            this.CreateProp('childItemsPath', PropertyType.Any),
                            this.CreateProp('displayMemberPath', PropertyType.Any),
                            this.CreateProp('imageMemberPath', PropertyType.Any),
                            this.CreateProp('isContentHtml', PropertyType.Boolean),
                            this.CreateProp('showCheckboxes', PropertyType.Boolean),
                            this.CreateProp('autoCollapse', PropertyType.Boolean),
                            this.CreateProp('isAnimated', PropertyType.Boolean),
                            this.CreateProp('isReadOnly', PropertyType.Boolean),
                            this.CreateProp('allowDragging', PropertyType.Boolean),
                            this.CreateProp('expandOnClick', PropertyType.Boolean),
                            this.CreateProp('lazyLoadFunction', PropertyType.Function),
                            this.CreateProp('itemsSource', PropertyType.Any),
                            this.CreateProp('selectedItem', PropertyType.Any, 'selectedItemChanged'),
                            this.CreateProp('selectedNode', PropertyType.Any, 'selectedItemChanged'),
                            this.CreateProp('checkedItems', PropertyType.Any, 'checkedItemsChanged'),
                        ], [
                            this.CreateEvent('itemsSourceChanged', true),
                            this.CreateEvent('loadingItems'),
                            this.CreateEvent('loadedItems'),
                            this.CreateEvent('itemClicked'),
                            this.CreateEvent('selectedItemChanged'),
                            this.CreateEvent('checkedItemsChanged', true),
                            this.CreateEvent('isCollapsedChanging'),
                            this.CreateEvent('isCollapsedChanged'),
                            this.CreateEvent('isCheckedChanging'),
                            this.CreateEvent('isCheckedChanged'),
                            this.CreateEvent('formatItem'),
                            this.CreateEvent('dragStart'),
                            this.CreateEvent('dragOver'),
                            this.CreateEvent('drop'),
                            this.CreateEvent('dragEnd'),
                            this.CreateEvent('nodeEditStarting'),
                            this.CreateEvent('nodeEditStarted'),
                            this.CreateEvent('nodeEditEnding'),
                            this.CreateEvent('nodeEditEnded')
                        ]);
                }
                return new MetaDataBase([]);
            };
            // For the specified class reference returns its name as a string, e.g.
            // getClassName(wijmo.input.ComboBox) returns 'ComboBox'.
            ControlMetaFactory.getClassName = function (classRef) {
                return (classRef.toString().match(/function (.+?)\(/) || [, ''])[1];
            };
            // Returns a camel case representation of the dash delimited name.
            ControlMetaFactory.toCamelCase = function (s) {
                return s.toLowerCase().replace(/-(.)/g, function (match, group1) {
                    return group1.toUpperCase();
                });
            };
            ControlMetaFactory.findInArr = function (arr, propName, value) {
                for (var i in arr) {
                    if (arr[i][propName] === value) {
                        return arr[i];
                    }
                }
                return null;
            };
            return ControlMetaFactory;
        }());
        meta.ControlMetaFactory = ControlMetaFactory;
        // Describes a scope property: name, type, binding mode.
        // Also defines enum type and custom watcher function extender
        var PropDescBase = /** @class */ (function () {
            // Initializes a new instance of a PropDesc
            function PropDescBase(propertyName, propertyType, /*bindingMode: BindingMode = BindingMode.OneWay*/ changeEvent, enumType, isNativeControlProperty, priority) {
                if (isNativeControlProperty === void 0) { isNativeControlProperty = true; }
                if (priority === void 0) { priority = 0; }
                this._priority = 0;
                this._propertyName = propertyName;
                this._propertyType = propertyType;
                //this._bindingMode = bindingMode;
                this._changeEvent = changeEvent;
                this._enumType = enumType;
                this._isNativeControlProperty = isNativeControlProperty;
                this._priority = priority;
            }
            Object.defineProperty(PropDescBase.prototype, "propertyName", {
                // Gets the property name
                get: function () {
                    return this._propertyName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "propertyType", {
                // Gets the property type (number, string, boolean, enum, or any)
                get: function () {
                    return this._propertyType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "changeEvent", {
                get: function () {
                    return this._changeEvent;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "enumType", {
                // Gets the property enum type
                get: function () { return this._enumType; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "bindingMode", {
                // Gets the property binding mode
                get: function () {
                    //return this._bindingMode;
                    return this.changeEvent ? BindingMode.TwoWay : BindingMode.OneWay;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "isNativeControlProperty", {
                // Gets whether the property belongs to the control is just to the directive
                get: function () {
                    return this._isNativeControlProperty;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "priority", {
                // Gets an initialization priority. Properties with higher priority are assigned to directive's underlying control
                // property later than properties with lower priority. Properties with the same priority are assigned in the order of
                // their index in the _props collection.
                get: function () {
                    return this._priority;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PropDescBase.prototype, "shouldUpdateSource", {
                // Indicates whether a bound 'controller' property should be updated on this property change (i.e. two-way binding).
                get: function () {
                    return this.bindingMode === BindingMode.TwoWay && this.propertyType != PropertyType.EventHandler;
                },
                enumerable: true,
                configurable: true
            });
            PropDescBase.prototype.initialize = function (options) {
                wijmo.copy(this, options);
            };
            // Casts value to the property type
            PropDescBase.prototype.castValueToType = function (value) {
                if (value == undefined) {
                    return value;
                }
                var type = this.propertyType, pt = PropertyType;
                if (type === pt.AnyPrimitive) {
                    if (!wijmo.isString(value)) {
                        return value;
                    }
                    if (value === 'true' || value === 'false') {
                        type = pt.Boolean;
                    }
                    else {
                        castVal = +value;
                        if (!isNaN(castVal)) {
                            return castVal;
                        }
                        var castVal = this._parseDate(value);
                        if (!wijmo.isString(castVal)) {
                            return castVal;
                        }
                        return value;
                    }
                }
                switch (type) {
                    case pt.Number:
                        if (typeof value == 'string') {
                            if (value.indexOf('*') >= 0) {
                                return value;
                            }
                            if (value.trim() === '') {
                                return null;
                            }
                        }
                        return +value; // cast to number
                    case pt.Boolean:
                        if (value === 'true') {
                            return true;
                        }
                        if (value === 'false') {
                            return false;
                        }
                        return !!value; // cast to bool
                    case pt.String:
                        return value + ''; // cast to string
                    case pt.Date:
                        return this._parseDate(value);
                    case pt.Enum:
                        if (typeof value === 'number') {
                            return value;
                        }
                        return this.enumType[value];
                    default:
                        return value;
                }
            };
            // Parsing DateTime values from string
            PropDescBase.prototype._parseDate = function (value) {
                if (value && wijmo.isString(value)) {
                    // For by-val attributes Angular converts a Date object to a
                    // string wrapped in quotation marks, so we strip them.
                    value = value.replace(/["']/g, '');
                    // parse date/time using RFC 3339 pattern
                    var dt = wijmo.changeType(value, wijmo.DataType.Date, 'r');
                    if (wijmo.isDate(dt)) {
                        return dt;
                    }
                }
                return value;
            };
            return PropDescBase;
        }());
        meta.PropDescBase = PropDescBase;
        // Property types as used in the PropDesc class.
        var PropertyType;
        (function (PropertyType) {
            PropertyType[PropertyType["Boolean"] = 0] = "Boolean";
            PropertyType[PropertyType["Number"] = 1] = "Number";
            PropertyType[PropertyType["Date"] = 2] = "Date";
            PropertyType[PropertyType["String"] = 3] = "String";
            // Allows a value of any primitive type above, that can be parsed from string
            PropertyType[PropertyType["AnyPrimitive"] = 4] = "AnyPrimitive";
            PropertyType[PropertyType["Enum"] = 5] = "Enum";
            PropertyType[PropertyType["Function"] = 6] = "Function";
            PropertyType[PropertyType["EventHandler"] = 7] = "EventHandler";
            PropertyType[PropertyType["Any"] = 8] = "Any";
        })(PropertyType = meta.PropertyType || (meta.PropertyType = {}));
        // Gets a value that indicates whether the specified type is simple (true) or complex (false).
        function isSimpleType(type) {
            return type <= PropertyType.Enum;
        }
        meta.isSimpleType = isSimpleType;
        var BindingMode;
        (function (BindingMode) {
            BindingMode[BindingMode["OneWay"] = 0] = "OneWay";
            BindingMode[BindingMode["TwoWay"] = 1] = "TwoWay";
        })(BindingMode = meta.BindingMode || (meta.BindingMode = {}));
        // Describes a scope event
        var EventDescBase = /** @class */ (function () {
            // Initializes a new instance of an EventDesc
            function EventDescBase(eventName, isPropChanged) {
                this._eventName = eventName;
                this._isPropChanged = isPropChanged;
            }
            Object.defineProperty(EventDescBase.prototype, "eventName", {
                // Gets the event name
                get: function () {
                    return this._eventName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventDescBase.prototype, "isPropChanged", {
                // Gets whether this event is a property change notification
                get: function () {
                    return this._isPropChanged === true;
                },
                enumerable: true,
                configurable: true
            });
            return EventDescBase;
        }());
        meta.EventDescBase = EventDescBase;
        // Describe property info for nested directives.
        var ComplexPropDescBase = /** @class */ (function () {
            function ComplexPropDescBase(propertyName, isArray, ownsObject) {
                if (ownsObject === void 0) { ownsObject = false; }
                this.isArray = false;
                this._ownsObject = false;
                this.propertyName = propertyName;
                this.isArray = isArray;
                this._ownsObject = ownsObject;
            }
            Object.defineProperty(ComplexPropDescBase.prototype, "ownsObject", {
                get: function () {
                    return this.isArray || this._ownsObject;
                },
                enumerable: true,
                configurable: true
            });
            return ComplexPropDescBase;
        }());
        meta.ComplexPropDescBase = ComplexPropDescBase;
        // Stores a control metadata as arrays of property, event and complex property descriptors.
        var MetaDataBase = /** @class */ (function () {
            function MetaDataBase(props, events, complexProps, parentProperty, isParentPropertyArray, ownsObject, parentReferenceProperty, ngModelProperty) {
                this._props = [];
                this._events = [];
                this._complexProps = [];
                this.props = props;
                this.events = events;
                this.complexProps = complexProps;
                this.parentProperty = parentProperty;
                this.isParentPropertyArray = isParentPropertyArray;
                this.ownsObject = ownsObject;
                this.parentReferenceProperty = parentReferenceProperty;
                this.ngModelProperty = ngModelProperty;
            }
            Object.defineProperty(MetaDataBase.prototype, "props", {
                get: function () {
                    return this._props;
                },
                set: function (value) {
                    this._props = value || [];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MetaDataBase.prototype, "events", {
                get: function () {
                    return this._events;
                },
                set: function (value) {
                    this._events = value || [];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MetaDataBase.prototype, "complexProps", {
                get: function () {
                    return this._complexProps;
                },
                set: function (value) {
                    this._complexProps = value || [];
                },
                enumerable: true,
                configurable: true
            });
            // Adds the specified arrays to the end of corresponding arrays of this object, and overwrite the simple properties
            // if specified. Returns 'this'.
            MetaDataBase.prototype.add = function (props, events, complexProps, parentProperty, isParentPropertyArray, ownsObject, parentReferenceProperty, ngModelProperty) {
                return this.addOptions({
                    props: props,
                    events: events,
                    complexProps: complexProps,
                    parentProperty: parentProperty,
                    isParentPropertyArray: isParentPropertyArray,
                    ownsObject: ownsObject,
                    parentReferenceProperty: parentReferenceProperty,
                    ngModelProperty: ngModelProperty
                });
                //this._props = this._props.concat(props || []);
                //this._events = this._events.concat(events || []);
                //this._complexProps = this._complexProps.concat(complexProps || []);
                //if (parentProperty !== undefined) {
                //    this.parentProperty = parentProperty;
                //}
                //if (isParentPropertyArray !== undefined) {
                //    this.isParentPropertyArray = isParentPropertyArray;
                //}
                //if (ownsObject !== undefined) {
                //    this.ownsObject = ownsObject;
                //}
                //if (parentReferenceProperty !== undefined) {
                //    this.parentReferenceProperty = parentReferenceProperty;
                //}
                //if (ngModelProperty !== undefined) {
                //    this.ngModelProperty = ngModelProperty;
                //}
                //return this;
            };
            MetaDataBase.prototype.addOptions = function (options) {
                for (var prop in options) {
                    var thisValue = this[prop], optionsValue = options[prop];
                    if (thisValue instanceof Array) {
                        this[prop] = thisValue.concat(optionsValue || []);
                    }
                    else if (optionsValue !== undefined) {
                        this[prop] = optionsValue;
                    }
                }
                return this;
            };
            // Prepares a raw defined metadata for a usage, for example sorts the props array on priority.
            MetaDataBase.prototype.prepare = function () {
                // stable sort of props on priority
                var baseArr = [].concat(this._props);
                this._props.sort(function (a, b) {
                    var ret = a.priority - b.priority;
                    if (!ret) {
                        ret = baseArr.indexOf(a) - baseArr.indexOf(b);
                    }
                    return ret;
                });
            };
            return MetaDataBase;
        }());
        meta.MetaDataBase = MetaDataBase;
    })(meta = wijmo.meta || (wijmo.meta = {}));
})(wijmo || (wijmo = {}));

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
var wijmo;
(function (wijmo) {
    var knockout;
    (function (knockout) {
        var MetaFactory = /** @class */ (function (_super) {
            __extends(MetaFactory, _super);
            function MetaFactory() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // Override to return wijmo.knockout.PropDesc
            MetaFactory.CreateProp = function (propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority) {
                return new PropDesc(propertyName, propertyType, changeEvent, enumType, isNativeControlProperty, priority);
            };
            // Override to return wijmo.knockout.EventDesc
            MetaFactory.CreateEvent = function (eventName, isPropChanged) {
                return new EventDesc(eventName, isPropChanged);
            };
            // Override to return wijmo.knockout.ComplexPropDesc
            MetaFactory.CreateComplexProp = function (propertyName, isArray, ownsObject) {
                return new ComplexPropDesc(propertyName, isArray, ownsObject);
            };
            // Typecasted override.
            MetaFactory.findProp = function (propName, props) {
                return wijmo.meta.ControlMetaFactory.findProp(propName, props);
            };
            // Typecasted override.
            MetaFactory.findEvent = function (eventName, events) {
                return wijmo.meta.ControlMetaFactory.findEvent(eventName, events);
            };
            // Typecasted override.
            MetaFactory.findComplexProp = function (propName, props) {
                return wijmo.meta.ControlMetaFactory.findComplexProp(propName, props);
            };
            return MetaFactory;
        }(wijmo.meta.ControlMetaFactory));
        knockout.MetaFactory = MetaFactory;
        var PropDesc = /** @class */ (function (_super) {
            __extends(PropDesc, _super);
            function PropDesc() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return PropDesc;
        }(wijmo.meta.PropDescBase));
        knockout.PropDesc = PropDesc;
        // Describes a scope event
        var EventDesc = /** @class */ (function (_super) {
            __extends(EventDesc, _super);
            function EventDesc() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return EventDesc;
        }(wijmo.meta.EventDescBase));
        knockout.EventDesc = EventDesc;
        // Describe property info for nested directives.
        var ComplexPropDesc = /** @class */ (function (_super) {
            __extends(ComplexPropDesc, _super);
            function ComplexPropDesc() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ComplexPropDesc;
        }(wijmo.meta.ComplexPropDescBase));
        knockout.ComplexPropDesc = ComplexPropDesc;
    })(knockout = wijmo.knockout || (wijmo.knockout = {}));
})(wijmo || (wijmo = {}));

/**
 * Contains KnockoutJS bindings for the Wijmo controls.
 *
 * The bindings allow you to add Wijmo controls to
 * <a href="http://knockoutjs.com/" target="_blank">KnockoutJS</a>
 * applications using simple markup in HTML pages.
 *
 * To add a Wijmo control to a certain place in a page's markup, add the <b>&lt;div&gt;</b>
 * element and define a binding for the control in the <b>data-bind</b> attribute.
 * The binding name corresponds to the control name with a wj prefix. For example, the @see:wjInputNumber
 * binding represents the Wijmo @see:InputNumber control. The binding value is an object literal containing
 * properties corresponding to the control's read-write property and event names, with their values defining
 * the corresponding control property values and event handlers.
 *
 * The following markup creates a Wijmo <b>InputNumber</b> control with the <b>value</b> property bound to the
 * view model's <b>theValue</b> property, the <b>step</b> property set to 1 and the <b>inputType</b> property set to 'text':
 *
 * <pre>&lt;div data-bind="wjInputNumber: { value: theValue, step: 1, inputType: 'text' }"&gt;&lt;/div&gt;</pre>
 *
 * <h3>Custom elements</h3>
 * As an alternative to the standard Knockout binding syntax, the Wijmo for Knockout provides a possibility to declare controls
 * in the page markup as custom elements, where the tag name corresponds to the control binding name and the attribute names
 * correspond to the control property names. The element and parameter names must be formatted as lower-case with dashes instead
 * of camel-case. The control in the example above can be defined as follows using the custom element syntax:
 *
 * <pre>&lt;wj-input-number value="theValue" step="1" input-type="'text'"&gt;&lt;/wj-input-number&gt;</pre>
 *
 * Note that attribute values should be defined using exactly the same JavaScript expressions syntax as you use in
 * data-bind definitions. The Wijmo for Knockout preprocessor converts such elements to the conventional data-bind form,
 * see the <b>Custom elements preprocessor</b> topic for more details.
 *
 * <h3>Binding to control properties</h3>
 * Wijmo binding for KnockoutJS supports binding to any read-write properties on the control. You can assign any
 * valid KnockoutJS expressions (e.g. constants, view model observable properties, or complex expressions) to the
 * property.
 *
 * Most of the properties provide one-way binding, which means that changes in the bound observable view model
 * property cause changes in the control property that the observable is bound to, but not vice versa.
 * But some properties support two-way binding, which means that changes made in the control property are
 * propagated back to an observable bound to the control property as well. Two-way bindings are used for properties
 * that can be changed by the control itself, by user interaction with the control,
 * or by other occurences. For example, the InputNumber control provides two-way binding for the
 * <b>value</b> and <b>text</b> properties, which are changed by the control while a user is typing a new value.
 * The rest of the InputNumber properties operate in the one-way binding mode.
 *
 * <h3>Binding to control events</h3>
 * To attach a handler to a control event, specify the event name as a property of the object literal defining
 * the control binding, and the function to call on this event as a value of this property.
 * Wijmo bindings follow the same rules for defining an event handler as used for the intrinsic KnockoutJS bindings
 * like <b>click</b> and <b>event</b>. The event handler receives the following set of parameters, in the specified order:
 * <ul>
 * 	<li><b>data:</b> The current model value, the same as for native KnockoutJS bindings like <b>click</b> and <b>event</b>. </li>
 * 	<li><b>sender:</b> The sender of the event. </li>
 * 	<li><b>args:</b> The event arguments. </li>
 * </ul>
 *
 * The following example creates an <b>InputNumber</b> control and adds an event handler for the <b>valueChanged</b>
 * event showing a dialog with a new control value.
 *
 * <pre>&lt;!-- HTML --&gt;
 * &lt;div data-bind="wjInputNumber: { value: theValue, step: 1, valueChanged: valueChangedEH }"&gt;&lt;/div&gt;
 * &nbsp;
 * //View Model
 * this.valueChangedEH = function (data, sender, args) {
 *     alert('The new value is: ' + sender.value);
 * }</pre>
 *
 * The same control defined using the custom element syntax:
 *
 * <pre>&lt;wj-input-number value="theValue" step="1" value-changed="valueChangedEH"&gt;&lt;/wj-input-number&gt;</pre>
 *
 * <h3>Binding to undefined observables</h3>
 * View model observable properties assigned to an <i>undefined</i> value get special treatment by Wijmo
 * bindings during the initialization phase. For example, if you create an observable as ko.observable(undefined)
 * or ko.observable() and bind it to a control property, Wijmo does not assign a value to the control. Instead,
 * for properties supporting two-way bindings, this is the way to initialize the observable with the control's
 * default value, because after initialization the control binding updates bound observables with the control
 * values of such properties. Note that an observable with a <i>null</i> value, e.g. ko.observable(null), gets
 * the usual treatment and assigns null to the control property that it is bound to. After the primary
 * initialization has finished, observables with undefined values go back to getting the usual treatment from
 * Wijmo, and assign the control property with undefined.
 *
 * In the example below, the <b>value</b> property of the <b>InputNumber</b> control has its default value of 0
 * after initialization, and this same value is assigned to the view model <b>theValue</b> property:
 * <pre>&lt;!-- HTML --&gt;
 * &lt;div data-bind="wjInputNumber: { value: theValue }"&gt;&lt;/div&gt;
 * &nbsp;
 * //View Model
 * this.theValue = ko.observable();</pre>
 *
 * <h3>Defining complex and array properties</h3>
 * Some Wijmo controls have properties that contain an array or a complex object. For example, the
 * @see:FlexChart control exposes <b>axisX</b> and <b>axisY</b> properties that represent an @see:Axis object;
 * and the <b>series</b> property is an array of @see:Series objects. Wijmo provides special
 * bindings for such types that we add to child elements of the control element. If the control exposes
 * multiple properties of the same complex type, then the <b>wjProperty</b> property of the complex
 * type binding specifies which control property it defines.
 *
 * The following example shows the markup used to create a <b>FlexChart</b> with <b>axisX</b> and <b>axisY</b>
 * properties and two series objects defined:
 *
 * <pre>&lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
 *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: chartProps.titleX }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisY', title: chartProps.titleY }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Downloads', binding: 'downloads' }"&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The same control defined using the custom element syntax:
 *
 * <pre>&lt;wj-flex-chart items-source="data" binding-x="'country'"&gt;
 *     &lt;wj-flex-chart-axis wj-property="'axisX'" title="chartProps.titleX"&gt;&lt;/wj-flex-chart-axis&gt;
 *     &lt;wj-flex-chart-axis wj-property="'axisY'" title="chartProps.titleY"&gt;&lt;/wj-flex-chart-axis&gt;
 *     &lt;wj-flex-chart-series name="'Sales'" binding"'sales'"&gt;&lt;/wj-flex-chart-series&gt;
 *     &lt;wj-flex-chart-series name="'Downloads'" binding"'downloads'"&gt;&lt;/wj-flex-chart-series&gt;
 * &lt;/wj-flex-chart&gt;</pre>
 *
 * <h3>The <b>control</b> property </h3>
 * Each Wijmo control binding exposes a <b>control</b> property that references the Wijmo control instance created
 * by the binding. This allows you to reference the control in view model code or in other bindings.
 *
 * For example, the following markup creates a @see:FlexGrid control whose reference is stored in the <b>flex</b>
 * observable property of a view model and is used in the button click event handler to move to the next grid record:
 *
 * <pre>&lt;!-- HTML --&gt;
 * &lt;div data-bind="'wjFlexGrid': { itemsSource: data, control: flex }"&gt;&lt;/div&gt;
 * &lt;button data-bind="click: moveToNext"&gt;Next&lt;/button&gt;
 * &nbsp;
 * //View Model
 * this.flex = ko.observable();
 * this.moveToNext = function () {
 *     this.flex().collectionView.moveCurrentToNext();
 * }</pre>
 *
 * <h3>The <b>initialized</b> event</h3>
 * Each Wijmo control binding exposes an <b>initialized</b> event and a Boolean <b>isInitialized</b>
 * property. The event occurs right after the binding creates the control and fully initializes it
 * with the values specified in the binding attributes. For bindings containing child bindings, for
 * example, a <b>wjFlexGrid</b> with child <b>wjFlexGridColumn</b> bindings, this also means that
 * child bindings have fully initialized and have been applied to the control represented by the
 * parent binding. The isInitialized property is set to true right before triggering the initialized
 * event. You can bind a view model observable property to the binding’s <b>isInitialized</b> property
 * to access its value.
 *
 * The following example adjusts FlexGridColumn formatting after the control fully initializes with its
 * bindings, which guarantees that these formats are not overwritten with formats defined in the bindings:
 *
 * <pre>&lt;!-- HTML --&gt;
 * &lt;div data-bind="'wjFlexGrid': { itemsSource: dataArray, initialized: flexInitialized }"&gt;
 *      &lt;div data-bind="wjFlexGridColumn: { binding: 'sales', format: 'n2' }"&gt;&lt;/div&gt;
 *      &lt;div data-bind="wjFlexGridColumn: { binding: 'downloads', format: 'n2' }"&gt;&lt;/div&gt;
 * &lt;/div&gt;
 * &nbsp;
 * //View Model
 * this.flexInitialized = function (data, sender, args) {
 *     var columns = sender.columns;
 *     for (var i = 0; i &lt; columns.length; i++) {
 *         if (columns[i].dataType = wijmo.DataType.Number) {
 *             columns[i].format = 'n0’;
 *         }
 *     }
 * }</pre>
 *
 * <h3 id="custom_elem_preproc">Custom elements preprocessor</h3>
 * The Wijmo Knockout preprocessor uses the standard Knockout <a target="_blank"
 * href="http://knockoutjs.com/documentation/binding-preprocessing.html">ko.bindingProvider.instance.preprocessNode</a>
 * API. This may cause problems in cases where other custom preprocessors are used on the same page, because Knockout
 * offers a single instance property for attaching a preprocessor function, and the next registering preprocessor
 * removes the registration of the previous one.
 *
 * To honor another attached preprocessor, the Wijmo Knockout preprocessor stores the currently registered preprocessor
 * during initialization and delegates the work to it in cases where another processing node is not recognized
 * as a Wijmo control element, thus organizing a preprocessor stack. But if you register another preprocessor
 * after the Wijmo for Knockout preprocessor (that is, after the &lt;script&gt; reference to the <b>wijmo.knockout.js</b>
 * module is executed) then you need to ensure that the other preprocessor behaves in a similar way;
 * otherwise, the Wijmo Knockout preprocessor is disabled.
 *
 * If you prefer to disable the Wijmo Knockout preprocessor, set the <b>wijmo.disableKnockoutTags</b> property
 * to false before the <b>wijmo.knockout.js</b> module reference and after the references to the core Wijmo
 * modules, for example:
 *
 * <pre>&lt;script src="scripts/wijmo.js"&gt;&lt;/script&gt;
 * &lt;script src="scripts/wijmo.input.js"&gt;&lt;/script&gt;
 * &lt;script&gt;
 *     wijmo.disableKnockoutTags = true;
 * &lt;/script&gt;
 * &lt;script src="scripts/wijmo.knockout.js"&gt;&lt;/script&gt;</pre>
 *
 * Note that in this case you can use only the conventional data-bind syntax for adding Wijmo controls to the page
 * markup; the Wijmo custom elements are not recognized.
 */
var wijmo;
(function (wijmo) {
    var knockout;
    (function (knockout) {
        // Represents a base class for Wijmo custom bindings. Technically corresponds to an object assigning to ko.bindingHandlers
        // in order to register a custom binding. Represents a Wijmo control or a child object like FlexGrid Column.
        // This is a singleton class. For each tag that uses the custom binding it creates a separate WjContext class instance
        // that services lifetime of the control created for the tag.
        var WjBinding = /** @class */ (function () {
            function WjBinding() {
                // #region Native API
                //options: any;
                this.init = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    this.ensureMetaData();
                    //if (!this._metaData) {
                    //    this._metaData = MetaFactory.getMetaData(this._getMetaDataId());
                    //    this._initialize();
                    //    this._metaData.prepare();
                    //}
                    return this._initImpl(element, valueAccessor, allBindings, viewModel, bindingContext);
                }.bind(this);
                this.update = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    //console.log('#' + this['__DebugID'] + ' WjBinding.update');
                    this._updateImpl(element, valueAccessor, allBindings, viewModel, bindingContext);
                }.bind(this);
                this._updateImpl = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    (element[WjBinding._wjContextProp]).update(element, valueAccessor, allBindings, viewModel, bindingContext);
                };
            }
            // #endregion Native API
            // Call this method to ensure that metadata is loaded.
            // DO NOT OVERRIDE this method; instead, override the _initialize method to customize metedata.
            WjBinding.prototype.ensureMetaData = function () {
                if (!this._metaData) {
                    this._metaData = knockout.MetaFactory.getMetaData(this._getMetaDataId());
                    this._initialize();
                    this._metaData.prepare();
                }
            };
            // Override this method to initialize the binding settings. Metadata is already loaded when this method is invoked.
            WjBinding.prototype._initialize = function () {
            };
            WjBinding.prototype._getControlConstructor = function () {
                return null;
            };
            // Gets the metadata ID, see the wijmo.meta.getMetaData method description for details.
            WjBinding.prototype._getMetaDataId = function () {
                return this._getControlConstructor();
            };
            WjBinding.prototype._createControl = function (element) {
                var ctor = this._getControlConstructor();
                return new ctor(element);
            };
            WjBinding.prototype._createWijmoContext = function () {
                return new WjContext(this);
            };
            // Indicates whether this binding can operate as a child binding.
            WjBinding.prototype._isChild = function () {
                return this._isParentInitializer() || this._isParentReferencer();
            };
            // Indicates whether this binding operates as a child binding that initializes a property of its parent.
            WjBinding.prototype._isParentInitializer = function () {
                return this._metaData.parentProperty != undefined;
            };
            // Indicates whether this binding operates as a child binding that references a parent in its property or
            // a constructor.
            WjBinding.prototype._isParentReferencer = function () {
                return this._metaData.parentReferenceProperty != undefined;
            };
            WjBinding.prototype._initImpl = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var wjContext = this._createWijmoContext();
                element[WjBinding._wjContextProp] = wjContext;
                wjContext.element = element;
                if (this._isChild()) {
                    wjContext.parentWjContext = element.parentElement[WjBinding._wjContextProp];
                }
                wjContext.valueAccessor = valueAccessor;
                wjContext.allBindings = allBindings;
                wjContext.viewModel = viewModel;
                wjContext.bindingContext = bindingContext;
                return wjContext.init(element, valueAccessor, allBindings, viewModel, bindingContext);
            };
            // Defines html element property name used to store WjContext object associated with the element.
            WjBinding._wjContextProp = '__wjKoContext';
            // The name of the nested binding attribute defining a parent property name to assign to.
            WjBinding._parPropAttr = 'wjProperty';
            // The name of the attribute providing the reference to the control.
            WjBinding._controlPropAttr = 'control';
            // Name of the attribute that provides the 'initialized' state value.
            WjBinding._initPropAttr = 'isInitialized';
            // Name of the attribute representing the 'initialized' event.
            WjBinding._initEventAttr = 'initialized';
            return WjBinding;
        }());
        knockout.WjBinding = WjBinding;
        // Represents a context of WjBinding for a specific tag instance (similar to WjLink in Angular).
        var WjContext = /** @class */ (function () {
            function WjContext(wjBinding) {
                this._isInitialized = false;
                this._isUpdatingControl = false;
                this._isSourceDirty = false;
                this._oldSourceValues = {};
                this.wjBinding = wjBinding;
            }
            WjContext.prototype.init = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var lastAccessor = valueAccessor(), props = this.wjBinding._metaData.props, events = this.wjBinding._metaData.events;
                if (this._isChild()) {
                    var propObs = lastAccessor[WjBinding._parPropAttr], meta = this.wjBinding._metaData, parPropName = propObs && ko.unwrap(propObs) || meta.parentProperty;
                    this._parentPropDesc = knockout.MetaFactory.findComplexProp(parPropName, this.parentWjContext.wjBinding._metaData.complexProps)
                        || new knockout.ComplexPropDesc(parPropName, meta.isParentPropertyArray, meta.ownsObject);
                }
                this._initControl();
                this._safeUpdateSrcAttr(WjBinding._controlPropAttr, this.control);
                //Debug stuff
                //this.control.__DebugID = ++WjContext._debugId;
                //this['__DebugID'] = WjContext._debugId;
                // Initialize children right after control was created but before its properties was assigned with defined bindings.
                // This will allow to correctly apply properties like value or selectedIndex to controls like Menu whose child bindings
                // create an items source, so the mentioned properties will be assigned after collection has created.
                ko.applyBindingsToDescendants(bindingContext, element);
                this._childrenInitialized();
                for (var eIdx in events) {
                    this._addEventHandler(events[eIdx]);
                }
                this._updateControl(valueAccessor /* , this.control, props */);
                // Re-evaluate 'control' binding 
                // in order to simplify bindings to things like control.subProperty (e.g. flexGrid.collectionView).
                this._safeNotifySrcAttr(WjBinding._controlPropAttr);
                this._updateSource();
                this._isInitialized = true;
                this._safeUpdateSrcAttr(WjBinding._initPropAttr, true);
                var evObs = lastAccessor[WjBinding._initEventAttr];
                if (evObs) {
                    ko.unwrap(evObs)(this.bindingContext['$data'], this.control, undefined);
                }
                return { controlsDescendantBindings: true };
            };
            WjContext.prototype.update = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                this.valueAccessor = valueAccessor;
                this._updateControl(valueAccessor);
            };
            WjContext.prototype._createControl = function () {
                return this.wjBinding._createControl(this._parentInCtor() ? this.parentWjContext.control : this.element);
            };
            // Initialize the 'control' property, by creating a new or using the parent's object in case of child binding not owning
            // the object.
            // Override this method to perform custom initialization before or after control creation. The 'control' property is
            // undefined before this method call and defined on exit from this method.
            WjContext.prototype._initControl = function () {
                if (this._isChild()) {
                    this.element.style.display = 'none';
                    var parProp = this._getParentProp(), parCtrl = this.parentWjContext.control;
                    if (this._useParentObj()) {
                        this.control = parCtrl[parProp];
                    }
                    else {
                        var ctrl = this.control = this._createControl();
                        if (this._isParentInitializer()) {
                            if (this._isParentArray()) {
                                parCtrl[parProp].push(ctrl);
                            }
                            else {
                                parCtrl[parProp] = ctrl;
                            }
                        }
                        if (this._isParentReferencer() && !this._parentInCtor()) {
                            ctrl[this._getParentReferenceProperty()] = parCtrl;
                        }
                    }
                }
                else
                    this.control = this._createControl();
            };
            WjContext.prototype._childrenInitialized = function () {
            };
            WjContext.prototype._addEventHandler = function (eventDesc) {
                var _this = this;
                this.control[eventDesc.eventName].addHandler(function (s, e) {
                    if (_this._isInitialized) {
                        _this._updateSource();
                    }
                    var evObs = _this.valueAccessor()[eventDesc.eventName];
                    if (evObs) {
                        ko.unwrap(evObs)(_this.bindingContext['$data'], s, e);
                    }
                }, this);
            };
            WjContext.prototype._updateSource = function () {
                WjContext._isUpdatingSource = true;
                try {
                    var props = this.wjBinding._metaData.props;
                    for (var idx in props) {
                        var propDesc = props[idx], propName = propDesc.propertyName;
                        if (propDesc.shouldUpdateSource && propDesc.isNativeControlProperty) {
                            this._safeUpdateSrcAttr(propName, this.control[propName]);
                        }
                    }
                }
                finally {
                    WjContext._isUpdatingSource = false;
                    while (WjContext._pendingSourceUpdates.length > 0) {
                        var wjCont = WjContext._pendingSourceUpdates.shift();
                        wjCont._updateControl();
                    }
                }
            };
            WjContext.prototype._updateControl = function (valueAccessor) {
                if (valueAccessor === void 0) { valueAccessor = this.valueAccessor; }
                //console.log('#' + this['__DebugID'] + '_updateControl');
                var valSet = valueAccessor(), props = this.wjBinding._metaData.props;
                if (WjContext._isUpdatingSource) {
                    if (WjContext._pendingSourceUpdates.indexOf(this) < 0) {
                        WjContext._pendingSourceUpdates.push(this);
                    }
                    // IMPORTANT: We need to read all bound observable; otherwise, the update will never be called anymore !!!
                    for (var i in props) {
                        ko.unwrap(valSet[props[i].propertyName]);
                    }
                    return;
                }
                try {
                    var valArr = [], propArr = [];
                    // Collect properties/values changed since the last update.
                    for (var i in props) {
                        var prop = props[i], propName = prop.propertyName, valObs = valSet[propName];
                        if (valObs !== undefined) {
                            var val = ko.unwrap(valObs);
                            if (val !== this._oldSourceValues[propName]) {
                                this._oldSourceValues[propName] = val;
                                valArr.push(val);
                                propArr.push(prop);
                            }
                        }
                    }
                    for (var i in valArr) {
                        var prop = propArr[i], val = ko.unwrap(valSet[prop.propertyName]), propName = prop.propertyName;
                        if (val !== undefined || this._isInitialized) {
                            var castedVal = this._castValueToType(val, prop);
                            if (!(prop.updateControl && prop.updateControl(this, prop, this.control, val, castedVal)) &&
                                prop.isNativeControlProperty) {
                                if (this.control[propName] != castedVal) {
                                    this.control[propName] = castedVal;
                                }
                            }
                        }
                    }
                }
                finally {
                    //this._isUpdatingControl = false;
                }
            };
            // Casts value to the property type
            WjContext.prototype._castValueToType = function (value, prop) {
                return prop.castValueToType(value);
                //if (value == undefined) {
                //    //return undefined;
                //    return value;
                //}
                //var type = prop.propertyType;
                //switch (type) {
                //    case wijmo.meta.PropertyType.Number:
                //        if (typeof value == 'string') {
                //            if (value.indexOf('*') >= 0) { // hack for star width ('*', '2*'...)
                //                return value;
                //            }
                //            if (value.trim() === '') { // binding to an empty html input means null
                //                return null;
                //            }
                //        }
                //        return +value; // cast to number
                //    case wijmo.meta.PropertyType.Boolean:
                //        if (value === 'true') {
                //            return true;
                //        }
                //        if (value === 'false') {
                //            return false;
                //        }
                //        return !!value; // cast to bool
                //    case wijmo.meta.PropertyType.String:
                //        return value + ''; // cast to string
                //    case wijmo.meta.PropertyType.Date:
                //        return this._parseDate(value);
                //    case wijmo.meta.PropertyType.Enum:
                //        if (typeof value === 'number') {
                //            return value;
                //        }
                //        return prop.enumType[value];
                //    default:
                //        return value;
                //}
            };
            // Parsing DateTime values from string
            //private _parseDate(value) {
            //    if (value && wijmo.isString(value)) {
            //        // For by-val attributes Angular converts a Date object to a
            //        // string wrapped in quotation marks, so we strip them.
            //        value = value.replace(/["']/g, '');
            //        // parse date/time using RFC 3339 pattern
            //        var dt = changeType(value, DataType.Date, 'r');
            //        if (isDate(dt)) {
            //            return dt;
            //        }
            //    }
            //    return value;
            //}
            // Update source attribute if possible (if it's defined and is a writable observable or a non-observable)
            WjContext.prototype._safeUpdateSrcAttr = function (attrName, value) {
                var ctx = this.valueAccessor();
                var attrObs = ctx[attrName];
                if (ko.isWritableObservable(attrObs)) {
                    var val = ko.unwrap(attrObs);
                    if (value != val) {
                        attrObs(value);
                    }
                }
            };
            WjContext.prototype._safeNotifySrcAttr = function (attrName) {
                var ctx = this.valueAccessor();
                var attrObs = ctx[attrName];
                if (ko.isWritableObservable(attrObs) && attrObs.valueHasMutated) {
                    attrObs.valueHasMutated();
                }
            };
            //Determines whether this is a child link.
            WjContext.prototype._isChild = function () {
                return this.wjBinding._isChild();
            };
            // Indicates whether this link operates as a child link that initializes a property of its parent.
            WjContext.prototype._isParentInitializer = function () {
                return this.wjBinding._isParentInitializer();
            };
            // Indicates whether this link operates as a child link that references a parent in its property or
            // a constructor.
            WjContext.prototype._isParentReferencer = function () {
                return this.wjBinding._isParentReferencer();
            };
            //For the child directives returns parent's property name that it services. Property name defined via
            //the wjProperty attribute of directive tag has priority over the directive._property definition.
            //IMPORTANT: functionality is based on _parentPropDesc
            WjContext.prototype._getParentProp = function () {
                return this._isParentInitializer() ? this._parentPropDesc.propertyName : undefined;
            };
            // For a child directive, the name of the property of the directive's underlying object that receives the reference
            // to the parent, or an empty string that indicates that the reference to the parent should be passed as the 
            // underlying object's constructor parameter.
            WjContext.prototype._getParentReferenceProperty = function () {
                return this.wjBinding._metaData.parentReferenceProperty;
            };
            // Determines whether the child link uses an object created by the parent property, instead of creating it by
            // itself, and thus object's initialization should be delayed until parent link's control is created.
            //IMPORTANT: functionality is based on _parentPropDesc
            WjContext.prototype._useParentObj = function () {
                //return this._isChild() && !this._parentPropDesc.isArray && !this._parentPropDesc.ownsObject;
                return !this._isParentReferencer() &&
                    this._isParentInitializer() && !this._parentPropDesc.isArray && !this._parentPropDesc.ownsObject;
            };
            // For the child link, determines whether the servicing parent property is an array.
            //IMPORTANT: functionality is based on _parentPropDesc
            WjContext.prototype._isParentArray = function () {
                return this._parentPropDesc.isArray;
            };
            // For the child referencer directive, indicates whether the parent should be passed as a parameter the object
            // constructor.
            WjContext.prototype._parentInCtor = function () {
                return this._isParentReferencer() && this._getParentReferenceProperty() == '';
            };
            WjContext._debugId = 0;
            WjContext._isUpdatingSource = false;
            WjContext._pendingSourceUpdates = [];
            return WjContext;
        }());
        knockout.WjContext = WjContext;
    })(knockout = wijmo.knockout || (wijmo.knockout = {}));
})(wijmo || (wijmo = {})); //end of module

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
var wijmo;
(function (wijmo) {
    var knockout;
    (function (knockout) {
        /**
         * KnockoutJS binding for the @see:Tooltip class.
         *
         * Use the @see:wjTooltip binding to add tooltips to elements on the page.
         * The @see:wjTooltip supports HTML content, smart positioning, and touch.
         *
         * The @see:wjTooltip binding is specified on an
         * element that the tooltip applies to. The value is the tooltip
         * text or the id of an element that contains the text. For example:
         *
         * <pre>&lt;p data-bind="wjTooltip: '#fineprint'" &gt;
         *     Regular paragraph content...&lt;/p&gt;
         * ...
         * &lt;div id="fineprint" style="display:none" &gt;
         *   &lt;h3&gt;Important Note&lt;/h3&gt;
         *   &lt;p&gt;
         *     Data for the current quarter is estimated by pro-rating etc...&lt;/p&gt;
         * &lt;/div&gt;</pre>
         */
        var wjTooltip = /** @class */ (function (_super) {
            __extends(wjTooltip, _super);
            function wjTooltip() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjTooltip.prototype._getControlConstructor = function () {
                return wijmo.Tooltip;
            };
            wjTooltip.prototype._createControl = function (element) {
                return _super.prototype._createControl.call(this, null);
            };
            wjTooltip.prototype._createWijmoContext = function () {
                return new WjTooltipContext(this);
            };
            return wjTooltip;
        }(knockout.WjBinding));
        knockout.wjTooltip = wjTooltip;
        var WjTooltipContext = /** @class */ (function (_super) {
            __extends(WjTooltipContext, _super);
            function WjTooltipContext() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjTooltipContext.prototype.update = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                _super.prototype.update.call(this, element, valueAccessor, allBindings, viewModel, bindingContext);
                this._updateTooltip();
            };
            WjTooltipContext.prototype._updateTooltip = function () {
                this.control.setTooltip(this.element, ko.unwrap(this.valueAccessor()));
            };
            return WjTooltipContext;
        }(knockout.WjContext));
        knockout.WjTooltipContext = WjTooltipContext;
    })(knockout = wijmo.knockout || (wijmo.knockout = {}));
})(wijmo || (wijmo = {}));
(ko.bindingHandlers).wjTooltip = new wijmo.knockout.wjTooltip();

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
var wijmo;
(function (wijmo) {
    var knockout;
    (function (knockout) {
        // DropDown custom binding.
        // Abstract class, not for use in markup
        var WjDropDownBinding = /** @class */ (function (_super) {
            __extends(WjDropDownBinding, _super);
            function WjDropDownBinding() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjDropDownBinding.prototype._getControlConstructor = function () {
                return wijmo.input.DropDown;
            };
            return WjDropDownBinding;
        }(knockout.WjBinding));
        knockout.WjDropDownBinding = WjDropDownBinding;
        /**
         * KnockoutJS binding for the @see:ComboBox control.
         *
         * Use the @see:wjComboBox binding to add @see:ComboBox controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a ComboBox control:&lt;/p&gt;
         * &lt;div data-bind="wjComboBox: {
         *   itemsSource: countries,
         *   text: theCountry,
         *   isEditable: false,
         *   placeholder: 'country' }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjComboBox</b> binding supports all read-write properties and events of
         * the @see:ComboBox control. The following properties provide two-way binding mode:
         * <ul>
         * 	<li><b>isDroppedDown</b></li>
         * 	<li><b>text</b></li>
         * 	<li><b>selectedIndex</b></li>
         * 	<li><b>selectedItem</b></li>
         * 	<li><b>selectedValue</b></li>
         * </ul>
         */
        var wjComboBox = /** @class */ (function (_super) {
            __extends(wjComboBox, _super);
            function wjComboBox() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjComboBox.prototype._getControlConstructor = function () {
                return wijmo.input.ComboBox;
            };
            return wjComboBox;
        }(WjDropDownBinding));
        knockout.wjComboBox = wjComboBox;
        /**
         * KnockoutJS binding for the @see:AutoComplete control.
         *
         * Use the @see:wjAutoComplete binding to add @see:AutoComplete controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is an AutoComplete control:&lt;/p&gt;
         * &lt;div data-bind="wjAutoComplete: {
         *   itemsSource: countries,
         *   text: theCountry,
         *   isEditable: false,
         *   placeholder: 'country' }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjAutoComplete</b> binding supports all read-write properties and events of
         * the @see:AutoComplete control. The following properties provide two-way binding mode:
         * <ul>
         * 	<li><b>isDroppedDown</b></li>
         * 	<li><b>text</b></li>
         * 	<li><b>selectedIndex</b></li>
         * 	<li><b>selectedItem</b></li>
         * 	<li><b>selectedValue</b></li>
         * </ul>
         */
        var wjAutoComplete = /** @class */ (function (_super) {
            __extends(wjAutoComplete, _super);
            function wjAutoComplete() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjAutoComplete.prototype._getControlConstructor = function () {
                return wijmo.input.AutoComplete;
            };
            return wjAutoComplete;
        }(wjComboBox));
        knockout.wjAutoComplete = wjAutoComplete;
        /**
         * KnockoutJS binding for the @see:Calendar control.
         *
         * Use the @see:wjCalendar binding to add @see:Calendar controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a Calendar control:&lt;/p&gt;
         * &lt;div
         *   data-bind="wjCalendar: { value: theDate }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjCalendar</b> binding supports all read-write properties and events of
         * the @see:Calendar control. The following properties provide two-way binding mode:
         * <ul>
         * 	<li><b>value</b></li>
         * 	<li><b>displayMonth</b></li>
         * </ul>
         */
        var wjCalendar = /** @class */ (function (_super) {
            __extends(wjCalendar, _super);
            function wjCalendar() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjCalendar.prototype._getControlConstructor = function () {
                return wijmo.input.Calendar;
            };
            return wjCalendar;
        }(knockout.WjBinding));
        knockout.wjCalendar = wjCalendar;
        /**
         * KnockoutJS binding for the @see:ColorPicker control.
         *
         * Use the @see:wjColorPicker binding to add @see:ColorPicker controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a ColorPicker control:&lt;/p&gt;
         * &lt;div
         *   data-bind="wjColorPicker: { value: theColor }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjColorPicker</b> binding supports all read-write properties and events of
         * the @see:ColorPicker control. The following properties provide two-way binding mode:
         * <ul>
         * 	<li><b>value</b></li>
         * </ul>
         */
        var wjColorPicker = /** @class */ (function (_super) {
            __extends(wjColorPicker, _super);
            function wjColorPicker() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjColorPicker.prototype._getControlConstructor = function () {
                return wijmo.input.ColorPicker;
            };
            return wjColorPicker;
        }(knockout.WjBinding));
        knockout.wjColorPicker = wjColorPicker;
        /**
         * KnockoutJS binding for the @see:ListBox control.
         *
         * Use the @see:wjListBox binding to add @see:ListBox controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a ListBox control:&lt;/p&gt;
         * &lt;div data-bind="wjListBox: {
         *   itemsSource: countries,
         *   selectedItem: theCountry }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjListBox</b> binding supports all read-write properties and events of
         * the @see:ListBox control. The following properties provide two-way binding mode:
         * <ul>
         * 	<li><b>selectedIndex</b></li>
         * 	<li><b>selectedItem</b></li>
         * 	<li><b>selectedValue</b></li>
         * </ul>
         */
        var wjListBox = /** @class */ (function (_super) {
            __extends(wjListBox, _super);
            function wjListBox() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjListBox.prototype._getControlConstructor = function () {
                return wijmo.input.ListBox;
            };
            return wjListBox;
        }(knockout.WjBinding));
        knockout.wjListBox = wjListBox;
        /**
         * KnockoutJS binding for the @see:Menu control.
         *
         * Use the @see:wjMenu binding to add @see:Menu controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a Menu control used as a value picker:&lt;/p&gt;
         * &lt;div data-bind="wjMenu: { value: tax, header: 'Tax' }"&gt;
         *     &lt;span data-bind="wjMenuItem: { value: 0 }"&gt;Exempt&lt;/span&gt;
         *     &lt;span data-bind="wjMenuSeparator: {}"&gt;&lt;/span&gt;
         *     &lt;span data-bind="wjMenuItem: { value: .05 }"&gt;5%&lt;/span&gt;
         *     &lt;span data-bind="wjMenuItem: { value: .1 }"&gt;10%&lt;/span&gt;
         *     &lt;span data-bind="wjMenuItem: { value: .15 }"&gt;15%&lt;/span&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjMenu</b> binding may contain the following child bindings: @see:wjMenuItem, @see:wjMenuSeparator.
         *
         * The <b>wjMenu</b> binding supports all read-write properties and events of
         * the @see:Menu control. The following properties provide two-way binding mode:
         * <ul>
         * 	<li><b>isDroppedDown</b></li>
         * 	<li><b>text</b></li>
         * 	<li><b>selectedIndex</b></li>
         * 	<li><b>selectedItem</b></li>
         * 	<li><b>selectedValue</b></li>
         *  <li><b>value</b></li>
         * </ul>
         */
        var wjMenu = /** @class */ (function (_super) {
            __extends(wjMenu, _super);
            function wjMenu() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjMenu.prototype._getControlConstructor = function () {
                return wijmo.input.Menu;
            };
            wjMenu.prototype._createWijmoContext = function () {
                return new WjMenuContext(this);
            };
            wjMenu.prototype._initialize = function () {
                _super.prototype._initialize.call(this);
                var valueDesc = knockout.MetaFactory.findProp('value', this._metaData.props);
                valueDesc.updateControl = this._updateControlValue;
            };
            wjMenu.prototype._updateControlValue = function (link, propDesc, control, unconvertedValue, convertedValue) {
                if (convertedValue != null) {
                    control.selectedValue = convertedValue;
                    link._updateHeader();
                }
                return true;
            };
            return wjMenu;
        }(wjComboBox));
        knockout.wjMenu = wjMenu;
        var WjMenuContext = /** @class */ (function (_super) {
            __extends(WjMenuContext, _super);
            function WjMenuContext() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjMenuContext.prototype._initControl = function () {
                var _this = this;
                _super.prototype._initControl.call(this);
                var menuCtrl = this.control;
                menuCtrl.displayMemberPath = 'header';
                menuCtrl.commandPath = 'cmd';
                menuCtrl.commandParameterPath = 'cmdParam';
                menuCtrl.selectedValuePath = 'value';
                menuCtrl.itemsSource = new wijmo.collections.ObservableArray();
                // update 'value' and header when an item is clicked
                menuCtrl.itemClicked.addHandler(function () {
                    _this._safeUpdateSrcAttr('value', menuCtrl.selectedValue);
                    _this._updateHeader();
                });
            };
            WjMenuContext.prototype._childrenInitialized = function () {
                _super.prototype._childrenInitialized.call(this);
                this.control.selectedIndex = 0;
                this._updateHeader();
            };
            // update header to show the currently selected value
            WjMenuContext.prototype._updateHeader = function () {
                var control = this.control, valSet = this.valueAccessor(), newHeader = ko.unwrap(valSet['header']);
                //control.header = scope.header;
                if (ko.unwrap(valSet['value']) !== undefined && control.selectedItem && control.displayMemberPath) {
                    var currentValue = control.selectedItem[control.displayMemberPath];
                    if (currentValue != null) {
                        newHeader += ': <b>' + currentValue + '</b>';
                    }
                }
                control.header = newHeader;
            };
            return WjMenuContext;
        }(knockout.WjContext));
        knockout.WjMenuContext = WjMenuContext;
        /**
         * KnockoutJS binding for menu items.
         *
         * Use the @see:wjMenuItem binding to add menu items to a @see:Menu control.
         * The @see:wjMenuItem binding must be contained in a @see:wjMenu binding.
         * For example:
         *
         * <pre>&lt;p&gt;Here is a Menu control with four menu items:&lt;/p&gt;
         * &lt;div data-bind="wjMenu: { value: tax, header: 'Tax' }"&gt;
         *     &lt;span data-bind="wjMenuItem: { value: 0 }"&gt;Exempt&lt;/span&gt;
         *     &lt;span data-bind="wjMenuItem: { value: .05 }"&gt;5%&lt;/span&gt;
         *     &lt;span data-bind="wjMenuItem: { value: .1 }"&gt;10%&lt;/span&gt;
         *     &lt;span data-bind="wjMenuItem: { value: .15 }"&gt;15%&lt;/span&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjMenuItem</b> binding supports the following attributes:
         *
         * <dl class="dl-horizontal">
         *   <dt>cmd</dt>       <dd>Function to execute in the controller when the item is clicked.</dd>
         *   <dt>cmdParam</dt>  <dd>Parameter passed to the <b>cmd</b> function when the item is clicked.</dd>
         *   <dt>value</dt>     <dd>Value selected when the item is clicked (use either this or <b>cmd</b>).</dd>
         * </dl class="dl-horizontal">
         */
        var wjMenuItem = /** @class */ (function (_super) {
            __extends(wjMenuItem, _super);
            function wjMenuItem() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjMenuItem.prototype._getMetaDataId = function () {
                return 'MenuItem';
            };
            wjMenuItem.prototype._createWijmoContext = function () {
                return new WjMenuItemContext(this);
            };
            wjMenuItem.prototype._initialize = function () {
                _super.prototype._initialize.call(this);
                var meta = this._metaData;
                meta.parentProperty = 'itemsSource';
                meta.isParentPropertyArray = true;
            };
            return wjMenuItem;
        }(knockout.WjBinding));
        knockout.wjMenuItem = wjMenuItem;
        var WjMenuItemContext = /** @class */ (function (_super) {
            __extends(WjMenuItemContext, _super);
            function WjMenuItemContext() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjMenuItemContext.prototype._createControl = function () {
                return { header: this.element.innerHTML, cmd: null, cmdParam: null, value: null };
            };
            return WjMenuItemContext;
        }(knockout.WjContext));
        knockout.WjMenuItemContext = WjMenuItemContext;
        /**
         * KnockoutJS binding for menu separators.
         *
         * The the @see:wjMenuSeparator adds a non-selectable separator to a @see:Menu control, and has no attributes.
         * It must be contained in a @see:wjMenu binding. For example:
         *
         * <pre>&lt;p&gt;Here is a Menu control with four menu items and one separator:&lt;/p&gt;
         * &lt;div data-bind="wjMenu: { value: tax, header: 'Tax' }"&gt;
         *     &lt;span data-bind="wjMenuItem: { value: 0 }"&gt;Exempt&lt;/span&gt;
         *     &lt;span data-bind="wjMenuSeparator: {}"&gt;&lt;/span&gt;
         *     &lt;span data-bind="wjMenuItem: { value: .05 }"&gt;5%&lt;/span&gt;
         *     &lt;span data-bind="wjMenuItem: { value: .1 }"&gt;10%&lt;/span&gt;
         *     &lt;span data-bind="wjMenuItem: { value: .15 }"&gt;15%&lt;/span&gt;
         * &lt;/div&gt;</pre>
         */
        var wjMenuSeparator = /** @class */ (function (_super) {
            __extends(wjMenuSeparator, _super);
            function wjMenuSeparator() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjMenuSeparator.prototype._getMetaDataId = function () {
                return 'MenuSeparator';
            };
            wjMenuSeparator.prototype._initialize = function () {
                _super.prototype._initialize.call(this);
                var meta = this._metaData;
                meta.parentProperty = 'itemsSource';
                meta.isParentPropertyArray = true;
            };
            wjMenuSeparator.prototype._createControl = function (element) {
                return { header: '<div class="wj-state-disabled" style="width:100%;height:1px;background-color:lightgray"/>' };
            };
            return wjMenuSeparator;
        }(knockout.WjBinding));
        knockout.wjMenuSeparator = wjMenuSeparator;
        /**
          * KnockoutJS binding for context menus.
          *
          * Use the @see:wjContextMenu binding to add context menus to elements
          * on the page. The @see:wjContextMenu binding is based on the  @see:wjMenu;
          * it displays a popup menu when the user performs a context menu
          * request on an element (usually a right-click).
          *
          * The wjContextMenu binding is specified as a parameter added to the
          * element that the context menu applies to. The parameter value is a
          * selector for the element that contains the menu. For example:
          *
          * <pre>&lt;!-- paragraph with a context menu --&gt;
          *&lt;p data-bind="wjContextMenu: { id: '#idMenu'}" &gt;
          *  This paragraph has a context menu.&lt;/p&gt;
          *
          *&lt;!-- define the context menu (hidden and with an id) --&gt;
          * &lt;div id="contextmenu" data-bind="wjMenu: { header: 'File', itemClicked: menuItemClicked}"&gt;
          *     &lt;span data-bind="wjMenuItem: {}"&gt;New&lt;/span&gt;
          *     &lt;span data-bind="wjMenuItem: {}"&gt;open an existing file or folder&lt;/span&gt;
          *     &lt;span data-bind="wjMenuItem: {}"&gt;save the current file&lt;/span&gt;
          *     &lt;span data-bind="wjMenuSeparator: {}"&gt;&lt;/span&gt;
          *     &lt;span data-bind="wjMenuItem: {}"&gt;exit the application&lt;/span&gt;
          * &lt;/div&gt;</pre>
          */
        var wjContextMenu = /** @class */ (function (_super) {
            __extends(wjContextMenu, _super);
            function wjContextMenu() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjContextMenu.prototype._getMetaDataId = function () {
                return 'ContextMenu';
            };
            wjContextMenu.prototype._createControl = function (element) {
                return null;
            };
            wjContextMenu.prototype._createWijmoContext = function () {
                return new WjContextMenuContext(this);
            };
            return wjContextMenu;
        }(knockout.WjBinding));
        knockout.wjContextMenu = wjContextMenu;
        var WjContextMenuContext = /** @class */ (function (_super) {
            __extends(WjContextMenuContext, _super);
            function WjContextMenuContext() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjContextMenuContext.prototype._initControl = function () {
                _super.prototype._initControl.call(this);
                var valSet = this.valueAccessor();
                // get context menu and drop-down list
                var host = wijmo.getElement(valSet['id']);
                // show the drop-down list in response to the contextmenu command
                this.element.addEventListener('contextmenu', function (e) {
                    var menu = wijmo.Control.getControl(host), dropDown = menu.dropDown;
                    if (menu && dropDown && !wijmo.closest(e.target, '[disabled]')) {
                        e.preventDefault();
                        menu.owner = this.element;
                        menu.selectedIndex = -1;
                        if (menu.onIsDroppedDownChanging(new wijmo.CancelEventArgs())) {
                            wijmo.showPopup(dropDown, e);
                            menu.onIsDroppedDownChanged();
                            dropDown.focus();
                        }
                    }
                });
            };
            return WjContextMenuContext;
        }(knockout.WjContext));
        knockout.WjContextMenuContext = WjContextMenuContext;
        /**
         * KnockoutJS binding for the @see:InputDate control.
         *
         * Use the @see:wjInputDate binding to add @see:InputDate controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is an InputDate control:&lt;/p&gt;
         * &lt;div data-bind="wjInputDate: {
         *   value: theDate,
         *   format: 'M/d/yyyy' }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjInputDate</b> binding supports all read-write properties and events of
         * the @see:InputDate control. The following properties provide two-way binding mode:
         * <ul>
         * 	<li><b>isDroppedDown</b></li>
         * 	<li><b>text</b></li>
         * 	<li><b>value</b></li>
         * </ul>
         */
        var wjInputDate = /** @class */ (function (_super) {
            __extends(wjInputDate, _super);
            function wjInputDate() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjInputDate.prototype._getControlConstructor = function () {
                return wijmo.input.InputDate;
            };
            return wjInputDate;
        }(WjDropDownBinding));
        knockout.wjInputDate = wjInputDate;
        /**
         * KnockoutJS binding for the @see:InputDateTime control.
         *
         * Use the @see:wjInputDateTime binding to add @see:InputDateTime controls to your
         * KnockoutJS applications.
         *
         * The <b>wjInputDateTime</b> binding supports all read-write properties and events of
         * the @see:InputDateTime control.
         */
        var wjInputDateTime = /** @class */ (function (_super) {
            __extends(wjInputDateTime, _super);
            function wjInputDateTime() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjInputDateTime.prototype._getControlConstructor = function () {
                return wijmo.input.InputDateTime;
            };
            return wjInputDateTime;
        }(knockout.WjBinding));
        knockout.wjInputDateTime = wjInputDateTime;
        /**
         * KnockoutJS binding for the @see:InputNumber control.
         *
         * Use the @see:wjInputNumber binding to add @see:InputNumber controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is an InputNumber control:&lt;/p&gt;
         * &lt;div data-bind="wjInputNumber: {
         *   value: theNumber,
         *   min: 0,
         *   max: 10,
         *   format: 'n0',
         *   placeholder: 'number between zero and ten' }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjInputNumber</b> binding supports all read-write properties and events of
         * the @see:InputNumber control. The following properties provide two-way binding mode:
         * <ul>
         * 	<li><b>value</b></li>
         * 	<li><b>text</b></li>
         * </ul>
         */
        var wjInputNumber = /** @class */ (function (_super) {
            __extends(wjInputNumber, _super);
            function wjInputNumber() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjInputNumber.prototype._getControlConstructor = function () {
                return wijmo.input.InputNumber;
            };
            return wjInputNumber;
        }(knockout.WjBinding));
        knockout.wjInputNumber = wjInputNumber;
        /**
         * KnockoutJS binding for the @see:InputMask control.
         *
         * Use the @see:wjInputMask binding to add @see:InputMask controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is an InputMask control:&lt;/p&gt;
         * &lt;div data-bind="wjInputMask: {
         *   mask: '99/99/99',
         *   promptChar: '*' }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjInputMask</b> binding supports all read-write properties and events of
         * the @see:InputMask control. The <b>value</b> property provides two-way binding mode.
         */
        var wjInputMask = /** @class */ (function (_super) {
            __extends(wjInputMask, _super);
            function wjInputMask() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjInputMask.prototype._getControlConstructor = function () {
                return wijmo.input.InputMask;
            };
            return wjInputMask;
        }(knockout.WjBinding));
        knockout.wjInputMask = wjInputMask;
        /**
         * KnockoutJS binding for the @see:InputTime control.
         *
         * Use the @see:wjInputTime binding to add @see:InputTime controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is an InputTime control:&lt;/p&gt;
         * &lt;div data-bind="wjInputTime: {
         *   min: new Date(2014, 8, 1, 9, 0),
         *   max: new Date(2014, 8, 1, 17, 0),
         *   step: 15,
         *   format: 'h:mm tt',
         *   value: theDate }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjInputTime</b> binding supports all read-write properties and events of
         * the @see:InputTime control. The following properties provide two-way binding mode:
         * <ul>
         * 	<li><b>isDroppedDown</b></li>
         * 	<li><b>text</b></li>
         * 	<li><b>selectedIndex</b></li>
         * 	<li><b>selectedItem</b></li>
         * 	<li><b>selectedValue</b></li>
         *  <li><b>value</b></li>
         * </ul>
         */
        var wjInputTime = /** @class */ (function (_super) {
            __extends(wjInputTime, _super);
            function wjInputTime() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjInputTime.prototype._getControlConstructor = function () {
                return wijmo.input.InputTime;
            };
            return wjInputTime;
        }(wjComboBox));
        knockout.wjInputTime = wjInputTime;
        /**
         * KnockoutJS binding for the @see:InputColor control.
         *
         * Use the @see:wjInputColor binding to add @see:InputColor controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a InputColor control:&lt;/p&gt;
         * &lt;div
         *   data-bind="wjInputColor: { value: theColor }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjInputColor</b> binding supports all read-write properties and events of
         * the @see:InputColor control. The following properties provide two-way binding mode:
         * <ul>
         * 	<li><b>isDroppedDown</b></li>
         * 	<li><b>text</b></li>
         * 	<li><b>value</b></li>
         * </ul>
         */
        var wjInputColor = /** @class */ (function (_super) {
            __extends(wjInputColor, _super);
            function wjInputColor() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjInputColor.prototype._getControlConstructor = function () {
                return wijmo.input.InputColor;
            };
            return wjInputColor;
        }(WjDropDownBinding));
        knockout.wjInputColor = wjInputColor;
        // Abstract
        var WjCollectionViewBaseBinding = /** @class */ (function (_super) {
            __extends(WjCollectionViewBaseBinding, _super);
            function WjCollectionViewBaseBinding() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjCollectionViewBaseBinding.prototype._createControl = function (element) {
                return null;
            };
            WjCollectionViewBaseBinding.prototype._createWijmoContext = function () {
                return new WjCollectionViewContext(this);
            };
            // Returns CV template 
            WjCollectionViewBaseBinding.prototype._getTemplate = function () {
                return '';
            };
            return WjCollectionViewBaseBinding;
        }(knockout.WjBinding));
        knockout.WjCollectionViewBaseBinding = WjCollectionViewBaseBinding;
        var WjCollectionViewContext = /** @class */ (function (_super) {
            __extends(WjCollectionViewContext, _super);
            function WjCollectionViewContext() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                // WARNING: Never assign a null value to _localVM.cv, because bindings to subproperties (cv.prop) will raise an exception.
                // Instead, assign this dummy _emptyCV.
                _this._emptyCV = new wijmo.collections.CollectionView([]);
                return _this;
            }
            WjCollectionViewContext.prototype.init = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                element.innerHTML = this.wjBinding._getTemplate();
                var cv = ko.unwrap(valueAccessor().cv) || this._emptyCV;
                this._subscribeToCV(cv);
                this._localVM = {
                    cv: ko.observable(cv)
                };
                var innerBindingContext = bindingContext.createChildContext(this._localVM);
                ko.applyBindingsToDescendants(innerBindingContext, element);
                return { controlsDescendantBindings: true };
            };
            WjCollectionViewContext.prototype.update = function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var newCV = ko.unwrap(valueAccessor().cv) || this._emptyCV, oldCV = ko.unwrap(this._localVM.cv);
                if (newCV !== oldCV) {
                    this._unsubscribeFromCV(oldCV);
                    this._subscribeToCV(newCV);
                    this._localVM.cv(newCV);
                }
            };
            WjCollectionViewContext.prototype._subscribeToCV = function (cv) {
                if (cv) {
                    cv.collectionChanged.addHandler(this._forceBindingsUpdate, this);
                    cv.currentChanged.addHandler(this._forceBindingsUpdate, this);
                    cv.pageChanged.addHandler(this._forceBindingsUpdate, this);
                }
            };
            WjCollectionViewContext.prototype._unsubscribeFromCV = function (cv) {
                if (cv) {
                    cv.collectionChanged.removeHandler(this._forceBindingsUpdate, this);
                    cv.currentChanged.removeHandler(this._forceBindingsUpdate, this);
                    cv.pageChanged.removeHandler(this._forceBindingsUpdate, this);
                }
            };
            WjCollectionViewContext.prototype._forceBindingsUpdate = function (s, e) {
                this._localVM.cv.valueHasMutated();
            };
            return WjCollectionViewContext;
        }(knockout.WjContext));
        knockout.WjCollectionViewContext = WjCollectionViewContext;
        /**
         * KnockoutJS binding for an @see:ICollectionView pager element.
         *
         * Use the @see:wjCollectionViewPager directive to add an element that allows users to
         * navigate through the pages in a paged @see:ICollectionView. For example:
         *
         * <pre>Here is a CollectionViewPager:&lt;/p&gt;
         * &lt;div
         *   data-bind="wjCollectionViewPager: { cv: myCollectionView }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The @see:wjCollectionViewPager directive has a single attribute:
         *
         * <dl class="dl-horizontal">
         *   <dt>cv</dt>  <dd>Reference to the paged @see:ICollectionView object to navigate.</dd>
         * </dl>
         */
        var wjCollectionViewPager = /** @class */ (function (_super) {
            __extends(wjCollectionViewPager, _super);
            function wjCollectionViewPager() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjCollectionViewPager.prototype._getMetaDataId = function () {
                return 'CollectionViewPager';
            };
            wjCollectionViewPager.prototype._getTemplate = function () {
                return '<div class="wj-control wj-content wj-pager">' +
                    '    <div class="wj-input-group">' +
                    '        <span class="wj-input-group-btn" >' +
                    '            <button class="wj-btn wj-btn-default" type="button"' +
                    '               data-bind="click: function () { cv().moveToFirstPage() },' +
                    '               disable: cv().pageIndex <= 0">' +
                    '                <span class="wj-glyph-left" style="margin-right: -4px;"></span>' +
                    '                <span class="wj-glyph-left"></span>' +
                    '            </button>' +
                    '        </span>' +
                    '        <span class="wj-input-group-btn" >' +
                    '           <button class="wj-btn wj-btn-default" type="button"' +
                    '               data-bind="click: function () { cv().moveToPreviousPage() },' +
                    '               disable: cv().pageIndex <= 0">' +
                    '                <span class="wj-glyph-left"></span>' +
                    '            </button>' +
                    '        </span>' +
                    '        <input type="text" class="wj-form-control" data-bind="' +
                    '            value: cv().pageIndex + 1 + \' / \' + cv().pageCount' +
                    '        " disabled />' +
                    '        <span class="wj-input-group-btn" >' +
                    '            <button class="wj-btn wj-btn-default" type="button"' +
                    '               data-bind="click: function () { cv().moveToNextPage() },' +
                    '               disable: cv().pageIndex >= cv().pageCount - 1">' +
                    '                <span class="wj-glyph-right"></span>' +
                    '            </button>' +
                    '        </span>' +
                    '        <span class="wj-input-group-btn" >' +
                    '            <button class="wj-btn wj-btn-default" type="button"' +
                    '               data-bind="click: function () { cv().moveToLastPage() },' +
                    '               disable: cv().pageIndex >= cv().pageCount - 1">' +
                    '                <span class="wj-glyph-right"></span>' +
                    '                <span class="wj-glyph-right" style="margin-left: -4px;"></span>' +
                    '            </button>' +
                    '        </span>' +
                    '    </div>' +
                    '</div>';
            };
            return wjCollectionViewPager;
        }(WjCollectionViewBaseBinding));
        knockout.wjCollectionViewPager = wjCollectionViewPager;
        /**
         * KnockoutJS binding for an @see:ICollectionView navigator element.
         *
         * Use the @see:wjCollectionViewNavigator directive to add an element that allows users to
         * navigate through the items in an @see:ICollectionView. For example:
         *
         * <pre>Here is a CollectionViewNavigator:&lt;/p&gt;
         * &lt;div
         *   data-bind="wjCollectionViewNavigator: { cv: myCollectionView }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The @see:wjCollectionViewNavigator directive has a single attribute:
         *
         * <dl class="dl-horizontal">
         *   <dt>cv</dt>  <dd>Reference to the @see:ICollectionView object to navigate.</dd>
         * </dl>
         */
        var wjCollectionViewNavigator = /** @class */ (function (_super) {
            __extends(wjCollectionViewNavigator, _super);
            function wjCollectionViewNavigator() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjCollectionViewNavigator.prototype._getMetaDataId = function () {
                return 'CollectionViewNavigator';
            };
            wjCollectionViewNavigator.prototype._getTemplate = function () {
                return '<div class="wj-control wj-content wj-pager">' +
                    '    <div class="wj-input-group">' +
                    '        <span class="wj-input-group-btn" >' +
                    '            <button class="wj-btn wj-btn-default" type="button"' +
                    '               data-bind="click: function () { cv().moveCurrentToFirst() },' +
                    '               disable: cv().currentPosition <= 0">' +
                    '                <span class="wj-glyph-left" style="margin-right: -4px;"></span>' +
                    '                <span class="wj-glyph-left"></span>' +
                    '            </button>' +
                    '        </span>' +
                    '        <span class="wj-input-group-btn" >' +
                    '           <button class="wj-btn wj-btn-default" type="button"' +
                    '               data-bind="click: function () { cv().moveCurrentToPrevious() },' +
                    '               disable: cv().currentPosition <= 0">' +
                    '                <span class="wj-glyph-left"></span>' +
                    '            </button>' +
                    '        </span>' +
                    '        <input type="text" class="wj-form-control" data-bind="' +
                    '            value: cv().currentPosition + 1 + \' / \' + cv().itemCount' +
                    '        " disabled />' +
                    '        <span class="wj-input-group-btn" >' +
                    '            <button class="wj-btn wj-btn-default" type="button"' +
                    '               data-bind="click: function () { cv().moveCurrentToNext() },' +
                    '               disable: cv().currentPosition >= cv().itemCount - 1">' +
                    '                <span class="wj-glyph-right"></span>' +
                    '            </button>' +
                    '        </span>' +
                    '        <span class="wj-input-group-btn" >' +
                    '            <button class="wj-btn wj-btn-default" type="button"' +
                    '               data-bind="click: function () { cv().moveCurrentToLast() },' +
                    '               disable: cv().currentPosition >= cv().itemCount - 1">' +
                    '                <span class="wj-glyph-right"></span>' +
                    '                <span class="wj-glyph-right" style="margin-left: -4px;"></span>' +
                    '            </button>' +
                    '        </span>' +
                    '    </div>' +
                    '</div>';
            };
            return wjCollectionViewNavigator;
        }(WjCollectionViewBaseBinding));
        knockout.wjCollectionViewNavigator = wjCollectionViewNavigator;
        /**
         * KnockoutJS binding for the @see:MultiSelect control.
         *
         * Use the @see:wjMultiSelect binding to add @see:MultiSelect controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a MultiSelect control:&lt;/p&gt;
         * &lt;div data-bind="MultiSelect: {
         *   itemsSource: countries,
         *   isEditable: false,
         *   headerFormat: '{count} countries selected' }"&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjMultiSelect</b> binding supports all read-write properties and events of
         * the @see:MultiSelect control. The following properties provide two-way binding mode:
         * <ul>
         * 	<li><b>isDroppedDown</b></li>
         * 	<li><b>text</b></li>
         * 	<li><b>selectedIndex</b></li>
         * 	<li><b>selectedItem</b></li>
         * 	<li><b>selectedValue</b></li>
         * </ul>
         */
        var wjMultiSelect = /** @class */ (function (_super) {
            __extends(wjMultiSelect, _super);
            function wjMultiSelect() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjMultiSelect.prototype._getControlConstructor = function () {
                return wijmo.input.MultiSelect;
            };
            return wjMultiSelect;
        }(wjComboBox));
        knockout.wjMultiSelect = wjMultiSelect;
        /**
         * KnockoutJS binding for the @see:MultiAutoComplete control.
         *
         * Use the @see:wjMultiAutoComplete binding to add @see:MultiAutoComplete controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a MultiAutoComplete control:&lt;/p&gt;
         * &lt;div data-bind="MultiAutoComplete: {
         *   itemsSource: countries,
         *   maxSelectedItems: 4,}"&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjMultiAutoComplete</b> binding supports all read-write properties and events of
         * the @see:MultiAutoComplete control.
         */
        var wjMultiAutoComplete = /** @class */ (function (_super) {
            __extends(wjMultiAutoComplete, _super);
            function wjMultiAutoComplete() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjMultiAutoComplete.prototype._getControlConstructor = function () {
                return wijmo.input.MultiAutoComplete;
            };
            return wjMultiAutoComplete;
        }(wjAutoComplete));
        knockout.wjMultiAutoComplete = wjMultiAutoComplete;
        /**
         * KnockoutJS binding for the @see:Popup control.
         *
         * Use the @see:wjPopup binding to add @see:Popup controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a Popup control triggered by a button:&lt;/p&gt;
         * &lt;button id="btn2" type="button"&gt;
         *     Click to show Popup
         * &lt;/button&gt;
         *  &lt;div class="popover" data-bind="wjPopup: {
         *       control: popup,
         *       owner: '#btn2',
         *       showTrigger: 'Click',
         *       hideTrigger: 'Click'}"
         *  &gt;
         *	&lt;h3&gt;
         *		 Salutation
         *	&lt;/h3&gt;
         *	 &lt;div class="popover-content"&gt;
         *	 	    Hello {&#8203;{firstName}} {&#8203;{lastName}}
         *	 &lt;/div&gt;
         * &lt;/div&gt;</pre>
         */
        var wjPopup = /** @class */ (function (_super) {
            __extends(wjPopup, _super);
            function wjPopup() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjPopup.prototype._getControlConstructor = function () {
                return wijmo.input.Popup;
            };
            wjPopup.prototype._createWijmoContext = function () {
                return new WjPopupContext(this);
            };
            wjPopup.prototype._initialize = function () {
                _super.prototype._initialize.call(this);
                var ownerDesc = knockout.MetaFactory.findProp('owner', this._metaData.props);
                ownerDesc.updateControl = function (link, propDesc, control, unconvertedValue, convertedValue) {
                    control.owner = convertedValue;
                    link._updateModal(convertedValue);
                    return true;
                };
            };
            return wjPopup;
        }(knockout.WjBinding));
        knockout.wjPopup = wjPopup;
        var WjPopupContext = /** @class */ (function (_super) {
            __extends(WjPopupContext, _super);
            function WjPopupContext() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjPopupContext.prototype._initControl = function () {
                _super.prototype._initControl.call(this);
                // if the popup will be removed from DOM on hide, the bindings will stop to update
                this.control.removeOnHide = false;
            };
            WjPopupContext.prototype._updateModal = function (convertedValue) {
                var valSet = this.valueAccessor(), popup = this.control, modal = ko.unwrap(valSet['modal']);
                if (modal == null) {
                    // not specified, make it modal if it has no owner 
                    popup['modal'] = convertedValue ? false : true;
                }
            };
            return WjPopupContext;
        }(knockout.WjContext));
        knockout.WjPopupContext = WjPopupContext;
    })(knockout = wijmo.knockout || (wijmo.knockout = {}));
})(wijmo || (wijmo = {}));
// Register bindings
(ko.bindingHandlers).wjComboBox = new wijmo.knockout.wjComboBox();
(ko.bindingHandlers).wjAutoComplete = new wijmo.knockout.wjAutoComplete();
(ko.bindingHandlers).wjCalendar = new wijmo.knockout.wjCalendar();
(ko.bindingHandlers).wjColorPicker = new wijmo.knockout.wjColorPicker();
(ko.bindingHandlers).wjListBox = new wijmo.knockout.wjListBox();
(ko.bindingHandlers).wjMenu = new wijmo.knockout.wjMenu();
(ko.bindingHandlers).wjMenuItem = new wijmo.knockout.wjMenuItem();
(ko.bindingHandlers).wjMenuSeparator = new wijmo.knockout.wjMenuSeparator();
(ko.bindingHandlers).wjContextMenu = new wijmo.knockout.wjContextMenu();
(ko.bindingHandlers).wjInputDate = new wijmo.knockout.wjInputDate();
(ko.bindingHandlers).wjInputDateTime = new wijmo.knockout.wjInputDateTime();
(ko.bindingHandlers).wjInputNumber = new wijmo.knockout.wjInputNumber();
(ko.bindingHandlers).wjInputMask = new wijmo.knockout.wjInputMask();
(ko.bindingHandlers).wjInputTime = new wijmo.knockout.wjInputTime();
(ko.bindingHandlers).wjInputColor = new wijmo.knockout.wjInputColor();
(ko.bindingHandlers).wjCollectionViewNavigator = new wijmo.knockout.wjCollectionViewNavigator();
(ko.bindingHandlers).wjCollectionViewPager = new wijmo.knockout.wjCollectionViewPager();
(ko.bindingHandlers).wjMultiSelect = new wijmo.knockout.wjMultiSelect();
(ko.bindingHandlers).wjMultiAutoComplete = new wijmo.knockout.wjMultiAutoComplete();
(ko.bindingHandlers).wjPopup = new wijmo.knockout.wjPopup();

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
var wijmo;
(function (wijmo) {
    var knockout;
    (function (knockout) {
        /**
         * KnockoutJS binding for the @see:FlexGrid control.
         *
         * Use the @see:wjFlexGrid binding to add @see:FlexGrid controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a FlexGrid control:&lt;/p&gt;
         * &lt;div data-bind="wjFlexGrid: { itemsSource: data }"&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Country',
         *         binding: 'country',
         *         width: '*' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Date',
         *         binding: 'date' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Revenue',
         *         binding: 'amount',
         *         format: 'n0' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Active',
         *         binding: 'active' }"&gt;
         *     &lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexGrid</b> binding may contain @see:wjFlexGridColumn child bindings.
         *
         * The <b>wjFlexGrid</b> binding supports all read-write properties and events of
         * the @see:FlexGrid control, except for the <b>scrollPosition</b>,
         * <b>selection</b> and <b>columnLayout</b> properties.
         */
        var wjFlexGrid = /** @class */ (function (_super) {
            __extends(wjFlexGrid, _super);
            function wjFlexGrid() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexGrid.prototype._getControlConstructor = function () {
                return wijmo.grid.FlexGrid;
            };
            wjFlexGrid.prototype._createWijmoContext = function () {
                return new WjFlexGridContext(this);
            };
            wjFlexGrid.prototype._initialize = function () {
                _super.prototype._initialize.call(this);
                var formatterDesc = knockout.MetaFactory.findProp('itemFormatter', this._metaData.props);
                formatterDesc.updateControl = this._formatterPropHandler;
            };
            wjFlexGrid.prototype._formatterPropHandler = function (link, propDesc, control, unconvertedValue, convertedValue) {
                if (unconvertedValue !== link._userFormatter) {
                    link._userFormatter = unconvertedValue;
                    control.invalidate();
                }
                return true;
            };
            wjFlexGrid._columnTemplateProp = '_wjkoColumnTemplate';
            wjFlexGrid._cellClonedTemplateProp = '__wjkoClonedTempl';
            wjFlexGrid._cellVMProp = '__wjkoCellVM';
            wjFlexGrid._templColIdx = '_wjkoTemplColIdx';
            wjFlexGrid._columnStyleBinding = 'wjStyle';
            wjFlexGrid._columnStyleProp = '__wjkoStyle';
            return wjFlexGrid;
        }(knockout.WjBinding));
        knockout.wjFlexGrid = wjFlexGrid;
        var WjFlexGridContext = /** @class */ (function (_super) {
            __extends(WjFlexGridContext, _super);
            function WjFlexGridContext() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._wrapperFormatter = _this._itemFormatter.bind(_this);
                return _this;
            }
            WjFlexGridContext.prototype._initControl = function () {
                _super.prototype._initControl.call(this);
                this.control.itemFormatter = this._wrapperFormatter;
            };
            WjFlexGridContext.prototype._itemFormatter = function (panel, r, c, cell) {
                var column = panel.columns[c], cellTemplate = column[wjFlexGrid._columnTemplateProp], cellStyle = column[wjFlexGrid._columnStyleProp];
                if ((cellTemplate || cellStyle) && panel.cellType == wijmo.grid.CellType.Cell) {
                    // do not format in edit mode
                    var editRange = panel.grid.editRange;
                    if (editRange && editRange.row === r && editRange.col === c) {
                        return;
                    }
                    // no templates in GroupRows
                    if (panel.rows[r] instanceof wijmo.grid.GroupRow) {
                        return;
                    }
                    var cellVM = cell[wjFlexGrid._cellVMProp], clonedTempl = cell[wjFlexGrid._cellClonedTemplateProp], item = panel.rows[r].dataItem;
                    if (cellVM && cell[wjFlexGrid._templColIdx] != c) {
                        cell[wjFlexGrid._cellVMProp] = cell[wjFlexGrid._cellClonedTemplateProp] =
                            cell[wjFlexGrid._templColIdx] = cellVM = clonedTempl = null;
                        ko.cleanNode(cell);
                    }
                    if (!cellVM) {
                        cellVM = {
                            $row: ko.observable(r),
                            $col: ko.observable(c),
                            $item: ko.observable(item)
                        };
                        var cellContext = this.bindingContext.extend(cellVM);
                        if (cellTemplate) {
                            cell.innerHTML = '<div>' + cellTemplate + '</div>';
                            var childEl = cell.childNodes[0];
                            cell[wjFlexGrid._cellClonedTemplateProp] = childEl;
                        }
                        else {
                            cell.setAttribute('data-bind', 'style:' + cellStyle);
                        }
                        cell[wjFlexGrid._cellVMProp] = cellVM;
                        cell[wjFlexGrid._templColIdx] = c;
                        ko.applyBindings(cellContext, cell);
                    }
                    else {
                        if (clonedTempl) {
                            cell.innerHTML = '';
                            cell.appendChild(clonedTempl);
                        }
                        cellVM.$row(r);
                        cellVM.$col(c);
                        if (cellVM.$item() != item) {
                            cellVM.$item(item);
                        }
                        else {
                            cellVM.$item.valueHasMutated();
                        }
                    }
                    //Enlarge rows height if cell doesn't fit in the current row height.
                    var cellHeight = cell.scrollHeight;
                    if (panel.rows[r].renderHeight < cellHeight) {
                        panel.rows.defaultSize = cellHeight;
                    }
                }
                else if (this._userFormatter) {
                    this._userFormatter(panel, r, c, cell);
                }
            };
            return WjFlexGridContext;
        }(knockout.WjContext));
        knockout.WjFlexGridContext = WjFlexGridContext;
        /**
         * KnockoutJS binding for the @see:FlexGrid @see:Column object.
         *
         * The @see:wjFlexGridColumn binding must be contained in a @see:wjFlexGrid binding. For example:
         *
         * <pre>&lt;p&gt;Here is a FlexGrid control:&lt;/p&gt;
         * &lt;div data-bind="wjFlexGrid: { itemsSource: data }"&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Country',
         *         binding: 'country',
         *         width: '*' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Date',
         *         binding: 'date' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Revenue',
         *         binding: 'amount',
         *         format: 'n0' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Active',
         *         binding: 'active' }"&gt;
         *     &lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexGridColumn</b> binding supports all read-write properties and events of
         * the @see:Column class. The <b>isSelected</b> property provides two-way binding mode.
         *
         * In addition to regular attributes that match properties in the <b>Column</b> class,
         * an element with the @see:wjFlexGridColumn binding may contain a @see:wjStyle binding that
         * provides conditional formatting and an HTML fragment that is used as a cell template. Grid
         * rows automatically stretch vertically to fit custom cell contents.
         *
         * Both the <b>wjStyle</b> binding and the HTML fragment can use the <b>$item</b> observable variable in
         * KnockoutJS bindings to refer to the item that is bound to the current row. Also available are the
         * <b>$row</b> and <b>$col</b> observable variables containing cell row and column indexes. For example:
         *
         * <pre>&lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Symbol',
         *         binding: 'symbol',
         *         readOnly: true,
         *         width: '*' }"&gt;
         *   &lt;a data-bind="attr: {
         *         href: 'https://finance.yahoo.com/q?s=' + $item().symbol() },
         *         text: $item().symbol"&gt;
         *   &lt;/a&gt;
         * &lt;/div&gt;
         * &lt;div data-bind="wjFlexGridColumn: {
         *      header: 'Change',
         *         binding: 'changePercent',
         *         format: 'p2',
         *         width: '*'
         *         },
         *         wjStyle: {
         *         color: getAmountColor($item().change) }"&gt;
         * &lt;/div&gt;</pre>
         *
         * These bindings create two columns.
         * The first has a template that produces a hyperlink based on the bound item's "symbol" property.
         * The second has a conditional style that renders values with a color determined by a function
         * implemented in the controller.
         */
        var wjFlexGridColumn = /** @class */ (function (_super) {
            __extends(wjFlexGridColumn, _super);
            function wjFlexGridColumn() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexGridColumn.prototype._getControlConstructor = function () {
                return wijmo.grid.Column;
            };
            wjFlexGridColumn.prototype._createControl = function (element) {
                return new wijmo.grid.Column();
            };
            wjFlexGridColumn.prototype._createWijmoContext = function () {
                return new WjFlexGridColumnContext(this);
            };
            return wjFlexGridColumn;
        }(knockout.WjBinding));
        knockout.wjFlexGridColumn = wjFlexGridColumn;
        // FlexGrid Column context, contains specific code to add column to the parent grid.
        var WjFlexGridColumnContext = /** @class */ (function (_super) {
            __extends(WjFlexGridColumnContext, _super);
            function WjFlexGridColumnContext() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjFlexGridColumnContext.prototype._initControl = function () {
                var gridContext = this.parentWjContext;
                if (gridContext) {
                    var grid = gridContext.control;
                    // Turn off autoGenerateColumns and clear the columns collection before initializing this column.
                    if (grid.autoGenerateColumns) {
                        grid.autoGenerateColumns = false;
                        grid.columns.clear();
                    }
                }
                _super.prototype._initControl.call(this);
                // Store child content in the Column and clear it.
                var template = this.element.innerHTML.trim();
                this.control[wjFlexGrid._columnTemplateProp] = template;
                var wjStyleBind = this.allBindings.get(wjFlexGrid._columnStyleBinding);
                if (wjStyleBind) {
                    this.control[wjFlexGrid._columnStyleProp] = wjStyleBind.trim();
                }
                if (template || wjStyleBind) {
                    this.control._setFlag(wijmo.grid.RowColFlags.HasTemplate, true);
                }
                this.element.innerHTML = '';
            };
            return WjFlexGridColumnContext;
        }(knockout.WjContext));
        knockout.WjFlexGridColumnContext = WjFlexGridColumnContext;
        /**
         * KnockoutJS binding for conditional formatting of @see:FlexGrid @see:Column cells.
         *
         * Use the @see:wjStyle binding together with the @see:wjFlexGridColumn binding to provide
         * conditional formatting to column cells.
         * For example:
         *
         * <pre>&lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Change',
         *         binding: 'changePercent',
         *         format: 'p2',
         *         width: '*'
         *         },
         *         wjStyle: { color: getAmountColor($item().change) }"&gt;&lt;/div&gt;</pre>
         *
         *
         * The <b>wjStyle</b> uses the same syntax as the native KnockoutJS
         * <a href="http://knockoutjs.com/documentation/style-binding.html" target="_blank">style</a> binding.
         * In addition to the view model properties, the following observable variables are available in binding
         * expressions:
         *
         * <dl class="dl-horizontal">
         *   <dt>$item</dt>  <dd>References the item that is bound to the current row.</dd>
         *   <dt>$row</dt>  <dd>The row index.</dd>
         *   <dt>$col</dt>  <dd>The column index.</dd>
         * </dl>
         */
        var wjStyle = /** @class */ (function () {
            function wjStyle() {
                this.preprocess = function (value, name, addBinding) {
                    return wjStyle.quoteString(value);
                };
                this.init = function () {
                };
            }
            wjStyle.quoteString = function (s) {
                if (s == null) {
                    return s;
                }
                return "'" + s.replace(/'/g, "\\'") + "'";
            };
            wjStyle.unquoteString = function (s) {
                if (!s || s.length < 2) {
                    return s;
                }
                if (s.charAt(0) === "'") {
                    s = s.substr(1, s.length - 1);
                }
                return s.replace(/\\\'/g, "'");
            };
            return wjStyle;
        }());
        knockout.wjStyle = wjStyle;
        /**
         * KnockoutJS binding for the @see:FlexGrid @see:FlexGridFilter object.
         *
         * The @see:wjFlexGridFilter binding must be contained in a @see:wjFlexGrid binding. For example:
         *
         * <pre>&lt;p&gt;Here is a FlexGrid control with column filters:&lt;/p&gt;
         * &lt;div data-bind="wjFlexGrid: { itemsSource: data }"&gt;
         *     &lt;div data-bind="wjFlexGridFilter: { filterColumns: ['country', 'amount']  }"&gt;&lt;/div&gt;
         * &nbsp;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Country',
         *         binding: 'country',
         *         width: '*' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Date',
         *         binding: 'date' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Revenue',
         *         binding: 'amount',
         *         format: 'n0' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Active',
         *         binding: 'active' }"&gt;
         *     &lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexGridFilter</b> binding supports all read-write properties and events of
         * the @see:FlexGridFilter class.
         *
         */
        var wjFlexGridFilter = /** @class */ (function (_super) {
            __extends(wjFlexGridFilter, _super);
            function wjFlexGridFilter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexGridFilter.prototype._getControlConstructor = function () {
                return wijmo.grid.filter.FlexGridFilter;
            };
            return wjFlexGridFilter;
        }(knockout.WjBinding));
        knockout.wjFlexGridFilter = wjFlexGridFilter;
        /**
         * KnockoutJS binding for the @see:FlexGrid @see:GroupPanel control.
         *
         * The <b>wjGroupPanel</b> binding should be connected to the <b>FlexGrid</b> control using the <b>grid</b> property.
         * For example:
         *
         * <pre>&lt;p&gt;Here is a FlexGrid control with GroupPanel:&lt;/p&gt;
         * &nbsp;
         * &lt;div data-bind="wjGroupPanel: { grid: flex(), placeholder: 'Drag columns here to create groups.' }"&gt;&lt;/div&gt;
         * &nbsp;
         * &lt;div data-bind="wjFlexGrid: { control: flex, itemsSource: data }"&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Country',
         *         binding: 'country',
         *         width: '*' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Date',
         *         binding: 'date' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Revenue',
         *         binding: 'amount',
         *         format: 'n0' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexGridColumn: {
         *         header: 'Active',
         *         binding: 'active' }"&gt;
         *     &lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjGroupPanel</b> binding supports all read-write properties and events of
         * the @see:GroupPanel class.
         *
         */
        var wjGroupPanel = /** @class */ (function (_super) {
            __extends(wjGroupPanel, _super);
            function wjGroupPanel() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjGroupPanel.prototype._getControlConstructor = function () {
                return wijmo.grid.grouppanel.GroupPanel;
            };
            return wjGroupPanel;
        }(knockout.WjBinding));
        knockout.wjGroupPanel = wjGroupPanel;
        /**
         * KnockoutJS binding for the @see:FlexSheet control.
         *
         * Use the @see:wjFlexSheet binding to add @see:FlexSheet controls to your
         * KnockoutJS applications.
         *
         * The <b>wjFlexSheet</b> binding may contain @see:wjSheet child bindings.
         *
         * The <b>wjFlexSheet</b> binding supports all read-write properties and events of
         * the @see:FlexSheet control.
         */
        var wjFlexSheet = /** @class */ (function (_super) {
            __extends(wjFlexSheet, _super);
            function wjFlexSheet() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexSheet.prototype._getControlConstructor = function () {
                return wijmo.grid.sheet.FlexSheet;
            };
            return wjFlexSheet;
        }(wjFlexGrid));
        knockout.wjFlexSheet = wjFlexSheet;
        /**
         * KnockoutJS binding for the @see:FlexSheet @see:Sheet object.
         *
         * The @see:wjSheet binding must be contained in a @see:wjFlexSheet binding.
         *
         * The <b>wjSheet</b> binding supports all read-write properties and events of
         * the @see:Sheet class.
         *
         */
        var wjSheet = /** @class */ (function (_super) {
            __extends(wjSheet, _super);
            function wjSheet() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjSheet.prototype._getControlConstructor = function () {
                return wijmo.grid.sheet.Sheet;
            };
            wjSheet.prototype._createWijmoContext = function () {
                return new WjSheetContext(this);
            };
            return wjSheet;
        }(knockout.WjBinding));
        knockout.wjSheet = wjSheet;
        var WjSheetContext = /** @class */ (function (_super) {
            __extends(WjSheetContext, _super);
            function WjSheetContext() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjSheetContext.prototype._initControl = function () {
                _super.prototype._initControl.call(this);
                var valSet = this.valueAccessor(), flexSheet = this.parentWjContext.control, itemsSource = ko.unwrap(valSet['itemsSource']), sheetName = ko.unwrap(valSet['name']);
                if (itemsSource) {
                    return flexSheet.addBoundSheet(sheetName, itemsSource);
                }
                else {
                    return flexSheet.addUnboundSheet(sheetName, +ko.unwrap(valSet['rowCount']), +ko.unwrap(valSet['columnCount']));
                }
            };
            return WjSheetContext;
        }(knockout.WjContext));
        knockout.WjSheetContext = WjSheetContext;
        /**
           * KnockoutJS binding for the @see:MultiRow object.
           * Use the @see:wjMultiRow binding to add @see:MultiRow controls to your
           * KnockoutJS applications. For example:
           *  &lt;div data-bind="wjMultiRow:
           *      {
           *          itemsSource: orders,
           *          layoutDefinition: ldThreeLines
           *      }"&gt;
           *  &lt;/div&gt;
           *
           * The <b>wjMultiRow</b> binding supports all read-write properties and events of
           * the @see:MultiRow class.
           *
           */
        var wjMultiRow = /** @class */ (function (_super) {
            __extends(wjMultiRow, _super);
            function wjMultiRow() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjMultiRow.prototype._getControlConstructor = function () {
                return wijmo.grid.multirow.MultiRow;
            };
            return wjMultiRow;
        }(wjFlexGrid));
        knockout.wjMultiRow = wjMultiRow;
    })(knockout = wijmo.knockout || (wijmo.knockout = {}));
})(wijmo || (wijmo = {}));
// Register bindings
(ko.bindingHandlers)[wijmo.knockout.wjFlexGrid._columnStyleBinding] = new wijmo.knockout.wjStyle();
(ko.bindingHandlers).wjFlexGrid = new wijmo.knockout.wjFlexGrid();
(ko.bindingHandlers).wjFlexGridColumn = new wijmo.knockout.wjFlexGridColumn();
(ko.bindingHandlers).wjFlexGridFilter = new wijmo.knockout.wjFlexGridFilter();
(ko.bindingHandlers).wjGroupPanel = new wijmo.knockout.wjGroupPanel();
(ko.bindingHandlers).wjFlexSheet = new wijmo.knockout.wjFlexSheet();
(ko.bindingHandlers).wjSheet = new wijmo.knockout.wjSheet();
(ko.bindingHandlers).wjMultiRow = new wijmo.knockout.wjMultiRow();

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
var wijmo;
(function (wijmo) {
    var knockout;
    (function (knockout) {
        // Base abstract class for specific Chart type bindings
        var WjFlexChartBaseBinding = /** @class */ (function (_super) {
            __extends(WjFlexChartBaseBinding, _super);
            function WjFlexChartBaseBinding() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjFlexChartBaseBinding.prototype._getControlConstructor = function () {
                return wijmo.chart.FlexChartBase;
            };
            WjFlexChartBaseBinding.prototype._initialize = function () {
                _super.prototype._initialize.call(this);
                var tooltipDesc = knockout.MetaFactory.findProp('tooltipContent', this._metaData.props);
                tooltipDesc.updateControl = function (link, propDesc, control, unconvertedValue, convertedValue) {
                    if (convertedValue != null) {
                        control.tooltip.content = convertedValue;
                    }
                    return true;
                };
            };
            return WjFlexChartBaseBinding;
        }(knockout.WjBinding));
        knockout.WjFlexChartBaseBinding = WjFlexChartBaseBinding;
        /**
         * KnockoutJS binding for the @see:FlexChart control.
         *
         * Use the @see:wjFlexChart binding to add @see:FlexChart controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a FlexChart control:&lt;/p&gt;
         * &lt;div data-bind="wjFlexChart: { itemsSource: data }"&gt;
         *     &lt;div data-bind="wjFlexChartLegend : {
         *         position: 'Top' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartAxis: {
         *         wjProperty: 'axisX',
         *         title: chartProps.titleX }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartAxis: {
         *         wjProperty: 'axisY',
         *         majorUnit: 5000 }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: {
         *         name: 'Sales',
         *         binding: 'sales' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: {
         *         name: 'Expenses',
         *         binding: 'expenses' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: {
         *         name: 'Downloads',
         *         binding: 'downloads',
         *         chartType: 'LineSymbols' }"&gt;
         *     &lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChart</b> binding may contain the following child bindings:
         * @see:wjFlexChartAxis, @see:wjFlexChartSeries, @see:wjFlexChartLegend.
         *
         * The <b>wjFlexChart</b> binding supports all read-write properties and events of
         * the @see:FlexChart control, and the additional <b>tooltipContent</b> property
         * that assigns a value to the <b>FlexChart.tooltip.content</b> property.
         * The <b>selection</b> property provides two-way binding mode.
         */
        var wjFlexChart = /** @class */ (function (_super) {
            __extends(wjFlexChart, _super);
            function wjFlexChart() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChart.prototype._getControlConstructor = function () {
                return wijmo.chart.FlexChart;
            };
            wjFlexChart.prototype._initialize = function () {
                _super.prototype._initialize.call(this);
                var lblContentDesc = knockout.MetaFactory.findProp('labelContent', this._metaData.props);
                lblContentDesc.updateControl = function (link, propDesc, control, unconvertedValue, convertedValue) {
                    if (convertedValue != null) {
                        control.dataLabel.content = convertedValue;
                    }
                    return true;
                };
            };
            return wjFlexChart;
        }(WjFlexChartBaseBinding));
        knockout.wjFlexChart = wjFlexChart;
        /**
         * KnockoutJS binding for the @see:FlexPie control.
         *
         * Use the @see:wjFlexPie binding to add @see:FlexPie controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a FlexPie control:&lt;/p&gt;
         * &lt;div data-bind="wjFlexPie: {
         *         itemsSource: data,
         *         binding: 'value',
         *         bindingName: 'name',
         *         header: 'Fruit By Value' }"&gt;
         *     &lt;div data-bind="wjFlexChartLegend : { position: 'Top' }"&gt;&lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexPie</b> binding may contain the @see:wjFlexChartLegend child binding.
         *
         * The <b>wjFlexPie</b> binding supports all read-write properties and events of
         * the @see:FlexPie control.
         */
        var wjFlexPie = /** @class */ (function (_super) {
            __extends(wjFlexPie, _super);
            function wjFlexPie() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexPie.prototype._getControlConstructor = function () {
                return wijmo.chart.FlexPie;
            };
            wjFlexPie.prototype._initialize = function () {
                _super.prototype._initialize.call(this);
                var lblContentDesc = knockout.MetaFactory.findProp('labelContent', this._metaData.props);
                lblContentDesc.updateControl = function (link, propDesc, control, unconvertedValue, convertedValue) {
                    if (convertedValue != null) {
                        control.dataLabel.content = convertedValue;
                    }
                    return true;
                };
            };
            return wjFlexPie;
        }(WjFlexChartBaseBinding));
        knockout.wjFlexPie = wjFlexPie;
        /**
         * KnockoutJS binding for the @see:FlexChart @see:Axis object.
         *
         * The @see:wjFlexChartAxis binding must be contained in a @see:wjFlexChart binding. Use the <b>wjProperty</b>
         * attribute to specify the property (<b>axisX</b> or <b>axisY</b>) to initialize with this binding.
         *
         * The <b>wjFlexChartAxis</b> binding supports all read-write properties and events of
         * the @see:Axis class.
         */
        var wjFlexChartAxis = /** @class */ (function (_super) {
            __extends(wjFlexChartAxis, _super);
            function wjFlexChartAxis() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartAxis.prototype._getControlConstructor = function () {
                return wijmo.chart.Axis;
            };
            return wjFlexChartAxis;
        }(knockout.WjBinding));
        knockout.wjFlexChartAxis = wjFlexChartAxis;
        /**
         * KnockoutJS binding for the Charts' @see:Legend object.
         *
         * The @see:wjFlexChartLegend binding must be contained in one the following bindings:
         *  @see:wjFlexChart, @see:wjFlexPie.
         *
         * The <b>wjFlexChartLegend</b> binding supports all read-write properties and events of
         * the @see:Legend class.
         */
        var wjFlexChartLegend = /** @class */ (function (_super) {
            __extends(wjFlexChartLegend, _super);
            function wjFlexChartLegend() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartLegend.prototype._getControlConstructor = function () {
                return wijmo.chart.Legend;
            };
            return wjFlexChartLegend;
        }(knockout.WjBinding));
        knockout.wjFlexChartLegend = wjFlexChartLegend;
        var WjSeriesBase = /** @class */ (function (_super) {
            __extends(WjSeriesBase, _super);
            function WjSeriesBase() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjSeriesBase.prototype._getControlConstructor = function () {
                return wijmo.chart.SeriesBase;
            };
            WjSeriesBase.prototype._createControl = function (element) {
                return _super.prototype._createControl.call(this, null);
            };
            return WjSeriesBase;
        }(knockout.WjBinding));
        knockout.WjSeriesBase = WjSeriesBase;
        /**
         * KnockoutJS binding for the @see:FlexChart @see:Series object.
         *
         * The @see:wjFlexChartSeries binding must be contained in a @see:wjFlexChart binding.
         *
         * The <b>wjFlexChartSeries</b> binding supports all read-write properties and events of
         * the @see:Series class. The <b>visibility</b> property provides two-way binding mode.
         */
        var wjFlexChartSeries = /** @class */ (function (_super) {
            __extends(wjFlexChartSeries, _super);
            function wjFlexChartSeries() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartSeries.prototype._getControlConstructor = function () {
                return wijmo.chart.Series;
            };
            wjFlexChartSeries.prototype._createWijmoContext = function () {
                return new WjFlexChartSeriesContext(this);
            };
            return wjFlexChartSeries;
        }(WjSeriesBase));
        knockout.wjFlexChartSeries = wjFlexChartSeries;
        var WjFlexChartSeriesContext = /** @class */ (function (_super) {
            __extends(WjFlexChartSeriesContext, _super);
            function WjFlexChartSeriesContext() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjFlexChartSeriesContext.prototype._initControl = function () {
                var _this = this;
                _super.prototype._initControl.call(this);
                //Update bindings to the visibility property on parent Chart seriesVisibilityChanged event.
                var parentCtrl = this.parentWjContext.control;
                if (parentCtrl instanceof wijmo.chart.FlexChart) {
                    parentCtrl.seriesVisibilityChanged.addHandler(function (s, e) {
                        _this._updateSource();
                    });
                }
            };
            return WjFlexChartSeriesContext;
        }(knockout.WjContext));
        knockout.WjFlexChartSeriesContext = WjFlexChartSeriesContext;
        /**
         * KnockoutJS binding for the @see:FinancialChart control.
         *
         * Use the @see:wjFinancialChart binding to add @see:FinancialChart controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a FinancialChart control:&lt;/p&gt;
         * &lt;div data-bind="wjFinancialChart: { itemsSource: data, chartType: 'Candlestick' }"&gt;
         *     &lt;div data-bind="wjFlexChartLegend : {
         *         position: 'Top' }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjFinancialChartSeries: {
         *          name: 'close',
         *         binding: 'high,low,open,close' }"&gt;
         *     &lt;/div&gt;
         *     &lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFinancialChart</b> binding may contain the following child bindings:
         * @see:wjFlexChartAxis, @see:wjFinancialChartSeries, @see:wjFlexChartLegend.
         *
         * The <b>wjFinancialChart</b> binding supports all read-write properties and events of
         * the @see:FinancialChart control, and the additional <b>tooltipContent</b> property
         * that assigns a value to the <b>FinancialChart.tooltip.content</b> property.
         * The <b>selection</b> property provides two-way binding mode.
         */
        var wjFinancialChart = /** @class */ (function (_super) {
            __extends(wjFinancialChart, _super);
            function wjFinancialChart() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFinancialChart.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.FinancialChart;
            };
            wjFinancialChart.prototype._initialize = function () {
                _super.prototype._initialize.call(this);
                var lblContentDesc = knockout.MetaFactory.findProp('labelContent', this._metaData.props);
                lblContentDesc.updateControl = function (link, propDesc, control, unconvertedValue, convertedValue) {
                    if (convertedValue != null) {
                        control.dataLabel.content = convertedValue;
                    }
                    return true;
                };
            };
            return wjFinancialChart;
        }(WjFlexChartBaseBinding));
        knockout.wjFinancialChart = wjFinancialChart;
        /**
         * KnockoutJS binding for the @see:FinancialChart @see:FinancialSeries object.
         *
         * The @see:WjFinancialChartSeries binding must be contained in a @see:wjFinancialChart binding.
         *
         * The <b>WjFinancialChartSeries</b> binding supports all read-write properties and events of
         * the @see:FinancialSeries class. The <b>visibility</b> property provides two-way binding mode.
         */
        var wjFinancialChartSeries = /** @class */ (function (_super) {
            __extends(wjFinancialChartSeries, _super);
            function wjFinancialChartSeries() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFinancialChartSeries.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.FinancialSeries;
            };
            wjFinancialChartSeries.prototype._createWijmoContext = function () {
                return new WjFinancialChartSeriesContext(this);
            };
            return wjFinancialChartSeries;
        }(knockout.WjBinding));
        knockout.wjFinancialChartSeries = wjFinancialChartSeries;
        var WjFinancialChartSeriesContext = /** @class */ (function (_super) {
            __extends(WjFinancialChartSeriesContext, _super);
            function WjFinancialChartSeriesContext() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjFinancialChartSeriesContext.prototype._initControl = function () {
                var _this = this;
                _super.prototype._initControl.call(this);
                //Update bindings to the visibility property on parent Chart seriesVisibilityChanged event.
                var parentCtrl = this.parentWjContext.control;
                if (parentCtrl instanceof wijmo.chart.finance.FinancialChart) {
                    parentCtrl.seriesVisibilityChanged.addHandler(function (s, e) {
                        _this._updateSource();
                    });
                }
            };
            return WjFinancialChartSeriesContext;
        }(knockout.WjContext));
        knockout.WjFinancialChartSeriesContext = WjFinancialChartSeriesContext;
        /**
         * KnockoutJS binding for the @see:LineMarker control.
         *
         * Use the @see:wjFlexChartLineMarker binding to add @see:LineMarker controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a LineMarker:&lt;/p&gt;
         * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
         *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: { name: 'Expenses', binding: 'expenses' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: { name: 'Downloads', binding: 'downloads' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartLineMarker: { interaction: 'Move', lines: 'Both' }"&gt;&lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         *
         * The <b>wjFlexChartLineMarker</b> binding supports all read-write properties and events of
         * the @see:LineMarker class.
         */
        var wjFlexChartLineMarker = /** @class */ (function (_super) {
            __extends(wjFlexChartLineMarker, _super);
            function wjFlexChartLineMarker() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartLineMarker.prototype._getControlConstructor = function () {
                return wijmo.chart.LineMarker;
            };
            return wjFlexChartLineMarker;
        }(knockout.WjBinding));
        knockout.wjFlexChartLineMarker = wjFlexChartLineMarker;
        /**
         * KnockoutJS binding for the @see:RangeSelector control.
         *
         * Use the @see:wjFlexChartRangeSelector binding to add @see:RangeSelector controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a RangeSelector control:&lt;/p&gt;
         * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
         *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: { name: 'Expenses', binding: 'expenses' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: { name: 'Downloads', binding: 'downloads' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartRangeSelector: { seamless: 'true',rangeChanged: rangeChanged }"&gt;&lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartRangeSelector</b> binding supports all read-write properties and events of
         * the @see:RangeSelector class.
         */
        var wjFlexChartRangeSelector = /** @class */ (function (_super) {
            __extends(wjFlexChartRangeSelector, _super);
            function wjFlexChartRangeSelector() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartRangeSelector.prototype._getControlConstructor = function () {
                return wijmo.chart.interaction.RangeSelector;
            };
            return wjFlexChartRangeSelector;
        }(knockout.WjBinding));
        knockout.wjFlexChartRangeSelector = wjFlexChartRangeSelector;
        /**
         * KnockoutJS binding for the @see:ChartGestures object.
         *
         * Use the @see:wjFlexChartGestures binding to add @see:ChartGestures controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a ChartGestures:&lt;/p&gt;
         * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
         *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartGestures: { scaleX:0.5, posX:0.1 } "&gt;&lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartGestures</b> binding supports all read-write properties and events of
         * the @see:ChartGestures class.
         */
        var wjFlexChartGestures = /** @class */ (function (_super) {
            __extends(wjFlexChartGestures, _super);
            function wjFlexChartGestures() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartGestures.prototype._getControlConstructor = function () {
                return wijmo.chart.interaction.ChartGestures;
            };
            return wjFlexChartGestures;
        }(knockout.WjBinding));
        knockout.wjFlexChartGestures = wjFlexChartGestures;
        /**
         * KnockoutJS binding for the @see:PlotArea object.
         *
         * Use the @see:wjFlexChartPlotArea binding to add @see:PlotArea object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a PlotArea:&lt;/p&gt;
         * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
         *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartPlotArea: { row:0, name:'plot1', style:{ fill: 'rgba(136,189,230,0.2)'} }  "&gt;&lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartPlotArea</b> binding supports all read-write properties and events of
         * the @see:PlotArea class.
         */
        var wjFlexChartPlotArea = /** @class */ (function (_super) {
            __extends(wjFlexChartPlotArea, _super);
            function wjFlexChartPlotArea() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartPlotArea.prototype._getControlConstructor = function () {
                return wijmo.chart.PlotArea;
            };
            return wjFlexChartPlotArea;
        }(knockout.WjBinding));
        knockout.wjFlexChartPlotArea = wjFlexChartPlotArea;
        /**
         * KnockoutJS binding for the @see:DataPoint object.
    
         * The <b>wjFlexChartDataPoint</b> must be contained in a
         * @see:wjFlexChartAnnotation. The property of the parent object
         * where <b>wjFlexChartDataPoint</b> should assign a value is specified in the
         * <b>wjProperty</b> attribute.
         *
         * Use the @see:wjFlexChartDataPoint binding to add @see:DataPoint object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a DataPoint:&lt;/p&gt;
         *   &lt;div data-bind="wjFlexChartDataPoint: { wjProperty: 'point', x: 0.9, y:0.4}" &gt;&lt;/div&gt;
         *  </pre>
         *
         * The <b>wjFlexChartDataPoint</b> binding supports all read-write properties and events of
         * the @see:DataPoint class.
         */
        var wjFlexChartDataPoint = /** @class */ (function (_super) {
            __extends(wjFlexChartDataPoint, _super);
            function wjFlexChartDataPoint() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartDataPoint.prototype._getControlConstructor = function () {
                return wijmo.chart.DataPoint;
            };
            return wjFlexChartDataPoint;
        }(knockout.WjBinding));
        knockout.wjFlexChartDataPoint = wjFlexChartDataPoint;
        /**
         * KnockoutJS binding for the @see:AnnotationLayer object.
         *
         * Use the @see:wjFlexChartAnnotationLayer binding to add @see:AnnotationLayer object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a AnnotationLayer:&lt;/p&gt;
         *&lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
         *    &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
         *    &lt;div data-bind="wjFlexChartAnnotationLayer: {}"&gt;
         *        &lt;div data-bind="wjFlexChartAnnotation: { type: 'Rectangle', content: 'E',height:20, width:20,attachment:'DataIndex',pointIndex: 10}"&gt;&lt;/div&gt;
         *        &lt;div data-bind="wjFlexChartAnnotation: { type: 'Ellipse', content: 'E',height:20, width:20,attachment:'DataIndex',pointIndex: 30}"&gt;&lt;/div&gt;
         *    &lt;/div&gt;
          &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartAnnotationLayer</b> binding supports all read-write properties and events of
         * the @see:AnnotationLayer class.
         */
        var wjFlexChartAnnotationLayer = /** @class */ (function (_super) {
            __extends(wjFlexChartAnnotationLayer, _super);
            function wjFlexChartAnnotationLayer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartAnnotationLayer.prototype._getControlConstructor = function () {
                return wijmo.chart.annotation.AnnotationLayer;
            };
            return wjFlexChartAnnotationLayer;
        }(knockout.WjBinding));
        knockout.wjFlexChartAnnotationLayer = wjFlexChartAnnotationLayer;
        /**
         * KnockoutJS binding for annotations.
         *
         * The <b>wjFlexChartAnnotation</b> must be contained in a
         * @see:wjFlexChartAnnotationLayer binding.For example:
         * <pre>&lt;p&gt;Here is a AnnotationLayer:&lt;/p&gt;
         *&lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
         *    &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
         *    &lt;div data-bind="wjFlexChartAnnotationLayer: {}"&gt;
         *        &lt;div data-bind="wjFlexChartAnnotation: { type: 'Rectangle', content: 'E',height:20, width:20,attachment:'DataIndex',pointIndex: 10}"&gt;&lt;/div&gt;
         *        &lt;div data-bind="wjFlexChartAnnotation: { type: 'Ellipse', content: 'E',height:20, width:20,attachment:'DataIndex',pointIndex: 30}"&gt;&lt;/div&gt;
         *    &lt;/div&gt;
          &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartAnnotation</b> is used to represent all types of
         * possible annotation shapes like <b>Circle</b>, <b>Rectangle</b>, <b>Polygon</b>
         * and so on. The type of annotation shape is specified
         * in the <b>type</b> attribute.
         */
        var wjFlexChartAnnotation = /** @class */ (function (_super) {
            __extends(wjFlexChartAnnotation, _super);
            function wjFlexChartAnnotation() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartAnnotation.prototype._createControl = function (element) {
                return this._context._createAnnotation();
            };
            wjFlexChartAnnotation.prototype._getMetaDataId = function () {
                return 'FlexChartAnnotation';
            };
            wjFlexChartAnnotation.prototype._createWijmoContext = function () {
                this._context = new wjFlexChartAnnotationContext(this);
                return this._context;
            };
            return wjFlexChartAnnotation;
        }(knockout.WjBinding));
        knockout.wjFlexChartAnnotation = wjFlexChartAnnotation;
        var wjFlexChartAnnotationContext = /** @class */ (function (_super) {
            __extends(wjFlexChartAnnotationContext, _super);
            function wjFlexChartAnnotationContext() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartAnnotationContext.prototype._createAnnotation = function () {
                var valSet = this.valueAccessor(), type = ko.unwrap(valSet['type']);
                return new wijmo.chart.annotation[type]();
            };
            return wjFlexChartAnnotationContext;
        }(knockout.WjContext));
        knockout.wjFlexChartAnnotationContext = wjFlexChartAnnotationContext;
        /**
         * KnockoutJS binding for the @see:ChartAnimation object.
         *
         * Use the @see:wjFlexChartAnimation binding to add @see:ChartAnimation object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a ChartAnimation:&lt;/p&gt;
         * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country',chartType:'Column' }"&gt;
         *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartAnimation: { animationMode: 'Series',easing:'Swing',duration:2000 }  "&gt;&lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartAnimation</b> binding supports all read-write properties and events of
         * the @see:ChartAnimation class.
         */
        var wjFlexChartAnimation = /** @class */ (function (_super) {
            __extends(wjFlexChartAnimation, _super);
            function wjFlexChartAnimation() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartAnimation.prototype._getControlConstructor = function () {
                return wijmo.chart.animation.ChartAnimation;
            };
            return wjFlexChartAnimation;
        }(knockout.WjBinding));
        knockout.wjFlexChartAnimation = wjFlexChartAnimation;
        var WjTrendLineBase = /** @class */ (function (_super) {
            __extends(WjTrendLineBase, _super);
            function WjTrendLineBase() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjTrendLineBase.prototype._getControlConstructor = function () {
                return wijmo.chart.analytics.TrendLineBase;
            };
            return WjTrendLineBase;
        }(WjSeriesBase));
        knockout.WjTrendLineBase = WjTrendLineBase;
        /**
         * KnockoutJS binding for the @see:TrendLine object.
         *
         * Use the @see:wjFlexChartTrendLine binding to add @see:TrendLine object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a TrendLine:&lt;/p&gt;
         * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country',chartType:'Column' }"&gt;
         *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartAnimation: { animationMode: 'Series',easing:'Swing',duration:2000 }  "&gt;&lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartTrendLine</b> binding supports all read-write properties and events of
         * the @see:TrendLine class.
         */
        var wjFlexChartTrendLine = /** @class */ (function (_super) {
            __extends(wjFlexChartTrendLine, _super);
            function wjFlexChartTrendLine() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartTrendLine.prototype._getControlConstructor = function () {
                return wijmo.chart.analytics.TrendLine;
            };
            return wjFlexChartTrendLine;
        }(WjTrendLineBase));
        knockout.wjFlexChartTrendLine = wjFlexChartTrendLine;
        /**
         * KnockoutJS binding for the @see:MovingAverage object.
         *
         * Use the @see:wjFlexChartMovingAverage binding to add @see:MovingAverage object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a MovingAverage:&lt;/p&gt;
         * &lt;div data-bind="wjFlexChart: { itemsSource: trendItemsSource, bindingX: 'x' }"&gt;
         *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartSeries: { chartType: 'Scatter', name: 'Base Data', binding: 'y' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartMovingAverage: { binding: 'y', bindingX: 'x', period:2 }  "&gt;&lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartMovingAverage</b> binding supports all read-write properties and events of
         * the @see:MovingAverage class.
         */
        var wjFlexChartMovingAverage = /** @class */ (function (_super) {
            __extends(wjFlexChartMovingAverage, _super);
            function wjFlexChartMovingAverage() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartMovingAverage.prototype._getControlConstructor = function () {
                return wijmo.chart.analytics.MovingAverage;
            };
            return wjFlexChartMovingAverage;
        }(WjTrendLineBase));
        knockout.wjFlexChartMovingAverage = wjFlexChartMovingAverage;
        /**
         * KnockoutJS binding for the @see:YFunctionSeries object.
         *
         * Use the @see:wjFlexChartYFunctionSeries binding to add @see:YFunctionSeries object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a YFunctionSeries:&lt;/p&gt;
         * &lt;div data-bind="wjFlexChart: { itemsSource: trendItemsSource, bindingX: 'x' }"&gt;
         *     &lt;div data-bind="wjFlexChartYFunctionSeries: {  min: 10, max: -10, sampleCount:100,func:func }"&gt;&lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartYFunctionSeries</b> binding supports all read-write properties and events of
         * the @see:YFunctionSeries class.
         */
        var wjFlexChartYFunctionSeries = /** @class */ (function (_super) {
            __extends(wjFlexChartYFunctionSeries, _super);
            function wjFlexChartYFunctionSeries() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartYFunctionSeries.prototype._getControlConstructor = function () {
                return wijmo.chart.analytics.YFunctionSeries;
            };
            return wjFlexChartYFunctionSeries;
        }(WjTrendLineBase));
        knockout.wjFlexChartYFunctionSeries = wjFlexChartYFunctionSeries;
        /**
         * KnockoutJS binding for the @see:ParametricFunctionSeries object.
         *
         * Use the @see:wjFlexChartParametricFunctionSeries binding to add @see:ParametricFunctionSeries object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a ParametricFunctionSeries:&lt;/p&gt;
         * &lt;div data-bind="wjFlexChart: { itemsSource: trendItemsSource, bindingX: 'x' }"&gt;
         *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
         *     &lt;div data-bind="wjFlexChartParametricFunctionSeries: {  sampleCount:1000, max: max,xFunc:xFunc,yFunc:yFunc  }"&gt;&lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartParametricFunctionSeries</b> binding supports all read-write properties and events of
         * the @see:ParametricFunctionSeries class.
         */
        var wjFlexChartParametricFunctionSeries = /** @class */ (function (_super) {
            __extends(wjFlexChartParametricFunctionSeries, _super);
            function wjFlexChartParametricFunctionSeries() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartParametricFunctionSeries.prototype._getControlConstructor = function () {
                return wijmo.chart.analytics.ParametricFunctionSeries;
            };
            wjFlexChartParametricFunctionSeries.prototype._initialize = function () {
                _super.prototype._initialize.call(this);
                var funcDesc = knockout.MetaFactory.findProp('func', this._metaData.props);
                funcDesc.updateControl = function (link, propDesc, control, unconvertedValue, convertedValue) {
                    if (convertedValue != null) {
                        control.xFunc = convertedValue;
                    }
                    return true;
                };
            };
            return wjFlexChartParametricFunctionSeries;
        }(WjTrendLineBase));
        knockout.wjFlexChartParametricFunctionSeries = wjFlexChartParametricFunctionSeries;
        /**
          * KnockoutJS binding for the @see:Waterfall object.
          *
          * Use the @see:wjFlexChartWaterfall binding to add @see:Waterfall object to your
          * KnockoutJS applications. For example:
          *
          * <pre>&lt;p&gt;Here is a Waterfall:&lt;/p&gt;
          * &lt;div data-bind="wjFlexChart: { itemsSource: trendItemsSource,  binding:'value',bindingX: 'name' }"&gt;
          *     &lt;div data-bind="wjFlexChartWaterfall: {  relativeData:true, connectorLines: true, start:1000,showIntermediateTotal: true,
          *                       intermediateTotalPositions: [3, 6, 9, 12], intermediateTotalLabels: ['Q1', 'Q2', 'Q3', 'Q4'],name:'Increase,Decrease,Total'}"&gt;&lt;/div&gt;
          * &lt;/div&gt;</pre>
          *
          * The <b>wjFlexChartWaterfall</b> binding supports all read-write properties and events of
          * the @see:Waterfall class.
          */
        var wjFlexChartWaterfall = /** @class */ (function (_super) {
            __extends(wjFlexChartWaterfall, _super);
            function wjFlexChartWaterfall() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartWaterfall.prototype._getControlConstructor = function () {
                return wijmo.chart.analytics.Waterfall;
            };
            return wjFlexChartWaterfall;
        }(WjSeriesBase));
        knockout.wjFlexChartWaterfall = wjFlexChartWaterfall;
        /**
         * KnockoutJS binding for the @see:Fibonacci object.
         *
         * Use the @see:wjFlexChartFibonacci binding to add @see:Fibonacci object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a Fibonacci:&lt;/p&gt;
         *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
         *         &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
         *         &lt;div data-bind="wjFlexChartFibonacci: { binding:'close', symbolSize:1, labelPosition: 'Left',  uptrend: true}"&gt;&lt;/div&gt;
         *   &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartFibonacci</b> binding supports all read-write properties and events of
         * the @see:Fibonacci class.
         */
        var wjFlexChartFibonacci = /** @class */ (function (_super) {
            __extends(wjFlexChartFibonacci, _super);
            function wjFlexChartFibonacci() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartFibonacci.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.Fibonacci;
            };
            wjFlexChartFibonacci.prototype._createControl = function (element) {
                return new wijmo.chart.finance.analytics.Fibonacci();
            };
            return wjFlexChartFibonacci;
        }(WjSeriesBase));
        knockout.wjFlexChartFibonacci = wjFlexChartFibonacci;
        /**
         * KnockoutJS binding for the @see:FibonacciArcs object.
         *
         * Use the @see:wjFlexChartFibonacciArcs binding to add @see:FibonacciArcs object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a FibonacciArcs:&lt;/p&gt;
         *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
         *         &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
         *         &lt;div data-bind="wjFlexChartFibonacciArcs: { binding:'close', start:start, end: end,  labelPosition: 'Top'}"&gt;&lt;/div&gt;
         *   &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartFibonacciArcs</b> binding supports all read-write properties and events of
         * the @see:FibonacciArcs class.
         */
        var wjFlexChartFibonacciArcs = /** @class */ (function (_super) {
            __extends(wjFlexChartFibonacciArcs, _super);
            function wjFlexChartFibonacciArcs() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartFibonacciArcs.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.FibonacciArcs;
            };
            wjFlexChartFibonacciArcs.prototype._createControl = function (element) {
                return new wijmo.chart.finance.analytics.FibonacciArcs();
            };
            return wjFlexChartFibonacciArcs;
        }(WjSeriesBase));
        knockout.wjFlexChartFibonacciArcs = wjFlexChartFibonacciArcs;
        /**
         * KnockoutJS binding for the @see:FibonacciFans object.
         *
         * Use the @see:wjFlexChartFibonacciFans binding to add @see:FibonacciFans object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a FibonacciFans:&lt;/p&gt;
         *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
         *         &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
         *         &lt;div data-bind="wjFlexChartFibonacciFans: { binding:'close', start:start, end: end,  labelPosition: 'Top'}"&gt;&lt;/div&gt;
         *   &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartFibonacciFans</b> binding supports all read-write properties and events of
         * the @see:FibonacciFans class.
         */
        var wjFlexChartFibonacciFans = /** @class */ (function (_super) {
            __extends(wjFlexChartFibonacciFans, _super);
            function wjFlexChartFibonacciFans() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartFibonacciFans.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.FibonacciFans;
            };
            wjFlexChartFibonacciFans.prototype._createControl = function (element) {
                return new wijmo.chart.finance.analytics.FibonacciFans();
            };
            return wjFlexChartFibonacciFans;
        }(WjSeriesBase));
        knockout.wjFlexChartFibonacciFans = wjFlexChartFibonacciFans;
        /**
        * KnockoutJS binding for the @see:FibonacciTimeZones object.
        *
        * Use the @see:wjFlexChartFibonacciTimeZones binding to add @see:FibonacciTimeZones object to your
        * KnockoutJS applications. For example:
        *
        * <pre>&lt;p&gt;Here is a FibonacciTimeZones:&lt;/p&gt;
        *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
        *         &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
        *         &lt;div data-bind="wjFlexChartFibonacciTimeZones: { binding:'close', startX:zStart, endX: zEnd,  labelPosition: 'Right'}"&gt;&lt;/div&gt;
        *   &lt;/div&gt;</pre>
        *
        * The <b>wjFlexChartFibonacciTimeZones</b> binding supports all read-write properties and events of
        * the @see:FibonacciTimeZones class.
        */
        var wjFlexChartFibonacciTimeZones = /** @class */ (function (_super) {
            __extends(wjFlexChartFibonacciTimeZones, _super);
            function wjFlexChartFibonacciTimeZones() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartFibonacciTimeZones.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.FibonacciTimeZones;
            };
            wjFlexChartFibonacciTimeZones.prototype._createControl = function (element) {
                return new wijmo.chart.finance.analytics.FibonacciTimeZones();
            };
            return wjFlexChartFibonacciTimeZones;
        }(WjSeriesBase));
        knockout.wjFlexChartFibonacciTimeZones = wjFlexChartFibonacciTimeZones;
        // abstract for FinancialChart's overlays and indicators
        var WjBaseOverlayIndicator = /** @class */ (function (_super) {
            __extends(WjBaseOverlayIndicator, _super);
            function WjBaseOverlayIndicator() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjBaseOverlayIndicator.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.OverlayIndicatorBase;
            };
            return WjBaseOverlayIndicator;
        }(WjSeriesBase));
        knockout.WjBaseOverlayIndicator = WjBaseOverlayIndicator;
        // abstract for FinancialChart's overlays and indicators
        var WjBaseSingleOverlayIndicator = /** @class */ (function (_super) {
            __extends(WjBaseSingleOverlayIndicator, _super);
            function WjBaseSingleOverlayIndicator() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjBaseSingleOverlayIndicator.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.SingleOverlayIndicatorBase;
            };
            return WjBaseSingleOverlayIndicator;
        }(WjBaseOverlayIndicator));
        knockout.WjBaseSingleOverlayIndicator = WjBaseSingleOverlayIndicator;
        /**
        * KnockoutJS binding for the @see:ATR object.
        *
        * Use the @see:wjFlexChartAtr binding to add @see:ATR object to your
        * KnockoutJS applications. For example:
        *
        * <pre>&lt;p&gt;Here is a ATR:&lt;/p&gt;
        *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
        *         &lt;div data-bind="wjFlexChartAtr: { binding: 'high,low,open,close',period:'14' }"&gt;&lt;/div&gt;
        *   &lt;/div&gt;</pre>
        *
        * The <b>wjFlexChartAtr</b> binding supports all read-write properties and events of
        * the @see:ATR class.
        */
        var wjFlexChartAtr = /** @class */ (function (_super) {
            __extends(wjFlexChartAtr, _super);
            function wjFlexChartAtr() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartAtr.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.ATR;
            };
            return wjFlexChartAtr;
        }(WjBaseSingleOverlayIndicator));
        knockout.wjFlexChartAtr = wjFlexChartAtr;
        /**
         * KnockoutJS binding for the @see:CCI object.
         *
         * Use the @see:wjFlexChartCci binding to add @see:CCI object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a CCI:&lt;/p&gt;
         *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
         *         &lt;div data-bind="wjFlexChartCci: { binding: 'high,low,open,close',period:20 }"&gt;&lt;/div&gt;
         *   &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartCci</b> binding supports all read-write properties and events of
         * the @see:CCI class.
         */
        var wjFlexChartCci = /** @class */ (function (_super) {
            __extends(wjFlexChartCci, _super);
            function wjFlexChartCci() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartCci.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.CCI;
            };
            return wjFlexChartCci;
        }(WjBaseSingleOverlayIndicator));
        knockout.wjFlexChartCci = wjFlexChartCci;
        /**
         * KnockoutJS binding for the @see:RSI object.
         *
         * Use the @see:wjFlexChartRsi binding to add @see:RSI object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a RSI:&lt;/p&gt;
         *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
         *         &lt;div data-bind="wjFlexChartRsi: { binding: 'high,low,open,close',period:20 }"&gt;&lt;/div&gt;
         *   &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartRsi</b> binding supports all read-write properties and events of
         * the @see:RSI class.
         */
        var wjFlexChartRsi = /** @class */ (function (_super) {
            __extends(wjFlexChartRsi, _super);
            function wjFlexChartRsi() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartRsi.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.RSI;
            };
            return wjFlexChartRsi;
        }(WjBaseSingleOverlayIndicator));
        knockout.wjFlexChartRsi = wjFlexChartRsi;
        /**
         * KnockoutJS binding for the @see:WilliamsR object.
         *
         * Use the @see:wjFlexChartWilliamsR binding to add @see:WilliamsR object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a WilliamsR:&lt;/p&gt;
         *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
         *         &lt;div data-bind="wjFlexChartWilliamsR: { binding: 'high,low,open,close',period:20 }"&gt;&lt;/div&gt;
         *   &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartWilliamsR</b> binding supports all read-write properties and events of
         * the @see:WilliamsR class.
         */
        var wjFlexChartWilliamsR = /** @class */ (function (_super) {
            __extends(wjFlexChartWilliamsR, _super);
            function wjFlexChartWilliamsR() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartWilliamsR.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.WilliamsR;
            };
            return wjFlexChartWilliamsR;
        }(WjBaseSingleOverlayIndicator));
        knockout.wjFlexChartWilliamsR = wjFlexChartWilliamsR;
        var WjFlexChartMacdBase = /** @class */ (function (_super) {
            __extends(WjFlexChartMacdBase, _super);
            function WjFlexChartMacdBase() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjFlexChartMacdBase.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.MacdBase;
            };
            return WjFlexChartMacdBase;
        }(WjBaseOverlayIndicator));
        knockout.WjFlexChartMacdBase = WjFlexChartMacdBase;
        /**
         * KnockoutJS binding for the @see:Macd object.
         *
         * Use the @see:wjFlexChartMacd binding to add @see:Macd object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a Macd:&lt;/p&gt;
         *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
         *         &lt;div data-bind="wjFlexChartMacd: { binding: 'close',fastPeriod:12, slowPeriod: 26,smoothingPeriod: 9 }" &gt;&lt;/div&gt;
         *   &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartMacd</b> binding supports all read-write properties and events of
         * the @see:Macd class.
         */
        var wjFlexChartMacd = /** @class */ (function (_super) {
            __extends(wjFlexChartMacd, _super);
            function wjFlexChartMacd() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartMacd.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.Macd;
            };
            return wjFlexChartMacd;
        }(WjFlexChartMacdBase));
        knockout.wjFlexChartMacd = wjFlexChartMacd;
        /**
         * KnockoutJS binding for the @see:MacdHistogram object.
         *
         * Use the @see:wjFlexChartMacdHistogram binding to add @see:MacdHistogram object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a MacdHistogram:&lt;/p&gt;
         *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
         *         &lt;div data-bind="WjFlexChartMacdHistogram: { binding: 'close',fastPeriod:12, slowPeriod: 26,smoothingPeriod: 9 }" &gt;&lt;/div&gt;
         *   &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartMacdHistogram</b> binding supports all read-write properties and events of
         * the @see:MacdHistogram class.
         */
        var wjFlexChartMacdHistogram = /** @class */ (function (_super) {
            __extends(wjFlexChartMacdHistogram, _super);
            function wjFlexChartMacdHistogram() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartMacdHistogram.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.MacdHistogram;
            };
            return wjFlexChartMacdHistogram;
        }(WjFlexChartMacdBase));
        knockout.wjFlexChartMacdHistogram = wjFlexChartMacdHistogram;
        /**
         * KnockoutJS binding for the @see:Stochastic object.
         *
         * Use the @see:wjFlexChartStochastic binding to add @see:Stochastic object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a Stochastic:&lt;/p&gt;
         *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
         *         &lt;div data-bind="wjFlexChartStochastic: { binding: 'high,low,open,close',kPeriod:14,dPeriod:3,smoothingPeriod: 1 }" &gt;&lt;/div&gt;
         *   &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartStochastic</b> binding supports all read-write properties and events of
         * the @see:Stochastic class.
         */
        var wjFlexChartStochastic = /** @class */ (function (_super) {
            __extends(wjFlexChartStochastic, _super);
            function wjFlexChartStochastic() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartStochastic.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.Stochastic;
            };
            return wjFlexChartStochastic;
        }(WjBaseOverlayIndicator));
        knockout.wjFlexChartStochastic = wjFlexChartStochastic;
        /**
         * KnockoutJS binding for the @see:BollingerBands object.
         *
         * Use the @see:wjFlexChartBollingerBands binding to add @see:BollingerBands object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a BollingerBands:&lt;/p&gt;
         *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
         *         &lt;div data-bind="wjFlexChartStochastic: { binding: 'high,low,open,close',kPeriod:14,dPeriod:3,smoothingPeriod: 1 }" &gt;&lt;/div&gt;
         *   &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartBollingerBands</b> binding supports all read-write properties and events of
         * the @see:BollingerBands class.
         */
        var wjFlexChartBollingerBands = /** @class */ (function (_super) {
            __extends(wjFlexChartBollingerBands, _super);
            function wjFlexChartBollingerBands() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartBollingerBands.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.BollingerBands;
            };
            return wjFlexChartBollingerBands;
        }(WjBaseOverlayIndicator));
        knockout.wjFlexChartBollingerBands = wjFlexChartBollingerBands;
        /**
         * KnockoutJS binding for the @see:Envelopes object.
         *
         * Use the @see:wjFlexChartEnvelopes binding to add @see:Envelopes object to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a Envelopes:&lt;/p&gt;
         *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
         *         &lt;div data-bind="wjFlexChartEnvelopes: { binding:'close', type:'Simple', size: 0.03, period:20}" &gt;&lt;/div&gt;
         *   &lt;/div&gt;</pre>
         *
         * The <b>wjFlexChartEnvelopes</b> binding supports all read-write properties and events of
         * the @see:Envelopes class.
         */
        var wjFlexChartEnvelopes = /** @class */ (function (_super) {
            __extends(wjFlexChartEnvelopes, _super);
            function wjFlexChartEnvelopes() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjFlexChartEnvelopes.prototype._getControlConstructor = function () {
                return wijmo.chart.finance.analytics.Envelopes;
            };
            return wjFlexChartEnvelopes;
        }(WjBaseOverlayIndicator));
        knockout.wjFlexChartEnvelopes = wjFlexChartEnvelopes;
    })(knockout = wijmo.knockout || (wijmo.knockout = {}));
})(wijmo || (wijmo = {}));
// Register bindings
(ko.bindingHandlers).wjFlexChart = new wijmo.knockout.wjFlexChart();
(ko.bindingHandlers).wjFlexPie = new wijmo.knockout.wjFlexPie();
(ko.bindingHandlers).wjFlexChartAxis = new wijmo.knockout.wjFlexChartAxis();
(ko.bindingHandlers).wjFlexChartLegend = new wijmo.knockout.wjFlexChartLegend();
(ko.bindingHandlers).wjFlexChartSeries = new wijmo.knockout.wjFlexChartSeries();
(ko.bindingHandlers).wjFinancialChart = new wijmo.knockout.wjFinancialChart();
(ko.bindingHandlers).wjFinancialChartSeries = new wijmo.knockout.wjFinancialChartSeries();
(ko.bindingHandlers).wjFlexChartLineMarker = new wijmo.knockout.wjFlexChartLineMarker();
(ko.bindingHandlers).wjFlexChartRangeSelector = new wijmo.knockout.wjFlexChartRangeSelector();
(ko.bindingHandlers).wjFlexChartGestures = new wijmo.knockout.wjFlexChartGestures();
(ko.bindingHandlers).wjFlexChartPlotArea = new wijmo.knockout.wjFlexChartPlotArea();
(ko.bindingHandlers).wjFlexChartDataPoint = new wijmo.knockout.wjFlexChartDataPoint();
(ko.bindingHandlers).wjFlexChartAnnotationLayer = new wijmo.knockout.wjFlexChartAnnotationLayer();
(ko.bindingHandlers).wjFlexChartAnnotation = new wijmo.knockout.wjFlexChartAnnotation();
(ko.bindingHandlers).wjFlexChartAnimation = new wijmo.knockout.wjFlexChartAnimation();
(ko.bindingHandlers).wjFlexChartTrendLine = new wijmo.knockout.wjFlexChartTrendLine();
(ko.bindingHandlers).wjFlexChartMovingAverage = new wijmo.knockout.wjFlexChartMovingAverage();
(ko.bindingHandlers).wjFlexChartYFunctionSeries = new wijmo.knockout.wjFlexChartYFunctionSeries();
(ko.bindingHandlers).wjFlexChartParametricFunctionSeries = new wijmo.knockout.wjFlexChartParametricFunctionSeries();
(ko.bindingHandlers).wjFlexChartWaterfall = new wijmo.knockout.wjFlexChartWaterfall();
(ko.bindingHandlers).wjFlexChartFibonacci = new wijmo.knockout.wjFlexChartFibonacci();
(ko.bindingHandlers).wjFlexChartFibonacciArcs = new wijmo.knockout.wjFlexChartFibonacciArcs();
(ko.bindingHandlers).wjFlexChartFibonacciFans = new wijmo.knockout.wjFlexChartFibonacciFans();
(ko.bindingHandlers).wjFlexChartFibonacciTimeZones = new wijmo.knockout.wjFlexChartFibonacciTimeZones();
(ko.bindingHandlers).wjFlexChartAtr = new wijmo.knockout.wjFlexChartAtr();
(ko.bindingHandlers).wjFlexChartCci = new wijmo.knockout.wjFlexChartCci();
(ko.bindingHandlers).wjFlexChartRsi = new wijmo.knockout.wjFlexChartRsi();
(ko.bindingHandlers).wjFlexChartWilliamsR = new wijmo.knockout.wjFlexChartWilliamsR();
(ko.bindingHandlers).wjFlexChartMacd = new wijmo.knockout.wjFlexChartMacd();
(ko.bindingHandlers).wjFlexChartMacdHistogram = new wijmo.knockout.wjFlexChartMacdHistogram();
(ko.bindingHandlers).wjFlexChartStochastic = new wijmo.knockout.wjFlexChartStochastic();
(ko.bindingHandlers).wjFlexChartBollingerBands = new wijmo.knockout.wjFlexChartBollingerBands();
(ko.bindingHandlers).wjFlexChartEnvelopes = new wijmo.knockout.wjFlexChartEnvelopes();

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
var wijmo;
(function (wijmo) {
    var knockout;
    (function (knockout) {
        // Gauge control binding
        // Provides base setup for all bindings related to controls derived from Gauge
        // Abstract class, not for use in markup
        var WjGaugeBinding = /** @class */ (function (_super) {
            __extends(WjGaugeBinding, _super);
            function WjGaugeBinding() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WjGaugeBinding.prototype._getControlConstructor = function () {
                return wijmo.gauge.Gauge;
            };
            return WjGaugeBinding;
        }(knockout.WjBinding));
        knockout.WjGaugeBinding = WjGaugeBinding;
        /**
         * KnockoutJS binding for the @see:LinearGauge control.
         *
         * Use the @see:wjLinearGauge binding to add @see:LinearGauge controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a LinearGauge control:&lt;/p&gt;
         * &lt;div data-bind="wjLinearGauge: {
         *         value: props.value,
         *         min: props.min,
         *         max: props.max,
         *         format: props.format,
         *         showRanges: props.showRanges }"
         *         &lt;class="linear-gauge"&gt;
         *     &lt;div data-bind="wjRange: {
         *             wjProperty: 'pointer',
         *             thickness: props.ranges.pointerThickness }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjRange: {
         *             min: props.ranges.lower.min,
         *             max: props.ranges.lower.max,
         *             color: props.ranges.lower.color }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjRange: {
         *             min: props.ranges.middle.min,
         *             max: props.ranges.middle.max,
         *             color: props.ranges.middle.color }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjRange: {
         *             min: props.ranges.upper.min,
         *             max: props.ranges.upper.max,
         *             color: props.ranges.upper.color }"&gt;
         *     &lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjLinearGauge</b> binding may contain the @see:wjRange child binding.
         *
         * The <b>wjLinearGauge</b> binding supports all read-write properties and events of
         * the @see:LinearGauge control. The <b>value</b> property provides two-way binding mode.
         */
        var wjLinearGauge = /** @class */ (function (_super) {
            __extends(wjLinearGauge, _super);
            function wjLinearGauge() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjLinearGauge.prototype._getControlConstructor = function () {
                return wijmo.gauge.LinearGauge;
            };
            return wjLinearGauge;
        }(WjGaugeBinding));
        knockout.wjLinearGauge = wjLinearGauge;
        /**
         * KnockoutJS binding for the @see:BulletGraph control.
         *
         * Use the @see:wjBulletGraph binding to add @see:BulletGraph controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a BulletGraph control:&lt;/p&gt;
         * &lt;div data-bind="wjBulletGraph: {
         *         value: props.value,
         *         min: props.min,
         *         max: props.max,
         *         format: props.format,
         *         good: props.ranges.middle.max,
         *         bad: props.ranges.middle.min,
         *         target: props.ranges.target,
         *         showRanges: props.showRanges }"
         *         class="linear-gauge"&gt;
         *     &lt;div data-bind="wjRange: {
         *             wjProperty: 'pointer',
         *             thickness: props.ranges.pointerThickness }"&gt;
         *     &lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjBulletGraph</b> binding may contain the @see:wjRange child binding.
         *
         * The <b>wjBulletGraph</b> binding supports all read-write properties and events of
         * the @see:BulletGraph control. The <b>value</b> property provides two-way binding mode.
         */
        var wjBulletGraph = /** @class */ (function (_super) {
            __extends(wjBulletGraph, _super);
            function wjBulletGraph() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjBulletGraph.prototype._getControlConstructor = function () {
                return wijmo.gauge.BulletGraph;
            };
            return wjBulletGraph;
        }(wjLinearGauge));
        knockout.wjBulletGraph = wjBulletGraph;
        /**
         * KnockoutJS binding for the @see:RadialGauge control.
         *
         * Use the @see:wjRadialGauge binding to add @see:RadialGauge controls to your
         * KnockoutJS applications. For example:
         *
         * <pre>&lt;p&gt;Here is a RadialGauge control:&lt;/p&gt;
         * &lt;div data-bind="wjRadialGauge: {
         *         value: props.value,
         *         min: props.min,
         *         max: props.max,
         *         format: props.format,
         *         showRanges: props.showRanges }"
         *         class="radial-gauge"&gt;
         *     &lt;div data-bind="wjRange: {
         *             wjProperty: 'pointer',
         *             thickness: props.ranges.pointerThickness }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjRange: {
         *             min: props.ranges.lower.min,
         *             max: props.ranges.lower.max,
         *             color: props.ranges.lower.color }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjRange: {
         *             min: props.ranges.middle.min,
         *             max: props.ranges.middle.max,
         *             color: props.ranges.middle.color }"&gt;
         *     &lt;/div&gt;
         *     &lt;div data-bind="wjRange: {
         *             min: props.ranges.upper.min,
         *             max: props.ranges.upper.max,
         *             color: props.ranges.upper.color }"&gt;
         *     &lt;/div&gt;
         * &lt;/div&gt;</pre>
         *
         * The <b>wjRadialGauge</b> binding may contain the @see:wjRange child binding.
         *
         * The <b>wjRadialGauge</b> binding supports all read-write properties and events of
         * the @see:RadialGauge control. The <b>value</b> property provides two-way binding mode.
         */
        var wjRadialGauge = /** @class */ (function (_super) {
            __extends(wjRadialGauge, _super);
            function wjRadialGauge() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjRadialGauge.prototype._getControlConstructor = function () {
                return wijmo.gauge.RadialGauge;
            };
            return wjRadialGauge;
        }(WjGaugeBinding));
        knockout.wjRadialGauge = wjRadialGauge;
        /**
         * KnockoutJS binding for the Gauge's @see:Range object.
         *
         * The @see:wjRange binding must be contained in one of the following bindings:
         * <ul>
         *     <li>@see:wjLinearGauge</li>
         *     <li>@see:wjRadialGauge</li>
         *     <li>@see:wjBulletGraph</li>
         * </ul>
         * By default, this binding adds a <b>Range</b> object to the <b>ranges</b>
         * collection of the Chart control. The <b>wjProperty</b> attribute allows
         * you to specify another Chart property, for example the <b>pointer</b>
         * property, to initialize with the binding.
         *
         * The <b>wjRange</b> binding supports all read-write properties and events of
         * the @see:Range class.
         */
        var wjRange = /** @class */ (function (_super) {
            __extends(wjRange, _super);
            function wjRange() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjRange.prototype._getControlConstructor = function () {
                return wijmo.gauge.Range;
            };
            return wjRange;
        }(knockout.WjBinding));
        knockout.wjRange = wjRange;
    })(knockout = wijmo.knockout || (wijmo.knockout = {}));
})(wijmo || (wijmo = {}));
// Register bindings
(ko.bindingHandlers).wjLinearGauge = new wijmo.knockout.wjLinearGauge();
(ko.bindingHandlers).wjBulletGraph = new wijmo.knockout.wjBulletGraph();
(ko.bindingHandlers).wjRadialGauge = new wijmo.knockout.wjRadialGauge();
(ko.bindingHandlers).wjRange = new wijmo.knockout.wjRange();

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
var wijmo;
(function (wijmo) {
    var knockout;
    (function (knockout) {
        /**
           * KnockoutJS binding for the @see:PivotGrid object.
           * Use the @see:wjPivotGrid binding to add @see:PivotGrid controls to your
           * KnockoutJS applications. For example:
           *  &lt;div data-bind="wjPivotGrid:
           *      {
           *          itemsSource: thePanel
           *      }"&gt;
           *  &lt;/div&gt;
           *
           * The <b>wjPivotGrid</b> binding supports all read-write properties and events of
           * the @see:PivotGrid class.
           *
           */
        var wjPivotGrid = /** @class */ (function (_super) {
            __extends(wjPivotGrid, _super);
            function wjPivotGrid() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjPivotGrid.prototype._getControlConstructor = function () {
                return wijmo.olap.PivotGrid;
            };
            return wjPivotGrid;
        }(knockout.wjFlexGrid));
        knockout.wjPivotGrid = wjPivotGrid;
        /**
           * KnockoutJS binding for the @see:PivotChart object.
           * Use the @see:wjPivotChart binding to add @see:PivotChart controls to your
           * KnockoutJS applications. For example:
           *  &lt;div data-bind="wjPivotChart:
           *      {
           *          itemsSource: thePanel
           *      }"&gt;
           *  &lt;/div&gt;
           *
           * The <b>wjPivotChart</b> binding supports all read-write properties and events of
           * the @see:PivotChart class.
           *
           */
        var wjPivotChart = /** @class */ (function (_super) {
            __extends(wjPivotChart, _super);
            function wjPivotChart() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjPivotChart.prototype._getControlConstructor = function () {
                return wijmo.olap.PivotChart;
            };
            return wjPivotChart;
        }(knockout.WjBinding));
        knockout.wjPivotChart = wjPivotChart;
        /**
           * KnockoutJS binding for the @see:PivotPanel object.
           * Use the @see:wjPivotPanel binding to add @see:PivotPanel controls to your
           * KnockoutJS applications. For example:
           *  &lt;div data-bind="wjPivotPanel:
           *      {
           *           itemsSource: rawData,
           *           control: thePanel,
           *           initialized: init
           *      }"&gt;
           *  &lt;/div&gt;
           *
           * The <b>wjPivotPanel</b> binding supports all read-write properties and events of
           * the @see:PivotPanel class.
           *
           */
        var wjPivotPanel = /** @class */ (function (_super) {
            __extends(wjPivotPanel, _super);
            function wjPivotPanel() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjPivotPanel.prototype._getControlConstructor = function () {
                return wijmo.olap.PivotPanel;
            };
            return wjPivotPanel;
        }(knockout.WjBinding));
        knockout.wjPivotPanel = wjPivotPanel;
    })(knockout = wijmo.knockout || (wijmo.knockout = {}));
})(wijmo || (wijmo = {}));
(ko.bindingHandlers).wjPivotGrid = new wijmo.knockout.wjPivotGrid();
(ko.bindingHandlers).wjPivotChart = new wijmo.knockout.wjPivotChart();
(ko.bindingHandlers).wjPivotPanel = new wijmo.knockout.wjPivotPanel();

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
var wijmo;
(function (wijmo) {
    var knockout;
    (function (knockout) {
        /**
           * KnockoutJS binding for the @see:TreeView object.
           * Use the @see:wjTreeView binding to add @see:TreeView controls to your
           * KnockoutJS applications. For example:
           *  &lt;div data-bind="wjTreeView:
           *      {
           *          itemsSource: data
           *          displayMemberPath:'header'
           *          childItemsPath:'items'
           *      }"&gt;
           *  &lt;/div&gt;
           *
           * The <b>wjTreeView</b> binding supports all read-write properties and events of
           * the @see:TreeView class.
           *
           */
        var wjTreeView = /** @class */ (function (_super) {
            __extends(wjTreeView, _super);
            function wjTreeView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            wjTreeView.prototype._getControlConstructor = function () {
                return wijmo.nav.TreeView;
            };
            return wjTreeView;
        }(knockout.WjBinding));
        knockout.wjTreeView = wjTreeView;
    })(knockout = wijmo.knockout || (wijmo.knockout = {}));
})(wijmo || (wijmo = {}));
(ko.bindingHandlers).wjTreeView = new wijmo.knockout.wjTreeView();

var wijmo;
(function (wijmo) {
    var knockout;
    (function (knockout) {
        var WjTagsPreprocessor = /** @class */ (function () {
            function WjTagsPreprocessor() {
            }
            WjTagsPreprocessor._getSpecialProps = function () {
                var ret = {}, wjBind = wijmo.knockout.WjBinding;
                ret[wjBind._controlPropAttr] = true;
                ret[wjBind._parPropAttr] = true;
                return ret;
            };
            WjTagsPreprocessor.prototype.register = function () {
                this._foreignProc = ko.bindingProvider.instance['preprocessNode'];
                ko.bindingProvider.instance['preprocessNode'] = this.preprocessNode.bind(this);
            };
            WjTagsPreprocessor.prototype.preprocessNode = function (node) {
                var dataBindName = WjTagsPreprocessor._dataBindAttr;
                if (!(node.nodeType == 1 && this._isWjTag(node.tagName))) {
                    return this._delegate(node);
                }
                var camelTag = knockout.MetaFactory.toCamelCase(node.tagName), wjBinding = ko.bindingHandlers[camelTag];
                if (!wjBinding) {
                    return this._delegate(node);
                }
                wjBinding.ensureMetaData();
                var wjBindDef = '', attribs = node.attributes, retEl = document.createElement("div"), dataBindAttr;
                for (var i = 0; i < attribs.length; i++) {
                    var attr = attribs[i];
                    if (attr.name.toLowerCase() == dataBindName) {
                        dataBindAttr = attr;
                        continue;
                    }
                    var camelAttr = knockout.MetaFactory.toCamelCase(attr.name);
                    if (this._isWjProp(camelAttr, wjBinding._metaData)) {
                        if (wjBindDef) {
                            wjBindDef += ',';
                        }
                        wjBindDef += camelAttr + ':' + attr.value;
                    }
                    else {
                        retEl.setAttribute(attr.name, attr.value);
                    }
                }
                wjBindDef = camelTag + ':{' + wjBindDef + '}';
                if (dataBindAttr && dataBindAttr.value && dataBindAttr.value.trim()) {
                    wjBindDef += ',' + dataBindAttr.value;
                }
                retEl.setAttribute(dataBindName, wjBindDef);
                while (node.firstChild) {
                    retEl.appendChild(node.firstChild);
                }
                node.parentNode.replaceChild(retEl, node);
                return [retEl];
            };
            WjTagsPreprocessor.prototype._delegate = function (node) {
                return this._foreignProc ? this._foreignProc(node) : undefined;
            };
            WjTagsPreprocessor.prototype._isWjTag = function (name) {
                var wjPfx = WjTagsPreprocessor._wjTagPrefix;
                return name && name.length > wjPfx.length && name.substr(0, wjPfx.length).toLowerCase() === wjPfx;
            };
            WjTagsPreprocessor.prototype._isWjProp = function (name, metaData) {
                return WjTagsPreprocessor._specialProps[name] || wijmo.knockout.MetaFactory.findProp(name, metaData.props) ||
                    wijmo.knockout.MetaFactory.findEvent(name, metaData.events);
            };
            WjTagsPreprocessor._specialProps = WjTagsPreprocessor._getSpecialProps();
            WjTagsPreprocessor._dataBindAttr = 'data-bind';
            WjTagsPreprocessor._wjTagPrefix = 'wj-';
            return WjTagsPreprocessor;
        }());
        knockout.WjTagsPreprocessor = WjTagsPreprocessor;
    })(knockout = wijmo.knockout || (wijmo.knockout = {}));
})(wijmo || (wijmo = {}));
if (!wijmo['disableKnockoutTags']) {
    new wijmo.knockout.WjTagsPreprocessor().register();
}

