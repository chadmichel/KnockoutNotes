var Notes;
(function (Notes) {

    Notes.Note = function (title, body) {
        if (title == null)
            title = "";            
        this.title = ko.observable(title);
        if (body == null)
            body = "";
        this.body = ko.observable(body);
    }

    Notes.NotesVM = function () {        
        var self = this;

        self.active = new Notes.Note();

        self.activeTitle = ko.observable("");
        self.activeBody = ko.observable("");
        self.createMode = ko.observable(true);

        self.notes = ko.observableArray([           
        ]);

        self.isSaveEnabled = ko.computed(function() {
            return (self.active.title() != self.activeTitle() || self.active.body() != self.activeBody());
        }, self);

        self.isNewEnabled = ko.computed(function() {
            return (!self.isSaveEnabled() && !self.createMode());
        }, self);

        self.save = function() {
            if (self.createMode()) {
                var note = new Notes.Note(self.activeTitle(), self.activeBody());
                self.notes.push(note);
                self.createMode(false);
                self.active.title(self.activeTitle());
                self.active.body(self.activeBody());                
            }
            else {
                self.active.title(self.activeTitle());
                self.active.body(self.activeBody());
            }
        }

        self.create = function() {
            self.active = new Notes.Note();
            self.activeTitle("");
            self.activeBody("");
            self.createMode(true);
        }

        self.load = function(note) {
            self.active = note;
            self.activeTitle(note.title());
            self.activeBody(note.body());            
        }
        
    };


})(Notes || (Notes = {}));

$(function() {

    var vm = new Notes.NotesVM();

    ko.applyBindings(vm);

});
