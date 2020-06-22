 

<p>
Protocolo sobre MQTT
</p>
<h1>MQIF</h1>


<p>
MQ Interfacing
</p>
<p>
Felipe Bravo
</p>
<p>
Este documento está orientado al uso de MQIF en sistemas SIGMA, específicamente en sistema DOLF, sin menoscabo del uso del protocolo en otros sistemas, sean o no de SIGMA TELECOM, bajo supervisión del autor.
</p>
<p>
<strong>GENERAL</strong>
</p>
<p>
<strong>/&lt;system>/__&lt;appname>/____&lt;resource>/</strong>
</p>
<p>
NOTA: el uso de guiones bajos es reservado, no deben usarse dentro de los parámetros en ninguna parte del sistema.
</p>
<p>
<strong>&lt;system></strong>
</p>
<p>
El sistema para este documento es: symbiot
</p>
<p>
<strong>__&lt;APPNAME></strong>
</p>
<p>
Nombre del APP a usar para el topic, el cual diferencia variables de distintos sistemas. Se forma por dos guiones bajos y el nombre del recurso.
</p>
<p>
Nombres a usar (siempre en mayúsculas):
</p>
<p>
Para este documento
</p>
<p>
-DOLF	: data over leaky feeder
</p>
<p>
<strong>____&lt;resource></strong>
</p>
<p>
Nombre del recurso del sistema en cuestión, Se forma por cuatro guiones bajos y el nombre del recurso. pueden ser:
</p>
<p>
-sys: parámetros del sistema
</p>
<p>
-dev	: dispositivos
</p>
<p>

</p>
<p>
<strong>ÁRBOL DE TÓPICOS</strong>
</p>
<p>
Caso SymbIoT DOLF
</p>

<table>
  <tr>
   <td><strong>BASE TOPICS</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>A
   </td>
   <td>B
   </td>
   <td>C
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>/symbiot/__DOLF/
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>/symbiot/__DOLF/
   </td>
   <td>__resourcegroup/
   </td>
   <td>&lt;resourcegroupName>/
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><strong>COMPOSED TOPICS</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>D
   </td>
   <td>E
   </td>
   <td>F
   </td>
   <td>G
   </td>
   <td>H
   </td>
  </tr>
  <tr>
   <td>&lt;basetopic>/
   </td>
   <td>__dev/&lt;deviceId>/
   </td>
   <td>__group/&lt;groupname>/
   </td>
   <td>__var/&lt;varname>/
   </td>
   <td>__name
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>__unit
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>__options
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>__class
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>__current
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>__set
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>__value
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>__dbid
   </td>
  </tr>
  <tr>
   <td><strong>ENABLE TOPIC</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>I
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>&lt;basetopic>/
   </td>
   <td>__dev/&lt;deviceId>/
   </td>
   <td>__enable/
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><strong>ONLINE TOPIC</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>J
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>&lt;basetopic>/
   </td>
   <td>__dev/&lt;deviceId>/
   </td>
   <td>__online
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><strong>SYSTEM TOPICS</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>K
   </td>
   <td>L
   </td>
   <td>M
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>symbiot/__system/
   </td>
   <td>____backend/java/
   </td>
   <td>__var/online/
   </td>
   <td>__value
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td><strong>METADATA TOPIC</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>N
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>&lt;basetopic>/
   </td>
   <td>__dev/&lt;deviceId>/
   </td>
   <td>__meta/__content/
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>symbiot/__system/
   </td>
   <td>____backend/java/
   </td>
   <td>__var/errors/
   </td>
   <td>
   </td>
   <td>&lt;error number>
   </td>
  </tr>
</table>


