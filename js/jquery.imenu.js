var option = {
    on: {
        "click": function () {

        }
    }
};

var node = {
    on: {
        "click": function () {

        }
    },

    options: [
        option,
        option
    ]
};

//<li>
//<span><span>
//<ul></ul>
//</li>

(function ($) {

    $.fn.IMenu = function (node) {
        var self = this;

        self.node = $.extend({}, node);

        self.update = function () {
            self.empty();
            var html = generateHtml(self.node);
            self.append(html);
        }

        function generateHtml(node) {
            if (typeof node === 'undefined') return;

            var html = $("<ul>");
            html.after($("<span>").text(node.name));

            if (typeof node.nodes === 'undefined') return html;
            for (var nodeIndex in node.nodes) {
                html.append(
                    $("<li>").append(
                        generateHtml(node.nodes[nodeIndex])
                    )
                );
            }

            for (var optionIndex in node.options) {
                html.append($("<button>").text(node.options[optionIndex].name));
            }

            return html;
        }

        self.update();
        return self;
    }

}(jQuery));