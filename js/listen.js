// 播放对象
// let audio = document.querySelector('audio')
let audio = document.querySelector('#ado')

// 音频设置
// audio.src = "./audio/告五人-爱人错过.mp3"
audio.src = "./audio/周杰伦-七里香 [高质量].mp3"
audio.controls = false
audio.loop = true
audio.volume = 0.5

const _audio = document.querySelector('._audio')
// 播放设置
function bofang() {
    // paused属性 暂停
    if (audio.paused) {
        // play() 方法开始播放音频
        audio.play()
        _audio.classList.remove('icon-zanting')
        _audio.classList.add('icon-fang')
    } else {
        // pause()开始播放音频
        audio.pause()
        _audio.classList.remove('icon-fang')
        _audio.classList.add('icon-zanting')
    }
}

//获取音频
changeSong()

//将audio的初始化函数封装
function changeSong() {
    //获取音频时长
    if (audio != null) {
        audio.load()
        //oncanplay事件 在音频准备开始播放时执行
        audio.oncanplay = function () {
            let duraTime = document.querySelector('.duraTime')
            duraTime.innerHTML = transTime(audio.duration)
        }
    }
    //格式化时间格式
    //duration 属性返回当前视频的长度，以秒计。
    function transTime(time) {
        let duration = parseInt(time)
        let min = parseInt(duration / 60)
        let sec = (duration % 60) + ''
        let isM0 = ':'
        if (min == 0) {
            min == '00'
        } if (min < 10) {
            min = "0" + min
        }
        if (sec.length == 1) {
            sec = "0" + sec
        }
        return min + isM0 + sec
    }

    // 时长进度条
    // ontimeupdate 事件在当前的播放位置发送改变时触发。
    // audio.currentTime   currentTime 属性设置或返回音频播放的当前位置（以秒计）
    let progress = document.querySelector('.progress')
    let slide = document.querySelector('.slide')
    let fill = document.querySelector('.fill')
    audio.ontimeupdate = function () {

        const currentTime = document.querySelector('.currentTime')
        currentTime.innerHTML = transTime(parseInt(audio.currentTime))
        const duraTime = document.querySelector('.duraTime')
        duraTime.innerHTML = transTime(audio.duration)

        let l = (audio.currentTime / audio.duration) * 100;
        slide.style.left = l + "%";
        fill.style.width = l + "%";
        if (currentTime == 0) {
            slide.style.left = "0%"
        }
    }

    // 进度条拖动  
    // onmousedown 事件会在鼠标按键被按下时发生。
    // onmousemove 事件会在鼠标指针移到指定的对象时发生。
    // onmouseup 事件会在鼠标按键被松开时发生。
    // 当按下手指时，触发ontouchstart；
    // 当移动手指时，触发ontouchmove；
    // 当移走手指时，触发ontouchend。
    slide.onmousedown = function (e) {
        let x = e.clientX - this.offsetLeft
        document.onmousemove = function (e) {
            let jlx = ((e.clientX - x) / progress.clientWidth) * 100
            if (jlx <= 100 && jlx >= 0) {
                slide.style.left = jlx + "%"
            }
            audio.currentTime = (jlx / 100) * audio.duration
        }
        document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
        }
    }
    slide.ontouchstart = function (e) {
        let x = e.targetTouches[0].clientX - this.offsetLeft
        document.ontouchmove = function (e) {
            let jlx = ((e.targetTouches[0].clientX - x) / progress.clientWidth) * 100
            if (jlx <= 100 && jlx >= 0) {
                slide.style.left = jlx + '%'
            }
            audio.currentTime = (jlx / 100) * audio.duration
        }
        document.ontouchend = function (e) {
            document.ontouchmove = null
            document.ontouchend = null
        }
    }

}

// 获取推荐歌曲 切歌功能
let recom_list = document.querySelectorAll('.recom_list ul li')
// 定义音乐名
let audio_list = ['慕寒,双笙（陈元汐） - 倩音流年', '冥月,Mario - 若当来世', '告五人-爱人错过', 'young and beLana Del Rey-Young And Beautifulautiful', '阿三 - 只只']
// 定义图片
let img_list = ['pic_1', 'pic_8', 'pic_10', 'pic_7', 'pic_5']
// 切歌后对应的图片，歌曲名歌手也要修改  ft_flet
let img = document.querySelector('._img')
let songName = document.querySelector('.word_hd')
let singer = document.querySelector('.word_bd')
let songAndSingerName_list = [
    ['倩音流年', '慕寒，双笙'],
    ['若当来世', '冥月，Mario'],
    ['爱人错过', '告五人'],
    ['young and beautiful', 'Lana Del Rey'],
    ['只只', '阿三']
]
for (let i = 0; i <recom_list.length;i++) {
    recom_list[i].addEventListener('click',function () {
        audio.src = "./audio/" + audio_list[i] + ".mp3"
        img.src = "./pic/" + img_list[i] + ".jpg"
        songName.innerHTML = songAndSingerName_list[i][0] + '<i class="iconfont icon-lovely"></i>'
        singer.innerHTML = songAndSingerName_list[i][1]
        // 重新加载一下函数
        changeSong()
        audio.play()
    })
}