<p>
<strong>A - Tópico base del sistema</strong>
</p>
<p>
Parte del tópico presente en todos los mensajes del subsistema en cuestión. Se compone por el nombre del sistema, y el nombre del subsistema.
</p>
<p>
<strong>B - Grupo de recursos</strong>
</p>
<p>
No se utiliza en este sistema. En otros sistemas, esto se utiliza para efectos de daisy chain de equipos esclavos a un equipo maestro.
</p>
<p>
<strong>C - Nombre de grupo de recursos</strong>
</p>
<p>
No se utiliza en este sistema. En otros sistemas, esto se utiliza para efectos de daisy chain de equipos esclavos a un equipo maestro, en este campo se refleja el nombre de dicho grupo de recursos
</p>
<p>
<strong>D - Tópico Base  </strong>Ver puntos A, B y C. En este subsistema sólo se utiliza punto A.
</p>
<p>
<strong>E - Dispositivo</strong>
</p>
<p>
Compuesto por __dev y &lt;deviceId>, donde deviceId corresponde, en el caso de este sistema, a la id del dispositivo en base de datos, en la colección de polling.
</p>
<p>
<strong>F - Grupo de variables</strong>
</p>
<p>
Compuesto por __group y &lt;groupname> donde &lt;groupname> en este subsistema, corresponde al nombre del grupo de variables, información que se extrae de la base de datos de clases, sus grupos y variables.
</p>
<p>
<strong>G - Variables</strong>
</p>
<p>
Compuesto por __var y &lt;varname>, donde &lt;varname> corresponde al nombre de la variable, información que se extrae de la base de datos de clases, sus grupos y variables.
</p>
<p>
<strong>H - Parámetros de la variable</strong>
</p>
<p>
Aquí se definen los distintos parámetros para cada variable:
</p>
<ol>

<li><strong>__name</strong>: nombre formal de la variable, utilizado en UI <em>(db:name)</em>

<li><strong>__unit</strong>: unidad de la variable, si no posee unidad, es solo carácter espacio (“ ”) o vacío. <em>(db:meassureunit)</em>

<li><strong>__options</strong>: opciones para generar un selector en UI, no utilizado en este sistema. <em> </em>

<li><strong>__class</strong>: clase de la variable <em>(db:type uint/sint > number, coil/input > boolean)</em>
<ol>

<li><strong>text</strong>: string de texto, por defecto si la clase no es ninguna de las siguientes.

<li><strong>boolean</strong>: valor de 1 o 0 para bits.

<li><strong>alarm</strong>: utiliza __value para el estado de la alarma, no se usa en este subsistema.

<li><strong>number</strong>: formato numérico

<li><strong>select</strong>: selección múltiple (requiere __options)

<li><strong>multi</strong>: múltiples bits en un solo número hexa  (requiere __options)

<li><strong>slider</strong>: especial para parámetros que van del 0 al 100.

<li><strong>graph</strong>: generador de gráficos cartesianos
</li>
</ol>

<li><strong>__current</strong>: valor actual de la variable, en caso de __class <em>alarma</em>, indica habilitación. <em>(db:defaultvalue)</em>

<li><strong>__set</strong>: valor a setear en variable en dispositivo desde UI. Valor de inicio reservado “__null”, utilizado para generar tópico por primera vez, este valor debe ser ignorado por backend.

<li><strong>__value</strong>: solo usado en alarmas, indica estado de alarma, en forma de bit.

<li><strong> __max</strong> / <strong>__min</strong>: generados si variable se configura para ser alarmada, indica el valor maximo y minimo permitidos, no inclusive. <em>(db:normalmax/normalmin)</em>

