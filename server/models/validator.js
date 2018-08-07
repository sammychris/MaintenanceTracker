
export default  {
	error : false,
	message : '',

	type(data,type){
		type = type.toLowerCase();
		if(typeof data == type){
			error = true;
			this.message = `${data} Invalid value type. `;
		}
	},

	len(data, leng){
		if (data.length >= leng){
			this.error = true;
			this.message += `length should not be less than ${leng}`;
		}
	},

	isMail(data){
		if(/^[a-z\d]+@{1}[a-z\d]+.com$/.test(data)){
			this.error = true;
			this.message += `email not in the right Format`;
		}
}
