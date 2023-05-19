let file = [];
let fileReaders = [];
let imageLInksArray = [];

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
        inp.multiple = true;
      
        inp.onchange = (e) => {
          AssignImgsToFilesArray(e.target.files);
          CreateImgTags();
        };
      
        inp.click();
      }
      
      function AssignImgsToFilesArray(thefiles) {
        let num = Files.length + thefiles.length;
        let looplim = (num <= 10) ? thefiles.length : (10 - Files.length);
      
        for (let i = 0; i < looplim; i++) {
          Files.push(thefiles[i]);
        }
      
        if (num > 10) {
          alert('Maximum 10 images are allowed!');
        }
      }
      
      function CreateImgTags() {
        imgdiv.innerHTML = '';
        imgdiv.classList.add('imagesDivStyle');
      
        for (let i = 0; i < Files.length; i++) {
          FileReaders[i] = new FileReader();
      
          FileReaders[i].onload = function () {
            var img = document.createElement('img');
            img.id = 'imgNO' + i;
            img.classList.add('imgs');
            img.src = FileReaders[i].result;
            imgdiv.appendChild(img);
          };
      
          FileReaders[i].readAsDataURL(Files[i]);
        }
      }

      // product detail
    
    function getshortTitle() {
        if(getshortTitle.length > 49) title = title.substrings(0,47);
        else return title;
        return title + '...';
    }

    function getshortTitle(){
      let namey = name.value.substring(0,50);
      return namey.replace(/[^a-zA-Z0-9]/g,"");
    }

    function GetImgUploadProgress(){
      return "Images uploaded" + imageLInksArray.length + ' of ' + Files.length;
    }

     //   Event
    selBtn.addEventListener('click', OpenFileDialog);

    // UPLOAD IMAGES TO FIREBASE STORAGE 

    function uploadAnImage(imgToUpload, imgNO){
      const metadata = {
        contentType: imgToUpload.type
      };

      const storage = getStorage();

      const ImageAddress = 'TheImages/'+ getshortTitle() + "img#" + (imgNO+1);

      const storageRef = sRef(storage, imageAddress);

      const uploadTask = uploadBytesResumable(storageRef, imgToUpload, metadata);

      uploadTask.on('state-changed', (snapshot) =>{
        proglab.innerHTML = GetImgUploadProgress();
      }),

      (error)=>{
        alert('error: image upload failed')
      }
    }