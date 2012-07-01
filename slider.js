function initslider(wrapper, container, next, prev) {

	var size = items.size(),
		perPage = 4,
		NPages = Math.ceil(size/(perPage + 0.001)),
		cur = 0,
		slideWidth = 225,
		animationSpeed = 1000,
		duration = 5000;

	var items = container.find('li');
	var standby = false;
	var timer;

	function moveToslide(t)
	{
		container.animate({
			left: -t*slideWidth
		});
		cur = t;
	}

	function next() {
		if (cur >= size - perPage)
			return;
		moveToslide(cur+1);
	}

	function prev() {
		if (cur <= 0)
			return;
		moveToslide(cur-1);
	}

	function first() {
		if (cur <= 0)
			return;
		moveToslide(0);
	}

	function slide(){
		standby = false;
		window.clearInterval(timer);
		timer = setInterval(slide, duration);
		if (cur >= size - perPage)
			first();
		else
			next();
	}

	next.click(function () {
		standby = true;
		next()
		autoslider(true);
	});

	prev.click(function () {
		standby = true;
		prev()
		autoslider(true);
	});

	function autoslider(t, m)
	{
		if (typeof(m) === "undefined" || standby) m = 1;
		if (t)
		{
			window.clearInterval(timer);
			timer = setInterval(slide, duration * m);
		}
		else
		{
			window.clearInterval(timer);
		}
	}

	wrapper.hover(function() {
		autoslider(false);
	}, function() {
		autoslider(true, 0.1);
	});
	autoslider(true);
}

var wrapper = $('#sliderWrap'),
	container = $('ul#slidesCont'),
	next = $('#next'),
	prev = $('#prev');

initslider(container, next, prev);

