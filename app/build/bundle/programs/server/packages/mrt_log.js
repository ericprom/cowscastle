(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;

/* Package-scope variables */
var Logger;

(function(){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/mrt_log/packages/mrt_log.js                                    //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
(function () {                                                             // 1
                                                                           // 2
///////////////////////////////////////////////////////////////////////    // 3
//                                                                   //    // 4
// packages/mrt:log/log.js                                           //    // 5
//                                                                   //    // 6
///////////////////////////////////////////////////////////////////////    // 7
                                                                     //    // 8
var clivas = Npm.require('clivas'),                                  // 1  // 9
      util = Npm.require('util');                                    // 2  // 10
                                                                     // 3  // 11
/*                                                                   // 4  // 12
  Logger                                                             // 5  // 13
 */                                                                  // 6  // 14
Logger = {                                                           // 7  // 15
  _appName: Meteor.settings && Meteor.settings.app_name || 'Meteor', // 8  // 16
  _logs: {                                                           // 9  // 17
    error: {                                                         // 10
      color: "red",                                                  // 11
      enabled: true                                                  // 12
    },                                                               // 13
    debug: {                                                         // 14
      color: "cyan",                                                 // 15
      enabled: false                                                 // 16
    }                                                                // 17
  },                                                                 // 18
  addLogType: function(name, color) {                                // 19
    if (name && color) {                                             // 20
      this._logs[name] = {                                           // 21
        color: color,                                                // 22
        enabled: true                                                // 23
      }                                                              // 24
    } else {                                                         // 25
      this.log('error', 'Problem with addLogType method call');      // 26
      return false;                                                  // 27
    }                                                                // 28
  },                                                                 // 29
  enableLog: function(type) {                                        // 30
    if (!this._logs[type]) {                                         // 31
      return this._logs[type] = {                                    // 32
        color: "blue",                                               // 33
        enabled: true                                                // 34
      };                                                             // 35
    } else {                                                         // 36
      return this._logs[type].enabled = true;                        // 37
    }                                                                // 38
  },                                                                 // 39
  disableLog: function(type) {                                       // 40
    return this._logs[type].enabled = false;                         // 41
  },                                                                 // 42
  log: function(type, message, value) {                              // 43
    if (this._logs[type] && this._logs[type].enabled) {              // 44
      if (!value) {                                                  // 45
        if (_.isObject(message)) {                                   // 46
          message = "\n" + util.inspect(message, false, null);       // 47
          return clivas.line("{green+bold: " + this._appName + "}{" + this._logs[type].color + ": [" + type + "]}" + message);
        } else {                                                     // 49
          return clivas.line("{green+bold: " + this._appName + "}{" + this._logs[type].color + ": [" + type + "]}{white: " + message + "}");
        }                                                            // 51
      } else {                                                       // 52
        if (_.isObject(value)) {                                     // 53
          value = "\n" + util.inspect(value, false, null);           // 54
          return clivas.line("{green+bold: " + this._appName + "}{" + this._logs[type].color + ": [" + type + "]}{white: " + message + "}" + value);
        } else {                                                     // 56
          return clivas.line("{green+bold: " + this._appName + "}{" + this._logs[type].color + ": [" + type + "]}{white: " + message + "} :{magenta: " + value + "}");
        }                                                            // 58
      }                                                              // 59
    }                                                                // 60
  },                                                                 // 61
  startup: function() {                                              // 62
    return clivas.line('\u001B[2J\u001B[0;0f{30+green:' + Array(5).join('=') + (" " + this._appName + " ") + Array(50).join('=') + "}");
  }                                                                  // 64
};                                                                   // 65
///////////////////////////////////////////////////////////////////////    // 74
                                                                           // 75
}).call(this);                                                             // 76
                                                                           // 77
/////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:log'] = {
  Logger: Logger
};

})();

//# sourceMappingURL=mrt_log.js.map
