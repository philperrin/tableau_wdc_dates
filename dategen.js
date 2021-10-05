(function() {
  $(document).ready(function() {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback) {
      var cols = [{
        id: "date",
        alias: "Date",
        dataType: tableau.dataTypeEnum.date
      }];

      var tableSchema = {
        id: "dates",
        alias: "Dates",
        columns: cols
      };

      schemaCallback([tableSchema]);
    };




    myConnector.getData = function(table, doneCallback) {

      listDate = [];
      const startDate = tableau.connectionData;
      const endDate = new Date().toISOString().slice(0, 10);
      var dateMove = new Date(startDate);
      let strDate = startDate;

      while (strDate < endDate) {
        strDate = dateMove.toISOString().slice(0, 10);
        console.log(strDate);
        listDate.push({
          "date": strDate
        });
        dateMove.setDate(dateMove.getDate() + 1);
      }
      table.appendRows(listDate);
      doneCallback();
    };



    tableau.registerConnector(myConnector);
    $("#submitButton").click(function() {
      tableau.connectionData = $("#submitDate").val();

      tableau.connectionName = "Date Generator: " + tableau.connectionData + " - Today";
      tableau.submit();
    });
  });
})();
