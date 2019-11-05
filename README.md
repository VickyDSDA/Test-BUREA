#Aplicación tablero de tareas - Test BUREA

Para esta aplicación es necesario instalar mongoDB ya que las tareas del talero son almacenadas en una base de datos llamada DB_TestBUREA.

En este link https://www.mongodb.com/download-center hay que registrarse para poder descargar el arquivo .msi e intalarlo.
Ya instalado, para crear la ruta de la Base de datos es necesario ejecurar los siguientes comandos en consola
```cd C:\```
```md "\data\db"```
```"C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\DB_TestBUREA"```
Ya con esto estaria corriendo mongoDB y se debe mantener esa consola abierta.

PD: Este proceso es para sistema operativo windows para macOS u otros sistemas operativos basados en Unix, algunas cosas cambiarian. Dejo aqui el link donde se puede observar la instalación para distintos sistemas operativos https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

Ok, luego de tener mongoDB ya instalado y ejecutandose

Se ejecuta en la consola ```npm install``` para instalar las dependencias, estando en el directorio raiz del proyecto.

Y ```node server/server``` 

Con esto ya estaria corriendo la aplicación y solo quedaria entrar al navegador e ir a esta URL: http://localhost:3000/ 

#Video de la aplicación

link: https://www.loom.com/share/690f8b39f11745ba848f45b11c00340c


