# Javascript design patterns for both browser and Node.js

Javascript design patterns for both browser and Node.js. I am a customer of text book "Learning JavaScript Design Patterns". I learn javascript design patterns using original source code at [https://github.com/addyosmani/essential-js-design-patterns](https://github.com/addyosmani/essential-js-design-patterns). This project could be an additional support to target audience of the text book and javascript developers who wishing to run my extended code examples.


# Install
```
npm install design-pattern
```
# Usage
* [Facade](#facade)
* [Observer](#observer)
* [Prototype](#prototype)

## <a name="prototype"></a>Prototype pattern
### Implementation example
```javascript
(function(exports){

	exports.getPrototypeBuilder = function(){
		return prototypeBuilder;
	};

  var GLOBAL_MANUFACTURING_SERIAL_CODE = '2015000000',
      GLOBAL_MANUFACTURING_SERIAL = 0,
      GLOBAL_USER_DB = {
                    u0001: 'MyAccount',
                    u0002: 'HerAccount',
                    u0003: 'HisAccount'
                  },
      GLOBAL_APP_DB = {
                    app001: 'NewsReaderApp',
                    app002: 'CameraApp',
                    app003: 'CalculatorApp'
                  },
      GLOBAL_MANUFACTURING_DATABASE = {
         nextPhoneManufacturingSerial: function(){
           GLOBAL_MANUFACTURING_SERIAL++;
           return GLOBAL_MANUFACTURING_SERIAL_CODE +
                  GLOBAL_MANUFACTURING_SERIAL;
         },
         standardPhoneConfigurations: function(){
           return {
              manufacturer: 'DreamPhoneProduction',
              serial: GLOBAL_MANUFACTURING_SERIAL_CODE +
                      GLOBAL_MANUFACTURING_SERIAL,
              model: 'DreamPhone',
              simCard: 'nano',
              width: 400,
              height: 600,
              color: 'white'
            };
         }
     };

var prototypeBuilder = {

  createPhonePrototype: function(userInstanceName){

    var instanceSerial = GLOBAL_MANUFACTURING_DATABASE
                         .nextPhoneManufacturingSerial(),
        instanceStandardContext = GLOBAL_MANUFACTURING_DATABASE
                                    .standardPhoneConfigurations(),
        instanceName = userInstanceName || '';

    console.log('[prototypeBuilder] created phonePrototype instanceSerial=' +
                instanceSerial + ' with standardContext=',
                instanceStandardContext);

    return Object.create(phonePrototype, {
                'serial': {
                  value: instanceSerial,
                  writable: false,
                  enumerable: false,
                  configurable: false
                },
                'standardContext': {
                  value: instanceStandardContext,
                  writable: false,
                  enumerable: false,
                  configurable: false
                },
                'name': {
                  value: instanceName,
                  writable: false,
                  enumerable: false,
                  configurable: false
                },
            });

  }
};

var phonePrototype = {
  specifications: function() {
    var model = this.standardContext.model,
        manufacturer = this.standardContext.manufacturer,
        simCard = this.standardContext.simCard,
        width = this.standardContext.width,
        height = this.standardContext.height,
        specs = {
          serial: this.serial,
          model: model,
          manufacturer: manufacturer,
          simCard: simCard,
          weight: 129, /* gram */
          width: 138, /* mm */
          height: 67 /* mm */
        };

    console.log('[' + this.serial + '] specifications() : ',specs);
    return specs;
  },
  installSimCard: function (specificContext) {
    var simCard = specificContext.simCard || 'undefined',
        processStatus = '';

        if (simCard !== this.standardContext.simCard){
            console.error('[' + this.name + ' ' + this.serial +
                          '] installSimCard() : ' +
                          '  Sim card type = ' +
                          simCard + ' is not supported.');
            processStatus = 'failure';
        }else{
            console.log('[' + this.name + ' ' + this.serial +
                        '] installSimCard() : ' +
                        'Sim card (type=' +
                        simCard + ') has been installed');
            processStatus = 'success';
        }

        return processStatus;
  },
  installApp: function (specificContext) {
    var appStoreUserId = specificContext.appStoreUserId || '',
        appId = specificContext.appId || '',
        processStatus = '',
        appDB = { app001: 'NewsReaderApp' };

    if (!GLOBAL_USER_DB[appStoreUserId]){
        console.error('[' + this.name + ' ' + this.serial +
                      '] installApp() : appStoreUserId = ' +
                      appStoreUserId + ' is not a valid account id.');
        processStatus = 'failure';

    } else if (!GLOBAL_APP_DB[appId]){
        console.error('[' + this.name + ' ' + this.serial +
                      '] installApp() : appId = ' +
                      appId + ' cannot be found in App Store');
        processStatus = 'failure';

    } else {
        console.log('[' + this.name + ' ' + this.serial +
                    '] installApp() : ' +
                    GLOBAL_APP_DB.app001 + ' has been installed');
        processStatus = 'success';
    }

    return processStatus;
  },
  uninstallApp: function (specificContext) {
    var appId = specificContext.appId || '',
        appStoreUserId = specificContext.appStoreUserId || '',
        processStatus = '';

  if (!GLOBAL_USER_DB[appStoreUserId]){
        console.error('[' + this.name + ' ' + this.serial +
                      '] uninstallApp() : appStoreUserId = ' +
                      appStoreUserId + ' is not a valid account id.');
        processStatus = 'failure';

    } else if (!GLOBAL_APP_DB[appId]){
        console.error('[' + this.name + ' ' + this.serial +
                      '] uninstallApp() : appId = ' +
                      appId + ' cannot be found in App Store');
        processStatus = 'failure';

    } else {
        console.log('[' + this.name + ' ' + this.serial +
                    '] uninstallApp() : ' +
                    GLOBAL_APP_DB.app001 + ' has been uninstalled');
        processStatus = 'success';
    }
    return processStatus;
  },
  listAvailableApps: function (specificContext) {
    var appStoreUserId = specificContext.appStoreUserId || '',
        availableApps = {apps: []};

    if (!GLOBAL_USER_DB[appStoreUserId]){
        console.error('[' + this.name + ' ' + this.serial +
                      '] listAvailableApps() : appStoreUserId = ' +
                      appStoreUserId + ' is not a valid account id.');

    } else{
        availableApps = {apps: GLOBAL_APP_DB};
        console.log('[' +this.name + ' ' + this.serial +
                    '] listAvailableApps() : availableApps = ',availableApps);
    }

    return availableApps;
  }
};


}(typeof exports === 'undefined' ? this.prototypePattern = {} : exports));


```
### Node.js
```javascript
var designPatterns = require('design-pattern'),
    prototypePattern =  designPatterns.prototypePattern();

var validPhone = prototypePattern.getPrototypeBuilder().createPhonePrototype('validPhone'),
    validSWConf = {appStoreUserId: 'u0001'},
    validHWConf = {simCard: 'nano'},
    validAppInstallRequest = { appStoreUserId: 'u0001',appId: 'app001'},
    validAppUninstallRequest = { appStoreUserId: 'u0001',appId: 'app001'},

    invalidSimCardPhone = prototypePattern.getPrototypeBuilder()
                          .createPhonePrototype('invalidSimCard'),
    invalidSimCardHWConf = {simCard: 'micro'},

    invalidAppStoreUserPhone = prototypePattern.getPrototypeBuilder()
                          .createPhonePrototype('invalidAppStoreUser'),
    invalidAppStoreUserSWConf = {appStoreUserId: 'unknown'},
    invalidAppStoreUserHWConf = {simCard: 'nano'},
    invalidAppStoreUserAppInstallRequest =
        { appStoreUserId: 'unknown', appId: 'app001'},
    invalidAppStoreUserAppUninstallRequest =
        { appStoreUserId: 'unknown', appId: 'app001'};

validPhone.specifications();
validPhone.installSimCard(validHWConf);
validPhone.listAvailableApps(validSWConf);
validPhone.installApp(validAppInstallRequest);
validPhone.uninstallApp(validAppUninstallRequest);

invalidSimCardPhone.specifications();
invalidSimCardPhone.installSimCard(invalidSimCardHWConf);

invalidAppStoreUserPhone.specifications();
invalidAppStoreUserPhone.installSimCard(invalidAppStoreUserHWConf);
invalidAppStoreUserPhone.listAvailableApps(invalidAppStoreUserSWConf);
invalidAppStoreUserPhone.installApp(invalidAppStoreUserAppInstallRequest);
invalidAppStoreUserPhone.uninstallApp(invalidAppStoreUserAppUninstallRequest);

```

### Browser
```javascript
<script type="text/javascript" src="../src/prototype.js"></script>
<script type="text/javascript">

var validPhone = prototypePattern.getPrototypeBuilder().createPhonePrototype('validPhone'),
    validSWConf = {appStoreUserId: 'u0001'},
    validHWConf = {simCard: 'nano'},
    validAppInstallRequest = { appStoreUserId: 'u0001',appId: 'app001'},
    validAppUninstallRequest = { appStoreUserId: 'u0001',appId: 'app001'},

    invalidSimCardPhone = prototypePattern.getPrototypeBuilder()
                          .createPhonePrototype('invalidSimCard'),
    invalidSimCardHWConf = {simCard: 'micro'},

    invalidAppStoreUserPhone = prototypePattern.getPrototypeBuilder()
                          .createPhonePrototype('invalidAppStoreUser'),
    invalidAppStoreUserSWConf = {appStoreUserId: 'unknown'},
    invalidAppStoreUserHWConf = {simCard: 'nano'},
    invalidAppStoreUserAppInstallRequest =
        { appStoreUserId: 'unknown', appId: 'app001'},
    invalidAppStoreUserAppUninstallRequest =
        { appStoreUserId: 'unknown', appId: 'app001'};

validPhone.specifications();
validPhone.installSimCard(validHWConf);
validPhone.listAvailableApps(validSWConf);
validPhone.installApp(validAppInstallRequest);
validPhone.uninstallApp(validAppUninstallRequest);

invalidSimCardPhone.specifications();
invalidSimCardPhone.installSimCard(invalidSimCardHWConf);

invalidAppStoreUserPhone.specifications();
invalidAppStoreUserPhone.installSimCard(invalidAppStoreUserHWConf);
invalidAppStoreUserPhone.listAvailableApps(invalidAppStoreUserSWConf);
invalidAppStoreUserPhone.installApp(invalidAppStoreUserAppInstallRequest);
invalidAppStoreUserPhone.uninstallApp(invalidAppStoreUserAppUninstallRequest);


</script>

```

### Output
```javascript
[prototypeBuilder] created phonePrototype instanceSerial=20150000001 with standardContext= { manufacturer: 'DreamPhoneProduction',
  serial: '20150000001',
  model: 'DreamPhone',
  simCard: 'nano',
  width: 400,
  height: 600,
  color: 'white' }
[prototypeBuilder] created phonePrototype instanceSerial=20150000002 with standardContext= { manufacturer: 'DreamPhoneProduction',
  serial: '20150000002',
  model: 'DreamPhone',
  simCard: 'nano',
  width: 400,
  height: 600,
  color: 'white' }
[prototypeBuilder] created phonePrototype instanceSerial=20150000003 with standardContext= { manufacturer: 'DreamPhoneProduction',
  serial: '20150000003',
  model: 'DreamPhone',
  simCard: 'nano',
  width: 400,
  height: 600,
  color: 'white' }
[20150000001] specifications() :  { serial: '20150000001',
  model: 'DreamPhone',
  manufacturer: 'DreamPhoneProduction',
  simCard: 'nano',
  weight: 129,
  width: 138,
  height: 67 }
[validPhone 20150000001] installSimCard() : Sim card (type=nano) has been installed
[validPhone 20150000001] listAvailableApps() : availableApps =  { apps:
   { app001: 'NewsReaderApp',
     app002: 'CameraApp',
     app003: 'CalculatorApp' } }
[validPhone 20150000001] installApp() : NewsReaderApp has been installed
[validPhone 20150000001] uninstallApp() : NewsReaderApp has been uninstalled
[20150000002] specifications() :  { serial: '20150000002',
  model: 'DreamPhone',
  manufacturer: 'DreamPhoneProduction',
  simCard: 'nano',
  weight: 129,
  width: 138,
  height: 67 }
[invalidSimCard 20150000002] installSimCard() :   Sim card type = micro is not supported.
[20150000003] specifications() :  { serial: '20150000003',
  model: 'DreamPhone',
  manufacturer: 'DreamPhoneProduction',
  simCard: 'nano',
  weight: 129,
  width: 138,
  height: 67 }
[invalidAppStoreUser 20150000003] installSimCard() : Sim card (type=nano) has been installed
[invalidAppStoreUser 20150000003] listAvailableApps() : appStoreUserId = unknown is not a valid account id.
[invalidAppStoreUser 20150000003] installApp() : appStoreUserId = unknown is not a valid account id.
[invalidAppStoreUser 20150000003] uninstallApp() : appStoreUserId = unknown is not a valid account id.

```

## <a name="facade"></a>Facade pattern

### Implementation example
```javascript
    var ModuleA = function() {
        var name = 'ModuleA',
            _private = {
                pre: function(context) {
                    console.log(name + ' pre',context);
                },
                op1: function(context) {
                    console.log(name + ' op1',context);
                },
                op2: function(context) {
                    console.log(name + ' op2',context);
                },
                op3: function(context) {
                    console.log(name + ' op3',context);
                },
                op4: function(context){
                    console.log(name + ' op4',context);
                },
                op5: function(context){
                    console.log(name + ' op5',context);
                },
                post: function(context) {
                    console.log(name + ' post',context);
                },
            };

        return {

            facade: function(context) {
                _private.pre(context);
                if (context.param1) _private.op1({data: context.param1});
                if (context.param2) _private.op2({data: context.param2});
                if (context.param3) _private.op3({data: context.param3});
                if (context.param4) _private.op4({data: context.param4});
                if (context.param4 > context.param3) {
                    var total = context.param1 + context.param2 +  
                                context.param3 + context.param4;
                    _private.op5({data: total});
                };
                _private.post(context);
            }
        };
    };

    var ModuleB = function() {
        var name = 'ModuleB',
            _private = {
                pre: function(context) {
                    console.log(name + ' pre',context);
                },
                op1: function(context) {
                    console.log(name + ' op1',context);
                },
                op2: function(context) {
                    console.log(name + ' op2',context);
                },
                op3: function(context) {
                    console.log(name + ' op3',context);
                },
                op4: function(context) {
                    console.log(name + ' op4',context);
                },
                post: function(context) {
                    console.log(name + ' post',context);
                },
            };

        return {

            facade: function(context) {
                _private.pre(context);

                if (context.param1){
                     _private.op1({data: context.param1});
                };

                if (context.param2){
                     _private.op2({data: context.param2});
                };

                if (context.param3){
                     _private.op3({data: context.param3});
                };

                if (context.param1 && context.param2 && context.param3){
                    var data = context.param1 + context.param2 + context.param3;
                     _private.op4({data: data});
                };

                _private.post(context);
            }
        };
    };
```
### Node.js
```javascript
var designPatterns = require('design-pattern'),
    facadePattern =  designPatterns.facadePattern(),
    moduleA = facadePattern.moduleA(),
    contextA = {param1: 10, param2: 20, param3: 30, param4: 40},
    moduleB = facadePattern.moduleB(),
    contextB = {param1: 'A', param2: 'B', param3: 'C'};

moduleA.facade(contextA);
moduleB.facade(contextB);

```

### Browser
```javascript
<script type="text/javascript" src="../src/facade.js"></script>
<script type="text/javascript">

var moduleA = facadePattern.moduleA(),
    contextA = {param1: 10, param2: 20, param3: 30, param4: 40},
    moduleB = facadePattern.moduleB(),
    contextB = {param1: 'A', param2: 'B', param3: 'C'};

moduleA.facade(contextA);
moduleB.facade(contextB);

</script>

```

### Output
```javascript
ModuleA pre { param1: 10, param2: 20, param3: 30, param4: 40 }
ModuleA op1 { data: 10 }
ModuleA op2 { data: 20 }
ModuleA op3 { data: 30 }
ModuleA op4 { data: 40 }
ModuleA op5 { data: 100 }
ModuleA post { param1: 10, param2: 20, param3: 30, param4: 40 }
ModuleB pre { param1: 'A', param2: 'B', param3: 'C' }
ModuleB op1 { data: 'A' }
ModuleB op2 { data: 'B' }
ModuleB op3 { data: 'C' }
ModuleB op4 { data: 'ABC' }
ModuleB post { param1: 'A', param2: 'B', param3: 'C' }
```

## <a name="observer"></a>Observer pattern

### Node.js
```javascript
var designPatterns = require('design-pattern'),
    observerPattern =  designPatterns.observerPattern();

var subject = observerPattern.createSubject();

var MyObserverClass = function(id){
	this.id = id;
	this.update = function(context){
	  console.log('Observer(' + this.id + ') context',context);
	};
};

var observer1 = new MyObserverClass(1);
var observer2 = new MyObserverClass(2);

subject.addObserver(observer1);
subject.addObserver(observer2);

var context = {data: 'data'};
subject.notify(context);
```

### Browser
```javascript
<script type="text/javascript" src="../src/observer.js"></script>
<script type="text/javascript">

var subject = new observerPattern.createSubject();

var MyObserverClass = function(id){
	this.id = id;
	this.update = function(context){
	  console.log('Observer(' + this.id + ') context',context);
	};
};

var observer1 = new MyObserverClass(1);
var observer2 = new MyObserverClass(2);

subject.addObserver(observer1);
subject.addObserver(observer2);

var context = {data: 'data'};
subject.notify(context);

</script>
```

### Output
```javascript
Observer(1) context { data: 'data' }
Observer(2) context { data: 'data' }
```

# License

This project is released under a Creative Commons Attribution-Noncommercial- No Derivative Works 3.0 License.

What this means it that the project is free to read and use, but the license does not permit commercial use of the material.

Copyright Vorachet Jaronesawas, 2015.
