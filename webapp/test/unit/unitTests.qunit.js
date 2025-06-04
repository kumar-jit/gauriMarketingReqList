/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"marketingcampaignreqlist/zcrmktmarketingreqlist/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
