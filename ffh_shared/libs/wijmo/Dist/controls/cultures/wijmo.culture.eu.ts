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
/*
 * Wijmo culture file: eu (Basque)
 */
module wijmo {
    wijmo.culture = {
        Globalize: {
            name: 'eu',
            displayName: 'Basque',
            numberFormat: {
                '.': ',',
                ',': '.',
                percent: { pattern: ['-% n', '% n'] },
                currency: { decimals: 2, symbol: '€', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '/',
                ':': ':',
                firstDay: 1,
                days: ['igandea', 'astelehena', 'asteartea', 'asteazkena', 'osteguna', 'ostirala', 'larunbata'],
                daysAbbr: ['ig.', 'al.', 'ar.', 'az.', 'og.', 'or.', 'lr.'],
                months: ['urtarrila', 'Otsaila', 'Martxoa', 'Apirila', 'Maiatza', 'Ekaina', 'Uztaila', 'Abuztua', 'Iraila', 'Urria', 'Azaroa', 'Abendua'],
                monthsAbbr: ['urt.', 'ots.', 'mar.', 'api.', 'mai.', 'eka.', 'uzt.', 'abu.', 'ira.', 'urr.', 'aza.', 'abe.'],
                am: ['AM', 'A'],
                pm: ['PM', 'P'],
                eras: ['K.o.'],
                patterns: {
                    d: 'yyyy/M/d', D: 'dddd, yyyy"(e)ko" MMMM"ren" d"a"',
                    f: 'dddd, yyyy"(e)ko" MMMM"ren" d"a" H:mm', F: 'dddd, yyyy"(e)ko" MMMM"ren" d"a" H:mm:ss',
                    t: 'HH:mm', T: 'HH:mm:ss',
                    m: 'MMMM"ren" d"a"', M: 'MMMM"ren" d"a"', 
                    y: 'yyyy"(e)ko" MMMM', Y: 'yyyy"(e)ko" MMMM', 
                    g: 'yyyy/M/d HH:mm', G: 'yyyy/M/d HH:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
                
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} elementurik hautatu',
            selectAll: 'Hautatu denak'
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} gaiak)'
        },
        FlexGridFilter: {

            // filter
            ascending: '\u2191 Goranzkoa',
            descending: '\u2193 Beheranzkoa',
            apply: 'Aplikatu',
            cancel: 'Utzi',
            clear: 'Garbitu',
            conditions: 'Iragazi egoeraren arabera',
            values: 'Iragazi balioaren arabera',

            // value filter
            search: 'Bilatu',
            selectAll: 'Hautatu denak',
            null: '(ezer ez)',

            // condition filter
            header: 'Erakutsi gaiak balioaren lekuan',
            and: 'eta',
            or: 'Edo',
            stringOperators: [
                { name: '(ezarri gabe)', op: null },
                { name: 'Berdina', op: 0 },
                { name: 'Ezberdina', op: 1 },
                { name: 'Honela hasten da', op: 6 },
                { name: 'Honela bukatzen da', op: 7 },
                { name: 'Barne dauka', op: 8 },
                { name: 'Ez dauka barne', op: 9 }
            ],
            numberOperators: [
                { name: '(ezarri gabe)', op: null },
                { name: 'Berdina', op: 0 },
                { name: 'Ezberdina', op: 1 },
                { name: 'Handiagoa da', op: 2 },
                { name: 'Handiagoa edo berdina da', op: 3 },
                { name: 'Txikiagoa da', op: 4 },
                { name: 'Txikiagoa edo berdina da', op: 5 }
            ],
            dateOperators: [
                { name: '(ezarri gabe)', op: null },
                { name: 'Berdina', op: 0 },
                { name: 'Honen aurretik', op: 4 },
                { name: 'Honen ondoren', op: 2 }
            ],
            booleanOperators: [
                { name: '(ezarri gabe)', op: null },
                { name: 'Berdina', op: 0 },
                { name: 'Ezberdina', op: 1 }
            ]
        },
        olap: {
            PivotFieldEditor: {
                dialogHeader: 'Eremu-ezarpenak:',
                header: 'Goiburua:',
                summary: 'Laburpena:',
                showAs: 'Erakutsi honela:',
                weighBy: 'Pisatzen arabera:',
                sort: 'Ordenatu:',
                filter: 'Iragazkia:',
                format: 'Formatua:',
                sample: 'Adibidea:',
                edit: 'Editatu…',
                clear: 'Garbitu',
                ok: 'Ados',
                cancel: 'Utzi',
                none: '(bat ere ez)',
                sorts: {
                    asc: 'Gorantz',
                    desc: 'Beherantz'
                },
                aggs: {
                    sum: 'Batura',
                    cnt: 'Kopurua',
                    avg: 'Batez bestekoa',
                    max: 'Max.',
                    min: 'Min',
                    rng: 'Barrutia',
                    std: 'DesbEst',
                    var: 'Bar',
                    stdp: 'StdDevPop',
                    varp: 'VarPop',
                    first: 'Lehena',
                    last: 'azken'
                },
                calcs: {
                    noCalc: 'Kalkulurik ez',
                    dRow: 'Aurreko lerroa aldea',
                    dRowPct: '% Difference from previous row',
                    dCol: 'Aurreko zutabean aldea',
                    dColPct: '% Difference from previous column',
                    dPctGrand: '% of grand total',
                    dPctRow: '% of row total',
                    dPctCol: '% of column total',
                    dRunTot: 'Pilatutako guztira',
                    dRunTotPct: '% running total'
                },
                formats: {
                    n0: 'Zenbaki oso (n0)',
                    n2: 'Hamartar (n2)',
                    c: 'Moneta (c)',
                    p0: 'Ehunekoa (p0)',
                    p2: 'Ehunekoa (p2)', 
                    n2c: 'Milaka (n2,)',
                    n2cc: 'Milioika (n2,,)',
                    n2ccc: 'Milioiak (n2,,,)',
                    d: 'Data (d)',
                    MMMMddyyyy: 'Hilabetea Eguna Urtea (MMMM dd, yyyy)',
                    dMyy: 'Eguna Hilabetea Urtea (d/M/yy)',
                    ddMyy: 'Eguna Hilabetea Urtea (dd/M/yy)',
                    dMyyyy: 'Eguna Hilabetea Urtea (dd/M/yyyy)',
                    MMMyyyy: 'Hilabetea Urtea (MMM yyyy)',
                    MMMMyyyy: 'Hilabetea Urtea (MMMM yyyy)',
                    yyyyQq: 'Urtea Quarter (yyyy "Q"q)',
                    FYEEEEQU: 'Zerga Urtea Quarter ("FY"EEEE "Q"U)'
                }
            },
            PivotEngine: {
                grandTotal: 'Total orokorra',
                subTotal: 'Azpitotala'
            },
            PivotPanel: {
                fields: 'Aukeratu eremuak txostenari gehitzeko:',
                drag: 'Arrastatu beheko areen arteko eremuak:',
                filters: 'Iragazkiak',
                cols: 'Zutabeetan',
                rows: 'Errenkadak',
                vals: 'Balioak',
                defer: 'Atzeratu Eguneraketak',
                update: 'Eguneratu'
            },
            _ListContextMenu: {
                up: 'Eraman gora',
                down: 'Eraman behera',
                first: 'Eraman hasierara',
                last: '&Eraman amaierara',
                filter: 'Eraman txosten-iragazkira',
                rows: 'Eraman errenkada-etiketetara',
                cols: 'Eraman zutabe-etiketetara',
                vals: 'Eraman balioetara',
                remove: 'Kendu eremua',
                edit: 'Eremu-ezarpenak…',
                detail: 'Erakutsi xehetasuna…'
            },
            PivotChart: {
                by: 'by',
                and: 'eta'
            },
            DetailDialog: {
                header: 'Xehetasunen ikuspegia:',
                ok: 'Ados',
                items: '{cnt:n0} items',
                item: '{cnt} item',
                row: 'Errenkada',
                col: 'Zutabea'
            }
        },
        Viewer:{
            cancel: 'Utzi',
            ok: 'Ados',
            bottom: 'Behetik:',
            top: 'Goitik:',
            right: 'Eskuinetik:',
            left: 'Ezkerrean:',
            margins: 'Marjinak (hazbeteak)',
            orientation: 'Orientazioa:',
            paperKind: 'Paper Mota:',
            pageSetup: 'Prestatu orrialdea',
            landscape: 'Horizontala',
            portrait: 'Bertikala',
            pageNumber: 'Orri zenbakia',
            zoomFactor: 'Zoom faktorea',
            paginated: 'Orrialde-diseinua',
            print: 'Inprimatu',
            search: 'Bilatu',
            matchCase: 'Maiuskulak/Minuskulak',
            wholeWord: 'Esaldi osoa bakarrik',
            searchResults: 'Bilaketaren emaitzak',
            previousPage: 'Aurreko orria',
            nextPage: 'Hurrengo orria',
            firstPage: 'Lehen orria',
            lastPage: 'Azken orria',
            backwardHistory: 'Atzerantz',
            forwardHistory: 'Aurrera',
            pageCount: 'Orrialde kopurua',
            selectTool: 'Hautatu Tresna',
            moveTool: '"Mugimendu" tresna',
            continuousMode: 'Etengabeko orria ikuspegia',
            singleMode: 'Bakar Orria Ikuspegia',
            wholePage: 'Fit Page Osoa',
            pageWidth: 'Hurrengo Orria',
            zoomOut: 'Txikiagotu',
            zoomIn: 'Handiagotu',
            rubberbandTool: 'Hurbildu Aukeraketa by',
            magnifierTool: 'lupa',
            rotatePage: 'Biratu Page',
            rotateDocument: 'Biratu dokumentua',
            exports: 'Esportatu',
            fullScreen: 'Pantaila osoa',
            exitFullScreen: 'Irten pantaila osotik',
            hamburgerMenu: 'Tresnak',
            showSearchBar: 'Erakutsi bilaketa Bar',
            viewMenu: 'Diseinu-aukerak',
            searchOptions: 'Bilaketarako aukerak',
            matchCaseMenuItem: 'Maiuskulak/Minuskulak',
            wholeWordMenuItem: 'Match osoa word',
            thumbnails: 'Page Thumbnails',
            outlines: 'Dokumentu-mapa',
            loading: 'Kargatzen…',
            pdfExportName: 'Adobe-ren PDF',
            docxExportName: 'Open XML Word',
            xlsxExportName: 'Open XML Excel',
            docExportName: 'Microsoft Word',
            xlsExportName: 'Microsoft Excel',
            mhtmlExportName: 'Web archive (MHTML)',
            htmlExportName: 'HTML dokumentu',
            rtfExportName: 'RTF dokumentu',
            metafileExportName: 'konprimitutako Metafiles',
            csvExportName: 'CSV',
            tiffExportName: 'Tiff irudiak',
            bmpExportName: 'BMP irudiak',
            emfExportName: 'Hobetutako metafile',
            gifExportName: 'GIF irudiak',
            jpgExportName: 'JPG irudiak',
            jpegExportName: 'JPEG irudiak',
            pngExportName: 'PNG irudien',
            abstractMethodException: 'Hau metodo abstraktu bat da, mesedez ezarri egingo du.',
            cannotRenderPageNoViewPage: 'Ezin da errendatu orri dokumentu iturburua eta ikuspegia orri gabe.',
            cannotRenderPageNoDoc: 'Ezin da errendatu orri dokumentu iturburua eta ikuspegia orri gabe.',
            exportFormat: 'Export formatua:',
            exportOptionTitle: 'Export options',
            documentRestrictionsGroup: 'Dokumentu murrizketak',
            passwordSecurityGroup: 'Pasahitza segurtasun',
            outputRangeGroup: 'Irteera sorta',
            documentInfoGroup: 'Dokumentu info',
            generalGroup: 'Orokorra',
            docInfoTitle: 'Lanpostua',
            docInfoAuthor: 'Egilea',
            docInfoManager: 'Zuzendaria',
            docInfoOperator: 'Operadorea',
            docInfoCompany: 'Enpresa',
            docInfoSubject: 'Gaia',
            docInfoComment: 'Iruzkindu',
            docInfoCreator: 'Sortzailea',
            docInfoProducer: 'Produktorea',
            docInfoCreationTime: 'Sortze-data',
            docInfoRevisionTime: 'Errepasoa denbora',
            docInfoKeywords: 'Gako-hitzak',
            embedFonts: 'Kapsulatu TrueType letra-tipoak',
            pdfACompatible: 'PDF / A maila (2B) bateragarria',
            useCompression: 'Erabili konpresioa',
            useOutlines: 'Sortu eskemak',
            allowCopyContent: 'nartu edukien kopiatzea edo erauzketa',
            allowEditAnnotations: 'Onartu oharpen edizio',
            allowEditContent: 'Onartu edukien edizio',
            allowPrint: 'Onartu inprimatzeko',
            ownerPassword: 'Baimenak (jabea) pasahitza:',
            userPassword: 'Dokumentua (erabiltzaile) pasahitza irekia:',
            encryptionType: 'Encryption maila:',
            paged: 'Orrialdekatuta',
            showNavigator: 'Erakutsi nabigatzailea',
            navigatorPosition: 'Navigator posizioa',
            singleFile: 'Fitxategi bakarra',
            tolerance: 'Tolerantzia denean detektatzeko testu mugetatik (puntu):',
            pictureLayer: 'Erabili bereizi irudi geruza',
            metafileType: 'Metafile Mota:',
            monochrome: 'Monokromoa',
            resolution: 'Bereizmena',
            outputRange: 'Orrialde-bitartea:',
            outputRangeInverted: 'Alderantziz',
            showZoomBar: 'Hurbildu Bar',
            searchPrev: 'Search Aurreko',
            searchNext: 'Search Hurrengoa',
            checkMark: '\u2713',
            exportOk: 'Esportatu',
            cannotSearch: 'Search dokumentu iturri bat zehaztu behar da.',
            parameters: 'Parametroak',
            requiringParameters: 'Sartu parametroak.',
            nullParameterError: 'Balioa ezin da null izan.',
            invalidParameterError: 'Sarrera baliogabea.',
            parameterNoneItemsSelected: '(bat ere ez)',
            parameterAllItemsSelected: '(guztiak)',
            parameterSelectAllItemText: '(Hautatu dena)',
            selectParameterValue: '(Hautatu balioa)',
            apply: 'Aplikatu',
            errorOccured: 'Errorea gertatu da.'
        }
    };

    let updc = window['wijmo']._updateCulture;
    if (updc) {
        updc();
    }
};
