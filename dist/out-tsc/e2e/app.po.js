"use strict";
var protractor_1 = require('protractor');
var HudPage = (function () {
    function HudPage() {
    }
    HudPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    HudPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return HudPage;
}());
exports.HudPage = HudPage;
//# sourceMappingURL=app.po.js.map