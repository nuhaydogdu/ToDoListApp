const gorevForm = document.querySelector(".gorev-form");
const yeniGorev = document.querySelector(".input-gorev");
const btnGorevEkle = document.querySelector(".btn-gorev-ekle");
const gorevListesi = document.querySelector(".gorev-listesi");

btnGorevEkle.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamamla);
document.addEventListener('DOMContentLoaded', localStorageOku);
// DOM eventleri yüklendikten sonra localStorageOku fonksiyonunu çalıştırıyor.

function gorevEkle(e) {

    e.preventDefault();

    if (yeniGorev.value.length > 0) {

        gorevItemOlustur(yeniGorev.value);
        //localStorage kaydet
        localStorageKaydet(yeniGorev.value);
        //localStorage kaydet
        yeniGorev.value = '';
        // eklemelerden sonra inputa girdiğimiz değeri boşaltıyor  
    } else {
        alert("boş görev tanım olmaz")
    }
}

function localStorageArrayeDonustur() {
    let gorevler;

    if (localStorage.getItem('gorevler') == null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    return gorevler;

}

function gorevSilTamamla(e) {
    const tiklanilanEleman = e.target;

    if (tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')) {
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
    }

    if (tiklanilanEleman.classList.contains('gorev-btn-sil')) {

        if (confirm('Are You Sure')) {

            // kaybol sınıfını ekledikten sonra gerçekleşmesiş için aşağıdaki transitionendi(0.5sn) kullandık
            tiklanilanEleman.parentElement.classList.toggle('kaybol');

            //silinecek elemanı burada belirleyip localStorageSil functionunda siliyoruz.
            const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
            localStorageSil(silinecekGorev);

            // animasyonu bitmessini bekliyor rwmovenin çalışması için
            tiklanilanEleman.parentElement.addEventListener('transitionand', function () {
                tiklanilanEleman.parentElement.remove();
            });

        }

    }

}

function localStorageKaydet(yeniGorev) {
    let gorevler = localStorageArrayeDonustur();

    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
    // çalışabilmesi için yenigörevi eklediğimiz yerde local storage e kaydetmemiz gerekiyor
}

function localStorageOku() {
    let gorevler = localStorageArrayeDonustur();

    gorevler.forEach(function (gorev) {
        gorevItemOlustur(gorev);
    });
}

function gorevItemOlustur(gorev) {

    // -------ekleyeceğimiz yapıyı oluşturduk en başta
    // div oluşturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');

    // li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;
    gorevDiv.appendChild(gorevLi);

    // tamamlandı butonu ekle
    const gorevTamamBtn = document.createElement('button');
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
    gorevTamamBtn.innerHTML = '<i class="far fa-check-square"></i>';
    gorevDiv.appendChild(gorevTamamBtn);

    // sil butonu ekle
    const gorevSilBtn = document.createElement('button');
    gorevSilBtn.classList.add('gorev-btn');
    gorevSilBtn.classList.add('gorev-btn-sil');
    gorevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    gorevDiv.appendChild(gorevSilBtn);


    //ul ye oluşturduğumuz divi eklme
    gorevListesi.appendChild(gorevDiv);
    // ---------ekleyeceğimiz yapıyı oluşturduk en başta

}

function localStorageSil(gorev) {
    let gorevler = localStorageArrayeDonustur();

    // splice ile item sil                 
    const silinecekElemanIndex = gorevler.indexOf(gorev);        //buradaki verdiğimiz (görev) yukarıda gorevSilTamamlanın içerisinde belirttiğimiz silinecekElamanı alıyor. 
    gorevler.splice(silinecekElemanIndex, 1);                    //Yani silinecekElamanın index numarasını dönüyor 

    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}