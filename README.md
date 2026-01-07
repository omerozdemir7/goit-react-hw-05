Film Arama

Bir film arama uygulaması yazın. Uygulamanın çalışma videosuna göz atın.





Film Arama Servisi

Bu görevde, HTTP istekleri aracılığıyla TMDB hizmetinden filmleri alacaksın. Belgeler bölümüne erişim sağlamak ve HTTP istekleri için bir erişim anahtarı almak amacıyla bir hesap kaydı oluştur (herhangi bir bilgi girebilirsin).



Sana faydalı olacak belgelendirme bölümleri:

Trend olan filmler - ana sayfadaki koleksiyonu oluşturmak için bugünkü en popüler filmler listesi.
Film ara - film sayfasındaki anahtar kelime ile film arama.
Film detayları - film sayfası için filmin tam bilgilerini sorgulama.
Film kadroları - film sayfası için oyuncu kadrosu bilgilerini sorgulama.
Film incelemeleri - film sayfası için incelemeleri sorgulama.


Erişim Anahtarı

Erişim anahtarı, her isteğe Authorization HTTP başlığı olarak eklenmelidir; işte bir örnek.



const url = '<https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1>';

const options = {
  headers: {
		// api_read_access_token yerine kendi tokeninizi yerleştirin
    Authorization: 'Bearer api_read_access_token'
  }
};

axios.get(url, options)
  .then(response =>
 console.log(response))
  .catch(err => console.error(err));



Erişim belirteci, API sayfasında bulunan "API Read Access Token" bölümünden alınır.






Görüntülerin Yolu

Backend, örneğin bir film afişi için görüntünün tam bağlantısı yerine yalnızca dosya adı gibi şu şekilde satırlar gönderecektir.



/1E5baAaEse26fej7uHcjOgEE2t2.jpg




Görüntünün tam yolunu oluşturmak için bu konuyla ilgili dokümantasyonun bölümüne göz atman gerekiyor.

Kısacası, görüntü adının önüne manuel olarak bir yol eklemen gerekecek. Sonuç olarak, elinde tam bir görüntü bağlantısı olacak.



<https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg>



Uygulamada Navigasyon

Navigasyon için React Router kütüphanesi kullanılmaktadır. Uygulamada mutlaka aşağıdaki rotalar olmalıdır.

'/' – HomePage bileşeni, popüler filmlerin listesi ile ana sayfa.
'/movies' – MoviesPage bileşeni, anahtar kelime ile film arama sayfası.
'/movies/:movieId' – MovieDetailsPage bileşeni, film hakkında detaylı bilgi sayfası.
/movies/:movieId/cast – MovieCast bileşeni, oyuncu kadrosu hakkında bilgi. MovieDetailsPage sayfasının alt kısmında render edilir.
/movies/:movieId/reviews – MovieReviews bileşeni, incelemeler hakkında bilgi. MovieDetailsPage sayfasının alt kısmında render edilir.
Kullanıcı mevcut olmayan bir rotaya girdiğinde, kullanıcıyı ana sayfaya yönlendiren NotFoundPage bileşeni gösterilmelidir.


Dosyalar, Klasörler ve Bileşenler:

HomePage, MoviesPage, MovieDetailsPage, NotFoundPage gibi sayfa bileşen dosyaları src/pages klasöründe olmalıdır.
MovieCast ve MovieReviews bileşenleri ayrı sayfalar olmayıp, yalnızca MovieDetailsPage sayfasının parçalarıdır; bu nedenle bu bileşenlerin dosyalarını src/components içinde saklayın.
Navigasyon bağlantılarını içeren menüyü Navigation bileşenine taşıyın. Bu, / ve /movies rotalarına işaret eden iki NavLink bileşeninden oluşmaktadır.
Film listesini görüntülemek için MovieList bileşeni oluşturun. Bunu HomePage ve MoviesPage sayfalarında kullanın.


Kullanıcı Go back bağlantısına tıkladığında (oyuncuları/incelemeleri gördükten sonra), kullanıcıyı geldiği detaylı film sayfasına geri döndürmelidir. Eğer sayfa güncellenirse ve konum nesnesi kaydedilmemişse, kullanıcıyı "/movies" rotasına yönlendirin.



Kod Bölümü

Uygulamanın rotaları için JS kodunun asenkron yüklemesini ekleyin, React.lazy ve Suspense kullanarak.



