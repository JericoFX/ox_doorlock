## ⚠️ Notice

This version of `ox_doorlock` has been modified to improve compatibility with the latest version of `qb-core`. It is based on a prior QB-compatible version but updated.

Please be aware that `ox_doorlock` is the property of the Overextended team and remains under its original license. All changes in this version aim to retain core functionality while adapting it for modern `qb-core` environments.

**Note:** The Overextended team does not provide support for `qb-core`, and this project has been archived. Please avoid contacting them regarding this modified version.

# Ox Doorlock


![](https://img.shields.io/github/downloads/TheOrderFivem/ox_doorlock/total?logo=github)
![](https://img.shields.io/github/downloads/TheOrderFivem/ox_doorlock/latest/total?logo=github)
![](https://img.shields.io/github/contributors/TheOrderFivem/ox_doorlock?logo=github)
![](https://img.shields.io/github/v/release/TheOrderFivem/ox_doorlock?logo=github) 


Door management resource, with compatibility for [ox_core](https://github.com/communityox/ox_core), [qb-core](https://github.com/qbcore-framework/qb-core), [es_extended](https://github.com/esx-framework/esx_core), [nd_core](https://github.com/ND-Framework/ND_Core), and [qbox](https://github.com/Qbox-project/qbx_core).  
Successor to nui_doorlock with less scuff and more stuff.

_The UI needs to be built - use the [latest release](https://github.com/TheOrderFivem/ox_doorlock/releases/latest/download/ox_doorlock.zip) if you want to drag-n-drop._

## Features

### Core Functionality
- Door management with state persistence
- Support for single and double doors
- Authorization via characters, groups, items, and key items
- Password-protected doors
- Automatic door locking with configurable timers
- Lockpicking system with configurable difficulty
- Alarm system with hacking minigames
- Sound customization for lock/unlock events
- Distance-based interaction
- Administrative controls

### Security System
- **Key Items**: Specific items that can open doors without removing them from inventory
- **Alarm System**: Configurable alarm that can be hacked using ox_lib skill checks
- **Hack Difficulty**: Customizable minigame difficulty for alarm hacking
- **Lockpicking**: Traditional lockpicking with breakable tools

### User Interface
- Modern web-based configuration interface
- Real-time door creation and editing
- Visual feedback for door states
- Organized settings tabs for easy management
- Security tab for alarm and key item configuration

## Dependencies

### [oxmysql](https://github.com/communityox/oxmysql)

Doors are stored in a database for ease-of-use and to allow data to be easily cleared or shared.

mysql-async is no longer supported.
  - does not support error-catching (pcall)
  - people use older versions which do not support parameters as arrays
  - it isn't maintained and has issues that will never be resolved

### [ox_lib](https://github.com/communityox/ox_lib) (v2.3.0 or higher)

Used for some UI elements (i.e. notifications, progress circle, input), cache, and skill check minigames.

### [ox_target](https://github.com/TheOrderFivem/ox_target) (preferred) or [qb-target](https://github.com/qbcore-framework/qb-target) or [qtarget](https://github.com/overextended/qtarget) (deprecated)

(Optional) Used for lockpicking and alarm hacking.
