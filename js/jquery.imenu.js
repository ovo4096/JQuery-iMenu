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
            if (typeof node.delete !== "undefined") {
                garbageCollector();
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

        function garbageCollector() {

            function nodeGC(node) {
                if (typeof node.nodes === "undefined") return;

                for (var nodeIndex in node.nodes) {
                    if (typeof node.nodes[nodeIndex].delete !== "undefined") {
                        node.nodes[nodeIndex] = undefined;
                    } else {
                        nodeGC(node.nodes[nodeIndex]);
                    }
                }
            }

            if (typeof self.node === "undefined") return;
            if (typeof self.node.delete !== "undefined") {
                self.node = undefined;
            }
            else {
                nodeGC(self.node);
            }

            //garbageCollector();
        }

        this.update();

        return this;
    }

}(jQuery));