Vue.component('star-rating', VueStarRating.default);

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

var app = new Vue({
  el: '#app',
  data: {
    number: '',
    max: '',
    current: {},
    loading: true,
    addedName: '',
    addedComment: '',
    comments: {},
    rating: 0,
    averageRatings: {},
    avgRating: 0,
  },
  computed: {
    month: function() {
      var month = new Array;
      if (this.current.month === undefined)
	      return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    }
  },
  watch: {
    number: function(value,oldvalue) {
      if (oldvalue === '') {
	       this.max = value;
      } else {
	       this.xkcd();
      }
    },
  },
  created: function() {
    this.xkcd();
  },
  methods: {
    xkcd: function() {
      this.loading = true;
      fetch('https://xkcd.now.sh/' + this.number).then(response => {
	       return response.json();
      }).then(json => {
	      this.current = json;
	      this.loading = false;
	      this.number = json.num;
	      return true;
      }).catch(err => {
        this.number = this.max;
      });
    },
    previousComic: function() {
      if (this.number !== 1)
        this.number = this.current.num - 1;
    },
    nextComic: function() {
      this.number = this.current.num + 1;
    },
    getRandom: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
    },
    randomComic: function() {
      this.number = this.getRandom(1, this.max);
    },
    addComment: function() {
      if (!(this.number in this.comments))
	     Vue.set(app.comments, this.number, new Array);
      var d = new Date();
      currentDate = d.getFullYear() + "/" + zeroPad(d.getMonth(),2) + "/" + zeroPad(d.getDate()) + " " + d.getHours() +":"+ zeroPad(d.getMinutes(),2);
      this.comments[this.number].push({author:this.addedName,text:this.addedComment, dateTime:currentDate});
      this.addedName = '';
      this.addedComment = '';
    },
    firstComic: function() {
      this.number = 1;
    },
    lastComic: function() {
      this.number = this.max;
    },
    addRating: function() {
      if (!(this.number in this.averageRatings))
        Vue.set(app.averageRatings, this.number, {total: 0, number: 0, average: 0});

      this.averageRatings[this.number].total = this.averageRatings[this.number].total + this.rating;
      this.averageRatings[this.number].number = this.averageRatings[this.number].number + 1;
      this.averageRatings[this.number].average = this.averageRatings[this.number].total / this.averageRatings[this.number].number;

      this.avgRating = this.averageRatings[this.number].average;
    }
  }
});
