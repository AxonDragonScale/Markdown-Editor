// onload property is takes a function reference, the function is called when the load event is fired
// so the function (anonymous here) is called as soon as the page first loads

console.log("hsdkfhkdshf");

var initializeMarkdownEditor = function() {
    var textToMarkdownConverter = new showdown.Converter();     // see showdown github page for quick tutorial
    var textArea = document.getElementById('textArea');
    var markdownArea = document.getElementById('markdownArea');

    textArea.value = "Hello World";
    console.log("hsdkfhkdshf");

    var convertTextAreaToMarkdown = function() {
        var markdownText = textArea.value;  // returns the content of the textArea
        html = textToMarkdownConverter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    textArea.addEventListener('input', convertTextAreaToMarkdown);
    convertTextAreaToMarkdown();    // why called here?
};

window.onload = initializeMarkdownEditor;