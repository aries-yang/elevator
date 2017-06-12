'use strict';

//初始化
function init(){
	createLiftController(10);
	// var lift = new Lift(1).buildLift(10, 1);
}
//电梯构造函数
function Lift(num){
	this.num = num;
	console.log('我是' + num + '号电梯');
}
//电梯原型方法
Lift.prototype = {
    constructor: Lift,
    list: {
    	floors:[]
    },
    currpos: $('.active').data('floor'),
	buildLift: function(floornum, num){
		var wrap = $('.lift');
		//判断是否将已生成的电梯置空，否则电梯会多出很多
		$('.lift-box').length >= num ?	wrap.html('') : '';
		//生成电梯样式
		wrap.prepend('<div class="lift-box box'+num+'" ></div>');
		var list = $('.'+ num +'')
		for(let i = 1; i <= floornum; i++){
			list.prepend(function(){
				if(i == 1){
					return '<div class="box active" class="active" data-floor='+ i +'></div>'
				} else {
					return '<div class="box" data-floor='+ i +'></div>'
				}
			});
		}
	},
	goto: function(floornum,nth_box){
		//绑定this对象
		var $this = this;
		//为按钮添加状态
		
		//将要去的楼层保存到list数组中
		this.list.floors.push(floornum);
		//获取当前电梯的位置
		
		var currpos = $('.'+nth_box+' .active').data('floor');
		
		//获取电梯数量
		var allbox = $('.'+nth_box+' .box');
		var _allbox = [];
		//因为移动方向总是上下相反，将数组内容倒置一下
		for (let i = allbox.length; i > 0; i--){
			var j = Math.abs(i - allbox.length);
			_allbox[i] = allbox[j];
		}
		setTimeout(function show(){
		//电梯运行时去掉电梯的颜色
		allbox.removeClass('active');
		//找到要修改的电梯的颜色
		var currbox=_allbox[currpos];
        $(currbox).addClass('active');
        //去掉控制按钮状态
        currpos == floornum ? $('#'+controller.id+'.'+controller.classList[0]).removeClass('arrow-active') : ''
        
        if(currpos < $this.list.floors[$this.list.floors.length - 1]){
        	currpos++;
        }else if(currpos > $this.list.floors[$this.list.floors.length - 1]){
        	currpos--;
        }
        
        setTimeout(show,300);
		},300)
		return true
	}
	
}
//电梯控制中心
function lift_controller(controller){
	//添加控制按钮状态
	$('#'+controller.id+'.'+controller.className).addClass('arrow-active');

	// console.log(lift1.currpos);
	// console.log(lift1);
	new Lift(1).goto(controller.id, 'box2')	
}
//生成电梯控制单元样式
function createLiftController(floornum){
	var list = $('.lift-controller-wrap');
	list.html('');
	for(let i = 1; i <= floornum; i++){
		list.prepend(function(){
			if(i == floornum){
				return '<div class="lift-controller">'
				+'<span class="num"> ' + i + ' </span>'
				+'<span class="down" id='+ i +' onclick="lift_controller(this)"></span>'
				+'</div>'
			}else if(i == 1){
				return '<div class="lift-controller">'
				+'<span class="num"> ' + i + ' </span>'
				+'<span class="up" id='+ i +' onclick="lift_controller(this)"></span>'
				+'</div>'
			}else{
				return '<div class="lift-controller">'
				+'<span class="num"> ' + i + ' </span>'
				+'<span class="up" id='+ i +' onclick="lift_controller(this)"></span>'
				+'<span class="down" id='+ i +' onclick="lift_controller(this)"></span>'
				+'</div>'
			}
		});
	}
}
//确认按钮
$('.confirm').on('click' ,function(){
	//TODO不能为小数和0
	let floornum = $('.floornum').val();
	let liftnum = $('.liftnum').val();
	createLiftController(floornum);
	//根据用户要求生成n部电梯
	for (let i = 1; i <= liftnum; i++){
		// lift = 'lift' + i;
		new Lift(i).buildLift(floornum, i);
	}
});

init();
// var lift1 = new Lift(1)
// lift1.buildLift(10,1)

