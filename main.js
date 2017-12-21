$(document).ready(function() {
  $workTime = $('#work-time');
  $breakTime = $('#break-time');
  $status = $('#status');

  // break length
  $('#minus').click(function() {
    if ($breakTime.text() > 1) {
      $breakTime.text($breakTime.text() - 1);
    }
  });
  
  $('#plus').click(function() {
    $breakTime.text(+$breakTime.text() + 1);
  });

  // work length 
  $('#minus2').click(function() {
    if ($workTime.text() > 1) {
      $workTime.text($workTime.text() - 1);
      SessionAndSessionLength();
    }
  });
  $('#plus2').click(function() {
    $workTime.text(+$workTime.text() + 1);
    SessionAndSessionLength();
  });

  //session value in circle
  document.getElementById('progress').innerHTML = $workTime[0].innerHTML;

  function SessionAndSessionLength() {
    document.getElementById('progress').innerHTML = $workTime[0].innerHTML;
  }

  //break counter
  function breakCounter(breakTime) {
    while (breakTime > 0) {
      breakTime -= 1;
    }
  }

  //start button
  $('#start').on('click', function() {
    var counter = document.getElementById('progress').innerHTML;
    var counter = counter * 60;
    var max_count = counter;
    interval = setInterval(function() {
      counter -= 1;
      if(counter >= 0){
				//console.log(counter);
    			$('#load-bar').css({background: "linear-gradient(to top, #90EE90 "+((counter*100)/(max_count))+"%,transparent "+(counter*100/max_count)+"%,transparent 100%)"});
   			}
      
      document.getElementById('progress').innerHTML = counter;
      if (counter === 0) {
        $('#buzzer')[0].play();
        clearInterval(interval);
        var startBreak = setInterval(breakTimer, 1000);
      }

      if (counter % 60 >= 10) {
        document.getElementById('progress').innerHTML = Math.floor(counter / 60) + ":" + counter % 60;
      } else {
        document.getElementById('progress').innerHTML = Math.floor(counter / 60) + ":" + "0" + counter % 60;
      }

      breakTime = $('#break-time').text();
      var breakTime = breakTime * 60;
      var max_breakTime = breakTime;

      function breakTimer() {
        breakTime -= 1;
        
        if(breakTime >= 0){
    			$('#load-bar').css({background: "linear-gradient(to top, #FF4500 "+breakTime*100/max_breakTime+"%,transparent "+(breakTime*100/max_breakTime)+"%,transparent 100%)"});
   				}
        
        document.getElementById('status').innerHTML = "Break";
        document.getElementById('progress').innerHTML = breakTime;
        if (breakTime === 0) {
          clearInterval(startBreak);
          buzzer.play();

        }

        if (breakTime % 60 >= 10) {
          document.getElementById('progress').innerHTML = Math.floor(breakTime / 60) + ":" + breakTime % 60;
        } else {
          document.getElementById('progress').innerHTML = Math.floor(breakTime / 60) + ":" + "0" + breakTime % 60;
        }
      }

    }, 1000);
  })

  //   reset button
  $('#reset').on('click', function() {
    document.getElementById('progress').innerHTML = 25;
    document.getElementById('work-time').innerHTML = 25;
    document.getElementById('break-time').innerHTML = 5;
    document.getElementById('status').innerHTML = "Session";

  });

});
