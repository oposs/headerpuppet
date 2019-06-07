/* ************************************************************************

Copyright: 2019 OETIKER+PARTNER AG

License: MIT license

Authors: Tobias Oetiker (oetiker) tobi@oetiker.ch

************************************************************************ */

/**
* This class runs some simple end2end tests on HeaderPuppet.
*/
qx.Class.define("headerpuppet.test.PuppetTest",
{
    extend : qx.dev.unit.TestCase,
    
    members : {
        _win: null,

        "test e2e" : function () {
            // window
            let win = new qx.ui.window.Window("Table").set({
                layout : new qx.ui.layout.VBox(),
                contentPadding: 0,
                centerOnAppear: true
            });
            
            var tableModel = new qx.ui.table.model.Simple();
            tableModel.setColumns([ "ID", "A number", "A date", "Boolean" ]);
            tableModel.setData(this.createRandomRows(1000));
            
            // table
            var table = new qx.ui.table.Table(tableModel).set({
                allowGrowY: true
            });
            
            var headers = [
                { text: "A Long Long Title with multiple lines", 
                rich: true, column: 0, row:0, rowSpan:2, 
                alignY: 'middle', textAlign: 'center' },
                { text: "Hello World Hello World", 
                column: 1, row:0, colSpan: 2,
                alignX: 'center', alignY: 'middle' },
                { text: "Another Test shifted by one column", column: 2, row:1, colSpan: 2, alignX: 'right', textAlign: 'right', rich:true}
            ];
            win.addListenerOnce('appear',(e) => {
                this.resume(
                    () => {
                        this.assertEquals("A Long Long Title with multiple lines",
                        q('[qxclass="headerpuppet.HeaderPuppet"] > :contains("Long Long")')[0].innerText,
                        "Puppet Header Present");
                        win.close();
                    }
                );
            });
            win.add(new headerpuppet.HeaderPuppet(table,headers));  
            win.add(table,{flex: 1});
            win.open();
            this.wait();
        },
        createRandomRows: function (rowCount) {
            var rowData = [];
            var now = new Date().getTime();
            var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
            var nextId = 0;
            for (var row = 0; row < rowCount; row++) {
                var date = new Date(now + Math.random() * dateRange - dateRange / 2);
                rowData.push([ nextId++, Math.random() * 10000, date, (Math.random() > 0.5) ]);
            }
            return rowData;
        }
    }
});
