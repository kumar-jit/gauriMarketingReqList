sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("marketingcampaignreqlist.zcrmktmarketingreqlist.controller.Home", {
            onInit: function () {

            },
            onBeforeRebind(oEvent) {

                var oBindingParams = oEvent.getParameter("bindingParams");

                // Clear existing filters if needed
                oBindingParams.filters = [];
                var sCustomValue = this.byId("idDatePicker")?.getValue();
                if (sCustomValue) {
                    oBindingParams.filters.push(
                        new sap.ui.model.Filter("InitiatedDate", sap.ui.model.FilterOperator.LT, sCustomValue),
                    )
                }

            },
            onSearch(oEvent) {
                var oTable = this.byId("_IDGenSmartTable");
            },
            onPressNavigate(oEvent) {
                letCrossApplicationNavigation = sap.ushell.Container.getService("CrossApplicationNavigation");
                CrossApplicationNavigation.toExternal({
                    target: {
                        semanticObject: "ZMKTCAMP",
                        action: "display"
                    },
                    params: {
                        "RequestId": "102343333"
                    }
                }).then(function (sHref) {
                    // Place sHref somewhere in the DOM
                });
            }
        });
    });
