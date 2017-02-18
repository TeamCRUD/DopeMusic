$(function(){

    var song = $(".song").click(function(){
        var song_name = $(this).attr("id")
        var audio = $("audio")
        audio[0].pause()
        audio.attr("src", "/songs/"+song_name)
        audio[0].play()
    })

    var list = $(".song")

    list.on("click", song)
})