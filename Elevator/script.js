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
    idle: true,
    pixel: 240,
    goingUp: true,
  },
  computed: {
    styles: function() {
		return {
			top: this.pixel + 'px',
		};
    }
	},
  methods: {
    up3: function() {
      this.floorUp3 = !this.floorUp3;
      if (this.idle && this.floorUp3) {
        this.checkButton(3);
      }
    },
    up2: function() {
      this.floorUp2 = !this.floorUp2;
      if (this.idle && this.floorUp2) {
        this.checkButton(2);
      }
    },
    up1: function() {
      this.floorUp1 = !this.floorUp1;
      if (this.idle && this.floorUp1) {
        this.checkButton(1);
      }
    },
    up0: function() {
      this.floorUp0 = !this.floorUp0;
      if (this.idle && this.floorUp0) {
        this.checkButton(0);
      }
    },
    down4: function() {
      this.floorDown4 = !this.floorDown4;
      if (this.idle && this.floorDown4) {
        this.checkButton(4);
      }
    },
    down3: function() {
      this.floorDown3 = !this.floorDown3;
      if (this.idle && this.floorDown3) {
        this.checkButton(3);
      }
    },
    down2: function() {
      this.floorDown2 = !this.floorDown2;
      if (this.idle && this.floorDown2) {
        this.checkButton(2);
      }
    },
    down1: function() {
      this.floorDown1 = !this.floorDown1;
      if (this.idle && this.floorDown1) {
        this.checkButton(1);
      }
    },

    floor4: function() {
      this.f4 = !this.f4;
      if (this.idle && this.f4) {
        this.checkButton(4);
      }
    },
    floor3: function() {
      this.f3 = !this.f3;
      if (this.idle && this.f3) {
        this.checkButton(3);
      }
    },
    floor2: function() {
      this.f2 = !this.f2;
      if (this.idle && this.f2) {
        this.checkButton(2);
      }
    },
    floor1: function() {
      this.f1 = !this.f1;
      if (this.idle && this.f1) {
        this.checkButton(1);
      }
    },
    floor0: function() {
      this.f0 = !this.f0;
      if (this.idle && this.f0) {
        this.checkButton(0);
      }
    },

    idling: function() {
      this.idle = true;
    },

    goUp: function() {
      console.log("Going Up");
      this.idle = false;
      this.goingUp = true;
      this.animateUp();
      this.position = this.position + 1;

      console.log(this.position);

      var millisecondsToWait = 500;
      var self = this;
      setTimeout(function() {
        self.clearFloor(self.position);
      }, millisecondsToWait);

      if (this.checkUp(this.position)) {
        this.goUp();
      }
      else if (this.checkDown(this.position)) {
        this.goDown();
      }
      else {
        this.idle = true;
      }
    },

    goDown: function() {
      this.idle = false;
      this.goingUp = false;
      this.animateDown();
      this.position = this.position - 1;

      this.checkDown(this.position);

      var millisecondsToWait = 500;
      var self = this;
      setTimeout(function() {
        self.clearFloor(self.position);
      }, millisecondsToWait);

      if (this.checkDown(this.position)) {
        this.goDown();
      }
      if (this.checkUp(this.position)) {
        this.goUp();
      }
      else {
        this.idle = true;
      }
    },

    checkButton: function(floor) {
      var millisecondsToWait = 500;
      var self = this;
      setTimeout(function() {
        self.clearFloor(self.position);
      }, millisecondsToWait);
      
      if (this.position < floor) {
        this.goingUp = true;
        this.goUp();
      }
      if (this.position > floor) {
        this.goingUp = false;
        this.goDown();
      }
    },

    checkUp: function(pos) {
      for (i = pos + 1; i <= 4; i++) {
        if (this.checkFloor(i)) { return true;}
        if (this.checkFloorUp(i)) { return true;}
        if (this.checkFloorDown(i)) { return true;}
      }
      return false;
    },

    checkDown: function(pos) {
      for (i = pos - 1; i >= 0; i--) {
        if (this.checkFloor(i)) {return true;}
        if (this.checkFloorDown(i)) { return true;}
        if (this.checkFloorUp(i)) { return true;}
      }
      return false;
    },

    animateUp: function() {
      var self = this;
      for (i = 0; i < 60; i++) {
        var millisecondsToWait = 500;
        setTimeout(function() {
          self.pixel = self.pixel - 1;
        }, millisecondsToWait);
      }
    },
    animateDown: function() {
      var self = this;
      for (i = 0; i < 60; i++) {
        var millisecondsToWait = 500;
        setTimeout(function() {
          self.pixel = self.pixel + 1;
        }, millisecondsToWait);
      }
    },

    checkFloor: function(floornum) {

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
      console.log("clearing" + floornum);
      switch (floornum) {
        case 0:
          this.f0 = false;
          this.floorUp0 = false;
        case 1:
          this.f1 = false;
          if (this.goingUp) {
            this.floorUp1 = false;
          }
          else {
            this.floorDown1 = false;
          }
        case 2:
          this.f2 = false;
          if (this.goingUp) {
            this.floorUp2 = false;
          }
          else {
            this.floorDown2 = false;
          }
        case 3:
          this.f3 = false;
          if (this.goingUp) {
            this.floorUp3 = false;
          }
          else {
            this.floorDown3 = false;
          }
        case 4:
          this.f4 = false;
          this.floorDown4 = false;
        default:
      }
    }
  },
});
