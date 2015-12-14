//var option = {
//    on: {
//        "click": function () {
//
//        }
//    },
//    name: "OPT"
//};
//
//var node = {
//    on: {
//        "click": function () {
//
//        }
//    },
//
//    options: [
//        option,
//        option
//    ]
//};

//<li>
//<span><span>
//<ul></ul>
//</li>

(function ($) {

    $.fn.IMenu = function (node) {
        var self = this;

        //this.node = $.extend({}, node);

        this.update = function () {
            self.empty();
            self.append(generateHtml(self.node));
        };

        function generateHtml(node) {
            if (typeof node === "undefined") return;

            if (typeof node.remove !== "undefined" && node.remove) {
                node = undefined;
                return;
            }

            var html = node.dom.clone(true);

            for (var optionIndex in node.options) {
                var option = node.options[optionIndex].clone(true);
                option.data("node", node);
                html.append(option);
            }

            if (typeof node.nodes === "undefined") return html;

            for (var nodeIndex in node.nodes) {
                html.append(generateHtml(node.nodes[nodeIndex]));
            }

            return html;
        }

        this.update();

        return this;
    }

}(jQuery));