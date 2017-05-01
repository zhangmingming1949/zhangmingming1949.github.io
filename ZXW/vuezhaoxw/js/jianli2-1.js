define(function(require,exports,module){
	require
	var p = {
		
		_init:function(){
			p.bbb();
			p._fliter();
			if(!p.getitem()){
				p.render();
			}else{
				var cfg = p.getitem();
				p.aaa(cfg);
			}		
		},
		render:function(){
            $.ajax({
                url:'/html/data/data.json',
                dataType:"JSON",
                type:"get"
            }).done(function(cfg){
            	console.log(cfg.language)
                p.aaa(cfg);
            })
        },
        //设置缓存
        setitem:function(hccfg){
        	var str = JSON.stringify(hccfg);
        	localStorage.setItem('huancun',encodeURIComponent(str));
        },
        //取得缓存数据
        getitem:function(){
        	var b = localStorage.getItem('huancun');//获取缓存数据
        	return $.parseJSON(decodeURIComponent(b));//转为可用数据
        },
        bbb:function(){
        	if(!$('.but1')){
        		$('input').focus(function(){
				this.value='';
				this.style.color='#333';
				})
				$('input').blur(function(){
					this.style.color='#999';
				})	
        	}	
		},
		_fliter:function(){
			Vue.filter('typeSelect',function(value,def){
		        if(value=="" || !value){
		            return def;
		        }else {
		            return value;
		        }
		    });
		    Vue.filter('typeChecked',function(value,def){
		        if($("#out").prop("checked")){
		            return value;
		        }else {
		            return def;
		        }
		    });
		    var sell_type = {
		        '0':'店面销售',
		        '1':'渠道销售',
		        '2':'电话销售',
		        '3':'网络销售',
		        '4':'面访销售',
		        '5':'大客户销售'  
			};
		    Vue.filter('sell_type',function(index){
		        var str = '';
		        $.each(index,function(key,val){
		            str+='<b>'+sell_type[val]+'</b>';
		        });
		        return str;
		    });
		},
		aaa:function(cfg){
		    function reC(obj,type,bT1,bT2,bT3){ 
		    	obj[type].isA = bT3;
		        obj[type].isB = bT1; 
		        obj[type].isC = bT2; 
		    };
		    var vm = new Vue({
		        el:'#all',
		        data:{
		            resume:cfg,	
		            v1:{
		            	isA:false,
		            	isB:false,
		            	isC:true,
		            	isD:true
		            },	
		            v2:{
		            	isA:false,
		            	isB:false,
		            	isC:true,
		            	isD:true
		            },
		            v3:{
		            	isA:true,
		            	isB:false,
		            	isC:false,
		            	isD:false
		            },
		            v4:{
		            	isA:true,
		            	isB:false,
		            	isC:false,
		            	isD:false
		            },
		            v5:{
		            	isA:true,
		            	isB:false,
		            	isC:false,
		            	isD:false
		            },
		            v6:{
		            	isA:true,
		            	isB:false,
		            	isC:false,
		            	isD:false
		            },
		            v7:{
		            	isA:true,
		            	isB:false,
		            	isC:false,
		            	isD:false
		            },
		            v8:{
		            	isA:true,
		            	isB:false,
		            	isC:false,
		            	isD:false
		            },
				  	wk:{}, 
				  	edu:{},
				  	train:{},
				  	zhsh:{},
				  	wy:{}
				},
		        methods:{
		        	pubedit:function(type){
		        		reC(this,type,true,false,false);
		        		this[type].isD=false;
		        	},				            
		            pubbc:function(type){
		            	reC(this,type,false,true,false);
		            	this[type].isD=true;
		            },
		            pubadd:function(type){
		            	reC(this,type,true,false,false);
		            	this[type].isD=false;
		            },
		            add:function(num,type,itemName){			    
		            	this.Oindex = num;
		            	this[itemName] = {};//一定要写成中括号的形式
		            	reC(this,type,true,false,false);
		            	this[type].isD=false;
		            },
		            save:function(item,type,arrName){ 	
		            	// var arr = this.resume.work_history;:把arr定义成参数后写在HTML中也就不需要this了
		            	if(this.Oindex<0){
		            		arrName.push(item);
		            	}else{
		            		arrName[this.Oindex] = item;           	
		            	}
		            	this[type].isD=true;
		            	reC(this,type,false,true,false);
		            	p.setitem(this.resume);//保存时,缓存全部数据
		            },
		            edit:function(itemName,item,index,type){
		            	var items = JSON.stringify(item);
                        $('#all').data('item',items);
                        seajs.use('cookie.js',function(cookie){
                            cookie('item', items);
                        })
		            	this[itemName] = item;
		            	this.Oindex = index;
		            	reC(this,type,true,false,false);
		            	this[type].isD=false;
		            },				           
		            del:function(arrName,index){
		            	arrName.splice(index,1);			            	
		            },
		            cancel:function(type,arrName){
		            	if(this.Oindex==-1){
		            		reC(this,type,false,false,true);
		            	}else if(this.Oindex==-100){
		            		reC(this,type,false,true,false);
		            	}else{
		            		seajs.use('cookie.js',function(cookie){
                                console.log(cookie('item'));//为可用对象
                            })
                            var tpl = $.parseJSON($('#all').data('item'));
                            arrName.splice(this.Oindex,1,tpl);
                            reC(this,type,false,true,false);
		            	}
		            },
		                  //正则，不能用
		       //      panduan:function(reg){
		       //      	var reg1 = /^[\u4e00-\u9fa5]+$/;
		       //      	alert(1);
		       //      	console.log(reg);
		       //      	console.log(panduan);
					    // $(this).blur(function(){
					    //     var val = $(this).val()
					    //     if(reg2.test(val)){
					    //         $(this).removeClass('error');
					    //     }else {
					    //         $(this).addClass('error');
					    //     }
					    // })
		       //      },  
				},
				ready:function(){
					console.log(this.resume.language)
				}
		    })
		}
	}







	module.exports = {
		init:p._init
	}




})