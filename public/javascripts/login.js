var readUserInfo = () => {
	var uid = $("#uid").val();
	var upwd = $("#upwd").val();
	var data = {uid, upwd};
	console.log(data);
	// 
	validateData(data);
}

var validateData = (userInfo) => {
	$.ajax({
		url: 'http://localhost:8081/user/logindata/validation',
		dataType: 'json',
		method: 'GET',
		data: userInfo,
		success: function(res) {
			console.log("Success");
			console.log(res);
			if (res.msg == 'Valid') {
				loadPage('prodDetails');
			}else {
				$("#errMSg").html("Invalid credentials")
			}
		}
	});
}