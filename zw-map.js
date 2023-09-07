<link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin=""></script> 

    <style>
      #osm-map { height: 520px; max-height: 85vh }
      .w-container { max-width: 1500px }
      .leaflet-popup-content-wrapper .leaflet-popup-content a { color: #000000; font-weight: bold; }
      .leaflet-top, .leaflet-bottom { z-index: 10; }

      @media only screen and ( max-width: 991px) {
        #osm-map { height: 400px; max-height: 75vh }
      }
      @media only screen and (max-width: 767px ) and (orientation: landscape) {
        #osm-map { height: 300px; max-height: 70vh }
      }
      @media only screen and (max-width: 479px) {
        #osm-map { max-height: 50vh }
      }
    </style>

    <div class="map-section" >
      <div class="content-container w-container">
        <div id="osm-map"></div>
      </div>
    </div>
    
    <script>

var markers = [
        [ 49.914401417571796, 8.234337112174224, "<h5><a href=\"https://evavollmer-wein.de\" target=\"_blank\">Weingut Eva Vollmer</a></h5><br>Nieder-Olmer-Str. 65, 55129 Mainz-Ebersheim<br><a href=\"https://bit.ly/3GfrBY7\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.77832879216736, 8.287818183003669, "<h5><a href=\"https://weingut-bischmann.de\" target=\"_blank\">Weingut Bischmann</a></h5><br>Hof Westergewann 1, 67587 Wintersheim<br><a href=\"https://bit.ly/3jQeTHS\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.69221848774593, 8.198760185947805, "<h5><a href=\"https://wohlgemuth-schnuerr.de\" target=\"_blank\">Weingut Wohlgemuth-Schnürr</a></h5><br>Katzensteiner Str. 45, 67598 Gundersheim<br><a href=\"https://bit.ly/3Zljoum\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.79763054622243, 8.169773998934508, "<h5><a href=\"https://weingut-schoenhals.de\" target=\"_blank\">Weingut Schönhals</a></h5><br>Hauptstr. 23, 55234 Biebelnheim<br><a href=\"https://bit.ly/3DAewZ6\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.65508043646704, 6.445447483332685, "<h5><a href=\"http://beck-winter.de\" target=\"_blank\">Bio-Weingut Beck-Winter</a></h5><br>Im Stolzenwingert 27a, 54453 Nittel<br><a href=\"https://bit.ly/3Rs3AlW\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.91285839745621, 8.135091887031795, "<h5><a href=\"https://eppelmann.de\" target=\"_blank\">Weingut Eppelmann</a></h5><br>Kirchgasse 10, 55271 Stadecken-Elsheim<br><a href=\"https://bit.ly/3XZejqk\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.95770248183914, 8.277658827653635, "<h5><a href=\"https://schneider-weingut.com\" target=\"_blank\">Weingut Mirjam Schneider</a></h5><br>Klein-Winternheimer Weg 6, 55129 Mainz<br><a href=\"https://bit.ly/3Y3IOLZ\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.85876954633881, 10.185869992877544, "<h5><a href=\"https://weingut-rothe.de\" target=\"_blank\">Weingut Rothe</a></h5><br>Heerweg 6, 97334 Nordheim/Main<br><a href=\"https://bit.ly/3HUTve5\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.14032507381608, 9.091611456471933, "<h5><a href=\"https://bioweingut-weinreuter.de\" target=\"_blank\">Bioweingut Weinreuter</a></h5><br>Riedhöfe 2, 74211 Leingarten<br><a href=\"https://bit.ly/3DCrx4h\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.957486401484296, 8.015512869847187, "<h5><a href=\"https://kronenhof.de\" target=\"_blank\">Bio-Weingut Kronenhof</a></h5><br>Langgasse 8, 55435 Gau-Algesheim<br><a href=\"https://bit.ly/3HW2DPA\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 47.57504831018754, 9.673470812255303, "<h5><a href=\"https://weingut-haug.de\" target=\"_blank\">Weingut Haug</a></h5><br>Kellereiweg 19, 88131 Lindau (Bodensee)<br><a href=\"https://bit.ly/3lbcPLm\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 48.80329801229694, 8.217833434388297, "<h5><a href=\"https://weingutmaier.de\" target=\"_blank\">Bio-Weingut Maier</a></h5><br>Karlsruher Str. 8, 76532 Baden-Baden<br><a href=\"https://bit.ly/3HzWWFP\" target=\"_blank\"> Zu Google Maps →</a>" ],
       	[ 49.209269251841334, 8.71276679880708, "<h5><a href=\"https://weingut-honold.de\" target=\"_blank\">Weingut Honold</a></h5><br>Am Hummelberg 1, 76684 Östringen<br><a href=\"https://bit.ly/40t66fW\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.96261227253709, 8.065076030687926, "<h5><a href=\"https://hamm-weine.de\" target=\"_blank\">Weingut Hamm</a></h5><br>Bürgermeister-Bauer-Str. 1, 55218 Ingelheim<br><a href=\"https://shorturl.at/jlmtA\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 53.126507796133126, 10.700732027736942, "<h5><a href=\"https://witt-wein.de\" target=\"_blank\">WITT Wein</a></h5><br>Bäckerstr. 2, 29584 Groß Thondorf<br><a href=\"https://bit.ly/3l5FUI2\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.86025086822125, 8.241370540329296, "<h5><a href=\"https://weingut-abthof.de\" target=\"_blank\">Weingut Abthof</a></h5><br>Bahnhofstr. 27, 55278 Hahnheim<br><a href=\"https://bit.ly/3jFAPVU\" target=\"_blank\"> Zu Google Maps →</a>" ],
       	[ 48.45513994845029, 15.830397311441176, "<h5><a href=\"https://peter-paradeiser.at\" target=\"_blank\">Bioweinbau Peter Paradeiser</a></h5><br>Kellergasse Scheibe, 3481 Fels am Wagram, Österreich<br><a href=\"https://bit.ly/3Qh4HV6\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 48.938270873440885, 8.920837796112739, "<h5><a href=\"https://lembergerland.de\" target=\"_blank\">Lembergerland eG</a></h5><br>Manfred-Behr-Str. 34, 71665 Vaihingen<br><a href=\"https://bit.ly/3GBGc1y\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.86535107326554, 8.927091441150717, "<h5><a href=\"https://vinum-autmundis.de\" target=\"_blank\">vinum autmundis – Odenwälder Winzergenossenschaft eG</a></h5><br>Riegelgartenweg 1, 64823 Groß-Umstadt<br><a href=\"https://tiny.cc/vbd6vz\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.20922519832644, 8.050873427905463, "<h5><a href=\"https://wilhelmshof.de\" target=\"_blank\">Wein- und Sektgut Wilhelmshof</a></h5><br>Queichstr. 1, 76833 Siebeldingen<br><a href=\"https://tiny.cc/ybd6vz\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 48.793023703100886, 9.351122130686859, "<h5><a href=\"https://singer-bader.de\" target=\"_blank\">Weingut Singer-Bader</a></h5><br>Weinkorb I Vinothek, Rosenstr. 1, 71404 Korb<br><a href=\"httsp://tiny.cc/zbd6vz\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.777939907754856, 8.284533315343138, "<h5><a href=\"https://theos-weinundgut.de\" target=\"_blank\">THEOS Wein und Gut</a></h5><br>Hauptstr. 13, 67587 Wintersheim<br><a href=\"https://tiny.cc/1cd6vz\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 51.232669943605195, 13.427742297899117, "<h5><a href=\"https://weingut-jan-ulrich.de\" target=\"_blank\">Weingut Jan Ulrich</a></h5><br>An der Weinstr. 40, 01612 Nünchritz/OT Diesbar-Seußlitz<br><a href=\"https://tiny.cc/8cd6vz\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.98182046842412, 7.091423226689882, "<h5><a href=\"https://weingut-hahn-kroev.com\" target=\"_blank\">Weingut Hahn</a></h5><br>Moselweinstr. 18, 54536 Kröv<br><a href=\"https://tiny.cc/ecd6vz\" target=\"_blank\"> Zu Google Maps →</a>" ],
       	[ 49.2354078850403, 8.17244719928482, "<h5><a href=\"https://volz-wein.de\" target=\"_blank\">Sebastian Volz Winery</a></h5><br>Dalbergstr. 15, 76879 Essingen<br><a href=\"https://tiny.cc/kcd6vz\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 47.584087517917446, 9.69484379961981, "<h5><a href=\"https://weingut-2h.de\" target=\"_blank\">Weingut 2H</a></h5><br>Oberrengersweiler 90, 88131 Lindau<br><a href=\"https://tiny.cc/mcd6vz\" target=\"_blank\"> Zu Google Maps →</a>" ],
       	[ 49.657504216823284, 8.335652897842834, "<h5><a href=\"https://weingut-sandwiese.com\" target=\"_blank\">Weingut Sandwiese</a></h5><br>Fahrweg 19, 67550 Worms-Herrnsheim<br><a href=\"https://tiny.cc/rcd6vz\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.9603068715053, 8.059652997853512, "<h5><a href=\"https://doppelstueck.com\" target=\"_blank\">Weingut Wasem Doppelstück</a></h5><br>Stiegelgasse 50, 55218 Ingelheim<br><a href=\"https://tiny.cc/zcd6vz\" target=\"_blank\"> Zu Google Maps →</a>" ],
        [ 49.875263950241525, 8.336910483337398, "<h5><a href=\"https://weingut-wedekind.de\" target=\"_blank\">Ökologisches Weingut Wedekind</a></h5><br>Karolingerstr. 1, 55283 Nierstein<br><a href=\"https://tiny.cc/2cd6vz\" target=\"_blank\"> Zu Google Maps →</a>" ]
      ];
      
      // L.Icon.Default.imagePath = "images/";
      
      var map = new L.Map('osm-map');
      var markerArray = [];
         
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);
      map.attributionControl.setPrefix('');
   
     
      for (var i=0; i<markers.length; i++) {
        var lat = markers[i][0];
        var lon = markers[i][1];
        var popupText = markers[i][2];
        
        var markerLocation = new L.LatLng(lat, lon);
        var marker = new L.Marker(markerLocation);
        marker.bindPopup(popupText);

        markerArray.push(marker);
      }

      var group = L.featureGroup(markerArray).addTo(map);
      map.fitBounds(group.getBounds().pad(0));

      // Disable map zoom with mouseWheel for 2s 
      document.addEventListener("scroll", function() {
        map.scrollWheelZoom.disable()
        var timeOut = null;
        if (timeOut != null) {
          clearTimeout(timeOut);
        }
        timeOut = setTimeout("map.scrollWheelZoom.enable()", 2000);
      });

    </script>