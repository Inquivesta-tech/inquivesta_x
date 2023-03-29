function submit() {
    conatactName = document.getElementById("fname").value
    contactNo = document.getElementById("phone").value
    query = document.getElementById("Query").value
    
    window.location.href = `mailto:inquivesta@iiserkol.ac.in?subject=Website query&body=Name ${conatactName} %3A%0D%0A Phone ${contactNo} %3A%0D%0A Query ${query}`
}