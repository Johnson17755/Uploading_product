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

    function IsAllImagesUploaded(){
      return imageLInksArray.length == Files.length;
    }

    function GetPoints(){
      let points = [];
        if(p1.value.length>0) points.push(p1.value);
        if(p2.value.length>0) points.push(p2.value);
        if(p3.value.length>0) points.push(p3.value);
        if(p4.value.length>0) points.push(p4.value);
        return points;
    }

    function RestoreBack(){
        selBtn.disabled = false;
        addBtn.disabled = false;
        proglab.innerHTML= "";
    }

     //   Event
    selBtn.addEventListener('click', OpenFileDialog);

    // UPLOAD IMAGES TO FIREBASE STORAGE 

    function UploadAllImages(){
      selBtn.disabled = true;
      addBtn.disabled = true;

      for(let i = 0; i < Files.length; i++){
         uploadAnImage(Files[i], i);
      }
    }

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
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) => {
            imageLInksArray.push(downloadURl);
            if(IsAllImagesUploaded){
              proglab.innerHTML = 'all images uploaded';
              uploadAProduct();
            }
        });
      }
    }

    // IMPORT + CONFIGURATION TO FIRE BASE 
    
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";

    const firebaseConfig = {
      apikey: "AIzaSyCx9QHpVFevYZmehQX-EEIQyPnFVnQxoAo",
      authDomain: "fire9db.firebaseapp.com",
      databasedURL: "https://fire9db-default-rtdb.firebaseio.com",
      projectId: "fire9db",
      storageBucket:"fire9db.appspot.com",
      massagingSenderId: "151710700224",
      appId: "1:151710700224:web:7608a673fd665071c11325"
    };

    const app = initializeApp(firebaseConfig);

    // important firebase storage functions
    import { getStorage, ref as sRef, uploadeBytesResumable, getDownloadURL }
    from "https://www.gstatic.com/firebasejs/9.6.6/firebase-storage.js";

    // IMPORT DATABASED FUNCTION 

    // FIREBASE REALTIME DATABASE 
    import { getDatabase, ref, set, child, get }
    from "https://www.gstatic.com/firebasejs/9.6.6/firebase-storage.js";
      const realdb = getDatabase();


      // UPLOAD A PRODUCT 
    
    function UploadProduct(){
      set(ref(readb, "TheProductRealdb/" + getshortTitle()),{
          ProductTitle: name.value,
          Category: category.value,
          Descrition: description.value,
          Price: price.value,
          Stock: stock.value,
          Point: GetPoints(),
          LinksOfImagesArray: imageLInksArray
      });

      alert("upload successful");
      RestoreBack();
    }
    