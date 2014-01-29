function simulate(element, eventName)
{
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}

// Sleep
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// Routine
function routine(){
    console.log('routine');
    a = h.getElementsByTagName('a')[0];
    simulate(a, 'mouseover');
    setTimeout(function(){
        console.log('Follow');

        card = document.getElementsByClassName('goog-hovercard')[0];
        console.log(card.getElementsByClassName('name')[0].innerText);

        btn = card.getElementsByTagName('button')[0]
        simulate(btn, 'click');
        setTimeout(function(){
            console.log('click off');
            btn = card.getElementsByTagName('button')[0]
            //simulate(btn, 'click');
        }, 100);
    }, 1000);
}

function getRoutineFunction(h, i, n){
    return function(){
        console.log('routine');
        console.log(i); console.log(n);
        a = h.getElementsByTagName('a')[0];
        simulate(a, 'mouseover');
        setTimeout(function(){
            console.log('Follow');
            card = document.getElementsByClassName('goog-hovercard')[0];
            console.log(card.getElementsByClassName('name')[0].innerText);

            btn = card.getElementsByTagName('button')[0]
            simulate(btn, 'click');
            setTimeout(function(){
                console.log('Unfollow');
                btn = card.getElementsByTagName('button')[0]
                simulate(btn, 'click');
            }, 100);
        }, 1000);       
    }
}

for ( var i = 0; i < hs.length; i ++ )
{
    h = hs[i];
    setTimeout(getRoutineFunction(h,i,hs.length), i * 2000);
}


//hs = document.getElementsByClassName('zm-item-answer-author-wrap');
hs = document.getElementsByClassName('zm-item-meta');
var h;