Criteria

main.jsx - BrowserRouter içerir

components ve pages klasörlerinin varlığını kontrol edin.

pages zorunlu bileşenleri içerir - HomePage, MoviesPage, MovieDetailsPage

NotFoundPage bileşeni olmalıdır - öneri.

components, App, MovieCast, MovieReviews, Navigation, MovieList bileşenlerini içerir.



App

Route ve Routes bileşenlerine sahip yönlendirme konfigürasyonu mevcuttur. path'ı ve ona karşılık gelen elements'i kontrol edin.

'/' – HomePage bileşeni, popüler filmlerin listesi ile ana sayfa.
'/movies' – MoviesPage bileşeni, anahtar kelimeye göre film arama sayfası.
'/movies/:movieId' – MovieDetailsPage bileşeni, film hakkında detaylı bilgi sayfası.
cast – MovieCast bileşeni, oyuncu kadrosu bilgisi. MovieDetailsPage sayfasında alt kısımda görüntülenir.
reviews – MovieReviews bileşeni, inceleme bilgisi. MovieDetailsPage sayfasında alt kısımda yer alır.
React.lazy ve Suspense kullanılır.

Bu kriterlerin eksikliği kritik bir hata olarak değerlendirilir.

Navigation bileşeni mevcuttur.



Navigation

İki adet Navlink bileşeni bulunmaktadır.

Birincisi / adresine yönlendirir.

İkincisi /movies adresine yönlendirir.



page/HomePage

useEffect'i, bileşen monte edildiğinde trend filmler için istek yapmak üzere kullanır.

Trend filmler için bir durum (state) olmalıdır - zorunlu.

Yükleme durumu ve hata durumu için bir durum - geliştirme.

En az bir eleman bulunduğunda render edilen, film dizisini (MovieList) prop olarak film dizisi alan bir bileşen içerir.



pages/MoviesPage

Filmler için bir durum (state) olmalıdır - zorunlu.

Yükleme durumu ve hata durumu için bir durum - geliştirme.

En az bir eleman bulunduğunda render edilen, film dizisini (MovieList) prop olarak film dizisi alan bir bileşen içerir.



Parametre değerini değiştiren bir işlev, useSearchParams kancası ile elde edilen bir yöntem kullanılarak form gönderildiğinde (TSS'ye eklenmeli).

useSearchParams kullanılır (TSS'ye eklenmeli).

useSearchParams ile değer değiştiğinde arka uç (backend) için istek yapmak üzere useEffect kullanılır.



component/MovieList

to prop'u ile '/movies/:movieId' değerini içeren Link bileşenleri koleksiyonu içerir ve state prop'u ile location değeri taşır.

useLocation kancası kullanılır.



pages/MovieDetailsPage

Film detayları için bir durum (state) olmalıdır - zorunlu.

Yükleme durumu ve hata durumu için bir durum - geliştirme.

movieId değerini almak için useParams kancası kullanılır.

movieId değiştiğinde tetiklenen ve istek yapan useEffect kullanılır.



İç içe navigasyon:

cast değerine sahip Navlink prop'u.
reviews değerine sahip Navlink prop'u.
İç içe yönlendirmeleri göstermek için Outlet bileşeni içerir.

useLocation kancası kullanılır.

location.state değeri ile başlatılan useRef kancası kullanılır.

current değerini içeren veya /movies olan useRef çağrısı sonucunda geri dönmek için to prop'u ile bir Link bileşeni içerir.



components/MovieCast

useParams kancasını kullanarak movieId değerini alırlar.

movieId değiştiğinde tetiklenen bir useEffect kullanarak istek gerçekleştirirler.

Filmlerin oyuncuları için bir durum (state) olmalıdır - zorunlu.

Yükleyici (loader) ve hata durumu (state) olmalıdır - geliştirme.

Eğer bilgi gelmezse - bilgi eksikliği hakkında bir mesaj gösterilir.



components/MovieReviews

useParams kancasını kullanarak movieId değerini alırlar.

movieId değiştiğinde tetiklenen bir useEffect kullanarak istek gerçekleştirirler.

Film incelemeleri için bir durum (state) olmalıdır - zorunlu.

Yükleyici (loader) ve hata durumu (state) olmalıdır - geliştirme.

Eğer bilgi gelmezse - bilgi eksikliği hakkında bir mesaj gösterilir.