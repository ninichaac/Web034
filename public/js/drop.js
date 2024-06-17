function fileValidation() {
    var fileInput = document.getElementById('file');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.csv)$/i;

    if (!allowedExtensions.exec(filePath)){
        alert("plz csv fille");
        fileInput.value='';
        return false;
    }
    return true;
}

document.getElementById('submit-form').addEventListener('click', function(e){
    e.preventDefault();
    let form = document.getElementById('myForm');
    let valid = fileValidation();
    if(valid){
        form.submit();
    }
})