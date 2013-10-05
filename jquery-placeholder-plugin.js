var placeholderTextColor = "#a8a8a8";

function scanAndUpdatePlaceholders() {
    $("input[type=text]").each(function () {
        if ($(this).attr("placeholder") != null) {
            if ($(this).val() == 0)
                populatePlaceholder($(this));
        }
    })
}

function populatePlaceholder(input) {
    input.val(input.attr("placeholder"));
    input.css("color", placeholderTextColor);
    input.data("placeholder-override", "true");
}

$(document).ready(function () {
    jQuery.support.placeholder = (function () {
        var i = document.createElement("input");
        return "placeholder" in i;
    })();

    if (!jQuery.support.placeholder) {
        enablePlaceholderPlugin();
    }

    function enablePlaceholderPlugin() {
        scanAndUpdatePlaceholders();

        $("body").on("focus", "input[type=text]", function () {
            if ($(this).data("placeholder-override") == "true")
                $(this).val("");
            $(this).css("color", "black");
        });
        $("body").on("blur", "input[type=text]", function () {
            if ($(this).data("placeholder-override") == "true") {
                populatePlaceholder($(this));
            }
        });

        $("body").on("change", "input[type=text]", function () {
            if ($(this).val().length > 0) {
                $(this).data("placeholder-override", "false");
            } else {
                $(this).data("placeholder-override", "true");
            }
        });

        $(document).bind('DOMNodeInserted', function (event) {
            $(event.target).find("input[type=text]").each(function () {
                populatePlaceholder($(this));
            })
        });

        $(document).bind('DOMAttrModified', function (event) {
            if (event.originalEvent.attrName == "placeholder") {
                populatePlaceholder($(event.target));
            }
        });
    }
});