<li><strong> __dbid</strong> : parametro auxiliar. id de referencia de la variable en base de datos. <em>(db:__id)</em>
</li>
</ol>
<p>
<strong>I - Online</strong>
</p>
<p>
Tópico utilizado para indicar si dispositivo se encuentra en linea (true) u Offline (false).
</p>
<p>
<strong>J - Enable</strong>
</p>
<p>
Tópico utilizado para habilitar/deshabilitar un dispositivo en el frontend. Su mensaje true/false define si el dispositivo está habilitado.
</p>
<p>
<strong>K - Backend resources</strong>
</p>
<p>
Recursos backend, en este caso, backend Java.
</p>
<p>
<strong>L - Online var</strong>
</p>
<p>
Variable online, siguiendo formato de variables ya explicado.
</p>
<p>
<strong>M - Value</strong>
</p>
<p>
Valor de la variable online del recurso backend, este tópico debe configurarse con un LAST WILL con valor 0 para indicar caída/interrupción de funcionamiento de backend. Valor 1 indica estado ONLINE.
</p>
<p>
<strong>N - Metadata</strong>
</p>
<p>
Objeto{} para definición de comportamiento de UI respecto a cada dispositivo, generado dependiendo de la clase del dispositivo, y toda la info al respecto desde base de datos:
</p>
<ol>

<li><strong>controls</strong>: Array[] de variables controlables desde lista de dispositivos.
<ol>

<li>groupname: nombre del grupo al que pertenece la variable.

<li>varname: nombre de la variable.
</li>
</ol>

<li><strong>secondaryInfo</strong>: Array[] de variables presentadas en listado de dispositivos.
<ol>

<li>groupname: nombre del grupo al que pertenece la variable.

<li>varname: nombre de la variable.
</li>
</ol>

<li><strong>elements</strong>: objetos{} de datos sobre el dispositivo.
<ol>

<li>__id: id del dispositivo

<li>__name: nombre del dispositivo

<li>__details: detalles sobre el dispositivo
</li>
</ol>
</li>
</ol>
<p>
<strong>Metadata en UI (solo como referencia, variables utilizadas de prueba no son oficiales)</strong>
</p>
<p>


<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/MQIF-Documentation0.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


<img src="images/MQIF-Documentation0.png" width="" alt="alt_text" title="image_tooltip">

