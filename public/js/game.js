// JQUERY CHECKER:
/*
window.onload = function()
{
	if (window.jQuery)
		{
			alert('jQuery is loaded');
	}
	else
		{
			alert('jQuery is not loaded');
	}
}
*/
$(function () {
	// Starts background song when page is launched
	$('audio#soundBackground')[0].play();
		
	// JQUERY VARIABLES - 
	// DOM objects:
	let board = $('#board');
	let bar = $('.bar');
	let playerOneBar = $('#player-one-bar');
	let playerTwoBar = $('#player-two-bar');
	let ball = $('#ball');
	let restartBtn = $('#restartBtn');
	let score = {
		playerOne:"",
		playerTwo:""
	}
		
	// Stocking dimensions into variables
	let board_height = parseInt(board.height());
	let board_width = parseInt(board.width());
	let bar_width = parseInt(bar.width());
	let ball_height= parseInt(ball.height());
	let ball_width = parseInt(ball.width());

	// Stocking the center position of the bars and ball
	let bar_center;
	let ball_center;

	// Stocking the Score variables
	// When game is over, the boolean turns on 'true'
	let game_over = false;
	let winner = $('#winner');
	let who_won;

	// Setting initial movements of the ball: vertical and diagonal
	let ball_go = 'down';
	let ball_right_left ='right';
	// depends on ball's movements
	let top = 6;
	let right_left_angle = 0;

	// Initialize movements on false
	// P1
	let move_right_p1 = false;
	let move_left_p1 = false;
	// P2
	let move_right_p2 = false;
	let move_left_p2 = false;

	// COLLISION FUNCTION:
	// Here we manage how will the ball behave when hitting obstacles.
	/* 
	Tips:
	- .offset() method allows to retrieve the current position of an element: returns an object containing the properties top and left
	- .outerHeight() returns the height of the element, including top and bottom padding, border, and optionally margin, in pixels
	- .outerWidth() returns the width of the element, including left and right padding, border, and optionally margin, in pixels
	*/
	function collision($div1, $div2) {
		
		let x1 = $div1.offset().left;
		let y1 = $div1.offset().top;
		let h1 = $div1.outerHeight(true);
		let w1 = $div1.outerWidth(true);
		let b1 = y1 + h1;
		let r1 = x1 + w1;
		let x2 = $div2.offset().left;
		let y2 = $div2.offset().top;
		let h2 = $div2.outerHeight(true);
		let w2 = $div2.outerWidth(true);
		let b2 = y2 + h2;
		let r2 = x2 + w2;
		

		if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
		return true;
	}

	// PLAYERS FUNCTIONS:
	// Here we manage players controls by linking movement functions to keyboard keys
	/*
	Tips:
	- requestAnimationFrame is an altenrative to setInterval() - smoother and battery friendly
	*/
	// What is happening when a key is pressed:
	$(document).on('keydown',  function (e) {
		let key = e.keyCode;
		if (key === 37 && move_left_p1 === false) {
			move_left_p1 = requestAnimationFrame(left_p1);
		} else if (key === 39 && move_right_p1 === false) {
			move_right_p1 = requestAnimationFrame(right_p1)
		} else if (key === 81 && move_left_p2 === false) {
			move_left_p2 = requestAnimationFrame(left_p2)
		} else if (key === 68 && move_right_p2 === false) {
			move_right_p2 = requestAnimationFrame(right_p2)
		}
	});
	// What is happening when key is realesed:
	$(document).on('keyup',  function (e) {
		let key = e.keyCode;
		if (key === 37) {
			cancelAnimationFrame(move_left_p1);
			move_left_p1 = false;
		} else if (key === 39 ) {
			cancelAnimationFrame(move_right_p1);
			move_right_p1 = false;
		} else if (key === 81 ) {
			cancelAnimationFrame(move_left_p2);
			move_left_p2 = false;
		} else if (key === 68) {
			cancelAnimationFrame(move_right_p2);
			move_right_p2 = false;
		}
	});

	// BARS MOVEMENTS CONDITIONS:
	// Here whe declare conditions to see if players bars can be moved or not.
	/*
	If there is still place on the left from the bar to the left board side,
	Move the playerOneBar to the left
	*/
	function left_p1() {
		if (parseInt(playerOneBar.css('left')) > 0) {
			playerOneBar.css('left', parseInt(playerOneBar.css('left')) - 15);
			move_left_p1 = requestAnimationFrame(left_p1);
		}
	}
	/*
	If there is still place on the right from the bar to the right board side,
	Move the playerOneBar to the right
	*/
	function right_p1() {
		if (parseInt(playerOneBar.css('left')) < (board_width - bar_width)) {
			playerOneBar.css('left', parseInt(playerOneBar.css('left')) + 15);
			move_right_p1 = requestAnimationFrame(right_p1);
		}
	}
	/*
	If there is still place on the left from the bar to the left board side,
	Move the playerTwoBar to the left
	*/
	function left_p2() {
		if (parseInt(playerTwoBar.css('left')) > 0) {
			playerTwoBar.css('left', parseInt(playerTwoBar.css('left')) - 15);
			move_left_p2 = requestAnimationFrame(left_p2);
		}
	}
	/*
	If there is still place on the right from the bar to the right board side,
	Move the playerTwoBar to the right
	*/
	function right_p2() {
		if (parseInt(playerTwoBar.css('left')) < (board_width - bar_width)) {
			playerTwoBar.css('left', parseInt(playerTwoBar.css('left')) + 15);
			move_right_p2 = requestAnimationFrame(right_p2);
		}
	}

	// BALL ANIMATION FUNCTION:
	let anim_id;
	anim_id = requestAnimationFrame(repeat);

	function repeat() {

		if (game_over === false) {

			if (collision(ball, playerOneBar)){
				$('audio#soundHitP1')[0].play();
				ball_center = parseInt(ball.css('left')) + ball_width / 2;
				bar_center = parseInt(playerOneBar.css('left')) + bar_width / 2;
				ball_right_left = (ball_center > bar_center ? ' right' : 'left');
				right_left_angle = parseInt(Math.abs(bar_center - ball_center) / 6);
				ball_go = 'up';

			} else if (collision(ball, playerTwoBar)) {
				$('audio#soundHitP2')[0].play();
				ball_center = parseInt(ball.css('left')) + ball_width / 2;
				bar_center = parseInt(playerTwoBar.css('left')) + bar_width / 2;
				ball_right_left = (ball_center > bar_center ? ' right' : 'left');
				right_left_angle = parseInt(Math.abs(bar_center - ball_center) / 6);
				ball_go = 'down';

			} else if (parseInt(ball.css('left')) <=  0) {
				ball_right_left = 'right';

			} else if (parseInt(ball.css('left')) >= board_width - ball_width) {
				ball_right_left = 'left';

			} else if (parseInt(ball.css('top')) <= 0){
				who_won = 'Player One';
				stop_the_game();
				

			} else if (parseInt(ball.css('top')) >= board_height - ball_height){
				who_won= 'Player Two';
				stop_the_game();
				
			}

			if (ball_go === 'down'){
			ball_down();
			} else {
				ball_up();
			}
			
			anim_id = requestAnimationFrame(repeat);
		}
		}


	function stop_the_game() {
		game_over = true;
		$('audio#soundLoose')[0].play();
		cancelAnimationFrame(anim_id);
		winner.text('who_won' + ' won the game');
		score.slideDown();
	}

	restartBtn.click(function(){
		location.reload();
	})

	function ball_up() {
		ball.css('top', parseInt(ball.css('top')) - top );
		if (ball_right_left === 'left') {
			ball.css('left', parseInt(ball.css('left')) - (right_left_angle));
		} else {
			ball.css('left', parseInt(ball.css('left')) + (right_left_angle));
		}
	}

	function ball_down() {
		ball.css('top', parseInt(ball.css('top')) + top);
		if (ball_right_left === 'left') {
			ball.css('left', parseInt(ball.css('left')) - (right_left_angle));
		} else {
			ball.css('left', parseInt(ball.css('left')) + (right_left_angle));
		}
	}

});