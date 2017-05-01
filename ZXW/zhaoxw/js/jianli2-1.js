define(function(require,exports,module){

	var rawData = {

		"work_history": [
	                // {
	                //     company:'智联招聘',
	                //     position:'销售',
	                //     start_year:'',
	                //     end_year:'',
	                //     sales_type:'',
	                //     reportto:'',
	                //     subordinate:'',
	                //     desc:'',
	                //     sales_year:'',
	                //     finish_rate:'',
	                //     productions:'',
	                //     sell_target:'',
	                //     sell_mode:'',
	                // }
	            ],
		"edu_history": [
	                // {
	                //     school:'北京交通大学',
	                //     major:'计算机科学与技术',
	                //     level:'学历',
	                //     start_year:'开始时间',
	                //     end_year:'线束时间：'
	                // },
	                // {
	                //     school:'学校名称：',
	                //     major:'专业名称：',
	                //     level:'学历',
	                //     start_year:'开始时间',
	                //     end_year:'线束时间：'
	                // }
	            ],
		"certificate":[
	             //    {
		            //     rog:'新航路',
		            //     name:'web前端',
		            //     start_year:'开始时间',
		            //     end_year:'线束时间：'
		            // },
		            // {
		            //     rog:'阿里巴巴',
		            //     name:'云计算',
		            //     start_year:'开始时间',
		            //     end_year:'线束时间：'
		            // }
	            ],
		"language": [
	                // {
	                //     category:'英语',
	                //     listen: '听力',
	                //     speak: '口语',
	                //     read: '阅读',
	                //     write: '写作'
	                // },
	                // {
	                //     category:'西班牙',
	                //     listen: '听力',
	                //     speak: '口语',
	                //     read: '阅读',
	                //     write: '写作'
	                // }
	            ]
	}

	var p = {
			_init:function(){
				p.bind5();
				p.bind6();
				p.bind7();
				p.bind8();
			},
			pub:function(chunk,a,b,c){
				chunk.find(a).show();
				chunk.find(b).hide();
				chunk.find(c).hide();
			},
			zhengshu:function(id1,id2){
				var source = $(id1).html();
	            var tp = Handlebars.compile(source);
	            var str = tp(rawData);
	        	$(id2).html(str);
			},
			add5:function(chunk,index){
				var wk = {
                company:chunk.find('.o').val(),
                position:chunk.find('.t').val(),
                start_year:'开始时间',
                end_year:'线束时间：'
	            }
	            if(chunk.hasClass('yibianji')){
	            	var index1 = chunk.data('index');
	            	rawData.work_history[index1] = wk;
	            }else{
	            	rawData.work_history.push(wk);
	            }
				p.zhengshu('#newli5','#ul5');//注意：这个样子肯定不是通用
				chunk.find('.o').val("");
				chunk.find('.t').val("");
			},
			add6:function(chunk,index){
				var edu = {
                school:chunk.find('.o').val(),
                major:chunk.find('.t').val(),
                start_year:'开始时间',
                end_year:'线束时间：'
	            }
	            if(chunk.hasClass('yibianji')){
	            	var index1 = chunk.data('index');
	            	rawData.edu_history[index1] = edu;
	            }else{
	            	rawData.edu_history.push(edu);
	            }
				p.zhengshu('#newli6','#ul6');//注意：这个样子肯定不是通用
				chunk.find('.o').val("");
				chunk.find('.t').val("");
			},
			add7:function(chunk,index){
				var zhsh = {
                rog:chunk.find('.o').val(),
                name:chunk.find('.t').val(),
                start_year:'开始时间',
                end_year:'线束时间：'
	            }
	            if(chunk.hasClass('yibianji')){
	            	var index1 = chunk.data('index');
	            	rawData.certificate[index1] = zhsh;
	            }else{
	            	rawData.certificate.push(zhsh);
	            }
				p.zhengshu('#newli7','#ul7');//注意：这个样子肯定不是通用
				chunk.find('.o').val("");
				chunk.find('.t').val("");
			},
			add8:function(chunk,index){
				var yuyan = {
                category:chunk.find('.o').val(),
                start_year:'开始时间',
                end_year:'线束时间：'
	            }
	            if(chunk.hasClass('yibianji')){

	            	var index1 = chunk.data('index');
	            	//rawData.language.splice(index1,1,yuyan);
	            	rawData.language[index1] = yuyan;
	            }else{
	            	rawData.language.push(yuyan);
	            }
				p.zhengshu('#newli8','#ul8');//注意：这个样子肯定不是通用
				chunk.find('.o').val("");
			},
			back5:function(chunk,index){
				var wk = rawData.work_history[index];
				chunk.find('.o').val(wk.company);
				chunk.find('.t').val(wk.position); 
			},
			back6:function(chunk,index){
				var edu = rawData.edu_history[index];
				chunk.find('.o').val(edu.school);
				chunk.find('.t').val(edu.major); 
			},
			back7:function(chunk,index){
				var zhsh = rawData.certificate[index];//certificate下有好多组数据!!!
				chunk.find('.o').val(zhsh.rog);//往回赋值
				chunk.find('.t').val(zhsh.name);//往回赋值
			},
			back8:function(chunk,index){
				var yuyan = rawData.language[index];
				chunk.find('.o').val(yuyan.category);
			},
			del:function(chunk,index,a){
				a.splice(index,1);
				if(a.length<1){
					p.pub(chunk,".one2",".five2",".five-nr");
	            }
			},
			bind5:function(){
				$("#all-5").on("click",".ashzi",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five-nr",".one2",".five2");
				}).on("click",".baocun",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five2",".five-nr",".one2");
					chunk.find(".pub-bt b").addClass("pb");
					p.add5(chunk);                       
				}).on("click",".pb",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five-nr",".five2",".one2");
					chunk.find(".pub-bt b").removeClass("pb");
					p.zhengshu('#newli5','#ul5');                                 
					chunk.removeClass("yibianji");
	
				}).on("click",".bianji",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five-nr",".five2",".one2");
					chunk.find(".pub-bt b").removeClass("pb");
					var index = $(this).parents(".everyli").attr("index");
					chunk.data("index",index);   
					p.back5(chunk,index); 
					chunk.addClass("yibianji");                                       
			  	}).on("click",".shanchu",function(){
					var chunk = $(this).parents(".five");
			    	var index = $(this).parents('.everyli').attr('index');
					p.del(chunk,index,rawData.work_history); 
					p.zhengshu('#newli5','#ul5');//可以             
				})	
			},
			bind6:function(){
				$("#all-6").on("click",".ashzi",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five-nr",".one2",".five2");
				}).on("click",".baocun",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five2",".five-nr",".one2");
					chunk.find(".pub-bt b").addClass("pb");
					p.add6(chunk);                       
				}).on("click",".pb",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five-nr",".five2",".one2");
					chunk.find(".pub-bt b").removeClass("pb");
					p.zhengshu('#newli6','#ul6');//可以                                 
					chunk.removeClass("yibianji");
				}).on("click",".bianji",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five-nr",".five2",".one2");
					chunk.find(".pub-bt b").removeClass("pb");
					var index = $(this).parents(".everyli").attr("index");
					chunk.data("index",index);
					p.back6(chunk,index);
					chunk.addClass("yibianji");                                         
			  	}).on("click",".shanchu",function(){
					var chunk = $(this).parents(".five");
			    	var index = $(this).parents('.everyli').attr('index');
					p.del(chunk,index,rawData.edu_history); 
					p.zhengshu('#newli6','#ul6');             
				})
			},
			bind7:function(){
				$("#all-7").on("click",".ashzi",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five-nr",".one2",".five2");
				}).on("click",".baocun",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five2",".five-nr",".one2");
					chunk.find(".pub-bt b").addClass("pb");
					p.add7(chunk);
				}).on("click",".pb",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five-nr",".five2",".one2");
					chunk.find(".pub-bt b").removeClass("pb");
					p.zhengshu('#newli7','#ul7');
					chunk.removeClass("yibianji");
				}).on("click",".bianji",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five-nr",".five2",".one2");
					chunk.find(".pub-bt b").removeClass("pb");
					var index = $(this).parents(".everyli").attr("index");
					chunk.data("index",index);
					p.back7(chunk,index);
					chunk.addClass("yibianji");
			  	}).on("click",".shanchu",function(){
					var chunk = $(this).parents(".five");
			    	var index = $(this).parents('.everyli').attr('index');
					p.del(chunk,index,rawData.certificate); 
					p.zhengshu('#newli7','#ul7');
				})	
			},
			bind8:function(){
				$("#all-8").on("click",".ashzi",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five-nr",".one2",".five2");
				}).on("click",".baocun",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five2",".five-nr",".one2");
					chunk.find(".pub-bt b").addClass("pb");
					p.add8(chunk);                      
				}).on("click",".pb",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five-nr",".five2",".one2");
					chunk.find(".pub-bt b").removeClass("pb");
					p.zhengshu('#newli8','#ul8');//可以                                 
					chunk.removeClass("yibianji");
				}).on("click",".bianji",function(){
					var chunk = $(this).parents(".five");
					p.pub(chunk,".five-nr",".five2",".one2");
					chunk.find(".pub-bt b").removeClass("pb");
					var index = $(this).parents(".everyli").attr("index");
					chunk.data("index",index);
					p.back8(chunk,index); 
					chunk.addClass("yibianji");                                        
			  	}).on("click",".shanchu",function(){
					var chunk = $(this).parents(".five");
			    	var index = $(this).parents('.everyli').attr('index');
					p.del(chunk,index,rawData.language); 
					p.zhengshu('#newli8','#ul8');
				})
			}
	}

	//对外接口
	module.exports = {
		init:p._init
	}

























})