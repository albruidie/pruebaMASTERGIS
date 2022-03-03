
var webmapId = "78afd5f332d52419d9ad6a3439e5b003e"; 

// @formatter:off
require([
    
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/arcgis/utils",

    "esri/tasks/FeatureSet",
    "esri/tasks/ServiceAreaTask",
    "esri/tasks/ServiceAreaParameters",
    "esri/tasks/query",

    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    
    "dojo/ready",
    "dojo/parser",
    "dojo/dom",
    "dojo/on",

    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane"],
    function ( Map, FeatureLayer, arcgisUtils, FeatureSet, ServiceAreaTask, ServiceAreaParameters, Query, SimpleLineSymbol, SimpleFillSymbol, ready, parser, dom, on,
        BorderContainer, ContentPane) {

        ready(function () {

            parser.parse();

            var map = new Map("divMap", {
                basemap: "streets",
                center: [-3.70, 40.41],
                zoom: 12
            });

            var flCentrosSalud = new FeatureLayer("https://services5.arcgis.com/zZdalPw2d0tQx8G1/arcgis/rest/services/CENTROS_SALUD_ARD/FeatureServer/0", {
                outFields: ["*"]
            });

            console.log(flCentrosSalud);

            map.addLayer(flCentrosSalud);

            var queryLyr = new Query();
            queryLyr.where = "1=1";

            flCentrosSalud.queryFeatures(queryLyr, function(featureSet) {
                flCentrosSalud.on("query-features-complete");
                var featureSt = [];
                featureSt.features = featureSet;
                console.log(featureSt);


                var serviceAreaTask = new ServiceAreaTask("https://formacion.esri.es/server/rest/services/RedMadrid/NAServer/Service%20Area");

                var params = new ServiceAreaParameters();
                params.defaultBreaks = [3, 5, 10];
                params.impedanceAttribute = "TiempoPie";
                params.facilities = featureSt;

                console.log(params);

                serviceAreaTask.solve(params, function (solveresult) {
                    var polygonSymbol3 = new SimpleFillSymbol(
                        "solid",
                        new SimpleLineSymbol("solid", new Color([255, 255, 255]), 0),
                        new Color([38, 115, 0, 0.29])
                    );

                    var polygonSymbol5 = new SimpleFillSymbol(
                        "solid",
                        new SimpleLineSymbol("solid", new Color([255, 255, 255]), 0),
                        new Color([230, 230, 0, 0.25])
                    );

                    var polygonSymbol10 = new SimpleFillSymbol(
                        "solid",
                        new SimpleLineSymbol("solid", new Color([255, 255, 255]), 0),
                        new Color([230, 0, 0, 0.25])
                    );

                    arrayUtils.forEach(solveresult.serviceAreaPolygons,  function(serviceArea) {
                        serviceArea.setSymbol(polygonSymbol3);
                        map.graphics.add(serviceArea);
                    })

                })















            });
        

            

            

                
            


            







                
})


            

            



            

            



        });

   
