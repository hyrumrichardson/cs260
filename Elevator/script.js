var app = new Vue({
  el: '#app',
  data: {
    floorUp3: false,
    floorUp2: false,
    floorUp1: false,
    floorUp0: false,
    floorDown4: false,
    floorDown3: false,
    floorDown2: false,
    floorDown1: false,
    f4: false,
    f3: false,
    f2: false,
    f1: false,
    f0: false,
    position: 0,
    pixel: 240,
    state: 0, //-1 is going down, 0 is idle, 1 is going up
    isOpen: false,
  },
  computed: {
    styles: function() {
		  return {
			   top: this.pixel + 'px',
		  };
    },
	},
  methods: {
    up3: function() {
      this.floorUp3 = true;
    },
    up2: function() {
      this.floorUp2 = true;
    },
    up1: function() {
      this.floorUp1 = true;
    },
    up0: function() {
      this.floorUp0 = true;
    },
    down4: function() {
      this.floorDown4 = true;
    },
    down3: function() {
      this.floorDown3 = true;
    },
    down2: function() {
      this.floorDown2 = true;
    },
    down1: function() {
      this.floorDown1 = true;
    },

    floor4: function() {
      this.f4 = true;
    },
    floor3: function() {
      this.f3 = true;
    },
    floor2: function() {
      this.f2 = true;
    },
    floor1: function() {
      this.f1 = true;
    },
    floor0: function() {
      this.f0 = true;
    },

    update: function() {
      console.log("update");

      //Door Open Block
      if (this.isOpen) {
        this.doorDelay = this.doorDelay - 1;
        if (this.doorDelay == 0) {
          this.isOpen = false;
          console.log("Doors Close");
          if (!this.hasFloorsInPath()) {
            console.log("Idle");
            this.state = 0;
          }
        }
      }
      //Idle Block
      else if (this.state == 0) {
        var newstate = this.checkFloorButtons(this.position);
        if (newstate > 0) {
          console.log("Going Up");
          this.state = 1;
        }
        else if (newstate < 0) {
          console.log("Going Down");
          this.state = -1;
        }
        else {
          if (this.checkFloorButton(this.position)) {
            this.clearFloor(this.position);
          }
          newstate = this.checkUpDownButtons(this.position);
          if (newstate > 0) {
            console.log("Going Up");
            this.state = 1;
          }
          else if (newstate < 0) {
            console.log("Going Down");
            this.state = -1;
          }
          else {
            if (this.checkFloorUp(this.position))
            {
              this.state = 1;
              this.openDoor();
            }
            if (this.checkFloorDown(this.position))
            {
              this.state = -1;
              this.openDoor();
            }
          }
        }
      }
      //Going Up Block
      else if (this.state == 1) {
        if (this.pixel % 60 == 0) {
          this.position = 4 - (this.pixel / 60);
          console.log("At Floor " + this.position);

          if (this.checkFloorButton(this.position) || this.checkFloorUp(this.position)) {
            return this.openDoor();
          }
          else if (this.checkFloorDown(this.position)) {
            if (!this.hasFloorsInPath(this.position)) {
              for (var i = this.position + 1; i <= 4; i++) {
                if (this.checkFloorDown(i)) {
                  this.moveUp();
                  return;
                }
              }
              this.state = 0;
              return this.openDoor();
            }
          }

          this.moveUp();
        }
        else {
          this.moveUp();
        }
      }
      //Going Down Block
      else if (this.state == -1) {
        if (this.pixel % 60 == 0) {
          this.position = 4 - (this.pixel / 60);
          console.log("At Floor " + this.position);

          if (this.checkFloorButton(this.position) || this.checkFloorDown(this.position)) {
            return this.openDoor();
          }
          else if (this.checkFloorUp(this.position)) {
            if (!this.hasFloorsInPath(this.position)) {
              for (var i = this.position - 1; i >= 0; i--) {
                if (this.checkFloorUp(i)) {
                  this.moveDown();
                  return;
                }
              }
              this.state = 0;
              return this.openDoor();
            }
          }
          this.moveDown();
        }
        else {
          this.moveDown();
        }

      }
    },

    openDoor: function() {
      console.log("Doors Open");
      this.isOpen = true;
      this.doorDelay = 60;
      this.clearFloor(this.position);
      if (this.state == 1) {
        this.clearFloorUp(this.position);
      }
      else if (this.state == -1) {
        this.clearFloorDown(this.position);
      }
      else if (this.state == 0) {
        this.clearFloorUp(this.position);
        this.clearFloorDown(this.position);
      }
    },

    checkFloorButtons: function(position) {
      var min = 5;
      for (var i = 0; i <= 4; i++) {
        if (this.checkFloorUp(i) == true && Math.abs(i - position) < min) {
          min = i - position;
        }
        else if (this.checkFloorDown(i) == true && Math.abs(i - position) < min) {
          min = i - position;
        }
      }

      if (min == 5) {
        return 0;
      }
      else {
        return min;
      }
    },

    checkUpDownButtons: function(position) {
      for (var i = 0; i <= 4; i++) {
        if (this.checkFloorButton(i) == true) {
          //console.log(i - position);
          return i - position;
        }
      }
      return 0;
    },

    hasFloorsInPath: function() {
      if (this.state == 1) {
        for (var i = this.position + 1; i <= 4; i++) {
          if (this.checkFloorButton(i)) {return true;}
          if (this.checkFloorUp(i)) {return true;}
        }
      }
      else if (this.state == -1) {
        for (var i = this.position - 1; i >= 0; i--) {
          if (this.checkFloorButton(i)) {return true;}
          if (this.checkFloorDown(i)) {return true;}
        }
      }
      return false;
    },

    moveUp: function() {
      this.pixel = this.pixel - 1;
    },

    moveDown: function() {
      this.pixel = this.pixel + 1;
    },

    checkFloorButton: function(floornum) {
      switch (floornum) {
        case 0:
          return this.f0;
        case 1:
          return this.f1;
        case 2:
          return this.f2;
        case 3:
          return this.f3;
        case 4:
          return this.f4;
        default:
          return false;
      }
    },

    checkFloorUp: function(floornum) {
      switch (floornum) {
        case 0:
          return this.floorUp0;
        case 1:
          return this.floorUp1;
        case 2:
          return this.floorUp2;
        case 3:
          return this.floorUp3;
        default:
          return false;
      }
    },

    checkFloorDown: function(floornum) {
      switch (floornum) {
        case 1:
          return this.floorDown1;
        case 2:
          return this.floorDown2;
        case 3:
          return this.floorDown3;
        case 4:
          return this.floorDown4;
        default:
          return false;
      }
    },

    clearFloor: function(floornum) {
      console.log("Clearing " + floornum);
      switch (floornum) {
        case 0:
          this.f0 = false;
          break;
        case 1:
          this.f1 = false;
          break;
        case 2:
          this.f2 = false;
          break;
        case 3:
          this.f3 = false;
          break;
        case 4:
          this.f4 = false;
          break;
        default:
      }
    },
    clearFloorUp: function(floornum) {
      console.log("Clearing Up " + floornum);
      switch (floornum) {
        case 0:
          this.floorUp0 = false;
          break;
        case 1:
          this.floorUp1 = false;
          break;
        case 2:
          this.floorUp2 = false;
          break;
        case 3:
          this.floorUp3 = false;
          break;
        default:
      }
    },

    clearFloorDown: function(floornum) {
      console.log("Clearing Down " + floornum);
      switch (floornum) {
        case 1:
          this.floorDown1 = false;
          break;
        case 2:
          this.floorDown2 = false;
          break;
        case 3:
          this.floorDown3 = false;
          break;
        case 4:
          this.floorDown4 = false;
          break;
        default:
      }
    },
  },
});

window.setInterval(function() {
  app.update();
}, 60);
