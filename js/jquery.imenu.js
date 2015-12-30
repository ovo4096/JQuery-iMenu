(function ($) {
    $.fn.IMenu = function (node) {
        var self = this;

        self.node = node;

        self.update = function () {
            self.empty();
            self.append(generateHtml());
        };

        function generateNodeHtml(node) {
            if (typeof node === "undefined") return;
            var html = node.dom.clone(true);

            for (var optionIndex in node.options) {
                var option = node.options[optionIndex].clone(true);
                option.data("node", node);
                html.append(option);
            }

            if (typeof node.nodes === "undefined") return html;

            for (var nodeIndex in node.nodes) {
                if (typeof node.nodes[nodeIndex].remove !== "undefined") {
                    delete node.nodes[nodeIndex];
                    continue;
                }

                html.append(generateNodeHtml(node.nodes[nodeIndex]));
            }

            return html;
        }

        function generateHtml() {
            if (typeof self.node === "undefined") return;
            if (typeof self.node.remove !== "undefined") {
                delete self.node;
            }
            return generateNodeHtml(self.node);
        }

        return self;
    }

}(jQuery));