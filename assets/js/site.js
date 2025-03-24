$(document).ready(function() {

  // Storing completed cards
  function markCompleted() {
    $('#cards li.card').each(function(index, element) {
      const isChecked = localStorage.getItem('task-' + index);
      if (isChecked === 'true') {
        $(this).find('input[type="checkbox"]').prop('checked', true);
        $(this).addClass('completed');
      }
    });
  }

  function saveTaskState(index, isChecked) {
    localStorage.setItem('task-' + index, isChecked);
  }
  markCompleted();

  // Mark item as completed on checkbox click
  $('#cards').on('change', '.complete-task', function(e) {
    const index = $(this).closest('li').index();
    const isChecked = $(this).is(':checked');
    e.preventDefault();

    if (isChecked) {
      $(this).closest('li.card').addClass('completed');
      var element = $(this).closest('li.card');
      element.removeClass('expose').find('.contents').scrollTop(0);
      $('body').removeClass('expose');
      $('#cards').toggleClass('modal');
      element[0].scrollIntoView({
        block: 'center',
        inline: 'center'
      });
    } else {
      $(this).closest('li').removeClass('completed');
    }
    
    saveTaskState(index, isChecked);
  });

  // Open and close cards
  function openTask(e) {
    var element = $(e).parent();
    if (element.hasClass('expose')) {
      // Close it
      $(element).removeClass('expose');
      $('#cards').removeClass('modal');
      $('body').removeClass('expose');
      element[0].scrollIntoView({
        block: 'center',
        inline: 'center'
      });
      $(element).find('.contents').scrollTop(0);
    } else {
      // Open it
      var offset = element.offset();
      var x = offset.left - window.scrollX;
      var y = offset.top - window.scrollY;
      var width = element.width();
      var height = element.height();
      $(element).css({
        'position': 'fixed',
        'left': x,
        'top': y,
        'width': width,
        'height': height
      });
      $(element).find('.contents').scrollTop(0);
      $(element).find('.contents').fadeTo(0, 0);
      $('#cards').toggleClass('modal');
      $(element).removeAttr('style').toggleClass('expose');
      $(element).find('.contents').stop().delay(300).fadeTo(400, 1);
    }
  }

  // Trigger the card expand/collapse
  $('.expander').click(function(e) {
    openTask(this);
    e.preventDefault();
  });

});

$(document).keydown(function(keyPressed) {
  // Press ESC to close modals
  if (keyPressed.keyCode == 27) {
    var opencard = $('li.expose');
    if (opencard.length) {
      $(opencard).removeClass('expose');
      $('#cards').removeClass('modal');
      $('body').removeClass('expose');
      opencard[0].scrollIntoView({
        block: 'center',
        inline: 'center'
      });
      $(opencard).find('.contents').scrollTop(0);
    }
  }
});