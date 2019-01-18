var initializeMarkdownEditor = function() {
    var textToMarkdownConverter = new showdown.Converter();     // see showdown github page for quick tutorial
    var textArea = document.getElementById('textArea');
    var markdownArea = document.getElementById('markdownArea');

    var previousMarkdownValue;

    var convertTextAreaToMarkdown = function() {
        var markdownText = textArea.value;  // returns the content of the textArea
        previousMarkdownValue = markdownText;
        html = textToMarkdownConverter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    textArea.addEventListener('input', convertTextAreaToMarkdown);

    // pathname won't be greater than 1 for homepage, so this will disable realtime collaboration on homepage
    if(document.location.pathname.length > 1) {
        var documentName = document.location.pathname.substring(1);     // pathname[1] to end
        // we open a sharejs connection to the document, and attach the textArea to the object returned
        // This is for collaborative editing, your textArea will automatically change if someone else makes a change
        sharejs.open(documentName, 'text', function(error, doc) {
            doc.attach_textarea(textArea);
            convertTextAreaToMarkdown();
        });
    }
    
    // Checks if another user made a change to textArea
    var didChangeOccur = function() {
        if(previousMarkdownValue != textArea.value) {
            return true;
        }
        return false;
    };

    // Check every second if another user made a change, if he did then update
    setInterval(function() {
        if(didChangeOccur()) {
            convertTextAreaToMarkdown();
        }
    }, 1000);

    // make tab act like tab instead of acting as browser's tab
    textArea.addEventListener('keydown', function(e) {  // e is the event
        if(e.keyCode === 9) {   // if tab was pressed
            // get the cursor position or selection
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var target = e.target;
            var value = target.value;

            // replace selection with a tab at target
            target.value = value.substring(0, start) + "\t" + value.substring(end);

            // put the cursor back at the right place
            this.selectionStart = start + 1;
            this.selectionEnd = start + 1;

            // prevent focus lose (what browser does on tab)
            e.preventDefault();
        }
    });

    convertTextAreaToMarkdown();
};

// onload property is takes a function reference, the function is called when the load event is fired
// so the function (anonymous here) is called as soon as the page first loads
window.onload = initializeMarkdownEditor;