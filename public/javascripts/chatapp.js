const socket = io("http://localhost:8081");

var showChatBlock = () => {
    $(".chatContainer").show(200);
}

var sendMessage = () => {
    var msg = $("#umsg").val();
    
    $("#umsg").val('');
    var data = {
        uid: $("#uid").val(),
        msg: msg
    }
    showMsg(data, 'send');
    socket.emit("send_msg", JSON.stringify(data));
}

socket.on('receive_Msg', (data) => {
    data = JSON.parse(data);
    showMsg(data, 'receive');
});

var showMsg = (data, type) => {
    var divTag = $("<div></div>");
    var className;
    switch(type) {
        case 'send':
            className = 'sendMsg'
            break;
        case 'receive' :
            className = 'receiveMsg'
            break;
    }
    divTag.html('<b> ' + data.uid + ' </b> :' + data.msg);
    divTag.addClass(className);
    $(".msgContainer").append(divTag);
}