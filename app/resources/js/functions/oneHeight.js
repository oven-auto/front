window.oneHeight = function(class_name) {
    var objs = document.querySelectorAll(class_name)
    var height = 0
    objs.forEach((item) => {
        if(height < item.clientHeight)
            height = item.clientHeight
    })
    objs.forEach((item) => {
        item.style.height = height + 'px'
    })
}
