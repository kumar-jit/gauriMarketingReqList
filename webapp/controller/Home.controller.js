sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("marketingcampaignreqlist.zcrmktmarketingreqlist.controller.Home", {
            onInit: function () {
                const oOwnComp = this.getOwnerComponent();
                const oModel = oOwnComp.getModel();
                const oFilterMdoel=oOwnComp.getModel("filterModel")
                
                let sUrl = "/UserSet('')"
                oModel.read(sUrl, {
                    success: function (oData) {
                        if (oData.Role === "Approver") {
                            oFilterMdoel.setProperty("/visible", true);
                        }
                        else if (oData.Role === "Marketing")
                            oFilterMdoel.setProperty("/visible", false);
                        oView.setBusy(false);
                    },
                    error: function (oError) {
                        oView.setBusy(false);
                    }
                });
            },
            onBeforeRebind(oEvent) {

                const oBindingParams = oEvent.getParameter("bindingParams");
                const oModel = this.getView().getModel("filterModel");
                const oData = oModel.getData();
                const aData = Object.entries(oData);
                aData.forEach(element => {
                    if (element[1])
                        switch (element[0]) {
                            case "Status":
                                oBindingParams.filters.push(
                                    new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, element[1]),
                                )
                                break;
                            case "RequesterId":
                                oBindingParams.filters.push(
                                    new sap.ui.model.Filter("CreatedBy", sap.ui.model.FilterOperator.Contains, element[1]),
                                )

                                break;
                            case "RequestId":
                                oBindingParams.filters.push(
                                    new sap.ui.model.Filter("RequestId", sap.ui.model.FilterOperator.EQ, element[1]),
                                )
                                break;
                            case "InitiatedDate":
                                var date = element[1].split(" - ")
                                oBindingParams.filters.push(
                                    new sap.ui.model.Filter({
                                        filters: [
                                            new sap.ui.model.Filter("InitiatedDate", sap.ui.model.FilterOperator.GE, date[0]),
                                            new sap.ui.model.Filter("InitiatedDate", sap.ui.model.FilterOperator.LE, date[1])
                                        ],
                                        and: true
                                    })
                                )

                break;
                            case "PermitType":
            oBindingParams.filters.push(
                new sap.ui.model.Filter("PermitType", sap.ui.model.FilterOperator.Contains, element[1]),
            )
                                break;
            default:
                                break;
        }
                });
                // Clear existing filters if needed


            },

_setComboBoxText(oEvent, propertyName) {
    const oModel = this.getView().getModel("filterModel");
    const combTxt = oEvent.getSource().getSelectedItem()?.getProperty("text") || "";
    oModel.setProperty("/" + propertyName + "", combTxt);
},
onSelectionChange(oEvent) {
    this._setComboBoxText(oEvent, "PermitType");
},
onStatusChange(oEvent) {
    this._setComboBoxText(oEvent, "Status");
},

onColumnListItemPress(oEvent) {
    const sPath = oEvent.getSource().getBindingContext().getPath()
    const reqId = sPath.match(/\d+/)[0];
    let CrossApplicationNavigation = sap.ushell.Container.getService("CrossApplicationNavigation");
    CrossApplicationNavigation.toExternal({
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
