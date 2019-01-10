window.fbAsyncInit = function() {
	FB.init({
	  appId      : '335754380185760',
	  xfbml      : true,
	  version    : 'v2.8'
	});
	FB.AppEvents.logPageView();
	
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			//display user data
			console.log(response);
			//getFbUserData();
		}
	});
};
(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Login to facebook
function fbLogin() {
	FB.login(function (response) {
		if (response.authResponse) {
			// Get and display the user profile data
			actionToSignIn(response.authResponse.accessToken);
		} else {
			document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
		}
	}, {scope: 'email'});
}
// Logout from facebook
function fbLogout() {
	$.ajax ({
		type : "POST",
		url: 'login.php',
		data: {oauth_provider: '_facebook', action: 'logout'},
		dataType : "html",
		success : function(data){
			var html = '<a href="javascript:void(0);" onclick="javascript:fbLogin();">'
			+'<img src="https://songchung.vn/demologinfacebook/facebook-button.jpg" width="160px" />'
			+'</a>';
			document.getElementById('account-box').innerHTML = html;
		}
	});
}
function actionToSignIn(accessToken){
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
    function (response) {
		$.ajax({
			type : "POST",
			url : 'login.php',
			data : {oauth_provider: '_facebook', fbUser: response },
			dataType : 'html',
			success : function(data){
				var html = '<div class="loged_information">'
				+' <a class="picture" href="'+response.link+'"><img src="'+response.picture.data.url+'" width="30px" height="30px" /></a>'
				+' <p class="info"><b>Hello:</b> '+response.first_name+' '+response.last_name+'<br />'
				+' <a href="javascript:void(0);" onclick="fbLogout();">Logout</a></p>'
				+' </div>';
				document.getElementById('account-box').innerHTML = html;
			}			
		});
    });
}
