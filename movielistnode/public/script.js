var app = new Vue({
  el: '#app',
  data: {
    movies: [],
    search: '',
    show: 'all',
    drag: {},
    selecting: false,
    searchResults: [],
  },
  created: function() {
    this.getItems();
  },
  computed: {
    activemovies: function() {
      return this.movies.filter(function(item) {
	       return !item.completed;
      });
    },
    filteredmovies: function() {
      if (this.show === 'active')
	     return this.movies.filter(function(item) {
	     return !item.completed;
	    });
      if (this.show === 'completed')
	     return this.movies.filter(function(item) {
	        return item.completed;
	     });
      return this.movies;
    },
    /*searchResults: function() {
      console.log(2);
      console.log(this.results);
      console.log(this.selecting);

      return this.results;
    },*/
  },
  methods: {
    getItems: function() {
      axios.get("/api/items").then(response => {
	       this.movies = response.data;
	       return true;
      }).catch(err => {
      });
    },
    searchMovies: function() {
      var self = this;
      findMovie(function(cb) {
        self.searchResults = cb.slice(0,5)
      });

      this.selecting = true;
    },
    addItem: function(item) {
      console.log("add");
      this.selecting = false;
      axios.post("/api/items", item).then(response => {
        console.log(item);

        this.movies.push(item);
        console.log(3);
	      this.getItems();
	      return true;
      }).catch(err => {
      });
    },
    imageLink: function (item) {
      return item.Poster;
    },
    completeItem: function(item) {
      axios.put("/api/items/" + item.id, {
	       text: item.text,
	       completed: !item.completed,
      }).then(response => {
	       return true;
      }).catch(err => {
      });
    },
    deleteItem: function(item) {
      axios.delete("/api/items/" + item.id).then(response => {
	       this.getItems();
	       return true;
      }).catch(err => {
      });
    },
    showAll: function() {
      this.show = 'all';
    },
    showActive: function() {
      this.show = 'active';
    },
    showCompleted: function() {
      this.show = 'completed';
    },
    deleteCompleted: function() {
      this.movies.forEach(movie => {
	       if (movie.completed)
	        this.deleteItem(movie)
      });
    },
    dragItem: function(item) {
      this.drag = item;
    },
    dropItem: function(item) {
      var indexItem = this.movies.indexOf(this.drag);
      var indexTarget = this.movies.indexOf(item);
      this.movies.splice(indexItem,1);
      this.movies.splice(indexTarget,0,this.drag);
    },
  }
});

function findMovie(callback) {
  var search = document.getElementById("search_param").value;
  var myurl= "http://www.omdbapi.com/?apikey=69fb9068&s=" + search;
  var b;
  $.ajax({
    url : myurl,
    dataType : "json",
    success : function(json) {
      //console.log(json);
      //console.log(json.Search)

      callback(json.Search);
    }
  });
}
