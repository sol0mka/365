// Generated by CoffeeScript 1.6.2
(function() {
  window.onload = function() {
    var content, field, messages, sendButton, socket;

    messages = [];
    socket = io.connect("http://localhost:3000");
    field = document.getElementById("field");
    sendButton = document.getElementById("send");
    content = document.getElementById("content");
    socket.on("connect", function(data) {
      return socket.emit('getcontents');
    });
    socket.on("getcontents", function(data) {
      return socket.emit('postcontents', content.innerHTML);
    });
    socket.on("postcontents", function(data) {
      return content.innerHTML = data;
    });
    socket.on("message", function(data) {
      var html, i;

      if (data.message) {
        messages.push(data.message);
        html = "";
        i = 0;
        while (i < messages.length) {
          html += messages[i] + "<br />";
          i++;
        }
        return content.innerHTML = html;
      } else {
        return console.log("There is a problem:", data);
      }
    });
    return sendButton.onclick = function() {
      var text;

      text = field.value;
      return socket.emit("send", {
        message: text
      });
    };
  };

}).call(this);
