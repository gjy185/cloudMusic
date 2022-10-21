//  右边盒子  上边导航栏   right-hd
// let lis = document.querySelectorAll('.right-hd li')
let right_spans = document.querySelectorAll('.right-hd span')
for (let i = 0; i < right_spans.length; i++) {
    right_spans[i].addEventListener('click', function () {
        // console.log(11);
        // 排他思想 点击将原来的active移除 点击的加上
        document.querySelector('.right-hd .active').classList.remove('active')
        this.classList.add('active')
    })
}

// 轮播图
let swiperItems = document.querySelectorAll('.banner .swiperItem')

let right = document.querySelector('.btn-right')
let left = document.querySelector('.btn-left')
let index = 0
let timer
swiperPlay()
// 定义轮播的方法
function swiperPlay() {
    timer = setInterval(function () {
        // right.click()
        index++
        if(index === swiperItems.length) {
            index = 0
        }
        changeAll()
    }, 5000)
}
// 修改图片和小圆点
function changeAll () {
    changeImg() 
    changePoints()
}
// 改图片
function changeImg() {
    // 遍历所有图片让他们全部显示为def
    for (let i = 0; i < swiperItems.length; i++) {
        swiperItems[i].className = 'swiperItem def'
    }
    if (index === 0) {
        swiperItems[index].className = 'swiperItem b'
        swiperItems[swiperItems.length - 1].className = 'swiperItem a'
        swiperItems[index + 1].className = 'swiperItem c'
    } else if (index === swiperItems.length - 1) {
        swiperItems[index].className = 'swiperItem b'
        swiperItems[index - 1].className = 'swiperItem a'
        swiperItems[0].className = 'swiperItem c'

    } else {
        // 根据当前显示
        swiperItems[index].className = 'swiperItem b'
        swiperItems[index - 1].className = 'swiperItem a'
        swiperItems[index + 1].className = 'swiperItem c'
    }

}


// 自动轮播
//  timer = setInterval(function () {
//     right.click()
//     changeAll()
// }, 5000)

let swiper = document.querySelector('.swiper')
//鼠标经过关闭定时器 
swiper.addEventListener('mouseenter', function () {
    clearInterval(timer)
})
//鼠标离开开启定时器 
swiper.addEventListener('mouseleave', function () {
    // timer = setInterval(function () {
    //     right.click()
    // }, 5000)
    swiperPlay()
})

let points = document.querySelectorAll('.points a')
// 修改小圆点
function changePoints() {
    for (let i = 0; i < points.length; i++) {
        // points[i].addEventListener('mouseenter', function () {
        //     // 排他思想
        //     // 隐藏所有小圆点的样式
        //     document.querySelector('.points .select').classList.remove('select')
        //     points[i].classList.add('select')
        // })
        points[i].className = 'hidden'
    }
    points[index].className = 'select'
}

// 点击小圆点触发按钮
for (let i = 0; i < points.length; i++) {
    points[i].num = i
    points[i].addEventListener('mouseenter', function (){
        index = this.num
        changeAll()
    })
}



// 右侧下一页按钮
right.addEventListener('click', function () {
    index++
    // console.log(11);
    // console.log(index);
    // index = index % swiperItems.length
    if (index === swiperItems.length) {
        index = 0
    }
    changeAll()
 

})
// 左侧上一页按钮 （记得改index）
left.addEventListener('click', function () {
    index--
    // console.log(11);
    // console.log(index);
    // index = index % swiperItems.length
    if (index < 0) {
        index = swiperItems.length - 1
    }
    changeAll()
})