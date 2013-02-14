// from: http://jsfiddle.net/rniemeyer/GwkRQ/

ko.bindingHandlers.tinymce = {

    init: function(element, valueAccessor, allBindingsAccessor) {

        var options = allBindingsAccessor().tinymceOptions || {};
        var modelValue = valueAccessor();

        //handle edits made in the editor
        options.setup = function(ed) {
            ed.onChange.add(function(ed, l) {
                if (ko.isWriteableObservable(modelValue)) {
                    modelValue(l.content);
                }
            });
            ed.onKeyUp.add(function(ed, l) {
               if (ko.isWriteableObservable(modelValue)) {
                    modelValue(l.content);
                }
            });
        };

        //handle destroying an editor (based on what jQuery plugin does)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $(element).parent().find("span.mceEditor,div.mceEditor").each(function(i, node) {
                var ed = tinyMCE.get(node.id.replace(/_parent$/, ""));
                if (ed) {
                    ed.remove();
                }
            });
        });


        $(element).tinymce(options);

    },

    //update the control when the view model changes
    update: function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).html(value);
    }
};