</p>
<p>
<strong>ANEXO A:</strong>
</p>
<p>
<strong>MongoDB Collections</strong>
</p>
<p>
///////////////////////////////////////////////////////////////////////////////////////
</p>
<p>
<strong>Colección ModbusDevices</strong>
</p>
<p>
<strong>Colleccion modbusdevices // Lista de dispositivos modbus para hacer polling</strong>
</p>
<p>
<strong>{</strong>
</p>
<p>
<strong>  devicetag: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      regEx: /^[a-z0-9A-Z_]{3,15}$/,</strong>
</p>
<p>
<strong>      label: 'Nombre (en sistema)',</strong>
</p>
<p>
<strong>      optional: false,</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  devicename: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Nombre',</strong>
</p>
<p>
<strong>      optional: false,</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  classd: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Clase',</strong>
</p>
<p>
<strong>      regEx: SimpleSchema.RegEx.Id, </strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  mbaddress: {</strong>
</p>
<p>
<strong>      type: Number,</strong>
</p>
<p>
<strong>      label: 'Modbus Address',</strong>
</p>
<p>
<strong>      min: 0,</strong>
</p>
<p>
<strong>      max: 255,</strong>
</p>
<p>
<strong>      defaultValue: 1, </strong>
</p>
<p>
<strong>  }, </strong>
</p>
<p>
<strong>  ip: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      regEx: SimpleSchema.RegEx.IPv4,</strong>
</p>
<p>
<strong>      label: 'IP', </strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  port: {</strong>
</p>
<p>
<strong>      type: Number,</strong>
</p>
<p>
<strong>      label: 'Puerto',</strong>
</p>
<p>
<strong>      min: 1,</strong>
</p>
<p>
<strong>      max: 65534, </strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  details: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Detalles',</strong>
</p>
<p>
<strong>      optional: true, </strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  author: {</strong>
</p>
<p>
<strong>    type: String,</strong>
</p>
<p>
<strong>    label: "Generado por", </strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  createdAt:{</strong>
</p>
<p>
<strong>      type: Date,</strong>
</p>
<p>
<strong>      label: "Creado en", </strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  deploy: {</strong>
</p>
<p>
<strong>      type: Boolean, </strong>
</p>
<p>
<strong>      label: "Borrar", </strong>
</p>
<p>
<strong>      defaultValue: false,</strong>
</p>
<p>
<strong>  }},</strong>
</p>
<p>
<strong>  dontShowThis: {</strong>
</p>
<p>
<strong>      type: Boolean,</strong>
</p>
<p>
<strong>      optional: true,</strong>
</p>
<p>
<strong>      label: "Borrar", </strong>
</p>
<p>
<strong>      defaultValue: false,</strong>
</p>
<p>
<strong>  }}</strong>
</p>
<p>
///////////////////////////////////////////////////////////////////////////////////////
</p>
<p>
<strong>Colección ModbusDeviceClass</strong>
</p>
<p>
<strong>Colleccion ModbusDeviceClass // Lista de clases de dispositivos modbus </strong>
</p>
<p>
<strong>{</strong>
</p>
<p>
<strong>name: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Nombre',</strong>
</p>
<p>
<strong>      optional: false,</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  details: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Detalles',</strong>
</p>
<p>
<strong>      optional: true,</strong>
</p>
<p>
<strong>      autoform: {</strong>
</p>
<p>
<strong>         type: 'textarea'</strong>
</p>
<p>
<strong>      }</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  author: {</strong>
</p>
<p>
<strong>    type: String,</strong>
</p>
<p>
<strong>    label: "Generado por",</strong>
</p>
<p>
<strong>    autoValue: function(){</strong>
</p>
<p>
<strong>        return this.userId;</strong>
</p>
<p>
<strong>    },</strong>
</p>
<p>
<strong>    autoform:{</strong>
</p>
<p>
<strong>        type: "hidden",</strong>
</p>
<p>
<strong>    }</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  createdAt:{</strong>
</p>
<p>
<strong>      type: Date,</strong>
</p>
<p>
<strong>      label: "Creado en",</strong>
</p>
<p>
<strong>      autoValue: function(){</strong>
</p>
<p>
<strong>        return new Date();</strong>
</p>
<p>
<strong>      },</strong>
</p>
<p>
<strong>      autoform:{</strong>
</p>
<p>
<strong>          type: "hidden",</strong>
</p>
<p>
<strong>      }</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  dontShowThis: {</strong>
</p>
<p>
<strong>      type: Boolean,</strong>
</p>
<p>
<strong>      optional: true,</strong>
</p>
<p>
<strong>      label: "Borrar",</strong>
</p>
<p>
<strong>      autoform:{</strong>
</p>
<p>
<strong>          type: "hidden",</strong>
</p>
<p>
<strong>      },</strong>
</p>
<p>
<strong>      defaultValue: false,</strong>
</p>
<p>
<strong>  }</strong>
</p>
<p>
<strong>} </strong>
</p>
<p>

</p>
<p>
///////////////////////////////////////////////////////////////////////////////////////
</p>
<p>
<strong>Colección DataGroups</strong>
</p>
<p>
<strong>Colleccion DataGroups // Lista de Grupos de variables  </strong>
</p>
<p>
<strong>{</strong>
</p>
<p>
<strong>  tag: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      regEx: /^[a-z0-9A-Z_]{3,15}$/,</strong>
</p>
<p>
<strong>      label: 'Nombre (en sistema)',</strong>
</p>
<p>
<strong>      optional: false,</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  name: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Nombre',</strong>
</p>
<p>
<strong>      optional: false,</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  classd: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Clase', </strong>
</p>
<p>
<strong>      optional: true, </strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  details: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Detalles',</strong>
</p>
<p>
<strong>      optional: true, </strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  author: {</strong>
</p>
<p>
<strong>    type: String,</strong>
</p>
<p>
<strong>    label: "Generado por", </strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  createdAt:{</strong>
</p>
<p>
<strong>      type: Date,</strong>
</p>
<p>
<strong>      label: "Creado en", </strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  dontShowThis: {</strong>
</p>
<p>
<strong>      type: Boolean,</strong>
</p>
<p>
<strong>      optional: true,</strong>
</p>
<p>
<strong>      label: "Borrar", </strong>
</p>
<p>
<strong>      defaultValue: false,</strong>
</p>
<p>
<strong>  }</strong>
</p>
<p>
<strong>} </strong>
</p>
<p>
///////////////////////////////////////////////////////////////////////////////////////
</p>
<p>
<strong>Colección ModbusVar</strong>
</p>
<p>
<strong>Colleccion ModbusVar // Lista de variables, ligadas a un grupo, el cual esta ligado a una clase</strong>
</p>
<p>
<strong>{</strong>
</p>
<p>
<strong>tag: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      regEx: /^[a-z0-9A-Z_]{3,15}$/,</strong>
</p>
<p>
<strong>      label: 'Nombre (en sistema)',</strong>
</p>
<p>
<strong>      optional: false,</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  name: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Nombre',</strong>
</p>
<p>
<strong>      optional: false,</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  groupid: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Id Grupo',</strong>
</p>
<p>
<strong>      optional: false,</strong>
</p>
<p>
<strong>      autoform:{</strong>
</p>
<p>
<strong>          type: "hidden",</strong>
</p>
<p>
<strong>      }</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  modbusdataaddress: {</strong>
</p>
<p>
<strong>      type: Number,</strong>
</p>
<p>
<strong>      label: 'Modbus Data Address',</strong>
</p>
<p>
<strong>      optional: false,</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  type: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Tipo de Variable',</strong>
</p>
<p>
<strong>      optional: true,</strong>
</p>
<p>
<strong>      autoform: {</strong>
</p>
<p>
<strong>         type: 'select',</strong>
</p>
<p>
<strong>         options: function(){return[</strong>
</p>
<p>
<strong>                                    {</strong>
</p>
<p>
<strong>                                            optgroup: "Holding Register",</strong>
</p>
<p>
<strong>                                            options: [</strong>
</p>
<p>
<strong>                                                {label: "uint1 [byte 0]", value: "uint1.0.h"},</strong>
</p>
<p>
<strong>                                                {label: "uint1 [byte 1]", value: "uint1.1.h"},</strong>
</p>
<p>
<strong>                                                {label: "sint1 [byte 0]", value: "sint1.0.h"},</strong>
</p>
<p>
<strong>                                                {label: "sint1 [byte 1]", value: "sint1.1.h"},</strong>
</p>
<p>
<strong>                                                {label: "uint 2 bytes", value: "uint2.h"},</strong>
</p>
<p>
<strong>                                                {label: "sint 2 bytes", value: "sint2.h"},</strong>
</p>
<p>
<strong>                                            ]</strong>
</p>
<p>
<strong>                                    },{</strong>
</p>
<p>
<strong>                                            optgroup: "Input Register",</strong>
</p>
<p>
<strong>                                            options: [</strong>
</p>
<p>
<strong>                                                {label: "uint1 [byte 0]", value: "uint1.0.i"},</strong>
</p>
<p>
<strong>                                                {label: "uint1 [byte 1]", value: "uint1.1.i"},</strong>
</p>
<p>
<strong>                                                {label: "sint1 [byte 0]", value: "sint1.0.i"},</strong>
</p>
<p>
<strong>                                                {label: "sint1 [byte 1]", value: "sint1.1.i"},</strong>
</p>
<p>
<strong>                                                {label: "uint 2 bytes", value: "uint2.i"},</strong>
</p>
<p>
<strong>                                                {label: "sint 2 bytes", value: "sint2.i"},</strong>
</p>
<p>
<strong>                                            ]</strong>
</p>
<p>
<strong>                                    },{</strong>
</p>
<p>
<strong>                                            optgroup: "Discretos (Coil/Input)",</strong>
</p>
<p>
<strong>                                            options: [</strong>
</p>
<p>
<strong>                                                {label: "Coil", value: "coil"},</strong>
</p>
<p>
<strong>                                                {label: "input", value: "bitinput"},</strong>
</p>
<p>
<strong>                                            ]</strong>
</p>
<p>
<strong>                                    },{</strong>
</p>
<p>
<strong>                                              optgroup: "String",</strong>
</p>
<p>
<strong>                                              options: [</strong>
</p>
<p>
<strong>                                                  {label: "String(2 bytes)", value: "string2"},</strong>
</p>
<p>
<strong>                                              ]</strong>
</p>
<p>
<strong>                                     }</strong>
</p>
<p>
<strong>                                  ]</strong>
</p>
<p>
<strong>                            }</strong>
</p>
<p>
<strong>      }</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  meassureunit: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Unidad',</strong>
</p>
<p>
<strong>      optional: true,</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  defaultval: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Valor por defecto (si es discreto: 1 o 0)',</strong>
</p>
<p>
<strong>      optional: true,</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  onFront: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: "Mostrar en Dashboard",</strong>
</p>
<p>
<strong>      optional: false,</strong>
</p>
<p>
<strong>      autoform: {</strong>
</p>
<p>
<strong>         type: 'select',</strong>
</p>
<p>
<strong>         options: function(){return[{label:"Mostrar en Dashboard",value:"true"},{label:"Ver solo dentro del Elemento",value:"false"}]}</strong>
</p>
<p>
<strong>      }</strong>
</p>
<p>
<strong>   },</strong>
</p>
<p>
<strong>   toLog: {</strong>
</p>
<p>
<strong>       type: String,</strong>
</p>
<p>
<strong>       label: "Guardar mediciones en log",</strong>
</p>
<p>
<strong>       optional: false,</strong>
</p>
<p>
<strong>       autoform: {</strong>
</p>
<p>
<strong>          type: 'select',</strong>
</p>
<p>
<strong>          options: function(){return[{label:"Guardar en log",value:"true"},{label:"No guardar en log",value:"false"}]}</strong>
</p>
<p>
<strong>       },</strong>
</p>
<p>
<strong>       defaultValue: "false",</strong>
</p>
<p>
<strong>    },</strong>
</p>
<p>
<strong> alarm: {</strong>
</p>
<p>
<strong>       type: String,</strong>
</p>
<p>
<strong>       label: "Generar Alarma",</strong>
</p>
<p>
<strong>       optional: false,</strong>
</p>
<p>
<strong>       autoform: {</strong>
</p>
<p>
<strong>          type: 'select',</strong>
</p>
<p>
<strong>          options: function(){return[{label:"No Alarmar",value:"false"},{label:"Alarmar",value:"true"}]}</strong>
</p>
<p>
<strong>       }</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>normalmax: {</strong>
</p>
<p>
<strong>    type: Number,</strong>
</p>
<p>
<strong>    label: "Maximo Aceptable (para alarmas) usar 1 o 0 para tipo bit",</strong>
</p>
<p>
<strong>    defaultValue: 9999999,</strong>
</p>
<p>
<strong>    optional: true</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  normalmin: {</strong>
</p>
<p>
<strong>     type: Number,</strong>
</p>
<p>
<strong>     label: "Minimo aceptable (para alarmas), no usado para tipo bit",</strong>
</p>
<p>
<strong>     defaultValue: -999999,</strong>
</p>
<p>
<strong>     optional: true</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  readonly: {</strong>
</p>
<p>
<strong>       type: String,</strong>
</p>
<p>
<strong>       label: "Solo lectura",</strong>
</p>
<p>
<strong>       optional: false,</strong>
</p>
<p>
<strong>       autoform: {</strong>
</p>
<p>
<strong>          type: 'select',</strong>
</p>
<p>
<strong>          options: function(){return[{label:"Solo Lectura",value:"true"},{label:"Lectura y escritura",value:"false"}]}</strong>
</p>
<p>
<strong>       }</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  formulak: {</strong>
</p>
<p>
<strong>    type: Number,</strong>
</p>
<p>
<strong>    label: "Ecuacion(Constante)",</strong>
</p>
<p>
<strong>    defaultValue: 0,</strong>
</p>
<p>
<strong>    optional: true</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  formulaA: {</strong>
</p>
<p>
<strong>     type: Number,</strong>
</p>
<p>
<strong>     label: "Ecuacion(pendiente)",</strong>
</p>
<p>
<strong>     defaultValue: 1,</strong>
</p>
<p>
<strong>     optional: true</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  formulaN: {</strong>
</p>
<p>
<strong>      type: Number,</strong>
</p>
<p>
<strong>      label: "Ecuacion(potencia)",</strong>
</p>
<p>
<strong>      defaultValue: 1,</strong>
</p>
<p>
<strong>      optional: true</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  details: {</strong>
</p>
<p>
<strong>      type: String,</strong>
</p>
<p>
<strong>      label: 'Detalles',</strong>
</p>
<p>
<strong>      optional: true,</strong>
</p>
<p>
<strong>      autoform: {</strong>
</p>
<p>
<strong>         type: 'textarea'</strong>
</p>
<p>
<strong>      }</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  author: {</strong>
</p>
<p>
<strong>    type: String,</strong>
</p>
<p>
<strong>    label: "Generado por",</strong>
</p>
<p>
<strong>    autoValue: function(){</strong>
</p>
<p>
<strong>        return this.userId;</strong>
</p>
<p>
<strong>    },</strong>
</p>
<p>
<strong>    autoform:{</strong>
</p>
<p>
<strong>        type: "hidden",</strong>
</p>
<p>
<strong>    }</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  createdAt:{</strong>
</p>
<p>
<strong>      type: Date,</strong>
</p>
<p>
<strong>      label: "Creado en",</strong>
</p>
<p>
<strong>      autoValue: function(){</strong>
</p>
<p>
<strong>        return new Date();</strong>
</p>
<p>
<strong>      },</strong>
</p>
<p>
<strong>      autoform:{</strong>
</p>
<p>
<strong>          type: "hidden",</strong>
</p>
<p>
<strong>      }</strong>
</p>
<p>
<strong>  },</strong>
</p>
<p>
<strong>  dontShowThis: {</strong>
</p>
<p>
<strong>      type: Boolean,</strong>
</p>
<p>
<strong>      optional: true,</strong>
</p>
<p>
<strong>      label: "Borrar",</strong>
</p>
<p>
<strong>      autoform:{</strong>
</p>
<p>
<strong>          type: "hidden",</strong>
</p>
<p>
<strong>      },</strong>
</p>
<p>
<strong>      defaultValue: false,</strong>
</p>
<p>
<strong>  }</strong>
</p>
<p>
<strong>} </strong>
</p>
<p>
<strong>Nota: no se utilizan nested documents en estas configuraciones, para facilitar su uso en el backend.</strong>
</p>
<p>
<strong>ANEXO B:</strong>
</p>
<p>
<strong>Ejemplo TOPICS</strong>
</p>



<pre class="prettyprint">Dispositivo con id= "test", control de un ventilador
</pre>


<p>
///////////////////////////////////////////////////////////////////////////////////////
</p>
<p>
<strong>METADATA</strong>
</p>



<pre class="prettyprint">-----------

  "topic": "symbiot/____DOLF/__dev/test/__meta/__content",

  "message": {
    "elements": {
      "__id": "test",
      "__name": "Objeto prueba",
      "__details": "por definir"
    },
    "secondaryInfo": [
      {
        "groupname": "ParametrosRed",
        "varname": "deviceModbusAddress"
      },
      {
        "groupname": "ParametrosRed",
        "varname": "deviceModemAddress"
      },
      {
        "groupname": "ParametrosRed",
        "varname": "deviceIPAddress"
      }
    ],
    "controls": [
      {
        "groupname": "controles",
        "varname": "relayVentilador"
      }
    ]
  }

----------
</pre>


<p>

</p>
<p>
///////////////////////////////////////////////////////////////////////////////////////
</p>
<p>
<strong>VAR PARAMS</strong>
</p>



<pre class="prettyprint">variable de control relay, id de ejemplo = qBwYB2bjKjNMCBe8w
-----------
__class

topic: symbiot/____DOLF/__dev/qBwYB2bjKjNMCBe8w/__group/controles/__var/relayVentilador/__class,
message: boolean

----------
__current

topic: symbiot/____DOLF/__dev/qBwYB2bjKjNMCBe8w/__group/controles/__var/relayVentilador/__current,
message: false

----------
__unit

topic: symbiot/____DOLF/__dev/qBwYB2bjKjNMCBe8w/__group/controles/__var/relayVentilador/__unit,
message: " "

----------
__set

topic: symbiot/____DOLF/__dev/qBwYB2bjKjNMCBe8w/__group/controles/__var/relayVentilador/__set,
message: __null

----------
__name

topic: symbiot/____DOLF/__dev/qBwYB2bjKjNMCBe8w/__group/controles/__var/relayVentilador/__name,
message: Activar Ventilador
</pre>


<p>

</p>



<pre class="prettyprint">__max

topic: symbiot/____DOLF/__dev/qBwYB2bjKjNMCBe8w/__group/controles/__var/relayVentilador/__max,
message: 1

__min

topic: symbiot/____DOLF/__dev/qBwYB2bjKjNMCBe8w/__group/controles/__var/relayVentilador/__min,
message: 0

DOCUMENTO DE COLECCIÓN DE VARIABLE ASOCIADA
{
	"_id": "N7TKeQGayk6huynv8",
	"tag": "sampleVar",
	"name": "Sample Relay",
	"modbusdataaddress": 1,
	"type": "coil",
	"defaultval": "0",
	"onFront": "true",
	"toLog": "true",
	"readonly": "false",
	"alarm": true,
	"normalmax": 1,
	"normalmin":0,
	"formulak": 0,
	"formulaA": 1,
	"formulaN": 1,
	"details": "Relay de prueba",
	"groupid": "mEgRPTWFqvXdrRALp",
	"author": "wmCRwDmnD2FdgSFeD",
	"createdAt": {
		"$date": "2019-11-15T19:37:03.001Z"
	},
	"dontShowThis": false  
}

GRUPO AL QUE PERTENECE
{
	"_id": "mEgRPTWFqvXdrRALp",
	"tag": "Datos",
	"name": "test",
	"details": "a",
	"classd": "xeNpYx6NgQzx8Acch",
	"author": "ogxxA43mAk774TzNQ",
	"createdAt": {
		"$date": "2019-09-23T18:05:21.726Z"
	},
	"dontShowThis": false
}

CLASE A LA QUE PERTENECE

{
	"_id": "xeNpYx6NgQzx8Acch",
	"name": "Test Class 2",
	"details": "a new test class",
	"author": "HafRYGj6MHKBxM89Y",
	"createdAt": {
		"$date": "2019-09-09T13:43:09.442Z"
	},
	"dontShowThis": false
}

DEFINICIÓN DEL EQUIPO DE EJEMPLO CON SU CLASE CONFIGURADA

{
	"_id": "qBwYB2bjKjNMCBe8w",
	"devicetag": "testing",
	"devicename": "Testing",
	"classd": "xeNpYx6NgQzx8Acch",
	"mbaddress": 1,
	"ip": "127.0.0.1",
	"port": 2001,
	"details": "testing device",
	"author": "wmCRwDmnD2FdgSFeD",
	"createdAt": {
		"$date": "2019-11-15T19:09:17.039Z"
	},
	"dontShowThis": false
}
