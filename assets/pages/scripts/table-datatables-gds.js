// Currency Formatting - KRW
Number.prototype.formatMoney = function(c, d, t){
  var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };
  function currency(money){
    return Math.round(money).formatMoney(0, '.', ',');
  }

// Datatable
var TableDatatables = function () {

    // Trasform to KRW currency format
    $("td.currency").each(function() {
      var text = '₩ ' + currency(parseInt($(this).text()));
      $(this).html(text);
    });

    // Intit Datatable: po_list
    var initTable1 = function () {
        var table = $('#table_po_list');

        var currencyColumns = [5,6,7]; // money formatting columns

        var oTable = table.dataTable({

            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                url: '/lang/dataTables.korean.lang.json',
            },

            buttons: [
                {
                  extend: 'print',
                  text: '<i class="fa fa-print"></i> 프린트',
                  className: 'btn dark btn-outline',
                  title: 'ZARI 판매대행 내역서',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'copy',
                  text: '<i class="fa fa-files-o"></i> 복사하기',
                  className: 'btn blue btn-outline',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'excel',
                  text: '<i class="fa fa-file-excel-o"></i> Excel',
                  className: 'btn green-jungle btn-outline ',
                  filename: 'ZARI 판매대행 내역서',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'csv',
                  text: '<i class="fa fa-file-text-o"></i> CVS',
                  className: 'btn red btn-outline ',
                  filename: 'ZARI 판매대행 내역서',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'colvis',
                  text: '<i class="fa fa-check"></i> 항목선택',
                  className: 'btn dark btn-outline'
                }
            ],

            // setup responsive extension: http://datatables.net/extensions/responsive/
            responsive: true,
            //"ordering": false, disable column ordering
            //"paging": false, disable pagination

            colReorder: {
                reorderCallback: function () {
                    // console.log( 'callback' );
                }
            },

            "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.

            "order": [
                [2, 'desc']
            ],

            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "columnDefs": [
                // {  // set default column settings
                //     'orderable': false,
                //     'targets': [0]
                // },
                // {
                //     "searchable": false,
                //     "targets": [0]
                // },
                {
                  "type" : "num-fmt",
                  "targets" : currencyColumns
                },
                {
                    "className": "dt-right",
                    "targets": currencyColumns
                }
            ],

            // initComplete: function () {
            //
            //     // column select combobox
            //     this.api().column(1).every(function(){
            //         var column = this;
            //         var select = $('<select class="form-control input-sm"><option value="">전체채널</option></select>')
            //             .appendTo( $(column.footer()).empty() )
            //             .on( 'change', function () {
            //                 var val = $.fn.dataTable.util.escapeRegex(
            //                     $(this).val()
            //                 );
            //                 column
            //                     .search( val ? '^'+val+'$' : '', true, false )
            //                     .draw();
            //             } );
            //
            //         column.data().unique().sort().each( function ( d, j ) {
            //             select.append( '<option value="'+d+'">'+d+'</option>' )
            //         } );
            //     });
            //
            // },

            "footerCallback": function ( row, data, start, end, display ) {
                var api = this.api(), data;

                // Remove the formatting to get integer data for summation
                var intVal = function ( i ) {
                    return typeof i === 'string' ?
                        i.replace(/,|₩|$ /g, '')*1 :
                        typeof i === 'number' ?
                            i : 0;
                };

                // Total over all pages
                // total = api
                //     .column( 5 )
                //     .data()
                //     .reduce( function (a, b) {
                //         return intVal(a) + intVal(b);
                //     }, 0 );

                // Total over this page
                currencyColumns.forEach(function(column) {
                  pageTotal = api
                      .column( column, { page: 'current'} )
                      .data()
                      .reduce( function (a, b) {
                          return intVal(a) + intVal(b);
                      }, 0 );
                   $( api.column( column ).footer() ).html('₩ ' + currency(pageTotal));
                });
            },

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js).
            // So when dropdowns used the scrollable div should be removed.
            //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
        });
    }

    // Intit Datatable: ps_list
    var initTable2 = function () {
        var table = $('#table_ps_list');

        var currencyColumns = [7,8,9]; // money formatting columns

        var oTable = table.dataTable({

            // Internationalisation.
            "language": {
                url: '/lang/dataTables.korean.lang.json',
            },

            buttons: [
                {
                  extend: 'print',
                  text: '<i class="fa fa-print"></i> 프린트',
                  className: 'btn dark btn-outline',
                  title: 'ZARI 판매대행 내역서',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'copy',
                  text: '<i class="fa fa-files-o"></i> 복사하기',
                  className: 'btn blue btn-outline',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'excel',
                  text: '<i class="fa fa-file-excel-o"></i> Excel',
                  className: 'btn green-jungle btn-outline ',
                  filename: 'ZARI 판매대행 내역서',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'csv',
                  text: '<i class="fa fa-file-text-o"></i> CVS',
                  className: 'btn red btn-outline ',
                  filename: 'ZARI 판매대행 내역서',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'colvis',
                  text: '<i class="fa fa-check"></i> 항목선택',
                  className: 'btn dark btn-outline'
                }
            ],

            // setup responsive extension
            responsive: true,

            colReorder: {
                reorderCallback: function () {
                    // console.log( 'callback' );
                }
            },

            "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.

            "order": [
                [2, 'desc']
            ],

            "lengthMenu": [
                [10, 20, 30, 50, -1],
                [10, 20, 30, 50, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 20,

            "columnDefs": [
                {
                  "type" : "num-fmt",
                  "targets" : currencyColumns
                },
                {
                    "className": "dt-right",
                    "targets": currencyColumns
                }
            ],

            "footerCallback": function ( row, data, start, end, display ) {
                var api = this.api(), data;

                // Remove the formatting to get integer data for summation
                var intVal = function ( i ) {
                    return typeof i === 'string' ?
                        i.replace(/,|₩|$ /g, '')*1 :
                        typeof i === 'number' ?
                            i : 0;
                };

                // Total over this page
                currencyColumns.forEach(function(column) {
                  pageTotal = api
                      .column( column, { page: 'current'} )
                      .data()
                      .reduce( function (a, b) {
                          return intVal(a) + intVal(b);
                      }, 0 );
                   $( api.column( column ).footer() ).html('₩ ' + currency(pageTotal));
                });
            },

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }

    // Intit Datatable: ps_Part
    var initTable3 = function () {
        var table = $('#table_ps_partner');

        var currencyColumns = []; // money formatting columns

        var oTable = table.dataTable({

            // Internationalisation.
            "language": {
                url: '/lang/dataTables.korean.lang.json',
            },

            buttons: [
                {
                  extend: 'print',
                  text: '<i class="fa fa-print"></i> 프린트',
                  className: 'btn dark btn-outline',
                  title: 'ZARI 판매대행 내역서',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'copy',
                  text: '<i class="fa fa-files-o"></i> 복사하기',
                  className: 'btn blue btn-outline',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'excel',
                  text: '<i class="fa fa-file-excel-o"></i> Excel',
                  className: 'btn green-jungle btn-outline ',
                  filename: 'ZARI 판매대행 내역서',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'csv',
                  text: '<i class="fa fa-file-text-o"></i> CVS',
                  className: 'btn red btn-outline ',
                  filename: 'ZARI 판매대행 내역서',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'colvis',
                  text: '<i class="fa fa-check"></i> 항목선택',
                  className: 'btn dark btn-outline'
                }
            ],

            // setup responsive extension
            responsive: true,

            colReorder: {
                reorderCallback: function () {
                    // console.log( 'callback' );
                }
            },

            "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.

            "order": [
                [0, 'desc']
            ],

            "lengthMenu": [
                [10, 20, 30, 50, -1],
                [10, 20, 30, 50, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 20,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

        });
    }

    // Intit Datatable: ps_list
    var initTable4 = function () {
        var table = $('#table_payment_list');

        var currencyColumns = [9,10,11]; // money formatting columns

        var oTable = table.dataTable({

            // Internationalisation.
            "language": {
                url: '/lang/dataTables.korean.lang.json',
            },

            buttons: [
                {
                  extend: 'excel',
                  text: '<i class="fa fa-file-excel-o"></i> Excel',
                  className: 'btn green-jungle btn-outline ',
                  filename: '정산리스트',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'csv',
                  text: '<i class="fa fa-file-text-o"></i> CVS',
                  className: 'btn red btn-outline ',
                  filename: 'ZARI 판매대행 내역서',
                  exportOptions: {
                    columns: ':visible'
                  }
                },
                {
                  extend: 'colvis',
                  text: '<i class="fa fa-check"></i> 항목선택',
                  className: 'btn dark btn-outline'
                }
            ],

            // setup responsive extension
            responsive: true,

            colReorder: {
                reorderCallback: function () {
                    // console.log( 'callback' );
                }
            },

            "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.

            "order": [
                [1, 'desc']
            ],

            "lengthMenu": [
                [10, 20, 30, 50, -1],
                [10, 20, 30, 50, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 20,

            "columnDefs": [
                {
                  "type" : "num-fmt",
                  "targets" : currencyColumns
                },
                {
                    "className": "dt-right",
                    "targets": currencyColumns
                },
                {
                    'orderable': false,
                    'targets': [0]
                }, {
                    "searchable": false,
                    "targets": [0]
                }
            ],

            "footerCallback": function ( row, data, start, end, display ) {
                var api = this.api(), data;

                // Remove the formatting to get integer data for summation
                var intVal = function ( i ) {
                    return typeof i === 'string' ?
                        i.replace(/,|₩|$ /g, '')*1 :
                        typeof i === 'number' ?
                            i : 0;
                };

                // Total over this page
                currencyColumns.forEach(function(column) {
                  pageTotal = api
                      .column( column, { page: 'current'} )
                      .data()
                      .reduce( function (a, b) {
                          return intVal(a) + intVal(b);
                      }, 0 );
                   $( api.column( column ).footer() ).html('₩ ' + currency(pageTotal));
                });
            },

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
        });

        var tableWrapper = jQuery('#table_payment_list_wrapper');

        table.find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).prop("checked", true);
                } else {
                    $(this).prop("checked", false);
                }
            });
        });

    }


    return {

        //main function to initiate the module
        init: function () {

            if (!jQuery().dataTable) {
                return;
            }

            initTable1();
            initTable2();
            initTable3();
            initTable4();

        }

    };

}();

jQuery(document).ready(function() {
    TableDatatables.init();
});
