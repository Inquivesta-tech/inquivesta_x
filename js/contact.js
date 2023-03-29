function submit() {
    conatactName = document.getElementById("fname").value
    contactNo = document.getElementById("phone").value
    query = document.getElementById("Query").value

    window.location.href = `mailto:inquivesta@iiserkol.ac.in?subject=Website query&body=Name %3A ${conatactName} %0D%0A Phone %3A ${contactNo} %0D%0A Query %3A ${query}`
}