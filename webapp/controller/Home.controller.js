sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("marketingcampaignreqlist.zcrmktmarketingreqlist.controller.Home", {
            onInit: function () {

            },
            onBeforeRebind(oEvent) {

                const oBindingParams = oEvent.getParameter("bindingParams");
                const oModel = this.getView().getModel("filterModel");
                const oData = oModel.getData();
                const aData = Object.entries(oData);
                aData.forEach(element => {
                    if(element[1])
                        switch (element[0]) {
                            case "Status":
                                oBindingParams.filters.push(
                                    new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains,element[1]),
                                )
                                break;
                            case "RequesterId":
                                oBindingParams.filters.push(
                                    new sap.ui.model.Filter("RequesterId", sap.ui.model.FilterOperator.Contains,element[1]),
                                )
                            
                                break;
                            case "RequestId":
                                oBindingParams.filters.push(
                                    new sap.ui.model.Filter("RequestId", sap.ui.model.FilterOperator.Contains,element[1]),
                                )
                                break;
                            case "InitiatedDate":
                                oBindingParams.filters.push(
                                    new sap.ui.model.Filter("InitiatedDate", sap.ui.model.FilterOperator.Contains,element[1]),
                                )
                                break;
                            case "PermitType":
                                oBindingParams.filters.push(
                                    new sap.ui.model.Filter("PermitType", sap.ui.model.FilterOperator.Contains,element[1]),
                                )
                                break;
                            default:
                                break;
                        }
                });
                // Clear existing filters if needed
               

            },
            onSelectionChange(oEvent) {
                const oModel = this.getView().getModel("filterModel");
                const combTxt = oEvent.getSource().getSelectedItem().getProperty("text");
                oModel.setProperty("/PermitType", combTxt);

            },

            onColumnListItemPress(oEvent) {
                const sPath = oEvent.getSource().getBindingContext().getPath()
                const reqId = sPath.match(/\d+/)[0];
                let CrossApplicationNavigation = sap.ushell.Container.getService("CrossApplicationNavigation");
                CrossApplicationNavigation.hrefForExternal({
                    target: {
                        semanticObject: "ZMKTCAMP",
                        action: "display"
                    },
                    params: {
                        "RequestId": reqId
                    }
                }).then(function (sHref) {
                    // Place sHref somewhere in the DOM
                });
            }
        });
    });
