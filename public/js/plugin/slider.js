// slider conf

var paddingSlider = document.getElementById('slider-padding');

noUiSlider.create(paddingSlider, {
    start: [20, 80],
    padding: [10, 15], // Or just 10
    range: {
        'min': 0,
        'max': 100
    }
});

var paddingMin = document.getElementById('min');
var paddingMax = document.getElementById('max');

paddingSlider.noUiSlider.on('update', function (values, handle) {
    if (handle) {
        paddingMax.value = values[handle];
    } else {
        paddingMin.value = values[handle];
    }
});