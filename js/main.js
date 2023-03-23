function zoomearth() {
    document.getElementById("earth").classList = ["finalEarth"]
    setTimeout(
        ()=>{
            document.getElementById("earth").classList = ["displayNone"]
        },900
    )
}