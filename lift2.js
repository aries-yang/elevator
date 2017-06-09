'use strict';

//初始化
function init(){
	createLiftController(10);
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
	buildLift: function(){
		console.log('建造电梯');
	},
	goto: function(floornum,controller){
		//绑定this对象
		var $this = this;
		//为按钮添加状态
		
		//将要去的楼层保存到list数组中
		this.list.floors.push(floornum);
		//获取当前电梯的位置
		var currpos = $('.active').data('floor');
		
		//获取所有电梯数量
		var allbox = $('.box');
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
        if(currpos == floornum){
        	$('#'+controller.id+'.'+controller.classList[0]).removeClass('arrow-active');
        }
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
	$('#'+controller.id+'.'+controller.className).addClass('arrow-active')
	firstlist.goto(controller.id, controller)	
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
});

init();
// for(let i = 0; i < 4; i++){
// 	new Lift(i);	
// }
var firstlist = new Lift(1);	

