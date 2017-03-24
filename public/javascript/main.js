$(function(){

    var song = $(".song").click(function(){
        var song_name = $(this).attr("id")
        var audio = $("#mytrack")
        var wrapper = $("#wrapper")
        var description = $(".description")
        var time = $("#fullDuration")

        audio[0].pause()
        audio.attr("src", "/songs/"+song_name)
        audio[0].play()
        wrapper.removeClass("display")
        description.addClass("display")
    })

    function time(){
        var audio = $("#mytrack")[0]

        console.log(audio.duration)
    }

    var list = $(".song")

    list.on("click", song, time)

    var play = $("#playButton").click(function(){
        var audio = $("#mytrack")
        audio[0].pause()
        var pause = $("#pauseButton")
        pause.removeClass("display")
        $(this).addClass("display")
    })

    var pause = $("#pauseButton").click(function(){
        var audio = $("#mytrack")
        audio[0].play()
        var play = $("#playButton")
        play.removeClass("display")
        $(this).addClass("display")
    })

    var mute = $("#muteButton").click(function(){
        var audio = $("#mytrack")
        if(audio[0].muted){
            audio[0].muted = false
            $(this).removeClass("icon-volume").addClass("icon-mute")
        }else{
            audio[0].muted = true
            $(this).removeClass("icon-mute").addClass("icon-volume")
        }
    })
})