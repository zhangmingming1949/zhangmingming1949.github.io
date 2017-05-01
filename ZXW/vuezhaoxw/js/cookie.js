define(function(require, exports, module) {
	var cookie = function(name, value, options) {
		if (typeof value != 'undefined') {
			//set cookie
			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				// for IE
				expires = '; expires=' + date.toUTCString();
			}
			var path = options.path ? '; path=' + options.path : '';
			var domain = options.domain ? '; domain=' + options.domain : '';
			var secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		} else {
			//get cookie
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				var rdecode = /(%[0-9A-Z]{2})+/g;
				for (var i = 0; i < cookies.length; i++) {
					// 去掉字符串起始和结尾的空格。$.trim("  hello, how are you?  ");
					var cookie = $.trim(cookies[i]).split('=');
					var cookieName = cookie[0].replace(rdecode, decodeURIComponent);
					var cookieVal = cookie.slice(1).join('=');
					if (cookieName == name && cookie.length > 1) {
						try {
							cookieValue = decodeURIComponent(cookieVal);
						} catch (e) {
							cookieValue = cookieVal;
						}
						break;
					}
				}
			}
			return cookieValue;
		}
	};
	return cookie;
});