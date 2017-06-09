
		var lift_floor1 = {
			floors:[1],
		}
		var lift_floor2 = {
			floors:[1]
		}
		var lift_floor3 = {
			floors:[1]
		}
		// var lift_floor4 = {
		// 	floors:[1]
		// }
		
		/**
		 * [lift_controller description]
		 * @param  {[type]} floor     [description]
		 * @param  {[type]} direction [description]
		 * @return {[type]}           [description]
		 * 思路：每个电梯都有一个数组，该数组记录每部电梯到过的楼层数，
		 */
		function lift_controller(floor,direction){
			const floor_total = 15;
			const floor_height = 308;
			var move_distance;
			floor = floor / 1;
			var floor_distance = (floor_total - floor) * 22;
			var box1 = $('.lift-box1').position().top;
			var box2 = $('.lift-box2').position().top;
			var box3 = $('.lift-box3').position().top;
			// var box4 = $('.lift-box4').position().top;
			var box1_move = Math.abs(box1 - floor_distance);
			var box2_move = Math.abs(box2 - floor_distance);
			var box3_move = Math.abs(box3 - floor_distance);
			// var box4_move = Math.abs(box4 - floor_distance);
			if(box1_move <= box2_move && box1_move <= box3_move){

				lift_floor1.floors.push(floor);
				move_distance = (lift_floor1.floors[lift_floor1.floors.length-1] - lift_floor1.floors[lift_floor1.floors.length-2]) * 22;
				goto(floor, direction, move_distance, 'lift-box1');
				
			}else if(box2_move <= box1_move && box2_move <= box3_move){
				lift_floor2.floors.push(floor);
				move_distance = (lift_floor2.floors[lift_floor2.floors.length-1] - lift_floor2.floors[lift_floor2.floors.length-2]) * 22;
				goto(floor, direction, move_distance, 'lift-box2');
			}else if(box3_move <= box1_move && box3_move <= box2_move){
				lift_floor3.floors.push(floor);
				move_distance = (lift_floor3.floors[lift_floor3.floors.length-1] - lift_floor3.floors[lift_floor3.floors.length-2]) * 22;
				goto(floor, direction, move_distance, 'lift-box3');
			}

		}

		function goto(floor,direction,move_distance, nth_box){
			if(direction == 'up'){
				$('.' + nth_box).animate({
					'top': '-=' + move_distance + 'px'
				},Math.abs(move_distance/22) * 1000);
				
			}else{
				$('.' + nth_box).animate({
					'top': '-=' + move_distance + 'px'
				},Math.abs(move_distance/22) * 1000);
			}
		}
		
	

	
	