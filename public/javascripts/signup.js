var registerUser = () => {
	var data = {
		uid: $("#uid").val(),
		upwd: $("#upwd").val(),
		emailId: $("#umailid").val()
	}
	$.ajax({
		url: 'http://localhost:8081/register/newUser',
		data: data,
		method: 'POST',
		dataType: 'JSON',
		success: (response) => { // Handling success
			if (response.status == 'Error') {
				$(".errMsg").text(response.msg);
			} else { // success
				$(".succssMsg").text(response.msg);
				$("#gotoLogin").show();
			}
		}, 
		error: (err) => {
			console.log("ERROR")
			console.log(err);
		}
	});
}

var valueChange = (event) => {
	console.log(event.target.checked)
	if (event.target.checked) {
		$("#upwd").attr('type', 'text');
	} else {
		$("#upwd").attr('type', 'password');
	}
}