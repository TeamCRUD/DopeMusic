$(function(){

    var song = $(".song").click(function(){
        var ID = $(this).attr("id")
        var audio = $("audio")
        audio[0].pause()
        audio.attr("src", "/songs/"+ID+".mp3")
        audio[0].play()
    })

    var list = $(".song")

    list.on("click", song)
})