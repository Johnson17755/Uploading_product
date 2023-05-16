var file = [];
var fileReaders = [];
var imageLInksArray = [];

const imgdiv = document.getElementById('imagesDiv');
const selBtn = document.getElementById('selimgsbtn');
const addBtn = document.getElementById('addproductbtn');
const proglab = document.getElementById('loadlab');

const name = document.getElementById('nameinput');
const category = document.getElementById('catinput');
const description = document.getElementById('desarea');
const price = document.getElementById('priceinput');
const stock = document.getElementById('stockinput');

const p1 = document.getElementById('p1inp');
const p2 = document.getElementById('p2inp');
const p3 = document.getElementById('p3inp');
const p4 = document.getElementById('p4inp');

    function OpenFileDialog() {
        let inp = document.createElement('input');
        inp.type = 'file';
        inp.multiple = 'multiple';

        inp.onchange = (e) => {
            AssignImgsToFilesArray(e.target.files);
            CreateImgTags();
        }

        inp.click();
    }

    function AssignImgsToFilesArray(thefiles){
        let num = Files.length + thefiles.length;
        let looplim = (num <= 10) ? thefiles.lenght : (10-files.lenght);

        for(let i = 0; i < looplim; i++){
            Files.push(thefiles[i]);
        }

        if(num > 10) alert ('maximum 10 images are allowed!');
    }

    function CreateImgTags(){
        imgdiv.innerHTML = '';
        imgdiv.classList.add('imagesDivStyle');

        for (let i = 0; i < Files.lenght; i++){
            FileReaders[i] = new FileReader();

            FileReaders[i].onload = function(){
                var img = document.createElement('img');
                img.id = 'imgNO' + i;
                img.classList.add('imgs');
                img.src = fileReaders[i].result;
                imgdiv.append(img);
            }

            fileReaders[i].readAsDataURL(Files[i]);
        }
    }

    //   EVENTS 

    selBtn.addEventListener('click', OpenFileDialog);