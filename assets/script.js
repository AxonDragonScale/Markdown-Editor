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

    // we open a sharejs connection to howe, and attach the textArea to the object returned
    // This is for collaborative editing, your textArea will automatically change if someone else makes a change
    sharejs.open('home', 'text', function(error, doc) {
        doc.attach_textarea(textArea);
        convertTextAreaToMarkdown();
    });
    
    // Checks if another user made a change to textArea
    var didChangeOccur = function() {
        if(previousMarkdownValue != textArea.value) {
            return true;
        }
        return false;
    };

    setInterval(function() {
        if(didChangeOccur()) {
            convertTextAreaToMarkdown();
        }
    }, 1000);


};

// onload property is takes a function reference, the function is called when the load event is fired
// so the function (anonymous here) is called as soon as the page first loads
window.onload = initializeMarkdownEditor;