
const axios = require( 'axios' );
const prompt = require( 'prompt-sync' )();

const accionesRespuesta = []
accionesRespuesta[0] = "La cabina telefónica se encuentra al final del segundo pabellón.   ",
    accionesRespuesta[1] = "El comedor se encuentra junto a las canchas de color rojo.",
    accionesRespuesta[2] = 'El primero de inicial se encuentra al fondo a la derecha de la entrada principal',
    accionesRespuesta[3] = "Un taxi ira a tu ubicacion en parde minutos, porfavor espere...",
    accionesRespuesta[4] = "La rectoria esta frente al edicio C, sector del colegio ",
    accionesRespuesta[5] = "el regreso a clases el dia 21 de noviembre",
    accionesRespuesta[6] = "",
    accionesRespuesta[7] = 'Los cuarto de básica se encuentra en el primer bloque al lado del bar, en el segundo piso. .',
    accionesRespuesta[8] = 'El quinto de básica se encuentra en el primer bloque al lado del bar, en el segundo piso al frente de los cuartos de básica.',
    accionesRespuesta[9] = 'El sexto de básica se encuentra en el primer bloque al lado del bar, en el primer piso.',
    accionesRespuesta[10] = 'El séptimo de básica se encuentra en el primer bloque al lado del bar, en el primer piso.',
    accionesRespuesta[11] = 'El octavo de básica se encuentra en el primer bloque al lado del bar, en primer piso.',
    accionesRespuesta[12] = 'El noveno de básica se encuentra en el segundo bloque al lado del bar, en el primer piso.',
    accionesRespuesta[13] = 'El décimo de básica se encuentra en el segundo bloque al lado del bar, en el primer piso.',
    accionesRespuesta[14] = "",
    accionesRespuesta[15] = 'En caso de buscar a las busetas se encuentran en la salidad trasera del colegio y en caso de buscar taxi puedes pedir uno en siguiente link',
    accionesRespuesta[16] = '.b',
    accionesRespuesta[17] = '.v',
    accionesRespuesta[18] = '.s',
    accionesRespuesta[19] = '.h',
    accionesRespuesta[20] = '.s',
    accionesRespuesta[21] = '.q',
    accionesRespuesta[22] = '.g',
    accionesRespuesta[23] = 'la petición es errónea, porfavor revisa la ortografia ', //default xD

console.log( "Hola, ¿Cuál es tu duda?" );
console.log("Hello, what is your question?" ); 
console.log(" Bonjour, quel est votre doute?");

var pregunta = prompt("===>");
// nota: agregar una condicion con los idiomas soportados 


//Función principal que hara la petición a la detección de idiomas
function deteccion( texto, callback ){
    var datosDeteccion = [{ "Text": texto }];
    var direccionDeteccion = 'https://api.cognitive.microsofttranslator.com/detect?api-version=3.0';
    axios.post( direccionDeteccion, datosDeteccion, {
        headers : {
            'Ocp-Apim-Subscription-Key': '58f9f4075c9c46bca61a78cfc71a45b6',
            'Ocp-Apim-Subscription-Region' : 'southcentralus',
            'Content-Type' : 'application/json'  
        }
    })
    .then( respuesta => { callback( respuesta.data[0].language, texto ) } )
    .catch( error => console.log( "error en la funcion DETECCION : "+error ));


}




function traduccion(idioma, texto) {
    
    var bodyAnalisis = {

        "documents" : [
            {
            "id" : "1",
            "language" :idioma
            , "text" : texto
            }           
        ]
    }
    var direccionAnalisis = 'https://servicioanalisistexto.cognitiveservices.azure.com/text/analytics/v3.0/entities/recognition/general'
    axios.post( direccionAnalisis, bodyAnalisis, {
      headers : {
        "Content-type": "application/json"
        , "Ocp-Apim-Subscription-Key": "8b4c7829af844bc699425c01e131246a"
    
      }

    }).then( respuesta => {var analiText =(respuesta.data.documents[0].entities[0].text )


         var datosAdaptacion = [{ "Text": analiText }]
         var direccionAdaptacion = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=es';

                axios.post(direccionAdaptacion, datosAdaptacion, {
                                headers: {
                  'Ocp-Apim-Subscription-Key': '58f9f4075c9c46bca61a78cfc71a45b6',
                 'Ocp-Apim-Subscription-Region': 'southcentralus',
                   'Content-Type': 'application/json'
                                         }

                            })
                            .then(respuesta => {
                                var adap1 = (respuesta.data[0].translations[0].text)

                                switch (adap1) {

                                    case "teléfono" :
                                        var respuestaIdioma = [{ "Text": accionesRespuesta[0] }];
                                        break;
                                    case "comedor":
                                        var respuestaIdioma = [{ "Text": accionesRespuesta[1] }];
                                        break;
                                    case "Comedor":
                                        var respuestaIdioma = [{ "Text": accionesRespuesta[1] }];
                                            break;    
                                    case "transporte":
                                        var respuestaIdioma = [{ "Text": accionesRespuesta[15] }];
                                        break;
                                    case "Primero":
                                        var respuestaIdioma = [{ "Text": accionesRespuesta[2] }];
                                    case "primero":
                                            var respuestaIdioma = [{ "Text": accionesRespuesta[2] }];    
                                        break;
                                    case "transporte":
                                        var respuestaIdioma = [{ "Text": accionesRespuesta[12] }]
                                        break;
                                    default:
                                        var respuestaIdioma = [{ "Text": accionesRespuesta[23] }];
                                        break;
                                }

           //traduccion para el usuario xD

            var direccionTraduccion = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' + idioma;

            axios.post(direccionTraduccion, respuestaIdioma, {

                headers: {
                    'Ocp-Apim-Subscription-Key': '58f9f4075c9c46bca61a78cfc71a45b6',
                    'Ocp-Apim-Subscription-Region': 'southcentralus',
                    'Content-Type': 'application/json'
                }
            })

            .then(respuesta => console.log(respuesta.data[0].translations[0].text))

            .catch(error => console.log(error));



        })
        .catch(error => console.log("INTENTA RESOLVIENDO EL " + error));
    })
    .catch( error => {"error en la funcion analisis :"+console.log(error.response.data)});
    }

                    
deteccion(pregunta, traduccion);    
